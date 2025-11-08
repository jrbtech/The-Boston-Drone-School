'use client'

import { useEffect, useRef, useState } from 'react'

interface AutoplayVideoProps {
  src: string
  poster?: string
  title: string
  className?: string
}

export default function AutoplayVideo({ src, poster, title, className = '' }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    // Intersection Observer for lazy loading and scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (videoRef.current) {
              const playPromise = videoRef.current.play()
              if (playPromise !== undefined) {
                playPromise.catch(error => {
                  console.log('Autoplay prevented:', error)
                })
              }
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  const handleLoadedData = () => {
    setIsLoaded(true)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden zoom-on-hover ${className} ${
        isInView ? 'video-reveal' : ''
      }`}
    >
      {/* Loading shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 shimmer bg-gray-800 z-10" />
      )}

      {/* Glowing border effect */}
      <div className="absolute inset-0 glowing-border rounded-lg pointer-events-none z-20" />

      <video
        ref={videoRef}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        aria-label={title}
        onLoadedData={handleLoadedData}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
    </div>
  )
}
