
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

async function createBigulUser() {
    console.log("Creating user 'bigul'...");

    try {
        // Check if user exists
        const existingUser = await db.select().from(users).where(eq(users.username, "bigul"));
        if (existingUser.length > 0) {
            console.log("User 'bigul' already exists. Updating status to Advanced...");
            await db.update(userSpeakingProfiles)
                .set({ currentLevel: "advanced" })
                .where(eq(userSpeakingProfiles.userId, existingUser[0].id));

            await db.update(userStats)
                .set({ level: 50, xpPoints: 10000 })
                .where(eq(userStats.userId, existingUser[0].id));

            console.log("User 'bigul' updated.");
            return;
        }

        const hashedPassword = await hashPassword("TestPass123!");

        const [newUser] = await db.insert(users).values({
            username: "bigul",
            password: hashedPassword,
            isAdmin: false,
        }).returning();

        console.log("User 'bigul' created with ID:", newUser.id);

        // Set as Advanced
        await db.insert(userSpeakingProfiles).values({
            userId: newUser.id,
            currentLevel: "advanced",
            preferredPracticeType: "mixed",
            culturalContextPreference: "indian_english",
        });

        await db.insert(userStats).values({
            userId: newUser.id,
            level: 50,
            xpPoints: 10000,
            totalLessonsCompleted: 100,
        });

        console.log("User 'bigul' configured as Advanced.");

    } catch (error) {
        console.error("Error creating user:", error);
    }
}

createBigulUser().catch(console.error);
