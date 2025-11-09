'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [resetUrl, setResetUrl] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Call backend API for password reset
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process password reset request')
      }

      // Store token for display (in dev mode only)
      if (data.resetToken) {
        setResetToken(data.resetToken)
        setResetUrl(data.resetUrl)
      }

      setSubmitted(true)

      // Also notify admin via Formspree as backup
      fetch('https://formspree.io/f/moqgdnge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          form_type: 'password_reset_request',
          message: `Password reset requested for: ${email}`,
          resetUrl: data.resetUrl
        })
      }).catch(() => {
        // Silent fail for backup notification
      })

    } catch (err: any) {
      setError(err.message || 'Failed to send reset email. Please try again or contact support.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 py-12 text-white">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <div id="main-content" className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center mb-8">
          <Image
            src="/images/boston-drone-school-logo-real.jpg"
            alt="Boston Drone School"
            width={160}
            height={112}
            className="h-auto w-32 object-contain"
            priority
            unoptimized
          />
        </Link>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl p-8 text-gray-900">
          {!submitted ? (
            <>
              <h1 className="text-3xl font-bold mb-2 uppercase tracking-[0.2em]">Reset Password</h1>
              <p className="text-gray-600 mb-8 text-sm">
                Enter your email address and we&apos;ll send you instructions to reset your password.
              </p>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-500 text-white py-3 rounded-lg font-semibold uppercase tracking-[0.2em] transition-colors"
                >
                  {loading ? 'Sending...' : 'Send Reset Instructions'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link href="/login" className="text-sm text-gray-900 underline">
                  Back to Login
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Password Reset Requested</h2>
              <p className="text-gray-600 mb-6">
                If an account exists for <strong>{email}</strong>, password reset instructions have been sent.
              </p>

              {/* Development mode: Show reset link directly */}
              {resetUrl && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm font-semibold text-yellow-900 mb-2">
                    ⚠️ Development Mode - Reset Link:
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Since email is not yet configured, use this link to reset your password:
                  </p>
                  <a
                    href={resetUrl}
                    className="text-sm text-blue-600 hover:text-blue-700 break-all underline"
                  >
                    {resetUrl}
                  </a>
                  <p className="text-xs text-gray-500 mt-3">
                    This link will be sent via email once email service is configured.
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-600 mb-6">
                If you don&apos;t receive an email within a few minutes, please check your spam folder or contact support at info@thebostondroneschool.org
              </p>
              <Link
                href="/login"
                className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          )}
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
