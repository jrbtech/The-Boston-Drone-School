// Simple enrollment script using existing database connection
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function main() {
  console.log('🎓 Enrolling meganragab23@gmail.com in Part 107 course...\n');

  try {
    // Find user
    const userQuery = await pool.query(
      'SELECT id, email, first_name, last_name FROM users WHERE email = $1',
      ['meganragab23@gmail.com']
    );

    if (userQuery.rows.length === 0) {
      console.log('❌ User not found!');
      console.log('\nPlease:');
      console.log('1. Go to https://bds-frontend.onrender.com/register');
      console.log('2. Register with email: meganragab23@gmail.com');
      console.log('3. Then run this script again');
      process.exit(1);
    }

    const userId = userQuery.rows[0].id;
    console.log(`✅ User found: ${userQuery.rows[0].first_name} ${userQuery.rows[0].last_name}`);
    console.log(`   ID: ${userId}\n`);

    // Course ID for "FAA Part 107 Certification Prep"
    const courseId = 1;

    // Check enrollment
    const checkEnrollment = await pool.query(
      'SELECT id, status FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );

    if (checkEnrollment.rows.length > 0) {
      console.log('ℹ️  Already enrolled!');
      console.log(`   Status: ${checkEnrollment.rows[0].status}\n`);

      if (checkEnrollment.rows[0].status !== 'active') {
        await pool.query(
          'UPDATE enrollments SET status = $1 WHERE id = $2',
          ['active', checkEnrollment.rows[0].id]
        );
        console.log('✅ Enrollment reactivated to active status\n');
      }
    } else {
      // Create enrollment
      await pool.query(
        'INSERT INTO enrollments (user_id, course_id, status, progress_percentage) VALUES ($1, $2, $3, $4)',
        [userId, courseId, 'active', 0]
      );
      console.log('✅ Successfully enrolled in Part 107 course!\n');
    }

    console.log('🌐 Login at: https://bds-frontend.onrender.com/login');
    console.log('📖 Then go to: /dashboard or /learn/part-107-complete\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await pool.end();
  }
}

main();
