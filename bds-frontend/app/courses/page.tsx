'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { api, Course } from '../../lib/api'
import Footer from '@/components/layout/Footer'
import CoursesSkeleton from '@/components/CoursesSkeleton'

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Refs for managing state
  const abortControllerRef = useState<{ current: AbortController | null }>({ current: null })[0]
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const loadCourses = useCallback(async (retryCount = 0) => {
    const maxRetries = 3
    const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 5000) // Exponential backoff, max 5s

    // Cancel previous request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    try {
      setLoading(true)
      setError(null)
      console.log('[COURSES] Starting to load courses...', retryCount > 0 ? `(retry ${retryCount})` : '')

      const filters: any = {}
      if (selectedCategory !== 'all') filters.category = selectedCategory
      if (selectedLevel !== 'all') filters.level = selectedLevel

      // Create cache key from filters
      const cacheKey = `courses_${JSON.stringify(filters)}`

      // Check cache first (5 minute cache)
      if (typeof window !== 'undefined') {
        const cached = sessionStorage.getItem(cacheKey)
        if (cached) {
          try {
            const { data, timestamp } = JSON.parse(cached)
            const age = Date.now() - timestamp
            if (age < 5 * 60 * 1000) { // 5 minutes
              console.log('[COURSES] Using cached data')
              setCourses(data)
              setLoading(false)
              return
            }
          } catch (e) {
            // Invalid cache, continue to fetch
          }
        }
      }

      console.log('[COURSES] Filters:', filters)
      console.log('[COURSES] Calling api.getCourses...')

      const response = await api.getCourses(filters, signal)

      // Check if request was aborted
      if (signal.aborted) {
        console.log('[COURSES] Request was cancelled')
        return
      }

      console.log('[COURSES] Response received:', response)
      console.log('[COURSES] Courses count:', response.courses?.length)

      const coursesData = response.courses || []
      setCourses(coursesData)

      // Cache the response
      if (typeof window !== 'undefined') {
        try {
          const filters: any = {}
          if (selectedCategory !== 'all') filters.category = selectedCategory
          if (selectedLevel !== 'all') filters.level = selectedLevel
          const cacheKey = `courses_${JSON.stringify(filters)}`
          sessionStorage.setItem(cacheKey, JSON.stringify({
            data: coursesData,
            timestamp: Date.now()
          }))
        } catch (e) {
          // Cache storage failed, continue without caching
          console.warn('[COURSES] Failed to cache data:', e)
        }
      }

      console.log('[COURSES] Courses set successfully')
    } catch (error) {
      // Don't show errors for aborted requests
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('[COURSES] Request aborted')
        return
      }

      console.error('[COURSES] Failed to load courses:', error)
      console.error('[COURSES] Error details:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      })

      // Retry on network errors
      if (retryCount < maxRetries && error instanceof Error &&
          (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('timeout'))) {
        console.log(`[COURSES] Retrying in ${retryDelay}ms...`)
        setTimeout(() => loadCourses(retryCount + 1), retryDelay)
        return
      }

      setError(error instanceof Error ? error.message : 'Failed to load courses')
    } finally {
      setLoading(false)
      console.log('[COURSES] Loading complete')
    }
  }, [selectedCategory, selectedLevel])

  useEffect(() => {
    // Debounce filter changes to prevent excessive API calls
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      loadCourses()
    }, 300) // 300ms debounce

    // Cleanup on unmount or when dependencies change
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [loadCourses])

  const searchAbortControllerRef = useState<{ current: AbortController | null }>({ current: null })[0]

  async function handleSearch(e: React.FormEvent, retryCount = 0) {
    e.preventDefault()

    // Cancel any ongoing search
    if (searchAbortControllerRef.current) {
      searchAbortControllerRef.current.abort()
    }

    if (!searchQuery.trim()) {
      loadCourses()
      return
    }

    const maxRetries = 3
    const retryDelay = Math.min(1000 * Math.pow(2, retryCount), 5000)

    searchAbortControllerRef.current = new AbortController()
    const signal = searchAbortControllerRef.current.signal

    try {
      setLoading(true)
      setError(null)
      const response = await api.searchCourses(searchQuery, signal)

      if (signal.aborted) {
        console.log('[SEARCH] Request was cancelled')
        return
      }

      setCourses(response.courses || [])
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('[SEARCH] Request aborted')
        return
      }

      console.error('Search failed:', error)

      // Retry on network errors
      if (retryCount < maxRetries && error instanceof Error &&
          (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('timeout'))) {
        console.log(`[SEARCH] Retrying in ${retryDelay}ms...`)
        setTimeout(() => {
          const syntheticEvent = { preventDefault: () => {} } as React.FormEvent
          handleSearch(syntheticEvent, retryCount + 1)
        }, retryDelay)
        return
      }

      setError(error instanceof Error ? error.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

    const categories = [
      'Certification',
      'Photography',
      'Surveying',
      'Construction',
      'Commercial',
      'Consultation',
      'Flight Operations',
      'Policy',
      'Education',
      'Enterprise',
    ]
    const levels = ['beginner', 'intermediate', 'advanced']

  return (
      <div className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/TBDS GRAPHIC.jpg"
                  alt="Boston Drone School"
                  width={120}
                  height={84}
                  className="h-auto w-24 object-contain"
                />
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
                <Link href="/courses" className="text-gray-900">Programs</Link>
                <Link href="/shop" className="text-gray-600 hover:text-black transition-colors">Shop</Link>
                <Link href="/study-guide" className="text-gray-600 hover:text-black transition-colors">Free Guide</Link>
                <Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors">Dashboard</Link>
                <Link href="/login" className="text-gray-600 hover:text-black transition-colors">Login</Link>
                <Link
                  href="/register"
                  className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Apply
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative bg-black text-white py-20 md:py-24 lg:py-28 gradient-animated-bg overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-14 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-float" />
            <div className="absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float-delayed" />
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
                Coming Soon
              </span>
              <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-6 text-reveal">Academics</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-reveal stagger-1">Select a training pathway engineered for professional deployment.</h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-reveal stagger-2">
                Each syllabus blends regulatory mastery, operational precision, and analytical technique. Courses opening soon - contact us to be notified when enrollment begins!
              </p>
            </div>
          </div>
        </section>

        {/* Enrollment Notice */}
        <section className="bg-black text-white py-4 border-b-2 border-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-semibold">Courses Opening Soon</span>
              </div>
              <span className="text-sm">Express interest! Contact <a href="mailto:info@thebostondroneschool.org" className="underline font-semibold hover:text-gray-300">info@thebostondroneschool.org</a> to be notified when enrollment begins.</span>
            </div>
          </div>
        </section>

      {/* Search & Filters */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-10">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button
                type="submit"
                  className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-medium uppercase tracking-widest transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">All Levels</option>
                {levels.map(level => (
                  <option key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setSelectedCategory('all')
                setSelectedLevel('all')
                setSearchQuery('')
                // Clear all cached course data
                if (typeof window !== 'undefined') {
                  const keys = Object.keys(sessionStorage)
                  keys.forEach(key => {
                    if (key.startsWith('courses_')) {
                      sessionStorage.removeItem(key)
                    }
                  })
                }
              }}
              className="self-end px-6 py-2 text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {loading ? (
          <CoursesSkeleton />
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
              <p className="text-xl text-red-600 font-semibold mb-2">Error Loading Courses</p>
              <p className="text-gray-700 mb-4">{error}</p>
              <button
                onClick={() => loadCourses()}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No courses found matching your criteria.</p>
          </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {courses.map((course, index) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group card-sophisticated card-reveal stagger-${(index % 4) + 1}`}
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-48 bg-white overflow-hidden zoom-on-hover">
                    {course.thumbnailUrl ? (
                      <Image
                        src={course.thumbnailUrl}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-500"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        loading={index < 3 ? "eager" : "lazy"}
                        priority={index < 3}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-white p-8">
                        <Image
                          src="/images/TBDS GRAPHIC.jpg"
                          alt="Boston Drone School"
                          width={200}
                          height={140}
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4 bg-white text-black border-2 border-black px-3 py-1 text-xs font-semibold rounded-full">
                      COMING SOON
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-gray-300 shadow-sm">
                      ${course.price}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gray-600">
                      <span className="px-3 py-1 border border-gray-300 rounded-full">
                        {course.category}
                      </span>
                      <span className="px-3 py-1 border border-gray-300 rounded-full">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-gray-500">
                      <span>{course.instructor.split(',')[0]}</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
