'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative container mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">
          The Boston Drone School
        </h1>
        <p className="text-xl md:text-2xl mb-4 opacity-90">
          Future Industry Optimization
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-80">
          Professional drone education and certification programs with AI-powered personalized learning. 
          Train with industry experts and advance your career in the emerging drone technology sector.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/courses" 
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Explore Courses
          </Link>
          <Link 
            href="/enrollment" 
            className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </section>
  )
}

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">BDS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">The Boston Drone School</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Courses
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Services
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Login
            </Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Sign Up
            </Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      title: "AI-Powered Learning",
      description: "Personalized course recommendations and adaptive learning paths powered by Claude AI",
      icon: "🤖"
    },
    {
      title: "Industry Expert Instructors",
      description: "Learn from certified professionals with real-world drone operation experience",
      icon: "👨‍🏫"
    },
    {
      title: "Hands-On Training",
      description: "Practical flight training with state-of-the-art drone equipment and simulators",
      icon: "🚁"
    },
    {
      title: "Certification Programs",
      description: "FAA Part 107 certification prep and advanced commercial drone operator licenses",
      icon: "📜"
    },
    {
      title: "Corporate Training",
      description: "Customized training programs for businesses integrating drone technology",
      icon: "🏢"
    },
    {
      title: "Safety First",
      description: "Comprehensive safety protocols and regulatory compliance training",
      icon: "🛡️"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced e-learning technology combined with expert instruction for comprehensive drone education
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
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
    <section className="py-16 bg-gradient-to-r from-blue-800 to-orange-600 text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
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
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Flight?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have advanced their careers through our comprehensive drone education programs
          </p>
          <Link 
            href="/enrollment" 
            className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg inline-block"
          >
            Enroll Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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