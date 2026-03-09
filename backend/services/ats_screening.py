"""
ATS (Applicant Tracking System) Screening Service
Matches candidate resumes against job requirements and calculates match score
"""

from openai import OpenAI
import os
import json
from typing import Dict, List, Any

class ATSScreeningService:
    """Service to screen resumes using ATS logic"""
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o-mini"
    
    def calculate_ats_score(
        self,
        resume_data: Dict[str, Any],
        job_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Calculate ATS match score between resume and job requirements
        
        Args:
            resume_data: Parsed resume data from ResumeParserService
            job_requirements: Job requirements including skills, education, experience
            
        Returns:
            Dictionary with ATS score and detailed analysis
        """
        
        prompt = f"""
You are an ATS (Applicant Tracking System) screening resumes for a corporate internship.

JOB REQUIREMENTS:
- Required Skills: {job_requirements.get('skills', [])}
- Required Education: {job_requirements.get('education', [])}
- Required Experience: {job_requirements.get('experience', 'None specified')}
- Preferred Certifications: {job_requirements.get('certifications', [])}
- Keywords: {job_requirements.get('keywords', [])}

CANDIDATE RESUME:
- Name: {resume_data.get('name', 'Unknown')}
- Skills: {resume_data.get('skills', [])}
- Education: {json.dumps(resume_data.get('education', []))}
- Experience: {json.dumps(resume_data.get('experience', []))}
- Projects: {json.dumps(resume_data.get('projects', []))}
- Certifications: {resume_data.get('certifications', [])}

Analyze this resume and provide:
1. Overall ATS score (0-100) - how well candidate matches the job
2. List of matched skills (skills that appear in both resume and requirements)
3. List of missing skills (required skills not found in resume)
4. List of matched keywords
5. List of missing keywords
6. Overall feedback explaining the score

Scoring guidelines:
- 80-100: Excellent match, highly recommended
- 60-79: Good match, recommended
- 40-59: Moderate match, may need development
- 0-39: Weak match, significant gaps

Return ONLY a valid JSON object:
{{
    "ats_score": 75,
    "matched_skills": ["Python", "JavaScript"],
    "missing_skills": ["AWS", "Docker"],
    "matched_keywords": ["API", "Database", "Agile"],
    "missing_keywords": ["Cloud", "Microservices"],
    "overall_feedback": "Detailed feedback explaining the score and key strengths/weaknesses",
    "recommendation": "ACCEPT" or "REJECT" or "REVIEW",
    "strength_areas": ["Area1", "Area2"],
    "weakness_areas": ["Area1", "Area2"]
}}
"""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an ATS that objectively evaluates candidate fit for internships."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},
                temperature=0.3
            )
            
            ats_result = json.loads(response.choices[0].message.content)
            return ats_result
            
        except Exception as e:
            raise Exception(f"Error calculating ATS score: {str(e)}")
    
    def screen_application(
        self,
        resume_data: Dict[str, Any],
        job_data: Dict[str, Any],
        minimum_score: int = 60
    ) -> Dict[str, Any]:
        """
        Complete screening pipeline with pass/fail decision
        
        Args:
            resume_data: Parsed resume data
            job_data: Job requirements and details
            minimum_score: Minimum ATS score to pass screening (default: 60)
            
        Returns:
            Complete screening result with pass/fail status
        """
        # Calculate ATS score
        ats_result = self.calculate_ats_score(resume_data, job_data)
        
        # Determine pass/fail
        passed_screening = ats_result['ats_score'] >= minimum_score
        
        # Add decision metadata
        screening_result = {
            **ats_result,
            'passed_screening': passed_screening,
            'minimum_score_required': minimum_score,
            'candidate_name': resume_data.get('name', 'Unknown'),
            'job_title': job_data.get('title', 'Unknown Position')
        }
        
        return screening_result


# Example usage
if __name__ == "__main__":
    ats = ATSScreeningService()
    
    # Sample data
    sample_resume = {
        "name": "John Doe",
        "skills": ["Python", "JavaScript", "React", "SQL"],
        "education": [{"degree": "B.Tech", "institution": "XYZ University", "year": 2024}],
        "experience": [],
        "projects": [{"title": "E-commerce App", "technologies": ["React", "Node.js"]}],
        "certifications": []
    }
    
    sample_job = {
        "title": "Software Engineering Intern",
        "skills": ["Python", "JavaScript", "AWS", "Docker"],
        "education": ["Bachelor's in Computer Science or related field"],
        "keywords": ["API", "Database", "Cloud"]
    }
    
    # result = ats.screen_application(sample_resume, sample_job)
    # print(json.dumps(result, indent=2))
