'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, Course } from '@/lib/api'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    loadCourseData()
  }, [params.id])

  async function loadCourseData() {
    try {
      setLoading(true)
      const [courseResponse, lessonsResponse] = await Promise.all([
        api.getCourse(params.id as string),
        api.getCourseLessons(params.id as string)
      ])

      setCourse(courseResponse.course)
      setLessons(lessonsResponse.lessons || [])
    } catch (error) {
      console.error('Failed to load course:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleEnroll() {
    // TODO: Get actual user ID from auth context
    const userId = 'user123' // Placeholder

    try {
      setEnrolling(true)
      // In production, this would go through payment first
      await api.enrollCourse(userId, params.id as string)
      alert('Successfully enrolled! Redirecting to course...')
      router.push(`/learn/${params.id}`)
    } catch (error: any) {
      alert(error.message || 'Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <Link href="/courses" className="text-blue-600 hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

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
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Course Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-orange-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full capitalize">
                  {course.level}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl opacity-90 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-sm mb-8">
                <div>
                  <span className="opacity-75">Duration</span>
                  <div className="font-semibold">{course.duration}</div>
                </div>
                <div>
                  <span className="opacity-75">Instructor</span>
                  <div className="font-semibold">{course.instructor}</div>
                </div>
                <div>
                  <span className="opacity-75">Level</span>
                  <div className="font-semibold capitalize">{course.level}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
                >
                  {enrolling ? 'Enrolling...' : `Enroll Now - $${course.price}`}
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden">
                {course.videoUrl ? (
                  <video
                    src={course.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-8xl">🚁</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
              <ul className="space-y-3">
                {course.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl mt-1">✓</span>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                          <p className="text-sm text-gray-600">{lesson.description}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.floor(lesson.duration / 60)} min
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisites.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Prerequisites</h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-700">
                      <span className="text-blue-500">•</span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">${course.price}</div>
                <div className="text-gray-600">One-time payment</div>
              </div>

              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold mb-4 transition-colors"
              >
                {enrolling ? 'Processing...' : 'Enroll Now'}
              </button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>Downloadable resources</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500">✓</span>
                  <span>AI-powered assistance</span>
                </div>
              </div>
            </div>

            {/* Course Materials */}
            {course.materials.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-gray-900 mb-4">Course Materials</h3>
                <ul className="space-y-2 text-sm">
                  {course.materials.map((material, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-700">
                      <span className="text-blue-500">📄</span>
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
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
