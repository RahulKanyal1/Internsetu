"""
AI Feedback Generation Service
Generates personalized, actionable feedback for rejected candidates
"""

from openai import OpenAI
import os
import json
from typing import Dict, List, Any

class FeedbackGenerationService:
    """Service to generate AI-powered feedback for candidates"""
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o-mini"
    
    def generate_rejection_feedback(
        self,
        resume_data: Dict[str, Any],
        job_requirements: Dict[str, Any],
        ats_analysis: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generate constructive feedback for rejected candidates
        
        Args:
            resume_data: Candidate's parsed resume
            job_requirements: Job requirements
            ats_analysis: ATS screening results
            
        Returns:
            Structured feedback with actionable suggestions
        """
        
        prompt = f"""
You are a supportive career advisor providing constructive feedback to a student whose internship application was not selected.

JOB DETAILS:
- Position: {job_requirements.get('title', 'Internship Position')}
- Required Skills: {job_requirements.get('skills', [])}
- Required Education: {job_requirements.get('education', [])}

CANDIDATE PROFILE:
- Name: {resume_data.get('name', 'Candidate')}
- Current Skills: {resume_data.get('skills', [])}
- Education: {json.dumps(resume_data.get('education', []))}
- Projects: {json.dumps(resume_data.get('projects', []))}

ATS SCREENING RESULTS:
- Score: {ats_analysis.get('ats_score', 0)}/100
- Missing Skills: {ats_analysis.get('missing_skills', [])}
- Missing Keywords: {ats_analysis.get('missing_keywords', [])}
- Weakness Areas: {ats_analysis.get('weakness_areas', [])}

Provide empathetic, constructive feedback including:

1. **Rejection Reasons** (2-3 specific reasons why application wasn't selected)
2. **Improvement Suggestions** (3-5 VERY SPECIFIC, actionable steps)
   - Format: "Add a project that demonstrates [specific skill] where you [specific action]"
   - Be concrete and measurable
3. **Skill Gaps to Address** (prioritized list)
4. **Recommended Learning Resources** (specific courses/certifications with platforms)

Be kind, encouraging, and specific. Focus on growth opportunities.

Return ONLY valid JSON:
{{
    "rejection_reasons": [
        "Your resume did not demonstrate sufficient experience with [specific technology]",
        "Missing key projects that showcase [specific skill]"
    ],
    "improvement_suggestions": [
        "Build and deploy a full-stack application using [specific technologies] that solves a real-world problem. Include metrics like user count or performance improvements.",
        "Complete the [specific certification] on [platform] to validate your knowledge in [skill area]",
        "Add quantifiable achievements to your experience section (e.g., 'Improved performance by 30%' instead of 'Worked on optimization')"
    ],
    "skill_gaps": [
        {{
            "skill": "AWS",
            "priority": "High",
            "why_important": "Essential for modern cloud-based applications"
        }},
        {{
            "skill": "Docker",
            "priority": "Medium",
            "why_important": "Industry standard for containerization"
        }}
    ],
    "recommended_resources": [
        {{
            "type": "Course",
            "name": "AWS Certified Cloud Practitioner",
            "platform": "AWS Training",
            "url": "https://aws.amazon.com/certification/certified-cloud-practitioner/",
            "duration": "3 weeks",
            "why_recommended": "Builds foundational cloud skills required for this role"
        }},
        {{
            "type": "Project Idea",
            "name": "Build a CI/CD pipeline with Docker",
            "platform": "GitHub",
            "url": null,
            "duration": "1-2 weeks",
            "why_recommended": "Demonstrates practical DevOps skills"
        }}
    ],
    "encouragement": "You have a strong foundation in [strengths]. With focused effort on [areas], you'll be well-positioned for similar opportunities in the future. Keep building and learning!"
}}
"""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are a supportive career advisor who provides constructive, actionable feedback to help students improve."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},
                temperature=0.7  # Slightly higher for more personalized responses
            )
            
            feedback = json.loads(response.choices[0].message.content)
            return feedback
            
        except Exception as e:
            raise Exception(f"Error generating feedback: {str(e)}")
    
    def generate_acceptance_feedback(
        self,
        resume_data: Dict[str, Any],
        job_requirements: Dict[str, Any],
        ats_analysis: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Generate positive feedback for accepted candidates
        Highlights strengths and provides tips for the internship
        """
        
        prompt = f"""
Congratulations message for a candidate whose application was ACCEPTED.

CANDIDATE: {resume_data.get('name', 'Candidate')}
POSITION: {job_requirements.get('title', 'Internship')}
ATS SCORE: {ats_analysis.get('ats_score', 0)}/100
MATCHED SKILLS: {ats_analysis.get('matched_skills', [])}
STRENGTH AREAS: {ats_analysis.get('strength_areas', [])}

Provide an encouraging message including:
1. Congratulations and why they were selected
2. Key strengths that stood out
3. Tips to prepare for the internship
4. Areas for continued learning

Return JSON:
{{
    "congratulations_message": "Personalized congratulations",
    "key_strengths": ["Strength1", "Strength2"],
    "preparation_tips": ["Tip1", "Tip2"],
    "continued_learning": ["Area1", "Area2"]
}}
"""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You provide encouraging, professional feedback to successful candidates."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},
                temperature=0.7
            )
            
            feedback = json.loads(response.choices[0].message.content)
            return feedback
            
        except Exception as e:
            raise Exception(f"Error generating acceptance feedback: {str(e)}")


# Example usage
if __name__ == "__main__":
    feedback_service = FeedbackGenerationService()
    
    # Sample data would go here
    # result = feedback_service.generate_rejection_feedback(...)
    # print(json.dumps(result, indent=2))
