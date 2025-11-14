'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AutoplayVideo from "@/components/marketing/AutoplayVideo";
import LoginModal from "@/components/LoginModal";

const operations = [
  {
    title: 'Real Estate Intelligence',
    description: 'High-resolution aerial imaging and cinematic videography delivering competitive advantage in property marketing.'
  },
  {
    title: 'Photogrammetric Analysis & 3D Visualization',
    description: 'Precision geospatial mapping and three-dimensional modeling for infrastructure assessment, engineering validation, and compliance documentation.'
  },
  {
    title: 'Construction Progress Intelligence',
    description: 'Systematized aerial surveillance protocols documenting project milestones with quantifiable deliverables for stakeholder transparency.'
  },
  {
    title: 'STEM Workforce Development',
    description: 'Experiential learning programs introducing students and professionals to UAS career pathways, including hands-on FPV build kits, drone racing modules, and aerospace technology applications.'
  }
];

const missionHighlights = [
  'Strategic UAS integration roadmaps designed for public and private sector stakeholders.',
  'Proactive policy advocacy through the Boston Drone School Drone Advocacy Group.',
  'Comprehensive professional development programs cultivating operational excellence across multi-generational flight teams.'
];

const partnershipHighlights = [
  'Active member of the NASA Mobility Network (m:N) Working Group, contributing to national unmanned aircraft systems policy development.',
  "Strategic partner in Massachusetts' inaugural FAA-registered Drone Apprenticeship Program, advancing workforce development initiatives.",
  'Sustained collaborative engagements with municipal governments, academic research institutions, and enterprise organizations throughout the New England corridor.'
];

const admissionsChecklist = [
  'Expert consultation on UAS integration and operational planning.',
  'Professional training and exam preparation resources.',
  'Direct support from our team at info@thebostondroneschool.org.'
];

const videoShowcase = [
  {
    title: "Enterprise Consultation",
    src: "/videos/aerial-cinematography.mp4",
    description: "Strategic UAS integration roadmaps designed for public and private sector stakeholders seeking expert guidance on operational planning and regulatory compliance."
  },
  {
    title: "Drone Operations / STEM Workforce Training",
    src: "/videos/commercial-operations.mp4",
    description: "Comprehensive professional development programs cultivating operational excellence through hands-on training, FPV build kits, and aerospace technology applications."
  },
  {
    title: "Advocacy / Public Relations",
    src: "/videos/professional-techniques.mp4",
    poster: "/videos/professional-techniques.jpg",
    description: "Proactive policy advocacy through the Boston Drone School Drone Advocacy Group, advancing responsible UAS integration across communities and industries."
  }
];

const pricingTiers = [
  {
    name: "Part 107 Online Webinar",
    price: "$375",
    period: "one-time",
    description: "Comprehensive online FAA Part 107 certification course with live webinar support.",
    features: [
      "5 hours of online video training",
      "250+ practice exam questions",
      "2 hour live Q&A webinar office hour",
      "Interactive airspace maps",
      "Weather interpretation tutorials",
      "Exam prep checklist",
      "Lifetime course access",
      "30-day money-back guarantee"
    ],
    cta: "Enroll Now",
    ctaLink: "/checkout/part-107-complete",
    highlighted: false,
    badge: "MOST POPULAR"
  },
  {
    name: "Intensive Bootcamp",
    price: "$675",
    period: "2-day training",
    description: "Fast-track exam preparation with intensive 2-day training program.",
    features: [
      "10 hours of training in person or virtual",
      "In-person OR live virtual options",
      "Hands-on drone practice",
      "Direct instructor mentorship",
      "Exam scheduling assistance",
      "30 days post-course support",
      "All materials included",
      "Small class sizes (max 12)"
    ],
    cta: "Reserve Seat",
    ctaLink: "/checkout/part-107-intensive",
    highlighted: true,
    badge: "BEST VALUE"
  },
  {
    name: "Premium + Business",
    price: "$1650",
    period: "complete package",
    description: "For c-suite executives interested in drone training and enterprise integration.",
    features: [
      "10 hours of Part 107 edification and flight capability",
      "UAS business enterprise consultation",
      "Business formation guidance",
      "Marketing & client acquisition",
      "Equipment recommendations",
      "Legal contracts & templates",
      "1-on-1 executive mentorship",
      "Priority lifetime support"
    ],
    cta: "Get Started",
    ctaLink: "/checkout/part-107-premium",
    highlighted: false,
    badge: "PROFESSIONAL"
  }
];

