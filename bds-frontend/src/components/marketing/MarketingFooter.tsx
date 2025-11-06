import Image from 'next/image'
import Link from 'next/link'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Procurement', href: '/procurement' },
  { label: 'Drone Advocacy Group', href: '/drone-advocacy-group' },
  { label: 'Services', href: '/services' },
  { label: 'Mission', href: '/mission' },
  { label: 'Engagements', href: '/engagements' },
  { label: 'Inquiry', href: '/inquiry' },
]

export function MarketingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/boston-drone-school-logo.svg"
                alt="Boston Drone School logo"
                width={96}
                height={68}
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
                  Boston Drone School
                </span>
                <span className="text-[0.62rem] uppercase tracking-[0.28em] text-white/50">
                  Operations, Training, Advocacy
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              We deliver licensed drone services, policy guidance, and focused training for public, private, and community partners across New England.
            </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.24em] text-white/60">
            <a href="mailto:info@thebostondroneschool.org" className="hover:text-white">
              info@thebostondroneschool.org
            </a>
            <span className="hidden text-white/30 sm:inline">|</span>
            <Link href="/portal" className="hover:text-white">
              Access Learning Portal
            </Link>
          </div>
        </div>

        <div className="grid flex-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Explore</h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.24em] text-white/60">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Operations</h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.24em] text-white/60">
              <li>Real Estate Media & Documentation</li>
              <li>Photogrammetry & 3D Modeling</li>
              <li>Construction Progress & Inspection</li>
              <li>STEM Workforce Programs</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Get Involved</h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.24em] text-white/60">
              <li>
                <a href="mailto:info@thebostondroneschool.org" className="hover:text-white">
                  Request Consultation
                </a>
              </li>
              <li>
                <Link href="/procurement" className="hover:text-white">
                  Book a Workflow
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-white">
                  Enroll in Courses
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="hover:text-white">
                  Review FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

        <div className="border-t border-white/15 bg-black/80">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-6 text-[0.65rem] uppercase tracking-[0.28em] text-white/50 sm:flex-row sm:justify-between">
            <span>© {year} The Boston Drone School | All Rights Reserved.</span>
            <span>Boston · Massachusetts</span>
          </div>
        </div>
    </footer>
  )
}

export default MarketingFooter
