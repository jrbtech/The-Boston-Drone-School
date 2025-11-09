'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: 'fpv-build-kit',
    name: 'FPV Drone Build Kit',
    category: 'Hardware',
    price: 299,
    image: '/images/drone-kit-placeholder.jpg',
    description: 'Complete FPV drone build kit with all components needed to assemble your first racing drone.',
    features: [
      'Carbon fiber frame (5-inch)',
      'Brushless motors (4x 2207 1800KV)',
      'Flight controller with GPS',
      'FPV camera and video transmitter',
      'ESC (Electronic Speed Controller)',
      'Props and hardware kit',
      'Assembly guide and tutorials'
    ],
    inStock: true
  },
  {
    id: 'part-107-study-bundle',
    name: 'Part 107 Study Bundle (Physical)',
    category: 'Study Materials',
    price: 79,
    image: '/images/study-bundle-placeholder.jpg',
    description: 'Physical study materials including textbook, flashcards, airspace map, and cheat sheets.',
    features: [
      'Printed Part 107 study guide (300 pages)',
      '200+ flashcards with exam questions',
      'Laminated sectional chart',
      'Quick reference cheat sheets',
      'Practice exam booklet',
      'Study planner worksheet'
    ],
    inStock: true
  },
  {
    id: 'professional-drone-case',
    name: 'Professional Drone Transport Case',
    category: 'Accessories',
    price: 149,
    image: '/images/case-placeholder.jpg',
    description: 'Waterproof hard-shell case with custom foam insert for professional drone operations.',
    features: [
      'Waterproof and dustproof (IP67)',
      'Custom-cut foam inserts',
      'Fits DJI Mavic and similar models',
      'Lockable latches',
      'Pressure release valve',
      'Wheels and telescopic handle'
    ],
    inStock: true
  },
  {
    id: 'landing-pad-pro',
    name: 'Collapsible Landing Pad - Pro',
    category: 'Accessories',
    price: 39,
    image: '/images/landing-pad-placeholder.jpg',
    description: 'Professional 30-inch collapsible landing pad with weighted anchors for stable takeoffs.',
    features: [
      '30-inch diameter',
      'High-visibility orange and blue',
      'Weighted anchor points',
      'Reflective markers for low light',
      'Folds to 12-inch carrying case',
      'Weather-resistant material'
    ],
    inStock: true
  },
  {
    id: 'battery-charging-hub',
    name: '6-Port Fast Charging Hub',
    category: 'Accessories',
    price: 129,
    image: '/images/charger-placeholder.jpg',
    description: 'Intelligent charging hub for simultaneous battery charging with safety monitoring.',
    features: [
      'Charges up to 6 batteries simultaneously',
      'Smart power distribution',
      'Overcharge protection',
      'Temperature monitoring',
      'LED status indicators',
      'Compatible with multiple battery types'
    ],
    inStock: true
  },
  {
    id: 'beginner-drone-package',
    name: 'Beginner Training Drone Package',
    category: 'Hardware',
    price: 199,
    image: '/images/training-drone-placeholder.jpg',
    description: 'Entry-level GPS drone perfect for learning flight basics before Part 107 certification.',
    features: [
      'GPS-enabled positioning',
      '25-minute flight time',
      '1080p camera',
      'Return-to-home function',
      'Beginner and advanced flight modes',
      'Extra batteries (2) included',
      'Practice tutorial access'
    ],
    inStock: true
  }
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

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
              <Link href="/login" className="border border-gray-900 px-6 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-black text-white py-16">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="h1 text-white">Drone Equipment & Training Materials</h1>
            <p className="body-large text-white/80">
              Professional-grade equipment and study materials to support your drone operations and certification journey.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-gray-50 border-b border-gray-200 py-6">
        <div className="container-premium">
          <div className="flex flex-wrap gap-3 justify-center">
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
      <section className="section-spacing">
        <div className="container-premium">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="course-card overflow-hidden group">
                {/* Product Image */}
                <div className="relative h-64 bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
                    <svg className="w-24 h-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  {product.inStock && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 text-xs font-semibold rounded-full">
                      In Stock
                    </div>
                  )}
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
                          <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                  <Link
                    href={`/shop/${product.id}`}
                    className="block w-full bg-black text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-6"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Info */}
      <section className="bg-gray-50 py-12">
        <div className="container-premium">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
      <section className="section-spacing bg-black text-white">
        <div className="container-premium text-center">
          <div className="max-w-3xl mx-auto space-y-6">
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
