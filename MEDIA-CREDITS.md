# Boston Drone School - Media Assets Guide

This document provides instructions for downloading and implementing free, royalty-free media assets for the Boston Drone School website.

## Directory Structure

```
bds-frontend/public/assets/
├── videos/
│   ├── hero-drone-flight.mp4          (Hero section background)
│   ├── course-training.mp4             (Training section)
│   ├── course-inspection.mp4           (Inspection section)
│   └── course-cinematography.mp4       (Cinematography section)
├── images/
│   ├── commercial-drone-1.jpg
│   ├── commercial-drone-2.jpg
│   ├── commercial-drone-3.jpg
│   ├── aerial-background-1.jpg
│   └── pilot-training.jpg
└── posters/
    ├── hero-poster.jpg
    ├── training-poster.jpg
    ├── inspection-poster.jpg
    └── cinematography-poster.jpg
```

## Required Assets

### 1. Hero Section Video (PRIORITY 1)
**Filename:** `hero-drone-flight.mp4`
**Location:** `bds-frontend/public/assets/videos/`

**Download from Pexels:**
- Go to: https://www.pexels.com/search/videos/drone%20fpv/
- Search terms: "drone flight fpv", "aerial drone pov", "professional drone"
- **Requirements:**
  - Duration: 10-30 seconds (must loop smoothly)
  - Resolution: 1920x1080 minimum (4K preferred)
  - High contrast scenes (dramatic skies, golden hour, silhouettes)
  - Professional operation (not consumer/toy drones)
  - Free to use commercially, no attribution required

**Recommended videos to look for:**
- First-person drone flight through landscapes
- Aerial tracking shots over terrain
- Dramatic drone ascent/descent footage
- Professional cinematic drone work

**Download instructions:**
1. Find video that matches criteria
2. Click "Free Download"
3. Select "Full HD" or "4K" resolution
4. Save as `hero-drone-flight.mp4`
5. Extract first frame as JPG for poster: `hero-poster.jpg`

---

### 2. Course Section Videos (3 videos needed)

#### Video 1: Training/Education
**Filename:** `course-training.mp4`
**Search terms:** "drone pilot training", "aviation education", "professional pilot"
**Duration:** 5-15 seconds
**Source:** Pexels or Pixabay

#### Video 2: Inspection Operations
**Filename:** `course-inspection.mp4`
**Search terms:** "industrial drone", "inspection drone", "commercial drone work"
**Duration:** 5-15 seconds
**Source:** Pexels or Pixabay

#### Video 3: Cinematography
**Filename:** `course-cinematography.mp4`
**Search terms:** "aerial cinematography", "drone filming", "aerial photography"
**Duration:** 5-15 seconds
**Source:** Pexels or Pixabay

**For each video:**
- Resolution: 1920x1080 minimum
- File size: Under 5MB (compress if needed)
- Extract first frame as poster JPG

---

### 3. Homepage Images (5 images)

#### Image 1: Commercial Drone Hero
**Filename:** `commercial-drone-1.jpg`
**Search:** "commercial drone operation"
**Resolution:** 2400px width minimum
**Source:** Pexels or Unsplash
**Download URL:** https://www.pexels.com/search/commercial%20drone/

#### Image 2: Professional Pilot
**Filename:** `pilot-training.jpg`
**Search:** "drone pilot professional"
**Resolution:** 2400px width minimum
**Source:** Pexels or Unsplash

#### Image 3: Aerial Inspection
**Filename:** `commercial-drone-2.jpg`
**Search:** "drone inspection industrial"
**Resolution:** 2400px width minimum
**Source:** Pexels or Unsplash

#### Image 4: Drone Equipment
**Filename:** `commercial-drone-3.jpg`
**Search:** "professional drone equipment"
**Resolution:** 2400px width minimum
**Source:** Pexels or Unsplash

#### Image 5: Aerial Background
**Filename:** `aerial-background-1.jpg`
**Search:** "aerial landscape topography"
**Resolution:** 3000px width minimum
**Source:** Pexels or Unsplash
**Usage:** Subtle background texture

---

## Download Instructions

