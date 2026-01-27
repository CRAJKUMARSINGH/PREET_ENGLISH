
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(process.cwd(), 'preet_english.db');
const db = new Database(dbPath);

console.log('Connected to database at', dbPath);

const tables = [
    'lessons',
    'vocabulary',
    'scenarios',
    'stories',
    'listenings',
    'speaking_topics',
    'conversation_lines'
];

console.log('--- Database Row Counts ---');
for (const table of tables) {
    try {
        const count = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get().count;
        console.log(`${table}: ${count}`);
    } catch (e) {
        console.log(`${table}: Error - ${e.message}`);
    }
}
