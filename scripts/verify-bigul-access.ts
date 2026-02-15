
import { db } from "../server/db";
import { users, userSpeakingProfiles, lessons } from "../shared/schema";
import { eq, and } from "drizzle-orm";
import { scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

async function verifyBigul() {
    console.log("Verifying user 'bigul'...");

    try {
        const [user] = await db.select().from(users).where(eq(users.username, "bigul"));

        if (!user) {
            console.error("❌ User 'bigul' not found!");
            return;
        }
        console.log("✅ User 'bigul' exists.");

        // Verify password (TestPass123!)
        const [storedHash, salt] = user.password.split('.');
        const buf = (await scryptAsync("TestPass123!", salt, 64)) as Buffer;
        if (buf.toString("hex") === storedHash) {
            console.log("✅ Password validation successful.");
        } else {
            console.error("❌ Password validation failed!");
        }

        // Verify Advanced Status
        const [profile] = await db.select().from(userSpeakingProfiles).where(eq(userSpeakingProfiles.userId, user.id));
        if (profile && profile.currentLevel === "advanced") {
            console.log("✅ User profile is 'advanced'.");
        } else {
            console.error(`❌ User profile level is '${profile?.currentLevel}', expected 'advanced'.`);
        }

        // Check availability of Advanced Content
        const advancedLessons = await db.select().from(lessons).where(eq(lessons.difficulty, "Advanced"));
        console.log(`✅ Found ${advancedLessons.length} advanced lessons available to user.`);

        if (advancedLessons.length > 0) {
            console.log("✅ Advanced content access verified.");
        } else {
            console.warn("⚠️ No advanced lessons found in database.");
        }

    } catch (error) {
        console.error("Error verifying user:", error);
    }
}

verifyBigul().catch(console.error);
