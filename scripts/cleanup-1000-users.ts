
import { db } from "../server/db";
import { users, progress, quizAttempts, speakingSessions, userStats, userSpeakingProfiles } from "../shared/schema";
import { sql, eq, inArray } from "drizzle-orm";

async function cleanup1000Users() {
    console.log("🧹 STARTING: Cleanup of 1000 Test Users...");
    console.log("==========================================");

    try {
        // 1. Identify Users
        const testUsers = await db.select({ id: users.id, username: users.username })
            .from(users)
            .where(sql`username LIKE 'bigul_test_%'`);

        const count = testUsers.length;
        if (count === 0) {
            console.log("✅ No test users found to clean up.");
            return;
        }

        const userIds = testUsers.map(u => u.id);
        console.log(`🔍 Found ${count} users to delete.`);

        // 2. Delete Related Data (Manual Cascade for safety / if FKs don't cascade)
        // Processing in chunks if IDs list is too huge for one query? 
        // 1000 IDs is fine for SQLite/Postgres `IN` clause.

        console.log("🗑️  Deleting Progress (this might take a while)...");
        // progress table is huge (1.6M rows). Delete by user_id IN (...) is efficient if indexed.
        await db.delete(progress).where(inArray(progress.userId, userIds));

        console.log("🗑️  Deleting Quiz Attempts...");
        await db.delete(quizAttempts).where(inArray(quizAttempts.userId, userIds));

        console.log("🗑️  Deleting Speaking Sessions...");
        await db.delete(speakingSessions).where(inArray(speakingSessions.userId, userIds));

        console.log("🗑️  Deleting User Stats...");
        await db.delete(userStats).where(inArray(userStats.userId, userIds));

        console.log("🗑️  Deleting User Speaking Profiles...");
        await db.delete(userSpeakingProfiles).where(inArray(userSpeakingProfiles.userId, userIds));

        // 3. Delete Users Directly
        console.log("🗑️  Deleting Users with SQL...");
        await db.delete(users).where(sql`username LIKE 'bigul_test_%'`);

        console.log("\n✨ CLEANUP COMPLETE.");
        console.log(`✅ Removed ${count} users and all associated data.`);

    } catch (error) {
        console.error("❌ Cleanup Failed:", error);
    }
}

cleanup1000Users().catch(console.error);
