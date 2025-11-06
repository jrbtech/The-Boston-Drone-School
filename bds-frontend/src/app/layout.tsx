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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://learn.thebostondroneschool.org'),
  title: 'The Boston Drone School - E-Learning Platform',
  description: 'Professional drone education and certification programs grounded in rigorous training and contemporary industry practice.',
  keywords: 'drone training, UAV education, pilot certification, Boston, drone school, e-learning',
  authors: [{ name: 'The Boston Drone School' }],
  openGraph: {
    title: 'The Boston Drone School - E-Learning Platform',
    description: 'Professional drone education and certification programs',
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