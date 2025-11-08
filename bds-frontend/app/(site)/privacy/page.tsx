export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-premium section-spacing">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="h1">Privacy Policy</h1>

          <div className="space-y-6 body text-gray-700">
            <p>
              Last Updated: {new Date().toLocaleDateString()}
            </p>

            <section className="space-y-4">
              <h2 className="h3">Information We Collect</h2>
              <p>
                The Boston Drone School collects information that you provide directly to us, including when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Register for courses or programs</li>
                <li>Contact us through forms or email</li>
                <li>Subscribe to our newsletters</li>
                <li>Participate in our training programs</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="h3">How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and improve our training services</li>
                <li>Communicate with you about courses and updates</li>
                <li>Process enrollments and payments</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="h3">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{" "}
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
