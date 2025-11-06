import Link from 'next/link'

const operations = [
  {
    title: 'Real Estate Media',
    description:
      'High-impact aerial photography and cinematics that deliver premium visuals for listings, marketing campaigns, and investor briefings.'
  },
  {
    title: 'Photogrammetry & 3D Modeling',
    description:
      'Precision data capture, orthomosaics, and volumetric analytics to inform infrastructure planning and coastal monitoring.'
  },
  {
    title: 'Construction Progress Management',
    description:
      'Scheduled capture workflows that keep stakeholders aligned with documentation, inspection, and compliance needs.'
  },
  {
    title: 'STEM Workforce Programming',
    description:
      'Applied learning engagements that expose the emerging workforce to UAS careers and operational readiness.'
  }
]

const missionHighlights = [
  'UAS policy consultation and integration planning for private and public sector partners.',
  'Dedicated advocacy through the Boston Drone School Drone Advocacy Group to shape safe regulation.',
  'A corporate citizenship model that trains, exposes, and enlightens the future workforce.'
]

const partnershipHighlights = [
  'NASA m:N Working Group member contributing to national policy discussions.',
  "Pilot partner for Massachusetts' first registered Drone Apprenticeship program.",
  'Collaborations with municipal, academic, and enterprise organizations across New England.'
]

const admissionsChecklist = [
  'Virtual webinar series covering Part 107 certification foundations.',
  'Operational readiness planning tailored to your mission profile.',
  'Guided enrollment support via info@thebostondroneschool.org.'
]

