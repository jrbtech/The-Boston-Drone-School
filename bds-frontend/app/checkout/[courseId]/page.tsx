'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, Course } from "@/lib/api";

export default function CheckoutPage() {
  const params = useParams();
  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      if (!courseId) return;

      try {
        setLoading(true);
        const response = await api.getCourse(courseId);
        setCourse(response.course);
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      await fetch('https://formspree.io/f/moqgdnge', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('Failed to submit enrollment request. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Link href="/courses" className="text-blue-600 hover:text-blue-700 underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="text-xl font-bold">
              Boston Drone School
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-4">Enrollment Request Received!</h1>
            <p className="text-gray-700 text-lg mb-8">
              Thank you for your interest in <strong>{course.title}</strong>. We&apos;ll send you a secure payment link within 24 hours.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-3">What Happens Next:</h2>
              <ol className="text-left text-sm space-y-2 ml-4 list-decimal">
                <li>Check your email for a confirmation message</li>
                <li>You&apos;ll receive a secure payment link within 24 hours</li>
                <li>Complete payment via Stripe, PayPal, or wire transfer</li>
                <li>Get instant access to your course materials</li>
              </ol>
            </div>
            <div className="flex gap-4 justify-center">
              <Link href="/courses" className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Browse More Courses
              </Link>
              <Link href="/" className="border border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Back to Home
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
              <Link href="/login" className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Ready to Enroll
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

      {/* Checkout Form */}
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
                      <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

            {/* Right Column - Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-xl p-8 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Complete Your Enrollment</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="course_id" value={course.id} />
                  <input type="hidden" name="course_title" value={course.title} />
                  <input type="hidden" name="course_price" value={course.price} />
                  <input type="hidden" name="form_type" value="course_enrollment" />

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-black focus:outline-none"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-black focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-black focus:outline-none"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                    <select
                      name="experience"
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-black focus:outline-none"
                    >
                      <option value="">Select your experience</option>
                      <option value="beginner">Beginner (No experience)</option>
                      <option value="hobbyist">Hobbyist (Recreational flying)</option>
                      <option value="some-commercial">Some commercial experience</option>
                      <option value="looking-to-certify">Ready to get certified</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Questions or Notes</label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:border-black focus:outline-none resize-none"
                      placeholder="Any questions about the course?"
                    />
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <p className="text-sm text-blue-900 font-semibold mb-2">How Enrollment Works:</p>
                      <ol className="text-xs text-blue-800 space-y-1 ml-4 list-decimal">
                        <li>Submit this form to reserve your spot</li>
                        <li>We&apos;ll email you within 24 hours with payment options</li>
                        <li>Complete payment via Stripe, PayPal, or wire transfer</li>
                        <li>Get instant access to your course materials</li>
                      </ol>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold text-lg">Total Course Price</span>
                      <span className="text-3xl font-bold">${course.price}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{submitting ? 'Submitting...' : 'Reserve My Spot - Get Payment Link'}</span>
                      {!submitting && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                      By submitting, you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
                    </p>

                    <p className="text-xs text-gray-600 mt-3 text-center font-medium">
                      ✅ No payment required now • 💳 Secure payment link sent via email
                    </p>
                  </div>
                </form>
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
