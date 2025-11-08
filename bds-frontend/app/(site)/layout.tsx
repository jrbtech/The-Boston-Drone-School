import type { ReactNode } from 'react'
import MarketingHeader from '@/components/marketing/MarketingHeader'
import MarketingFooter from '@/components/marketing/MarketingFooter'

export default function MarketingSiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <MarketingHeader />
      <main className="flex-1 bg-white">
        {children}
      </main>
      <MarketingFooter />
    </div>
  )
}
