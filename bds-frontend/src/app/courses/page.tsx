'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { api, Course } from '../../lib/api'

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true)
      const filters: any = {}
      if (selectedCategory !== 'all') filters.category = selectedCategory
      if (selectedLevel !== 'all') filters.level = selectedLevel

      const response = await api.getCourses(filters)
      setCourses(response.courses || [])
    } catch (error) {
      console.error('Failed to load courses:', error)
    } finally {
      setLoading(false)
    }
  }, [selectedCategory, selectedLevel])

  useEffect(() => {
    loadCourses()
  }, [loadCourses])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) {
      loadCourses()
      return
    }

    try {
      setLoading(true)
      const response = await api.searchCourses(searchQuery)
      setCourses(response.courses || [])
    } catch (error) {
      console.error('Search failed:', error)
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
                  src="/images/boston-drone-school-logo-real.jpg"
                  alt="Boston Drone School"
                  width={120}
                  height={84}
                  className="h-auto w-24 object-contain"
                />
              </Link>

              <nav className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
                <Link href="/courses" className="text-gray-900">Programs</Link>
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
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl">
              <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-5">Academics</p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Select a training pathway engineered for professional deployment.</h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Each syllabus blends regulatory mastery, operational precision, and analytical technique. Filter by specialization or experience level to identify the program that meets your mission profile.
              </p>
            </div>
          </div>
        </section>

      {/* Search & Filters */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-6 py-6">
            <form onSubmit={handleSearch} className="mb-6">
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

          <div className="flex flex-wrap gap-4">
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
              }}
              className="self-end px-6 py-2 text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No courses found matching your criteria.</p>
          </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
                >
                  {/* Course Thumbnail */}
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {course.thumbnailUrl ? (
                      <Image
                        src={course.thumbnailUrl}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        priority={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-lg tracking-[0.5em] uppercase text-gray-500">BDS</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-xs font-semibold tracking-widest uppercase border border-gray-300">
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
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 The Boston Drone School - All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  )
}
