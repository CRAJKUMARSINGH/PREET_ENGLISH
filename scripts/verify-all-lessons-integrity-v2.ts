
import { db } from "../server/db";
import { lessons, revisionTasks } from "../shared/schema";

async function verifyAllContent() {
    console.log("🔍 Starting 100% Content Integrity Audit (V2)...");

    // 1. Verify Lessons
    const allLessons = await db.select().from(lessons);
    console.log(`📚 Checking ${allLessons.length} lessons...`);

    let invalidLessons = 0;
    for (const l of allLessons) {
        if (!l.title) {
            console.error(`❌ Corrupt Lesson ID ${l.id}: Missing title`);
            invalidLessons++;
            continue;
        }

        if (!l.content) {
            console.error(`❌ Corrupt Lesson ID ${l.id}: content is null/undefined`);
            invalidLessons++;
            continue;
        }

        // Validation Logic
        let isValid = false;

        // Case A: JSON Content
        try {
            const parsed = typeof l.content === 'string' ? JSON.parse(l.content) : l.content;
            if (parsed && (typeof parsed === 'object')) {
                isValid = true;
            }
        } catch (e) {
            // parsing failed, check Case B
        }

        // Case B: Legacy Text Content
        if (!isValid) {
            if (typeof l.content === 'string' && l.content.trim().length > 0) {
                isValid = true;
            }
        }

        if (!isValid) {
            console.error(`❌ Invalid Content ID ${l.id}: Not valid JSON and not valid legacy text.`);
            invalidLessons++;
        }
    }

    // 2. Verify Revision Tasks
    const allTasks = await db.select().from(revisionTasks);
    console.log(`📅 Checking ${allTasks.length} revision tasks...`);

    let invalidTasks = 0;
    for (const t of allTasks) {
        if (!t.title || !t.dayNumber) {
            console.error(`❌ Corrupt Task ID ${t.id}: Missing title or day`);
            invalidTasks++;
        }
    }

    console.log("\n📊 AUDIT REPORT V2");
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
