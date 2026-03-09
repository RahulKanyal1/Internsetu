'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, Briefcase, ArrowLeft, Star, Bookmark, Users } from 'lucide-react';
import Link from 'next/link';

export default function ExploreInternsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [savedInternships, setSavedInternships] = useState<string[]>(['1', '3']);

  const filters = ['All', 'Remote', 'On-site', 'Hybrid', 'Part-time', 'Full-time'];
  const locations = ['All Locations', 'San Francisco', 'New York', 'Austin', 'Seattle', 'Remote'];
  const categories = ['All Categories', 'Technology', 'Marketing', 'Design', 'Finance', 'Operations'];

  // Mock internship data
  const allInternships = [
    {
      id: '1',
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      companyLogo: 'TC',
      location: 'San Francisco, CA',
      type: 'Remote',
      duration: '3 months',
      stipend: '$2,000/month',
      description: 'Work on cutting-edge web applications using React and TypeScript.',
      skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
      posted: '2 days ago',
      applicants: 45,
      rating: 4.8,
      category: 'Technology',
      requirements: ['Currently pursuing CS/related degree', '1+ years experience with React'],
      isUrgent: true,
    },
    {
      id: '2',
      title: 'UX Design Intern',
      company: 'DesignStudio',
      companyLogo: 'DS',
      location: 'New York, NY',
      type: 'On-site',
      duration: '4 months',
      stipend: '$1,800/month',
      description: 'Create beautiful and functional user experiences for mobile and web.',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      posted: '1 week ago',
      applicants: 23,
      rating: 4.6,
      category: 'Design',
      requirements: ['Portfolio showcasing UX work', 'Proficiency in design tools'],
      isUrgent: false,
    },
    {
      id: '3',
      title: 'Marketing Analytics Intern',
      company: 'GrowthCo',
      companyLogo: 'GC',
      location: 'Austin, TX',
      type: 'Hybrid',
      duration: '6 months',
      stipend: '$1,500/month',
      description: 'Analyze marketing campaigns and help optimize customer acquisition.',
      skills: ['Google Analytics', 'SQL', 'Excel', 'Data Visualization'],
      posted: '3 days ago',
      applicants: 31,
      rating: 4.7,
      category: 'Marketing',
      requirements: ['Basic knowledge of analytics tools', 'Strong analytical skills'],
      isUrgent: false,
    },
    {
      id: '4',
      title: 'Software Engineering Intern',
      company: 'InnovateNow',
      companyLogo: 'IN',
      location: 'Seattle, WA',
      type: 'Remote',
      duration: '3 months',
      stipend: '$2,500/month',
      description: 'Build scalable backend systems and APIs for our platform.',
      skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      posted: '5 days ago',
      applicants: 67,
      rating: 4.9,
      category: 'Technology',
      requirements: ['CS degree in progress', 'Experience with Python'],
      isUrgent: true,
    },
    {
      id: '5',
      title: 'Financial Analyst Intern',
      company: 'FinanceHub',
      companyLogo: 'FH',
      location: 'New York, NY',
      type: 'On-site',
      duration: '4 months',
      stipend: '$2,200/month',
      description: 'Support financial planning and analysis for growing startup.',
      skills: ['Excel', 'Financial Modeling', 'Python', 'PowerBI'],
      posted: '1 day ago',
      applicants: 19,
      rating: 4.5,
      category: 'Finance',
      requirements: ['Finance/Economics major', 'Advanced Excel skills'],
      isUrgent: false,
    },
    {
      id: '6',
      title: 'Product Management Intern',
      company: 'ProductLab',
      companyLogo: 'PL',
      location: 'San Francisco, CA',
      type: 'Hybrid',
      duration: '5 months',
      stipend: '$2,100/month',
      description: 'Drive product strategy and work closely with engineering teams.',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile'],
      posted: '1 week ago',
      applicants: 38,
      rating: 4.8,
      category: 'Technology',
      requirements: ['Business/Engineering background', 'Interest in product management'],
      isUrgent: false,
    },
  ];

  const filteredInternships = allInternships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'All' || internship.type === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const toggleSave = (id: string) => {
    setSavedInternships(prev =>
      prev.includes(id)
        ? prev.filter(savedId => savedId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-200"></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-purple-300 rounded-full animate-pulse delay-500"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/intern-setu/recommendations"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Explore All Internships</h1>
            <div className="w-16"></div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search bar */}
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 overflow-x-auto">
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
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>{filteredInternships.length} internships found</span>
            <span>Updated 2 hours ago</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 pb-8">
        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInternships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] transition-all cursor-pointer group"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center text-white font-bold">
                      {internship.companyLogo}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">
                        {internship.title}
                      </h3>
                      <p className="text-gray-600 font-medium">{internship.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {internship.isUrgent && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium border border-red-300">
                        Urgent
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(internship.id);
                      }}
                      className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                    >
                      <Bookmark
                        size={18}
                        className={savedInternships.includes(internship.id) ? 'text-purple-600 fill-current' : 'text-gray-400'}
                      />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} className="text-purple-600" />
                      <span>{internship.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} className="text-purple-600" />
                      <span>{internship.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} className="text-purple-600" />
                      <span>{internship.type}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm line-clamp-2">
                    {internship.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full border border-purple-300"
                      >
                        {skill}
                      </span>
                    ))}
                    {internship.skills.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{internship.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-semibold text-green-600">{internship.stipend}</span>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{internship.applicants} applied</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-current" />
                      <span>{internship.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/intern-setu/internship/${internship.id}`}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-md text-sm font-medium border border-black shadow-[2px_2px_0_0_#000000] hover:shadow-[3px_3px_0_0_#000000] transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredInternships.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No internships found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('All');
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Load more */}
        {filteredInternships.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="bg-white text-purple-600 px-8 py-3 rounded-md font-medium border border-black shadow-[4px_4px_0_0_#000000] hover:shadow-[6px_6px_0_0_#000000] hover:bg-purple-50 transition-all">
              Load More Internships
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}