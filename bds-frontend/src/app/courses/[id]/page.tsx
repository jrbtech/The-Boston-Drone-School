'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { api, Course } from '../../../lib/api'
import { useAuth } from '../../../contexts/AuthContext'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)

  const courseId = Array.isArray(params.id) ? params.id[0] : params.id

  const loadCourseData = useCallback(async () => {
    if (!courseId) {
      return
    }

    try {
      setLoading(true)
      const [courseResponse, lessonsResponse] = await Promise.all([
        api.getCourse(courseId as string),
        api.getCourseLessons(courseId as string)
      ])

      setCourse(courseResponse.course)
      setLessons(lessonsResponse.lessons || [])
    } catch (error) {
      console.error('Failed to load course:', error)
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    loadCourseData()
  }, [loadCourseData])

  async function handleEnroll() {
    if (!courseId) {
      return
    }

    if (!user) {
      router.push('/login')
      return
    }

    try {
      setEnrolling(true)
      // In production, this would go through payment first
      await api.enrollCourse(courseId as string)
      alert('Successfully enrolled! Redirecting to course...')
      router.push(`/learn/${courseId}`)
    } catch (error: any) {
      alert(error.message || 'Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
            <Link href="/courses" className="text-gray-900 border-b border-gray-900">
              Back to Programs
          </Link>
        </div>
      </div>
    )
  }

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

              <nav className="flex items-center space-x-6">
                <Link href="/courses" className="text-gray-700 hover:text-black transition-colors uppercase tracking-wider text-sm">Programs</Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-black transition-colors uppercase tracking-wider text-sm">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

        {/* Course Hero */}
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 border border-white/40 text-white text-xs font-semibold uppercase tracking-[0.3em]">
                  {course.category}
                </span>
                  <span className="px-3 py-1 border border-white/40 text-white text-xs font-semibold uppercase tracking-[0.3em]">
                    {course.level}
                </span>
              </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">{course.title}</h1>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">{course.description}</p>

                <div className="flex flex-wrap gap-8 text-sm uppercase tracking-[0.3em] text-gray-400 mb-10">
                  <div className="space-y-1">
                    <span className="block text-xs">Duration</span>
                    <div className="text-white">{course.duration}</div>
                </div>
                  <div className="space-y-1">
                    <span className="block text-xs">Instructor</span>
                    <div className="text-white">{course.instructor}</div>
                </div>
                  <div className="space-y-1">
                    <span className="block text-xs">Level</span>
                    <div className="text-white capitalize">{course.level}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                    className="bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-300 px-10 py-4 text-lg font-semibold uppercase tracking-widest transition-colors"
                >
                  {enrolling ? 'Enrolling...' : `Enroll Now - $${course.price}`}
                </button>
              </div>
            </div>

            <div className="relative">
                <div className="aspect-video bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
                {course.videoUrl ? (
                  <video
                    src={course.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 uppercase tracking-[0.5em]">
                      Preview
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
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-[0.2em]">Learning Outcomes</h2>
                <ul className="space-y-4 text-sm leading-relaxed text-gray-700">
                  {course.learningObjectives.map((objective, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="block h-0.5 w-10 bg-gray-900 mt-3" aria-hidden="true" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Curriculum */}
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-[0.2em]">Course Curriculum</h2>
                <div className="space-y-4">
                  {lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-gray-900 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                            <p className="text-sm text-gray-600">{lesson.description}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 uppercase tracking-[0.2em]">
                          {Math.floor(lesson.duration / 60)} min
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites */}
              {course.prerequisites.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-[0.2em]">Prerequisites</h2>
                  <ul className="space-y-3 text-sm text-gray-700">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="pl-6 relative">
                        <span className="absolute left-0 top-2 h-2 w-2 bg-gray-900" aria-hidden="true" />
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
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-900 mb-2">${course.price}</div>
                  <div className="text-gray-600 uppercase tracking-[0.3em] text-xs">One-time investment</div>
                </div>

                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold mb-6 uppercase tracking-widest transition-colors"
                >
                  {enrolling ? 'Processing...' : 'Enroll Now'}
                </button>

                <ul className="space-y-3 text-sm text-gray-700">
                  <li>Lifetime access to updated course content</li>
                  <li>Certificate of completion issued by The Boston Drone School</li>
                  <li>Downloadable operational templates and checklists</li>
                  <li>Access to quarterly alumni briefings</li>
                </ul>
              </div>

              {/* Course Materials */}
              {course.materials.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold uppercase tracking-[0.2em] text-gray-900 mb-4 text-sm">Course Materials</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {course.materials.map((material, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-gray-900" aria-hidden="true" />
                        <span>{material}</span>
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
