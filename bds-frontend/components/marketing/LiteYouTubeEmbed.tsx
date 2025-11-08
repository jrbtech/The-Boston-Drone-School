"use client"

import { useId, useState } from 'react'
import Image from 'next/image'

type LiteYouTubeEmbedProps = {
  youtubeId: string
  title: string
  start?: number
}

export default function LiteYouTubeEmbed({ youtubeId, title, start = 0 }: LiteYouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const instanceId = useId()

  const baseUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  const videoSrc = start ? `${baseUrl}&start=${start}` : baseUrl
  const thumbnailSrc = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`

  if (isPlaying) {
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

  return (
    <button
      type="button"
      aria-label={`Play video: ${title}`}
      onClick={() => setIsPlaying(true)}
      className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
    >
      <Image
        src={thumbnailSrc}
        alt={`${title} thumbnail`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" aria-hidden="true" />
      <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-xl backdrop-blur">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="translate-x-0.5"
          >
            <path d="M8 5.14L17 12L8 18.86V5.14Z" fill="currentColor" />
          </svg>
        </span>
        <span className="px-6 text-sm font-medium uppercase tracking-[0.24em] text-white/90">
          Watch Overview
        </span>
        <span className="max-w-xs px-6 text-center text-xs text-white/70">
          {title}
        </span>
      </span>
    </button>
  )
}
