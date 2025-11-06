'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/courses', label: 'Programs' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

const heroHighlights = [
  'Scenario-based simulator and live flight intensives',
  'Compliance playbooks for enterprise and public safety teams',
  'Dedicated mission coaches and post-certification support',
]

const stripHighlights = [
  { label: 'Next Cohort', value: 'January 2026 interviews now in progress' },
  { label: 'Corporate Programs', value: 'Custom training for utilities, media, and public safety divisions' },
  { label: 'Certifications', value: 'FAA Part 107, BVLOS readiness, and specialization pathways' },
]

const featureList = [
  {
    title: 'Precision-Crafted Curriculum',
    description:
      'Sequenced instruction co-developed with aerospace counsel, covering mission design, flight control systems, and data delivery.',
  },
  {
    title: 'Operators With Air Time',
    description:
      'Commercial pilots, engineers, and operations leads translate real deployments into immersive labs and workshops.',
  },
  {
    title: 'Immersive Flight Laboratories',
    description:
      'Structured field exercises, simulator intensives, and BVLOS scenarios accelerate disciplined decision-making.',
  },
  {
    title: 'Risk & Compliance Architecture',
    description:
      'Enterprise-grade SOPs, documentation, and regulatory frameworks ensure graduates meet regulated sector criteria.',
  },
]

