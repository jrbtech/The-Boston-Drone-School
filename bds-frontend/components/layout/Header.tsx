'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'

export default function Header() {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/TBDS GRAPHIC.jpg"
              alt="Boston Drone School"
              width={600}
              height={420}
              className="h-auto w-32 md:w-36 object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
            <Link
              href="/"
              className={`transition-colors ${isActive('/') && pathname === '/' ? 'text-black' : 'text-gray-600 hover:text-black'}`}
            >
              Home
            </Link>
            <Link
              href="/courses"
              className={`transition-colors ${isActive('/courses') ? 'text-black' : 'text-gray-600 hover:text-black'}`}
            >
              Programs
            </Link>
            <Link
              href="/services"
              className={`transition-colors ${isActive('/services') ? 'text-black' : 'text-gray-600 hover:text-black'}`}
            >
              Services
            </Link>
            <Link
              href="/mission"
              className={`transition-colors ${isActive('/mission') ? 'text-black' : 'text-gray-600 hover:text-black'}`}
            >
              Mission
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`transition-colors ${isActive('/dashboard') ? 'text-black' : 'text-gray-600 hover:text-black'}`}
                >
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
                    <div className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center text-xs font-semibold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-200">
                      {user.email}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="border-2 border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors rounded"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-900 p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-gray-200 mt-3">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${isActive('/') && pathname === '/' ? 'text-black bg-gray-100' : 'text-gray-600'}`}
              >
                Home
              </Link>
              <Link
                href="/courses"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${isActive('/courses') ? 'text-black bg-gray-100' : 'text-gray-600'}`}
              >
                Programs
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${isActive('/services') ? 'text-black bg-gray-100' : 'text-gray-600'}`}
              >
                Services
              </Link>
              <Link
                href="/mission"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${isActive('/mission') ? 'text-black bg-gray-100' : 'text-gray-600'}`}
              >
                Mission
              </Link>

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 text-sm uppercase tracking-wider transition-colors ${isActive('/dashboard') ? 'text-black bg-gray-100' : 'text-gray-600'}`}
                  >
                    Dashboard
                  </Link>
                  <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200">
                    {user.email}
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm uppercase tracking-wider text-gray-600"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="px-4 py-2 text-sm uppercase tracking-wider text-gray-900 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-sm uppercase tracking-wider text-gray-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mx-4 border-2 border-gray-900 px-6 py-2 text-sm uppercase tracking-wider text-center hover:bg-gray-900 hover:text-white transition-colors rounded"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
