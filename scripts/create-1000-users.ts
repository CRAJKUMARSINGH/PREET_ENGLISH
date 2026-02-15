
import { db } from "../server/db";
import { users, userStats, userSpeakingProfiles } from "../shared/schema";
import { eq } from "drizzle-orm";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
}

async function create1000Users() {
    console.log("🚀 STARTING: Batch creation of 1000 users (bigul_test_1 to bigul_test_1000)...");

    // Pre-calculate hash once to save time (same password for all test users)
    const basePassword = "TestPass123!";
    const hashedPassword = await hashPassword(basePassword);

    const BATCH_SIZE = 50;
    const TOTAL_USERS = 1000;

    let createdCount = 0;

    try {
        for (let i = 1; i <= TOTAL_USERS; i += BATCH_SIZE) {
            const userValues = [];
            const usersToCreate = [];

            for (let j = 0; j < BATCH_SIZE && (i + j) <= TOTAL_USERS; j++) {
                const username = `bigul_test_${i + j}`;
                usersToCreate.push(username);
                userValues.push({
                    username: username,
                    password: hashedPassword, // Reusing same hash/salt might be less secure but fine for load testing speed
                    isAdmin: false,
                });
            }

            // Insert Users
            // Note: Returning IDs is needed. 
            // In many SQLs, batch insert returning is supported.
            const newUsers = await db.insert(users).values(userValues).returning();

            // Prepare associated data
            const profileValues = [];
            const statsValues = [];

            for (const user of newUsers) {
                profileValues.push({
                    userId: user.id,
                    currentLevel: "beginner",
                    preferredPracticeType: "mixed",
                    culturalContextPreference: "indian_english",
                });

                statsValues.push({
                    userId: user.id,
                    level: 1,
                    xpPoints: 0,
                    totalLessonsCompleted: 0,
                });
            }

            // Insert Profiles & Stats
            if (profileValues.length > 0) await db.insert(userSpeakingProfiles).values(profileValues);
            if (statsValues.length > 0) await db.insert(userStats).values(statsValues);

            createdCount += newUsers.length;
            process.stdout.write(`\r✅ Created ${createdCount}/${TOTAL_USERS} users...`);
        }

        console.log("\n🎉 COMPLETED: 1000 users created successfully.");

    } catch (error) {
        console.error("\n❌ Fatal Error during batch creation:", error);
        // It might be a unique constraint error if run twice. 
        // We'll catch and suggest cleanup or ignore.
    }
}

create1000Users().catch(console.error);
