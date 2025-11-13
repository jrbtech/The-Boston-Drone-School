'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { api, Course } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'

const platformFeatures = [
  {
    title: 'Structured learning paths',
    description:
      'Progress through modules, simulations, and assessments in the order your instructors designed.',
  },
  {
    title: 'Real-time progress tracking',
    description:
      'Pick up where you left off, see what is due next, and stay on track toward certification milestones.',
  },
  {
    title: 'Operational resources',
    description:
      'Download checklists, mission plans, and reporting templates that mirror real-world deployments.',
  },
]

const quickStartSteps = [
  {
    step: '01',
    title: 'Create your account',
    description: 'Use your invite or register with your work email to unlock the BDS learning environment.',
  },
  {
    step: '02',
    title: 'Enroll in a program',
    description: 'Choose the pathway aligned to your mission profile and confirm enrollment in minutes.',
  },
  {
    step: '03',
    title: 'Launch your training',
    description: 'Stream lessons, join live sessions, and complete assessments with built-in progress tracking.',
  },
  {
    step: '04',
    title: 'Earn certification assets',
    description: 'Access completion certificates, compliance documentation, and next-step recommendations.',
  },
]

const supportHighlights = [
  {
    label: 'Technical support',
    value: 'info@thebostondroneschool.org',
  },
  {
    label: 'Office hours',
    value: 'Mon to Fri · 8:00a to 6:00p ET',
  },
  {
    label: 'Platform status',
    value: 'All systems operational',
  },
]

const arrowIcon = (
  <span className="inline-flex h-4 w-4 items-center justify-center">
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M3 11L11 3M11 3H4.6M11 3V9.4" />
    </svg>
  </span>
)

