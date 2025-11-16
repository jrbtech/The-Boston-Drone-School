const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Working, publicly embeddable YouTube videos about drones
const videoReplacements = {
  1: 'g8vgZ3C-E-0', // DJI Mini 3 - Beginner Guide
  2: 'TT48HZTHfEs', // Understanding Airspace
  3: 'B30FH-nHczQ', // Drone Weather Basics
  4: 'Y3jNOAdGZ8Q'  // Drone Safety Tips
};

async function updateVideos() {
  const client = await pool.connect();

  try {
    console.log('Updating lesson video URLs...\n');

    for (let lessonId = 1; lessonId <= 4; lessonId++) {
      // Get current content
      const result = await client.query(
        'SELECT content_data FROM course_modules WHERE id = $1',
        [lessonId]
      );

      if (result.rows.length === 0) {
        console.log(`Lesson ${lessonId} not found`);
        continue;
      }

      let contentData = result.rows[0].content_data;

      // If it's a string, parse it
      if (typeof contentData === 'string') {
        contentData = JSON.parse(contentData);
      }

      // Find video section and update URL
      if (contentData && contentData.sections) {
        for (let section of contentData.sections) {
          if (section.type === 'video') {
            const newVideoId = videoReplacements[lessonId];
            section.videoUrl = `https://www.youtube.com/embed/${newVideoId}`;
            console.log(`✓ Lesson ${lessonId}: Updated to video ID ${newVideoId}`);
            break;
          }
        }

        // Update database
        await client.query(
          'UPDATE course_modules SET content_data = $1 WHERE id = $2',
          [JSON.stringify(contentData), lessonId]
        );
      }
    }

    console.log('\n✅ All video URLs updated successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    client.release();
    await pool.end();
  }
}

updateVideos();
