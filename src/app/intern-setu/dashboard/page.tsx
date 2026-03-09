'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Clock, Briefcase, CheckCircle, ArrowLeft, Calendar, TrendingUp, Eye, FileText, Bell } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('applications');

  // Mock user data
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    profileCompletion: 85,
    applications: [
      {
        id: '1',
        title: 'Frontend Developer Intern',
        company: 'TechCorp',
        companyLogo: 'TC',
        status: 'Under Review',
        statusColor: 'yellow',
        appliedDate: '2024-01-15',
        lastUpdate: '2 days ago',
        nextStep: 'Technical Assessment',
        timeline: [
          { step: 'Application Submitted', completed: true, date: '2024-01-15' },
          { step: 'Initial Review', completed: true, date: '2024-01-16' },
          { step: 'Technical Assessment', completed: false, date: 'Pending' },
          { step: 'Final Interview', completed: false, date: 'Pending' },
        ]
      },
      {
        id: '2',
        title: 'UX Design Intern',
        company: 'DesignStudio',
        companyLogo: 'DS',
        status: 'Rejected',
        statusColor: 'red',
        appliedDate: '2024-01-10',
        lastUpdate: '1 week ago',
        nextStep: 'Application Closed',
        timeline: [
          { step: 'Application Submitted', completed: true, date: '2024-01-10' },
          { step: 'Initial Review', completed: true, date: '2024-01-12' },
          { step: 'Portfolio Review', completed: true, date: '2024-01-14' },
          { step: 'Decision', completed: true, date: '2024-01-16' },
        ]
      },
      {
        id: '3',
        title: 'Marketing Analytics Intern',
        company: 'GrowthCo',
        companyLogo: 'GC',
        status: 'Interview Scheduled',
        statusColor: 'green',
        appliedDate: '2024-01-12',
        lastUpdate: '3 days ago',
        nextStep: 'Final Interview on Jan 25',
        timeline: [
          { step: 'Application Submitted', completed: true, date: '2024-01-12' },
          { step: 'Initial Review', completed: true, date: '2024-01-14' },
          { step: 'Phone Screening', completed: true, date: '2024-01-18' },
          { step: 'Final Interview', completed: false, date: '2024-01-25' },
        ]
      }
    ],
    savedInternships: [
      {
        id: '4',
        title: 'Software Engineering Intern',
        company: 'InnovateNow',
        companyLogo: 'IN',
        location: 'Seattle, WA',
        type: 'Remote',
        stipend: '$2,500/month',
        savedDate: '2024-01-18'
      },
      {
        id: '5',
        title: 'Product Management Intern',
        company: 'ProductLab',
        companyLogo: 'PL',
        location: 'San Francisco, CA',
        type: 'Hybrid',
        stipend: '$2,100/month',
        savedDate: '2024-01-17'
      }
    ],
    stats: {
      applicationsSubmitted: 3,
      interviewsScheduled: 1,
      profileViews: 12,
      savedInternships: 2
    }
  };

  const getStatusColor = (status: string, colorType: string) => {
    const colors = {
      yellow: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-300'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300'
      },
      red: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300'
      }
    };
    return colors[colorType as keyof typeof colors] || colors.yellow;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-200"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-purple-300 rounded-full animate-pulse delay-500"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            href="/intern-setu/recommendations"
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {userData.name}! 👋
          </h2>
          <p className="text-gray-600">
            Here&apos;s what&apos;s happening with your internship applications
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-lg p-6 border border-black shadow-[4px_4px_0_0_#000000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Applications</p>
                <p className="text-2xl font-bold text-gray-800">{userData.stats.applicationsSubmitted}</p>
              </div>
              <FileText className="text-purple-600" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-black shadow-[4px_4px_0_0_#000000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Interviews</p>
                <p className="text-2xl font-bold text-gray-800">{userData.stats.interviewsScheduled}</p>
              </div>
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-black shadow-[4px_4px_0_0_#000000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Profile Views</p>
                <p className="text-2xl font-bold text-gray-800">{userData.stats.profileViews}</p>
              </div>
              <Eye className="text-blue-600" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-black shadow-[4px_4px_0_0_#000000]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Saved</p>
                <p className="text-2xl font-bold text-gray-800">{userData.stats.savedInternships}</p>
              </div>
              <TrendingUp className="text-purple-600" size={24} />
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === 'applications'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === 'saved'
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Saved Internships
            </button>
          </div>
        </motion.div>

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {userData.applications.map((application, index) => (
              <div
                key={application.id}
                className="bg-white rounded-lg border border-black shadow-[4px_4px_0_0_#000000] p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold">
                      {application.companyLogo}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{application.title}</h3>
                      <p className="text-gray-600">{application.company}</p>
                      <p className="text-sm text-gray-500">Applied {application.appliedDate}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      getStatusColor(application.status, application.statusColor).bg
                    } ${getStatusColor(application.status, application.statusColor).text} ${
                      getStatusColor(application.status, application.statusColor).border
                    }`}>
                      {application.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Updated {application.lastUpdate}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Next Step:</p>
                  <p className="text-sm text-gray-600">{application.nextStep}</p>
                </div>

                {/* Timeline */}
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Application Timeline:</p>
                  <div className="flex items-center gap-4 overflow-x-auto">
                    {application.timeline.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center gap-2 min-w-fit">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {step.completed && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <div className="text-xs">
                          <p className={step.completed ? 'text-green-700 font-medium' : 'text-gray-600'}>
                            {step.step}
                          </p>
                          <p className="text-gray-500">{step.date}</p>
                        </div>
                        {stepIndex < application.timeline.length - 1 && (
                          <div className="w-8 h-px bg-gray-300 mx-2"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {userData.savedInternships.map((internship, index) => (
              <div
                key={internship.id}
                className="bg-white rounded-lg border border-black shadow-[4px_4px_0_0_#000000] p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {internship.companyLogo}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{internship.title}</h3>
                      <p className="text-gray-600 text-sm">{internship.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">Saved {internship.savedDate}</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase size={14} />
                    <span>{internship.type}</span>
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    {internship.stipend}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/intern-setu/internship/${internship.id}`}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-4 rounded-md text-sm font-medium text-center border border-black shadow-[2px_2px_0_0_#000000] hover:shadow-[3px_3px_0_0_#000000] transition-all"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-2 border border-black text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 shadow-[2px_2px_0_0_#000000] hover:shadow-[3px_3px_0_0_#000000] transition-all">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}