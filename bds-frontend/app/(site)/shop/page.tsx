'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

const products = [
  {
    id: 'part-107-complete-study-kit',
    name: 'FAA Part 107 Complete Study Kit',
    category: 'Study Materials',
    price: 89,
    fulfillment: 'print-on-demand',
    image: '/images/study-bundle-placeholder.jpg',
    description: 'Comprehensive physical study package with printed FAA materials. All content sourced from official FAA public domain publications.',
    features: [
      'Printed FAA Remote Pilot Study Guide (300+ pages)',
      'Official 14 CFR Part 107 regulations (bound)',
      '250+ practice questions with answers',
      'Laminated Boston sectional chart (current edition)',
      'Quick reference cards (weather, airspace, regulations)',
      'Exam preparation checklist',
      'Free shipping on orders over $75'
    ],
    legalNote: 'Materials compiled from FAA public domain sources (17 USC § 105)',
    inStock: true
  },
  {
    id: 'sectional-chart-set',
    name: 'Laminated Sectional Chart Set',
    category: 'Study Materials',
    price: 34,
    fulfillment: 'print-on-demand',
    image: '/images/charts-placeholder.jpg',
    description: 'Professional-quality laminated sectional charts. Current edition, waterproof, write-on/wipe-off surface.',
    features: [
      'Your choice of sectional (Boston, New York, or custom)',
      'Heavy-duty lamination (waterproof)',
      'Write-on surface for flight planning',
      '36" x 20" full sectional size',
      'Current edition (updated every 6 months)',
      'Includes airspace legend card',
      'FAA public domain chart data'
    ],
    legalNote: 'Charts from FAA public domain aeronautical data',
    inStock: true
  },
  {
    id: 'part-107-flashcards',
    name: 'Part 107 Exam Flashcard Set',
    category: 'Study Materials',
    price: 29,
    fulfillment: 'print-on-demand',
    image: '/images/flashcards-placeholder.jpg',
    description: 'Professional flashcard set covering all Part 107 exam topics. Perfect for on-the-go studying.',
    features: [
      '300 double-sided flashcards',
      'Organized by topic (regulations, airspace, weather, etc.)',
      'Color-coded by difficulty level',
      'Includes sectional chart symbols',
      'Durable cardstock with rounded corners',
      'Storage box included',
      'Based on official FAA materials'
    ],
    legalNote: 'Content from FAA public domain study materials',
    inStock: true
  },
  {
    id: 'drone-flight-logbook',
    name: 'Professional Drone Flight Logbook',
    category: 'Accessories',
    price: 24,
    fulfillment: 'print-on-demand',
    image: '/images/logbook-placeholder.jpg',
    description: 'Premium hardcover logbook for tracking commercial drone operations. Essential for Part 107 pilots.',
    features: [
      'Hardcover with weather-resistant binding',
      '200 flight entry pages',
      'Pre-formatted for Part 107 compliance',
      'Battery tracking sheets',
      'Maintenance record pages',
      'Incident/accident reporting templates',
      'Meets FAA record-keeping best practices'
    ],
    inStock: true
  },
  {
    id: 'landing-pad-pro',
    name: 'Collapsible Landing Pad - Pro 30"',
    category: 'Accessories',
    price: 39,
    fulfillment: 'wholesale',
    image: '/images/landing-pad-placeholder.jpg',
    description: 'Professional 30-inch collapsible landing pad. High-visibility design with weighted anchors for stable operations.',
    features: [
      '30-inch diameter working area',
      'Dual-sided orange/blue high-viz design',
      'Weighted anchor points (4x)',
      'Reflective strips for low-light operations',
      'Folds to 12" compact carrying case',
      'Weather-resistant nylon material',
      'Compatible with all drone sizes'
    ],
    inStock: true
  },
  {
    id: 'dji-mini-4-pro',
    name: 'DJI Mini 4 Pro (Affiliate)',
    category: 'Drones',
    price: 759,
    fulfillment: 'affiliate',
    image: '/images/dji-mini-placeholder.jpg',
    description: 'Perfect beginner drone under 249g (no registration required for recreational use). Professional features in ultralight package.',
    features: [
      '4K/60fps HDR video',
      '34-minute max flight time',
      'Omnidirectional obstacle sensing',
      'ActiveTrack 360° subject tracking',
      'Under 249 grams (no FAA registration for recreation)',
      '10km video transmission',
      'Perfect for Part 107 training'
    ],
    affiliateNote: 'Ships directly from authorized DJI retailer',
    inStock: true
  },
  {
    id: 'battery-fireproof-bag',
    name: 'LiPo Battery Safety Bag (3-pack)',
    category: 'Safety Equipment',
    price: 34,
    fulfillment: 'wholesale',
    image: '/images/lipo-bag-placeholder.jpg',
    description: 'Essential safety equipment for charging and storing LiPo batteries. Fireproof and explosion-proof design.',
    features: [
      '3 sizes: Small (7x5"), Medium (9x7"), Large (12x9")',
      'Fireproof fiberglass construction',
      'Heat-resistant up to 1000°F',
      'Double velcro closure',
      'Required for safe LiPo storage',
      'TSA-approved for air travel',
      'Protects against LiPo fire hazards'
    ],
    inStock: true
  }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addItem, totalItems } = useCart();
  const [addingId, setAddingId] = useState<string | null>(null);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleQuickAdd = (product: typeof products[0]) => {
    setAddingId(product.id);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });

    setTimeout(() => setAddingId(null), 500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold">
              Boston Drone School
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/courses" className="text-gray-600 hover:text-black">Courses</Link>
              <Link href="/study-guide" className="text-gray-600 hover:text-black">Free Study Guide</Link>
              <Link href="/cart" className="relative text-gray-600 hover:text-black">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link href="/login" className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-black text-white py-20 md:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="h1 text-white">Professional Drone Equipment & Training Materials</h1>
            <p className="body-large text-white/80">
              Everything you need to excel in your drone operations. From build kits to study materials, we offer professional-grade equipment to support your certification and commercial drone career.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-gray-50 border-b border-gray-200 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-gray-900'
                }`}
              >
                {cat === 'all' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {filteredProducts.map((product) => (
              <div key={product.id} className="course-card overflow-hidden group">
                {/* Product Image */}
                <div className="relative h-64 bg-white">
                  <div className="absolute inset-0 flex items-center justify-center bg-white p-8">
                    <Image
                      src="/images/TBDS GRAPHIC.jpg"
                      alt="Boston Drone School"
                      width={200}
                      height={140}
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="h3 mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold">${product.price}</p>
                  </div>

                  <p className="body text-gray-700">{product.description}</p>

                  <div className="pt-4">
                    <p className="caption text-gray-600 mb-3">Includes:</p>
                    <ul className="space-y-2">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <svg className="w-4 h-4 text-gray-900 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                      {product.features.length > 3 && (
                        <li className="text-sm text-gray-500">+ {product.features.length - 3} more items</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      disabled={addingId === product.id}
                      className="flex-1 bg-black text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                    >
                      {addingId === product.id ? 'Added!' : 'Add to Cart'}
                    </button>
                    <Link
                      href={`/shop/${product.id}`}
                      className="px-6 border border-gray-900 text-gray-900 text-center py-3 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors flex items-center"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <h3 className="text-center text-2xl font-bold mb-10 text-gray-800">When Available, You&apos;ll Enjoy:</h3>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="h4">Free Shipping</h3>
              <p className="small-text text-gray-600">On orders over $100</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="h4">Quality Guaranteed</h3>
              <p className="small-text text-gray-600">30-day money-back guarantee</p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="h4">Expert Support</h3>
              <p className="small-text text-gray-600">Technical assistance included</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 lg:py-28 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="h2 text-white">Need Help Choosing Equipment?</h2>
            <p className="body text-white/80">
              Our drone experts can help you select the right equipment for your specific needs and budget.
            </p>
            <Link
              href="/inquiry"
              className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
