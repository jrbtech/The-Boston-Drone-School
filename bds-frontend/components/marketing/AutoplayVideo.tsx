'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'

interface AutoplayVideoProps {
  src: string
  poster?: string
  title: string
  className?: string
}

export default function AutoplayVideo({ src, poster, title, className = '' }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)

  const handlePlayClick = () => {
    if (!hasLoaded) {
      setHasLoaded(true)
      // Small delay to ensure video element is ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load()
          videoRef.current.play()
          setIsPlaying(true)
        }
      }, 100)
    } else if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <div className={`relative overflow-hidden bg-gray-100 group cursor-pointer ${className}`} onClick={handlePlayClick}>
      {!isPlaying && poster && (
        <div className="absolute inset-0 z-10">
          <Image
            src={poster}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={poster}
        aria-label={title}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {hasLoaded && <source src={src} type="video/mp4" />}
      </video>
    </div>
  )
}
