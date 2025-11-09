'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import { useAuth } from '../../contexts/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12 text-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <Image
            src="/images/boston-drone-school-logo.svg"
            alt="Boston Drone School"
            width={200}
            height={80}
            className="h-auto w-40 object-contain"
            priority
          />
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-8 text-gray-900">
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-[0.2em]">Welcome Back</h1>
          <p className="text-gray-600 mb-8 uppercase tracking-[0.2em] text-xs">Sign in to continue your learning journey</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="you@example.com"
                />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="••••••••"
                />
            </div>

            <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-gray-900" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
                <Link href="/forgot-password" className="text-sm text-gray-900 underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
                className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-500 text-white py-3 rounded-lg font-semibold uppercase tracking-[0.2em] transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

            {/* Social Login Options intentionally removed for monochrome presentation */}

          {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-gray-900 underline">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link href="/" className="text-sm uppercase tracking-[0.3em] underline">
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
