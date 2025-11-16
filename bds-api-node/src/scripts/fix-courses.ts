import { getPool } from '../db';

async function fixCourses() {
  const pool = getPool();

  try {
    console.log('Finding duplicate courses...');

    // Find duplicates
    const duplicates = await pool.query(
      `SELECT title, array_agg(id ORDER BY id) as ids, COUNT(*) as count
       FROM courses
       GROUP BY title
       HAVING COUNT(*) > 1`
    );

    if (duplicates.rows.length > 0) {
      console.log('Duplicate courses found:');
      for (const dup of duplicates.rows) {
        console.log(`  ${dup.title}: ${dup.count} copies (IDs: ${dup.ids.join(', ')})`);

        // Keep the first one, delete the rest
        const idsToDelete = dup.ids.slice(1);
        console.log(`  Deleting IDs: ${idsToDelete.join(', ')}`);

        for (const id of idsToDelete) {
          // Delete enrollments first (foreign key constraint)
          await pool.query('DELETE FROM enrollments WHERE course_id = $1', [id]);
          // Delete course modules
          await pool.query('DELETE FROM course_modules WHERE course_id = $1', [id]);
          // Delete the course
          await pool.query('DELETE FROM courses WHERE id = $1', [id]);
        }
        console.log(`  ✅ Kept course ID ${dup.ids[0]}, deleted ${idsToDelete.length} duplicates`);
      }
    } else {
      console.log('No duplicate courses found');
    }

    // Now check course ID 1 (FAA Part 107 Certification Prep) for modules
    console.log('\nChecking course ID 1 modules...');
    const modules = await pool.query(
      'SELECT id, title, order_index FROM course_modules WHERE course_id = 1 ORDER BY order_index'
    );

    console.log(`Found ${modules.rows.length} modules`);

    if (modules.rows.length === 0) {
      console.log('No modules found, adding default modules...');

      const defaultModules = [
        { title: 'Introduction to FAA Part 107', order_index: 1, content_type: 'video', duration_minutes: 15 },
        { title: 'Regulations and Airspace', order_index: 2, content_type: 'video', duration_minutes: 30 },
        { title: 'Weather and Flight Operations', order_index: 3, content_type: 'video', duration_minutes: 25 },
        { title: 'Loading and Performance', order_index: 4, content_type: 'video', duration_minutes: 20 },
        { title: 'Emergency Procedures', order_index: 5, content_type: 'video', duration_minutes: 20 },
        { title: 'Maintenance and Preflight Inspection', order_index: 6, content_type: 'video', duration_minutes: 15 },
        { title: 'Practice Test', order_index: 7, content_type: 'quiz', duration_minutes: 60 },
      ];

      for (const module of defaultModules) {
        await pool.query(
          `INSERT INTO course_modules (course_id, title, description, order_index, content_type, duration_minutes)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [1, module.title, `Module covering ${module.title}`, module.order_index, module.content_type, module.duration_minutes]
        );
        console.log(`  ✅ Added module: ${module.title}`);
      }
    } else {
      console.log('Modules already exist:');
      modules.rows.forEach((m: any) => {
        console.log(`  ${m.order_index}. ${m.title}`);
      });
    }

    // Verify enrollment exists for meganragab23@gmail.com
    console.log('\nVerifying enrollment...');
    const user = await pool.query('SELECT id FROM users WHERE email = $1', ['meganragab23@gmail.com']);

    if (user.rows.length > 0) {
      const userId = user.rows[0].id;
      const enrollment = await pool.query(
        'SELECT * FROM enrollments WHERE user_id = $1 AND course_id = 1',
        [userId]
      );

      if (enrollment.rows.length === 0) {
        console.log('Creating enrollment...');
        await pool.query(
          'INSERT INTO enrollments (user_id, course_id, status) VALUES ($1, $2, $3)',
          [userId, 1, 'active']
        );
        console.log('✅ Enrollment created');
      } else {
        console.log('✅ Enrollment already exists');
      }
    }

    console.log('\n✅ All fixes complete');
    process.exit(0);
  } catch (err: any) {
    console.error('Error:', err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

fixCourses();
