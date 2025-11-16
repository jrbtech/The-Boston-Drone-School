'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { api, Course } from '@/lib/api'

const serviceGroups = [
  {
    title: 'Operational Services',
    items: [
      'Aerial media for real estate, marketing, and civic storytelling.',
      'Infrastructure inspection, progress tracking, and shoreline monitoring.',
      'Survey grade photogrammetry, 3D modeling, and volume measurements.'
    ]
  },
  {
    title: 'Training & Certification',
    items: [
      'FAA Part 107 Remote Pilot Certificate preparation and licensing courses with live instruction.',
      'Commercial drone operator certification and recurrent training programs.',
      'Mission labs and simulator drills aligned to your procedures.',
      'Continuing education sessions matched to current regulations.'
    ]
  },
  {
    title: 'Consultation & Advisory',
    items: [
      'Policy guidance and public outreach through the Drone Advocacy Group.',
      'Procurement frameworks, risk reviews, and readiness assessments.',
      'Stakeholder briefings and communication plans for new drone programs.'
    ]
  },
  {
    title: 'STEM & Workforce Engagements',
    items: [
      'Custom programs for K through 12, higher education, and workforce teams.',
      'Hands on experiences including FPV build kits and drone racing modules.',
      'Curriculum design that blends UAS practice with clean energy principles.'
    ]
  }
]

const deliveryModel = [
  {
    label: 'Hybrid Delivery',
    description: 'On site operations combined with virtual planning and post mission support for distributed teams.'
  },
  {
    label: 'Portal Integration',
    description: 'Every service connects to our learning portal so crews can access training, resources, and certification materials in one place.'
  },
  {
    label: 'Data Stewardship',
    description: 'Secure capture, processing, and handoff workflows that stay compliant with organizational and regulatory standards.'
  }
]

export default function ServicesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await api.getCourses()
        setCourses(response.courses.slice(0, 3)) // Show first 3 courses
      } catch (error) {
        console.error('Failed to load courses:', error)
      } finally {
        setLoading(false)
      }
    }
    loadCourses()
  }, [])

  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 md:px-8 lg:px-12 py-20 md:py-24 lg:py-28">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Service Catalog</p>
          <h1 className="max-w-3xl text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            Drone operations, training, and advocacy made clear.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Boston Drone School supports each mission from discovery through certification. Pilots, policy specialists, and educators work together so your team receives practical results without extra jargon.
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.32em]">
            <Link
              href="/procurement"
              className="inline-flex items-center justify-center border border-white px-6 py-3 text-white transition hover:bg-white hover:text-black"
            >
              Book a Workflow
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center border border-white/30 bg-white px-6 py-3 text-black transition hover:bg-transparent hover:text-white"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <div key={group.title} className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
              <h2 className="text-xl font-semibold uppercase tracking-[0.08em] text-gray-900">{group.title}</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-gray-700">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[6px] h-2 w-2 rounded-full bg-gray-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16 md:py-20 lg:py-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 md:gap-12 px-6 md:px-8 lg:px-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-gray-900">Delivery Model</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Each engagement blends field tested methods with simple digital tools. We align deliverables to your compliance needs and keep check-ins streamlined from planning through reporting.
            </p>
          </div>
          <div className="grid gap-6 text-sm leading-relaxed text-gray-700 md:max-w-xl">
            {deliveryModel.map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
                <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500">{item.label}</h3>
                <p className="mt-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="training" className="bg-black text-white py-20 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="mb-12 md:mb-16 text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.4em] text-white/60">FAA Part 107 Certification</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Training Programs</h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              Comprehensive courses with 98% pass rate guarantee and lifetime access to materials.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-3">
              {courses.map((course, index) => (
                <div key={course.id} className={`bg-white text-black p-8 md:p-10 rounded-lg ${index === 1 ? 'border-4 border-white shadow-2xl transform md:scale-105' : 'border-2 border-gray-200'}`}>
                  {index === 1 && (
                    <div className="text-center mb-2">
                      <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-bold">FEATURED</span>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-4xl font-bold">${course.price}</span>
                      <span className="text-gray-600 text-sm">{course.duration}</span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-3">{course.description}</p>
                  </div>
                  <div className="mb-8 space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-black mt-1">✓</span>
                      <span>{course.level.charAt(0).toUpperCase() + course.level.slice(1)} Level</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-black mt-1">✓</span>
                      <span>{course.category}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-black mt-1">✓</span>
                      <span>Instructor: {course.instructor}</span>
                    </div>
                  </div>
                  <Link href={`/courses/${course.id}`} className="block w-full bg-black text-white text-center py-3 font-bold hover:bg-gray-800 transition">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-center">No courses available at this time.</p>
          )}
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8 lg:px-12">
          <div className="grid gap-10 md:gap-12 lg:gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-gray-900">Link services to learning pathways.</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Client teams gain access to our learning portal where documentation, updates, and certification prep sit alongside operational deliverables. Everyone stays aligned long after the first flight.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-10 text-sm leading-relaxed text-gray-700">
            <p>
              Onboard your crew to track course progress, review mission checklists, and download templates. Our support team assists with user setup, reporting, and ongoing curriculum tweaks.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs uppercase tracking-[0.32em]">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center border border-gray-900 px-6 py-3 text-gray-900 transition hover:bg-gray-900 hover:text-white"
              >
                Browse Catalog
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center border border-gray-400 px-6 py-3 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  )
}
