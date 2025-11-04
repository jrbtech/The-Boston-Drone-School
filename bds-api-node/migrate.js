#!/usr/bin/env node
/**
 * Database Migration Runner for Boston Drone School
 * Runs all migration files in sequence on deployment
 */

const { Pool } = require('pg');
const fs = require('fs').promises;
const path = require('path');

function getDatabaseUrl() {
  const rawUrl = process.env.DATABASE_URL;

  if (!rawUrl) {
    throw new Error('DATABASE_URL environment variable is not set.');
  }

  const sanitized = rawUrl.trim().replace(/\s*\r?\n\s*/g, '');

  if (!sanitized) {
    throw new Error('DATABASE_URL is empty after trimming.');
  }

  return sanitized;
}

// Database connection
const pool = new Pool({
  connectionString: getDatabaseUrl(),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function runMigrations() {
  console.log('🚀 Boston Drone School - Running Database Migrations');
  console.log('=====================================================');

  try {
    // Create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Get list of migration files
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = await fs.readdir(migrationsDir);
    const migrationFiles = files
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`Found ${migrationFiles.length} migration files`);

    // Get already executed migrations
    const { rows: executedMigrations } = await pool.query(
      'SELECT filename FROM migrations ORDER BY id'
    );
    const executedFiles = executedMigrations.map(row => row.filename);

    // Run pending migrations
    for (const file of migrationFiles) {
      if (executedFiles.includes(file)) {
        console.log(`⏭️  Skipping ${file} (already executed)`);
        continue;
      }

      console.log(`🔄 Executing ${file}...`);
      
      try {
        // Read migration file
        const filePath = path.join(migrationsDir, file);
        const sql = await fs.readFile(filePath, 'utf8');
        
        // Execute migration in a transaction
        await pool.query('BEGIN');
        
        // Run the migration SQL
        await pool.query(sql);
        
        // Record the migration as executed
        await pool.query(
          'INSERT INTO migrations (filename) VALUES ($1)',
          [file]
        );
        
        await pool.query('COMMIT');
        console.log(`✅ Successfully executed ${file}`);
        
      } catch (error) {
        await pool.query('ROLLBACK');
        console.error(`❌ Error executing ${file}:`, error.message);
        throw error;
      }
    }

    console.log('\n🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('\n💥 Migration failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n⏹️  Migration interrupted');
  await pool.end();
  process.exit(0);
});

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };