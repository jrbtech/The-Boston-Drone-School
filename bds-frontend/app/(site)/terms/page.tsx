export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
          <h1 className="h1">Terms of Service</h1>

          <div className="space-y-6 body text-gray-700">
            <p>
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
              <h2 className="h3">Acceptance of Terms</h2>
              <p>
                By accessing and using The Boston Drone School&apos;s services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="h3">Course Enrollment</h2>
              <p>
                When you enroll in a course:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You gain lifetime access to course materials</li>
                <li>All sales are final unless otherwise stated</li>
                <li>30-day money-back guarantee applies to eligible courses</li>
                <li>You must comply with FAA regulations when operating drones</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="h3">Refund Policy</h2>
              <p>
                We offer a 30-day money-back guarantee on select courses. Contact us at{" "}
                <a href="mailto:info@thebostondroneschool.org" className="underline">
                  info@thebostondroneschool.org
                </a>{" "}
                to request a refund within 30 days of purchase.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="h3">Contact Us</h2>
              <p>
                If you have questions about these Terms, please contact us at{" "}
                <a href="mailto:info@thebostondroneschool.org" className="underline">
                  info@thebostondroneschool.org
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
