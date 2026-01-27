
import { db } from "../server/db";
import { sql } from "drizzle-orm";

async function createTable() {
    console.log("🔧 Manually creating 'revision_tasks' table...");
    try {
        // Determine database type and use appropriate syntax if needed, 
        // but standard SQL usually works for SQLite/PG for basic tables.
        // Drizzle's `db.run` or `db.execute` depends on the driver.
        // We'll use `sql` tag which is generic.

        await db.run(sql`
      CREATE TABLE IF NOT EXISTS revision_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day_number INTEGER NOT NULL,
        title TEXT NOT NULL,
        task_type TEXT NOT NULL,
        reference_id INTEGER,
        description TEXT,
        is_completed INTEGER DEFAULT 0,
        date_scheduled TEXT
      );
    `);
        console.log("✅ Table 'revision_tasks' created (or already exists).");
    } catch (error) {
        console.error("❌ Failed to create table:", error);
        process.exit(1);
    }
}

createTable();
