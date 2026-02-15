
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { db } from "../server/db";
import { users, userStats, userSpeakingProfiles } from "../shared/schema";
import { eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
}

async function createBigul2User() {
    console.log("Creating user 'bigul2'...");

    try {
        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.username, "bigul2"));
        if (existingUser.length > 0) {
            console.log("User 'bigul2' already exists. Resetting status to Beginner...");

            // Check if profile exists, if not create, if so update
            const existingProfile = await db.select().from(userSpeakingProfiles).where(eq(userSpeakingProfiles.userId, existingUser[0].id));

            if (existingProfile.length > 0) {
                await db.update(userSpeakingProfiles)
                    .set({ currentLevel: "beginner" })
                    .where(eq(userSpeakingProfiles.userId, existingUser[0].id));
            } else {
                await db.insert(userSpeakingProfiles).values({
                    userId: existingUser[0].id,
                    currentLevel: "beginner",
                    preferredPracticeType: "mixed",
                    culturalContextPreference: "indian_english",
                });
            }

            // Check if stats exist
            const existingStats = await db.select().from(userStats).where(eq(userStats.userId, existingUser[0].id));
            if (existingStats.length > 0) {
                await db.update(userStats)
                    .set({ level: 1, xpPoints: 0, totalLessonsCompleted: 0 })
                    .where(eq(userStats.userId, existingUser[0].id));
            } else {
                await db.insert(userStats).values({
                    userId: existingUser[0].id,
                    level: 1,
                    xpPoints: 0,
                    totalLessonsCompleted: 0,
                });
            }

            console.log("User 'bigul2' reset to Beginner.");
            return;
        }

        const hashedPassword = await hashPassword("TestPass123!");

        const [newUser] = await db.insert(users).values({
            username: "bigul2",
            password: hashedPassword,
            isAdmin: false,
        }).returning();

        console.log("User 'bigul2' created with ID:", newUser.id);

        // Set as Beginner
        await db.insert(userSpeakingProfiles).values({
            userId: newUser.id,
            currentLevel: "beginner",
            preferredPracticeType: "mixed",
            culturalContextPreference: "indian_english",
        });

        await db.insert(userStats).values({
            userId: newUser.id,
            level: 1,
            xpPoints: 0,
            totalLessonsCompleted: 0,
        });

        console.log("User 'bigul2' configured as Beginner.");

    } catch (error) {
        console.error("Error creating user:", error);
    }
}

createBigul2User().catch(console.error);
