/**
 * API Route: Resume Upload & Processing
 * Handles resume file upload and triggers backend AI processing
 */

import { NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const studentId = formData.get("studentId") as string;
    const internshipId = formData.get("internshipId") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF and DOCX are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (4MB max)
    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 4MB." },
        { status: 400 }
      );
    }

    // Forward to Python backend for parsing
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const parseResponse = await fetch(
      `${env.BACKEND_API_URL}/api/parse-resume`,
      {
        method: "POST",
        body: backendFormData,
      }
    );

    if (!parseResponse.ok) {
      const error = await parseResponse.json();
      return NextResponse.json(
        { error: error.detail || "Failed to parse resume" },
        { status: parseResponse.status }
      );
    }

    const parsedData = await parseResponse.json();

    // Return parsed resume data
    return NextResponse.json({
      success: true,
      data: parsedData.data,
      message: "Resume uploaded and parsed successfully",
    });
  } catch (error) {
    console.error("Resume upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
