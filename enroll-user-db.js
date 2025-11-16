// Direct database enrollment script
// Run this on the backend server with: node enroll-user-db.js

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function enrollUser() {
  console.log('🎓 ENROLLING USER IN COURSE (DATABASE DIRECT)\n');
  console.log('='.repeat(60) + '\n');

  try {
    // Get user by email
    console.log('Step 1: Finding user account...');
    const userResult = await pool.query(
      'SELECT id, email, first_name, last_name FROM users WHERE email = $1',
      ['meganragab23@gmail.com']
    );

    if (userResult.rows.length === 0) {
      console.log('❌ User not found. Creating account first...');

      // Create user with bcrypt hash for password: TestPassword123!
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('TestPassword123!', 10);

      const createResult = await pool.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, first_name, last_name`,
        ['meganragab23@gmail.com', hashedPassword, 'Megan', 'Ragab', 'student']
      );

      console.log('✅ User account created');
      console.log(`   User ID: ${createResult.rows[0].id}`);
      var userId = createResult.rows[0].id;
    } else {
      console.log('✅ User found');
      console.log(`   User ID: ${userResult.rows[0].id}`);
      console.log(`   Name: ${userResult.rows[0].first_name} ${userResult.rows[0].last_name}`);
      var userId = userResult.rows[0].id;
    }

    // Check if course exists
    console.log('\nStep 2: Verifying Part 107 course...');
    const courseResult = await pool.query(
      'SELECT id, title, price FROM courses WHERE id = $1',
      ['part-107-complete']
    );

    if (courseResult.rows.length === 0) {
      throw new Error('Part 107 course not found in database');
    }

    console.log('✅ Course found');
    console.log(`   Title: ${courseResult.rows[0].title}`);
    console.log(`   Price: $${courseResult.rows[0].price}`);

    // Check if already enrolled
    console.log('\nStep 3: Checking enrollment status...');
    const enrollmentCheck = await pool.query(
      'SELECT id, status FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, 'part-107-complete']
    );

    if (enrollmentCheck.rows.length > 0) {
      console.log('ℹ️  Already enrolled!');
      console.log(`   Status: ${enrollmentCheck.rows[0].status}`);

      if (enrollmentCheck.rows[0].status === 'cancelled') {
        console.log('\nReactivating enrollment...');
        await pool.query(
          'UPDATE enrollments SET status = $1 WHERE id = $2',
          ['active', enrollmentCheck.rows[0].id]
        );
        console.log('✅ Enrollment reactivated');
      }
    } else {
      console.log('Creating enrollment...');
      const enrollResult = await pool.query(
        `INSERT INTO enrollments (user_id, course_id, status, progress_percentage)
         VALUES ($1, $2, $3, $4)
         RETURNING id, enrollment_date, status`,
        [userId, 'part-107-complete', 'active', 0]
      );

      console.log('✅ Enrolled successfully!');
      console.log(`   Enrollment ID: ${enrollResult.rows[0].id}`);
      console.log(`   Date: ${enrollResult.rows[0].enrollment_date}`);
    }

    console.log('\n' + '='.repeat(60) + '\n');
    console.log('✅ SUCCESS!\n');
    console.log('📧 Email: meganragab23@gmail.com');
    console.log('🔑 Password: TestPassword123!');
    console.log('📚 Course: FAA Part 107 Remote Pilot Certification\n');
    console.log('🌐 Login at:');
    console.log('   Production: https://bds-frontend.onrender.com/login');
    console.log('   Local: http://localhost:3000/login\n');
    console.log('📖 After login, visit:');
    console.log('   /dashboard - View enrolled courses');
    console.log('   /learn/part-107-complete - Start learning\n');

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  } finally {
    await pool.end();
  }
}

enrollUser();
