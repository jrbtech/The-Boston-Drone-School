# 📹 Placeholder Videos Setup

## Quick Instructions

Until you add your professional drone videos, the website will try to load videos from these paths. You have two options:

### Option 1: Add Your Videos (Recommended)
Copy your 4 professional drone videos to this folder with these exact names:
- `hero-drone-cinematography.mp4`
- `aerial-cinematography.mp4`
- `commercial-operations.mp4`
- `professional-techniques.mp4`

### Option 2: Use Temporary Placeholders
If you need to test the site before videos are ready, you can:

1. **Download free stock drone footage** from:
   - Pexels: https://www.pexels.com/search/videos/drone/
   - Pixabay: https://pixabay.com/videos/search/drone/
   - Videvo: https://www.videvo.net/free-stock-video-footage/drone/

2. **Rename downloads** to match required filenames above

3. **Compress for web** (optional but recommended):
   ```bash
   # Using FFmpeg
   ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k hero-drone-cinematography.mp4
   ```

## Video Specifications

**Recommended:**
- Resolution: 1920x1080 (Full HD) or 3840x2160 (4K)
- Format: MP4 (H.264 codec)
- Duration: 15-30 seconds for hero, 10-20 seconds for showcases
- File size: Under 5MB each (compressed for web)
- Aspect ratio: 16:9

**Content Ideas:**
- **Hero**: Sweeping aerial shots, smooth cinematic movements
- **Aerial Cinematography**: Complex camera work, professional techniques
- **Commercial Operations**: Real estate, construction, inspection work
- **Professional Techniques**: Advanced maneuvers, technical capabilities

## Poster Images (Optional but Recommended)

Create thumbnail images for faster loading:
- `hero-drone-cinematography.jpg`
- `aerial-cinematography.jpg`
- `commercial-operations.jpg`
- `professional-techniques.jpg`

**How to create:**
1. Extract a frame from your video at an interesting moment
2. Export as JPG
3. Resize to 1920x1080
4. Optimize file size (aim for < 200KB)

## Current Status

✅ Video component is ready: `src/components/marketing/AutoplayVideo.tsx`
✅ Homepage is configured to use these videos
✅ Build tested and working
⏳ **Waiting for your professional drone videos!**

## Testing

Once videos are added, test:
1. Videos autoplay and loop
2. No sound plays (muted by default)
3. Mobile responsive (videos adapt to screen size)
4. Poster images load while video buffers (if added)

## Need Help?

See the main `README.md` in this folder for compression tips and detailed specifications.
