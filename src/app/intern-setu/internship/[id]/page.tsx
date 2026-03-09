"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MapPin, Clock, Briefcase, ArrowLeft, CheckCircle, Share2, BookmarkPlus } from 'lucide-react';
import { Button } from '~/components/ui/button';

export default function InternshipDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || '';
  
  // Mock data for the internship details
  const internship = {
    id: id,
    company: "TechCorp",
    logo: "/company-logos/techcorp.svg", // Would be replaced with actual logo
    industry: "Technology",
    size: "501-1000 employees",
    hq: "Bangalore",
    title: "Frontend Developer Intern",
    department: "Engineering",
    duration: "3 months",
    startDate: "Immediate",
    stipend: "₹15,000/month",
    location: "Bangalore",
    skills: [
      { name: "React", level: "have" },
      { name: "JavaScript", level: "have" },
      { name: "HTML/CSS", level: "have" },
      { name: "TypeScript", level: "develop" },
      { name: "Next.js", level: "develop" },
      { name: "UI Testing", level: "optional" },
    ],
    education: "Bachelor's in Computer Science or related field",
    experience: "No prior experience required",
    eligibility: "Open to all college students",
    description: "Join our dynamic team to build modern web applications using React and Next.js. You'll work closely with senior developers to implement UI components and features for our flagship product.",
    responsibilities: [
      "Develop and maintain UI components using React",
      "Collaborate with designers to implement pixel-perfect interfaces",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and team meetings",
    ],
    learningOutcomes: [
      "Gain hands-on experience with modern frontend frameworks",
      "Learn industry best practices for web development",
      "Understand the software development lifecycle",
      "Build a portfolio of real-world projects",
    ],
    applicationSteps: [
      "Submit application with resume",
      "Complete a short coding assessment",
      "Interview with the engineering team",
      "Receive offer within 1 week",
    ],
    matchBreakdown: {
      skillAlignment: 85,
      locationMatch: 100,
      educationFit: 90,
    },
  };

  // Helper function to get color based on skill level
  const getSkillColor = (level: string) => {
    switch (level) {
      case 'have': return 'bg-green-100 text-green-800 border border-black';
      case 'develop': return 'bg-purple-100 text-purple-800 border border-black';
      case 'optional': return 'bg-gray-100 text-gray-800 border border-black';
      default: return 'bg-gray-100 text-gray-800 border border-black';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-16 right-10 text-purple-300 opacity-40">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      <div className="absolute bottom-32 left-10 text-blue-400 opacity-50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10 p-4">
        <div className="max-w-3xl mx-auto flex items-center">
          <Link href="/intern-setu/recommendations" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-600 hover:text-gray-900" />
          </Link>
          <h1 className="text-xl font-bold flex-1 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Internship Details</h1>
          <Button variant="ghost" size="icon" className="ml-2">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="ml-2">
            <BookmarkPlus className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto p-4">
        {/* Company Overview */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-start">
            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center mr-4">
              <span className="font-bold text-2xl text-gray-500">{internship.company.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{internship.company}</h2>
              <p className="text-gray-600">{internship.industry}</p>
              <p className="text-gray-600">{internship.size}</p>
              <p className="text-gray-600">HQ: {internship.hq}</p>
            </div>
          </div>
        </div>
        
        {/* Internship Details */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Internship Details</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Title</p>
              <p className="font-medium">{internship.title}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Department</p>
              <p className="font-medium">{internship.department}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Duration</p>
              <p className="font-medium">{internship.duration}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Start Date</p>
              <p className="font-medium">{internship.startDate}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Stipend</p>
              <p className="font-medium">{internship.stipend}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Location</p>
              <p className="font-medium">{internship.location}</p>
            </div>
          </div>
        </div>
        
        {/* Skills & Requirements */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Skills & Requirements</h2>
          
          <div className="mb-4">
            <p className="text-gray-500 mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {internship.skills.map((skill) => (
                <span 
                  key={skill.name}
                  className={`px-3 py-1 rounded-full text-sm ${getSkillColor(skill.level)}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Education</p>
              <p className="font-medium">{internship.education}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Experience</p>
              <p className="font-medium">{internship.experience}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Eligibility</p>
              <p className="font-medium">{internship.eligibility}</p>
            </div>
          </div>
        </div>
        
        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Description</h2>
          <p className="text-gray-700 mb-4">{internship.description}</p>
          
          <h3 className="font-semibold mb-2">Responsibilities</h3>
          <ul className="list-disc pl-5 mb-4 text-gray-700">
            {internship.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <h3 className="font-semibold mb-2">Learning Outcomes</h3>
          <ul className="list-disc pl-5 text-gray-700">
            {internship.learningOutcomes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        {/* Application Process */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Application Process</h2>
          <ol className="list-decimal pl-5 text-gray-700">
            {internship.applicationSteps.map((step, index) => (
              <li key={index} className="mb-2">{step}</li>
            ))}
          </ol>
        </div>
        
        {/* Match Explanation */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-3">Why You&apos;re a Good Fit</h2>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Skill Alignment</span>
                <span className="text-sm font-medium">{internship.matchBreakdown.skillAlignment}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${internship.matchBreakdown.skillAlignment}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Location Match</span>
                <span className="text-sm font-medium">{internship.matchBreakdown.locationMatch}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${internship.matchBreakdown.locationMatch}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Education Fit</span>
                <span className="text-sm font-medium">{internship.matchBreakdown.educationFit}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${internship.matchBreakdown.educationFit}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Apply button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg">
          <div className="max-w-3xl mx-auto flex gap-3">
            <button className="flex-1 bg-gray-100 text-gray-700 border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-all">
              Save for Later
            </button>
            <Link
              href={`/intern-setu/apply/${id}`}
              className="flex-[2] bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] py-3 px-4 rounded-md font-medium transition-all text-center"
            >
              Apply Now
            </Link>
          </div>
        </div>
        
        {/* Padding for fixed button */}
        <div className="h-20"></div>
      </main>
    </div>
  );
}