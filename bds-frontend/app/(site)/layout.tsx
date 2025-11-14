import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import MarketingHeader from '@/components/marketing/MarketingHeader'
import MarketingFooter from '@/components/marketing/MarketingFooter'

export const metadata: Metadata = {
  title: {
    default: 'The Boston Drone School | FAA Part 107 Certification & Professional Drone Training',
    template: '%s | The Boston Drone School'
  },
  description: 'Professional FAA Part 107 drone certification training with 98% pass rate. Expert instruction, commercial drone operations, and comprehensive UAS training programs in Boston.',
  keywords: 'Boston Drone School, drone operations, UAS training, FAA Part 107, Part 107 certification, drone pilot license, photogrammetry, drone advocacy, STEM engagements, learning portal, commercial drone pilot',
}

export default function MarketingSiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Preload critical assets */}
      <link rel="preload" href="/images/tbds-graphic.jpg" as="image" />
      <div className="flex min-h-screen flex-col bg-white text-gray-900">
        <MarketingHeader />
        <main className="flex-1 bg-white">
          {children}
        </main>
        <MarketingFooter />
      </div>
    </>
  )
}
