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
            The Boston Drone School is a proud member of NASA&apos;s m:N Working Group. Members convene throughout the year to evaluate the
            challenges and opportunities of incorporating unmanned aircraft systems into the national airspace.
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            Twice annually, representatives from each subgroup gather in person to advance policy recommendations, safety protocols, and
            integration strategies that shape the future of drone operations across the United States.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl space-y-6 px-6 py-16 text-base leading-relaxed text-gray-700">
        <p>
          Our participation in the NASA m:N Working Group reflects a commitment to national collaboration and responsible innovation. By
          contributing field-tested insights, we help ensure that emerging regulations support commercial, educational, and civic drone use
          cases.
        </p>
        <p>
          Organizations partnering with The Boston Drone School benefit from up-to-date policy awareness, evidence-based recommendations, and
          a direct conduit to conversations shaping the next generation of UAS guidelines.
        </p>
      </section>
    </div>
  )
}