const stats = [
  { number: '500+', label: 'Teams Trained' },
  { number: '95%', label: 'Certification Rate' },
  { number: '50+', label: 'Enterprise Partners' },
  { number: '10+', label: 'Program Tracks' },
]

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-foreground/40 text-xs font-semibold uppercase tracking-[0.4em]">
              BDS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                Boston Drone School
              </span>
              <span className="text-xs uppercase tracking-[0.35em] text-foreground/60">
                Precision Flight Training
              </span>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-10 text-[0.72rem] uppercase tracking-[0.4em]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/60 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/login"
              className="text-xs uppercase tracking-[0.28em] text-foreground transition-colors hover:text-foreground/60"
            >
              Client Login
            </Link>
            <Link
              href="/enrollment"
              className="inline-flex items-center justify-center gap-3 border border-black bg-black px-7 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-all duration-200 hover:bg-transparent hover:text-foreground"
            >
              Speak to Admissions
            </Link>
          </div>
          <button
            className="inline-flex h-12 w-12 items-center justify-center border border-foreground/40 lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation"
            type="button"
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="border-t border-foreground/10 bg-background lg:hidden">
          <div className="section-shell py-10">
            <div className="flex flex-col gap-6 text-sm uppercase tracking-[0.35em]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-foreground/15 pb-4 text-foreground/70 transition-colors hover:text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/enrollment"
                className="inline-flex items-center justify-center border border-black bg-black px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-all duration-200 hover:bg-transparent hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                Speak to Admissions
              </Link>
              <Link
                href="/login"
                className="text-xs uppercase tracking-[0.28em] text-foreground transition-colors hover:text-foreground/60"
                onClick={() => setIsMenuOpen(false)}
              >
                Client Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-foreground/10 bg-secondary">
      <div
        className="absolute inset-y-0 right-0 hidden w-1/2 bg-gradient-to-l from-black/15 via-black/5 to-transparent lg:block"
        aria-hidden
      />
      <div className="section-shell relative py-24 md:py-36">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="headline-kicker">Precision Drone Education</p>
              <h1 className="text-5xl font-semibold uppercase leading-[0.92] tracking-[0.08em] md:text-6xl lg:text-7xl">
                Command the airspace with disciplined mastery.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-foreground/70">
                The Boston Drone School enables pilots, engineers, and operators to build confident, compliant, and revenue-ready
                aerial programs through immersive flight labs and executive-level advisory.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/enrollment" className="cta-button-primary gap-3">
                Start Application
                <span className="inline-flex h-4 w-4 items-center justify-center">
                  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                    <path d="M3 11L11 3M11 3H4.6M11 3V9.4" />
                  </svg>
                </span>
              </Link>
              <Link href="/courses" className="cta-button-secondary">
                View Programs
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {heroHighlights.map((item) => (
                <div key={item} className="flex flex-col gap-3 border-t border-foreground/15 pt-4">
                  <span className="text-xs uppercase tracking-[0.35em] text-foreground/55">Capability</span>
                  <p className="text-sm font-medium leading-relaxed text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative isolate overflow-hidden border border-foreground/15 bg-black px-10 py-12 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/60" aria-hidden />
            <div className="relative space-y-8">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.4em] text-white/60">Admissions Intelligence</span>
                <p className="text-3xl font-semibold leading-snug">
                  Cohorts curated for enterprise, public safety, and creative operations.
                </p>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                Submit your portfolio and mission objectives to receive a tailored training proposal and flight-readiness roadmap
                within 48 hours of application.
              </p>
              <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.35em] text-white/60">
                <span>Part 107 &amp; BVLOS readiness</span>
                <span>Operational risk frameworks</span>
                <span>Equipment integration labs</span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.35em] text-white transition-opacity hover:opacity-70"
              >
                Book Advisory Call
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/40">
                  <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-3 w-3"
                    aria-hidden
                  >
                    <path d="M3 11L11 3M11 3H4.6M11 3V9.4" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HighlightsStrip = () => {
  return (
    <section className="border-y border-foreground/10 bg-background">
      <div className="section-shell py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {stripHighlights.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.4em] text-foreground/55">{item.label}</span>
              <p className="text-base font-medium leading-relaxed text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FeaturesSection = () => {
  return (
    <section className="bg-secondary py-24">
      <div className="section-shell">
        <div className="grid gap-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-6">
            <p className="headline-kicker">Why leaders choose BDS</p>
            <h2 className="text-4xl font-semibold uppercase leading-[0.96] tracking-[0.06em] md:text-5xl">
              Precision training engineered for enterprise impact.
            </h2>
            <p className="max-w-xl text-base md:text-lg leading-relaxed text-foreground/70">
              Each program is built with risk officers, insurers, and operational directors to ensure your teams earn credentials,
              document compliance, and deploy mission-ready flight capabilities.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {featureList.map((feature, index) => (
              <div
                key={feature.title}
                className="group border border-foreground/12 bg-secondary/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-secondary"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-foreground/55">0{index + 1}</span>
                <h3 className="mt-4 text-xl font-semibold uppercase leading-tight">{feature.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const StatsSection = () => {
  return (
    <section className="bg-black text-white">
      <div className="section-shell py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl space-y-4">
            <p className="headline-kicker text-white/50">Measured outcomes</p>
            <h2 className="text-4xl font-semibold uppercase leading-[0.96] tracking-[0.06em] md:text-5xl">
              Proven performance across regulated sectors.
            </h2>
            <p className="text-sm leading-relaxed text-white/65">
              From utilities to creative agencies, we align training outcomes with flight-readiness KPIs, certification mandates, and
              operational ROI.
            </p>
          </div>
          <Link
            href="/learn"
            className="inline-flex items-center justify-center gap-3 border border-white/40 px-7 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition-all duration-200 hover:bg-white hover:text-black"
          >
            View Case Studies
          </Link>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2 border-t border-white/20 pt-6">
              <div className="text-4xl font-semibold tracking-tight md:text-5xl">{stat.number}</div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FinalCTASection = () => {
  return (
    <section className="border-t border-foreground/10 bg-secondary py-24">
      <div className="section-shell">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="space-y-6">
            <p className="headline-kicker">Schedule a strategy consult</p>
            <h2 className="text-4xl font-semibold uppercase leading-[0.94] tracking-[0.06em] md:text-5xl">
              Secure your seat in the next admissions cohort.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/70">
              Share your operational objectives and current fleet capabilities. Our admissions team will curate the right program track,
              outline investment, and prepare your stakeholders for launch.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/enrollment" className="cta-button-primary gap-3">
              Schedule Consultation
              <span className="inline-flex h-4 w-4 items-center justify-center">
                <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M3 11L11 3M11 3H4.6M11 3V9.4" />
                </svg>
              </span>
            </Link>
            <Link href="/courses" className="cta-button-secondary">
              Download Prospectus
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="border-t border-foreground/10 bg-background py-16">
      <div className="section-shell">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em]">Boston Drone School</h3>
            <p className="text-sm leading-relaxed text-foreground/70">
              Professional drone education and certification engineered for mission-critical teams.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.35em] text-foreground/60">Programs</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="/courses/basic" className="transition-colors hover:text-foreground">
                  Pilot Foundations
                </Link>
              </li>
              <li>
                <Link href="/courses/commercial" className="transition-colors hover:text-foreground">
                  Commercial Operations
                </Link>
              </li>
              <li>
                <Link href="/courses/mapping" className="transition-colors hover:text-foreground">
                  Aerial Mapping &amp; Data
                </Link>
              </li>
              <li>
                <Link href="/courses/enterprise" className="transition-colors hover:text-foreground">
                  Enterprise Cohorts
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.35em] text-foreground/60">Services</h4>
            <ul className="space-y-3 text-sm text-foreground/70">
              <li>
                <Link href="/services/media" className="transition-colors hover:text-foreground">
                  Aerial Media
                </Link>
              </li>
              <li>
                <Link href="/services/consultation" className="transition-colors hover:text-foreground">
                  Program Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/mapping" className="transition-colors hover:text-foreground">
                  Photogrammetry
                </Link>
              </li>
              <li>
                <Link href="/services/support" className="transition-colors hover:text-foreground">
                  Fleet Support
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.35em] text-foreground/60">Contact</h4>
            <div className="space-y-3 text-sm text-foreground/70">
              <p>info@thebostondroneschool.org</p>
              <p>Boston, Massachusetts</p>
              <Link href="/contact" className="transition-colors hover:text-foreground">
                Request Information
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-foreground/10 pt-8 text-center text-xs uppercase tracking-[0.25em] text-foreground/50">
          © {new Date().getFullYear()} The Boston Drone School — All Rights Reserved
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <HighlightsStrip />
      <FeaturesSection />
      <StatsSection />
      <FinalCTASection />
      <Footer />
    </main>
  )
}