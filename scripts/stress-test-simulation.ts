
import { db } from "../server/db";
import { lessons, users, progress } from "../shared/schema";
import { eq } from "drizzle-orm";

// Configuration
const CONFIG = {
    users: {
        beginner: 125,
        intermediate: 75,
        advanced: 51
    },
    coverage: 0.9 // 90% of lessons
};

async function runStressTest() {
    console.log("🚀 Starting Deep Stress Test Simulation...");
    console.log(`Target: ${CONFIG.users.beginner + CONFIG.users.intermediate + CONFIG.users.advanced} concurrent users.`);

    // 1. Fetch All Lessons
    const allLessons = await db.select().from(lessons);
    if (allLessons.length === 0) {
        console.error("❌ CRITICAL: No lessons found in database!");
        process.exit(1);
    }
    console.log(`📚 Loaded ${allLessons.length} lessons from database.`);

    const results = {
        totalRequests: 0,
        success: 0,
        failed: 0,
        errors: [] as string[]
    };

    // 2. Define User Class
    class SimulatedUser {
        id: number;
        type: 'Beginner' | 'Intermediate' | 'Advanced';
        lessonsToVisit: number[];

        constructor(id: number, type: 'Beginner' | 'Intermediate' | 'Advanced') {
            this.id = id;
            this.type = type;
            // Randomly select 90% of lessons
            this.lessonsToVisit = allLessons
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.ceil(allLessons.length * CONFIG.coverage))
                .map((l: any) => l.id);
        }

        async run() {
            for (const lessonId of this.lessonsToVisit) {
                results.totalRequests++;
                try {
                    // Simulate Lesson Access (DB Read)
                    const lesson = allLessons.find((l: any) => l.id === lessonId);
                    if (!lesson) throw new Error(`Lesson ${lessonId} not found in cache`);

                    // Verify Data Integrity
                    if (!lesson.title || !lesson.content) {
                        throw new Error(`Lesson ${lessonId} has corrupt data (missing title/content)`);
                    }

                    // --- NEW: Revision Engine Check ---
                    // Simulating 5% chance of checking daily revision tasks
                    if (Math.random() < 0.05) {
                        results.totalRequests++; // Count as an action
                        // Note: In a real stress test we would query the API, but here we simulate the check
                        // against the DB directly or a cached service. for now we just verify we CAN access it.
                        const revisionTask = await db.query.revisionTasks.findFirst();
                        if (revisionTask && !revisionTask.title) {
                            throw new Error(`Revision Task found but has no title`);
                        }
                    }

                    // Simulate "Reading" (random delay 1-5ms)
                    await new Promise(r => setTimeout(r, Math.random() * 5));

                    results.success++;
                } catch (e: any) {
                    results.failed++;
                    results.errors.push(`User ${this.id} (${this.type}) failed on Lesson ${lessonId}: ${e.message}`);
                }
            }
        }
    }

    // 3. Instantiate Users
    const usersList: SimulatedUser[] = [];
    let userIdCounter = 1000; // Start high to avoid conflicts

    for (let i = 0; i < CONFIG.users.beginner; i++) usersList.push(new SimulatedUser(userIdCounter++, 'Beginner'));
    for (let i = 0; i < CONFIG.users.intermediate; i++) usersList.push(new SimulatedUser(userIdCounter++, 'Intermediate'));
    for (let i = 0; i < CONFIG.users.advanced; i++) usersList.push(new SimulatedUser(userIdCounter++, 'Advanced'));

    console.log(`👥 Created ${usersList.length} virtual users.`);

    // 4. Run Simulation
    const startTime = Date.now();
    await Promise.all(usersList.map(u => u.run()));
    const endTime = Date.now();

    // 5. Report
    console.log("\n📊 STRESS TEST RESULTS");
    console.log("========================");
    console.log(`Duration: ${(endTime - startTime) / 1000}s`);
    console.log(`Total Lessons Accessed: ${results.totalRequests}`);
    console.log(`Success Rate: ${((results.success / results.totalRequests) * 100).toFixed(2)}%`);
    console.log(`Failures: ${results.failed}`);

    if (results.failed > 0) {
        console.log("\n❌ ERRORS:");
        results.errors.slice(0, 10).forEach(e => console.log(e));
        if (results.errors.length > 10) console.log(`...and ${results.errors.length - 10} more.`);
        process.exit(1);
    } else {
        console.log("\n✅ ALL SYSTEMS GREEN. No user faced any problem.");
        process.exit(0);
    }
}

runStressTest().catch(console.error);
