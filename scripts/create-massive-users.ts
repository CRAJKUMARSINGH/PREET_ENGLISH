
import { db } from "../server/db";
import { users, userStats, userSpeakingProfiles } from "../shared/schema";
import { eq, like } from "drizzle-orm";
import { hashPassword } from "../server/lib/auth-utils";

async function createMassiveUsers() {
    console.log("🚀 Starting Massive User Creation (Optimized Bulk Insert)...");

    const hashedPassword = await hashPassword("TestPass123!");

    // Batch Size for SQLite limits (maximum variables usually 999, so ~200 rows with 4 cols each)
    const BATCH_SIZE = 100;

    // 1. Create 1000 Beginner Users (bigul2_beginner_*)
    console.log("Creating 1000 Beginner Users (bigul2_beginner_*)...");
    const BEGINNER_PREFIX = "bigul2_beginner_";
    const beginnerUsersCount = 1000;

    // Check if enough exist first to skip? No, just bulk insert with conflict ignore.
    // Actually, SQLite doesn't return IDs on bulk insert with ignore easily in all drivers.
    // So we'll try to insert batches, catch errors, then select back to get IDs.

    let createdBeginners = 0;
    for (let i = 1; i <= beginnerUsersCount; i += BATCH_SIZE) {
        const batchUsers = [];
        for (let j = i; j < i + BATCH_SIZE && j <= beginnerUsersCount; j++) {
            batchUsers.push({
                username: `${BEGINNER_PREFIX}${j}`,
                password: hashedPassword,
                isAdmin: false,
            });
        }

        try {
            await db.insert(users).values(batchUsers).onConflictDoNothing();
            createdBeginners += batchUsers.length;
            process.stdout.write(`\rBeginner Users Inserted: ${Math.min(i + BATCH_SIZE - 1, beginnerUsersCount)}/${beginnerUsersCount}`);
        } catch (e) {
            console.error("Batch insert failed", e);
        }
    }
    console.log("\n✅ Beginner Users Inserted. Syncing Profiles...");

    // Now adding profiles requires User IDs. Fetch all.
    const allBeginners = await db.select().from(users).where(like(users.username, `${BEGINNER_PREFIX}%`));

    const beginnerStats = [];
    const beginnerProfiles = [];

    for (const user of allBeginners) {
        beginnerStats.push({
            userId: user.id,
            level: 1,
            xpPoints: 0,
            totalLessonsCompleted: 0
        });
        beginnerProfiles.push({
            userId: user.id,
            currentLevel: "beginner",
            preferredPracticeType: "mixed",
            culturalContextPreference: "indian_english"
        });
    }

    // Bulk insert stats/profiles
    for (let i = 0; i < beginnerStats.length; i += BATCH_SIZE) {
        const statsChunk = beginnerStats.slice(i, i + BATCH_SIZE);
        const profilesChunk = beginnerProfiles.slice(i, i + BATCH_SIZE);
        await db.insert(userStats).values(statsChunk).onConflictDoNothing();
        await db.insert(userSpeakingProfiles).values(profilesChunk).onConflictDoNothing();
        process.stdout.write(`\rBeginner Profiles: ${Math.min(i + BATCH_SIZE, beginnerStats.length)}/${beginnerStats.length}`);
    }
    console.log("\n✅ Beginner Profiles Done.");


    // 2. Create 15000 Advanced Users (bigul_advanced_*)
    console.log("Creating 15000 Advanced Users (bigul_advanced_*)...");
    const ADVANCED_PREFIX = "bigul_advanced_";
    const advancedUsersCount = 15000;

    for (let i = 1; i <= advancedUsersCount; i += BATCH_SIZE) {
        const batchUsers = [];
        for (let j = i; j < i + BATCH_SIZE && j <= advancedUsersCount; j++) {
            batchUsers.push({
                username: `${ADVANCED_PREFIX}${j}`,
                password: hashedPassword,
                isAdmin: false,
            });
        }
        try {
            await db.insert(users).values(batchUsers).onConflictDoNothing();
            process.stdout.write(`\rAdvanced Users Inserted: ${Math.min(i + BATCH_SIZE - 1, advancedUsersCount)}/${advancedUsersCount}`);
        } catch (e) {
            console.error("Batch insert failed", e);
        }
    }
    console.log("\n✅ Advanced Users Inserted. Syncing Profiles...");

    // Fetch IDs for Advanced Users (15000 rows is fine to fetch)
    const allAdvanced = await db.select().from(users).where(like(users.username, `${ADVANCED_PREFIX}%`));
    console.log(`Fetched ${allAdvanced.length} advanced user IDs for profile creation.`);

    const advancedStats = [];
    const advancedProfiles = [];

    for (const user of allAdvanced) {
        advancedStats.push({
            userId: user.id,
            level: 50,
            xpPoints: 10000,
            totalLessonsCompleted: 100
        });
        advancedProfiles.push({
            userId: user.id,
            currentLevel: "advanced",
            preferredPracticeType: "mixed",
            culturalContextPreference: "indian_english"
        });
    }

    // Bulk insert stats/profiles
    for (let i = 0; i < advancedStats.length; i += BATCH_SIZE) {
        const statsChunk = advancedStats.slice(i, i + BATCH_SIZE);
        const profilesChunk = advancedProfiles.slice(i, i + BATCH_SIZE);
        await db.insert(userStats).values(statsChunk).onConflictDoNothing();
        await db.insert(userSpeakingProfiles).values(profilesChunk).onConflictDoNothing();
        process.stdout.write(`\rAdvanced Profiles: ${Math.min(i + BATCH_SIZE, advancedStats.length)}/${advancedStats.length}`);
    }

    console.log("\n🎉 User Creation Complete.");
}

createMassiveUsers().catch(console.error);
