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
  const [hasLoaded, setHasLoaded] = useState(false)
  const [shouldPlay, setShouldPlay] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setHasLoaded(true)
            // Delay loading to prevent multiple videos loading at once
            setTimeout(() => {
              if (videoElement) {
                videoElement.load()
              }
            }, 300)
          }

          // Only play when actually visible
          if (entry.isIntersecting && hasLoaded) {
            setShouldPlay(true)
            videoElement.play().catch(() => {
              // Silently handle autoplay prevention
            })
          } else if (!entry.isIntersecting && videoElement) {
            // Pause when out of view to save bandwidth
            setShouldPlay(false)
            videoElement.pause()
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(videoElement)
    return () => observer.disconnect()
  }, [hasLoaded])

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={poster}
        aria-label={title}
        preload="none"
      >
        {hasLoaded && <source src={src} type="video/mp4" />}
      </video>
    </div>
  )
}
