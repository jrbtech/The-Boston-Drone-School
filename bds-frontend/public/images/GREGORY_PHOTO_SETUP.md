# Gregory Blaize Photo Setup

## Download Real Photo from Google

From the Google search results you provided:
https://www.google.com/search?q=gregory+blaize

### Recommended Photo:
Look for Gregory's professional headshot or profile photo from:
- LinkedIn profile
- Professional photography sites
- News articles or interviews
- Boston Drone School official photos

### Steps to Add Photo:

1. **Download the photo** from the Google search results
   - Right-click on a high-quality professional photo
   - Save as: `gregory-blaize.jpg` or `gregory-blaize.png`

2. **Optimize the image:**
   - Size: 400x400px or 800x800px (square works best)
   - Format: JPG or PNG
   - Quality: High resolution but optimized for web (<200KB)
   - Use tools like TinyPNG.com or Squoosh.app

3. **Place the file here:**
   ```
   bds-frontend/public/images/gregory-blaize.jpg
   ```

4. **The code is already set up** to use this photo at:
   - Homepage: `src/app/(site)/page.tsx` line 93

## Current vs New:

**Current (SVG illustration):**
```typescript
<Image
  src="/images/gregory-anthony-blaize-portrait.svg"
  alt="Illustration of Gregory Anthony Blaize"
  width={160}
  height={160}
/>
```

**After adding real photo:**
The image will automatically display the real photo instead of the SVG.

## Recommended Photo Specs:

- **Format**: JPG (smaller file size) or PNG (if transparent background needed)
- **Dimensions**: 800x800px (will scale to 160x160 in display)
- **File size**: <200KB optimized
- **Style**: Professional headshot
- **Background**: Clean, professional (office, studio, or outdoor)
- **Expression**: Confident, approachable professional

## Alternative Sources:

If the specific photo isn't available from Google search, consider:
1. LinkedIn: https://www.linkedin.com/in/gregoryblaize
2. Company website archives
3. Professional photography session
4. Recent conference/speaking engagement photos

## File Naming Convention:

Keep the current naming:
- `gregory-anthony-blaize-portrait.jpg` (to match current reference)
- Or update the code to: `gregory-blaize.jpg`

The current code will work with either format (.jpg, .png, .svg).
