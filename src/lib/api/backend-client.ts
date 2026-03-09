/**
 * Backend API Client
 * Helper functions to communicate with Python FastAPI backend
 */

import { env } from "~/env";

class BackendAPIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = env.BACKEND_API_URL || "http://localhost:8000";
  }

  /**
   * Parse resume file
   */
  async parseResume(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${this.baseURL}/api/parse-resume`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to parse resume");
    }

    return response.json();
  }

  /**
   * Screen application with ATS
   */
  async screenApplication(
    resumeData: Record<string, unknown>,
    jobRequirements: Record<string, unknown>,
    minimumScore = 60
  ) {
    const response = await fetch(`${this.baseURL}/api/screen-application`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume_data: resumeData,
        job_requirements: jobRequirements,
        minimum_score: minimumScore,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "ATS screening failed");
    }

    return response.json();
  }

  /**
   * Generate AI feedback for rejected candidates
   */
  async generateFeedback(
    resumeData: Record<string, unknown>,
    jobRequirements: Record<string, unknown>,
    atsAnalysis: Record<string, unknown>
  ) {
    const response = await fetch(`${this.baseURL}/api/generate-feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resume_data: resumeData,
        job_requirements: jobRequirements,
        ats_analysis: atsAnalysis,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to generate feedback");
    }

    return response.json();
  }

  /**
   * Complete application processing (upload + parse + screen + feedback)
   */
  async processApplication(file: File, jobRequirements: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_requirements", jobRequirements);

    const response = await fetch(`${this.baseURL}/api/process-application`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to process application");
    }

    return response.json();
  }

  /**
   * Health check
   */
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`);
    return response.json();
  }
}

// Export singleton instance
export const backendAPI = new BackendAPIClient();
