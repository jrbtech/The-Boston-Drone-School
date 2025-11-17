'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useAuth } from '../../contexts/AuthContext'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [googleLoaded, setGoogleLoaded] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)

      // Check for return URL
      const returnUrl = searchParams.get('returnUrl')
      if (returnUrl && returnUrl.startsWith('/')) {
        router.push(returnUrl)
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleLogin(credential: string) {
    setError('')
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Google login failed')
      }

      // Store token and user data
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Trigger auth context update
      window.dispatchEvent(new Event('storage'))

      // Check for return URL
      const returnUrl = searchParams.get('returnUrl')
      if (returnUrl && returnUrl.startsWith('/')) {
        router.push(returnUrl)
      } else {
        router.push('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || 'Google login failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (googleLoaded && typeof window !== 'undefined' && (window as any).google) {
      ;(window as any).google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: (response: any) => handleGoogleLogin(response.credential),
      })
      ;(window as any).google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        {
          theme: 'filled_black',
          size: 'large',
          width: '100%',
          text: 'continue_with',
        }
      )
    }
  }, [googleLoaded])

  const enrollmentMessage = searchParams.get('returnUrl')?.includes('/checkout/')

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setGoogleLoaded(true)}
      />
      <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12 text-white">
        <div className="w-full max-w-md">
          {/* Enrollment Notice */}
          {enrollmentMessage && (
            <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Sign in to continue enrollment</span>
              </div>
              <p className="text-sm text-white/80">
                You'll be redirected to complete your course enrollment after signing in
              </p>
            </div>
          )}

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

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Google Sign-In Button */}
          <div id="googleSignInButton" className="w-full"></div>

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
    </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
