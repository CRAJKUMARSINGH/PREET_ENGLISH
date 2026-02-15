
import { db } from "../server/db";
import { users, userSpeakingProfiles, lessons, progress } from "../shared/schema";
import { eq, and, sql } from "drizzle-orm";
import { scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function verifyBigul2() {
    console.log("Verifying user 'bigul2'...");

    try {
        const [user] = await db.select().from(users).where(eq(users.username, "bigul2"));

        if (!user) {
            console.error("❌ User 'bigul2' not found!");
            return;
        }
        console.log(`✅ User 'bigul2' exists (ID: ${user.id}).`);

        // Verify password (TestPass123!)
        // Note: Password hashing in original script used a specific salt generation, 
        // here we are just verifying it follows the pattern or re-hashing if we had the same salt.
        // Actually, the original script stores exact salt.
        const [storedHash, salt] = user.password.split('.');
        const buf = (await scryptAsync("TestPass123!", salt, 64)) as Buffer;
        if (buf.toString("hex") === storedHash) {
            console.log("✅ Password validation successful.");
        } else {
            console.error("❌ Password validation failed!");
        }

        // Verify Beginner Status
        const [profile] = await db.select().from(userSpeakingProfiles).where(eq(userSpeakingProfiles.userId, user.id));
        if (profile && profile.currentLevel === "beginner") {
            console.log("✅ User profile is 'beginner'.");
        } else {
            console.error(`❌ User profile level is '${profile?.currentLevel}', expected 'beginner'.`);
        }

        // Verify Progress Count
        const userProgress = await db.select({ count: sql<number>`count(*)` }).from(progress).where(eq(progress.userId, user.id));
        const progressCount = userProgress[0].count;
        console.log(`✅ User has completed ${progressCount} lessons.`);

        if (progressCount >= 1600) {
            console.log("✅ Robotic test data verified (approx 99% coverage).");
        } else {
            console.warn(`⚠️ Progress count ${progressCount} seems low for 99% coverage.`);
        }

    } catch (error) {
        console.error("Error verifying user:", error);
    }
}

verifyBigul2().catch(console.error);
