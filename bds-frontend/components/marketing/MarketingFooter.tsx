import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Procurement", href: "/procurement" },
  { label: "Advocacy", href: "/drone-advocacy-group" },
  { label: "Services", href: "/services" },
  { label: "Mission", href: "/mission" },
  { label: "Engagements", href: "/engagements" },
  { label: "Inquiry", href: "/inquiry" },
];

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 !bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 lg:flex-row lg:items-start lg:justify-between !bg-black">
        <div className="max-w-md space-y-5">
          <Link href="/" className="inline-block">
            <Image
              src="/images/boston-drone-school-logo.svg"
              alt="Boston Drone School logo"
              width={600}
              height={280}
              sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 192px"
              className="h-auto w-40 sm:w-44 md:w-48 object-contain brightness-0 invert"
            />
          </Link>
          <p className="text-sm leading-relaxed text-white">
            Professional UAS consulting, operational services, and exam preparation
            resources for public, private, and community partners across New
            England.
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em] text-white/60">
            <a
              href="mailto:info@thebostondroneschool.org"
              className="hover:text-white"
            >
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">
              Explore
            </h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.22em] text-white/60">
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">
              Operations
            </h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.22em] text-white/60">
              <li>Real Estate Media & Documentation</li>
              <li>Photogrammetry & 3D Modeling</li>
              <li>Construction Progress & Inspection</li>
              <li>STEM Workforce Programs</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.26em] text-white/70">
              Get Involved
            </h3>
            <ul className="space-y-3 text-xs uppercase tracking-[0.22em] text-white/60">
              <li>
                <a
                  href="mailto:info@thebostondroneschool.org"
                  className="hover:text-white"
                >
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

      <div className="border-t border-white/15 !bg-black">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-8 text-[0.65rem] uppercase tracking-[0.24em] text-white/50">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <span>© {year} The Boston Drone School | All Rights Reserved.</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span>Boston · Massachusetts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MarketingFooter;
