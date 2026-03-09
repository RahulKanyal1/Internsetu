'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Mail, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationSuccessPage() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Mock application data
  const applicationData = {
    applicationId: `APP-${Date.now().toString().slice(-6)}`,
    internship: {
      title: "Frontend Developer Intern",
      company: "TechCorp",
      companyLogo: "TC",
      location: "San Francisco, CA",
      type: "Remote",
      duration: "3 months",
    },
    timeline: [
      { step: "Application Submitted", date: "Today", completed: true },
      { step: "Initial Review", date: "Within 2-3 days", completed: false },
      { step: "Technical Assessment", date: "Within 1 week", completed: false },
      { step: "Final Interview", date: "Within 2 weeks", completed: false },
      { step: "Decision", date: "Within 3 weeks", completed: false },
    ],
    nextSteps: [
      "Keep an eye on your email for updates from our team",
      "Check your application status in your dashboard",
      "Prepare for potential technical assessment",
      "Continue exploring other opportunities"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
      {/* Animated background elements */}
      {showConfetti && (
        <>
          <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-20 w-6 h-6 bg-blue-400 rounded-full animate-pulse delay-200"></div>
          <div className="absolute bottom-20 left-20 w-5 h-5 bg-purple-300 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-40 right-10 w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
        </>
      )}

      <main className="max-w-4xl mx-auto p-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-black shadow-[4px_4px_0_0_#000000]"
            >
              <CheckCircle size={40} className="text-green-600" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-3xl font-bold text-gray-800 mb-4"
            >
              Application Submitted Successfully! 🎉
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-lg text-gray-600 mb-2"
            >
              Thank you for applying to <span className="font-semibold text-purple-600">{applicationData.internship.company}</span>
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-gray-500"
            >
              Application ID: <span className="font-mono font-semibold">{applicationData.applicationId}</span>
            </motion.p>
          </div>

          {/* Application Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-white rounded-lg shadow-md border border-black shadow-[4px_4px_0_0_#000000] p-6 mb-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                {applicationData.internship.companyLogo}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {applicationData.internship.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-purple-600" />
                    <span>{applicationData.internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-purple-600" />
                    <span>{applicationData.internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-purple-600" />
                    <span>{applicationData.internship.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="bg-white rounded-lg shadow-md border border-black shadow-[4px_4px_0_0_#000000] p-6 mb-8"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Calendar size={20} className="text-purple-600" />
              What happens next?
            </h3>
            
            <div className="space-y-4">
              {applicationData.timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    item.completed 
                      ? 'bg-green-500' 
                      : 'bg-gray-200'
                  }`}>
                    {item.completed ? (
                      <CheckCircle size={16} className="text-white" />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${
                      item.completed ? 'text-green-800' : 'text-gray-700'
                    }`}>
                      {item.step}
                    </p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="bg-white rounded-lg shadow-md border border-black shadow-[4px_4px_0_0_#000000] p-6 mb-8"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ArrowRight size={20} className="text-purple-600" />
              Next Steps
            </h3>
            
            <ul className="space-y-3">
              {applicationData.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{step}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/intern-setu/explore"
              className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-6 rounded-md font-medium text-center border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] transition-all"
            >
              Explore More Internships
            </Link>
            
            <Link
              href="/intern-setu/dashboard"
              className="flex-1 bg-white text-purple-600 py-3 px-6 rounded-md font-medium text-center border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:bg-purple-50 transition-all"
            >
              View Dashboard
            </Link>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="text-center mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200"
          >
            <p className="text-sm text-gray-600 mb-2">
              Have questions about your application?
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <a 
                href="mailto:support@internsetu.com" 
                className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <Mail size={16} />
                support@internsetu.com
              </a>
              <a 
                href="tel:+1-555-123-4567" 
                className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition-colors"
              >
                <Phone size={16} />
                +1 (555) 123-4567
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}