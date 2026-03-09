/**
 * Database Schema for Corporate Internship ATS Platform
 * Tables: Students, Companies, Internships, Applications, Resume Analysis, Feedback
 */

import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ==================== STUDENTS TABLE ====================

export const corporateStudents = pgTable("corporate_students", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  university: varchar("university", { length: 255 }),
  degree: varchar("degree", { length: 100 }),
  graduationYear: integer("graduation_year"),
  resumeUrl: text("resume_url"), // Latest resume URL
  profilePictureUrl: text("profile_picture_url"),
  
  // Skills and qualifications
  skills: jsonb("skills").$type<string[]>().default([]),
  certifications: jsonb("certifications").$type<string[]>().default([]),
  
  // Projects portfolio
  projects: jsonb("projects").$type<{
    title: string;
    description: string;
    technologies: string[];
    url?: string;
    startDate?: string;
    endDate?: string;
  }[]>().default([]),
  
  // Experience
  experience: jsonb("experience").$type<{
    title: string;
    company: string;
    duration: string;
    description: string;
    startDate?: string;
    endDate?: string;
  }[]>().default([]),
  
  // Education details
  education: jsonb("education").$type<{
    degree: string;
    institution: string;
    year: number;
    field?: string;
    gpa?: string;
  }[]>().default([]),
  
  // Preferences
  preferences: jsonb("preferences").$type<{
    preferredLocations?: string[];
    preferredIndustries?: string[];
    expectedStipend?: string;
    willingToRelocate?: boolean;
  }>(),
  
  // Profile completeness
  profileComplete: boolean("profile_complete").default(false),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==================== COMPANIES TABLE ====================

export const corporateCompanies = pgTable("corporate_companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 100 }),
  website: text("website"),
  logo: text("logo"),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  companySize: varchar("company_size", { length: 50 }), // "1-50", "51-200", etc.
  
  // HR Contact
  hrContactName: varchar("hr_contact_name", { length: 255 }),
  hrContactEmail: varchar("hr_contact_email", { length: 255 }),
  hrContactPhone: varchar("hr_contact_phone", { length: 20 }),
  
  // Verification
  isVerified: boolean("is_verified").default(false),
  verificationDocuments: jsonb("verification_documents").$type<string[]>(),
  
  // Company details
  foundedYear: integer("founded_year"),
  benefits: jsonb("benefits").$type<string[]>().default([]),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==================== INTERNSHIPS TABLE ====================

export const corporateInternships = pgTable("corporate_internships", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => corporateCompanies.id, { onDelete: "cascade" })
    .notNull(),
  
  // Basic Info
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  responsibilities: text("responsibilities"),
  
  // Location
  location: varchar("location", { length: 255 }),
  isRemote: boolean("is_remote").default(false),
  
  // Duration & Stipend
  duration: varchar("duration", { length: 100 }), // "3 months", "6 months"
  stipend: varchar("stipend", { length: 100 }),
  
  // Requirements
  requirements: jsonb("requirements").$type<{
    skills: string[];
    education: string[];
    experience?: string;
    certifications?: string[];
    minGPA?: string;
  }>().notNull(),
  
  // Benefits
  benefits: text("benefits"),
  learningOutcomes: jsonb("learning_outcomes").$type<string[]>(),
  
  // ATS Configuration
  atsKeywords: jsonb("ats_keywords").$type<string[]>().default([]),
  minMatchScore: integer("min_match_score").default(60), // Minimum ATS score to pass
  
  // Dates
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  applicationDeadline: timestamp("application_deadline"),
  
  // Status
  isActive: boolean("is_active").default(true),
  maxApplications: integer("max_applications"),
  currentApplications: integer("current_applications").default(0),
  
  // Metadata
  viewCount: integer("view_count").default(0),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==================== APPLICATIONS TABLE ====================

export const corporateApplications = pgTable("corporate_applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id")
    .references(() => corporateStudents.id, { onDelete: "cascade" })
    .notNull(),
  internshipId: uuid("internship_id")
    .references(() => corporateInternships.id, { onDelete: "cascade" })
    .notNull(),
  
  // Application Materials
  resumeUrl: text("resume_url").notNull(), // Resume submitted for this application
  coverLetter: text("cover_letter"),
  
  // Application Status
  status: varchar("status", { length: 50 })
    .default("pending")
    .notNull(), 
  // Possible values: pending, ats_screening, shortlisted, rejected, accepted, withdrawn
  
  // ATS Screening Results
  atsScore: integer("ats_score"), // 0-100 score
  atsAnalysis: jsonb("ats_analysis").$type<{
    matchedSkills: string[];
    missingSkills: string[];
    matchedKeywords: string[];
    missingKeywords: string[];
    overallFeedback: string;
    recommendation?: "ACCEPT" | "REJECT" | "REVIEW";
    strengthAreas?: string[];
    weaknessAreas?: string[];
  }>(),
  
  // AI-Generated Feedback
  aiFeedback: jsonb("ai_feedback").$type<{
    rejectionReasons?: string[];
    improvementSuggestions?: string[];
    skillGaps?: string[];
    recommendedCourses?: {
      type: string;
      name: string;
      platform: string;
      url?: string;
      duration?: string;
      whyRecommended: string;
    }[];
    encouragement?: string;
  }>(),
  
  // Timestamps
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  reviewedAt: timestamp("reviewed_at"),
  statusUpdatedAt: timestamp("status_updated_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ==================== RESUME ANALYSIS CACHE ====================

export const corporateResumeAnalysis = pgTable("corporate_resume_analysis", {
  id: uuid("id").primaryKey().defaultRandom(),
  studentId: uuid("student_id")
    .references(() => corporateStudents.id, { onDelete: "cascade" })
    .notNull(),
  resumeUrl: text("resume_url").notNull(),
  
  // Parsed Data
  parsedData: jsonb("parsed_data").$type<{
    name: string;
    email: string;
    phone: string;
    skills: string[];
    education: {
      degree: string;
      institution: string;
      year: number;
      field?: string;
    }[];
    experience: {
      title: string;
      company: string;
      duration: string;
      description: string;
    }[];
    projects: {
      title: string;
      description: string;
      technologies: string[];
    }[];
    certifications: string[];
    achievements?: string[];
  }>(),
  
  // Extracted Keywords
  extractedKeywords: jsonb("extracted_keywords").$type<string[]>(),
  
  // Quality Metrics
  qualityScore: integer("quality_score"), // 0-100
  qualityFeedback: text("quality_feedback"),
  
  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ==================== RELATIONS ====================

export const studentsRelations = relations(corporateStudents, ({ many }) => ({
  applications: many(corporateApplications),
  resumeAnalyses: many(corporateResumeAnalysis),
}));

export const companiesRelations = relations(corporateCompanies, ({ many }) => ({
  internships: many(corporateInternships),
}));

export const internshipsRelations = relations(corporateInternships, ({ one, many }) => ({
  company: one(corporateCompanies, {
    fields: [corporateInternships.companyId],
    references: [corporateCompanies.id],
  }),
  applications: many(corporateApplications),
}));

export const applicationsRelations = relations(corporateApplications, ({ one }) => ({
  student: one(corporateStudents, {
    fields: [corporateApplications.studentId],
    references: [corporateStudents.id],
  }),
  internship: one(corporateInternships, {
    fields: [corporateApplications.internshipId],
    references: [corporateInternships.id],
  }),
}));

export const resumeAnalysisRelations = relations(corporateResumeAnalysis, ({ one }) => ({
  student: one(corporateStudents, {
    fields: [corporateResumeAnalysis.studentId],
    references: [corporateStudents.id],
  }),
}));

// ==================== TYPE EXPORTS ====================

export type Student = typeof corporateStudents.$inferSelect;
export type NewStudent = typeof corporateStudents.$inferInsert;

export type Company = typeof corporateCompanies.$inferSelect;
export type NewCompany = typeof corporateCompanies.$inferInsert;

export type Internship = typeof corporateInternships.$inferSelect;
export type NewInternship = typeof corporateInternships.$inferInsert;

export type Application = typeof corporateApplications.$inferSelect;
export type NewApplication = typeof corporateApplications.$inferInsert;

export type ResumeAnalysis = typeof corporateResumeAnalysis.$inferSelect;
export type NewResumeAnalysis = typeof corporateResumeAnalysis.$inferInsert;
