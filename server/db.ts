import { drizzle } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import Database from "better-sqlite3";
import postgres from "postgres";
import * as schema from "@shared/schema";
import dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

// Load environment variables
dotenv.config();

// For Vercel serverless, ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  // Default to SQLite in /tmp for Vercel
  if (process.env.VERCEL) {
    process.env.DATABASE_URL = 'file:/tmp/preet_english.db';
  } else {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }
}

const databaseUrl = process.env.DATABASE_URL;

let db: any;

// Check if it's a PostgreSQL URL or SQLite file
if (databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://')) {
  console.log('Connecting to PostgreSQL database...');
  const client = postgres(databaseUrl);
  db = drizzlePg(client, { schema });
} else {
  // SQLite configuration
  let dbPath = databaseUrl.replace(/^file:/, '');
  
  // For Vercel, ensure path is in /tmp
  if (process.env.VERCEL && !dbPath.startsWith('/tmp')) {
    dbPath = path.join('/tmp', path.basename(dbPath));
  }
  
  // Ensure path is absolute and normalized
  if (!path.isAbsolute(dbPath)) {
    dbPath = path.join(process.cwd(), dbPath);
  }

  // Ensure directory exists (for local development)
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  console.log(`Connecting to SQLite database at: ${dbPath}`);
  
  // SQLite options for serverless environment
  const sqlite = new Database(dbPath);
  
  // Enable WAL mode for better concurrency in serverless
  sqlite.pragma('journal_mode = WAL');
  sqlite.pragma('synchronous = NORMAL');
  sqlite.pragma('cache_size = 1000000');
  sqlite.pragma('temp_store = memory');
  
  db = drizzle(sqlite, { schema });
}

export { db };