export default function MarketingHomePage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.38em] text-white/60">About Us</p>
            <h1 className="max-w-3xl text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
              Future Industry Optimization
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              We modernize operations by delivering professional drone services and comprehensive workforce training. From real estate media to photogrammetry and 3D rendering, our teams translate aerial intelligence into decisive business outcomes.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              The Boston Drone School equips enterprises, educators, and civic partners with tailored consultation, immersive engagements, and credential pathways that secure safe integration of unmanned aircraft systems.
            </p>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.32em]">
              <Link href="/procurement" className="inline-flex items-center justify-center border border-white px-6 py-3 text-white transition hover:bg-white hover:text-black">
                Explore Workflows
              </Link>
              <Link href="/portal" className="inline-flex items-center justify-center border border-white/30 bg-white px-6 py-3 text-black transition hover:bg-transparent hover:text-white">
                Enter Learning Portal
              </Link>
            </div>
          </div>
          <div className="max-w-xs space-y-4 rounded-2xl bg-white/10 p-6 text-sm tracking-[0.02em] text-white/70">
            <div>
              <p className="uppercase text-xs tracking-[0.3em] text-white/50">Operating Domains</p>
              <p className="mt-2 leading-relaxed">
                Real Estate Media · Photogrammetry · 3D Modeling · Construction Progress · STEM Education · Policy Advocacy
              </p>
            </div>
            <div className="h-px w-full bg-white/20" />
            <div>
              <p className="uppercase text-xs tracking-[0.3em] text-white/50">Contact</p>
              <a href="mailto:info@thebostondroneschool.org" className="mt-2 inline-block text-white underline-offset-4 hover:underline">
                info@thebostondroneschool.org
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.38em] text-gray-500">Our Mission</p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.06em] md:text-4xl">
              Safely integrating state-of-the-art drone operations.
            </h2>
            <p className="text-base leading-relaxed text-gray-700">
              Founded in 2020 and formally established in 2022, The Boston Drone School provides a proven model for safe drone integration across public and private domains. Our service portfolio spans aerial data collection, regulatory alignment, and immersive educational programming.
            </p>
            <p className="text-base leading-relaxed text-gray-700">
              Gregory Anthony Blaize, our founder and FAA Certified Remote Pilot, brings deep experience across government affairs, international relations, law enforcement, and community leadership. That multidisciplinary perspective informs deployments that respect both compliance mandates and operational realities.
            </p>
          </div>
          <div className="space-y-5 rounded-2xl border border-gray-200 bg-gray-50 p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-gray-600">What guides our work</h3>
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
            <p className="text-xs uppercase tracking-[0.38em] text-gray-600">Valuable Partnerships</p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.06em] md:text-4xl">
              Trusted collaborators propelling the drone ecosystem forward.
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
            <p className="text-xs uppercase tracking-[0.38em] text-gray-500">Corporate Citizenship</p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.06em] md:text-4xl">
              Building the 22nd century workforce with clean technology.
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 md:mx-0">
              Our corporate citizenship model ensures the next generation of drone professionals gains the technical, ethical, and operational skills required to lead a global UAS industry. We integrate clean energy practices, community engagement, and continuous training into every program.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {operations.map((item) => (
              <div key={item.title} className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-lg font-semibold uppercase tracking-[0.08em]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Admissions – Corporate Citizenship</p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-4xl">
              Interested in a Drone Pilot License?
            </h2>
            <p className="text-base leading-relaxed text-white/70">
              Enroll in our virtual webinar series to accelerate your Part 107 preparation and operational readiness. We guide you from theory to mission planning with instructor-led sessions that mirror real deployment scenarios.
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-white/70">
              {admissionsChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-[6px] h-2 w-2 rounded-full bg-white/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm uppercase tracking-[0.28em] text-white/60">
              <a href="mailto:info@thebostondroneschool.org" className="hover:text-white">
                info@thebostondroneschool.org
              </a>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-white/20 bg-white/5 p-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Enrollment</h3>
            <form className="mt-6 grid gap-5" action="https://formspree.io/f/moqgdnge" method="POST">
              <label className="space-y-2 text-xs uppercase tracking-[0.26em] text-white/60">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.16em] text-white outline-none transition focus:border-white/60"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.26em] text-white/60">
                Phone
                <input
                  type="tel"
                  name="phone"
                  className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.16em] text-white outline-none transition focus:border-white/60"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.26em] text-white/60">
                Email*
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm uppercase tracking-[0.16em] text-white outline-none transition focus:border-white/60"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.26em] text-white/60">
                Attach Resume (optional)
                <input
                  type="file"
                  name="resume"
                  className="w-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white file:mr-4 file:border-0 file:bg-white/20 file:px-4 file:py-2 file:text-white file:uppercase file:tracking-[0.2em]"
                />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center border border-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-white hover:text-black"
              >
                Submit Application
              </button>
              <p className="text-[0.7rem] leading-relaxed text-white/50">
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.38em] text-gray-600">Learning Platform</p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.06em] md:text-4xl">
              Continue inside the Boston Drone School e-learning portal.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-700">
              Access structured coursework, instructor feedback, and mission-ready resources tailored to the engagements you explore on this site. Your next briefing, certification, or deployment plan is waiting inside the portal.
            </p>
            <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.32em]">
              <Link href="/portal" className="inline-flex items-center justify-center border border-gray-900 px-6 py-3 text-gray-900 transition hover:bg-gray-900 hover:text-white">
                Access Portal
              </Link>
              <Link href="/courses" className="inline-flex items-center justify-center border border-gray-300 px-6 py-3 text-gray-700 transition hover:border-gray-900 hover:text-gray-900">
                Browse Courses
              </Link>
            </div>
          </div>
          <div className="grid w-full gap-6 rounded-2xl border border-gray-200 bg-white p-8 text-sm text-gray-700 md:max-w-lg">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gray-500">Structured Programs</p>
              <p className="mt-2 leading-relaxed">
                FAA Part 107 prep, advanced photogrammetry, STEM-ready instruction, and policy workflows aligned to enterprise needs.
              </p>
            </div>
            <div className="h-px w-full bg-gray-200" />
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gray-500">Mission Support</p>
              <p className="mt-2 leading-relaxed">
                Download checklists, mission report templates, and quick-reference guides updated by the Boston Drone School faculty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
