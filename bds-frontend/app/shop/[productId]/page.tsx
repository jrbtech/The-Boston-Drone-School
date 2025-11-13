'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const products = {
  'fpv-build-kit': {
    id: 'fpv-build-kit',
    name: 'FPV Drone Build Kit',
    category: 'Hardware',
    price: 299,
    description: 'Complete FPV drone build kit with all components needed to assemble your first racing drone.',
    longDescription: 'This comprehensive kit includes everything you need to build a professional-grade FPV racing drone. Perfect for beginners and intermediate pilots looking to understand drone mechanics from the ground up.',
    features: [
      'Carbon fiber frame (5-inch)',
      'Brushless motors (4x 2207 1800KV)',
      'Flight controller with GPS',
      'FPV camera and video transmitter',
      'ESC (Electronic Speed Controller)',
      'Props and hardware kit',
      'Assembly guide and tutorials'
    ],
    specifications: {
      'Frame Size': '5 inch',
      'Motor KV': '1800KV',
      'Flight Time': '5-7 minutes',
      'Weight': '450g (without battery)',
      'Max Speed': '120+ mph'
    },
    inStock: true
  },
  'part-107-study-bundle': {
    id: 'part-107-study-bundle',
    name: 'Part 107 Study Bundle (Physical)',
    category: 'Study Materials',
    price: 79,
    description: 'Physical study materials including textbook, flashcards, airspace map, and cheat sheets.',
    longDescription: 'Comprehensive physical study materials to help you pass the FAA Part 107 exam. Perfect for those who prefer tactile learning methods.',
    features: [
      'Printed Part 107 study guide (300 pages)',
      '200+ flashcards with exam questions',
      'Laminated sectional chart',
      'Quick reference cheat sheets',
      'Practice exam booklet',
      'Study planner worksheet'
    ],
    specifications: {
      'Pages': '300+',
      'Flashcards': '200',
      'Format': 'Printed',
      'Shipping Weight': '2.5 lbs'
    },
    inStock: true
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId
  const [quantity, setQuantity] = useState(1)

  const product = productId ? products[productId as keyof typeof products] : null

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
              <div className="absolute top-6 right-6 bg-white text-black border-2 border-black px-4 py-2 rounded-full font-semibold">
                COMING SOON
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
              <Link
                href="/inquiry"
                className="block w-full bg-black text-white text-center py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Express Interest - ${product.price * quantity}
              </Link>
              <p className="text-sm text-gray-600 text-center">
                Products coming soon. Contact us at <a href="mailto:info@thebostondroneschool.org" className="underline hover:text-black">info@thebostondroneschool.org</a> for updates.
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
