"""
FastAPI Backend Server for Corporate Internship ATS Platform
Handles resume parsing, ATS screening, and AI feedback generation
"""
from dotenv import load_dotenv
load_dotenv()  # Load .env file

# ... rest of your existing imports


from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import os
import json
import tempfile
import sys

# Add parent directory to path to import services
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from services.resume_parser import ResumeParserService
from services.ats_screening import ATSScreeningService
from services.feedback_generator import FeedbackGenerationService

# Initialize FastAPI app
app = FastAPI(
    title="Corporate Internship ATS API",
    description="AI-powered ATS system for corporate internship matching",
    version="1.0.0"
)

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "http://localhost:3001",
        "https://your-production-domain.com"  # Replace with actual domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI services
resume_parser = ResumeParserService()
ats_screening = ATSScreeningService()
feedback_generator = FeedbackGenerationService()

# ==================== DATA MODELS ====================

class JobRequirements(BaseModel):
    """Model for job requirements"""
    title: str
    skills: List[str]
    education: List[str]
    experience: Optional[str] = None
    certifications: Optional[List[str]] = []
    keywords: Optional[List[str]] = []

class ScreeningRequest(BaseModel):
    """Model for ATS screening request"""
    resume_data: Dict[str, Any]
    job_requirements: Dict[str, Any]
    minimum_score: Optional[int] = 60

class FeedbackRequest(BaseModel):
    """Model for feedback generation request"""
    resume_data: Dict[str, Any]
    job_requirements: Dict[str, Any]
    ats_analysis: Dict[str, Any]

# ==================== API ENDPOINTS ====================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "service": "Corporate Internship ATS API",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "services": {
            "resume_parser": "active",
            "ats_screening": "active",
            "feedback_generator": "active"
        }
    }

# ==================== RESUME PARSING ====================

@app.post("/api/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    """
    Parse uploaded resume (PDF/DOCX) and extract structured data
    
    Args:
        file: Resume file (PDF or DOCX)
        
    Returns:
        Structured resume data
    """
    try:
        # Validate file type
        if not file.filename.endswith(('.pdf', '.docx')):
            raise HTTPException(
                status_code=400,
                detail="Invalid file type. Only PDF and DOCX files are supported."
            )
        
        # Save uploaded file to temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        try:
            # Parse resume
            parsed_data = resume_parser.parse_resume_file(temp_file_path)
            
            return JSONResponse(content={
                "success": True,
                "data": parsed_data,
                "message": "Resume parsed successfully"
            })
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error parsing resume: {str(e)}"
        )

# ==================== ATS SCREENING ====================

@app.post("/api/screen-application")
async def screen_application(request: ScreeningRequest):
    """
    Screen a candidate's resume against job requirements using ATS
    
    Args:
        request: Screening request with resume data and job requirements
        
    Returns:
        ATS screening result with score and analysis
    """
    try:
        result = ats_screening.screen_application(
            resume_data=request.resume_data,
            job_data=request.job_requirements,
            minimum_score=request.minimum_score
        )
        
        return JSONResponse(content={
            "success": True,
            "data": result,
            "message": "Application screened successfully"
        })
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error screening application: {str(e)}"
        )

@app.post("/api/calculate-ats-score")
async def calculate_ats_score(
    resume_data: Dict[str, Any],
    job_requirements: Dict[str, Any]
):
    """
    Calculate ATS match score only (no pass/fail decision)
    
    Args:
        resume_data: Parsed resume data
        job_requirements: Job requirements
        
    Returns:
        ATS score and detailed analysis
    """
    try:
        result = ats_screening.calculate_ats_score(
            resume_data=resume_data,
            job_requirements=job_requirements
        )
        
        return JSONResponse(content={
            "success": True,
            "data": result,
            "message": "ATS score calculated successfully"
        })
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error calculating ATS score: {str(e)}"
        )

# ==================== AI FEEDBACK ====================

@app.post("/api/generate-feedback")
async def generate_feedback(request: FeedbackRequest):
    """
    Generate AI-powered feedback for rejected candidates
    
    Args:
        request: Feedback request with resume, job, and ATS data
        
    Returns:
        Detailed constructive feedback with improvement suggestions
    """
    try:
        feedback = feedback_generator.generate_rejection_feedback(
            resume_data=request.resume_data,
            job_requirements=request.job_requirements,
            ats_analysis=request.ats_analysis
        )
        
        return JSONResponse(content={
            "success": True,
            "data": feedback,
            "message": "Feedback generated successfully"
        })
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating feedback: {str(e)}"
        )

@app.post("/api/generate-acceptance-feedback")
async def generate_acceptance_feedback(request: FeedbackRequest):
    """
    Generate positive feedback for accepted candidates
    
    Args:
        request: Feedback request with resume, job, and ATS data
        
    Returns:
        Encouraging feedback with preparation tips
    """
    try:
        feedback = feedback_generator.generate_acceptance_feedback(
            resume_data=request.resume_data,
            job_requirements=request.job_requirements,
            ats_analysis=request.ats_analysis
        )
        
        return JSONResponse(content={
            "success": True,
            "data": feedback,
            "message": "Acceptance feedback generated successfully"
        })
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating acceptance feedback: {str(e)}"
        )

# ==================== COMBINED ENDPOINTS ====================

@app.post("/api/process-application")
async def process_application(
    file: UploadFile = File(...),
    job_requirements: str = Form(...)
):
    """
    Complete application processing pipeline:
    1. Parse resume
    2. Screen against job requirements
    3. Generate feedback (if rejected)
    
    Args:
        file: Resume file
        job_requirements: JSON string of job requirements
        
    Returns:
        Complete application processing result
    """
    try:
        # Parse job requirements JSON
        job_data = json.loads(job_requirements)
        
        # Step 1: Parse resume
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        try:
            parsed_resume = resume_parser.parse_resume_file(temp_file_path)
            
            # Step 2: Screen application
            screening_result = ats_screening.screen_application(
                resume_data=parsed_resume,
                job_data=job_data,
                minimum_score=job_data.get('minimum_score', 60)
            )
            
            # Step 3: Generate feedback
            if not screening_result['passed_screening']:
                # Generate rejection feedback
                feedback = feedback_generator.generate_rejection_feedback(
                    resume_data=parsed_resume,
                    job_requirements=job_data,
                    ats_analysis=screening_result
                )
            else:
                # Generate acceptance feedback
                feedback = feedback_generator.generate_acceptance_feedback(
                    resume_data=parsed_resume,
                    job_requirements=job_data,
                    ats_analysis=screening_result
                )
            
            return JSONResponse(content={
                "success": True,
                "data": {
                    "parsed_resume": parsed_resume,
                    "screening_result": screening_result,
                    "feedback": feedback
                },
                "message": "Application processed successfully"
            })
            
        finally:
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing application: {str(e)}"
        )

# ==================== RUN SERVER ====================

if __name__ == "__main__":
    import uvicorn
    
    # Run server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Auto-reload on code changes
        log_level="info"
    )
