'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/boston-drone-school-logo-real.jpg"
                alt="Boston Drone School"
                width={160}
                height={112}
                className="h-auto w-32 object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Professional unmanned aircraft solutions, FAA-certified training, and comprehensive regulatory guidance.
            </p>
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
                  Advocacy Group
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
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
              <li>
                <Link href="/register" className="inline-block mt-4 border border-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] hover:bg-white hover:text-black transition-all">
                  Apply Now
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
