import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import BetterSqlite3 from "better-sqlite3";
import postgresJs from "postgres";
import * as schema from "../shared/schema";
import { logger } from "./lib/logger";
import env from "./lib/env-validation";

// Retry logic for database connections
async function connectWithRetry<T>(
  connectFn: () => T,
  maxRetries: number = 5,
  delayMs: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return connectFn();
    } catch (error) {
      if (attempt === maxRetries) {
        logger.error(`Failed to connect to database after ${maxRetries} attempts`);
        throw error;
      }
      logger.warn(`Database connection attempt ${attempt} failed, retrying in ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs * attempt));
    }
  }
  throw new Error('Unreachable');
}



const databaseUrl = env.DATABASE_URL;

// Define flexible DB type helper
type DrizzleDB = ReturnType<typeof drizzleSqlite> | ReturnType<typeof drizzlePostgres>;
let db: DrizzleDB;
let postgresClient: ReturnType<typeof postgresJs> | null = null;

if (databaseUrl && databaseUrl.startsWith("postgres")) {
  // PostgreSQL for production (Vercel/Neon/Supabase)
  logger.info('Initializing PostgreSQL connection');

  postgresClient = postgresJs(databaseUrl, {
    max: process.env.NODE_ENV === 'production' ? 100 : 20, // Increased for production
    idle_timeout: 30,
    connect_timeout: 15,
    max_lifetime: 60 * 30, // 30 minutes
    onnotice: () => {}, // Suppress notices
  });

  db = drizzlePostgres(postgresClient, { schema });
  logger.info('PostgreSQL connection established');
} else {
  // SQLite for local development with optimizations
  const dbPath = databaseUrl.replace("file:", "");
  logger.info(`Initializing SQLite database at: ${dbPath}`);

  const sqlite = new BetterSqlite3(dbPath, {
    // Enable verbose mode in development
    verbose: process.env.NODE_ENV === 'development' ? logger.debug : undefined,
  });

  // CRITICAL: Enable WAL mode for better concurrency
  // WAL (Write-Ahead Logging) allows multiple readers + 1 writer simultaneously
  sqlite.pragma('journal_mode = WAL');

  // Optimize SQLite for high-load scenarios
  sqlite.pragma('synchronous = NORMAL'); // Faster writes, still safe
  sqlite.pragma('cache_size = -64000'); // 64MB cache (negative = KB)
  sqlite.pragma('temp_store = MEMORY'); // Use memory for temp tables
  sqlite.pragma('mmap_size = 30000000000'); // 30GB memory-mapped I/O

  // Busy timeout: wait up to 5 seconds instead of failing immediately
  sqlite.pragma('busy_timeout = 5000');

  // Foreign keys enforcement
  sqlite.pragma('foreign_keys = ON');

  // Connection tuning
  sqlite.pragma('page_size = 4096'); // Optimal for most systems

  db = drizzleSqlite(sqlite, { schema });

  logger.info('SQLite optimizations applied:', {
    journal_mode: sqlite.pragma('journal_mode', { simple: true }),
    cache_size: sqlite.pragma('cache_size', { simple: true }),
    busy_timeout: sqlite.pragma('busy_timeout', { simple: true }),
  });
}

// Graceful shutdown handling
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received, closing database connections');
  if (postgresClient) {
    await postgresClient.end();
    logger.info('PostgreSQL connections closed');
  }
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received, closing database connections');
  if (postgresClient) {
    await postgresClient.end();
    logger.info('PostgreSQL connections closed');
  }
  process.exit(0);
});

export { db };
