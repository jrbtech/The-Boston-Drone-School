import Image from "next/image";
import Link from "next/link";
import AutoplayVideo from "@/components/marketing/AutoplayVideo";
import Footer from "@/components/layout/Footer";

const operations = [
  {
    title: 'Real Estate Intelligence',
    description: 'High-resolution aerial imaging and cinematic videography delivering competitive advantage in property marketing.'
  },
  {
    title: 'Photogrammetric Analysis & 3D Visualization',
    description: 'Precision geospatial mapping and three-dimensional modeling for infrastructure assessment, engineering validation, and compliance documentation.'
  },
  {
    title: 'Construction Progress Intelligence',
    description: 'Systematized aerial surveillance protocols documenting project milestones with quantifiable deliverables for stakeholder transparency.'
  },
  {
    title: 'STEM Workforce Development',
    description: 'Experiential learning programs introducing students and professionals to UAS career pathways and aerospace technology applications.'
  }
];

const missionHighlights = [
  'Strategic UAS integration roadmaps designed for public and private sector stakeholders.',
  'Proactive policy advocacy through the Boston Drone School Drone Advocacy Group.',
  'Comprehensive professional development programs cultivating operational excellence across multi-generational flight teams.'
];

const partnershipHighlights = [
  'Active member of the NASA Mobility Network (m:N) Working Group, contributing to national unmanned aircraft systems policy development.',
  "Strategic partner in Massachusetts' inaugural FAA-registered Drone Apprenticeship Program, advancing workforce development initiatives.",
  'Sustained collaborative engagements with municipal governments, academic research institutions, and enterprise organizations throughout the New England corridor.'
];

const admissionsChecklist = [
  'Live webinar series that covers Part 107 basics and exam tips.',
  'Simple mission planning tools you can apply right away.',
  'Direct help from our team at info@thebostondroneschool.org.'
];

const heroVideo = {
  title: "Cinematic Drone Operations",
  src: "/videos/hero-drone-cinematography.mp4",
  poster: "/videos/hero-drone-cinematography.jpg"
};

const videoShowcase = [
  {
    title: "Advanced Aerial Cinematography",
    src: "/videos/aerial-cinematography.mp4",
    poster: "/videos/aerial-cinematography.jpg",
    description: "Professional aerial cinematography techniques showcasing sophisticated flight operations and advanced camera movements."
  },
  {
    title: "Commercial Drone Operations",
    src: "/videos/commercial-operations.mp4",
    poster: "/videos/commercial-operations.jpg",
    description: "Real-world commercial drone applications including real estate, construction monitoring, and infrastructure inspection."
  },
  {
    title: "Professional Drone Techniques",
    src: "/videos/professional-techniques.mp4",
    poster: "/videos/professional-techniques.jpg",
    description: "Advanced maneuvering and professional flight techniques demonstrating the technical capabilities of modern drone systems."
  }
];

const pricingTiers = [
  {
    name: "Part 107 Complete",
    price: "$297",
    period: "one-time",
    description: "Comprehensive online FAA Part 107 certification course with lifetime access.",
    features: [
      "40 hours of video training",
      "500+ practice exam questions",
      "Interactive airspace maps",
      "Weather interpretation tutorials",
      "Live instructor Q&A sessions",
      "Exam prep checklist",
      "Lifetime course access",
      "30-day money-back guarantee"
    ],
    cta: "Enroll Now",
    ctaLink: "/checkout/part-107-complete",
    highlighted: false,
    badge: "MOST POPULAR"
  },
  {
    name: "Intensive Bootcamp",
    price: "$497",
    period: "weekend",
    description: "Fast-track certification with intensive 2-day weekend training program.",
    features: [
      "16 hours over 2 days",
      "In-person OR live virtual",
      "Hands-on drone practice",
      "Direct instructor mentorship",
      "Exam scheduling assistance",
      "30 days post-course support",
      "All materials included",
      "Small class sizes (max 12)"
    ],
    cta: "Reserve Seat",
    ctaLink: "/checkout/part-107-intensive",
    highlighted: true,
    badge: "BEST VALUE"
  },
  {
    name: "Premium + Business",
    price: "$997",
    period: "complete package",
    description: "Part 107 certification PLUS business launch guidance for professional pilots.",
    features: [
      "Everything in Complete Course",
      "Business formation guidance",
      "Marketing & client acquisition",
      "Equipment recommendations",
      "Legal contracts & templates",
      "4 hours 1-on-1 mentorship",
      "Job placement assistance",
      "Priority lifetime support"
    ],
    cta: "Get Started",
    ctaLink: "/checkout/part-107-premium",
    highlighted: false,
    badge: "PROFESSIONAL"
  }
];

