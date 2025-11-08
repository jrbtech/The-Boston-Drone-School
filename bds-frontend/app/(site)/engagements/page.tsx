import Footer from '@/components/layout/Footer'

export default function EngagementsPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-20">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Engagements</p>
          <h1 className="text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            NASA Policy Group Member
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            Boston Drone School is a member of NASA&apos;s m:N Working Group. The group meets throughout the year to evaluate how unmanned aircraft systems fit into the national airspace.
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            Twice a year, representatives gather to share policy recommendations, safety practices, and integration strategies that shape the future of drone operations across the United States.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-6 px-6 py-16 text-base leading-relaxed text-gray-700">
        <p>
          Our participation reflects a commitment to national collaboration and responsible innovation. Field tested insights from Boston Drone School help ensure new regulations support commercial, educational, and civic drone use cases.
        </p>
        <p>
          Organizations that partner with Boston Drone School gain up to date policy awareness, practical recommendations, and a direct line to conversations shaping the next generation of UAS guidelines.
        </p>
      </section>
      <Footer />
    </div>
  )
}
