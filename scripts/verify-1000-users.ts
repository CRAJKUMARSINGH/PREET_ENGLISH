
import { db } from "../server/db";
import { users, progress, quizAttempts, speakingSessions } from "../shared/schema";
import { sql, eq } from "drizzle-orm";

async function verify1000Users() {
    console.log("🔍 Verifying 1000 User Load Test Data...");

    try {
        // 1. Count Test Users
        const userCount = await db.select({ count: sql<number>`count(*)` })
            .from(users)
            .where(sql`username LIKE 'bigul_test_%'`);

        console.log(`✅ Test Users Count: ${userCount[0].count} (Expected: 1000)`);

        if (userCount[0].count !== 1000) {
            console.warn("⚠️ User count mismatch!");
        }

        // 2. Sample a few users to check progress
        // We'll check the first, last, and middle user
        const sampleUsers = await db.select().from(users)
            .where(sql`username IN ('bigul_test_1', 'bigul_test_500', 'bigul_test_1000')`);

        for (const user of sampleUsers) {
            const prog = await db.select({ count: sql<number>`count(*)` })
                .from(progress)
                .where(eq(progress.userId, user.id));

            const quizzes = await db.select({ count: sql<number>`count(*)` })
                .from(quizAttempts)
                .where(eq(quizAttempts.userId, user.id));

            const scenarios = await db.select({ count: sql<number>`count(*)` })
                .from(speakingSessions)
                .where(eq(speakingSessions.userId, user.id));

            console.log(`👤 User ${user.username} (ID: ${user.id}):`);
            console.log(`   - Lessons Completed: ${prog[0].count}`);
            console.log(`   - Quizzes Passed: ${quizzes[0].count}`);
            console.log(`   - Scenarios Practiced: ${scenarios[0].count}`);

            if (prog[0].count < 1600) console.warn(`   ⚠️ Low lesson count for ${user.username}`);
        }

        // 3. Global Row Counts (Approx)
        // This might be slow on some DBs but fine here
        const totalProgress = await db.select({ count: sql<number>`count(*)` }).from(progress);
        console.log(`📊 Total Progress Rows in DB: ${totalProgress[0].count}`);

    } catch (error) {
        console.error("❌ Verification Failed:", error);
    }
}

verify1000Users().catch(console.error);
