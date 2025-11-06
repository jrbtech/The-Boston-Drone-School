const faqs = [
  {
    question: 'Is the Boston Drone School a school?',
    answer:
      'We are FAA licensed Remote Pilot operators delivering a range of drone services under Part 107 regulations. The name reflects our commitment to safe integration, advocacy, and education for private, public, and community partners.'
  },
  {
    question: 'How do I become a Drone Pilot?',
    answer: 'Register for our Flight Instruction Course and we will equip you with the knowledge to start your Part 107 journey.'
  }
]

export default function InquiryPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Inquiry</p>
          <h1 className="text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-base leading-relaxed text-white/70 md:text-lg">
            Reach out if you do not see your question. We respond to most inquiries within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-6">
              <h2 className="text-lg font-semibold uppercase tracking-[0.08em] text-gray-900">{faq.question}</h2>
              <p className="text-sm leading-relaxed text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
          <div className="mt-10 space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              Still need support? Email <a href="mailto:info@thebostondroneschool.org" className="underline underline-offset-4">info@thebostondroneschool.org</a> or submit an enrollment form to start a tailored conversation about your objectives.
            </p>
          </div>
      </section>
    </div>
  )
}
