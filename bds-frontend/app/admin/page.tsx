'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { api } from '../../lib/api'
import Footer from '@/components/layout/Footer'
import FileUpload from '../../components/admin/FileUpload'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'courses' | 'students' | 'analytics' | 'files'>('courses')

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true)
      const response = await api.getCourses({})
      setCourses(response.courses || [])
    } catch (error) {
      console.error('Failed to load courses:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    // TODO: Check if user has admin role
    setUser(parsedUser)
    loadCourses()
  }, [loadCourses, router])

  async function handleDeleteCourse(courseId: string) {
    if (!confirm('Are you sure you want to delete this course?')) return

    try {
      // TODO: Implement delete API endpoint
      alert('Course deletion not yet implemented in backend')
    } catch (error) {
      console.error('Failed to delete course:', error)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/tbds-graphic.jpg"
                alt="Boston Drone School"
                width={100}
                height={70}
                className="h-auto w-20 object-contain"
              />
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </Link>

            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-black">Dashboard</Link>
              <Link href="/courses" className="text-gray-700 hover:text-black">Courses</Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  A
                </div>
                <span className="text-gray-900">Admin</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        {/* Welcome */}
        <div className="bg-black rounded-2xl p-8 md:p-10 text-white mb-10 md:mb-12">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg opacity-90">Manage courses, students, and platform settings</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Total Courses</div>
            <div className="text-3xl font-bold text-gray-900">{courses.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Active Students</div>
            <div className="text-3xl font-bold text-gray-900">247</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-gray-900">$12,450</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Completion Rate</div>
            <div className="text-3xl font-bold text-gray-900">78%</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('courses')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'courses'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'students'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'analytics'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'files'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Files
              </button>
            </div>
          </div>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold">
                + Create New Course
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Course</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Enrolled</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="font-semibold text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-600">{course.instructor}</div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-gray-100 text-gray-900 text-xs font-semibold rounded-full">
                            {course.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold">${course.price}</td>
                        <td className="py-4 px-4">-</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-gray-900 text-white text-xs font-semibold rounded-full">
                            Published
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button className="text-black hover:underline text-sm">Edit</button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="text-red-600 hover:underline text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Students Tab */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Management</h2>
            <p className="text-gray-600">Student management features coming soon...</p>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
            <p className="text-gray-600">Analytics features coming soon...</p>
          </div>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">File Management</h2>
              <p className="text-gray-600 mb-8">Upload course materials and FAA reference documents for students.</p>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Course Materials Upload */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Materials</h3>
                  <p className="text-gray-600 mb-4">Upload materials for specific courses (PDFs, videos, presentations).</p>
                  
                  <div className="mb-4">
                    <label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Course
                    </label>
                    <select
                      id="course-select"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">Choose a course...</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <FileUpload 
                    courseId="1" // TODO: Use selected course ID
                    type="course-material"
                    onUploadComplete={(result) => {
                      console.log('Course material uploaded:', result)
                      // TODO: Refresh materials list
                    }}
                  />
                </div>

                {/* FAA Materials Upload */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">FAA Reference Materials</h3>
                  <p className="text-gray-600 mb-4">Upload official FAA documents and study materials available to all students.</p>
                  
                  <FileUpload 
                    type="faa-material"
                    onUploadComplete={(result) => {
                      console.log('FAA material uploaded:', result)
                      // TODO: Refresh materials list
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Instructions */}
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Setup: FAA Materials</h3>
              <div className="space-y-3 text-sm text-gray-800">
                <div className="flex items-start gap-2">
                  <span className="text-gray-900">1.</span>
                  <div>
                    <strong>Download FAA Study Guide:</strong>
                    <a
                      href="https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/media/remote_pilot_study_guide.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline ml-1"
                    >
                      Right click → Save as
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-900">2.</span>
                  <div>
                    <strong>Download Aviation Weather Handbook:</strong>
                    <a
                      href="https://www.faa.gov/regulations_policies/handbooks_manuals/aviation/media/00-6B-WX-Book.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black underline ml-1"
                    >
                      Right click → Save as
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-900">3.</span>
                  <span>Upload them using the FAA Materials form above</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
