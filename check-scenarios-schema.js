import Database from 'better-sqlite3';

const currentDb = new Database('preet_english.db');

console.log('🔍 CHECKING SCENARIOS TABLE SCHEMA\n');

// Get table schema
const schema = currentDb.prepare("PRAGMA table_info(scenarios)").all();

console.log('SCENARIOS TABLE COLUMNS:');
schema.forEach(col => {
  console.log(`- ${col.name} (${col.type}) ${col.notnull ? 'NOT NULL' : ''} ${col.pk ? 'PRIMARY KEY' : ''}`);
});

// Get sample data
const sample = currentDb.prepare("SELECT * FROM scenarios LIMIT 2").all();
console.log('\nSAMPLE DATA:');
console.log(sample);

currentDb.close();