
import { db } from "../server/db";
import {
    users, lessons, quizzes, scenarios, speakingTopics,
    progress, quizAttempts, userStats, speakingSessions
} from "../shared/schema";
import { eq, sql, inArray } from "drizzle-orm";
import pLimit from "p-limit"; // Requires 'p-limit' package usually, checking package.json... yes it's there.

async function simulate1000Users() {
    console.log("🤖 STARTING: 1000 User Concurrent Load and Content Simulation");
    console.log("=============================================================");

    try {
        // 1. Fetch Users
        console.log("👥 Fetching 'bigul_test_*' users...");
        // This 'like' query depends on DB support, Drizzle 'like' operator is needed.
        // Or just select all and filter.
        // Let's assume standard 'like' works or fetch all users and filter in memory for simplicity if count isn't millions.
        // Actually, db.select().from(users) might be big but manageable.
        // A safer way:
        const allUsers = await db.select().from(users);
        const testUsers = allUsers.filter(u => u.username.startsWith("bigul_test_"));

        if (testUsers.length === 0) {
            console.error("❌ No 'bigul_test_*' users found. Run 'create-1000-users.ts' first.");
            process.exit(1);
        }
        console.log(`✅ Found ${testUsers.length} test users.`);

        // 2. Fetch Content (Cached)
        console.log("📦 Fetching content metadata...");
        const allLessons = await db.select({ id: lessons.id }).from(lessons);
        const allQuizzes = await db.select({ id: quizzes.id }).from(quizzes);
        const allScenarios = await db.select({ id: scenarios.id }).from(scenarios);
        const allSpeakingTopics = await db.select({ id: speakingTopics.id }).from(speakingTopics);

        // Targets (99%)
        const targetLessonsCount = Math.ceil(allLessons.length * 0.99);
        const targetQuizzesCount = Math.ceil(allQuizzes.length * 0.99);
        const targetScenariosCount = Math.ceil(allScenarios.length * 0.99);

        console.log(`🎯 Per-User Targets: ${targetLessonsCount} Lessons, ${targetQuizzesCount} Quizzes, ${targetScenariosCount} Scenarios.`);

        // 3. Execution with Concurrency Limit
        const CONCURRENCY = 50; // 50 users active at once
        const limit = pLimit(CONCURRENCY);

        console.log(`🚀 Launching simulation with concurrency ${CONCURRENCY}...`);

        let completedUsers = 0;
        const startTime = Date.now();

        const userTasks = testUsers.map(user => limit(async () => {
            try {
                // Determine user's specific 99% subset (shuffled efficiently)
                // For speed, we'll just take the FIRST 99% for everyone to avoid massive array shuffling overhead 1000 times?
                // No, "robotically alike" means they behave similarly. 
                // Let's just slice the array. Shuffling 1600 items 1000 times is cheap in JS.

                // Optimized Shuffle & Slice
                const myLessons = allLessons.sort(() => .5 - Math.random()).slice(0, targetLessonsCount);
                const myQuizzes = allQuizzes.sort(() => .5 - Math.random()).slice(0, targetQuizzesCount);

                // BULK INSERT PROGRESS
                // Chunk size of 100 to stay safe with SQLite variables
                const CHUNK_SIZE = 100;

                // Lessons
                for (let i = 0; i < myLessons.length; i += CHUNK_SIZE) {
                    const chunk = myLessons.slice(i, i + CHUNK_SIZE);
                    const values = chunk.map(l => ({
                        userId: user.id,
                        lessonId: l.id,
                        completed: true,
                        completedAt: new Date().toISOString()
                    }));
                    // Insert and ignore conflicts if possible, or just insert.
                    // Assuming clean slate or duplicate tolerant.
                    await db.insert(progress).values(values).onConflictDoNothing();
                }

                // Quizzes
                // Just insert one batch usually enough as count is small (7)
                const quizValues = myQuizzes.map(q => ({
                    userId: user.id,
                    quizId: q.id,
                    score: 100,
                    totalQuestions: 10,
                    passed: true,
                    completedAt: new Date().toISOString(),
                    timeSpent: 120
                }));
                if (quizValues.length > 0) await db.insert(quizAttempts).values(quizValues);

                // Scenarios
                // Also small enough (77)
                const myScenarios = allScenarios.slice(0, targetScenariosCount);
                const scenarioValues = myScenarios.map(s => ({
                    userId: user.id,
                    scenarioId: s.id,
                    sessionType: 'scenario_practice',
                    durationSeconds: 180,
                    overallScore: 95,
                    pronunciationScore: 90,
                    fluencyScore: 92,
                    confidenceScore: 98,
                    completedAt: new Date().toISOString()
                }));
                if (scenarioValues.length > 0) await db.insert(speakingSessions).values(scenarioValues);

                // Update Stats
                const totalXP = (targetLessonsCount * 10) + (targetQuizzesCount * 50) + (targetScenariosCount * 30);

                await db.update(userStats).set({
                    xpPoints: totalXP,
                    totalLessonsCompleted: targetLessonsCount,
                    totalQuizzesPassed: targetQuizzesCount,
                    totalMinutesLearned: targetLessonsCount * 15,
                    lastActiveDate: new Date().toISOString()
                }).where(eq(userStats.userId, user.id));

                completedUsers++;
                if (completedUsers % 10 === 0) {
                    process.stdout.write(`\r📊 Progress: ${completedUsers}/${testUsers.length} users completed.`);
                }

            } catch (err) {
                console.error(`❌ User ${user.username} failed:`, err);
            }
        }));

        await Promise.all(userTasks);

        const duration = (Date.now() - startTime) / 1000;
        console.log(`\n\n✅ SIMULATION COMPLETE.`);
        console.log(`⏱️ Total Time: ${duration.toFixed(2)}s`);
        console.log(`👥 Users Processed: ${completedUsers}`);
        console.log(`💾 Estimated Rows Inserted: ~${(completedUsers * (targetLessonsCount + targetQuizzesCount + targetScenariosCount))}`);

    } catch (error) {
        console.error("❌ Fatal Simulation Error:", error);
    }
}

simulate1000Users().catch(console.error);
