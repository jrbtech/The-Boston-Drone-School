/**
 * Premium Homepage Example
 *
 * This is an example implementation of the Boston Drone School
 * premium black & white design system.
 *
 * To use this page:
 * 1. Rename to page.tsx to replace current homepage
 * 2. Or create a new route like /premium to test it
 * 3. Download media assets first (see download-assets.md)
 */

import Image from 'next/image';
import Link from 'next/link';
import HeroVideoSection from '@/components/marketing/HeroVideoSection';
import VideoSection from '@/components/marketing/VideoSection';
import Footer from '@/components/layout/Footer';

const courses = [
  {
    title: 'FAA Part 107 Certification',
    description: 'Master the fundamentals of commercial drone operations and pass your FAA certification exam.',
    videoSrc: '/assets/videos/course-training.mp4',
    posterSrc: '/assets/posters/training-poster.jpg'
  },
  {
    title: 'Commercial Inspection Techniques',
    description: 'Learn professional-grade inspection protocols for infrastructure, real estate, and construction.',
    videoSrc: '/assets/videos/course-inspection.mp4',
    posterSrc: '/assets/posters/inspection-poster.jpg'
  },
  {
    title: 'Advanced Cinematography',
    description: 'Elevate your aerial cinematography with advanced camera movements and composition techniques.',
    videoSrc: '/assets/videos/course-cinematography.mp4',
    posterSrc: '/assets/posters/cinematography-poster.jpg'
  }
];

const features = [
  {
    title: 'Professional Instruction',
    description: 'Learn from FAA-certified pilots with real-world commercial experience.'
  },
  {
    title: 'Hands-On Training',
    description: 'Practice with actual flight scenarios and mission planning exercises.'
  },
  {
    title: 'Industry Recognition',
    description: 'Earn certificates recognized by leading drone service providers.'
  },
  {
    title: 'Lifetime Access',
    description: 'Access course materials and updates for life after enrollment.'
  }
];

export default function PremiumExamplePage() {
  return (
    <div className="bg-white text-black">
      {/* Hero Video Section */}
      <HeroVideoSection
        videoSrc="/assets/videos/hero-drone-flight.mp4"
        posterSrc="/assets/posters/hero-poster.jpg"
        title="Master Commercial Drone Operations"
        subtitle="Professional FAA Part 107 Certification Training"
        ctaText="Begin Training"
        ctaLink="/courses"
        overlayStyle="center"
      />

      {/* Mission Statement Section */}
      <section className="section-spacing bg-white">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
            <span className="caption text-gray-500">Our Mission</span>
            <h2 className="h2 mt-6 mb-8">
              Precision Training for Professional Pilots
            </h2>
            <p className="body-large text-gray-700">
              The Boston Drone School provides comprehensive FAA Part 107 certification
              training and advanced commercial operation techniques for serious drone
              professionals. Our curriculum combines regulatory expertise with real-world
              mission experience.
            </p>
          </div>
        </div>
      </section>

      {/* Split Video Section 1 */}
      <VideoSection
        videoSrc="/assets/videos/course-training.mp4"
        posterSrc="/assets/posters/training-poster.jpg"
        title="FAA Part 107 Certification"
        description="Master federal aviation regulations, airspace classifications, weather
          theory, and flight operations. Our comprehensive training program prepares you
          for the FAA exam and real-world commercial operations."
        layout="split-left"
      />

      {/* Features Grid Section */}
      <section className="section-spacing bg-off-white">
        <div className="container-premium">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="caption text-gray-500">Why Choose Us</span>
            <h2 className="h2 mt-6">Premium Training Experience</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`course-card p-8 reveal-on-scroll fade-in-delayed`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="h3 mb-4">{feature.title}</h3>
                <p className="body text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Video Section 2 */}
      <VideoSection
        videoSrc="/assets/videos/course-inspection.mp4"
        posterSrc="/assets/posters/inspection-poster.jpg"
        title="Commercial Inspection Operations"
        description="Learn professional inspection techniques for infrastructure assessment,
          real estate photography, and construction monitoring. Master the technical and
          business aspects of commercial drone services."
        layout="split-right"
      />

      {/* Course Grid Section */}
      <section className="section-spacing bg-white">
        <div className="container-premium">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="caption text-gray-500">Course Offerings</span>
            <h2 className="h2 mt-6">Professional Training Programs</h2>
            <p className="body-large text-gray-700 mt-6 max-w-3xl mx-auto">
              Comprehensive courses designed for aspiring and experienced drone pilots
              seeking commercial certification and advanced operational skills.
            </p>
          </div>

          <div className="video-grid">
            {courses.map((course) => (
              <div key={course.title} className="video-grid-item">
                <video muted loop playsInline poster={course.posterSrc}>
                  <source src={course.videoSrc} type="video/mp4" />
                </video>
                <div className="grid-overlay">
                  <h3 className="h3 mb-2">{course.title}</h3>
                  <p className="small-text">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Statistics Section */}
      <section className="section-spacing bg-black text-white">
        <div className="container-premium">
          <div className="grid md:grid-cols-3 gap-12 text-center reveal-on-scroll">
            <div>
              <div className="text-5xl font-bold mb-4">500+</div>
              <div className="caption text-white/70">Pilots Certified</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-4">98%</div>
              <div className="caption text-white/70">Exam Pass Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-4">100%</div>
              <div className="caption text-white/70">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-white">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
            <h2 className="h2 mb-8">Ready to Start Your Drone Career?</h2>
            <p className="body-large text-gray-700 mb-12">
              Join hundreds of professional pilots who have launched successful commercial
              drone operations through our training programs.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link href="/courses" className="btn-primary">
                Browse Courses
              </Link>
              <Link href="/inquiry" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
