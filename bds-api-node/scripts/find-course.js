// Find Part 107 course ID
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  try {
    const result = await pool.query(
      "SELECT id, title, description FROM courses WHERE title LIKE '%107%' LIMIT 10"
    );

    console.log('Part 107 Courses:\n');
    result.rows.forEach(course => {
      console.log(`ID: ${course.id}`);
      console.log(`Title: ${course.title}`);
      console.log('---');
    });

    if (result.rows.length === 0) {
      console.log('No Part 107 courses found. Listing all courses:\n');
      const allCourses = await pool.query("SELECT id, title FROM courses LIMIT 20");
      allCourses.rows.forEach(course => {
        console.log(`ID: ${course.id} - ${course.title}`);
      });
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

main();
