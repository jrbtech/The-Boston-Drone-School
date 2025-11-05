#!/usr/bin/env node
/**
 * Database Migration Runner for Boston Drone School
 * Runs all migration files in sequence on deployment
 */

const dotenv = require('dotenv');
const { Pool } = require('pg');
const fs = require('fs').promises;
const path = require('path');

function normalizeBoolean(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  const normalized = String(value).trim().toLowerCase();

  if (['1', 'true', 'yes', 'on'].includes(normalized)) {
    return true;
  }

  if (['0', 'false', 'no', 'off'].includes(normalized)) {
    return false;
  }

  return undefined;
}

function sanitizeConnectionString(value) {
  if (!value) {
    return undefined;
  }

  const trimmed = String(value).trim();
  if (!trimmed) {
    return undefined;
  }

  const withoutPrefix = trimmed
    .replace(/^(?:export\s+)?DATABASE_URL\s*=\s*/i, '')
    .trim();

  const withoutWrappingQuotes = withoutPrefix.replace(/^['"]|['"]$/g, '');

  const compact = withoutWrappingQuotes
    .split(/\r?\n/)
    .map(line => line.trim())
    .join('')
    .replace(/\s+/g, '');

  return compact || undefined;
}

function isRemoteDatabaseHost(connectionString) {
  if (!connectionString) {
    return false;
  }

  try {
    const { hostname } = new URL(connectionString);
    const host = hostname.toLowerCase();

    return (
      host.length > 0 &&
      host !== 'localhost' &&
      host !== '127.0.0.1' &&
      host !== '::1' &&
      !host.endsWith('.local')
    );
  } catch (error) {
    return false;
  }
}

function shouldLoadDotenv() {
  const alwaysLoad = normalizeBoolean(process.env.ALWAYS_LOAD_DOTENV ?? process.env.USE_DOTENV);
  if (alwaysLoad === true) {
    return true;
  }

  const disableLoad = normalizeBoolean(process.env.DISABLE_DOTENV);
  if (disableLoad === true) {
    return false;
  }

  const environment = (process.env.NODE_ENV || '').trim().toLowerCase();
  const runningOnRender = Boolean(
    process.env.RENDER ||
      process.env.RENDER_SERVICE_ID ||
      process.env.RENDER_SERVICE_NAME ||
      process.env.RENDER_EXTERNAL_URL
  );

  const sanitizedDatabaseUrl = sanitizeConnectionString(process.env.DATABASE_URL);
  const hasRemoteDatabase = isRemoteDatabaseHost(sanitizedDatabaseUrl);

  if (runningOnRender || environment === 'production' || hasRemoteDatabase) {
    return false;
  }

  return environment === '' || environment === 'development' || environment === 'test';
}

if (shouldLoadDotenv()) {
  dotenv.config();
}

function getDatabaseUrl() {
  const sanitizedUrl = sanitizeConnectionString(process.env.DATABASE_URL);

  if (!sanitizedUrl) {
    throw new Error('DATABASE_URL environment variable is not set or empty after sanitization.');
  }

  return sanitizedUrl;
}

function shouldUseSsl(connectionString) {
  const explicit = normalizeBoolean(process.env.DATABASE_SSL);
  if (explicit !== undefined) {
    return explicit;
  }

  const environment = (process.env.NODE_ENV || '').trim().toLowerCase();

  if (!connectionString) {
    return environment === 'production';
  }

  const lowered = connectionString.toLowerCase();

  if (lowered.includes('sslmode=require')) {
    return true;
  }

  try {
    const { hostname } = new URL(connectionString);
    const host = hostname.toLowerCase();

    if (
      host &&
      host !== 'localhost' &&
      host !== '127.0.0.1' &&
      host !== '::1' &&
      !host.endsWith('.local')
    ) {
      return true;
    }
  } catch (error) {
    // Ignore URL parsing errors and fall through to environment-based decision.
  }

  return environment === 'production';
}

// Database connection
const databaseUrl = getDatabaseUrl();
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: shouldUseSsl(databaseUrl) ? { rejectUnauthorized: false } : undefined,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  statement_timeout: 30000,
  query_timeout: 30000
});

/**
 * Wait for database to be available with retry logic
 * @param {number} maxRetries - Maximum number of retry attempts
 * @param {number} delayMs - Initial delay in milliseconds
 */
async function waitForDatabase(maxRetries = 10, delayMs = 2000) {
  console.log('🔌 Attempting to connect to database...');

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Try to execute a simple query to test the connection
      await pool.query('SELECT 1');
      console.log('✅ Database connection established!');
      return true;
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;

      if (isLastAttempt) {
        console.error(`❌ Failed to connect after ${maxRetries} attempts`);
        console.error(`Error: ${error.message}`);
        throw error;
      }

      // Calculate exponential backoff delay
      const waitTime = delayMs * Math.pow(1.5, attempt - 1);
      console.log(`⏳ Attempt ${attempt}/${maxRetries} failed. Retrying in ${Math.round(waitTime / 1000)}s...`);
      console.log(`   Error: ${error.message}`);

      // Wait before next retry
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  return false;
}

async function runMigrations() {
  console.log('🚀 Boston Drone School - Running Database Migrations');
  console.log('=====================================================');

  try {
    // Wait for database to be available
    await waitForDatabase();

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