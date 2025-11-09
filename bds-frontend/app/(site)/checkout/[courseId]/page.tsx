import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layout/Footer";

const courses = {
  "part-107-complete": {
    id: "part-107-complete",
    title: "Complete FAA Part 107 Certification Course",
    price: 297,
    duration: "40 hours",
    description: "Comprehensive online course with lifetime access and expert instruction",
    features: [
      "40 hours of comprehensive video lessons",
      "500+ practice exam questions",
      "Interactive airspace maps and charts",
      "Weather interpretation tutorials",
      "Live instructor Q&A sessions twice weekly",
      "Exam prep checklist and study schedule",
      "Lifetime access to all course materials",
      "Certificate of completion",
      "30-day money-back guarantee"
    ],
    includes: [
      "Full access to video library",
      "Downloadable study materials (PDFs)",
      "Official FAA Remote Pilot Study Guide",
      "Practice exams with detailed explanations",
      "Private student community access",
      "Email support from instructors",
      "Course updates for life"
    ]
  },
  "part-107-intensive": {
    id: "part-107-intensive",
    title: "Part 107 Intensive Weekend Bootcamp",
    price: 497,
    duration: "16 hours (2 days)",
    description: "Fast-track your certification with intensive weekend training",
    features: [
      "16 hours of live instruction over 2 days",
      "In-person OR live virtual attendance",
      "Condensed curriculum for quick mastery",
      "Hands-on drone operation practice (in-person)",
      "Direct mentorship from FAA-certified instructors",
      "Exam scheduling assistance",
      "Post-course support for 30 days",
      "All course materials included",
      "Practice test access",
      "Small class sizes (max 12 students)"
    ],
    includes: [
      "2-day intensive training session",
      "Course workbook and materials",
      "Official FAA Remote Pilot Study Guide",
      "Practice exam access",
      "30 days of instructor support",
      "Study guide and cheat sheets",
      "Exam preparation checklist"
    ]
  },
  "part-107-premium": {
    id: "part-107-premium",
    title: "Part 107 Premium + Business Setup",
    price: 997,
    duration: "60 hours",
    description: "Complete certification plus business launch guidance",
    features: [
      "Everything included in Complete Course",
      "Business formation and structure guidance",
      "Insurance requirements overview",
      "Marketing and client acquisition strategies",
      "Equipment recommendations and purchasing guide",
      "Legal contracts and liability protection templates",
      "4 hours of 1-on-1 mentorship sessions",
      "Job placement assistance",
      "Client proposal templates",
      "Pricing strategy guidance",
      "Portfolio development support"
    ],
    includes: [
      "Complete FAA Part 107 course access",
      "Official FAA Remote Pilot Study Guide",
      "Business startup toolkit",
      "Legal document templates",
      "Marketing materials templates",
      "1-on-1 mentorship (4 hours)",
      "Lifetime course access",
      "Priority support",
      "Business plan template"
    ]
  }
};

