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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 sm:gap-10 md:gap-12 px-4 sm:px-6 py-10 sm:py-12 lg:flex-row lg:items-start lg:justify-between !bg-black">
        <div className="max-w-md space-y-4 sm:space-y-5">
          <Link href="/" className="inline-block">
            <Image
              src="/images/tbds-graphic.jpg"
              alt="Boston Drone School logo"
              width={600}
              height={420}
              sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, 192px"
              className="h-auto w-36 sm:w-40 md:w-44 lg:w-48 object-contain"
            />
          </Link>
          <p className="text-sm sm:text-base leading-relaxed text-white/90">
            Professional UAS consulting, operational services, and exam preparation
            resources for public, private, and community partners across New
            England.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-sm sm:text-xs uppercase tracking-wide sm:tracking-[0.22em] text-white/60">
            <a
              href="mailto:info@thebostondroneschool.org"
              className="hover:text-white min-h-[44px] flex items-center"
            >
              info@thebostondroneschool.org
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <Link href="/portal" className="hover:text-white min-h-[44px] flex items-center">
              Access Learning Portal
            </Link>
          </div>
        </div>

        <div className="grid flex-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-xs font-semibold uppercase tracking-wider sm:tracking-[0.26em] text-white/70">
              Explore
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-xs uppercase tracking-wide sm:tracking-[0.22em] text-white/60">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white min-h-[44px] flex items-center">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-xs font-semibold uppercase tracking-wider sm:tracking-[0.26em] text-white/70">
              Operations
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-xs uppercase tracking-wide sm:tracking-[0.22em] text-white/60 leading-relaxed">
              <li className="min-h-[44px] flex items-center">Real Estate Media & Documentation</li>
              <li className="min-h-[44px] flex items-center">Photogrammetry & 3D Modeling</li>
              <li className="min-h-[44px] flex items-center">Construction Progress & Inspection</li>
              <li className="min-h-[44px] flex items-center">STEM Workforce Programs</li>
            </ul>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm sm:text-xs font-semibold uppercase tracking-wider sm:tracking-[0.26em] text-white/70">
              Get Involved
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-xs uppercase tracking-wide sm:tracking-[0.22em] text-white/60">
              <li>
                <a
                  href="mailto:info@thebostondroneschool.org"
                  className="hover:text-white min-h-[44px] flex items-center"
                >
                  Request Consultation
                </a>
              </li>
              <li>
                <Link href="/procurement" className="hover:text-white min-h-[44px] flex items-center">
                  Book a Workflow
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-white min-h-[44px] flex items-center">
                  Enroll in Courses
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="hover:text-white min-h-[44px] flex items-center">
                  Review FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 !bg-black">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 sm:px-6 py-6 sm:py-8 text-xs sm:text-[0.65rem] uppercase tracking-wide sm:tracking-[0.24em] text-white/50">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 md:gap-6 text-center">
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
