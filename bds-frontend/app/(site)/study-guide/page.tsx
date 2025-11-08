import Link from "next/link";

export default function StudyGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-premium section-spacing">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6 text-center">
            <h1 className="h1">Free FAA Part 107 Study Guide</h1>
            <p className="body-large text-gray-700 max-w-3xl mx-auto">
              Download our comprehensive study guide to help you prepare for your FAA Part 107 certification exam.
            </p>
          </div>

          <div className="course-card p-12 bg-off-white text-center space-y-6">
            <h2 className="h2">Study Guide Coming Soon</h2>
            <p className="body text-gray-700">
              We&apos;re currently finalizing our comprehensive FAA Part 107 study guide.
              In the meantime, explore our full certification courses.
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <Link href="/#courses" className="btn-primary">
                View Courses
              </Link>
              <Link href="/inquiry" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
