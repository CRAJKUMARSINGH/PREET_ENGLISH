import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });
config({ path: ".env" });

const databaseUrl = process.env.DATABASE_URL || "file:sqlite.db";

if (!databaseUrl) {
  throw new Error("DATABASE_URL not found, ensure the database is provisioned");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: databaseUrl,
  },
});
