import Database from 'better-sqlite3';

// Check the actual database file from .env.local
const dbPath = 'sqlite.db'; // This matches DATABASE_URL="file:sqlite.db"

try {
    console.log(`Opening ${dbPath}...`);
    const db = new Database(dbPath, { fileMustExist: true });
    console.log("✅ Database opened successfully");
    
    console.log("Checking schema...");
    const tables = db.prepare("SELECT name, sql FROM sqlite_master WHERE type='table'").all();
    console.log('📋 Tables found:', tables.map(t => t.name));
    
    // Check if we have any data
    if (tables.length > 0) {
        console.log("✅ Database has tables - schema exists");
        
        // Check for users table specifically
        const usersTable = tables.find(t => t.name === 'users');
        if (usersTable) {
            const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get();
            console.log(`👥 Users in database: ${userCount.count}`);
        }
        
        // Check for lessons table
        const lessonsTable = tables.find(t => t.name === 'lessons');
        if (lessonsTable) {
            const lessonCount = db.prepare("SELECT COUNT(*) as count FROM lessons").get();
            console.log(`📚 Lessons in database: ${lessonCount.count}`);
        }
    } else {
        console.log("⚠️  Database is empty - need to run migrations");
    }
    
    db.close();
    console.log("✅ Database verification complete");
    
} catch (e) {
    console.error('❌ Database error:', e);
    console.log('\n🔧 Suggested fixes:');
    console.log('1. Run: npm run db:push');
    console.log('2. Run: npm run migrate');
    console.log('3. Check DATABASE_URL in .env.local');
}