export default function PortalLandingPage() {
  const { user } = useAuth()
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([])
  const [coursesLoaded, setCoursesLoaded] = useState(false)

  const isAuthenticated = Boolean(user)
  const learnerName = useMemo(() => {
    if (!user) return ''
    if (user.firstName) return user.firstName
    if (user.name) {
      const [first] = user.name.split(' ')
      return first
    }
    return ''
  }, [user])

  useEffect(() => {
    let isMounted = true

    const loadCourses = async () => {
      try {
        const response = await api.getCourses({})
        if (!isMounted) return
        const courseList = Array.isArray(response?.courses) ? (response.courses as Course[]) : []
        setFeaturedCourses(courseList.slice(0, 3))
      } catch (error) {
        console.error('Failed to load courses for the portal page:', error)
      } finally {
        if (isMounted) {
          setCoursesLoaded(true)
        }
      }
    }

    loadCourses()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <div className="section-shell flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/TBDS GRAPHIC.jpg"
              alt="Boston Drone School"
              width={100}
              height={70}
              className="h-auto w-20 object-contain"
            />
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-[0.32em]">Learning Portal</span>
            </div>
          </Link>
          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.3em] md:flex">
            <Link href="/courses" className="text-foreground/65 transition hover:text-foreground">
              Courses
            </Link>
            <Link href="/" className="text-foreground/65 transition hover:text-foreground">
              Marketing Site
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="text-foreground/65 transition hover:text-foreground">
                Dashboard
              </Link>
            )}
          </nav>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link href="/dashboard" className="cta-button-primary h-12 px-7 text-[0.7rem] tracking-[0.24em]">
                Continue to dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden text-xs uppercase tracking-[0.28em] text-foreground/70 transition-colors hover:text-foreground md:inline"
                >
                  Log in
                </Link>
                <Link href="/register" className="cta-button-primary h-12 px-7 text-[0.7rem] tracking-[0.24em]">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <section className="border-b border-foreground/10 bg-secondary">
        <div className="section-shell py-20">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
            <div className="space-y-10">
              <div className="space-y-5">
                <p className="headline-kicker text-foreground/60">Boston Drone School E-Learning Platform</p>
                <h1 className="text-4xl font-semibold uppercase leading-snug tracking-[0.06em] md:text-5xl">
                  Everything you need to move from first flight to mission-ready deployments in one portal.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
                  Log in to continue your syllabus, review mission prep materials, and collaborate with instructors. This portal is the
                  dedicated learning environment you reach after visiting the public site at thebostondroneschool.org.
                </p>
                {isAuthenticated && learnerName && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background px-5 py-2 text-xs uppercase tracking-[0.28em] text-foreground/60">
                    Welcome back, {learnerName}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href={isAuthenticated ? '/dashboard' : '/login'} className="cta-button-primary gap-3">
                  {isAuthenticated ? 'Go to dashboard' : 'Sign in to continue'}
                  {arrowIcon}
                </Link>
                <Link href="/courses" className="cta-button-secondary">
                  Browse courses
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {platformFeatures.slice(0, 2).map((feature) => (
                  <div key={feature.title} className="flex flex-col gap-3 rounded-xl border border-foreground/12 bg-secondary/70 p-6">
                    <span className="text-xs uppercase tracking-[0.35em] text-foreground/55">Inside the portal</span>
                    <h3 className="text-lg font-semibold uppercase leading-tight">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/70">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 rounded-2xl border border-foreground/12 bg-background p-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.35em] text-foreground/55">Quick access</span>
                <h2 className="text-2xl font-semibold uppercase leading-tight">Your dedicated learning workspace</h2>
                <p className="text-sm leading-relaxed text-foreground/70">
                  Jump straight to your dashboard to resume active courses, review instructor feedback, and download course materials.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.3em] text-foreground/60">
                <div className="flex items-center justify-between rounded-lg border border-foreground/10 px-4 py-3">
                  <span>Active courses</span>
                  <span className="text-foreground">Dashboard</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-foreground/10 px-4 py-3">
                  <span>Resources</span>
                  <span className="text-foreground">Downloads</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-foreground/10 px-4 py-3">
                  <span>Certificates</span>
                  <span className="text-foreground">Issued</span>
                </div>
              </div>
              <Link
                href={isAuthenticated ? '/dashboard' : '/register'}
                className="inline-flex items-center justify-center rounded-lg border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-transparent hover:text-foreground"
              >
                {isAuthenticated ? 'Continue learning' : 'Set up access'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/10 bg-background">
        <div className="section-shell py-16">
          <div className="space-y-6 text-center md:text-left">
            <p className="headline-kicker">How it works</p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.06em] md:text-4xl">
              The portal keeps teams aligned from enrollment to certification.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickStartSteps.map((step) => (
              <div
                key={step.step}
                className="flex h-full flex-col gap-4 rounded-2xl border border-foreground/12 bg-secondary p-6"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-foreground/55">Step {step.step}</span>
                <h3 className="text-lg font-semibold uppercase leading-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="section-shell py-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="headline-kicker">Browse programs</p>
              <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.06em] md:text-4xl">
                Featured courses ready to join today.
              </h2>
              <p className="text-sm leading-relaxed text-foreground/70">
                Filtered down from the full catalog so you can preview what is available before you sign in or create an account.
              </p>
            </div>
            <Link href="/courses" className="cta-button-secondary">
              View all courses
            </Link>
          </div>

          {!coursesLoaded && featuredCourses.length === 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={`course-skeleton-${index}`}
                  className="h-48 rounded-2xl border border-foreground/10 bg-background loading-pulse"
                />
              ))}
            </div>
          )}

          {coursesLoaded && featuredCourses.length === 0 && (
            <div className="mt-12 rounded-2xl border border-foreground/12 bg-background px-6 py-10 text-center text-sm uppercase tracking-[0.28em] text-foreground/55">
              Public course previews will appear here once catalog data is published.
            </div>
          )}

          {featuredCourses.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredCourses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group flex h-full flex-col gap-4 rounded-2xl border border-foreground/12 bg-background p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-foreground/55">
                    <span className="rounded-full border border-foreground/15 px-3 py-1 text-foreground/70">
                      {course.category}
                    </span>
                    <span className="rounded-full border border-foreground/15 px-3 py-1 text-foreground/70">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold uppercase leading-tight text-foreground">{course.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/70 line-clamp-3">{course.description}</p>
                  <div className="mt-auto flex items-center justify-between text-[0.65rem] uppercase tracking-[0.32em] text-foreground/60">
                    <span>{course.instructor.split(',')[0]}</span>
                    <span>{course.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="section-shell py-16">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="space-y-4">
              <p className="headline-kicker text-white/50">Need assistance?</p>
              <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.06em] md:text-4xl">
                We are ready to help with access, billing, or curriculum questions.
              </h2>
              <p className="text-sm leading-relaxed text-white/70">
                Reach out to the Boston Drone School support team if you need help getting into the portal or aligning a program to your operational goals.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {supportHighlights.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/20 bg-white/5 p-6">
                  <span className="text-xs uppercase tracking-[0.35em] text-white/60">{item.label}</span>
                  <p className="mt-3 text-base font-medium tracking-[0.02em] text-white">
                    {item.label === 'Technical support' ? (
                      <a href={`mailto:${item.value}`} className="underline decoration-white/40 underline-offset-4">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-foreground/10 bg-background">
        <div className="section-shell flex flex-col gap-6 py-12 text-center text-xs uppercase tracking-[0.26em] text-foreground/55 md:flex-row md:items-center md:justify-between md:text-left">
          <span>© {new Date().getFullYear()} The Boston Drone School · Learning Portal</span>
          <div className="flex items-center justify-center gap-6 md:justify-end">
            <a href="mailto:info@thebostondroneschool.org" className="transition-colors hover:text-foreground">
              Contact support
            </a>
            {isAuthenticated ? (
              <Link href="/dashboard" className="transition-colors hover:text-foreground">
                Dashboard
              </Link>
            ) : (
              <Link href="/register" className="transition-colors hover:text-foreground">
                Create account
              </Link>
            )}
          </div>
        </div>
      </footer>
    </main>
  )
}
