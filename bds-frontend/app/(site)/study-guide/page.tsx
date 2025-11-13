'use client'

import Link from "next/link";
import { useState } from "react";

export default function StudyGuidePage() {
  const [email, setEmail] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Submit email to Formspree
    try {
      await fetch('https://formspree.io/f/moqgdnge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          form_type: 'study_guide_download',
          download_item: 'FAA Part 107 Study Guide'
        })
      });

      setDownloaded(true);
      // Open the official FAA study guide
      window.open('https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf', '_blank');
    } catch (err) {
      console.error('Failed to submit email:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Boston Drone School
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/courses" className="text-gray-600 hover:text-black">Courses</Link>
              <Link href="/login" className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero */}
          <div className="space-y-6 text-center">
            <span className="inline-block bg-gray-100 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              100% Free
            </span>
            <h1 className="h1">FAA Part 107 Study Resources</h1>
            <p className="body-large text-gray-700 max-w-3xl mx-auto">
              Get instant access to essential study materials for your FAA Remote Pilot certification exam. No credit card required.
            </p>
          </div>

          {/* Main Download Card */}
          {!downloaded ? (
            <div className="course-card p-10 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="h2 mb-3">Official FAA Remote Pilot Study Guide</h2>
                  <p className="body text-gray-700 mb-6">
                    The authoritative reference published by the FAA. This comprehensive guide covers all topics tested on the Part 107 exam, including regulations, airspace, weather, and flight operations.
                  </p>

                  <form onSubmit={handleDownload} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Enter your email to download
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-gray-600 focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {loading ? 'Sending...' : 'Download Free'}
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600">
                      By downloading, you agree to receive helpful study tips from Boston Drone School. Unsubscribe anytime.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="course-card p-6 md:p-8 md:p-10 bg-gray-100 border-2 border-gray-200 text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="h2 mb-4">Download Started!</h2>
              <p className="body text-gray-700 mb-6">
                Your study guide is downloading now. Check your Downloads folder if it doesn&apos;t open automatically.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                We&apos;ve also sent a confirmation email to <strong>{email}</strong> with additional resources.
              </p>
              <a
                href="https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-black600 hover:text-black700 font-semibold"
              >
                Click here if download didn&apos;t start
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}

          {/* Additional Free Resources */}
          <div className="space-y-6">
            <h2 className="h2 text-center">Additional Free Resources</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* FAA Regulations */}
              <div className="course-card p-6 md:p-8">
                <h3 className="h3 mb-4 flex items-center gap-3">
                  <svg className="w-6 h-6 text-black600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  FAA Part 107 Regulations
                </h3>
                <p className="body text-gray-700 mb-4">
                  Read the official regulations governing small unmanned aircraft operations.
                </p>
                <a
                  href="https://www.ecfr.gov/current/title-14/chapter-I/subchapter-F/part-107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black600 hover:text-black700 font-semibold text-sm flex items-center gap-2"
                >
                  View Regulations
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Airspace Map */}
              <div className="course-card p-6 md:p-8">
                <h3 className="h3 mb-4 flex items-center gap-3">
                  <svg className="w-6 h-6 text-black600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Airspace Information
                </h3>
                <p className="body text-gray-700 mb-4">
                  Interactive maps to understand controlled airspace and flight restrictions.
                </p>
                <a
                  href="https://www.faa.gov/uas/getting_started/where_can_i_fly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black600 hover:text-black700 font-semibold text-sm flex items-center gap-2"
                >
                  Explore Airspace
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Practice Test Prep */}
              <div className="course-card p-6 md:p-8">
                <h3 className="h3 mb-4 flex items-center gap-3">
                  <svg className="w-6 h-6 text-black600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Exam Testing Centers
                </h3>
                <p className="body text-gray-700 mb-4">
                  Find FAA-approved testing centers near you to schedule your Part 107 exam.
                </p>
                <a
                  href="https://www.faa.gov/training_testing/testing/test_centers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black600 hover:text-black700 font-semibold text-sm flex items-center gap-2"
                >
                  Find Test Centers
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Weather Resources */}
              <div className="course-card p-6 md:p-8">
                <h3 className="h3 mb-4 flex items-center gap-3">
                  <svg className="w-6 h-6 text-black600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                  Aviation Weather
                </h3>
                <p className="body text-gray-700 mb-4">
                  Learn to read METARs, TAFs, and other aviation weather products.
                </p>
                <a
                  href="https://www.aviationweather.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black600 hover:text-black700 font-semibold text-sm flex items-center gap-2"
                >
                  View Weather Resources
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* CTA for Full Course */}
          <div className="course-card p-8 md:p-10 lg:p-12 bg-black text-white text-center">
            <h2 className="h2 text-white mb-4">Ready for Structured Training?</h2>
            <p className="body text-white/80 mb-8 max-w-2xl mx-auto">
              While these free resources are helpful, our comprehensive courses provide structured learning paths, practice exams, and expert instruction to help you pass on your first attempt.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/#courses" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View Full Courses
              </Link>
              <Link href="/inquiry" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
