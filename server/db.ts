import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import BetterSqlite3 from "better-sqlite3";
import postgresJs from "postgres";
import * as schema from "../shared/schema";
import { config } from "dotenv";

config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

// Fallback for development if no DATABASE_URL is set
const defaultSqliteUrl = "file:sqlite.db";

let db: any;

if (databaseUrl && databaseUrl.startsWith("postgres")) {
  // PostgreSQL for production (Vercel/Neon/Supabase)
  const client = postgresJs(databaseUrl);
  db = drizzlePostgres(client, { schema });
} else {
  // SQLite for local development
  const dbPath = (databaseUrl || defaultSqliteUrl).replace("file:", "");
  db = drizzleSqlite(new BetterSqlite3(dbPath), { schema });
}

export { db };
