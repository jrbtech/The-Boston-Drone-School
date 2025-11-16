// Check enrollment data for meganragab23@gmail.com
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
    console.log('📊 Checking enrollment data...\n');

    const result = await pool.query(`
      SELECT
        e.id as enrollment_id,
        e.user_id,
        e.course_id,
        e.status,
        e.progress_percentage,
        e.enrollment_date,
        c.id as course_db_id,
        c.title as course_title,
        c.description,
        c.is_published,
        u.email,
        u.first_name,
        u.last_name
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      LEFT JOIN courses c ON e.course_id = c.id
      WHERE u.email = $1
    `, ['meganragab23@gmail.com']);

    console.log('Enrollment Data:\n');
    console.log(JSON.stringify(result.rows, null, 2));

    if (result.rows.length === 0) {
      console.log('❌ No enrollments found');
    } else {
      result.rows.forEach(row => {
        console.log('\n---');
        console.log(`Enrollment ID: ${row.enrollment_id}`);
        console.log(`User: ${row.first_name} ${row.last_name} (${row.email})`);
        console.log(`Course ID in enrollment: ${row.course_id}`);
        console.log(`Course found in DB: ${row.course_db_id ? 'YES' : 'NO'}`);
        if (row.course_db_id) {
          console.log(`Course Title: ${row.course_title}`);
          console.log(`Published: ${row.is_published}`);
        }
        console.log(`Status: ${row.status}`);
        console.log(`Progress: ${row.progress_percentage}%`);
      });
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

main();
