'use client';

import React from 'react';

interface VideoSectionProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  description: string;
  layout?: 'split-left' | 'split-right' | 'full';
  className?: string;
}

/**
 * Video Section Component
 *
 * Implements scroll-reveal animations and black & white video filters.
 * Used for content sections throughout the site.
 */
export default function VideoSection({
  videoSrc,
  posterSrc,
  title,
  description,
  layout = 'full',
  className = ''
}: VideoSectionProps) {

  if (layout === 'split-left' || layout === 'split-right') {
    return (
      <section className={`split-section ${className}`}>
        {layout === 'split-left' && (
          <>
            <div className="video-half">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
                data-pause-offscreen
                aria-label={`Video: ${title}`}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
            <div className="content-half">
              <h2 className="h2">{title}</h2>
              <p className="body-large">{description}</p>
            </div>
          </>
        )}
        {layout === 'split-right' && (
          <>
            <div className="content-half">
              <h2 className="h2">{title}</h2>
              <p className="body-large">{description}</p>
            </div>
            <div className="video-half">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={posterSrc}
                data-pause-offscreen
                aria-label={`Video: ${title}`}
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            </div>
          </>
        )}
      </section>
    );
  }

  return (
    <section className={`video-section reveal-on-scroll ${className}`}>
      <div className="container-premium">
        <div className="mb-8">
          <h2 className="h2">{title}</h2>
          <p className="body-large">{description}</p>
        </div>
        <video
          muted
          loop
          playsInline
          poster={posterSrc}
          data-pause-offscreen
          aria-label={`Video: ${title}`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
