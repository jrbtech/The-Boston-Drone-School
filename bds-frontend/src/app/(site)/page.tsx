import Image from 'next/image'
import Link from 'next/link'

const operations = [
  {
    title: 'Real Estate Media',
    description: 'Sharp aerial photos and video that help listings stand out.'
  },
  {
    title: 'Photogrammetry & 3D Modeling',
    description: 'Accurate maps and models for planning, inspection, and reporting.'
  },
  {
    title: 'Construction Progress Updates',
    description: 'Scheduled flights that document milestones and keep everyone on the same page.'
  },
  {
    title: 'STEM Workforce Programs',
    description: 'Hands-on workshops that introduce students and job seekers to drone careers.'
  }
]

const missionHighlights = [
  'Clear plans for safe drone adoption with public and private partners.',
  'Active advocacy through the Boston Drone School Drone Advocacy Group.',
  'Programs that help current teams and future pilots learn together.'
]

const partnershipHighlights = [
  'Member of the NASA m:N Working Group contributing to national policy.',
  "Partner in Massachusetts' first registered Drone Apprenticeship program.",
  'Regular collaborations with municipal, academic, and enterprise teams across New England.'
]

const admissionsChecklist = [
  'Live webinar series that covers Part 107 basics and exam tips.',
  'Simple mission planning tools you can apply right away.',
  'Direct help from our team at info@thebostondroneschool.org.'
]

export default function MarketingHomePage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.38em] text-white/60">About Us</p>
            <h1 className="max-w-3xl text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
              Practical Drone Support For Every Mission
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Boston Drone School delivers licensed flights, clear guidance, and ready-to-use training for teams that need dependable aerial support.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              We help real estate, construction, education, and civic partners plan missions, capture data, and build confident crews.
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
              Safe and practical drone operations for every mission.
            </h2>
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <Image
                src="/images/gregory-anthony-blaize-portrait.svg"
                alt="Illustration of Gregory Anthony Blaize"
                width={160}
                height={160}
                className="h-32 w-auto"
                priority
              />
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-900">Gregory Anthony Blaize</p>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Founder and FAA Certified Remote Pilot</p>
                <p className="text-sm leading-relaxed text-gray-700">
                  Gregory blends policy work, community partnerships, and flight experience to guide every project Boston Drone School delivers.
                </p>
              </div>
            </div>
            <p className="text-base leading-relaxed text-gray-700">
              Founded in 2020, Boston Drone School offers a straightforward path to safe drone adoption. We cover data capture, regulatory alignment, and training so clients can move from idea to mission with confidence.
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
            <p className="text-xs uppercase tracking-[0.38em] text-gray-500">Corporate Citizenship</p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.06em] md:text-4xl">
              Building the next generation drone workforce.
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-700 md:mx-0">
              We create pathways for students, career changers, and seasoned teams to build the skills and safety mindset needed to use drones responsibly.
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
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Admissions & Corporate Citizenship</p>
            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-4xl">
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
              Continue inside the Boston Drone School learning portal.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-700">
              Access structured coursework, instructor feedback, and mission ready resources tailored to the engagements you explore on this site. Your next briefing, certification, or deployment plan is waiting inside the portal.
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
                FAA Part 107 prep, advanced photogrammetry, STEM ready instruction, and policy workflows aligned to enterprise needs.
              </p>
            </div>
            <div className="h-px w-full bg-gray-200" />
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-gray-500">Mission Support</p>
              <p className="mt-2 leading-relaxed">
                Download checklists, mission report templates, and quick reference guides updated by the Boston Drone School faculty.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
