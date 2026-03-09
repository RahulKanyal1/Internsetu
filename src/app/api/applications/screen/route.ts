/**
 * API Route: ATS Screening
 * Screens student application against job requirements using AI
 */

import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/db";
import {
  corporateApplications,
  corporateInternships,
  corporateStudents,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId } = body;

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    // Fetch application with student and internship data
    const application = await db.query.corporateApplications.findFirst({
      where: eq(corporateApplications.id, applicationId),
      with: {
        student: true,
        internship: {
          with: {
            company: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Prepare data for ATS screening
    const resumeData = {
      name: application.student.name,
      email: application.student.email,
      skills: application.student.skills || [],
      education: application.student.education || [],
      experience: application.student.experience || [],
      projects: application.student.projects || [],
      certifications: application.student.certifications || [],
    };

    const jobRequirements = {
      title: application.internship.title,
      skills: application.internship.requirements?.skills || [],
      education: application.internship.requirements?.education || [],
      experience: application.internship.requirements?.experience || "",
      certifications: application.internship.requirements?.certifications || [],
      keywords: application.internship.atsKeywords || [],
    };

    // Call Python backend for ATS screening
    const screeningResponse = await fetch(
      `${env.BACKEND_API_URL}/api/screen-application`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume_data: resumeData,
          job_requirements: jobRequirements,
          minimum_score: application.internship.minMatchScore || 60,
        }),
      }
    );

    if (!screeningResponse.ok) {
      const error = await screeningResponse.json();
      return NextResponse.json(
        { error: error.detail || "ATS screening failed" },
        { status: screeningResponse.status }
      );
    }

    const screeningResult = await screeningResponse.json();
    const atsData = screeningResult.data;

    // Update application with ATS results
    await db
      .update(corporateApplications)
      .set({
        atsScore: atsData.ats_score,
        atsAnalysis: {
          matchedSkills: atsData.matched_skills,
          missingSkills: atsData.missing_skills,
          matchedKeywords: atsData.matched_keywords,
          missingKeywords: atsData.missing_keywords,
          overallFeedback: atsData.overall_feedback,
          recommendation: atsData.recommendation,
          strengthAreas: atsData.strength_areas,
          weaknessAreas: atsData.weakness_areas,
        },
        status: atsData.passed_screening ? "shortlisted" : "rejected",
        reviewedAt: new Date(),
        statusUpdatedAt: new Date(),
      })
      .where(eq(corporateApplications.id, applicationId));

    // If rejected, generate AI feedback
    if (!atsData.passed_screening) {
      const feedbackResponse = await fetch(
        `${env.BACKEND_API_URL}/api/generate-feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume_data: resumeData,
            job_requirements: jobRequirements,
            ats_analysis: atsData,
          }),
        }
      );

      if (feedbackResponse.ok) {
        const feedbackData = await feedbackResponse.json();

        // Update application with AI feedback
        await db
          .update(corporateApplications)
          .set({
            aiFeedback: {
              rejectionReasons: feedbackData.data.rejection_reasons,
              improvementSuggestions: feedbackData.data.improvement_suggestions,
              skillGaps: feedbackData.data.skill_gaps,
              recommendedCourses: feedbackData.data.recommended_resources,
              encouragement: feedbackData.data.encouragement,
            },
          })
          .where(eq(corporateApplications.id, applicationId));
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        atsScore: atsData.ats_score,
        passed: atsData.passed_screening,
        status: atsData.passed_screening ? "shortlisted" : "rejected",
      },
      message: "Application screened successfully",
    });
  } catch (error) {
    console.error("ATS screening error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
