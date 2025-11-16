import bcrypt from 'bcrypt';
import { getPool } from '../db';

async function fixUser() {
  const pool = getPool();

  try {
    console.log('Checking for user meganragab23@gmail.com...');

    // Check if user exists
    const userCheck = await pool.query(
      'SELECT id, email, first_name, last_name, role FROM users WHERE email = $1',
      ['meganragab23@gmail.com']
    );

    let userId: number;

    if (userCheck.rows.length === 0) {
      console.log('User not found, creating new user...');
      const hashedPassword = await bcrypt.hash('Megan1234!', 10);
      const result = await pool.query(
        'INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, role',
        ['meganragab23@gmail.com', hashedPassword, 'Megan', 'Ragab', 'student']
      );
      console.log('User created:', result.rows[0]);
      userId = result.rows[0].id;
    } else {
      console.log('User exists:', userCheck.rows[0]);
      userId = userCheck.rows[0].id;

      // Update password
      const hashedPassword = await bcrypt.hash('Megan1234!', 10);
      await pool.query(
        'UPDATE users SET password_hash = $1, first_name = $2, last_name = $3 WHERE email = $4',
        [hashedPassword, 'Megan', 'Ragab', 'meganragab23@gmail.com']
      );
      console.log('Password and names updated successfully');
    }

    // Check enrollments
    const enrollments = await pool.query(
      'SELECT * FROM enrollments WHERE user_id = $1',
      [userId]
    );
    console.log('\nEnrollments:', enrollments.rows);

    // Check all courses
    const courses = await pool.query(
      'SELECT id, title FROM courses ORDER BY title'
    );
    console.log('\nAll courses:');
    courses.rows.forEach((c: any) => console.log(`  ${c.id}: ${c.title}`));

    // Check for duplicates
    const duplicates = await pool.query(
      `SELECT title, array_agg(id) as ids, COUNT(*) as count
       FROM courses
       GROUP BY title
       HAVING COUNT(*) > 1`
    );
    console.log('\nDuplicate courses:');
    if (duplicates.rows.length > 0) {
      duplicates.rows.forEach((d: any) => {
        console.log(`  ${d.title}: ${d.count} copies (IDs: ${d.ids.join(', ')})`);
      });
    } else {
      console.log('  No duplicates found');
    }

    // If user has enrollments, check lessons
    if (enrollments.rows.length > 0) {
      for (const enrollment of enrollments.rows) {
        const course = await pool.query(
          'SELECT title FROM courses WHERE id = $1',
          [enrollment.course_id]
        );
        const modules = await pool.query(
          'SELECT id, title, order_index FROM course_modules WHERE course_id = $1 ORDER BY order_index',
          [enrollment.course_id]
        );
        console.log(`\nCourse ${enrollment.course_id} (${course.rows[0]?.title}):`);
        console.log(`  Modules: ${modules.rows.length}`);
        modules.rows.forEach((module: any) => {
          console.log(`    ${module.order_index}. ${module.title}`);
        });
      }
    } else {
      console.log('\nNo enrollments found. Looking for Part 107 course...');
      const part107 = await pool.query(
        "SELECT id, title FROM courses WHERE title LIKE '%Part 107%' OR title LIKE '%FAA%' LIMIT 1"
      );

      if (part107.rows.length > 0) {
        console.log(`Found course: ${part107.rows[0].title} (ID: ${part107.rows[0].id})`);
        console.log('Creating enrollment...');

        await pool.query(
          'INSERT INTO enrollments (user_id, course_id, status) VALUES ($1, $2, $3) ON CONFLICT (user_id, course_id) DO NOTHING',
          [userId, part107.rows[0].id, 'active']
        );

        console.log('Enrollment created successfully');

        // Check modules
        const modules = await pool.query(
          'SELECT id, title, order_index FROM course_modules WHERE course_id = $1 ORDER BY order_index',
          [part107.rows[0].id]
        );
        console.log(`\nModules for ${part107.rows[0].title}: ${modules.rows.length}`);
        modules.rows.forEach((module: any) => {
          console.log(`  ${module.order_index}. ${module.title}`);
        });
      }
    }

    console.log('\n✅ User fix complete');
    process.exit(0);
  } catch (err: any) {
    console.error('Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

fixUser();
