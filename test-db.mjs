import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, statSync, writeFileSync, unlinkSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try with a simple path first
const dbPath = join(process.cwd(), 'data', 'preet_english.db');
console.log(`Attempting to create/connect to database at: ${dbPath}`);

// Ensure directory exists
const dbDir = dirname(dbPath);
if (!existsSync(dbDir)) {
  console.log(`Creating directory: ${dbDir}`);
  mkdirSync(dbDir, { recursive: true });
}

try {
  // Try to create/connect to the database
  const db = new Database(dbPath);
  console.log('Successfully connected to the database!');
  
  // Test a simple query
  const version = db.prepare('SELECT sqlite_version() as version').get();
  console.log('SQLite version:', version);
  
  // Close the connection
  db.close();
  console.log('Database connection closed successfully.');
  
  // Check file permissions
  try {
    const stats = statSync(dbPath);
    console.log('Database file stats:', {
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      mode: stats.mode.toString(8)
    });
  } catch (err) {
    console.error('Error getting file stats:', err.message);
  }
  
} catch (error) {
  console.error('Error connecting to the database:', error.message);
  
  // Try to create a test file in the same directory
  const testFilePath = join(dbDir, 'test-write.txt');
  try {
    writeFileSync(testFilePath, 'test');
    console.log(`Successfully wrote test file to: ${testFilePath}`);
    unlinkSync(testFilePath);
  } catch (err) {
    console.error('Error writing test file:', err.message);
    console.error('This suggests a permissions issue in the directory:', dbDir);
  }
}
