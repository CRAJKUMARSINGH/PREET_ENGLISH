
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { db } from "../server/db"; // Assumes this works if env is set, or I'll use raw pg/sqlite
import { users, type InsertUser } from "../shared/schema";
import { sql } from "drizzle-orm";

const scryptAsync = promisify(scrypt);


export class TestUserOrchestrator {
  private async hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
  }

  async seedUsers(count: number = 500): Promise<{ success: boolean; created: number; errors: string[] }> {
    console.log(`🚀 Seeding ${count} test users...`);
    const batchSize = 50;
    const batches = Math.ceil(count / batchSize);
    const errors: string[] = [];
    let created = 0;

    // Common password for all test users
    const hashedPassword = await this.hashPassword("TestPass123!");

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
            for (const user of batchUsers) {
                try {
                   await db.insert(users).values(user);
                   created++;
                } catch (e: any) {
                    // Ignore duplicate key errors if we run seed twice
                }
            }
            console.log(`✅ Batch ${i + 1}/${batches} inserted.`);
        } catch (error: any) {
            console.error(`❌ Error in batch ${i + 1}:`, error);
            errors.push(`Batch ${i + 1} error: ${error.message}`);
        }
    }
    console.log("🎉 Seeding complete.");
    return { success: errors.length === 0, created, errors };
  }

  async cleanupTestUsers(): Promise<{ success: boolean; errors: string[] }> {
    console.log("🧹 Cleaning up test users...");
    try {
        await db.delete(users).where(sql`username LIKE 'k6_user_%'`);
        console.log("✨ Cleanup complete.");
        return { success: true, errors: [] };
    } catch (error: any) {
        console.error("❌ Cleanup failed:", error);
        return { success: false, errors: [error.message] };
    }
  }

  async verifyTestUsers(): Promise<{ count: number; sampleUsers: any[] }> {
      const result = await db.select({ count: sql<number>`count(*)` }).from(users).where(sql`username LIKE 'k6_user_%'`);
      const count = Number(result[0]?.count || 0);
      console.log(`📊 Current Test Users: ${count}`);
      
      const samples = await db.query.users.findMany({
          where: sql`username LIKE 'k6_user_%'`,
          limit: 5
      });
      return { count, sampleUsers: samples };
  }
}

async function main() {
  const orchestrator = new TestUserOrchestrator();
  const command = process.argv[2];
  
  if (command === "seed") {
    await orchestrator.cleanupTestUsers(); // Ensure clean slate
    await orchestrator.seedUsers();
  } else if (command === "cleanup") {
    await orchestrator.cleanupTestUsers();
  } else if (command === "verify") {
    await orchestrator.verifyTestUsers();
  } else {
    // If no command provided, and imported, do nothing.
    if (process.argv[1] === import.meta.filename) {
         console.log("Usage: uxt seed | cleanup | verify");
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
