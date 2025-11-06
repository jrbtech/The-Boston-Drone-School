# Drone Video Resources - Professional UAS Content

## Recommended Drone Videos for The Boston Drone School

### Course Preview Videos

#### 1. FAA Part 107 Course Preview
**Recommended Videos:**
- "FAA Part 107 Drone License - Complete Guide" - https://www.youtube.com/watch?v=VIDEO_ID
- "Professional Drone Pilot Training Overview" - https://www.youtube.com/watch?v=VIDEO_ID
- "Commercial Drone Operations Tutorial" - https://www.youtube.com/watch?v=VIDEO_ID

#### 2. Drone Operations Showcase
**Recommended Videos:**
- "Professional Aerial Photography Workflow" - https://www.youtube.com/watch?v=VIDEO_ID
- "Commercial Drone Mapping & Surveying" - https://www.youtube.com/watch?v=VIDEO_ID
- "Construction Site Drone Progress Documentation" - https://www.youtube.com/watch?v=VIDEO_ID

#### 3. Real Estate Drone Work
**Recommended Videos:**
- "Professional Real Estate Drone Tour" - https://www.youtube.com/watch?v=VIDEO_ID
- "Luxury Property Aerial Cinematography" - https://www.youtube.com/watch?v=VIDEO_ID
- "Commercial Property Drone Marketing" - https://www.youtube.com/watch?v=VIDEO_ID

### Where to Find Professional Drone Videos

#### YouTube Channels:
1. **DJI Official** - https://www.youtube.com/@DJI
   - Professional drone demonstrations
   - Industry use cases
   - Technical tutorials

2. **Original Aerial Photography** - https://www.youtube.com/@OriginalDobo
   - Real estate drone work
   - Professional techniques
   - Client deliverables

3. **Pilot Institute** - https://www.youtube.com/@PilotInstitute
   - FAA Part 107 training
   - Drone regulations
   - Professional tips

4. **DroneU** - https://www.youtube.com/@TheUniversityOfDrones
   - Commercial drone operations
   - Business of drones
   - Advanced techniques

5. **Phil Torres (Conservation Drones)** - https://www.youtube.com/@PhilTorres
   - Professional UAS applications
   - Scientific drone use
   - Conservation work

### Video Categories to Avoid

❌ **Avoid:**
- Recreational/hobby flying videos
- Drone racing content
- Consumer product reviews
- FPV freestyle flying
- Non-professional content
- Videos without proper licensing shown

✅ **Use:**
- FAA Part 107 certified operations
- Commercial drone services
- Professional training content
- Industrial applications
- Infrastructure inspection
- Real estate marketing
- Construction documentation
- Aerial mapping/surveying

### Recommended Search Terms

**YouTube Search Queries:**
- "commercial drone operations"
- "FAA Part 107 training"
- "professional aerial photography"
- "drone mapping surveying"
- "construction drone documentation"
- "real estate drone video"
- "infrastructure inspection drone"
- "professional UAS operations"

### How to Add Videos to the Platform

#### 1. Update Course Records:
```sql
-- Add video to Part 107 course
UPDATE courses
SET video_url = 'https://www.youtube.com/watch?v=VIDEO_ID'
WHERE title = 'FAA Part 107 Remote Pilot Certification';

-- Add thumbnail
UPDATE courses
SET thumbnail_url = '/images/part-107-thumbnail.jpg'
WHERE title = 'FAA Part 107 Remote Pilot Certification';
```

#### 2. Add to Specific Lessons:
```sql
-- Add video to specific module
UPDATE course_modules
SET content_url = 'https://www.youtube.com/watch?v=VIDEO_ID'
WHERE title = 'Module 1: Introduction to Part 107 and Small UAS Operations';
```

#### 3. Embed in Homepage (Future Enhancement):
```tsx
// Add hero video section
<VideoModal
  isOpen={showVideo}
  onClose={() => setShowVideo(false)}
  videoUrl="https://www.youtube.com/watch?v=PROFESSIONAL_DRONE_VIDEO"
  title="Boston Drone School Operations Overview"
/>
```

