'use client'

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, Course } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourse() {
      if (!courseId) return;

      // Wait for auth to load
      if (authLoading) return;

      // Redirect to login if not authenticated
      if (!user) {
        router.push(`/login?returnUrl=${encodeURIComponent(`/checkout/${courseId}`)}`);
        return;
      }

      try {
        setLoading(true);

        // Load course details
        const response = await api.getCourse(courseId);
        setCourse(response.course);

        // Check if already enrolled
        const enrollments = await api.getUserEnrollments();
        const existingEnrollment = enrollments.enrollments?.find(
          (e: any) => e.courseId === courseId
        );

        if (existingEnrollment) {
          // Already enrolled, redirect to course player
          router.push(`/learn/${courseId}`);
          return;
        }
      } catch (error) {
        console.error('Failed to load course:', error);
        setError('Failed to load course details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId, user, authLoading, router]);

  async function handleEnroll() {
    if (!courseId || !user) return;

    setSubmitting(true);
    setError(null);

    try {
      // Call the API to enroll the user
      const response = await api.enrollCourse(courseId);

      if (response.success) {
        setEnrolled(true);
        // Redirect to course player after 2 seconds
        setTimeout(() => {
          router.push(`/learn/${courseId}`);
        }, 2000);
      } else {
        throw new Error('Enrollment failed');
      }
    } catch (error: any) {
      console.error('Failed to enroll:', error);
      setError(error.message || 'Failed to enroll in course. Please try again or contact support.');
    } finally {
      setSubmitting(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    // This shouldn't happen due to redirect in useEffect, but just in case
    return null;
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link href="/courses" className="text-black hover:text-gray-700 underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (enrolled) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="text-xl font-bold">
              Boston Drone School
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Successfully Enrolled!</h1>
            <p className="text-gray-700 text-lg mb-8">
              Welcome to <strong>{course.title}</strong>! You now have full access to all course materials.
            </p>
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-3">Getting Started:</h2>
              <ol className="text-left text-sm space-y-2 ml-4 list-decimal">
                <li>Access your course content in the learning platform</li>
                <li>Complete lessons at your own pace</li>
                <li>Track your progress in the dashboard</li>
                <li>Earn your certificate upon completion</li>
              </ol>
              <div className="mt-4 pt-4 border-t border-gray-300 text-sm text-gray-600">
                <p><strong>Need Help?</strong> Contact <a href="mailto:info@thebostondroneschool.org" className="underline text-black font-semibold">info@thebostondroneschool.org</a></p>
              </div>
            </div>
            <div className="bg-black text-white p-4 rounded-lg mb-6">
              <p className="text-sm">Redirecting you to the course in a moment...</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href={`/learn/${courseId}`} className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Start Learning Now
              </Link>
              <Link href="/dashboard" className="border border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Boston Drone School
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/courses" className="text-gray-600 hover:text-black">Courses</Link>
              <Link href="/dashboard" className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-black transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/courses" className="text-gray-500 hover:text-black transition-colors">
              Programs
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={`/courses/${courseId}`} className="text-gray-500 hover:text-black transition-colors">
              {course.title}
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-black font-semibold">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-black text-white py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Confirm Enrollment
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {course.title}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {course.description}
            </p>
            <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-5xl font-bold">${course.price}</div>
              <div className="text-sm text-white/70 mt-2">One-Time Payment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="bg-green-50 border-y border-green-200 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-green-900">Instant Access:</span>
            </div>
            <span className="text-sm text-green-800">Click the button below to enroll and get immediate access to all course materials.</span>
          </div>
        </div>
      </section>

      {/* Enrollment Confirmation */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {/* Left Column - Course Details */}
            <div className="lg:col-span-3 space-y-8">
              <div className="bg-white border border-gray-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
                <ul className="space-y-3">
                  {course.learningObjectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {course.materials.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4">Course Materials</h3>
                  <div className="space-y-2">
                    {course.materials.map((material, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-black600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-black text-white rounded-xl p-8">
                <h3 className="text-xl font-bold mb-3">Money-Back Guarantee</h3>
                <p className="text-white/80">
                  We&apos;re confident in our training. If you&apos;re not satisfied with the course, we&apos;ll refund your full tuition within 30 days. No questions asked.
                </p>
              </div>
            </div>

            {/* Right Column - Enrollment Confirmation */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-8 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Confirm Your Enrollment</h2>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Student</p>
                    <p className="font-semibold">{user.name}</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-semibold">{user.email}</p>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Course</p>
                    <p className="font-semibold">{course.title}</p>
                  </div>
                </div>

                <div className="border-t-2 border-gray-200 pt-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-green-900 font-semibold mb-2">What You&apos;ll Get:</p>
                    <ul className="text-xs text-green-800 space-y-1 ml-4 list-disc">
                      <li>Instant access to all course materials</li>
                      <li>Learn at your own pace</li>
                      <li>Track your progress</li>
                      <li>Earn a certificate upon completion</li>
                    </ul>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-lg">Total Course Price</span>
                    <span className="text-3xl font-bold">${course.price}</span>
                  </div>

                  <button
                    onClick={handleEnroll}
                    disabled={submitting}
                    className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Enrolling...</span>
                      </>
                    ) : (
                      <>
                        <span>Enroll Now - Get Instant Access</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By enrolling, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Secure enrollment - Instant access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-gray-600">Students Certified</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-gray-600">First-Time Pass Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
