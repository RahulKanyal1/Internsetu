"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingRecommendationsPage() {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const messages = [
    "AI is analyzing your profile...",
    "Finding relevant internships...",
    "Calculating match scores...",
    "Preparing your recommendations..."
  ];

  useEffect(() => {
    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => setShouldRedirect(true), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Message rotation
    const messageTimer = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2000);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      window.location.href = '/intern-setu/recommendations';
    }
  }, [shouldRedirect]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-16 left-16 text-purple-400 opacity-60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      <div className="absolute bottom-20 right-20 text-blue-400 opacity-50">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      <div className="absolute top-1/3 right-12 text-purple-300 opacity-40">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 text-center border border-purple-100"
      >
        {/* AI Brain Animation */}
        <div className="w-32 h-32 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center relative">
          {/* Animated AI brain with glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              filter: ["drop-shadow(0 0 10px rgba(147, 51, 234, 0.3))", "drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))", "drop-shadow(0 0 10px rgba(147, 51, 234, 0.3))"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"
          />
        </div>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
        >
          Intern-Setu
        </motion.h2>
        
        {/* Rotating messages */}
        <div className="h-6 mb-6">
          <motion.p 
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600"
          >
            {messages[messageIndex]}
          </motion.p>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-purple-100 h-2 rounded-full mb-4 overflow-hidden">
          <motion.div 
            className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-500 mb-6"
        >
          Usually takes 5–10 seconds
        </motion.p>
        
        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/intern-setu/recommendations" className="text-purple-600 hover:underline hover:text-purple-700 font-medium transition-colors">
              Continue to recommendations →
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}