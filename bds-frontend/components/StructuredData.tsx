export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "The Boston Drone School",
    "alternateName": "Boston Drone School",
    "url": "https://bostondroneschool.org",
    "logo": "https://bostondroneschool.org/images/TBDS GRAPHIC.jpg",
    "description": "Professional FAA Part 107 drone certification training with 98% pass rate. Expert instruction, commercial drone operations, and comprehensive UAS training programs in Boston.",
    "email": "info@thebostondroneschool.org",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Boston",
      "addressRegion": "MA",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://bostondroneschool.org"
    ],
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
    "offers": {
      "@type": "Offer",
      "category": "Educational Services",
      "itemOffered": [
        {
          "@type": "Course",
          "name": "Part 107 Online Webinar",
          "description": "Comprehensive online FAA Part 107 certification course with live webinar support",
          "provider": {
            "@type": "Organization",
            "name": "The Boston Drone School"
          },
          "price": "375",
          "priceCurrency": "USD"
        },
        {
          "@type": "Course",
          "name": "Intensive Bootcamp",
          "description": "Fast-track exam preparation with intensive 2-day training program",
          "provider": {
            "@type": "Organization",
            "name": "The Boston Drone School"
          },
          "price": "675",
          "priceCurrency": "USD"
        },
        {
          "@type": "Course",
          "name": "Premium + Business",
          "description": "For c-suite executives interested in drone training and enterprise integration",
          "provider": {
            "@type": "Organization",
            "name": "The Boston Drone School"
          },
          "price": "1650",
          "priceCurrency": "USD"
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function LocalBusinessStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "The Boston Drone School",
    "image": "https://bostondroneschool.org/images/TBDS GRAPHIC.jpg",
    "@id": "https://bostondroneschool.org",
    "url": "https://bostondroneschool.org",
    "telephone": "",
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
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
