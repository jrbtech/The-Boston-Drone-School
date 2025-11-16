const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkModuleContent() {
  try {
    // Get one of the bigger courses
    const courseResult = await pool.query('SELECT * FROM courses WHERE id = 10 LIMIT 1');
    console.log('📚 COURSE 10 (45 modules):');
    console.log('==========================');
    console.log('Title:', courseResult.rows[0].title);
    console.log('Price: $' + courseResult.rows[0].price);
    console.log('');

    // Get first 5 modules
    const modulesResult = await pool.query(
      `SELECT id, title, description, order_index, duration_minutes
       FROM course_modules
       WHERE course_id = 10
       ORDER BY order_index
       LIMIT 5`
    );

    console.log('First 5 Modules:');
    console.log('================');
    modulesResult.rows.forEach((m, i) => {
      console.log(`${i+1}. ${m.title}`);
      console.log(`   Description: ${m.description?.substring(0, 100) || 'None'}...`);
      console.log(`   Duration: ${m.duration_minutes || 0} minutes`);
      console.log('');
    });

    await pool.end();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkModuleContent();
