'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { api, Course, Lesson } from '../../../lib/api'
import { useAuth } from '../../../contexts/AuthContext'
import VideoModal from '../../../components/VideoModal'

const formatLessonDuration = (duration: number): string => {
  if (!duration || Number.isNaN(duration)) {
    return 'Self-paced'
  }

  if (duration >= 60) {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60

    if (minutes === 0) {
      return `${hours}h`
    }

    return `${hours}h ${minutes}m`
  }

  return `${duration} min`
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolling, setEnrolling] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

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

    // Check if already enrolled
    try {
      const enrollments = await api.getUserEnrollments()
      const existingEnrollment = enrollments.enrollments?.find(
        (e: any) => e.courseId === courseId
      )

      if (existingEnrollment) {
        router.push(`/learn/${courseId}`)
        return
      }
    } catch (error) {
      console.error('Error checking enrollments:', error)
    }

    // Redirect to checkout for payment
    router.push(`/checkout/${courseId}`)
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
                <Image
                  src="/images/boston-drone-school-logo-real.jpg"
                  alt="Boston Drone School"
                  width={120}
                  height={84}
                  className="h-auto w-24 object-contain"
                />
            </Link>

              <nav className="flex items-center space-x-6">
                <Link href="/courses" className="text-gray-700 hover:text-black transition-colors uppercase tracking-wider text-sm">Programs</Link>
                <Link href="/dashboard" className="text-gray-700 hover:text-black transition-colors uppercase tracking-wider text-sm">Dashboard</Link>
            </nav>
          </div>
        </div>
      </header>

        {/* Course Hero with Background Image */}
      <section className="relative bg-black text-white py-20 overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/95 to-black z-10" />
          <div className="absolute inset-0 opacity-20">
            <Image
              src="/images/drone-flight-bg.jpg"
              alt="Drone flight background"
              fill
              className="object-cover"
              priority
              onError={(e) => {
                // Fallback to gradient if image fails
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
          {/* Animated gradient orbs */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 animate-fadeIn">
              {/* Badge Tags */}
              <div className="flex gap-2 mb-4">
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold uppercase tracking-[0.3em] rounded-lg">
                  {course.category}
                </span>
                <span className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold uppercase tracking-[0.3em] rounded-lg">
                  {course.level}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300">
                {course.title}
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                {course.description}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
                  <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-2">Duration</div>
                  <div className="text-white font-bold text-xl">{course.duration}</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
                  <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-2">Instructor</div>
                  <div className="text-white font-bold text-xl">Expert</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-center hover:bg-white/10 transition-all">
                  <div className="text-xs text-gray-400 uppercase tracking-[0.3em] mb-2">Level</div>
                  <div className="text-white font-bold text-xl capitalize">{course.level}</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="group relative bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-white disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-300 px-10 py-4 text-lg font-semibold uppercase tracking-widest transition-all rounded-lg overflow-hidden"
                >
                  <span className="relative z-10">
                    {enrolling ? 'Processing...' : `Enroll Now - $${course.price}`}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>FAA Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Certificate of Completion</span>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <div className="relative animate-fadeIn delay-200">
              <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl overflow-hidden shadow-2xl group">
                {/* Preview Image/Thumbnail */}
                <div className="absolute inset-0">
                  {course.thumbnailUrl ? (
                    <Image
                      src={course.thumbnailUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 border-2 border-white/20 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-white/60 text-sm uppercase tracking-[0.3em]">Course Preview</div>
                      </div>
                    </div>
                  )}

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Play Button Overlay */}
                {course.videoUrl && (
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="absolute inset-0 flex items-center justify-center group-hover:bg-black/30 transition-all"
                  >
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all shadow-2xl">
                      <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="text-sm font-semibold uppercase tracking-[0.2em]">Watch Preview</div>
                      <div className="text-xs text-gray-300 mt-1">Click to play course introduction</div>
                    </div>
                  </button>
                )}

                {/* Decorative corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30" />
              </div>

              {/* Floating stats */}
              <div className="absolute -bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-2xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="text-yellow-400">★★★★★</div>
                    <span className="text-white text-sm">4.9/5.0 Rating</span>
                  </div>
                  <div className="text-white text-sm">{lessons.length} Modules</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {course.videoUrl && (
        <VideoModal
          isOpen={showVideoModal}
          onClose={() => setShowVideoModal(false)}
          videoUrl={course.videoUrl}
          title={`${course.title} - Course Preview`}
        />
      )}

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
                            {formatLessonDuration(lesson.duration)}
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
