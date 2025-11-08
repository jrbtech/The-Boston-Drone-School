'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/boston-drone-school-logo.svg"
              alt="Boston Drone School"
              width={600}
              height={280}
              className="h-auto w-28 object-contain"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
            <Link href="/" className="text-gray-600 hover:text-black transition-colors">
              Home
            </Link>
            <Link href="/courses" className="text-gray-600 hover:text-black transition-colors">
              Programs
            </Link>
            <Link href="/mission" className="text-gray-600 hover:text-black transition-colors">
              Mission
            </Link>
            <Link href="/services" className="text-gray-600 hover:text-black transition-colors">
              Services
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors">
              Dashboard
            </Link>
            <Link href="/login" className="text-gray-600 hover:text-black transition-colors">
              Login
            </Link>
            <Link
              href="/register"
              className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors"
            >
              Apply
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
