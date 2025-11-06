import Link from 'next/link'

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
      'FAA Part 107 licensing courses with live instruction.',
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
      'Hands on experiences that highlight drone career pathways.',
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
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
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
              href="/portal"
              className="inline-flex items-center justify-center border border-white/30 bg-white px-6 py-3 text-black transition hover:bg-transparent hover:text-white"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {serviceGroups.map((group) => (
            <div key={group.title} className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
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
      </section>

      <section className="bg-gray-100 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-gray-900">Delivery Model</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Each engagement blends field tested methods with simple digital tools. We align deliverables to your compliance needs and keep check-ins streamlined from planning through reporting.
            </p>
          </div>
          <div className="grid gap-4 text-sm leading-relaxed text-gray-700 md:max-w-xl">
            {deliveryModel.map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-200 bg-white p-6">
                <h3 className="text-xs uppercase tracking-[0.3em] text-gray-500">{item.label}</h3>
                <p className="mt-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-gray-900">Link services to learning pathways.</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Client teams gain access to our learning portal where documentation, updates, and certification prep sit alongside operational deliverables. Everyone stays aligned long after the first flight.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-sm leading-relaxed text-gray-700">
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
      </section>
    </div>
  )
}
