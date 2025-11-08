/**
 * Boston Drone School - Premium Motion Design System
 *
 * Handles all scroll-based animations, video interactions, and motion effects
 * for the premium black & white design system.
 */

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURATION
  // ============================================================================

  const config = {
    observerOptions: {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    },
    parallaxMultiplier: 0.3,
    overlayFadeDistance: 600,
    navScrollThreshold: 100
  };

  // ============================================================================
  // INTERSECTION OBSERVER - SCROLL REVEAL
  // ============================================================================

  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          entry.target.classList.add('revealed');

          // Start video playback when in view
          const video = entry.target.querySelector('video');
          if (video && video.paused) {
            video.play().catch(err => {
              console.log('Video autoplay prevented:', err);
            });
          }
        }
      });
    }, config.observerOptions);

    // Observe video sections
    document.querySelectorAll('.video-section').forEach(section => {
      observer.observe(section);
    });

    // Observe reveal-on-scroll elements
    document.querySelectorAll('.reveal-on-scroll').forEach(element => {
      observer.observe(element);
    });

    // Observe course cards
    document.querySelectorAll('.course-card').forEach(card => {
      observer.observe(card);
    });
  }

  // ============================================================================
  // PARALLAX SCROLL EFFECT
  // ============================================================================

  function initParallax() {
    const heroVideo = document.querySelector('.hero-video-container video');
    const heroOverlay = document.querySelector('.semantic-overlay');

    if (!heroVideo && !heroOverlay) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset;

      if (heroVideo) {
        const videoTransform = `translate(-50%, calc(-50% + ${scrolled * config.parallaxMultiplier}px)) scale(1)`;
        heroVideo.style.transform = videoTransform;
      }

      if (heroOverlay) {
        const overlayTransform = `translateY(${scrolled * 0.5}px)`;
        const overlayOpacity = 1 - (scrolled / config.overlayFadeDistance);
        heroOverlay.style.transform = overlayTransform;
        heroOverlay.style.opacity = Math.max(0, overlayOpacity);
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // ============================================================================
  // NAVIGATION SCROLL EFFECT
  // ============================================================================

  function initNavigation() {
    const nav = document.querySelector('.nav-premium');
    if (!nav) return;

    let ticking = false;

    function updateNav() {
      const scrolled = window.pageYOffset;

      if (scrolled > config.navScrollThreshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    });
  }

  // ============================================================================
  // VIDEO LAZY LOADING
  // ============================================================================

  function initLazyVideos() {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          const source = video.querySelector('source[data-src]');

          if (source) {
            source.src = source.dataset.src;
            video.load();

            // Play when loaded
            video.addEventListener('loadeddata', () => {
              video.play().catch(err => {
                console.log('Video autoplay prevented:', err);
              });
            });
          }

          videoObserver.unobserve(video);
        }
      });
    }, config.observerOptions);

    document.querySelectorAll('video[data-lazy]').forEach(video => {
      videoObserver.observe(video);
    });
  }

  // ============================================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          const offsetTop = target.offsetTop - 80; // Account for fixed nav

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ============================================================================
  // VIDEO PLAYER CONTROLS
  // ============================================================================

  function initVideoControls() {
    // Ensure videos are muted for autoplay
    document.querySelectorAll('video[autoplay]').forEach(video => {
      video.muted = true;

      // Attempt to play
      video.play().catch(err => {
        console.log('Video autoplay prevented:', err);

        // If autoplay fails, show a play button overlay
        const container = video.closest('.hero-video-container, .video-section');
        if (container) {
          const playButton = document.createElement('button');
          playButton.className = 'video-play-button';
          playButton.innerHTML = '▶';
          playButton.setAttribute('aria-label', 'Play video');

          playButton.addEventListener('click', () => {
            video.play();
            playButton.remove();
          });

          container.appendChild(playButton);
        }
      });
    });

    // Pause videos when they're out of view (performance optimization)
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;

        if (entry.isIntersecting) {
          if (video.paused && video.hasAttribute('autoplay')) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused && video.hasAttribute('data-pause-offscreen')) {
            video.pause();
          }
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('video').forEach(video => {
      videoObserver.observe(video);
    });
  }

  // ============================================================================
  // KEN BURNS EFFECT (OPTIONAL)
  // ============================================================================

  function initKenBurns() {
    document.querySelectorAll('video.ken-burns').forEach(video => {
      // Ken Burns effect is handled via CSS animation
      // This function can add dynamic controls if needed
    });
  }

  // ============================================================================
  // PERFORMANCE OPTIMIZATION
  // ============================================================================

  function optimizePerformance() {
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduce-motion');

      // Disable parallax
      window.removeEventListener('scroll', initParallax);

      // Reduce animation durations (handled by CSS)
    }

    // Detect mobile and reduce video quality
    if (window.innerWidth < 768) {
      document.querySelectorAll('video source').forEach(source => {
        const mobileSrc = source.dataset.mobileSrc;
        if (mobileSrc) {
          source.src = mobileSrc;
          source.parentElement.load();
        }
      });
    }
  }

  // ============================================================================
  // PROGRESS INDICATOR
  // ============================================================================

  function initProgressIndicator() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      progressBar.style.width = scrolled + '%';
    });
  }

  // ============================================================================
  // STAGGER ANIMATIONS
  // ============================================================================

  function initStaggerAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.fade-in-delayed');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = '1';
              child.style.transform = 'translateY(0)';
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    }, config.observerOptions);

    document.querySelectorAll('.stagger-container').forEach(container => {
      observer.observe(container);
    });
  }

  // ============================================================================
  // CURSOR EFFECTS (OPTIONAL PREMIUM TOUCH)
  // ============================================================================

  function initCursorEffects() {
    // Only on desktop
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Grow cursor on hover over interactive elements
    document.querySelectorAll('a, button, .course-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-grow');
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-grow');
      });
    });
  }

  // ============================================================================
  // VIDEO GRID INTERACTIONS
  // ============================================================================

  function initVideoGrid() {
    document.querySelectorAll('.video-grid-item').forEach(item => {
      const video = item.querySelector('video');

      if (video) {
        item.addEventListener('mouseenter', () => {
          video.play().catch(() => {});
        });

        item.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      }
    });
  }

  // ============================================================================
  // ACCESSIBILITY ENHANCEMENTS
  // ============================================================================

  function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Ensure videos have proper ARIA labels
    document.querySelectorAll('video').forEach(video => {
      if (!video.getAttribute('aria-label')) {
        video.setAttribute('aria-label', 'Background video');
      }
    });

    // Handle focus trap in modals (if any)
    document.querySelectorAll('.modal').forEach(modal => {
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        });
      }
    });
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    console.log('Boston Drone School - Premium Motion System Initialized');

    // Initialize all features
    optimizePerformance();
    initScrollReveal();
    initParallax();
    initNavigation();
    initLazyVideos();
    initSmoothScroll();
    initVideoControls();
    initKenBurns();
    initProgressIndicator();
    initStaggerAnimations();
    initVideoGrid();
    initAccessibility();

    // Optional: Uncomment for custom cursor
    // initCursorEffects();
  }

  // Start initialization
  init();

  // ============================================================================
  // PUBLIC API (if needed)
  // ============================================================================

  window.BDSMotion = {
    refresh: function() {
      initScrollReveal();
    },
    pauseAllVideos: function() {
      document.querySelectorAll('video').forEach(v => v.pause());
    },
    playAllVideos: function() {
      document.querySelectorAll('video').forEach(v => v.play().catch(() => {}));
    }
  };

})();
