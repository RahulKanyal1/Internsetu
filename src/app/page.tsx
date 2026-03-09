export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Ultra Clean */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-3.5">
          <div className="flex items-center justify-between">
            {/* Logo - Simple and Clean */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">IS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                InternSetu
              </span>
            </div>

            {/* Navigation Links - Clean and Professional */}
            <div className="flex items-center gap-3">
              <a href="/student" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition text-sm">
                For Students
              </a>
              <a href="/company" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition text-sm">
                For Companies
              </a>
              
              {/* Interview Buttons */}
              <a href="#video-interview" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                Video Interview
              </a>
              <a href="#text-interview" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                Text Interview
              </a>
              
              <a href="/student/signup" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg text-sm">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Starts Immediately After Nav */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6 text-xs font-semibold shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              AI-Powered Matching Technology
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              Corporate Internships Made{' '}
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent mt-1">
                Smart & Fair
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-gray-600 mb-3 leading-relaxed max-w-3xl mx-auto">
              Upload your resume. Get AI-powered ATS screening. Receive actionable feedback.
            </p>
            <p className="text-sm md:text-base text-gray-500 mb-10 leading-relaxed max-w-2xl mx-auto">
              Match with your perfect corporate internship using intelligent allocation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="/student/signup" className="group px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200">
                Find Your Internship
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="/company/signup" className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all font-semibold text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
                Post Opportunities
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-10 max-w-2xl mx-auto pt-10 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                  95%
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Match Accuracy
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                  500+
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Companies
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-1">
                  10k+
                </div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Students Placed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                The Problem We're Solving
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Traditional internship processes are broken. We're fixing them with AI.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Problems */}
              <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-red-900 mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Current Challenges
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-red-600 font-bold text-base flex-shrink-0">✗</span>
                    <span className="font-medium">No transparency in ATS resume evaluation</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-red-600 font-bold text-base flex-shrink-0">✗</span>
                    <span className="font-medium">Zero feedback when rejected</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-red-600 font-bold text-base flex-shrink-0">✗</span>
                    <span className="font-medium">Skill-requirement mismatch</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-red-600 font-bold text-base flex-shrink-0">✗</span>
                    <span className="font-medium">Manual, time-consuming HR processes</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-red-600 font-bold text-base flex-shrink-0">✗</span>
                    <span className="font-medium">Lost improvement opportunities</span>
                  </li>
                </ul>
              </div>

              {/* Solutions */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 shadow-md">
                <h3 className="text-xl font-bold text-green-900 mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Our AI Solution
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-green-600 font-bold text-base flex-shrink-0">✓</span>
                    <span className="font-medium">AI-powered transparent ATS screening</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-green-600 font-bold text-base flex-shrink-0">✓</span>
                    <span className="font-medium">Detailed AI-generated feedback</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-green-600 font-bold text-base flex-shrink-0">✓</span>
                    <span className="font-medium">Smart skill-based matching</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-green-600 font-bold text-base flex-shrink-0">✓</span>
                    <span className="font-medium">Automated allocation engine</span>
                  </li>
                  <li className="flex items-start gap-2 text-gray-700 text-sm">
                    <span className="text-green-600 font-bold text-base flex-shrink-0">✓</span>
                    <span className="font-medium">Actionable improvement suggestions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-br from-slate-50 to-gray-100 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              How It Works
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Three simple steps to your perfect internship match
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:border-blue-300 transition-all transform hover:-translate-y-1 duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-5 shadow-md">
                1
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Upload Resume</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Students upload their resumes to apply for corporate internships through our intelligent platform.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100 hover:border-purple-300 transition-all transform hover:-translate-y-1 duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-5 shadow-md">
                2
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">AI ATS Screening</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our AI-powered ATS automatically screens resumes against company requirements and job descriptions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:border-green-300 transition-all transform hover:-translate-y-1 duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-5 shadow-md">
                3
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Get Feedback</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Rejected? Receive detailed AI feedback explaining missing skills and improvement suggestions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Powered by Advanced AI
              </h2>
              <p className="text-base opacity-90 max-w-2xl mx-auto">
                Our intelligent system provides personalized, actionable insights to boost your career
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <h4 className="font-bold text-lg mb-2">💡 Smart Resume Analysis</h4>
                <p className="text-sm opacity-90">"Add measurable Data Analysis project" • "Include Cloud Computing certifications"</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <h4 className="font-bold text-lg mb-2">🎯 Missing Skills Detection</h4>
                <p className="text-sm opacity-90">Identifies gaps between your resume and job requirements with precision</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <h4 className="font-bold text-lg mb-2">🔑 Keyword Optimization</h4>
                <p className="text-sm opacity-90">Shows which keywords and experiences were weak or missing</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <h4 className="font-bold text-lg mb-2">📈 Improvement Roadmap</h4>
                <p className="text-sm opacity-90">Step-by-step suggestions to enhance your profile for better matches</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-2xl p-12 text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Internship Search?
            </h2>
            <p className="text-base mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of students finding their perfect internship match with AI-powered precision
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/student/signup" className="group px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all font-semibold text-base shadow-lg transform hover:-translate-y-0.5">
                Get Started as Student
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a href="/company/signup" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-base shadow-lg transform hover:-translate-y-0.5 border border-white/20">
                Post as Company
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-md"></div>
              <span className="text-xl font-bold text-white">InternSetu</span>
            </div>
            <p className="text-sm mb-6 text-gray-400">
              AI-Based Smart Allocation Engine for Corporate Internships
            </p>
            <div className="flex items-center justify-center gap-6 mb-6 text-sm">
              <a href="/about" className="hover:text-white transition">About</a>
              <a href="/contact" className="hover:text-white transition">Contact</a>
              <a href="/privacy" className="hover:text-white transition">Privacy</a>
              <a href="/terms" className="hover:text-white transition">Terms</a>
            </div>
            <p className="text-xs text-gray-500">© 2025 InternSetu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
