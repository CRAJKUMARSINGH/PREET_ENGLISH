import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import BetterSqlite3 from "better-sqlite3";
import postgresJs from "postgres";
import * as schema from "../shared/schema.js";
import { config } from "dotenv";
config({ path: '.env.local' });
var databaseUrl = process.env.DATABASE_URL;
// Fallback for development if no DATABASE_URL is set
var defaultSqliteUrl = "file:sqlite.db";
var db;
if (databaseUrl && databaseUrl.startsWith("postgres")) {
    // PostgreSQL for production (Vercel/Neon/Supabase)
    var client = postgresJs(databaseUrl);
    db = drizzlePostgres(client, { schema: schema });
}
else {
    // SQLite for local development
    var dbPath = (databaseUrl || defaultSqliteUrl).replace("file:", "");
    db = drizzleSqlite(new BetterSqlite3(dbPath), { schema: schema });
}
export { db };
