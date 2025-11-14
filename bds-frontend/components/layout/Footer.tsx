'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/TBDS GRAPHIC.jpg"
                alt="Boston Drone School"
                width={600}
                height={420}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Professional unmanned aircraft solutions, exam preparation resources, and comprehensive UAS consulting services.
            </p>
            <div className="space-y-2">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Partnerships</p>
              <p className="text-xs text-gray-400">NASA Mobility Network</p>
              <p className="text-xs text-gray-400">MA Drone Apprenticeship</p>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Programs
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Certification" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Part 107 Certification
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Commercial" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Commercial Operations
                </Link>
              </li>
              <li>
                <Link href="/courses?category=Education" className="text-sm text-gray-400 hover:text-white transition-colors">
                  STEM Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/mission" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Mission
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/drone-advocacy-group" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Advocacy
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/study-guide" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Free Study Guide
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Equipment Shop
                </Link>
              </li>
              <li>
                <a href="https://www.faa.gov/uas" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAA UAS Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] mb-6">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@thebostondroneschool.org"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  info@thebostondroneschool.org
                </a>
              </li>
              <li className="text-sm text-gray-400">
                Boston, Massachusetts
              </li>
              <li className="pt-4">
                <Link href="/register" className="inline-block border border-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] hover:bg-white hover:text-black transition-all">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} The Boston Drone School. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