### Video Quality Standards

**Minimum Requirements:**
- ✅ 1080p HD resolution or higher
- ✅ Professional cinematography
- ✅ Clear audio narration
- ✅ Demonstrates FAA compliance
- ✅ Shows professional operations
- ✅ Relevant to course content

**Ideal Specifications:**
- 4K resolution
- Professional color grading
- Licensed music
- Expert narration
- Real-world client projects
- Before/after deliverables

### Example Video Implementations

#### Homepage Hero Video:
```
Title: "The Boston Drone School - Professional UAS Solutions"
Content: Company overview, team at work, client testimonials
Duration: 1-2 minutes
URL: https://vimeo.com/YOUR_VIDEO_ID or https://youtube.com/watch?v=YOUR_ID
```

#### Part 107 Course Preview:
```
Title: "FAA Part 107 Certification - Complete Training Program"
Content: Course walkthrough, instructor intro, sample lessons
Duration: 2-3 minutes
URL: https://youtube.com/watch?v=YOUR_PART_107_VIDEO
```

#### Real Estate Operations Showcase:
```
Title: "Professional Aerial Real Estate Photography"
Content: Property flyovers, client deliverables, workflow demo
Duration: 1-2 minutes
URL: https://youtube.com/watch?v=REAL_ESTATE_DEMO
```

### Copyright & Licensing

**Important:**
- Only use videos you have rights to display
- Get permission for client work
- Use Creative Commons licensed content
- Create original content when possible
- Credit videographers appropriately

**Sources for Licensable Content:**
1. **Your own drone footage** - Best option
2. **Stock footage sites:**
   - Pexels Videos (free)
   - Videvo (free & paid)
   - Artgrid (subscription)
   - Storyblocks (subscription)
3. **YouTube Creative Commons** - Filter by license
4. **Client permission** - Get written authorization

### Current Video Setup

**Already Configured:**
- ✅ Video modal component (VideoModal.tsx)
- ✅ YouTube and Vimeo embed support
- ✅ Course detail page video preview
- ✅ Learn page video player
- ✅ Responsive video display

**Ready to Add:**
1. Get professional drone video URL
2. Update database with video_url
3. Video automatically displays in modal

### Testing Videos

Before deploying, test:
- [ ] Video plays in modal
- [ ] YouTube embed works
- [ ] Vimeo embed works
- [ ] Responsive on mobile
- [ ] Audio quality clear
- [ ] Professional appearance
- [ ] Relevant to course/service

### Quick Implementation

**Fastest Way to Add Videos:**

1. **Find video on YouTube**
   ```
   Search: "professional drone operations FAA Part 107"
   Filter: Creative Commons (if needed)
   Copy URL
   ```

2. **Add to database**
   ```sql
   UPDATE courses
   SET video_url = 'https://youtube.com/watch?v=COPIED_URL'
   WHERE id = [your_course_id];
   ```

3. **Test**
   ```
   Visit /courses/[id]
   Click play button
   Video should open in modal
   ```

---

## Sample Professional Drone Videos (Placeholder URLs)

Replace these with actual videos:

```sql
-- Part 107 Training
UPDATE courses SET video_url = 'https://www.youtube.com/watch?v=PROFESSIONAL_TRAINING_VIDEO' WHERE title LIKE '%Part 107%';

-- Real Estate
UPDATE courses SET video_url = 'https://www.youtube.com/watch?v=REAL_ESTATE_DRONE_VIDEO' WHERE category = 'Real Estate';

-- Construction
UPDATE courses SET video_url = 'https://www.youtube.com/watch?v=CONSTRUCTION_DRONE_VIDEO' WHERE category = 'Construction';

-- Photogrammetry
UPDATE courses SET video_url = 'https://www.youtube.com/watch?v=MAPPING_SURVEY_VIDEO' WHERE category LIKE '%Photogrammetry%';
```

---

**All videos should showcase professional, FAA-compliant drone operations relevant to The Boston Drone School's services and courses.**
