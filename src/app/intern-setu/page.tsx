"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login validation
    setTimeout(() => {
      setIsLoading(false);
      // For demo, redirect to onboarding
      window.location.href = '/intern-setu/onboarding';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-50 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative sparkles */}
      <div className="absolute top-10 left-10 text-purple-400 opacity-60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      <div className="absolute top-32 right-20 text-purple-300 opacity-40">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      <div className="absolute bottom-20 left-20 text-blue-400 opacity-50">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      <div className="absolute top-1/2 right-10 text-purple-200 opacity-30">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l3.09 6.26L22 9.27l-6.91 3.01L12 24l-3.09-11.72L2 9.27l6.91-3.01L12 0z"/>
        </svg>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100"
      >
        <div className="p-8">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
          >
            Welcome to Intern-Setu
          </motion.h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 focus:border-purple-500 transition-all"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 focus:border-purple-500 transition-all"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center"
            >
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </motion.div>
            
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1, x: [-10, 10, -10, 10, 0] }}
                transition={{ x: { duration: 0.5 } }}
                className="text-red-600 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] transition-all rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </motion.button>
          </form>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-center"
          >
            <Link href="/intern-setu/signup" className="text-sm text-purple-600 hover:underline hover:text-purple-700 transition-colors">
              Don&apos;t have an account? Sign Up
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}