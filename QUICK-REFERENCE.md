# Premium Design System - Quick Reference

Fast reference for using the Boston Drone School premium black & white design system.

---

## 🎨 CSS Classes Quick Reference

### Typography
```tsx
<h1 className="h1">Large Hero Title</h1>
<h2 className="h2">Section Heading</h2>
<h3 className="h3">Subsection</h3>
<h4 className="h4">Small Heading</h4>
<p className="body">Standard text</p>
<p className="body-large">Large body text</p>
<span className="small-text">Small text</span>
<span className="caption">ALL CAPS LABEL</span>
```

### Black & White Filters
```tsx
<img src="/image.jpg" className="grayscale-image" />
<img src="/image.jpg" className="grayscale-dramatic" />
<img src="/image.jpg" className="grayscale-soft" />
<video src="/video.mp4" className="grayscale-image" />
```

### Buttons
```tsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-tertiary">Tertiary (on dark)</button>
<a href="#" className="cta-button">CTA Button</a>
```

### Cards
```tsx
<div className="course-card">
  <img src="/image.jpg" alt="..." />
  <h3>Title</h3>
  <p>Description</p>
</div>
```

### Layout
```tsx
<div className="container-premium">Content</div>
<section className="section-spacing">Section</section>
```

### Animations
```tsx
<div className="reveal-on-scroll">Fades in on scroll</div>
<div className="fade-in-delayed">Fades in with delay</div>
<div className="video-section">Video section with reveal</div>
```

### Colors (Utility Classes)
```tsx
<div className="bg-white">White background</div>
<div className="bg-black">Black background</div>
<div className="bg-off-white">Off-white background</div>
<p className="text-white">White text</p>
<p className="text-black">Black text</p>
```

---

## 📐 Component Quick Start

### Hero Video Section
```tsx
import HeroVideoSection from '@/components/marketing/HeroVideoSection';

<HeroVideoSection
  videoSrc="/assets/videos/hero-drone-flight.mp4"
  posterSrc="/assets/posters/hero-poster.jpg"
  title="Master Commercial Drone Operations"
  subtitle="Professional FAA Part 107 Certification"
  ctaText="Begin Training"
  ctaLink="/courses"
  overlayStyle="center"  // or "lower-third" or "side-panel"
/>
```

### Video Section
```tsx
import VideoSection from '@/components/marketing/VideoSection';

<VideoSection
  videoSrc="/assets/videos/course-training.mp4"
  posterSrc="/assets/posters/training-poster.jpg"
  title="Professional Training"
  description="Comprehensive FAA Part 107 training"
  layout="split-left"  // or "split-right" or "full"
/>
```

---

## 🎬 Video Implementation

### Basic Video with B&W Filter
```tsx
<video
  autoPlay
  muted
  loop
  playsInline
  className="grayscale-image"
  poster="/poster.jpg">
  <source src="/video.mp4" type="video/mp4" />
</video>
```

### Lazy Loading Video
```tsx
<video data-lazy>
  <source data-src="/video.mp4" type="video/mp4" />
</video>
```

### Auto-Pause When Offscreen
```tsx
<video data-pause-offscreen autoPlay muted loop>
  <source src="/video.mp4" type="video/mp4" />
</video>
```

---

## 🎯 Common Patterns

### Section with Title
```tsx
<section className="section-spacing bg-white">
  <div className="container-premium">
    <div className="reveal-on-scroll text-center">
      <span className="caption text-gray-500">Section Label</span>
      <h2 className="h2 mt-6 mb-8">Section Title</h2>
      <p className="body-large text-gray-700">Description</p>
    </div>
  </div>
</section>
```

### Card Grid
```tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <div
      key={item.id}
      className="course-card p-8 fade-in-delayed"
      style={{ animationDelay: `${index * 100}ms` }}>
      <h3 className="h3 mb-4">{item.title}</h3>
      <p className="body text-gray-700">{item.description}</p>
    </div>
  ))}
</div>
```

### Dark Section
```tsx
<section className="section-spacing bg-black text-white">
  <div className="container-premium">
    <h2 className="h2 text-white">Dark Section Title</h2>
    <p className="body-large text-white/70">Description</p>
    <button className="btn-tertiary">Action</button>
  </div>
</section>
```

