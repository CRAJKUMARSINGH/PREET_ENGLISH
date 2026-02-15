
import { db } from "../server/db";
import { users, progress, userStats } from "../shared/schema";
import { eq, sql, desc } from "drizzle-orm";

async function runPerformanceTest() {
    console.log("🚀 STARTING: Database Performance Test (Loaded DB)");
    console.log("================================================");

    try {
        // 1. Warm-up
        console.log("🔥 Warming up connection...");
        await db.select({ count: sql<number>`count(*)` }).from(users);

        // 2. Complex Join Query (User + Stats + Progress Count)
        // Simulate fetching dashboard data for a random user
        console.log("\n🧪 Test 1: Complex User Dashboard Query (Join + Aggregation)");
        const userIds = [2598, 3000, 3500]; // Sample IDs from `bigul_test` range

        let totalTime = 0;
        const iterations = 5;

        for (let i = 0; i < iterations; i++) {
            const userId = userIds[i % userIds.length]; // cycle through
            const start = performance.now();

            await db.select({
                username: users.username,
                xp: userStats.xpPoints,
                completedLessons: sql<number>`count(${progress.lessonId})`
            })
                .from(users)
                .leftJoin(userStats, eq(users.id, userStats.userId))
                .leftJoin(progress, eq(users.id, progress.userId))
                .where(eq(users.id, userId))
                .groupBy(users.id, userStats.xpPoints);

            const end = performance.now();
            totalTime += (end - start);
        }
        console.log(`   ⏱️ Average Latency: ${(totalTime / iterations).toFixed(2)}ms`);


        // 3. Leaderboard Query (Sort + Limit on Stats)
        console.log("\n🧪 Test 2: Leaderboard Query (Sort on invalid/non-indexed col?)");
        // Stats table usually has index on xpPoints, hopefully.
        const startLeader = performance.now();

        const leaderboard = await db.select({
            username: users.username,
            xp: userStats.xpPoints
        })
            .from(userStats)
            .leftJoin(users, eq(userStats.userId, users.id))
            .orderBy(desc(userStats.xpPoints)) // Sorting ~1000+ users
            .limit(10);

        const endLeader = performance.now();
        console.log(`   ⏱️ Latency: ${(endLeader - startLeader).toFixed(2)}ms`);
        console.log(`   🏆 Top User: ${leaderboard[0]?.username} (${leaderboard[0]?.xp} XP)`);


        // 4. Progress Check (High Volume Table Scan potential if not indexed)
        console.log("\n🧪 Test 3: Check Specific Lesson Progress (Index usage check)");
        const startProgress = performance.now();

        // Checking if user 3597 completed lesson 50
        await db.select().from(progress).where(
            sql`user_id = 3597 AND lesson_id = 50`
        );

        const endProgress = performance.now();
        console.log(`   ⏱️ Latency: ${(endProgress - startProgress).toFixed(2)}ms`);

        // 5. Write Performance (Single Insert)
        console.log("\n🧪 Test 4: Single Write Operation");
        const startWrite = performance.now();

        await db.update(userStats).set({ lastActiveDate: new Date().toISOString() })
            .where(eq(userStats.userId, 2598));

        const endWrite = performance.now();
        console.log(`   ⏱️ Latency: ${(endWrite - startWrite).toFixed(2)}ms`);


        console.log("\n================================================");
        console.log("✅ PERFORMANCE TEST COMPLETE.");

    } catch (error) {
        console.error("❌ Performance Test Failed:", error);
    }
}

runPerformanceTest().catch(console.error);
