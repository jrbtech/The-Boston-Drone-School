# Images Directory for The Boston Drone School

## Required Images for Part 107 Course

### Hero/Background Images

1. **drone-flight-bg.jpg** (1920x1080px or higher)
   - Used as background for course hero sections
   - Should show professional drone in flight or aerial operations
   - Will be overlaid with gradient (opacity 20%)
   - Recommended: Dramatic sky, professional drone equipment

### Course Thumbnails

2. **part-107-thumbnail.jpg** (1280x720px)
   - Primary thumbnail for FAA Part 107 certification course
   - Should show:
     - FAA-related imagery (certificates, official documents)
     - Professional drone equipment
     - Aerial/aviation theme
   - Will be displayed in course cards and checkout

3. **drone-cert-banner.jpg** (1920x600px)
   - Optional: Wide banner for course listing pages
   - Professional drone pilot or examination scene

### Additional Course Images (Optional)

4. **airspace-diagram.png** (800x600px)
   - Sectional chart or airspace classification diagram
   - Used in course content modules

5. **weather-metar.jpg** (1200x800px)
   - Weather station or METAR display
   - For weather module visuals

6. **drone-preflight.jpg** (1200x800px)
   - Preflight inspection scene
   - For maintenance and safety modules

## Image Specifications

### Technical Requirements:
- **Format**: JPG for photos, PNG for graphics/diagrams
- **Quality**: High resolution, minimum 1920px width for hero images
- **File Size**: Optimize for web (under 500KB per image)
- **Aspect Ratios**:
  - Hero backgrounds: 16:9
  - Course thumbnails: 16:9
  - Content images: 4:3 or 16:9

### Style Guidelines:
- **Professional**: Aviation/drone industry standard imagery
- **Clean**: Minimal distractions, focused subject matter
- **Lighting**: Well-lit, clear visibility
- **Colors**: Neutral tones preferred, avoid overly saturated images
- **Branding**: Match Boston Drone School's sophisticated, professional aesthetic

## Where Images Are Used

### Course Detail Page (`/courses/[id]`)
```typescript
// Hero background
/images/drone-flight-bg.jpg

// Course thumbnail (if set in database)
course.thumbnailUrl
```

### Course Card Components
```typescript
// Course thumbnail
course.thumbnailUrl
```

### Checkout Page
```typescript
// Course thumbnail in order summary
course.thumbnailUrl
```

## How to Add Images

### Option 1: Local Files
1. Place images in this directory (`public/images/`)
2. Reference in code as `/images/filename.jpg`
3. Next.js will serve from public directory

### Option 2: External CDN
1. Upload images to CDN (Cloudinary, S3, etc.)
2. Update course records in database:
   ```sql
   UPDATE courses
   SET thumbnail_url = 'https://your-cdn.com/image.jpg'
   WHERE title = 'FAA Part 107 Remote Pilot Certification';
   ```

### Option 3: Dynamic from Database
```sql
-- Update Part 107 course with images
UPDATE courses
SET
  thumbnail_url = '/images/part-107-thumbnail.jpg',
  video_url = 'https://youtube.com/watch?v=YOUR_VIDEO_ID'
WHERE title = 'FAA Part 107 Remote Pilot Certification';
```

## Free Stock Image Resources

### Aviation/Drone Photography:
- **Unsplash**: https://unsplash.com/s/photos/drone
- **Pexels**: https://www.pexels.com/search/drone/
- **Pixabay**: https://pixabay.com/images/search/drone/

### FAA/Aviation Resources:
- **FAA Media**: https://www.faa.gov/newsroom/media
- **NASA Images**: https://images.nasa.gov/
- **Government Photos**: Often public domain

### Search Terms:
- "drone aerial view"
- "FAA drone"
- "drone pilot certification"
- "unmanned aircraft"
- "aerial photography drone"
- "professional drone operator"
- "sectional chart"
- "aviation weather"

## Fallback Behavior

If images are not found, the site includes fallback behavior:

1. **Hero Background**: Gradient-only background (no image error)
2. **Thumbnails**: Placeholder with "BDS" logo/text
3. **Video Previews**: Play button icon on gradient background

The site is fully functional without images, but images significantly enhance the professional appearance and user experience.

## Example Image Credits

If using stock photos, provide attribution:

```
Photo by [Photographer Name] on [Platform]
```

## Next Steps

1. **Immediate**: Add drone-flight-bg.jpg for hero backgrounds
2. **High Priority**: Add part-107-thumbnail.jpg for course card
3. **Medium Priority**: Add module-specific images for course content
4. **Optional**: Add video previews and intro videos

---

**Note**: All images should be optimized for web performance. Use tools like:
- TinyPNG (https://tinypng.com/)
- Squoosh (https://squoosh.app/)
- ImageOptim (Mac)

Target file sizes:
- Hero images: 200-400KB
- Thumbnails: 100-200KB
- Content images: 50-150KB
