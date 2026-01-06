const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Try with a simple path first
const dbPath = path.join(process.cwd(), 'data', 'preet_english.db');
console.log(`Attempting to create/connect to database at: ${dbPath}`);

// Ensure directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  console.log(`Creating directory: ${dbDir}`);
  fs.mkdirSync(dbDir, { recursive: true });
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
    const stats = fs.statSync(dbPath);
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
  const testFilePath = path.join(dbDir, 'test-write.txt');
  try {
    fs.writeFileSync(testFilePath, 'test');
    console.log(`Successfully wrote test file to: ${testFilePath}`);
    fs.unlinkSync(testFilePath);
  } catch (err) {
    console.error('Error writing test file:', err.message);
    console.error('This suggests a permissions issue in the directory:', dbDir);
  }
}
