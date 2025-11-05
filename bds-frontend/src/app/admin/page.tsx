'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '../../lib/api'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'courses' | 'students' | 'analytics'>('courses')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }

    const parsedUser = JSON.parse(userData)
    // TODO: Check if user has admin role
    setUser(parsedUser)
    loadCourses()
  }, [])

  async function loadCourses() {
    try {
      setLoading(true)
      const response = await api.getCourses({})
      setCourses(response.courses || [])
    } catch (error) {
      console.error('Failed to load courses:', error)
    } finally {
      setLoading(false)
    }
  }

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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BDS</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </Link>

            <nav className="flex items-center space-x-6">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">Courses</Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  A
                </div>
                <span className="text-gray-900">Admin</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg opacity-90">Manage courses, students, and platform settings</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Total Courses</div>
            <div className="text-3xl font-bold text-gray-900">{courses.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Active Students</div>
            <div className="text-3xl font-bold text-blue-600">247</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-green-600">$12,450</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="text-gray-600 text-sm mb-1">Completion Rate</div>
            <div className="text-3xl font-bold text-orange-600">78%</div>
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
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Courses
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'students'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-8 py-4 font-semibold transition-colors ${
                  activeTab === 'analytics'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
                + Create New Course
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                            {course.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-semibold">${course.price}</td>
                        <td className="py-4 px-4">-</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            Published
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <button className="text-blue-600 hover:underline text-sm">Edit</button>
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
      </div>
    </div>
  )
}
