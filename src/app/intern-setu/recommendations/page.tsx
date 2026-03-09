"use client";

import Link from 'next/link';
import { MapPin, Clock, Briefcase, CheckCircle, Filter, ArrowUpDown, Bookmark, Share, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function RecommendationsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [savedInternships, setSavedInternships] = useState<number[]>([]);

  // Mock data for recommendations
  const recommendations = [
    {
      id: 1,
      company: "TechCorp",
      logo: "/company-logos/techcorp.svg",
      verified: true,
      title: "Frontend Developer Intern",
      location: "Bangalore",
      duration: "3 months",
      stipend: "₹15,000/month",
      matchScore: 92,
      type: "Same City",
    },
    {
      id: 2,
      company: "DesignHub",
      logo: "/company-logos/designhub.svg",
      verified: true,
      title: "UI/UX Design Intern",
      location: "Remote",
      duration: "6 months",
      stipend: "₹10,000/month",
      matchScore: 85,
      type: "Remote",
    },
    {
      id: 3,
      company: "DataMinds",
      logo: "/company-logos/dataminds.svg",
      verified: false,
      title: "Data Analysis Intern",
      location: "Mumbai",
      duration: "4 months",
      stipend: "₹12,000/month",
      matchScore: 78,
      type: "Same State",
    },
    {
      id: 4,
      company: "GreenTech Solutions",
      logo: "/company-logos/greentech.svg",
      verified: true,
      title: "Sustainability Research Intern",
      location: "Delhi",
      duration: "5 months",
      stipend: "₹18,000/month",
      matchScore: 88,
      type: "Same State",
    },
  ];

  const filters = ['All', 'Remote', 'Same City', 'Same State'];

  const filteredRecommendations = recommendations.filter(rec => 
    activeFilter === 'All' || rec.type === activeFilter
  );

  const toggleSaved = (id: number) => {
    setSavedInternships(prev => 
      prev.includes(id) 
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-10 left-10 text-purple-300 opacity-40">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      <div className="absolute bottom-32 right-10 text-blue-400 opacity-50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10 p-4">
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
          >
            Your Top Matches
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 mt-1"
          >
            {filteredRecommendations.length} internships picked just for you
          </motion.p>
          
          {/* Filter pills */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 mt-4 overflow-x-auto pb-2"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap border border-black ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-[3px_3px_0_0_#000000]'
                    : 'text-gray-700 hover:bg-purple-50 shadow-[2px_2px_0_0_#000000] hover:shadow-[3px_3px_0_0_#000000]'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
          
          {/* Sort dropdown */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mt-3"
          >
            <p className="text-sm text-gray-500">Sorted by match score</p>
            <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
              <ArrowUpDown className="h-4 w-4 mr-1" />
              Sort
            </button>
          </motion.div>
        </div>
      </header>
      
      {/* Recommendation cards */}
      <main className="max-w-3xl mx-auto p-4 space-y-4">
        <AnimatePresence>
          {filteredRecommendations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
              <p className="text-gray-600 mb-4">Let&apos;s refine your profile to find better matches!</p>
              <Link href="/intern-setu/onboarding">
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] px-6 py-2 rounded-md font-medium transition-all">
                  Update Profile
                </button>
              </Link>
            </motion.div>
          ) : (
            filteredRecommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2, boxShadow: "0 8px 25px rgba(147, 51, 234, 0.15)" }}
                className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-purple-400 cursor-pointer"
              >
                <div className="p-4">
                  {/* Company section */}
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-md flex items-center justify-center mr-3">
                      <span className="font-bold text-white text-sm">{rec.company.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{rec.company}</h3>
                      {rec.verified && (
                        <div className="flex items-center text-xs text-green-600">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Quick actions */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaved(rec.id);
                        }}
                        className={`p-2 rounded-full transition-colors ${
                          savedInternships.includes(rec.id)
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${savedInternships.includes(rec.id) ? 'fill-current' : ''}`} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <Share className="h-4 w-4" />
                      </motion.button>
                    </div>
                    
                    {/* Match score */}
                    <div className="ml-4">
                      <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="3"
                          />
                          <motion.path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={rec.matchScore > 85 ? "#10b981" : rec.matchScore > 70 ? "#f59e0b" : "#ef4444"}
                            strokeWidth="3"
                            strokeDasharray="100"
                            initial={{ strokeDashoffset: 100 }}
                            animate={{ strokeDashoffset: 100 - rec.matchScore }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
                          {rec.matchScore}%
                        </div>
                      </div>
                      <div className="text-xs text-center text-gray-500 mt-1">Match</div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <h2 className="text-lg font-semibold mb-3 text-gray-900">{rec.title}</h2>
                  <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#0047AB]" />
                      <span>{rec.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[#0047AB]" />
                      <span>{rec.duration}</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <Briefcase className="h-4 w-4 mr-2 text-[#0047AB]" />
                      <span className="font-semibold text-green-600">{rec.stipend}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4">
                    <Link href={`/intern-setu/internship/${rec.id}`} className="flex-1">
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] py-2.5 px-4 rounded-md font-medium transition-all"
                      >
                        Apply Now
                      </motion.button>
                    </Link>
                    <Link href={`/intern-setu/internship/${rec.id}`}>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2.5 border border-black text-gray-700 rounded-md font-medium hover:bg-gray-50 shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] transition-all"
                      >
                        More Info
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}