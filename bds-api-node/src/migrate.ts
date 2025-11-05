import { getPool } from './db';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Run all pending database migrations
 * Migrations are executed in order based on filename
 */
async function runMigrations() {
  const pool = getPool();

  try {
    // Create migrations tracking table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get list of executed migrations
    const { rows: executedMigrations } = await pool.query(
      'SELECT filename FROM schema_migrations ORDER BY filename'
    );
    const executedFiles = new Set(executedMigrations.map(row => row.filename));

    // Read migration files
    const migrationsDir = join(__dirname, '../migrations');
    const files = await readdir(migrationsDir);
    const sqlFiles = files.filter(f => f.endsWith('.sql')).sort();

    console.log(`📦 Found ${sqlFiles.length} migration files`);
    console.log(`✅ ${executedFiles.size} already executed`);

    // Execute pending migrations
    let executedCount = 0;
    for (const file of sqlFiles) {
      if (executedFiles.has(file)) {
        console.log(`⏭️  Skipping ${file} (already executed)`);
        continue;
      }

      console.log(`🔄 Running migration: ${file}`);
      const filePath = join(migrationsDir, file);
      const sql = await readFile(filePath, 'utf-8');

      // Execute migration in a transaction
      await pool.query('BEGIN');
      try {
        await pool.query(sql);
        await pool.query(
          'INSERT INTO schema_migrations (filename) VALUES ($1)',
          [file]
        );
        await pool.query('COMMIT');
        console.log(`✅ Completed: ${file}`);
        executedCount++;
      } catch (error) {
        await pool.query('ROLLBACK');
        throw error;
      }
    }

    if (executedCount === 0) {
      console.log('✨ Database is up to date');
    } else {
      console.log(`✨ Successfully executed ${executedCount} migrations`);
    }

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('🎉 Migrations complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migration error:', error);
      process.exit(1);
    });
}

export { runMigrations };
