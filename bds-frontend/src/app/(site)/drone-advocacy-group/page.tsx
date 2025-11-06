import Link from 'next/link'

const pillars = [
  {
    title: 'Policy Intelligence',
    description:
      'Translate federal guidance, emerging legislation, and local ordinances into operational policy that keeps your missions compliant and resilient.'
  },
  {
    title: 'Stakeholder Engagement',
    description:
      'Craft public relations and communication strategies that build trust with regulators, communities, and partners impacted by UAS deployments.'
  },
  {
    title: 'Integration Strategy',
    description:
      'Design mission frameworks that align technology, training, and documentation to accelerate safe adoption of unmanned systems.'
  }
]

export default function AdvocacyGroupPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Boston Drone School&rsquo;s Drone Advocacy Group</p>
          <h1 className="max-w-3xl text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            Subject matter experts ensuring safe UAS integration.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            We are a team of seasoned policy consultants with deep public relations and government affairs expertise. Our work centers on
            building frameworks that allow unmanned aircraft systems to operate safely within evolving federal and state guidance.
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            The Drone Advocacy Group maintains nationwide relationships, industry insight, and influence needed to move your project forward.
            From municipal advisement to enterprise integration, we ensure your policy roadmap becomes a tangible asset.
          </p>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.32em]">
            <a
              href="mailto:info@thebostondroneschool.org"
              className="inline-flex items-center justify-center border border-white px-6 py-3 text-white transition hover:bg-white hover:text-black"
            >
              Schedule Discovery Call
            </a>
            <Link
              href="/procurement"
              className="inline-flex items-center justify-center border border-white/30 bg-white px-6 py-3 text-black transition hover:bg-transparent hover:text-white"
            >
              View Engagement Options
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-gray-900">Our Advisory Pillars</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Every engagement is grounded in practical policy experience and real-world operations. We work alongside your leadership, legal
              teams, and mission specialists to architect solutions that withstand regulatory scrutiny and public visibility.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-sm leading-relaxed text-gray-700">
            <p>
              Discovery calls include a discussion of current UAS objectives, policy hurdles, and stakeholder alignment. We outline required
              resources, timelines, and deliverables to move from assessment to implementation.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.28em] text-gray-600">
              Standard retainer fees apply – scope is confirmed after discovery.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold uppercase tracking-[0.1em] text-gray-900">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-gray-700">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.08em] text-gray-900">Ready to brief stakeholders?</h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Pair policy advisement with course enrollment to give your teams hands-on training alongside strategic direction. The Drone
              Advocacy Group collaborates closely with Boston Drone School faculty to align curriculum with your regulatory milestones.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.32em]">
            <Link
              href="/portal"
              className="inline-flex items-center justify-center border border-gray-900 px-6 py-3 text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Pair with Courses
            </Link>
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center border border-gray-400 px-6 py-3 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
            >
              Submit Policy Request
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
