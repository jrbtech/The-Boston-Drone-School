"use client"

import { useId, useState, useEffect } from 'react'
import Image from 'next/image'

type AutoplayYouTubeEmbedProps = {
  youtubeId: string
  title: string
  start?: number
  autoplay?: boolean
  muted?: boolean
}

export default function AutoplayYouTubeEmbed({ 
  youtubeId, 
  title, 
  start = 0, 
  autoplay = true, 
  muted = true 
}: AutoplayYouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const instanceId = useId()

  useEffect(() => {
    // Delay loading to improve page performance
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const baseParams = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: muted ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    loop: '1',
    controls: '0',
    showinfo: '0',
    iv_load_policy: '3',
    playlist: youtubeId, // Required for loop to work
  })

  if (start) {
    baseParams.set('start', start.toString())
  }

  const videoSrc = `https://www.youtube.com/embed/${youtubeId}?${baseParams.toString()}`
  const thumbnailSrc = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

  if (!isLoaded) {
    // Show thumbnail while loading
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-lg">
        <Image
          src={thumbnailSrc}
          alt={`${title} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-xl backdrop-blur">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="translate-x-0.5 animate-pulse"
            >
              <path d="M8 5.14L17 12L8 18.86V5.14Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
      <iframe
        id={instanceId}
        src={videoSrc}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        className="h-full w-full"
      />
    </div>
  )
}