'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/layout/Footer'
import { api, Course } from '../../../lib/api'

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId

  const loadCourse = useCallback(async () => {
    if (!courseId) {
      return
    }

    try {
      setLoading(true)
      const response = await api.getCourse(courseId as string)
      setCourse(response.course)
    } catch (error) {
      console.error('Failed to load course:', error)
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    if (!userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    loadCourse()
  }, [loadCourse, router])

  async function handlePayment(e: React.FormEvent) {
    e.preventDefault()
    setProcessing(true)

    try {
        // NOTE: For production, integrate with actual Stripe Elements
        // For now, using simplified enrollment for demo/testing

        // Option 1: Create Stripe payment intent (requires STRIPE_SECRET_KEY in backend .env)
        // const paymentResponse = await api.createPaymentIntent(params.courseId as string)
        // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
        // await stripe.confirmCardPayment(paymentResponse.clientSecret, { ... })

        // Option 2: Direct enrollment for demo/testing (current implementation)
        await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate processing

        // Enroll user in course
        if (!courseId) {
          throw new Error('Missing course identifier')
        }

        await api.confirmEnrollment(courseId as string)

        alert('Payment successful! You are now enrolled in the course.')
        router.push(`/learn/${courseId}`)
    } catch (error: any) {
      console.error('Payment error:', error)
      alert('Payment failed: ' + (error.message || 'Please try again'))
    } finally {
      setProcessing(false)
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/boston-drone-school-logo-real.jpg"
              alt="Boston Drone School"
              width={120}
              height={84}
              className="h-auto w-24 object-contain"
            />
          </Link>
        </div>
      </header>

      {/* Checkout Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Purchase</h1>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>

                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Billing Address</h3>

                    <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Street Address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          required
                        />

                      <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            required
                          />
                          <input
                            type="text"
                            placeholder="State"
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                            required
                          />
                      </div>

                        <input
                          type="text"
                          placeholder="ZIP Code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                          required
                        />
                    </div>
                  </div>

                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-500 text-white py-4 rounded-lg font-semibold text-lg uppercase tracking-[0.2em] transition-colors"
                    >
                      {processing ? 'Processing Payment...' : `Pay $${course.price}`}
                    </button>

                    <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-500">
                      Secure checkout session
                    </p>
                </form>
              </div>
            </div>

            {/* Order Summary */}
              <div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-4">
                    <div>
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                        {course.thumbnailUrl ? (
                          <Image
                            src={course.thumbnailUrl}
                            alt={course.title}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(min-width: 768px) 320px, 100vw"
                            priority={false}
                          />
                        ) : (
                          <span className="text-xs uppercase tracking-[0.4em] text-gray-500">BDS</span>
                        )}
                      </div>

                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
                    </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Course Price</span>
                      <span className="font-semibold">${course.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">$0.00</span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                        <span className="font-bold text-gray-900 text-xl">${course.price}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
                      <p>Lifetime access</p>
                      <p>Certificate of completion</p>
                      <p>30-day money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
