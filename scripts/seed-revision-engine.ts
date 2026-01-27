
import { db } from "../server/db";
import { revisionTasks, lessons, scenarios, stories } from "../shared/schema";

async function seedRevisionEngine() {
    console.log("⚙️  Initializing 'Last One Year' Revision Engine...");

    // clear existing tasks to prevent duplicates during re-runs
    try {
        await db.delete(revisionTasks);
        console.log("   Cleared existing revision tasks.");
    } catch (e) {
        console.log("   No existing tasks to clear or table not created yet (will be created by drizzle-kit push if using it, or assuming schema exists).");
    }

    // Fetch verified content
    const allLessons = await db.query.lessons.findMany({ limit: 200 });
    const allScenarios = await db.query.scenarios.findMany({ limit: 100 });
    const allStories = await db.query.stories.findMany({ limit: 50 });

    console.log(`   Found Content: ${allLessons.length} Lessons, ${allScenarios.length} Scenarios, ${allStories.length} Stories`);

    const tasks: any[] = [];
    const TOTAL_DAYS = 365;

    for (let day = 1; day <= TOTAL_DAYS; day++) {
        let taskType = "lesson";
        let title = "";
        let refId = 0;
        let desc = "";

        // Rotation Strategy: Lesson -> Lesson -> Scenario -> Story -> Quiz -> Repeat
        const rotation = day % 5;

        if (rotation === 1 || rotation === 2) {
            // Lesson Day
            const lesson = allLessons[day % allLessons.length];
            if (lesson) {
                taskType = "lesson";
                title = `Daily Lesson: ${lesson.title}`;
                refId = lesson.id;
                desc = lesson.description;
            }
        } else if (rotation === 3) {
            // Scenario Day
            const scenario = allScenarios[day % allScenarios.length];
            if (scenario) {
                taskType = "roleplay";
                title = `Roleplay Practice: ${scenario.title}`;
                refId = scenario.id;
                desc = `Practice your speaking skills as a ${scenario.yourRole}.`;
            }
        } else if (rotation === 4) {
            // Story Day
            const story = allStories[day % allStories.length];
            if (story) {
                taskType = "story";
                title = `Story Time: ${story.title}`;
                refId = story.id;
                desc = "Read and understand the story in Hindi and English.";
            }
        } else {
            // Quiz/Review Day (Fallback to general practice)
            taskType = "review";
            title = `Weekly Review Day ${Math.ceil(day / 7)}`;
            refId = 0;
            desc = "Review your progress and take a quiz.";
        }

        if (title) { // Ensure we legit have a task
            tasks.push({
                dayNumber: day,
                title,
                taskType,
                referenceId: refId || null,
                description: desc,
                dateScheduled: new Date(Date.now() + (day - 1) * 86400000).toISOString(),
                isCompleted: false
            });
        }
    }

    // Bulk Insert safely
    console.log(`   Generative Engine created ${tasks.length} tasks.`);

    // Chunking inserts to avoid SQL limits
    const CHUNK_SIZE = 50;
    for (let i = 0; i < tasks.length; i += CHUNK_SIZE) {
        await db.insert(revisionTasks).values(tasks.slice(i, i + CHUNK_SIZE));
    }

    console.log("✅ 'Last One Year' Revision Engine Seeded Successfully!");
    process.exit(0);
}

seedRevisionEngine().catch((err) => {
    console.error("❌ Seeding Failed:", err);
    process.exit(1);
});
