'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api, Enrollment, Course } from '@/lib/api'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [courses, setCourses] = useState<{ [key: string]: Course }>({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active')

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    loadEnrollments(JSON.parse(userData).id)
  }, [router])

  async function loadEnrollments(userId: string) {
    try {
      setLoading(true)
      const response = await api.getUserEnrollments(userId)
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
  }

  function handleLogout() {
    localStorage.removeItem('user')
    router.push('/')
  }

  const filteredEnrollments = enrollments.filter((e) =>
    activeTab === 'active' ? e.status === 'active' : e.status === 'completed'
  )

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BDS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">The Boston Drone School</span>
            </Link>

            <nav className="flex items-center space-x-6">
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">Browse Courses</Link>
              <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              <div className="relative group">
                <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <span>{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
        <div className="bg-gradient-to-r from-blue-600 to-orange-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name?.split(' ')[0]}! 👋</h1>
          <p className="text-lg opacity-90">Continue your learning journey</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Active Courses</div>
            <div className="text-3xl font-bold text-gray-900">
              {enrollments.filter((e) => e.status === 'active').length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">
              {enrollments.filter((e) => e.status === 'completed').length}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Total Progress</div>
            <div className="text-3xl font-bold text-blue-600">
              {enrollments.length > 0
                ? Math.round(enrollments.reduce((acc, e) => acc + e.progress, 0) / enrollments.length)
                : 0}%
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Certificates</div>
            <div className="text-3xl font-bold text-orange-600">
              {enrollments.filter((e) => e.certificateUrl).length}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'active'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Active Courses ({enrollments.filter((e) => e.status === 'active').length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'completed'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading your courses...</p>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {activeTab === 'active' ? 'No Active Courses' : 'No Completed Courses Yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'active'
                ? 'Start your learning journey by enrolling in a course'
                : 'Complete your active courses to see them here'}
            </p>
            {activeTab === 'active' && (
              <Link
                href="/courses"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Browse Courses
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
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Course Thumbnail */}
                    <div className="md:w-64 h-48 bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center">
                      {course.thumbnailUrl ? (
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-6xl">🚁</span>
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
                            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          >
                            <span>📜</span>
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
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${enrollment.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4">
                        <Link
                          href={`/learn/${course.id}`}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors"
                        >
                          {enrollment.progress === 0 ? 'Start Course' : 'Continue Learning'}
                        </Link>
                        <Link
                          href={`/courses/${course.id}`}
                          className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
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
