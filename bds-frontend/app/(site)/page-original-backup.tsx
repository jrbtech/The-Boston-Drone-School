import Image from "next/image";
import Link from "next/link";
import AutoplayVideo from "@/components/marketing/AutoplayVideo";
import Footer from "@/components/layout/Footer";

const operations = [
  {
    title: 'Real Estate Intelligence',
    description: 'High-resolution aerial imaging and cinematic videography delivering competitive advantage in property marketing.'
  },
  {
    title: 'Photogrammetric Analysis & 3D Visualization',
    description: 'Precision geospatial mapping and three-dimensional modeling for infrastructure assessment, engineering validation, and compliance documentation.'
  },
  {
    title: 'Construction Progress Intelligence',
    description: 'Systematized aerial surveillance protocols documenting project milestones with quantifiable deliverables for stakeholder transparency.'
  },
  {
    title: 'STEM Workforce Development',
    description: 'Experiential learning programs introducing students and professionals to UAS career pathways and aerospace technology applications.'
  }
];

const missionHighlights = [
  'Strategic UAS integration roadmaps designed for public and private sector stakeholders.',
  'Proactive policy advocacy through the Boston Drone School Drone Advocacy Group.',
  'Comprehensive professional development programs cultivating operational excellence across multi-generational flight teams.'
];

const partnershipHighlights = [
  'Active member of the NASA Mobility Network (m:N) Working Group, contributing to national unmanned aircraft systems policy development.',
  "Strategic partner in Massachusetts' inaugural FAA-registered Drone Apprenticeship Program, advancing workforce development initiatives.",
  'Sustained collaborative engagements with municipal governments, academic research institutions, and enterprise organizations throughout the New England corridor.'
];

const admissionsChecklist = [
  'Live webinar series that covers Part 107 basics and exam tips.',
  'Simple mission planning tools you can apply right away.',
  'Direct help from our team at info@thebostondroneschool.org.'
];

const heroVideo = {
  title: "Cinematic Drone Operations",
  src: "/videos/hero-drone-cinematography.mp4",
  poster: "/videos/hero-drone-cinematography.jpg"
};

const videoShowcase = [
  {
    title: "Advanced Aerial Cinematography",
    src: "/videos/aerial-cinematography.mp4",
    poster: "/videos/aerial-cinematography.jpg",
    description: "Professional aerial cinematography techniques showcasing sophisticated flight operations and advanced camera movements."
  },
  {
    title: "Commercial Drone Operations",
    src: "/videos/commercial-operations.mp4",
    poster: "/videos/commercial-operations.jpg",
    description: "Real-world commercial drone applications including real estate, construction monitoring, and infrastructure inspection."
  },
  {
    title: "Professional Drone Techniques",
    src: "/videos/professional-techniques.mp4",
    poster: "/videos/professional-techniques.jpg",
    description: "Advanced maneuvering and professional flight techniques demonstrating the technical capabilities of modern drone systems."
  }
];

const pricingTiers = [
  {
    name: "Free Tier",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring drone education and getting started with basic training.",
    features: [
      "Access to 3 introductory courses",
      "Basic Part 107 prep materials",
      "Community forum access",
      "Monthly webinar recordings",
      "Email support",
      "Course completion certificates"
    ],
    cta: "Start Free",
    ctaLink: "/register?tier=free",
    highlighted: false
  },
  {
    name: "Professional",
    price: "$297",
    period: "per course",
    description: "Comprehensive training for serious drone operators pursuing FAA certification and commercial work.",
    features: [
      "Full access to premium courses",
      "Live instructor-led webinars",
      "1-on-1 mentorship sessions",
      "Advanced Part 107 exam prep",
      "Real-world mission planning tools",
      "Job placement assistance",
      "Lifetime course access",
      "Priority support"
    ],
    cta: "Browse Courses",
    ctaLink: "/courses",
    highlighted: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "Tailored solutions for organizations building drone programs and training multiple team members.",
    features: [
      "Custom curriculum development",
      "Bulk team enrollment",
      "On-site training options",
      "Dedicated account manager",
      "Regulatory compliance consulting",
      "Advanced analytics dashboard",
      "API integrations",
      "White-label options"
    ],
    cta: "Contact Sales",
    ctaLink: "/inquiry",
    highlighted: false
  }
];

