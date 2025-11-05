'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
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
  const [showNotes, setShowNotes] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

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
        (e: any) => e.courseId === courseId
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

  async function handleAskAI() {
    if (!aiQuestion.trim() || !course) return

    try {
      setAiLoading(true)
      const response = await api.getStudentAssistance(
        aiQuestion,
        course.title,
        course.level
      )
      setAiResponse(response.assistance)
    } catch (error) {
      console.error('AI assistance failed:', error)
      setAiResponse('Sorry, I could not process your question at this time.')
    } finally {
      setAiLoading(false)
    }
  }

  if (loading || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Top Bar */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </Link>
          <div>
            <h1 className="text-white font-semibold">{course.title}</h1>
            <div className="text-sm text-gray-400">
              Progress: {enrollment?.progress || 0}%
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAI(!showAI)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
          >
            🤖 AI Assistant
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Exit Course
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Player Area */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Video */}
          <div className="flex-1 flex items-center justify-center">
            {currentLesson?.videoUrl ? (
              currentLesson.videoUrl.includes('youtube.com') ||
              currentLesson.videoUrl.includes('youtu.be') ||
              currentLesson.videoUrl.includes('vimeo.com') ? (
                <iframe
                  src={getVideoEmbedUrl(currentLesson.videoUrl)}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  title={currentLesson.title}
                />
              ) : (
                <video
                  ref={videoRef}
                  src={currentLesson.videoUrl}
                  controls
                  className="w-full h-full"
                  onEnded={handleMarkComplete}
                />
              )
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">📹</div>
                <p>Video player will appear here</p>
                <p className="text-sm mt-2">
                  Supports YouTube, Vimeo, and direct video files
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
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
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
                      <button
                        key={index}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm"
                      >
                        📄 {material}
                      </button>
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
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    currentLesson?.id === lesson.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">{lesson.title}</div>
                      <div className="text-xs opacity-75">
                        {Math.floor(lesson.duration / 60)} minutes
                      </div>
                    </div>
                    {/* TODO: Show completion checkmark based on progress */}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Assistant Sidebar */}
        {showAI && (
          <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-white font-bold text-lg">AI Learning Assistant</h3>
              <p className="text-gray-400 text-sm mt-1">Ask questions about the course content</p>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              {aiResponse && (
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="text-purple-400 font-semibold mb-2">🤖 AI Assistant:</div>
                  <div className="text-gray-300 text-sm">{aiResponse}</div>
                </div>
              )}

              {aiLoading && (
                <div className="text-center text-gray-400">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mb-2"></div>
                  <p className="text-sm">Thinking...</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-700">
              <div className="space-y-3">
                <textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="Ask a question about this lesson..."
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
                  rows={3}
                />
                <button
                  onClick={handleAskAI}
                  disabled={aiLoading || !aiQuestion.trim()}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-3 rounded-lg font-semibold"
                >
                  {aiLoading ? 'Processing...' : 'Ask AI'}
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setAiQuestion('Can you explain this concept in simpler terms?')}
                  className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm"
                >
                  💡 Explain in simpler terms
                </button>
                <button
                  onClick={() => setAiQuestion('What are the key takeaways from this lesson?')}
                  className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm"
                >
                  📝 Key takeaways
                </button>
                <button
                  onClick={() => setAiQuestion('Give me a practical example of this concept')}
                  className="w-full text-left px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded text-sm"
                >
                  🎯 Practical example
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
