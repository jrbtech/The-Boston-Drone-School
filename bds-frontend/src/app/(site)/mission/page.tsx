export default function MissionPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Mission</p>
          <h1 className="text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            The Boston Drone School
          </h1>
          <p className="text-base leading-relaxed text-white/70 md:text-lg">
            Founded in 2020 and established in 2022, The Boston Drone School provides a model for safe drone integration into both the
            public and private domain. We are a drone services company that simultaneously practices corporate citizenship through a
            STEAM-focused future workforce education model.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-10 px-6 py-16 text-base leading-relaxed text-gray-700">
        <p>
          The Boston Drone School is rooted in delivering state-of-the-art drone operations for organizations seeking to modernize and
          optimize their business processes. From infrastructure project management to creative media, we build operations that align with
          regulatory standards and mission requirements.
        </p>
        <p>
          Our founder, Gregory Anthony Blaize—an FAA-certified Drone Pilot—brings expansive experience in government affairs, political
          science, international relations, law enforcement, and community-based organizations. This multidisciplinary perspective informs
          how we design policy-conscious, community-aware drone engagements.
        </p>
        <p>
          The mission of The Boston Drone School is to safely integrate and facilitate drone operations for entities ready to modernize their
          operations. We advocate for effective policy, deliver high-performing flight teams, and create educational pathways so that both
          current professionals and future graduates can thrive in the emerging UAS industry.
        </p>
      </section>
    </div>
  )
}