export default function MarketingHomePage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="relative overflow-hidden bg-black text-white gradient-animated-bg">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-gray-900" />
          <div className="absolute -left-24 top-14 h-64 w-64 rounded-full bg-white/10 blur-3xl sm:left-12 animate-float" />
          <div className="absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float-delayed" />
          <div className="absolute left-1/2 top-1/3 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-6">
              <Image
                src="/images/boston-drone-school-logo-real.jpg"
                alt="Boston Drone School"
                width={400}
                height={280}
                className="h-20 w-auto text-reveal"
              />
              <h1 className="text-4xl font-semibold uppercase leading-tight tracking-[0.01em] md:text-5xl md:tracking-tight text-reveal stagger-1">
                Professional Unmanned Aircraft Solutions
              </h1>
              <p className="text-base leading-relaxed text-white/70 md:text-lg text-reveal stagger-2">
                The Boston Drone School provides FAA-certified aerial operations, comprehensive regulatory guidance, and industry-leading pilot training for organizations requiring sophisticated unmanned aircraft capabilities.
              </p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg text-reveal stagger-3">
                We partner with real estate developers, infrastructure firms, educational institutions, and municipal agencies to execute precision missions, acquire actionable intelligence, and cultivate expert flight operations teams.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.22em] text-reveal stagger-4">
              <Link
                href="/procurement"
                className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-white transition hover:bg-white hover:text-black ripple-effect"
              >
                Explore Workflows
              </Link>
              <Link
                href="/portal"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white px-6 py-3 text-black transition hover:bg-transparent hover:text-white ripple-effect"
              >
                Enter Learning Portal
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Operating Domains
                </p>
                <p className="mt-2 leading-relaxed">
                  Real Estate Intelligence • Photogrammetry • 3D Modeling • Construction Progress • STEM Education • Policy Advocacy
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Contact
                </p>
                <a
                  href="mailto:info@thebostondroneschool.org"
                  className="mt-2 inline-block text-white underline-offset-4 hover:underline"
                >
                  info@thebostondroneschool.org
                </a>
              </div>
            </div>
          </div>
          <div className="w-full max-w-xl">
            <AutoplayVideo
              src={heroVideo.src}
              poster={heroVideo.poster}
              title={heroVideo.title}
              className="rounded-xl border border-white/20 shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Our Mission
            </p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.01em] md:text-4xl">
              Precision unmanned aircraft operations engineered for mission-critical applications.
            </h2>
            <div className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-xl sm:flex-row sm:items-center sm:p-8 card-sophisticated">
              <div className="flex items-center justify-center sm:flex-shrink-0">
                <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
                  <Image
                    src="/images/gregory-anthony-blaize-real.webp"
                    alt="Portrait of Gregory Anthony Blaize, Founder and FAA Certified Remote Pilot"
                    width={180}
                    height={180}
                    sizes="(max-width: 640px) 160px, 180px"
                    className="h-40 w-40 sm:h-44 sm:w-44 object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
              <div className="space-y-3 text-center sm:flex-1 sm:text-left">
                <div className="space-y-1">
                  <p className="text-base font-bold uppercase tracking-[0.14em] text-gray-900">
                    Gregory Anthony Blaize
                  </p>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-600 font-medium">
                    Founder • FAA Certified Remote Pilot
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-gray-700">
                  Gregory integrates extensive experience in governmental affairs, international relations, and law enforcement with advanced UAS operations expertise to deliver comprehensive aerial intelligence solutions.
                </p>
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-700">
              Established in 2020, The Boston Drone School provides a strategic framework for organizational UAS integration. Our comprehensive services encompass advanced data acquisition, regulatory compliance architecture, and professional pilot development to enable clients to transition seamlessly from conceptualization to operational deployment.
            </p>
          </div>
          <div className="space-y-5 rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
              What guides our work
            </h3>
            <ul className="space-y-4 text-sm leading-relaxed text-gray-700">
              {missionHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-gray-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-600">
              Valuable Partnerships
            </p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.01em] md:text-4xl">
              Trusted collaborators moving the drone ecosystem forward.
            </h2>
          </div>
          <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-8 text-sm leading-relaxed text-gray-700">
            {partnershipHighlights.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="space-y-12">
          <div className="space-y-5 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Corporate Citizenship
            </p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.01em] md:text-4xl">
              Cultivating Advanced UAS Professionals
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 md:mx-0">
              We architect professional development pathways for emerging talent, transitioning professionals, and established organizations while fostering the technical competencies and safety culture essential for responsible unmanned aircraft systems deployment.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {operations.map((item, index) => (
              <div
                key={item.title}
                className={`space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm card-sophisticated card-reveal stagger-${index + 1}`}
              >
                <h3 className="text-lg font-semibold uppercase tracking-[0.06em]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-24 text-white">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-16 space-y-6 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-white/60">
              Investment Options
            </p>
            <h2 className="text-4xl font-semibold uppercase leading-tight tracking-[0.01em] md:text-5xl">
              Choose Your Training Pathway
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
              From free introductory access to comprehensive professional training and custom enterprise solutions, we provide flexible options for every stage of your drone career journey.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? 'border-white bg-white text-gray-900 shadow-2xl lg:scale-105'
                    : 'border-white/20 bg-white/5 backdrop-blur hover:border-white/40'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                    <span className="rounded-full border border-gray-900 bg-gray-900 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6 space-y-3 border-b border-current/10 pb-6">
                  <h3 className="text-xl font-semibold uppercase tracking-[0.1em]">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-sm opacity-70">/{tier.period}</span>
                  </div>
                  <p
                    className={`text-sm leading-relaxed ${
                      tier.highlighted ? 'text-gray-600' : 'text-white/70'
                    }`}
                  >
                    {tier.description}
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-3 text-sm">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                          tier.highlighted ? 'text-gray-900' : 'text-white'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={
                          tier.highlighted ? 'text-gray-700' : 'text-white/80'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaLink}
                  className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] transition-all ${
                    tier.highlighted
                      ? 'border-gray-900 bg-gray-900 text-white hover:bg-black'
                      : 'border-white text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-white/60">
              All courses include lifetime access and certification upon completion.{' '}
              <Link href="/courses" className="underline hover:text-white">
                View all courses
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/60">
              Admissions & Corporate Citizenship
            </p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.01em] md:text-4xl">
              Interested in a Drone Pilot License?
            </h2>
            <p className="text-base leading-relaxed text-white/70">
              Join our live webinar series to build Part 107 knowledge and mission planning skills with real examples you can apply right away.
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-white/70">
              {admissionsChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-white/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm uppercase tracking-[0.24em] text-white/60">
              <a
                href="mailto:info@thebostondroneschool.org"
                className="hover:text-white"
              >
                info@thebostondroneschool.org
              </a>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-white/20 bg-white/5 p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
              Enrollment
            </h3>
            <form
              className="mt-6 grid gap-5"
              action="https://formspree.io/f/moqgdnge"
              method="POST"
            >
              <label className="space-y-2 text-xs uppercase tracking-[0.22em] text-white/60">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.14em] text-white outline-none transition focus:border-white/60"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.22em] text-white/60">
                Phone
                <input
                  type="tel"
                  name="phone"
                  className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.14em] text-white outline-none transition focus:border-white/60"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.22em] text-white/60">
                Email*
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.14em] text-white outline-none transition focus:border-white/60"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.22em] text-white/60">
                Attach Resume (optional)
                <input
                  type="file"
                  name="resume"
                  className="w-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white file:mr-4 file:border-0 file:bg-white/20 file:px-4 file:py-2 file:text-white file:uppercase file:tracking-[0.18em]"
                />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-white transition hover:bg-white hover:text-black"
              >
                Submit Application
              </button>
              <p className="text-[0.7rem] leading-relaxed text-white/50">
                This site is protected by reCAPTCHA and the Google Privacy
                Policy and Terms of Service apply.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6">
          <div className="space-y-4 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-500">
              Mission Footage
            </p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.01em] md:text-4xl">
              Experience the workflows our crews deliver.
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:mx-0">
              Explore how Boston Drone School teams capture visuals, coach
              pilots, and package insights after every mission. Each short video
              highlights a different stage of our engagements.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {videoShowcase.map((video) => (
              <div key={video.src} className="space-y-4">
                <AutoplayVideo
                  src={video.src}
                  poster={video.poster}
                  title={video.title}
                  className="rounded-xl border border-gray-200 shadow-md"
                />
                <div className="space-y-2">
                  <h3 className="text-base font-semibold uppercase tracking-[0.12em] text-gray-900">
                    {video.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.22em] text-gray-600">
              Learning Platform
            </p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.01em] md:text-4xl">
              Continue inside the Boston Drone School learning portal.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-700">
              Access structured coursework, instructor feedback, and mission
              ready resources tailored to the engagements you explore on this
              site. Your next briefing, certification, or deployment plan is
              waiting inside the portal.
            </p>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.24em]">
              <Link
                href="/portal"
                className="inline-flex items-center justify-center rounded-full border border-gray-900 px-6 py-3 text-gray-900 transition hover:bg-gray-900 hover:text-white"
              >
                Access Portal
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
              >
                Browse Courses
              </Link>
            </div>
          </div>
          <div className="grid w-full gap-6 rounded-2xl border border-gray-200 bg-white p-8 text-sm text-gray-700 md:max-w-lg">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                Structured Programs
              </p>
              <p className="mt-2 leading-relaxed">
                FAA Part 107 prep, advanced photogrammetry, STEM ready
                instruction, and policy workflows aligned to enterprise needs.
              </p>
            </div>
            <div className="h-px w-full bg-gray-200" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                Mission Support
              </p>
              <p className="mt-2 leading-relaxed">
                Download checklists, mission report templates, and quick
                reference guides updated by the Boston Drone School faculty.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
