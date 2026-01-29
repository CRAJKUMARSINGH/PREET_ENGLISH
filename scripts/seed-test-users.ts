
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { db } from "../server/db"; // Assumes this works if env is set, or I'll use raw pg/sqlite
import { users, type InsertUser } from "../shared/schema";
import { sql } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function seedUsers(count: number = 500) {
  console.log(`🚀 Seeding ${count} test users...`);
  const batchSize = 50;
  const batches = Math.ceil(count / batchSize);

  // Common password for all test users
  const hashedPassword = await hashPassword("TestPass123!");

  for (let i = 0; i < batches; i++) {
    const batchUsers: InsertUser[] = [];
    for (let j = 0; j < batchSize; j++) {
      const userIndex = i * batchSize + j;
      if (userIndex >= count) break;

      // Prefix with 'k6_user_' for easy identification and cleanup
      batchUsers.push({
        username: `k6_user_${userIndex}`,
        password: hashedPassword,
        isAdmin: false
      });
    }

    try {
      // Check if we are using Postgres or SQLite to handle "ON CONFLICT" differently if needed
      // But usually, we just want to insert. Since we cleanup first, simple insert is fine.
      // Using a loop for safety against different DB driver capabilities in 'db' abstraction
      for (const user of batchUsers) {
        try {
          await db.insert(users).values(user);
        } catch (e) {
          // Ignore duplicate key errors if we run seed twice
          // console.warn(`Skipping duplicate: ${user.username}`);
        }
      }
      console.log(`✅ Batch ${i + 1}/${batches} inserted.`);
    } catch (error) {
      console.error(`❌ Error in batch ${i + 1}:`, error);
    }
  }
  console.log("🎉 Seeding complete.");
}

async function cleanupUsers() {
  console.log("🧹 Cleaning up test users...");
  await db.delete(users).where(sql`username LIKE 'k6_user_%'`);
  console.log("✨ Cleanup complete.");
}

async function main() {
  const command = process.argv[2];
  if (command === "seed") {
    await cleanupUsers(); // Ensure clean slate
    await seedUsers();
  } else if (command === "cleanup") {
    await cleanupUsers();
  } else if (command === "verify") {
    const result = await db.select({ count: sql<number>`count(*)` }).from(users).where(sql`username LIKE 'k6_user_%'`);
    // SQLite returns [{count: 500}], Postgres returns [{count: '500'}]
    console.log(`📊 Current Test Users: ${result[0]?.count || 0}`);
  } else {
    console.log("Usage: uxt seed | cleanup | verify");
  }
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});