export default function CheckoutPage({ params }: { params: { courseId: string } }) {
  const course = courses[params.courseId as keyof typeof courses];

  if (!course) {
    notFound();
  }

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero/Header */}
      <section className="section-spacing bg-black text-white">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="faa-certified-badge">
                Ready to Enroll
              </span>
            </div>
            <h1 className="h1 text-high-contrast mb-4">
              {course.title}
            </h1>
            <p className="body-large text-white/80 mb-8">
              {course.description}
            </p>
            <div className="price-tag inline-flex">
              <div className="price-tag-amount">${course.price}</div>
              <div className="price-tag-label">One-Time Payment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details & Checkout Form */}
      <section className="section-spacing bg-off-white">
        <div className="container-premium">
          <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {/* Left Column - Course Details */}
            <div className="lg:col-span-3">
              <div className="million-dollar-card mb-8">
                <h2 className="h2 mb-6">What&apos;s Included</h2>
                <ul className="study-checklist">
                  {course.features.map((feature) => (
                    <li key={feature} className="body text-gray-700">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="million-dollar-card mb-8">
                <h3 className="h3 mb-6">Course Access Includes</h3>
                <div className="space-y-4">
                  {course.includes.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="body text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="million-dollar-card mb-8 bg-blue-50 border-2 border-blue-200">
                <h3 className="h3 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Official FAA Study Guide
                </h3>
                <p className="body text-gray-700 mb-4">
                  Access the official FAA Remote Pilot Study Guide - the authoritative reference used by the FAA for the Part 107 exam.
                </p>
                <a
                  href="https://www.faa.gov/sites/faa.gov/files/regulations_policies/handbooks_manuals/aviation/remote_pilot_study_guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download FAA Study Guide (PDF)
                </a>
              </div>

              <div className="million-dollar-card bg-black text-white">
                <h3 className="h3 text-high-contrast mb-4">Money-Back Guarantee</h3>
                <p className="body text-white/80">
                  We&apos;re confident you&apos;ll pass the FAA Part 107 exam with our training. If you complete the course and don&apos;t pass the exam on your first attempt, we&apos;ll refund your full tuition. No questions asked.
                </p>
              </div>
            </div>

            {/* Right Column - Checkout Form */}
            <div className="lg:col-span-2">
              <div className="million-dollar-card sticky top-24">
                <h2 className="h3 mb-6">Complete Your Enrollment</h2>

                <form className="space-y-6" action="https://formspree.io/f/moqgdnge" method="POST">
                  <input type="hidden" name="course_id" value={course.id} />
                  <input type="hidden" name="course_title" value={course.title} />
                  <input type="hidden" name="course_price" value={course.price} />
                  <input type="hidden" name="form_type" value="course_enrollment" />

                  <div>
                    <label className="caption text-gray-600 block mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full border-2 border-gray-300 px-4 py-3 text-base focus:border-black focus:outline-none transition"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label className="caption text-gray-600 block mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border-2 border-gray-300 px-4 py-3 text-base focus:border-black focus:outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="caption text-gray-600 block mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full border-2 border-gray-300 px-4 py-3 text-base focus:border-black focus:outline-none transition"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="caption text-gray-600 block mb-2">Current Drone Experience</label>
                    <select
                      name="experience"
                      className="w-full border-2 border-gray-300 px-4 py-3 text-base focus:border-black focus:outline-none transition"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner (No experience)</option>
                      <option value="hobbyist">Hobbyist (Recreational flying)</option>
                      <option value="some-commercial">Some commercial experience</option>
                      <option value="looking-to-certify">Ready to get certified</option>
                    </select>
                  </div>

                  <div>
                    <label className="caption text-gray-600 block mb-2">Questions or Special Requests</label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full border-2 border-gray-300 px-4 py-3 text-base focus:border-black focus:outline-none transition resize-none"
                      placeholder="Any questions about the course or specific needs?"
                    />
                  </div>

                  <div className="border-t-2 border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="h4">Total Due Today</span>
                      <span className="price-display text-3xl">${course.price}</span>
                    </div>

                    <button type="submit" className="btn-checkout w-full">
                      <span>Submit Enrollment Request</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>

                    <p className="text-xs text-gray-500 mt-4 text-center">
                      By submitting, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>
                    </p>
                  </div>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>30-Day Guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-spacing bg-white">
        <div className="container-premium">
          <div className="max-w-5xl mx-auto">
            <div className="premium-grid">
              <div className="text-center">
                <div className="stat-number text-black">500+</div>
                <p className="h4 mt-4">Students Certified</p>
              </div>
              <div className="text-center">
                <div className="stat-number text-black">98%</div>
                <p className="h4 mt-4">First-Time Pass Rate</p>
              </div>
              <div className="text-center">
                <div className="stat-number text-black">4.9/5</div>
                <p className="h4 mt-4">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-spacing bg-off-white">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <h2 className="h2 text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "When can I start the course?",
                  a: "You'll receive instant access to the course materials as soon as your enrollment is confirmed. For live bootcamps, we'll contact you with available dates."
                },
                {
                  q: "What if I fail the FAA exam?",
                  a: "If you complete our course and don't pass the exam on your first attempt, we'll refund your full tuition. We're that confident in our training."
                },
                {
                  q: "Do I need a drone to take the course?",
                  a: "No! You don't need a drone to take the course or pass the FAA exam. However, we do recommend getting hands-on practice before your first commercial job."
                },
                {
                  q: "How long do I have access to the course?",
                  a: "All courses include lifetime access to materials, including any future updates. You can revisit the content anytime."
                },
                {
                  q: "Can I get a refund?",
                  a: "Yes! We offer a 30-day money-back guarantee. If you're not satisfied with the course for any reason, we'll refund your payment in full."
                }
              ].map((faq, index) => (
                <div key={index} className="million-dollar-card">
                  <h3 className="h4 mb-3">{faq.q}</h3>
                  <p className="body text-gray-700">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
