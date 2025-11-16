'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'

const products = {
  'part-107-complete-study-kit': {
    id: 'part-107-complete-study-kit',
    name: 'FAA Part 107 Complete Study Kit',
    category: 'Study Materials',
    price: 89,
    fulfillment: 'print-on-demand',
    description: 'Comprehensive physical study package with printed FAA materials. All content sourced from official FAA public domain publications.',
    longDescription: 'Everything you need to pass the FAA Part 107 exam in one complete package. This professionally printed study kit compiles official FAA public domain materials into an organized, easy-to-use format. Perfect for those who prefer physical study materials over digital.',
    features: [
      'Printed FAA Remote Pilot Study Guide (300+ pages)',
      'Official 14 CFR Part 107 regulations (bound)',
      '250+ practice questions with answers',
      'Laminated Boston sectional chart (current edition)',
      'Quick reference cards (weather, airspace, regulations)',
      'Exam preparation checklist',
      'Free shipping on orders over $75'
    ],
    specifications: {
      'Format': 'Printed and bound',
      'Total Pages': '400+',
      'Shipping Weight': '3.2 lbs',
      'Chart Size': '36" x 20"',
      'Processing Time': '3-5 business days'
    },
    legalNote: 'Materials compiled from FAA public domain sources per 17 USC § 105. Not affiliated with or endorsed by the FAA.',
    inStock: true
  },
  'sectional-chart-set': {
    id: 'sectional-chart-set',
    name: 'Laminated Sectional Chart Set',
    category: 'Study Materials',
    price: 34,
    fulfillment: 'print-on-demand',
    description: 'Professional-quality laminated sectional charts. Current edition, waterproof, write-on/wipe-off surface.',
    longDescription: 'High-quality laminated sectional charts perfect for flight planning and Part 107 exam preparation. Features write-on/wipe-off surface for marking flight paths. Compiled from FAA public domain aeronautical chart data.',
    features: [
      'Your choice of sectional (Boston, New York, or custom)',
      'Heavy-duty lamination (waterproof)',
      'Write-on surface for flight planning',
      '36" x 20" full sectional size',
      'Current edition (updated every 6 months)',
      'Includes airspace legend card',
      'FAA public domain chart data'
    ],
    specifications: {
      'Size': '36" x 20"',
      'Lamination': '10 mil heavy-duty',
      'Weight': '0.8 lbs',
      'Processing Time': '2-4 business days',
      'Edition': 'Current (updated biannually)'
    },
    legalNote: 'Charts from FAA public domain aeronautical data. Chart data current as of print date.',
    inStock: true
  },
  'dji-mini-4-pro': {
    id: 'dji-mini-4-pro',
    name: 'DJI Mini 4 Pro (Affiliate)',
    category: 'Drones',
    price: 759,
    fulfillment: 'affiliate',
    description: 'Perfect beginner drone under 249g (no registration required for recreational use). Professional features in ultralight package.',
    longDescription: 'The DJI Mini 4 Pro is the ultimate drone for Part 107 students and professionals. At under 249 grams, it does not require FAA registration for recreational use, but delivers professional-grade 4K video and advanced features. Ships directly from our authorized DJI retail partner.',
    features: [
      '4K/60fps HDR video',
      '34-minute max flight time',
      'Omnidirectional obstacle sensing',
      'ActiveTrack 360° subject tracking',
      'Under 249 grams (no FAA registration for recreation)',
      '10km video transmission',
      'Perfect for Part 107 training'
    ],
    specifications: {
      'Weight': '249g',
      'Max Flight Time': '34 minutes',
      'Video Resolution': '4K/60fps HDR',
      'Transmission Range': '10 km',
      'Obstacle Sensing': 'Omnidirectional',
      'Camera': '1/1.3" CMOS, 48MP'
    },
    affiliateNote: 'This product ships directly from our authorized DJI retail partner. Standard return policies apply.',
    inStock: true
  },
  'landing-pad-pro': {
    id: 'landing-pad-pro',
    name: 'Collapsible Landing Pad - Pro 30"',
    category: 'Accessories',
    price: 39,
    fulfillment: 'wholesale',
    description: 'Professional 30-inch collapsible landing pad. High-visibility design with weighted anchors for stable operations.',
    longDescription: 'Essential equipment for professional drone operations. This 30-inch landing pad provides a clean, visible launch and landing zone. Dual-sided design offers high-visibility orange or blue depending on ground conditions. Weighted anchors prevent movement in wind.',
    features: [
      '30-inch diameter working area',
      'Dual-sided orange/blue high-viz design',
      'Weighted anchor points (4x)',
      'Reflective strips for low-light operations',
      'Folds to 12" compact carrying case',
      'Weather-resistant nylon material',
      'Compatible with all drone sizes'
    ],
    specifications: {
      'Diameter': '30 inches (76 cm)',
      'Folded Size': '12 inches',
      'Material': 'Weather-resistant nylon',
      'Weight': '1.2 lbs',
      'Colors': 'Orange/Blue reversible'
    },
    inStock: true
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId
  const [quantity, setQuantity] = useState(1)
  const [adding, setAdding] = useState(false)

  const product = productId ? products[productId as keyof typeof products] : null

  const handleAddToCart = () => {
    if (!product) return

    setAdding(true)
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
      })
    }

    setTimeout(() => {
      setAdding(false)
      router.push('/cart')
    }, 300)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/shop" className="text-black hover:text-gray-700 underline">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Boston Drone School
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/shop" className="text-gray-600 hover:text-black">Shop</Link>
              <Link href="/courses" className="text-gray-600 hover:text-black">Courses</Link>
              <Link href="/login" className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Product Image */}
          <div>
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden border-2 border-gray-200">
              <div className="absolute inset-0 flex items-center justify-center bg-white p-12">
                <Image
                  src="/images/TBDS GRAPHIC.jpg"
                  alt="Boston Drone School"
                  width={400}
                  height={280}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-600 uppercase tracking-wider mb-2">{product.category}</div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="text-4xl font-bold mb-6">${product.price}</div>
            </div>

            <p className="text-gray-700 text-lg">{product.longDescription}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 py-4">
              <label className="font-semibold">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Purchase Button */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="w-full bg-black text-white text-center py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {adding ? 'Adding...' : `Add to Cart - $${(product.price * quantity).toFixed(2)}`}
              </button>
              <p className="text-sm text-gray-600 text-center">
                Questions? Contact us at <a href="mailto:info@thebostondroneschool.org" className="underline hover:text-black">info@thebostondroneschool.org</a>
              </p>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-xl mb-4">What&apos;s Included:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-xl mb-4">Specifications:</h3>
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="font-medium text-gray-700">{key}</dt>
                    <dd className="text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Fulfillment Info */}
            {product.fulfillment && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-xl mb-3">Fulfillment:</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  {product.fulfillment === 'print-on-demand' && (
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-900">Print-on-Demand:</strong> This product is professionally printed and shipped within 3-5 business days. Each item is made to order to ensure freshness and quality.
                    </p>
                  )}
                  {product.fulfillment === 'affiliate' && (
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-900">Partner Fulfilled:</strong> {product.affiliateNote || 'This product ships directly from our authorized retail partner. Standard manufacturer warranty and return policies apply.'}
                    </p>
                  )}
                  {product.fulfillment === 'wholesale' && (
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-900">In-Stock:</strong> This product ships from our warehouse within 1-2 business days. Standard shipping and return policies apply.
                    </p>
                  )}
                  {product.fulfillment === 'digital' && (
                    <p className="text-sm text-gray-700">
                      <strong className="text-blue-900">Digital Delivery:</strong> You will receive download instructions and license key via email immediately after purchase. No physical shipping required.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Legal Note */}
            {product.legalNote && (
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-xs text-gray-600">
                    <strong>Legal Notice:</strong> {product.legalNote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">You May Also Like</h2>
          <div className="text-center">
            <Link
              href="/shop"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
