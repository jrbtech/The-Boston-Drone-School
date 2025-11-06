import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { AuthProvider } from '../contexts/AuthContext'

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thebostondroneschool.org'),
  title: 'The Boston Drone School – Operations, Advocacy, and E-Learning',
  description:
    'Professional drone services, policy consultation, and mission-ready training programs delivered by The Boston Drone School.',
  keywords:
    'Boston Drone School, drone operations, UAS training, FAA Part 107, photogrammetry, drone advocacy, STEM engagements, e-learning',
  authors: [{ name: 'The Boston Drone School' }],
  openGraph: {
    title: 'The Boston Drone School – Drone Operations & Learning Portal',
    description:
      'Explore Boston Drone School services, policy advocacy, and access the e-learning portal for certification and mission training.',
    url: 'https://thebostondroneschool.org',
    siteName: 'The Boston Drone School',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-black selection:text-white">
        <AuthProvider>
          <div id="root" className="min-h-screen">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}