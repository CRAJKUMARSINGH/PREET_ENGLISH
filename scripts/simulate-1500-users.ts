
import { db } from "../server/db";
import { lessons, progress, users, quizzes, quizAttempts, vocabulary, vocabularyProgress } from "../shared/schema";
import { eq, sql } from "drizzle-orm";

const TOTAL_USERS = 1500;
const BATCH_SIZE = 50;

async function simulateUserSession(userIndex: number) {
    const startTime = Date.now();
    const logs: string[] = [];

    try {
        // 1. "Login" / Identify (Mock)
        const userId = 10000 + userIndex; // Mock user IDs to avoid conflicts with real users

        // Ensure user exists
        await db.insert(users).values({
            id: userId,
            username: `sim_user_${userId}`,
            password: "password123",
            isAdmin: false
        }).onConflictDoNothing();

        // 2. Fetch Dashboard Data (Lessons)
        const allLessons = await db.select().from(lessons).limit(5);
        if (!allLessons.length) throw new Error("No lessons found");

        // 3. Start a Lesson (Random)
        const lesson = allLessons[Math.floor(Math.random() * allLessons.length)];

        // 4. Simulate Reading/Interaction
        // (In a real app, this would be time spent)

        // 5. Complete Lesson
        // Check if progress exists
        const existingProgress = await db.select().from(progress).where(
            sql`${progress.userId} = ${userId} AND ${progress.lessonId} = ${lesson.id}`
        );

        if (existingProgress.length === 0) {
            await db.insert(progress).values({
                userId,
                lessonId: lesson.id,
                completed: true,
                completedAt: new Date().toISOString(),
            });
        }

        // 6. Practice Vocabulary
        const vocab = await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lesson.id)).limit(3);
        for (const v of vocab) {
            await db.insert(vocabularyProgress).values({
                userId,
                vocabularyId: v.id,
                nextReviewDate: new Date().toISOString(),
                interval: 1,
                repetition: 1,
                easeFactor: 250
            }).onConflictDoUpdate({
                target: [vocabularyProgress.userId, vocabularyProgress.vocabularyId],
                set: {
                    nextReviewDate: new Date().toISOString(),
                    repetition: sql`${vocabularyProgress.repetition} + 1`
                }
            });
        }

        return { success: true, time: Date.now() - startTime };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

async function run() {
    console.log(`Starting simulation for ${TOTAL_USERS} virtual users...`);
    console.log(`Batch size: ${BATCH_SIZE}`);

    const results = {
        success: 0,
        failed: 0,
        totalTime: 0
    };

    for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
        const batchPromises = [];
        const end = Math.min(i + BATCH_SIZE, TOTAL_USERS);

        console.log(`Processing users ${i + 1} to ${end}...`);

        for (let j = i; j < end; j++) {
            batchPromises.push(simulateUserSession(j));
        }

        const batchResults = await Promise.all(batchPromises);

        batchResults.forEach(r => {
            if (r.success) {
                results.success++;
                results.totalTime += r.time || 0;
            } else {
                results.failed++;
                console.error(`User failed: ${r.error}`);
            }
        });
    }

    console.log("\n-------------------------------------------");
    console.log("SIMULATION COMPLETE");
    console.log("-------------------------------------------");
    console.log(`Total Users: ${TOTAL_USERS}`);
    console.log(`Successful Sessions: ${results.success}`);
    console.log(`Failed Sessions: ${results.failed}`);
    console.log(`Average Session Time (DB Latency): ${(results.totalTime / results.success).toFixed(2)}ms`); // Only meaningful if success > 0
    console.log("-------------------------------------------");

    if (results.failed === 0) {
        console.log("PASSED: Grade 9 Robustness Achieved.");
        process.exit(0);
    } else {
        console.log("FAILED: Some users encountered errors.");
        process.exit(1);
    }
}

// Run directly
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    run().catch(console.error);
}
