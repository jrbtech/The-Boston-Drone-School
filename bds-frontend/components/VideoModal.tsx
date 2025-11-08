'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Delay to allow animation
      setTimeout(() => setIsLoaded(true), 50)
    } else {
      document.body.style.overflow = 'unset'
      setIsLoaded(false)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const getEmbedUrl = (url: string) => {
    // YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be')
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }

    // Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }

    return url
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-6xl transform transition-all duration-300 ${
          isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors group"
          aria-label="Close video"
        >
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-gray-400 group-hover:text-white">
              Close
            </span>
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </button>

        {/* Title Bar */}
        <div className="bg-black/50 border border-white/10 rounded-t-lg px-6 py-3">
          <h3 className="text-white font-semibold text-sm uppercase tracking-[0.2em]">
            {title}
          </h3>
        </div>

        {/* Video Container */}
        <div className="relative bg-black border-x border-b border-white/10 rounded-b-lg overflow-hidden">
          <div className="aspect-video">
            {videoUrl.includes('youtube.com') ||
             videoUrl.includes('youtu.be') ||
             videoUrl.includes('vimeo.com') ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                allowFullScreen
                title={title}
              />
            ) : (
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20" />
        </div>

        {/* Progress indicator */}
        <div className="mt-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">
            Press ESC to exit
          </p>
        </div>
      </div>
    </div>
  )
}
