import './globals.css'
import '../styles/premium-design-system.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { AuthProvider } from '../contexts/AuthContext'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { OrganizationStructuredData, LocalBusinessStructuredData } from '../components/StructuredData'
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
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bostondroneschool.org'),
  title: 'The Boston Drone School | FAA Part 107 Certification & Professional Drone Training',
  description:
    'Professional FAA Part 107 drone certification training with 98% pass rate. Expert instruction, commercial drone operations, and comprehensive UAS training programs in Boston.',
  keywords:
    'Boston Drone School, drone operations, UAS training, FAA Part 107, Part 107 certification, drone pilot license, photogrammetry, drone advocacy, STEM engagements, learning portal, commercial drone pilot',
  authors: [{ name: 'The Boston Drone School' }],
  creator: 'The Boston Drone School',
  publisher: 'The Boston Drone School',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/TBDS GRAPHIC.jpg',
    apple: '/images/TBDS GRAPHIC.jpg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'The Boston Drone School | FAA Part 107 Certification & Professional Drone Training',
    description:
      'Earn your FAA Part 107 certification with Boston Drone School. 98% first-time pass rate. Expert instruction, commercial operations training, and comprehensive learning portal.',
    url: 'https://bostondroneschool.org',
    siteName: 'The Boston Drone School',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/TBDS GRAPHIC.jpg',
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
    images: ['/images/TBDS GRAPHIC.jpg'],
    creator: '@BostonDroneSchool',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://bostondroneschool.org',
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

        {/* Structured Data for SEO */}
        <OrganizationStructuredData />
        <LocalBusinessStructuredData />
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
