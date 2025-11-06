import Link from 'next/link'

const serviceGroups = [
  {
    title: 'Operational Services',
    items: [
      'Aerial cinematography and photography for real estate, marketing, and civic storytelling.',
      'Infrastructure inspection, progress tracking, and coastal erosion monitoring.',
      'Survey-grade photogrammetry, 3D modeling, and volumetric analytics.'
    ]
  },
  {
    title: 'Training & Certification',
    items: [
      'FAA Part 107 Remote Pilot licensing intensives with live instruction.',
      'Mission scenario labs and simulator drills aligned to enterprise SOPs.',
      'Continuing education modules synchronized with regulatory updates.'
    ]
  },
  {
    title: 'Consultation & Advisory',
    items: [
      'Policy, governance, and public relations guidance through the Drone Advocacy Group.',
      'Procurement frameworks, risk mitigation, and operational readiness assessments.',
      'Stakeholder briefings and communication plans for emerging drone initiatives.'
    ]
  },
  {
    title: 'STEM & Workforce Engagements',
    items: [
      'Customized programs for K-12, higher education, and workforce pipelines.',
      'Hands-on engagements showcasing drone technology careers to emerging talent.',
      'Curriculum design integrating UAS, AI, and clean-energy technology principles.'
    ]
  }
]

const deliveryModel = [
  {
    label: 'Hybrid Delivery',
    description:
      'On-site field operations combined with virtual mission planning and post-production support to maintain continuity across distributed teams.'
  },
  {
    label: 'Portal Integration',
    description:
      'Each service connects to our learning management environment so crews can access training, resources, and certification assets in one place.'
  },
  {
    label: 'Data Stewardship',
    description:
      'Secure capture, processing, and archival workflows ensure deliverables remain compliant with organizational and regulatory standards.'
  }
]

export default function ServicesPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Service Catalog</p>
          <h1 className="max-w-3xl text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            Comprehensive drone operations, training, and advocacy.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            The Boston Drone School supports mission lifecycles from consultation to certification. We combine professional pilots, policy
            strategists, and educators to deliver engagements that meet enterprise, civic, and academic objectives.
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
              Each engagement blends field-tested methodology with digital infrastructure. We align deliverables to your compliance
              requirements and incorporate collaborative checkpoints from planning to reporting.
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
              Client teams gain access to our e-learning environment where documentation, SOP updates, and certification prep live alongside
              operational deliverables. This keeps every stakeholder aligned long after the initial engagement concludes.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-sm leading-relaxed text-gray-700">
            <p>
              Onboard your crew to the portal to track course progress, review mission checklists, and download templates. Our support team
              assists with user provisioning, reporting, and ongoing curriculum alignment.
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