export default function MarketingHomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="bg-white text-black">
      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Floating Quick Login Button - Improved mobile touch target */}
      <button
        onClick={() => setIsLoginModalOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 bg-white text-black px-4 py-3 sm:px-6 sm:py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 font-semibold flex items-center gap-2 border-2 border-black group min-h-[48px] min-w-[48px] touch-manipulation"
        aria-label="Quick login"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="hidden sm:inline">Quick Login</span>
      </button>

      {/* Pure Black Hero Section */}
      <section className="relative w-full bg-black">
        {/* Pure black background */}
        <div className="absolute inset-0 bg-black -z-10" />

        <div className="relative w-full bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 w-full">
            {/* Logo */}
            <div className="flex justify-center mb-10 sm:mb-12 md:mb-14 w-full">
              <Image
                src="/images/tbds-graphic.jpg"
                alt="Boston Drone School"
                width={200}
                height={200}
                className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto max-w-full"
                priority
                quality={75}
              />
            </div>

            {/* Badge */}
            <div className="flex justify-center mb-8 sm:mb-10 md:mb-12 w-full px-4">
              <span className="faa-certified-badge text-center max-w-full break-words text-sm sm:text-base font-bold px-6 py-3">
                NASA Network Partner
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-10 md:mb-12 leading-tight max-w-6xl mx-auto px-4">
              Professional Drone Consulting & Operational Services
            </h1>

            {/* Subheadline */}
            <p className="text-center text-white text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 md:mb-14 max-w-4xl mx-auto font-light opacity-95 leading-relaxed px-4">
              Expert consultation and advocacy for the safe integration of drone technology into your operations
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-10 md:mb-12 px-4">
              <div className="text-center py-8 px-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all duration-300 shadow-lg">
                <div className="text-white text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed">Enterprise Consultation</div>
              </div>
              <div className="text-center py-8 px-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all duration-300 shadow-lg">
                <div className="text-white text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed">Drone Operations / STEM Workforce Training</div>
              </div>
              <div className="text-center py-8 px-6 bg-white/10 rounded-xl backdrop-blur-md border border-white/15 hover:bg-white/15 hover:border-white/25 transition-all duration-300 shadow-lg">
                <div className="text-white text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed">Advocacy / Public Relations</div>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center items-center px-4 mt-8 md:mt-10 max-w-4xl mx-auto">
              <Link
                href="/services"
                className="btn-premium-cta no-underline text-center w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                <span>View Services</span>
              </Link>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="btn-tertiary no-underline text-center w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                Student Login
              </button>
              <Link
                href="/shop"
                className="btn-tertiary no-underline text-center w-full sm:w-auto min-h-[48px] touch-manipulation"
              >
                Shop Equipment
              </Link>
            </div>

            {/* Quick Access Links */}
            <div className="flex gap-4 sm:gap-6 justify-center items-center px-4 mt-8 text-base sm:text-lg text-white/70">
              <Link href="/study-guide" className="hover:text-white transition-colors underline font-medium">
                Free Study Guide
              </Link>
              <span className="text-xl">•</span>
              <Link href="/register" className="hover:text-white transition-colors underline font-medium">
                Create Account
              </Link>
            </div>

            {/* NASA Partnership Badge */}
            <p className="text-center text-white text-sm sm:text-base mt-8 md:mt-10 mb-0 opacity-90 px-4 leading-relaxed max-w-2xl mx-auto">
              Partner in Massachusetts&apos; FAA-Registered Drone Apprenticeship Program
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section - Premium Styling */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-10 reveal-on-scroll max-w-4xl mx-auto text-center">
            <span className="caption text-gray-500 block">Our Mission</span>
            <h2 className="h2 leading-tight">
              Precision unmanned aircraft operations engineered for mission-critical applications.
            </h2>
            <div className="course-card p-8 flex flex-col items-center gap-6">
              <div className="flex-shrink-0">
                <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
                  <Image
                    src="/images/gregory-anthony-blaize-real.webp"
                    alt="Gregory Anthony Blaize, Founder and FAA Certified Remote Pilot"
                    width={180}
                    height={180}
                    className="h-44 w-44 object-cover grayscale-image"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="space-y-3 text-center">
                <p className="text-base font-bold uppercase tracking-wider text-gray-900">
                  Gregory Anthony Blaize
                </p>
                <p className="caption text-gray-600">
                  Founder • FAA Certified Remote Pilot
                </p>
                <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  Gregory integrates extensive experience in governmental affairs, international relations, and law enforcement with advanced UAS operations expertise to deliver comprehensive aerial intelligence solutions.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Established in 2020, The Boston Drone School provides a strategic framework for organizational UAS integration. Our comprehensive services encompass advanced data acquisition, regulatory compliance architecture, and professional pilot development. All training programs align with current FAA regulations and industry best practices.
            </p>
            <div className="course-card p-8 bg-gray-50">
              <h3 className="caption text-gray-600 mb-6 text-center">
                What guides our work
              </h3>
              <ul className="space-y-4 max-w-2xl mx-auto">
                {missionHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-gray-700 leading-relaxed">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-black flex-shrink-0" />
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section - Premium Styling */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 reveal-on-scroll">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <span className="caption text-gray-600 block">Valuable Partnerships</span>
            <h2 className="h2 leading-tight">
              Trusted collaborators moving the drone ecosystem forward.
            </h2>
            <div className="course-card p-8 bg-white space-y-5">
              {partnershipHighlights.map((item) => (
                <p key={item} className="text-gray-700 leading-relaxed">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operations Section - Premium Card Grid */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-10 reveal-on-scroll max-w-5xl mx-auto">
            <div className="space-y-6 text-center">
              <span className="caption text-gray-500 block">Corporate Citizenship</span>
              <h2 className="h2 leading-tight">
                Cultivating Advanced UAS Professionals
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
                We architect professional development pathways for emerging talent, transitioning professionals, and established organizations while fostering the technical competencies and safety culture essential for responsible unmanned aircraft systems deployment.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {operations.map((item, index) => (
                <div
                  key={item.title}
                  className="course-card p-8 space-y-4 text-center fade-in-delayed"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold leading-tight text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <h2 className="h2 text-black">Why Boston Drone School?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-5xl lg:text-6xl font-bold text-black">NASA</div>
                <div className="font-semibold text-lg text-black">Network Partner</div>
                <p className="text-gray-600 leading-relaxed">Active member of the NASA Mobility Network (m:N) Working Group</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl lg:text-6xl font-bold text-black">2020</div>
                <div className="font-semibold text-lg text-black">Established</div>
                <p className="text-gray-600 leading-relaxed">Years of operational excellence and consulting expertise</p>
              </div>
              <div className="space-y-4">
                <div className="text-5xl lg:text-6xl font-bold text-black">MA</div>
                <div className="font-semibold text-lg text-black">Apprenticeship Partner</div>
                <p className="text-gray-600 leading-relaxed">Partner in Massachusetts&apos; FAA-registered Drone Apprenticeship Program</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training CTA Section - Pure Black */}
      <section id="courses" className="py-16 sm:py-20 md:py-24 lg:py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <span className="part-107-badge">Professional Development</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              FAA Part 107 Exam Preparation
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Comprehensive training programs to help you prepare for the FAA Part 107 Remote Pilot exam and build your UAS expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                href="/services#training"
                className="bg-white text-black px-10 py-5 font-bold text-lg hover:bg-gray-100 transition"
              >
                View Training Options
              </Link>
              <Link
                href="/portal"
                className="border-2 border-white text-white px-10 py-5 font-bold text-lg hover:bg-white hover:text-black transition"
              >
                Access Portal
              </Link>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-2xl mx-auto pt-4">
              *Training programs are designed to prepare students for the FAA Part 107 examination. Course completion does not guarantee exam passage. Individual results may vary based on study commitment and comprehension of material.
            </p>
          </div>
        </div>
      </section>

      {/* Admissions Section - White */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-2 reveal-on-scroll">
            <div className="space-y-6 text-center lg:text-left">
              <span className="caption text-gray-600 block">Professional Services & Training</span>
              <h2 className="h2 text-black leading-tight">
                Ready to Integrate Drone Technology Into Your Operations?
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Partner with us for expert consultation, operational services, and professional training tailored to your organization&apos;s needs.
              </p>
              <ul className="space-y-3 max-w-xl mx-auto lg:mx-0">
                {admissionsChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-4 text-gray-700 leading-relaxed">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-black flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="text-base text-gray-700">
                <a
                  href="mailto:info@thebostondroneschool.org"
                  className="hover:text-black transition hover:underline"
                >
                  info@thebostondroneschool.org
                </a>
              </div>
            </div>

            <div className="p-6 md:p-10 bg-gray-50 border-2 border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-black mb-6 md:mb-8">Get Started</h3>
              <form
                className="space-y-5 md:space-y-6"
                action="https://formspree.io/f/moqgdnge"
                method="POST"
              >
                <label className="block">
                  <span className="text-sm font-semibold text-black block mb-2 md:mb-3">Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border-2 border-gray-300 bg-white px-4 py-3 md:px-5 md:py-4 text-base text-black placeholder:text-gray-400 outline-none transition focus:border-black rounded min-h-[48px]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-black block mb-2 md:mb-3">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border-2 border-gray-300 bg-white px-4 py-3 md:px-5 md:py-4 text-base text-black placeholder:text-gray-400 outline-none transition focus:border-black rounded min-h-[48px]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-black block mb-2 md:mb-3">Email*</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border-2 border-gray-300 bg-white px-4 py-3 md:px-5 md:py-4 text-base text-black placeholder:text-gray-400 outline-none transition focus:border-black rounded min-h-[48px]"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-black block mb-2 md:mb-3">Attach Resume (optional)</span>
                  <input
                    type="file"
                    name="resume"
                    className="w-full border-2 border-gray-300 bg-white px-3 py-3 md:px-4 md:py-3 text-sm text-black file:mr-3 file:border-0 file:bg-black file:px-4 file:py-2 file:text-white file:font-semibold file:uppercase rounded file:rounded min-h-[48px]"
                  />
                </label>
                <button type="submit" className="w-full bg-black text-white px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-gray-900 transition rounded min-h-[48px] touch-manipulation">
                  Submit Application
                </button>
                <p className="text-xs text-gray-600 leading-relaxed pt-2">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Gray */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-8 sm:space-y-10 reveal-on-scroll max-w-4xl mx-auto">
            <div className="space-y-4 sm:space-y-6 text-center">
              <span className="caption text-gray-500 block">Common Questions</span>
              <h2 className="h2 leading-tight px-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="course-card p-6 sm:p-8 bg-white">
                <h3 className="text-lg font-semibold text-black mb-3 sm:mb-4">What qualifications do I need to start?</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  For FAA Part 107 certification, you must be at least 16 years old, able to read and speak English, and pass a TSA background check. No prior aviation experience is required. For enterprise consultation services, we work with organizations at any stage of UAS integration.
                </p>
              </div>
              <div className="course-card p-6 sm:p-8 bg-white">
                <h3 className="text-lg font-semibold text-black mb-3 sm:mb-4">How long does exam preparation typically take?</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  Most students complete our online program in 2-4 weeks at their own pace. We recommend dedicating 20-25 hours total to exam preparation regardless of the format you choose. Please note: our training programs are designed to prepare you for the exam, but course completion does not guarantee exam passage. Success depends on individual study commitment and comprehension.
                </p>
              </div>
              <div className="course-card p-6 sm:p-8 bg-white">
                <h3 className="text-lg font-semibold text-black mb-3 sm:mb-4">Do you provide hands-on flight training?</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  Yes. Our intensive bootcamp includes hands-on drone operation practice. We also offer custom flight training programs for enterprise clients and STEM workforce development initiatives. Note that the FAA Part 107 exam itself is a written knowledge test and does not require a practical flight demonstration.
                </p>
              </div>
              <div className="course-card p-6 sm:p-8 bg-white">
                <h3 className="text-lg font-semibold text-black mb-3 sm:mb-4">What happens after I earn my Part 107 certification?</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  Your Remote Pilot Certificate is valid for 24 months. We provide ongoing support including recurrent training resources, airspace authorization assistance, and consultation on operational questions. Many of our graduates go on to launch drone service businesses or integrate UAS technology into their existing professional practice.
                </p>
              </div>
              <div className="course-card p-6 sm:p-8 bg-white">
                <h3 className="text-lg font-semibold text-black mb-3 sm:mb-4">How do I choose the right training program?</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  The online webinar program works well for self-directed learners who prefer flexible scheduling. The intensive bootcamp is ideal for those who want accelerated preparation with direct instructor access. Enterprise clients seeking consultation or custom training should contact us directly at info@thebostondroneschool.org to discuss specific organizational needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section - Premium Grid */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="space-y-10 reveal-on-scroll max-w-6xl mx-auto">
            <div className="space-y-6 text-center">
              <span className="caption text-gray-500 block">Mission Footage</span>
              <h2 className="h2">
                Experience the workflows our crews deliver.
              </h2>
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Explore how Boston Drone School teams capture visuals, coach pilots, and package insights after every mission. Each short video highlights a different stage of our engagements.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {videoShowcase.map((video, index) => (
                <div key={video.src} className="space-y-4 text-center fade-in-delayed" style={{ animationDelay: `${index * 100}ms` }}>
                  <AutoplayVideo
                    src={video.src}
                    poster={video.poster || undefined}
                    title={video.title}
                    className="rounded-xl border border-gray-200 shadow-md grayscale-image"
                  />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold leading-tight text-gray-900">{video.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-10 reveal-on-scroll">
            <span className="caption text-gray-600 block">Learning Platform</span>
            <h2 className="h2 leading-tight">
              Continue inside the Boston Drone School learning portal.
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Access structured coursework, instructor feedback, and mission ready resources tailored to the engagements you explore on this site. Your next briefing, training module, or deployment plan is waiting inside the portal.
            </p>
            <div className="flex flex-wrap gap-5 justify-center">
              <Link href="/portal" className="btn-primary">
                Access Portal
              </Link>
              <Link href="/courses" className="btn-secondary">
                Browse Courses
              </Link>
            </div>
            <div className="course-card p-8 bg-gray-50 space-y-6">
              <div className="space-y-3">
                <span className="caption text-gray-500 block">Structured Programs</span>
                <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  FAA Part 107 prep, advanced photogrammetry, STEM ready instruction, and policy workflows aligned to enterprise needs.
                </p>
              </div>
              <div className="h-px w-full bg-gray-200 max-w-md mx-auto" />
              <div className="space-y-3">
                <span className="caption text-gray-500 block">Mission Support</span>
                <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  Download checklists, mission report templates, and quick reference guides updated by the Boston Drone School faculty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
