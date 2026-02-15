
import { db } from "../server/db";
import { users, lessons, progress, userStats } from "../shared/schema";
import { eq, like } from "drizzle-orm";
import pLimit from "p-limit";
import { clearCache } from "../server/lib/cache";

async function simulateBigulAdvanced() {
    console.log("🤖 STARTING: Bigul Advanced Simulation (15000 Users, 99% Content, Cache Clearing)");

    // Start cache clearer in parallel
    const cacheInterval = setInterval(() => {
        console.log("\n🧹 CLEARING CACHE (Simultaneous Action)...");
        clearCache.all();
    }, 2000); // Clear every 2 seconds

    // 1. Fetch Users
    const testUsers = await db.select().from(users).where(like(users.username, "bigul_advanced_%"));
    if (testUsers.length === 0) {
        clearInterval(cacheInterval);
        console.error("❌ No 'bigul_advanced_*' users found. Run 'create-massive-users.ts' first.");
        process.exit(1);
    }
    console.log(`✅ Found ${testUsers.length} Bigul Advanced users.`);

    // 2. Fetch Content Metadata
    const allLessons = await db.select({ id: lessons.id }).from(lessons);
    const targetCount = Math.ceil(allLessons.length * 0.99);
    console.log(`🎯 Target: ${targetCount} lessons per user.`);

    const concurrency = 300; // VERY High concurrency
    const limit = pLimit(concurrency);
    let completed = 0;

    // Process in batches of 1000 users to not blow up memory with 15k promises
    const BATCH_SIZE = 1000;

    for (let i = 0; i < testUsers.length; i += BATCH_SIZE) {
        const userBatch = testUsers.slice(i, i + BATCH_SIZE);
        console.log(`\n🚀 Processing User Batch ${i / BATCH_SIZE + 1}...`);

        const tasks = userBatch.map(user => limit(async () => {
            try {
                const userLessons = allLessons.slice(0, targetCount);

                // Bulk insert progress
                const chunkSize = 100;
                for (let k = 0; k < userLessons.length; k += chunkSize) {
                    const chunk = userLessons.slice(k, k + chunkSize);
                    const values = chunk.map(l => ({
                        userId: user.id,
                        lessonId: l.id,
                        completed: true,
                        completedAt: new Date().toISOString()
                    }));
                    await db.insert(progress).values(values).onConflictDoNothing();
                }

                // Update stats
                await db.update(userStats).set({
                    totalLessonsCompleted: targetCount,
                    xpPoints: targetCount * 10,
                    lastActiveDate: new Date().toISOString()
                }).where(eq(userStats.userId, user.id));

                completed++;
                if (completed % 1000 === 0) process.stdout.write(`\rAdvanced Progress: ${completed}/${testUsers.length}`);
            } catch (e) {
                console.error(`User ${user.username} failed`, e);
            }
        }));

        await Promise.all(tasks);
    }

    clearInterval(cacheInterval);
    console.log("\n✅ Bigul Advanced Simulation Complete.");
}

simulateBigulAdvanced().catch(console.error);
