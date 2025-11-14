import Script from 'next/script'

export function OrganizationStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "The Boston Drone School",
    "alternateName": "Boston Drone School",
    "url": "https://thebostondroneschool.org",
    "logo": "https://thebostondroneschool.org/images/tbds-graphic.jpg",
    "description": "Professional FAA Part 107 drone certification training with 98% pass rate. Expert instruction, commercial drone operations, and comprehensive UAS training programs in Boston.",
    "email": "info@thebostondroneschool.org",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Boston",
      "addressRegion": "MA",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@thebostondroneschool.org"
    },
    "sameAs": [
      "https://thebostondroneschool.org"
    ],
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Gregory Anthony Blaize",
      "jobTitle": "Founder & FAA Certified Remote Pilot"
    },
    "memberOf": {
      "@type": "Organization",
      "name": "NASA Mobility Network (m:N) Working Group"
    },
    "areaServed": {
      "@type": "Place",
      "name": "United States"
    },
    "knowsAbout": [
      "FAA Part 107 Certification",
      "Drone Operations",
      "UAS Training",
      "Aerial Photography",
      "Photogrammetry",
      "Commercial Drone Pilot Training"
    ],
    "offers": [
      {
        "@type": "Course",
        "name": "Part 107 Online Webinar",
        "description": "Comprehensive online FAA Part 107 certification course with live webinar support",
        "provider": {
          "@type": "Organization",
          "name": "The Boston Drone School"
        },
        "offers": {
          "@type": "Offer",
          "price": "375",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Course",
        "name": "Intensive Bootcamp",
        "description": "Fast-track exam preparation with intensive 2-day training program",
        "provider": {
          "@type": "Organization",
          "name": "The Boston Drone School"
        },
        "offers": {
          "@type": "Offer",
          "price": "675",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Course",
        "name": "Premium + Business",
        "description": "For c-suite executives interested in drone training and enterprise integration",
        "provider": {
          "@type": "Organization",
          "name": "The Boston Drone School"
        },
        "offers": {
          "@type": "Offer",
          "price": "1650",
          "priceCurrency": "USD"
        }
      }
    ]
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  )
}

export function LocalBusinessStructuredData() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "The Boston Drone School",
    "image": "https://thebostondroneschool.org/images/tbds-graphic.jpg",
    "@id": "https://thebostondroneschool.org",
    "url": "https://thebostondroneschool.org",
    "email": "info@thebostondroneschool.org",
    "priceRange": "$375-$1650",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Boston",
      "addressRegion": "MA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.3601",
      "longitude": "-71.0589"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    },
    "paymentAccepted": "Credit Card, PayPal",
    "currenciesAccepted": "USD"
  }

  return (
    <Script
      id="local-business-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
    />
  )
}
