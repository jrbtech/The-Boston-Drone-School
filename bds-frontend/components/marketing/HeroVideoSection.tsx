'use client';

import React from 'react';

interface HeroVideoSectionProps {
  videoSrc: string;
  posterSrc: string;
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  overlayStyle?: 'center' | 'lower-third' | 'side-panel';
}

/**
 * Premium Hero Video Section Component
 *
 * Full-screen video background with semantic overlay typography.
 * Implements the Boston Drone School black & white design system.
 */
export default function HeroVideoSection({
  videoSrc,
  posterSrc,
  title,
  subtitle,
  ctaText = 'Begin Training',
  ctaLink = '/courses',
  overlayStyle = 'center'
}: HeroVideoSectionProps) {

  const overlayClass = overlayStyle === 'center'
    ? 'semantic-overlay'
    : overlayStyle === 'lower-third'
    ? 'semantic-overlay overlay-lower-third'
    : 'semantic-overlay overlay-side-panel';

  return (
    <section className="hero-video-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        aria-label="Hero background video showcasing professional drone operations"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={overlayClass}>
        <div className="overlay-content">
          <h1>{title}</h1>
          <p>{subtitle}</p>
          {ctaText && ctaLink && (
            <a href={ctaLink} className="cta-button">
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
