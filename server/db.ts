import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// For SQLite, extract the file path from the URL
const dbPath = process.env.DATABASE_URL.replace('file:', '');
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
