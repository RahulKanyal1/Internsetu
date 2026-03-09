"""
Resume Parser Service
Extracts text and structured data from PDF/DOCX resumes using OpenAI
"""

from openai import OpenAI
import os
import json
from typing import Dict, Any
import PyPDF2
try:
    import docx
except ImportError:
    docx = None

class ResumeParserService:
    """Service to parse resumes and extract structured information"""
    
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-4o-mini"  # Cost-effective model for parsing
    
    def extract_text_from_pdf(self, file_path: str) -> str:
        """Extract text content from PDF file"""
        try:
            with open(file_path, 'rb') as file:
                pdf_reader = PyPDF2.PdfReader(file)
                text = ""
                for page in pdf_reader.pages:
                    text += page.extract_text() + "\n"
                return text.strip()
        except Exception as e:
            raise Exception(f"Error extracting PDF text: {str(e)}")
    
    def extract_text_from_docx(self, file_path: str) -> str:
        """Extract text content from DOCX file"""
        if docx is None:
            raise Exception("python-docx not installed. Run: pip install python-docx")
        
        try:
            doc = docx.Document(file_path)
            text = "\n".join([paragraph.text for paragraph in doc.paragraphs])
            return text.strip()
        except Exception as e:
            raise Exception(f"Error extracting DOCX text: {str(e)}")
    
    def parse_resume_with_ai(self, resume_text: str) -> Dict[str, Any]:
        """
        Use OpenAI to parse resume text and extract structured data
        
        Args:
            resume_text: Raw text extracted from resume
            
        Returns:
            Dictionary with structured resume data
        """
        
        prompt = f"""
You are an expert resume parser. Analyze this resume and extract structured information.

Resume Text:
{resume_text}

Extract and return ONLY a valid JSON object with this exact structure:
{{
    "name": "Full Name",
    "email": "email@example.com",
    "phone": "Phone Number",
    "skills": ["Skill1", "Skill2", "Skill3"],
    "education": [
        {{
            "degree": "Degree Name",
            "institution": "University Name",
            "year": 2024,
            "field": "Computer Science"
        }}
    ],
    "experience": [
        {{
            "title": "Job Title",
            "company": "Company Name",
            "duration": "Jan 2023 - Present",
            "description": "Key responsibilities and achievements"
        }}
    ],
    "projects": [
        {{
            "title": "Project Name",
            "description": "Brief description",
            "technologies": ["Tech1", "Tech2"]
        }}
    ],
    "certifications": ["Certification1", "Certification2"],
    "achievements": ["Achievement1", "Achievement2"]
}}

Important:
- Extract as much information as possible
- If a field is not found, use empty array [] or empty string ""
- Return ONLY valid JSON, no additional text
"""
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert resume parser. Extract structured data and return only valid JSON."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                response_format={"type": "json_object"},
                temperature=0.3  # Low temperature for consistent parsing
            )
            
            parsed_data = json.loads(response.choices[0].message.content)
            return parsed_data
            
        except Exception as e:
            raise Exception(f"Error parsing resume with AI: {str(e)}")
    
    def parse_resume_file(self, file_path: str) -> Dict[str, Any]:
        """
        Complete resume parsing pipeline
        
        Args:
            file_path: Path to PDF or DOCX resume file
            
        Returns:
            Structured resume data
        """
        # Determine file type and extract text
        if file_path.lower().endswith('.pdf'):
            resume_text = self.extract_text_from_pdf(file_path)
        elif file_path.lower().endswith('.docx'):
            resume_text = self.extract_text_from_docx(file_path)
        else:
            raise ValueError("Unsupported file format. Only PDF and DOCX are supported.")
        
        # Parse with AI
        parsed_data = self.parse_resume_with_ai(resume_text)
        
        # Add metadata
        parsed_data['raw_text'] = resume_text
        parsed_data['file_path'] = file_path
        
        return parsed_data


# Example usage
if __name__ == "__main__":
    parser = ResumeParserService()
    
    # Test with sample file
    # result = parser.parse_resume_file("path/to/resume.pdf")
    # print(json.dumps(result, indent=2))
