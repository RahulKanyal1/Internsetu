'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, FileText, User, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

export default function InternshipApplicationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id || '';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    expectedStartDate: '',
    coverLetter: '',
    resumeFile: null as File | null,
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
  });

  const [dragActive, setDragActive] = useState(false);

  // Mock internship data
  const internship = {
    id: id,
    title: "Frontend Developer Intern",
    company: "TechCorp",
    companyLogo: "TC",
    location: "San Francisco, CA",
    type: "Remote",
    duration: "3 months",
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setFormData(prev => ({ ...prev, resumeFile: file }));
    } else {
      alert('Please upload a PDF file');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const canProceedToStep2 = () => {
    return formData.fullName && formData.email && formData.phone && formData.location;
  };

  const canSubmit = () => {
    return canProceedToStep2() && formData.resumeFile && formData.coverLetter;
  };

  const handleSubmit = () => {
    if (canSubmit()) {
      router.push(`/intern-setu/apply/${id}/success`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-200"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-purple-300 rounded-full animate-pulse delay-500"></div>
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-700"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10 p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link 
            href={`/intern-setu/internship/${id}`}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Details</span>
          </Link>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">Apply for Internship</h1>
            <p className="text-sm text-gray-600">{internship.company} • {internship.title}</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4 pb-32">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              currentStep >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 max-w-48 mx-auto">
            <span>Personal Info</span>
            <span>Documents</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-lg shadow-md border border-black shadow-[4px_4px_0_0_#000000] p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <User size={24} className="text-purple-600" />
                  Personal Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="San Francisco, CA"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.expectedStartDate}
                      onChange={(e) => handleInputChange('expectedStartDate', e.target.value)}
                      className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                    className="w-full px-3 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="https://github.com/johndoe or https://johndoe.dev"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Resume Upload */}
              <div className="bg-white rounded-lg shadow-md border border-black shadow-[4px_4px_0_0_#000000] p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <FileText size={24} className="text-purple-600" />
                  Resume Upload *
                </h2>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                    dragActive 
                      ? 'border-purple-500 bg-purple-50' 
                      : formData.resumeFile 
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-purple-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  
                  {formData.resumeFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle size={32} className="text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">{formData.resumeFile.name}</p>
                        <p className="text-sm text-green-600">Resume uploaded successfully</p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload size={32} className="mx-auto mb-4 text-gray-400" />
                      <p className="font-medium text-gray-700 mb-2">
                        Drop your resume here or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF format only, max 5MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Letter */}
              <div className="bg-white rounded-lg shadow-md border border-black shadow-[4px_4px_0_0_#000000] p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Mail size={24} className="text-purple-600" />
                  Cover Letter *
                </h2>

                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  className="w-full px-3 py-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  placeholder="Tell us why you're interested in this internship and what makes you a great fit..."
                  rows={6}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.coverLetter.length}/500 characters
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-lg">
          <div className="max-w-3xl mx-auto flex gap-3">
            {currentStep === 2 && (
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-all"
              >
                Previous
              </button>
            )}
            
            {currentStep === 1 ? (
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedToStep2()}
                className={`flex-[2] py-3 px-4 rounded-md font-medium transition-all border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] ${
                  canProceedToStep2()
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit()}
                className={`flex-[2] py-3 px-4 rounded-md font-medium transition-all border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] ${
                  canSubmit()
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}