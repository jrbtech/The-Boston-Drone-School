'use client'

import { useState } from 'react'
import Link from 'next/link'

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-gray-900 opacity-90" />
      <div className="relative container mx-auto px-6 py-24">
        <div className="max-w-4xl">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-6">
            Boston&apos;s Premier Unmanned Aviation Academy
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
            Drone mastery for professionals who refuse compromise.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl">
            The Boston Drone School delivers intensive training, disciplined flight labs, and certification programs designed for pilots, engineers, and operations leaders shaping the next era of aerial services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center bg-white text-black px-10 py-4 text-lg font-semibold uppercase tracking-wide transition-all duration-200 hover:bg-gray-200"
            >
              View Programs
            </Link>
            <Link
              href="/enrollment"
              className="inline-flex items-center justify-center border border-white text-white px-10 py-4 text-lg font-semibold uppercase tracking-wide transition-all duration-200 hover:bg-white hover:text-black"
            >
              Request Enrollment
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 border border-gray-900 flex items-center justify-center text-sm font-semibold tracking-widest uppercase">
                BDS
              </div>
              <span className="text-lg font-semibold tracking-wide text-gray-900 uppercase">
                The Boston Drone School
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
              <Link href="/courses" className="text-gray-800 hover:text-black transition-colors">Programs</Link>
              <Link href="/about" className="text-gray-600 hover:text-black transition-colors">About</Link>
              <Link href="/services" className="text-gray-600 hover:text-black transition-colors">Services</Link>
              <Link href="/contact" className="text-gray-600 hover:text-black transition-colors">Contact</Link>
              <Link href="/login" className="text-gray-900 hover:text-black transition-colors">Login</Link>
              <Link
                href="/signup"
                className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors"
              >
                Apply
              </Link>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-6">
              <div className="flex flex-col gap-4 text-sm font-medium uppercase tracking-wider text-gray-700">
                <Link href="/courses" className="transition-colors hover:text-black">Programs</Link>
                <Link href="/about" className="transition-colors hover:text-black">About</Link>
                <Link href="/services" className="transition-colors hover:text-black">Services</Link>
                <Link href="/contact" className="transition-colors hover:text-black">Contact</Link>
                <Link href="/login" className="transition-colors hover:text-black">Login</Link>
                <Link
                  href="/signup"
                  className="border border-gray-900 px-6 py-2 text-center hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Apply
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      title: 'Precision-Crafted Curriculum',
      description: 'Sequenced instruction refined with industry advisors, covering mission planning, flight control, and data workflows.'
    },
    {
      title: 'Instructors with Flight Hours',
      description: 'Certified pilots and operations directors deliver practitioner-led workshops anchored in real deployments.'
    },
    {
      title: 'Hands-On Flight Laboratories',
      description: 'Structured field exercises and simulator time ensure graduates master manual, automated, and BVLOS operations.'
    },
    {
      title: 'Compliance and Risk Governance',
      description: 'Dedicated modules on regulatory frameworks, safety management, and enterprise-grade documentation.'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for mission-ready pilots and operations teams.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every course is developed in collaboration with aerospace counsel, insurers, and commercial drone leaders to ensure you graduate with capabilities that meet the expectations of regulated enterprises.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="border border-gray-200 p-6 flex flex-col gap-4 bg-white transition-shadow duration-200 hover:shadow-xl">
                <div className="h-[2px] w-16 bg-gray-900" />
                <h3 className="text-lg font-semibold text-gray-900 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Stats Section
const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Students Trained" },
    { number: "95%", label: "Certification Rate" },
    { number: "50+", label: "Corporate Clients" },
    { number: "10+", label: "Course Programs" }
  ]

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-3">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">{stat.number}</div>
              <div className="text-sm uppercase tracking-[0.2em] text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main Homepage Component
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      
      {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-end">
              <div>
                <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-4">Enrollment</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Admissions interviews are conducted monthly for limited cohort placements.
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Submit your experience and training goals to join a cohort tailored to commercial, public safety, or enterprise flight operations.
                </p>
              </div>
              <div className="md:text-right">
                <Link
                  href="/enrollment"
                  className="inline-flex items-center justify-center border border-white px-10 py-4 text-lg font-semibold uppercase tracking-wide transition-colors duration-200 hover:bg-white hover:text-black"
                >
                  Begin Application
                </Link>
              </div>
            </div>
          </div>
        </section>

      {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">The Boston Drone School</h3>
                <p className="text-gray-400">
                  Professional drone education for the future workforce
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Courses</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/courses/basic" className="hover:text-white">Basic Pilot Training</Link></li>
                  <li><Link href="/courses/commercial" className="hover:text-white">Commercial Operations</Link></li>
                  <li><Link href="/courses/photography" className="hover:text-white">Drone Photography</Link></li>
                  <li><Link href="/courses/mapping" className="hover:text-white">Aerial Mapping</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/services/media" className="hover:text-white">Real Estate Media</Link></li>
                  <li><Link href="/services/mapping" className="hover:text-white">Photogrammetry</Link></li>
                  <li><Link href="/services/construction" className="hover:text-white">Construction Management</Link></li>
                  <li><Link href="/services/consultation" className="hover:text-white">Consultation</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <div className="space-y-2 text-gray-400">
                  <p>info@thebostondroneschool.org</p>
                  <p>Boston, Massachusetts</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 The Boston Drone School - All Rights Reserved</p>
            </div>
          </div>
        </footer>
    </main>
  )
}