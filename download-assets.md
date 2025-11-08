# Quick Asset Download Guide

This guide will help you quickly download the free media assets needed for the Boston Drone School premium black & white design system.

## Step-by-Step Instructions

### 1. Hero Video (PRIORITY 1)

**Go to:** https://www.pexels.com/search/videos/drone%20fpv/

**What to look for:**
- Professional FPV drone flight footage
- Dramatic aerial perspectives
- High contrast scenes (best for black & white)
- Duration: 10-30 seconds
- Resolution: 1080p or 4K

**Recommended search results:**
1. Search "drone fpv flight"
2. Filter by "Popular" or "Most Downloaded"
3. Look for videos with dramatic lighting

**Download steps:**
1. Click on a video you like
2. Click "Free Download"
3. Select "Full HD (1920x1080)" or "4K"
4. Save as: `bds-frontend/public/assets/videos/hero-drone-flight.mp4`
5. Take a screenshot of the first frame and save as: `bds-frontend/public/assets/posters/hero-poster.jpg`

**Specific video recommendations to try:**
- Video ID: 2792106 (Drone FPV through trees)
- Video ID: 4088015 (Aerial mountain flight)
- Video ID: 5533369 (Cinematic drone footage)

---

### 2. Course Section Videos (3 videos)

**Go to:** https://www.pexels.com/search/videos/

#### Video 1: Training
**Search:** "drone pilot" or "aviation training"
**Save as:** `bds-frontend/public/assets/videos/course-training.mp4`
**Poster:** `bds-frontend/public/assets/posters/training-poster.jpg`

#### Video 2: Inspection
**Search:** "industrial drone" or "drone inspection"
**Save as:** `bds-frontend/public/assets/videos/course-inspection.mp4`
**Poster:** `bds-frontend/public/assets/posters/inspection-poster.jpg`

#### Video 3: Cinematography
**Search:** "aerial cinematography" or "drone filming"
**Save as:** `bds-frontend/public/assets/videos/course-cinematography.mp4`
**Poster:** `bds-frontend/public/assets/posters/cinematography-poster.jpg`

---

### 3. Homepage Images (5 images)

**Go to:** https://www.pexels.com/search/ or https://unsplash.com/s/photos/

#### Image 1: Commercial Drone
**Search:** "commercial drone"
**Resolution:** Download "Large" or "Original"
**Save as:** `bds-frontend/public/assets/images/commercial-drone-1.jpg`

#### Image 2: Professional Pilot
**Search:** "drone pilot professional"
**Save as:** `bds-frontend/public/assets/images/pilot-training.jpg`

#### Image 3: Drone Inspection
**Search:** "drone inspection"
**Save as:** `bds-frontend/public/assets/images/commercial-drone-2.jpg`

#### Image 4: Drone Equipment
**Search:** "professional drone equipment"
**Save as:** `bds-frontend/public/assets/images/commercial-drone-3.jpg`

#### Image 5: Aerial Background
**Search:** "aerial landscape" or "topography"
**Save as:** `bds-frontend/public/assets/images/aerial-background-1.jpg`

---

## Alternative Free Sources

If Pexels doesn't have what you need:

### Pixabay
- URL: https://pixabay.com
- Select "Videos" or "Photos" tab
- Use same search terms
- Download highest quality
- 100% free for commercial use

### Unsplash (Images only)
- URL: https://unsplash.com
- Search for drone, aerial, commercial drone
- Download full resolution
- Free for commercial use

### Coverr (Videos only)
- URL: https://coverr.co
- Search "drone" or "aerial"
- All videos free for commercial use
- Download HD quality

---

## Quick Checklist

After downloading, verify:

- [ ] Hero video is in `/public/assets/videos/hero-drone-flight.mp4`
- [ ] Hero poster is in `/public/assets/posters/hero-poster.jpg`
- [ ] 3 course videos are downloaded
- [ ] 3 course posters are created
- [ ] 5 homepage images are downloaded
- [ ] All files are in correct directories
- [ ] Video files are under 10MB (hero) or 5MB (others)
- [ ] Images are at least 2000px wide

---

## File Size Optimization

If files are too large, use these free online tools:

**For Videos:**
- https://www.freeconvert.com/video-compressor
- Target: Under 10MB for hero, under 5MB for others

**For Images:**
- https://tinypng.com
- https://squoosh.app
- Target: Under 500KB per image

---

## Creating Poster Frames

If you need to extract a poster frame from a video:

**Option 1: Online Tool**
- https://www.kapwing.com/tools/make-image-from-video
- Upload video, capture first frame, download

**Option 2: VLC Media Player**
- Open video in VLC
- Pause at desired frame
- Video > Take Snapshot
- Save to posters directory

**Option 3: Screenshot**
- Play video
- Pause immediately
- Take screenshot
- Crop and save

---

## Update MEDIA-CREDITS.md

After downloading, update the `MEDIA-CREDITS.md` file with:
- Original URL of each asset
- Creator/photographer name
- Source (Pexels, Pixabay, Unsplash)

Example:
```
hero-drone-flight.mp4
- Source: Pexels
- Original URL: https://www.pexels.com/video/2792106/
- Creator: John Doe
- License: Free to use
```

---

## Testing After Download

1. Start the development server: `npm run dev`
2. Navigate to homepage
3. Verify videos play automatically
4. Check that black & white filters are applied
5. Test on mobile (videos should still load)
6. Ensure posters display before video loads

---

## Need Help?

- Can't find the right video? Try different search terms: "fpv drone", "aerial flight", "drone pov"
- Videos won't download? Try a different browser or source (Pixabay, Coverr)
- Files too large? Use the compression tools listed above
- Having technical issues? Check the browser console for errors

---

**Estimated time to complete:** 30-45 minutes

**Priority order:**
1. Hero video (most important for first impression)
2. Course videos (for functionality)
3. Images (for content richness)
