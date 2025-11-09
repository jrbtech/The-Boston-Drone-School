import './globals.css'
import '../styles/premium-design-system.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { AuthProvider } from '../contexts/AuthContext'
import { ErrorBoundary } from '../components/ErrorBoundary'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bostondroneschool.org'),
  title: 'The Boston Drone School | FAA Part 107 Certification & Professional Drone Training',
  description:
    'Professional FAA Part 107 drone certification training with 98% pass rate. Expert instruction, commercial drone operations, and comprehensive UAS training programs in Boston.',
  keywords:
    'Boston Drone School, drone operations, UAS training, FAA Part 107, Part 107 certification, drone pilot license, photogrammetry, drone advocacy, STEM engagements, learning portal, commercial drone pilot',
  authors: [{ name: 'The Boston Drone School' }],
  icons: {
    icon: '/images/tbds-graphic.jpg',
    apple: '/images/tbds-graphic.jpg',
  },
  openGraph: {
    title: 'The Boston Drone School | FAA Part 107 Certification & Professional Drone Training',
    description:
      'Earn your FAA Part 107 certification with Boston Drone School. 98% first-time pass rate. Expert instruction, commercial operations training, and comprehensive learning portal.',
    url: 'https://bostondroneschool.org',
    siteName: 'The Boston Drone School',
    type: 'website',
    images: [
      {
        url: '/images/tbds-graphic.jpg',
        width: 1200,
        height: 630,
        alt: 'Boston Drone School - FAA Part 107 Certification',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Boston Drone School | FAA Part 107 Certification',
    description:
      'Earn your FAA Part 107 certification with Boston Drone School. 98% first-time pass rate.',
    images: ['/images/tbds-graphic.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Trigger redeploy for password reset pages
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preconnect to API domain for faster API calls */}
        <link rel="preconnect" href="https://bds-backend-5ao0.onrender.com" />
        <link rel="dns-prefetch" href="https://bds-backend-5ao0.onrender.com" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-black selection:text-white">
        <ErrorBoundary>
          <AuthProvider>
            <div id="root" className="min-h-screen">
              {children}
            </div>
          </AuthProvider>
        </ErrorBoundary>
        <Script src="/js/premium-motion.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}