import Database from 'better-sqlite3';
try {
    console.log("Opening preet_english.db...");
    const db = new Database('preet_english.db', { fileMustExist: true });
    console.log("DB opened. Checking schema...");
    const tables = db.prepare("SELECT name, sql FROM sqlite_master WHERE type='table'").all();
    console.log('Tables:', tables.map(t => t.name));
} catch (e) {
    console.error('Error with preet_english.db:', e);
}
