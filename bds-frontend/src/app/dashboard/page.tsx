'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { api, Enrollment, Course } from '../../lib/api'
import { useAuth } from '../../contexts/AuthContext'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [courses, setCourses] = useState<{ [key: string]: Course }>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')

  const loadEnrollments = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.getUserEnrollments()
      const enrollmentData = response.enrollments || []
      setEnrollments(enrollmentData)

      // Load course details for each enrollment
      const coursePromises = enrollmentData.map((enrollment: Enrollment) =>
        api.getCourse(enrollment.courseId)
      )
      const courseResponses = await Promise.all(coursePromises)

      const coursesMap: { [key: string]: Course } = {}
      courseResponses.forEach((response) => {
        if (response.course) {
          coursesMap[response.course.id] = response.course
        }
      })
      setCourses(coursesMap)
    } catch (error) {
      console.error('Failed to load enrollments:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (!user) {
      router.push('/login')
      return
    }

    loadEnrollments()
  }, [authLoading, user, router, loadEnrollments])

  function handleLogout() {
    logout()
  }

  const filteredEnrollments = enrollments.filter((e) =>
    activeTab === 'active' ? e.status === 'active' : e.status === 'completed'
  )

  if (!user) return null

    return (
      <div className="min-h-screen bg-white text-gray-900">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 border border-gray-900 flex items-center justify-center text-sm font-semibold tracking-widest uppercase">
                  BDS
                </div>
                <span className="text-lg font-semibold tracking-wide uppercase text-gray-900">The Boston Drone School</span>
              </Link>

              <nav className="flex items-center gap-6 text-sm font-medium uppercase tracking-wider">
                <Link href="/courses" className="text-gray-600 hover:text-black transition-colors">Programs</Link>
                <Link href="/dashboard" className="text-gray-900">Dashboard</Link>
                <div className="relative group">
                  <button className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors">
                    <div className="w-8 h-8 border border-gray-900 rounded-full flex items-center justify-center text-xs font-semibold">
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em]">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link href="/profile" className="block px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-700 hover:bg-gray-100">
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-900 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="rounded-2xl border border-gray-900 bg-black text-white p-8 mb-8">
          <h1 className="text-3xl font-bold mb-3 uppercase tracking-[0.2em]">Welcome back, {user.name?.split(' ')[0]}</h1>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">Continue your training schedule</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Active Courses</div>
            <div className="text-3xl font-bold text-gray-900">
              {enrollments.filter((e) => e.status === 'active').length}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Completed</div>
            <div className="text-3xl font-bold text-gray-900">
              {enrollments.filter((e) => e.status === 'completed').length}
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Total Progress</div>
            <div className="text-3xl font-bold text-gray-900">
              {enrollments.length > 0
                ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
                : 0}%
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">Certificates</div>
            <div className="text-3xl font-bold text-gray-900">
              {enrollments.filter((e) => e.certificateUrl).length}
            </div>
          </div>
        </div>

          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'active'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Active Courses ({enrollments.filter((e) => e.status === 'active').length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'completed'
                      ? 'text-gray-900 border-b-2 border-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Completed ({enrollments.filter((e) => e.status === 'completed').length})
              </button>
            </div>
          </div>
        </div>

        {/* Course List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading your courses...</p>
          </div>
          ) : filteredEnrollments.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {activeTab === 'active' ? 'No Active Courses' : 'No Completed Courses Yet'}
              </h3>
              <p className="text-gray-600 mb-6 uppercase tracking-[0.2em] text-xs">
                {activeTab === 'active'
                  ? 'Enroll to begin your progression'
                  : 'Complete outstanding modules to unlock certificates'}
              </p>
              {activeTab === 'active' && (
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold uppercase tracking-[0.2em]"
                >
                  Browse Programs
                </Link>
              )}
            </div>
        ) : (
          <div className="space-y-6">
            {filteredEnrollments.map((enrollment) => {
              const course = courses[enrollment.courseId]
              if (!course) return null

                return (
                  <div
                    key={enrollment.id}
                    className="bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow overflow-hidden"
                  >
                  <div className="flex flex-col md:flex-row">
                    {/* Course Thumbnail */}
                      <div className="md:w-64 h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden">
                      {course.thumbnailUrl ? (
                        <Image
                          src={course.thumbnailUrl}
                          alt={course.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 256px, 100vw"
                          priority={false}
                        />
                      ) : (
                          <span className="text-sm uppercase tracking-[0.4em] text-gray-500">BDS</span>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                          <p className="text-gray-600">{course.instructor}</p>
                        </div>
                        {enrollment.certificateUrl && (
                          <Link
                            href={enrollment.certificateUrl}
                              className="flex items-center gap-2 px-4 py-2 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors text-xs uppercase tracking-[0.2em]"
                          >
                              <span className="font-semibold">Certificate</span>
                          </Link>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span className="font-semibold">{enrollment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                              className="bg-black h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <Link
                          href={`/learn/${course.id}`}
                            className="flex-1 bg-black hover:bg-gray-800 text-white text-center py-3 rounded-lg font-semibold uppercase tracking-[0.2em] transition-colors"
                        >
                          {enrollment.progress === 0 ? 'Start Course' : 'Continue Learning'}
                        </Link>
                        <Link
                          href={`/courses/${course.id}`}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors uppercase tracking-[0.2em] text-xs"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

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
