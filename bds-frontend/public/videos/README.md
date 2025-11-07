# Drone Video Assets

## Required Videos

Place your professional drone footage in this directory with the following names:

### 1. Hero Video
- **Filename**: `hero-drone-cinematography.mp4`
- **Recommended specs**: 1920x1080 or 3840x2160, H.264 codec
- **Duration**: 15-30 seconds
- **Content**: Cinematic drone flight showcasing professional operations

### 2. Showcase Videos
- **Filename**: `aerial-cinematography.mp4`
  - Advanced aerial cinematography and smooth camera movements

- **Filename**: `commercial-operations.mp4`
  - Real estate, construction, or commercial drone work

- **Filename**: `professional-techniques.mp4`
  - Advanced flight techniques and professional maneuvers

## Optimization Tips

1. **Compress videos** for web delivery (aim for < 5MB per video)
2. Use **H.264 codec** for maximum browser compatibility
3. Create **poster images** (thumbnails) for each video:
   - `hero-drone-cinematography.jpg`
   - `aerial-cinematography.jpg`
   - `commercial-operations.jpg`
   - `professional-techniques.jpg`

## Recommended Tools

- **FFmpeg** for compression:
  ```bash
  ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k output.mp4
  ```

- **HandBrake** for GUI-based compression

## Current Status

Replace YouTube embeds with these self-hosted videos for:
- Faster loading times
- No YouTube branding
- Better user experience
- Professional presentation
