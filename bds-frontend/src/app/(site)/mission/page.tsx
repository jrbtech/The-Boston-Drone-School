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
            Since 2020 we have paired licensed drone services with community minded training so organizations can adopt unmanned aircraft responsibly.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-8 px-6 py-16 text-base leading-relaxed text-gray-700">
        <p>
          Boston Drone School helps partners modernize daily work with reliable flight operations. From infrastructure projects to creative media, every mission is built around compliance, safety, and clear communication.
        </p>
        <p>
          Our founder, Gregory Anthony Blaize, is an FAA certified Remote Pilot with experience across government affairs, international relations, law enforcement, and community organizations. That breadth keeps each engagement grounded in real policies and real people.
        </p>
        <p>
          Our mission is simple: make drone operations safe, accessible, and useful. We advocate for smart policy, provide skilled flight teams, and deliver training that prepares today&apos;s professionals and tomorrow&apos;s pilots to succeed.
        </p>
      </section>
    </div>
  )
}