### Option 1: Manual Download (Recommended)

1. **Visit Pexels:** https://www.pexels.com
2. **Search for each asset** using the search terms provided above
3. **Select highest quality** (4K for videos, Large for images)
4. **Download and rename** according to filenames specified
5. **Place in correct directories** as shown in directory structure
6. **Create poster frames:**
   ```bash
   # Extract first frame from each video as poster
   ffmpeg -i hero-drone-flight.mp4 -vframes 1 -q:v 2 hero-poster.jpg
   ```

### Option 2: Pixabay (Alternative source)

- URL: https://www.pixabay.com
- Same search terms apply
- Select "Videos" or "Photos" filter
- Download highest quality
- License: Free for commercial use, no attribution required

### Option 3: Coverr (Video only)

- URL: https://coverr.co
- Search: "drone", "aerial"
- All videos free for commercial use
- Download HD quality

---

## Asset Optimization

After downloading, optimize assets:

### Video Optimization
```bash
# Compress video to target size (under 10MB for hero)
ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset slow output.mp4

# Create mobile version (720p, more compressed)
ffmpeg -i input.mp4 -vf scale=1280:720 -crf 30 output-mobile.mp4
```

### Image Optimization
```bash
# Resize to 2400px width, maintain aspect ratio
ffmpeg -i input.jpg -vf scale=2400:-1 output.jpg

# Compress with ImageMagick
magick input.jpg -quality 85 output.jpg
```

---

## License Verification

### Pexels License
- ✅ Free for commercial use
- ✅ No attribution required
- ✅ Can modify
- ❌ Cannot sell unmodified on stock sites
- License: https://www.pexels.com/license/

### Pixabay License
- ✅ Free for commercial use
- ✅ No attribution required (appreciated)
- ✅ Can modify
- License: https://pixabay.com/service/license/

### Unsplash License
- ✅ Free for commercial use
- ✅ No attribution required (appreciated)
- ✅ Can modify
- License: https://unsplash.com/license

---

## Quality Checklist

Before finalizing each asset:
- [ ] High resolution (meets minimum requirements)
- [ ] Professional quality (not amateur/consumer)
- [ ] High contrast (works well in black & white)
- [ ] No watermarks
- [ ] No visible people's faces (privacy)
- [ ] Loopable (for videos)
- [ ] Optimized file size
- [ ] Proper filename
- [ ] Correct directory
- [ ] Poster frame extracted (for videos)

---

## Credits & Attribution

While Pexels, Pixabay, and Unsplash don't require attribution, we recommend keeping track:

### Videos Used:
```
hero-drone-flight.mp4
- Source: [Pexels/Pixabay/Coverr]
- Original URL: [insert URL]
- Creator: [creator name]
- License: Free to use

course-training.mp4
- Source: [Pexels/Pixabay/Coverr]
- Original URL: [insert URL]
- Creator: [creator name]
- License: Free to use

course-inspection.mp4
- Source: [Pexels/Pixabay/Coverr]
- Original URL: [insert URL]
- Creator: [creator name]
- License: Free to use

course-cinematography.mp4
- Source: [Pexels/Pixabay/Coverr]
- Original URL: [insert URL]
- Creator: [creator name]
- License: Free to use
```

### Images Used:
```
commercial-drone-1.jpg
- Source: [Pexels/Unsplash/Pixabay]
- Original URL: [insert URL]
- Photographer: [name]
- License: Free to use

[... continue for each image ...]
```

---

## Implementation Status

Once assets are downloaded and placed in directories:
1. Verify all files are in correct locations
2. Check file sizes (hero video under 10MB, others under 5MB)
3. Test in browser (videos autoplay, images load)
4. Confirm black & white filters are applied correctly
5. Update this document with actual URLs and credits

---

## Support

If you have issues downloading or optimizing:
- **Video compression:** Use online tools like https://www.freeconvert.com/video-compressor
- **Image optimization:** Use https://tinypng.com or https://squoosh.app
- **Frame extraction:** Use online tools if ffmpeg isn't available

---

**Last Updated:** 2025-01-07
**Status:** ⏳ Awaiting asset download
