
import { db } from "../server/db";
import { lessons, revisionTasks } from "../shared/schema";

async function verifyAllContent() {
    console.log("🔍 Starting 100% Content Integrity Audit...");

    // 1. Verify Lessons
    const allLessons = await db.select().from(lessons);
    console.log(`📚 Checking ${allLessons.length} lessons...`);

    let invalidLessons = 0;
    for (const l of allLessons) {
        if (!l.title || !l.content) {
            console.error(`❌ Currupt Lesson ID ${l.id}: Missing title or content`);
            invalidLessons++;
            continue;
        }

        try {
            // Verify JSON parsing if string
            const content = typeof l.content === 'string' ? JSON.parse(l.content) : l.content;
            if (!content) {
                console.error(`❌ Currupt Lesson ID ${l.id}: Content is null/empty`);
                invalidLessons++;
            }
        } catch (e) {
            console.error(`❌ Currupt Lesson ID ${l.id}: Invalid JSON content`);
            invalidLessons++;
        }
    }

    // 2. Verify Revision Tasks
    const allTasks = await db.select().from(revisionTasks);
    console.log(`📅 Checking ${allTasks.length} revision tasks...`);

    let invalidTasks = 0;
    for (const t of allTasks) {
        if (!t.title || !t.dayNumber) {
            console.error(`❌ Currupt Task ID ${t.id}: Missing title or day`);
            invalidTasks++;
        }
    }

    console.log("\n📊 AUDIT REPORT");
    console.log("==================");
    console.log(`Lessons Checked: ${allLessons.length}`);
    console.log(`Invalid Lessons: ${invalidLessons}`);
    console.log(`Revision Tasks Checked: ${allTasks.length}`);
    console.log(`Invalid Tasks: ${invalidTasks}`);

    if (invalidLessons > 0 || invalidTasks > 0) {
        console.log("\n❌ DATA INTEGRITY FAILURE");
        process.exit(1);
    } else {
        console.log("\n✅ 100% INTEGRITY CONFIRMED");
        process.exit(0);
    }
}

verifyAllContent();
