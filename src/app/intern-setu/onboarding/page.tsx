"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, GraduationCap, Paintbrush, DollarSign, Code, Heart, MapPin, Check, Building, Globe, Stethoscope, Factory, School, Rocket, Users } from 'lucide-react';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    education: '',
    skills: [] as string[],
    sectors: [] as string[],
    location: '',
  });

  const totalSteps = 5;

  const questions = [
    {
      id: 1,
      text: "Hi! I'm your AI assistant. Let's find perfect internships for you. What's your current education level?",
      type: "single-select",
      options: [
        { label: "12th Grade", icon: GraduationCap },
        { label: "Diploma", icon: GraduationCap },
        { label: "Bachelor's", icon: GraduationCap },
        { label: "Master's", icon: GraduationCap },
        { label: "PhD", icon: GraduationCap },
        { label: "Other", icon: GraduationCap },
      ]
    },
    {
      id: 2,
      text: "Great! What skills do you have or want to develop?",
      type: "multi-select",
      options: [
        { label: "Programming", icon: Code },
        { label: "Design", icon: Paintbrush },
        { label: "Marketing", icon: Heart },
        { label: "Finance", icon: DollarSign },
        { label: "Engineering", icon: GraduationCap },
        { label: "Writing", icon: Heart },
        { label: "Data Analysis", icon: Code },
        { label: "Sales", icon: DollarSign },
      ]
    },
    {
      id: 3,
      text: "Which sectors interest you most? (Select up to 3)",
      type: "multi-select",
      maxSelections: 3,
      options: [
        { label: "Technology", icon: Code },
        { label: "Healthcare", icon: Stethoscope },
        { label: "Finance", icon: DollarSign },
        { label: "Government", icon: Building },
        { label: "Manufacturing", icon: Factory },
        { label: "Education", icon: School },
        { label: "Startups", icon: Rocket },
        { label: "NGOs", icon: Users },
      ]
    },
    {
      id: 4,
      text: "Where would you prefer to work?",
      type: "single-select",
      options: [
        { label: "Same City", icon: MapPin },
        { label: "Same State", icon: MapPin },
        { label: "Anywhere in India", icon: Globe },
        { label: "Remote/Online", icon: Globe },
      ]
    }
  ];

  const currentQuestion = questions.find(q => q.id === step);

  const handleOptionSelect = (option: string) => {
    if (step === 1) {
      setAnswers(prev => ({ ...prev, education: option }));
      setTimeout(() => setStep(2), 500);
    } else if (step === 2) {
      setAnswers(prev => {
        const newSkills = prev.skills.includes(option)
          ? prev.skills.filter(s => s !== option)
          : [...prev.skills, option];
        return { ...prev, skills: newSkills };
      });
    } else if (step === 3) {
      setAnswers(prev => {
        const newSectors = prev.sectors.includes(option)
          ? prev.sectors.filter(s => s !== option)
          : prev.sectors.length < 3
          ? [...prev.sectors, option]
          : prev.sectors;
        return { ...prev, sectors: newSectors };
      });
    } else if (step === 4) {
      setAnswers(prev => ({ ...prev, location: option }));
      setTimeout(() => setStep(5), 500);
    }
  };

  const canProceed = () => {
    if (step === 2) return answers.skills.length > 0;
    if (step === 3) return answers.sectors.length > 0;
    return true;
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const goNext = () => {
    if (step === 2 && canProceed()) setStep(3);
    else if (step === 3 && canProceed()) setStep(4);
  };

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Progress bar */}
        <div className="w-full bg-purple-100 h-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 transition-all duration-500 ease-in-out" 
            style={{ width: '100%' }}
          ></div>
        </div>
        
        {/* Header */}
        <div className="bg-white p-4 flex items-center border-b">
          <button onClick={goBack} className="mr-4 text-gray-600">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-medium text-purple-800">Intern-Setu | Step 5 of 5</h1>
        </div>
        
        {/* Profile confirmation */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-md mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md border border-black mb-4 p-4"
            >
              <div className="flex mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-[#0047AB] font-bold">AI</span>
                </div>
                <div>
                  <p className="text-gray-800">
                    Perfect! Let me summarize your profile:
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center p-3 bg-purple-50 rounded-md">
                  <GraduationCap className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Education</p>
                    <p className="font-semibold">{answers.education}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-purple-50 rounded-md">
                  <Code className="h-5 w-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Skills</p>
                    <p className="font-semibold">{answers.skills.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-purple-50 rounded-md">
                  <Building className="h-5 w-5 text-purple-600 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Sectors</p>
                    <p className="font-semibold">{answers.sectors.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 rounded-md">
                  <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">{answers.location}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <Link href="/intern-setu/loading">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] p-3 rounded-md font-medium flex items-center justify-center transition-all"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Looks Good!
                  </motion.button>
                </Link>
                <button 
                  onClick={() => setStep(1)}
                  className="w-full border border-black text-gray-700 p-3 rounded-md font-medium hover:bg-gray-50 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] transition-all"
                >
                  Edit Profile
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white flex flex-col relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-20 left-10 text-purple-300 opacity-40">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      <div className="absolute bottom-32 right-10 text-blue-400 opacity-50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-purple-100 h-2">
        <motion.div 
          className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 transition-all duration-500 ease-in-out" 
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>
      
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b">
        <button onClick={goBack} className="mr-4 text-gray-600">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium text-purple-800">Intern-Setu | Step {step} of {totalSteps}</h1>
      </div>
      
      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md border border-black mb-4 p-4"
            >
              <div className="flex mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-[#0047AB] font-bold">AI</span>
                </div>
                <div>
                  <p className="text-gray-800">{currentQuestion?.text}</p>
                </div>
              </div>
              
              <div className={`grid ${currentQuestion?.type === 'multi-select' && step === 3 ? 'grid-cols-2' : 'grid-cols-2'} gap-2 mt-4`}>
                {currentQuestion?.options.map((option, index) => {
                  const Icon = option.icon;
                  const isSelected = 
                    step === 2 ? answers.skills.includes(option.label) :
                    step === 3 ? answers.sectors.includes(option.label) :
                    false;
                  
                  return (
                    <motion.button
                      key={option.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOptionSelect(option.label)}
                      className={`p-3 border rounded-md transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white border-purple-600' 
                          : 'border-purple-200 hover:bg-purple-50 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className="h-4 w-4 mr-2" />
                        <span className="text-sm">{option.label}</span>
                      </div>
                      {isSelected && <Check className="h-4 w-4" />}
                    </motion.button>
                  );
                })}
              </div>
              
              {currentQuestion?.type === 'multi-select' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6"
                >
                  <button 
                    onClick={goNext}
                    disabled={!canProceed()}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] p-3 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Continue
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}