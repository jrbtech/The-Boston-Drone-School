import Link from 'next/link'

export default function ExamAccessPage() {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-black text-white">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 py-20 text-center md:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Exam</p>
          <h1 className="text-4xl font-semibold uppercase leading-tight tracking-[0.05em] md:text-5xl">
            Account Sign In
          </h1>
          <p className="text-base leading-relaxed text-white/70 md:text-lg">
            Sign in to the Boston Drone School portal to access your profile, course history, proctored exam resources, and private pages secured for your cohort.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-4xl space-y-6 px-6 py-16 text-sm leading-relaxed text-gray-700">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center md:text-left">
          <p className="text-base text-gray-800">
            Use the links below to sign in to the learning portal. Once authenticated, exam preparation modules and certification checkpoints appear inside your dashboard.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.32em] md:justify-start">
            <Link
              href="/login"
              className="inline-flex items-center justify-center border border-gray-900 px-6 py-3 text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center border border-gray-400 px-6 py-3 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
            >
              Create Account
            </Link>
            <Link
              href="/portal"
              className="inline-flex items-center justify-center border border-gray-400 px-6 py-3 text-gray-700 transition hover:border-gray-900 hover:text-gray-900"
            >
              Return to Portal
            </Link>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.32em] text-gray-500">
            Need help? Email <a href="mailto:info@thebostondroneschool.org" className="underline underline-offset-4">info@thebostondroneschool.org</a>.
          </p>
        </div>
      </section>
    </div>
  )
}
