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

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const databaseUrl = process.env.DATABASE_URL;

let db: any;

// Check if it's a PostgreSQL URL or SQLite file
if (databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://')) {
  console.log('Connecting to PostgreSQL database...');
  const client = postgres(databaseUrl);
  db = drizzlePg(client, { schema });
} else {
  // SQLite configuration (for local development)
  let dbPath = databaseUrl.replace(/^file:/, '');
  // Ensure path is absolute and normalized for Windows
  if (!path.isAbsolute(dbPath)) {
    dbPath = path.join(process.cwd(), dbPath);
  }

  // Ensure directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  console.log(`Connecting to SQLite database at: ${dbPath}`);
  const sqlite = new Database(dbPath);
  db = drizzle(sqlite, { schema });
}

export { db };
