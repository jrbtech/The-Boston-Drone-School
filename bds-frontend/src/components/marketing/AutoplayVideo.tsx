'use client'

import { useEffect, useRef } from 'react'

interface AutoplayVideoProps {
  src: string
  poster?: string
  title: string
  className?: string
}

export default function AutoplayVideo({ src, poster, title, className = '' }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      // Attempt to play video, handling autoplay restrictions
      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented, video will show controls
          console.log('Autoplay prevented:', error)
        })
      }
    }
  }, [])

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
