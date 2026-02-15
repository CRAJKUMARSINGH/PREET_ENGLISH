
import { db } from "../server/db";
import { users, lessons, progress, userStats } from "../shared/schema";
import { eq, like } from "drizzle-orm";
import pLimit from "p-limit";

async function simulateBigul2Beginner() {
    console.log("🤖 STARTING: Bigul2 Beginner Simulation (1000 Users, 99% Content)");

    // 1. Fetch Users
    const testUsers = await db.select().from(users).where(like(users.username, "bigul2_beginner_%"));
    if (testUsers.length === 0) {
        console.error("❌ No 'bigul2_beginner_*' users found. Run 'create-massive-users.ts' first.");
        process.exit(1);
    }
    console.log(`✅ Found ${testUsers.length} Bigul2 users.`);

    // 2. Fetch Content Metadata
    const allLessons = await db.select({ id: lessons.id }).from(lessons);
    const targetCount = Math.ceil(allLessons.length * 0.99);
    console.log(`🎯 Target: ${targetCount} lessons per user.`);

    const concurrency = 200; // High concurrency simulation
    const limit = pLimit(concurrency);
    let completed = 0;

    const tasks = testUsers.map(user => limit(async () => {
        try {
            // Select random unique lessons (performance hack: take first targetCount)
            // Real randomization is expensive for 15k users * 1600 lessons
            const userLessons = allLessons.slice(0, targetCount);

            // Bulk insert progress
            const chunkSize = 100;
            for (let i = 0; i < userLessons.length; i += chunkSize) {
                const chunk = userLessons.slice(i, i + chunkSize);
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
            if (completed % 100 === 0) process.stdout.write(`\rBeginner Progress: ${completed}/${testUsers.length}`);
        } catch (e) {
            console.error(`User ${user.username} failed`, e);
        }
    }));

    await Promise.all(tasks);
    console.log("\n✅ Bigul2 Simulation Complete.");
}

simulateBigul2Beginner().catch(console.error);
