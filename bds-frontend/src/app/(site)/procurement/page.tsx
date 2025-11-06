import Link from 'next/link'
import CourseCtaLink from '@/components/marketing/CourseCtaLink'

const workflows = [
  {
    title: 'Consultation',
    subtitle: 'Executive Advisory',
    description:
      'Three one-hour executive consultation sessions tailored to UAS technology integration, policy navigation, and public relations for your organization.',
    callout: 'Includes strategic roadmap and compliance briefing.',
    courseTitle: 'Executive UAS Consultation Series'
  },
  {
    title: 'Part 107 Live Webinar Series',
    subtitle: 'Certification Intensive',
    description:
      'A three-part seminar covering regulations, airspace management, weather, and mission planning—built to streamline your Remote Pilot Certificate preparation.',
    callout: 'Led by FAA-certified instructors with exam insights.',
    courseTitle: 'Part 107 Live Webinar Intensive'
  },
  {
    title: 'Flight Experience',
    subtitle: 'Hands-On Instruction',
    description:
      'Reserve a one-hour guided flight session at your location or one of our pre-approved sites. Perfect for novice pilots seeking safe fundamentals.',
    callout: 'Includes pre-flight briefing and post-flight debrief.',
    courseTitle: 'Guided Flight Experience'
  }
]

export default function ProcurementPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">On-Demand Workflows</p>
          <h1 className="max-w-3xl text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            Procurement built for immediate deployment.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            Secure executive consultation, live webinar instruction, or guided flight experiences engineered to accelerate integration of
            unmanned aircraft systems. Each workflow is delivered by subject matter experts who align operations with your mission profile.
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.32em]">
            <a
              href="mailto:info@thebostondroneschool.org"
              className="inline-flex items-center justify-center border border-white px-6 py-3 text-white transition hover:bg-white hover:text-black"
            >
              Request Invoice
            </a>
            <Link
              href="/portal"
              className="inline-flex items-center justify-center border border-white/30 bg-white px-6 py-3 text-black transition hover:bg-transparent hover:text-white"
            >
              Access Portal Catalog
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-gray-900">Workflows</h2>
            <p className="max-w-3xl text-sm leading-relaxed text-gray-700">
              Select a workflow to be paired with a Boston Drone School specialist. For organizations already inside the e-learning portal,
              these offerings appear alongside your course catalog for streamlined enrollment and billing.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow) => (
              <div key={workflow.title} className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.32em] text-gray-500">{workflow.subtitle}</p>
                    <h3 className="text-xl font-semibold uppercase tracking-[0.08em]">{workflow.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">{workflow.description}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <p className="text-xs uppercase tracking-[0.26em] text-gray-600">{workflow.callout}</p>
                  <CourseCtaLink
                    courseTitle={workflow.courseTitle}
                    className="inline-flex items-center justify-center border border-gray-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-900 transition hover:bg-gray-900 hover:text-white"
                  >
                    Purchase
                  </CourseCtaLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-gray-900">Need a custom engagement?</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              We coordinate enterprise procurement, multi-day flight operations, and policy briefings tailored to your stakeholders. Use the
              inquiry form or email our team with mission objectives to receive a scoping session within two business days.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.32em]">
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center border border-gray-900 px-6 py-3 text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Submit Inquiry
            </Link>
            <a
              href="mailto:info@thebostondroneschool.org"
              className="inline-flex items-center justify-center border border-gray-400 px-6 py-3 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
            >
              Email Operations Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
