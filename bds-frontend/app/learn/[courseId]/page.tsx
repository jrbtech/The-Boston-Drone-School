'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import FormattedContent from '@/components/FormattedContent'
import { api, Course } from '../../../lib/api'
import { getVideoEmbedUrl } from '../../../lib/video'
import { useAuth } from '../../../contexts/AuthContext'

export default function CoursePlayerPage() {
  const params = useParams()
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const { user, loading: authLoading } = useAuth()

  const [course, setCourse] = useState<Course | null>(null)
  const [lessons, setLessons] = useState<any[]>([])
  const [enrollment, setEnrollment] = useState<any>(null)
  const [currentLesson, setCurrentLesson] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number }>({})

  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId

  const loadCourseData = useCallback(async () => {
    if (!courseId) {
      return
    }

    try {
      setLoading(true)
      const [courseResponse, lessonsResponse, enrollmentsResponse] = await Promise.all([
        api.getCourse(courseId as string),
        api.getCourseLessons(courseId as string),
        api.getUserEnrollments()
      ])

      setCourse(courseResponse.course)
      const lessonsData = lessonsResponse.lessons || []
      setLessons(lessonsData)

      // Find enrollment for this course
      const userEnrollment = enrollmentsResponse.enrollments?.find(
        (e: any) => e.courseId.toString() === courseId.toString()
      )

      if (!userEnrollment) {
        alert('You are not enrolled in this course')
        router.push(`/courses/${courseId}`)
        return
      }

      setEnrollment(userEnrollment)

      // Set current lesson (first incomplete or first lesson)
      if (lessonsData.length > 0) {
        setCurrentLesson(lessonsData[0])
      }
    } catch (error) {
      console.error('Failed to load course data:', error)
    } finally {
      setLoading(false)
    }
  }, [courseId, router])

  useEffect(() => {
    if (authLoading) {
      return
    }

    if (!user) {
      router.push('/login')
      return
    }

    loadCourseData()
  }, [authLoading, user, loadCourseData, router])

  async function handleMarkComplete() {
    if (!currentLesson || !enrollment) return

    try {
      await api.updateProgress(enrollment.id, {
        lessonId: currentLesson.id,
        progress: 100,
        timeSpent: 0,
        completed: true
      })

      // Move to next lesson
      const currentIndex = lessons.findIndex((l) => l.id === currentLesson.id)
      if (currentIndex < lessons.length - 1) {
        setCurrentLesson(lessons[currentIndex + 1])
      }

      // Reload enrollment to get updated progress
      const response = await api.getEnrollment(enrollment.id)
      setEnrollment(response.enrollment)
    } catch (error) {
      console.error('Failed to update progress:', error)
    }
  }

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

    return (
      <div className="min-h-screen bg-black flex flex-col">
        {/* Top Bar */}
        <header className="bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-xs uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <div>
              <h1 className="text-white font-semibold text-lg">{course.title}</h1>
              <div className="text-xs uppercase tracking-[0.3em] text-gray-500 mt-1">
                Progress {enrollment?.progress || 0}%
              </div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="px-5 py-2 border border-gray-700 text-gray-300 rounded-lg uppercase tracking-[0.25em] text-xs hover:bg-white hover:text-black transition-colors"
          >
            Exit Course
          </Link>
        </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-black overflow-y-auto">
          {/* Lesson Content */}
            <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
            {currentLesson?.contentData?.sections ? (
              <div className="space-y-8">
                {currentLesson.contentData.sections.map((section: any, index: number) => (
                  <div key={index} className="bg-gray-900 rounded-lg p-6">
                    {section.type === 'text' && (
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                        <FormattedContent content={section.content} />
                      </div>
                    )}

                    {section.type === 'video' && (
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                        {section.description && (
                          <p className="text-gray-400 mb-4">{section.description}</p>
                        )}
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                          <iframe
                            src={section.videoUrl?.replace('youtube.com', 'youtube-nocookie.com')}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={section.title}
                          />
                        </div>
                      </div>
                    )}

                    {section.type === 'quiz' && (
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-6">{section.title}</h3>
                        <div className="space-y-6">
                          {section.questions.map((q: any, qIndex: number) => {
                            const questionKey = `${index}-${qIndex}`
                            const selectedAnswer = quizAnswers[questionKey]
                            const isAnswered = selectedAnswer !== undefined
                            const isCorrect = isAnswered && selectedAnswer === q.correctAnswer

                            return (
                              <div key={qIndex} className="bg-gray-800 rounded-lg p-6">
                                <p className="text-white font-semibold mb-4">
                                  {qIndex + 1}. {q.question}
                                </p>
                                <div className="space-y-2">
                                  {q.options.map((option: string, oIndex: number) => {
                                    const isSelected = selectedAnswer === oIndex
                                    const isCorrectOption = oIndex === q.correctAnswer

                                    return (
                                      <button
                                        key={oIndex}
                                        onClick={() => setQuizAnswers({ ...quizAnswers, [questionKey]: oIndex })}
                                        disabled={isAnswered}
                                        className={`w-full text-left p-4 rounded-lg transition-colors border ${
                                          isAnswered
                                            ? isCorrectOption
                                              ? 'bg-green-900 border-green-500 text-white'
                                              : isSelected
                                              ? 'bg-red-900 border-red-500 text-white'
                                              : 'bg-gray-700 border-gray-600 text-gray-400'
                                            : isSelected
                                            ? 'bg-white text-black border-white'
                                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                                        }`}
                                      >
                                        {option}
                                      </button>
                                    )
                                  })}
                                </div>
                                {isAnswered && (
                                  <div className={`mt-4 p-4 rounded-lg ${
                                    isCorrect ? 'bg-green-900/30 text-green-200' : 'bg-red-900/30 text-red-200'
                                  }`}>
                                    <p className="font-semibold mb-2">
                                      {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                                    </p>
                                    <p className="text-sm">{q.explanation}</p>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
                <div className="text-center text-gray-500 uppercase tracking-[0.2em] mt-20">
                  <p>Content not available</p>
                  <p className="text-xs mt-3 tracking-[0.3em]">
                    This lesson is being prepared
                  </p>
              </div>
            )}
          </div>

          {/* Lesson Info & Controls */}
          <div className="bg-gray-800 p-6">
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {currentLesson?.title || 'Select a lesson'}
                  </h2>
                  <p className="text-gray-400">{currentLesson?.description}</p>
                </div>
                <button
                  onClick={handleMarkComplete}
                    className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold uppercase tracking-[0.2em]"
                >
                  Mark as Complete
                </button>
              </div>

              {/* Lesson Resources */}
              {currentLesson?.materials && currentLesson.materials.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-white font-semibold mb-2">Lesson Resources:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentLesson.materials.map((material: string, index: number) => (
                        <div
                          key={index}
                          className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg text-sm uppercase tracking-[0.2em]"
                        >
                          {material}
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Lessons List */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-white font-bold text-lg mb-4">Course Content</h3>

            <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLesson(lesson)}
                    className={`w-full text-left p-4 rounded-lg transition-colors border ${
                      currentLesson?.id === lesson.id
                        ? 'bg-white text-black border-white'
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                    }`}
                  >
                  <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        currentLesson?.id === lesson.id ? 'bg-black text-white' : 'bg-gray-700 text-gray-300'
                      }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{lesson.title}</div>
                      <div className="text-xs opacity-75">
                        {lesson.duration} minutes
                      </div>
                    </div>
                    {/* TODO: Show completion checkmark based on progress */}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}
