import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Mission | The Boston Drone School',
  description: 'Since 2020, The Boston Drone School has integrated FAA-certified aerial operations with strategic workforce development to enable organizations to deploy unmanned aircraft systems with regulatory precision and operational excellence.',
  keywords: 'Boston Drone School mission, drone training mission, UAS workforce development, FAA certified operations, Gregory Anthony Blaize',
  openGraph: {
    title: 'Our Mission | The Boston Drone School',
    description: 'Learn about our mission to advance operational capabilities through precision unmanned aircraft systems deployment and workforce development.',
    url: 'https://bostondroneschool.org/mission',
    type: 'website',
  },
}

export default function MissionPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 sm:px-6 py-16 sm:py-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Mission</p>
          <h1 className="text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            The Boston Drone School
          </h1>
          <p className="text-base leading-relaxed text-white/70 md:text-lg">
            Since 2020, we have integrated FAA-certified aerial operations with strategic workforce development to enable organizations to deploy unmanned aircraft systems with regulatory precision and operational excellence.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8 px-4 sm:px-6 py-12 sm:py-16 text-base leading-relaxed text-gray-700">
        <p>
          The Boston Drone School enables organizations to advance operational capabilities through precision unmanned aircraft systems deployment. From critical infrastructure assessment to commercial real estate marketing, our engagements are architected around regulatory compliance, operational safety protocols, and transparent stakeholder communication.
        </p>
        <p>
          Founder Gregory Anthony Blaize brings a distinguished background spanning governmental policy development, international diplomatic relations, law enforcement collaboration, and community engagement initiatives. This multidisciplinary expertise ensures every client engagement is informed by regulatory frameworks, operational realities, and mission stakeholder requirements.
        </p>
        <p>
          Our mission remains unequivocal: to establish unmanned aircraft operations as secure, accessible, and strategically valuable. We champion evidence-based policy advancement, deliver expert flight operations teams, and architect training programs that prepare current professionals and emerging talent for sustained success in the evolving UAS landscape.
        </p>
      </section>
    </div>
  )
}