### Split Content
```tsx
<section className="split-section">
  <div className="video-half">
    <video autoPlay muted loop playsInline>
      <source src="/video.mp4" type="video/mp4" />
    </video>
  </div>
  <div className="content-half">
    <h2 className="h2">Title</h2>
    <p className="body-large">Description</p>
  </div>
</section>
```

---

## 💡 Quick Tips

### Make Any Image B&W
Just add `grayscale-image` class to any `<img>` or `<Image>`:
```tsx
<Image src="/photo.jpg" className="grayscale-image" />
```

### Make Any Section Fade In
Add `reveal-on-scroll` class:
```tsx
<section className="reveal-on-scroll">
  {/* Content fades in when scrolled into view */}
</section>
```

### Create Stagger Animation
Use `fade-in-delayed` with inline delay:
```tsx
{items.map((item, i) => (
  <div
    className="fade-in-delayed"
    style={{ animationDelay: `${i * 100}ms` }}>
    {item.content}
  </div>
))}
```

### Add Premium Navigation
Add `nav-premium` class to header:
```tsx
<header className="nav-premium">
  <nav>
    <a href="#" className="nav-item">Link</a>
  </nav>
</header>
```

---

## 📱 Responsive Helpers

Design system automatically responds to screen sizes:

- **Mobile** (<768px): Reduced animations, stacked layouts
- **Tablet** (768-1024px): Medium animations, flexible layouts
- **Desktop** (>1024px): Full animations, grid layouts

No additional classes needed - it's automatic!

---

## ⚡ Performance Tips

### Lazy Load Images
```tsx
<img src="/image.jpg" loading="lazy" />
```

### Lazy Load Videos
```tsx
<video data-lazy>
  <source data-src="/video.mp4" type="video/mp4" />
</video>
```

### Responsive Video Sources
```html
<video>
  <source src="mobile.mp4" media="(max-width: 768px)" />
  <source src="desktop.mp4" />
</video>
```

---

## 🎨 Color Variables (CSS)

Use in custom styles:
```css
/* Text colors */
color: var(--pure-black);
color: var(--pure-white);

/* Backgrounds */
background: var(--pure-white);
background: var(--off-white);
background: var(--pure-black);

/* Borders */
border: 1px solid var(--border-subtle);  /* 10% opacity */
border: 1px solid var(--border-visible); /* 20% opacity */

/* Shadows */
box-shadow: var(--shadow-subtle);
box-shadow: var(--shadow-medium);
box-shadow: var(--shadow-strong);
box-shadow: var(--shadow-dramatic);
```

---

## ⏱️ Timing Variables (CSS)

```css
/* Durations */
transition: all var(--duration-micro);     /* 200ms */
transition: all var(--duration-fast);      /* 300ms */
transition: all var(--duration-standard);  /* 500ms */
transition: all var(--duration-slow);      /* 800ms */

/* Easing */
transition: all 500ms var(--ease-primary);   /* Smooth */
transition: all 500ms var(--ease-weighty);   /* Heavy */
transition: all 500ms var(--ease-entrance);  /* Enter */
transition: all 500ms var(--ease-exit);      /* Exit */
```

---

## 📚 Full Documentation

For complete details, see:
- **PREMIUM-DESIGN-IMPLEMENTATION.md** - Full guide (50+ sections)
- **PREMIUM-DESIGN-SUMMARY.md** - Overview
- **IMPLEMENTATION-COMPLETE.md** - Status report

---

## 🚀 Getting Started

1. **Typography:** Use `.h1`, `.h2`, `.body` classes
2. **B&W Images:** Add `.grayscale-image` to any image
3. **Animations:** Add `.reveal-on-scroll` for fade-in
4. **Cards:** Use `.course-card` for hover effects
5. **Buttons:** Use `.btn-primary`, `.btn-secondary`, `.btn-tertiary`

That's it! The system handles the rest automatically.

---

**Need more details?** See PREMIUM-DESIGN-IMPLEMENTATION.md
