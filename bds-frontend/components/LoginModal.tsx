'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter()
  const { login, user } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ email: '', password: '' })
      setError('')
    }
  }, [isOpen])

  // Redirect if already logged in
  useEffect(() => {
    if (user && isOpen) {
      onClose()
      router.push('/dashboard')
    }
  }, [user, isOpen, onClose, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      onClose()
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-10"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 uppercase tracking-[0.2em]">Welcome Back</h2>
            <p className="text-gray-600 text-sm">Sign in to access your courses</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="modal-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="modal-password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-gray-900 hover:underline"
                  onClick={onClose}
                >
                  Forgot?
                </Link>
              </div>
              <input
                id="modal-password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-500 text-white py-3 rounded-lg font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/register"
            onClick={onClose}
            className="block w-full text-center border-2 border-gray-900 text-gray-900 py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors"
          >
            Create Account
          </Link>

          {/* Additional Links */}
          <div className="mt-6 text-center space-y-2">
            <Link
              href="/courses"
              className="block text-sm text-gray-600 hover:text-black"
              onClick={onClose}
            >
              Browse Courses
            </Link>
            <Link
              href="/study-guide"
              className="block text-sm text-gray-600 hover:text-black"
              onClick={onClose}
            >
              Get Free Study Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