export default function MarketingHomePage() {
  return (
    <div className="bg-white text-black">
      {/* Premium Hero Section with Video Background */}
      <section className="hero-video-container" style={{ minHeight: '100vh' }}>
        {/* Fallback gradient background for when video is loading/missing */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

        {/* Video will go here - currently shows gradient until videos are downloaded */}
        {/* <video autoPlay muted loop playsInline poster="/assets/posters/hero-poster.jpg">
          <source src="/assets/videos/hero-drone-flight.mp4" type="video/mp4" />
        </video> */}

        <div className="semantic-overlay overlay-enhanced">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-6">
              <span className="faa-certified-badge">
                FAA Part 107 Certified Training
              </span>
            </div>
            <Image
              src="/images/boston-drone-school-logo-real.jpg"
              alt="Boston Drone School"
              width={400}
              height={280}
              className="h-20 w-auto mx-auto mb-8 grayscale-image"
              priority
            />
            <h1 className="text-high-contrast text-center">
              Master Professional Drone Operations
            </h1>
            <p className="text-high-contrast text-center max-w-3xl mx-auto opacity-95">
              Earn your <span className="text-highlight">FAA Part 107</span> certification and launch your commercial drone career. Industry-leading training with a 98% first-time pass rate.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link
                href="/study-guide"
                className="btn-premium-cta no-underline"
              >
                <span>Free Study Guide</span>
              </Link>
              <Link
                href="#courses"
                className="btn-tertiary no-underline"
              >
                View Courses
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-6 justify-center text-sm text-white/80">
              <div className="trust-indicator bg-white/10 border-white text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <span>500+ Pilots Certified</span>
              </div>
              <div className="trust-indicator bg-white/10 border-white text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>98% Pass Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Premium Styling */}
      <section className="section-spacing bg-white">
        <div className="container-premium">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start reveal-on-scroll">
            <div className="space-y-6">
              <span className="caption text-gray-500">Our Mission</span>
              <h2 className="h2">
                Precision unmanned aircraft operations engineered for mission-critical applications.
              </h2>
              <div className="course-card p-8 flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
                    <Image
                      src="/images/gregory-anthony-blaize-real.webp"
                      alt="Gregory Anthony Blaize, Founder and FAA Certified Remote Pilot"
                      width={180}
                      height={180}
                      className="h-44 w-44 object-cover grayscale-image"
                      priority
                    />
                  </div>
                </div>
                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div>
                    <p className="text-base font-bold uppercase tracking-wider text-gray-900">
                      Gregory Anthony Blaize
                    </p>
                    <p className="caption text-gray-600">
                      Founder • FAA Certified Remote Pilot
                    </p>
                  </div>
                  <p className="small-text text-gray-700">
                    Gregory integrates extensive experience in governmental affairs, international relations, and law enforcement with advanced UAS operations expertise to deliver comprehensive aerial intelligence solutions.
                  </p>
                </div>
              </div>
              <p className="body text-gray-700">
                Established in 2020, The Boston Drone School provides a strategic framework for organizational UAS integration. Our comprehensive services encompass advanced data acquisition, regulatory compliance architecture, and professional pilot development.
              </p>
            </div>
            <div className="course-card p-8 bg-off-white">
              <h3 className="caption text-gray-600 mb-6">
                What guides our work
              </h3>
              <ul className="space-y-4">
                {missionHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 small-text text-gray-700">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-black flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section - Premium Styling */}
      <section className="section-spacing bg-off-white">
        <div className="container-premium reveal-on-scroll">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="space-y-6">
              <span className="caption text-gray-600">Valuable Partnerships</span>
              <h2 className="h2">
                Trusted collaborators moving the drone ecosystem forward.
              </h2>
            </div>
            <div className="course-card p-8 bg-white space-y-4">
              {partnershipHighlights.map((item) => (
                <p key={item} className="small-text text-gray-700">{item}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operations Section - Premium Card Grid */}
      <section className="section-spacing bg-white">
        <div className="container-premium">
          <div className="space-y-12 reveal-on-scroll">
            <div className="space-y-5 text-center">
              <span className="caption text-gray-500">Corporate Citizenship</span>
              <h2 className="h2">
                Cultivating Advanced UAS Professionals
              </h2>
              <p className="body-large text-gray-700 max-w-3xl mx-auto">
                We architect professional development pathways for emerging talent, transitioning professionals, and established organizations while fostering the technical competencies and safety culture essential for responsible unmanned aircraft systems deployment.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {operations.map((item, index) => (
                <div
                  key={item.title}
                  className="course-card p-8 space-y-3 fade-in-delayed"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="h3">
                    {item.title}
                  </h3>
                  <p className="body text-gray-700">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Premium Dark Theme */}
      <section id="courses" className="section-spacing bg-black text-white">
        <div className="container-premium">
          <div className="mb-16 space-y-6 text-center reveal-on-scroll">
            <div className="mb-6">
              <span className="part-107-badge">FAA Part 107 Courses</span>
            </div>
            <h2 className="h2 text-high-contrast">
              Professional Drone Pilot Training
            </h2>
            <p className="body-large text-white/90 max-w-3xl mx-auto">
              Choose the course that fits your schedule and goals. All courses include our <span className="text-highlight">98% pass rate guarantee</span> and lifetime access to materials.
            </p>
          </div>

          <div className="premium-grid">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`million-dollar-card flex flex-col ${
                  tier.highlighted
                    ? 'bg-white text-black lg:scale-105 border-4 border-white'
                    : 'bg-white text-black border-2 border-gray-200'
                } fade-in-delayed`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="premium-badge">
                    {tier.badge}
                  </span>
                </div>

                <div className="mb-6 space-y-3 border-b border-current/10 pb-6">
                  <h3 className="h3">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="small-text opacity-70">/{tier.period}</span>
                  </div>
                  <p className={`small-text ${tier.highlighted ? 'text-gray-600' : 'text-white/70'}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 small-text">
                      <svg
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                          tier.highlighted ? 'text-black' : 'text-white'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={tier.highlighted ? 'text-gray-700' : 'text-white/80'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.ctaLink}
                  className={tier.highlighted ? 'btn-primary' : 'btn-tertiary'}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="small-text text-white/60">
              All courses include lifetime access and certification upon completion.{' '}
              <Link href="/courses" className="underline hover:text-white transition">
                View all courses
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Admissions Section - Premium Dark Theme */}
      <section className="section-spacing bg-gray-900 text-white">
        <div className="container-premium">
          <div className="grid gap-12 lg:grid-cols-2 reveal-on-scroll">
            <div className="space-y-6">
              <span className="caption text-white/60">Admissions & Corporate Citizenship</span>
              <h2 className="h2 text-white">
                Interested in a Drone Pilot License?
              </h2>
              <p className="body text-white/70">
                Join our live webinar series to build Part 107 knowledge and mission planning skills with real examples you can apply right away.
              </p>
              <ul className="space-y-3">
                {admissionsChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 small-text text-white/70">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-white/80 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="caption text-white/60">
                <a
                  href="mailto:info@thebostondroneschool.org"
                  className="hover:text-white transition"
                >
                  info@thebostondroneschool.org
                </a>
              </div>
            </div>

            <div className="course-card p-8 bg-white/5 border border-white/20">
              <h3 className="caption text-white/70 mb-6">Enrollment</h3>
              <form
                className="space-y-5"
                action="https://formspree.io/f/moqgdnge"
                method="POST"
              >
                <label className="block">
                  <span className="caption text-white/60 block mb-2">Name</span>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/60"
                  />
                </label>
                <label className="block">
                  <span className="caption text-white/60 block mb-2">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/60"
                  />
                </label>
                <label className="block">
                  <span className="caption text-white/60 block mb-2">Email*</span>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full border border-white/20 bg-black/40 px-4 py-3 text-sm text-white outline-none transition focus:border-white/60"
                  />
                </label>
                <label className="block">
                  <span className="caption text-white/60 block mb-2">Attach Resume (optional)</span>
                  <input
                    type="file"
                    name="resume"
                    className="w-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white file:mr-4 file:border-0 file:bg-white/20 file:px-4 file:py-2 file:text-white file:uppercase"
                  />
                </label>
                <button type="submit" className="btn-tertiary w-full">
                  Submit Application
                </button>
                <p className="text-xs text-white/50">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section - Premium Grid */}
      <section className="section-spacing bg-white">
        <div className="container-premium">
          <div className="space-y-10 reveal-on-scroll">
            <div className="space-y-4 text-center">
              <span className="caption text-gray-500">Mission Footage</span>
              <h2 className="h2">
                Experience the workflows our crews deliver.
              </h2>
              <p className="body-large text-gray-600 max-w-3xl mx-auto">
                Explore how Boston Drone School teams capture visuals, coach pilots, and package insights after every mission. Each short video highlights a different stage of our engagements.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {videoShowcase.map((video, index) => (
                <div key={video.src} className="space-y-4 fade-in-delayed" style={{ animationDelay: `${index * 100}ms` }}>
                  <AutoplayVideo
                    src={video.src}
                    poster={video.poster}
                    title={video.title}
                    className="rounded-xl border border-gray-200 shadow-md grayscale-image"
                  />
                  <div className="space-y-2">
                    <h3 className="h4">{video.title}</h3>
                    <p className="small-text text-gray-600">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="section-spacing bg-off-white">
        <div className="container-premium">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center reveal-on-scroll">
            <div className="space-y-6">
              <span className="caption text-gray-600">Learning Platform</span>
              <h2 className="h2">
                Continue inside the Boston Drone School learning portal.
              </h2>
              <p className="body text-gray-700">
                Access structured coursework, instructor feedback, and mission ready resources tailored to the engagements you explore on this site. Your next briefing, certification, or deployment plan is waiting inside the portal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/portal" className="btn-primary">
                  Access Portal
                </Link>
                <Link href="/courses" className="btn-secondary">
                  Browse Courses
                </Link>
              </div>
            </div>
            <div className="course-card p-8 bg-white space-y-6">
              <div>
                <span className="caption text-gray-500 block mb-2">Structured Programs</span>
                <p className="small-text text-gray-700">
                  FAA Part 107 prep, advanced photogrammetry, STEM ready instruction, and policy workflows aligned to enterprise needs.
                </p>
              </div>
              <div className="h-px w-full bg-gray-200" />
              <div>
                <span className="caption text-gray-500 block mb-2">Mission Support</span>
                <p className="small-text text-gray-700">
                  Download checklists, mission report templates, and quick reference guides updated by the Boston Drone School faculty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
