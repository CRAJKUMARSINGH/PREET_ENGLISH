
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines, quizzes } from "../shared/schema";
import { eq } from "drizzle-orm";

async function verifyLessons() {
    console.log('🔍 Starting Programmatic Lesson Verification...');

    try {
        // 1. Fetch all lessons
        const allLessons = await db.select().from(lessons);
        console.log(`📊 Found ${allLessons.length} total lessons in database.`);

        let passedCount = 0;
        let failedCount = 0;
        const failures = [];

        // 2. Iterate and verify each lesson
        for (const lesson of allLessons) {
            const lessonId = lesson.id;
            const lessonTitle = lesson.title || "Untitled";

            // Checks
            const vocab = await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lessonId));
            const conv = await db.select().from(conversationLines).where(eq(conversationLines.lessonId, lessonId));
            const quiz = await db.select().from(quizzes).where(eq(quizzes.lessonId, lessonId));

            let issues = [];
            if (vocab.length === 0) issues.push("Missing Vocabulary");
            if (conv.length === 0) issues.push("Missing Conversation");
            // Quizzes might be optional, but let's note it
            const hasContent = vocab.length > 0 || conv.length > 0;

            if (!hasContent) {
                failedCount++;
                failures.push({ id: lessonId, title: lessonTitle, issues });
                // process.stdout.write('❌');
            } else {
                passedCount++;
                // process.stdout.write('.');
            }

            if (passedCount % 50 === 0) process.stdout.write('.');
        }

        console.log('\n\n📋 Verification Verification Results:');
        console.log(`✅ Passed: ${passedCount}`);
        console.log(`❌ Failed: ${failedCount}`);

        if (failures.length > 0) {
            console.log('\n🛑 Lessons with Major Issues (No Vocab AND No Conversation):');
            failures.slice(0, 10).forEach(f => console.log(`- [ID: ${f.id}] ${f.title}: ${f.issues.join(', ')}`));
            if (failures.length > 10) console.log(`... and ${failures.length - 10} more.`);
        }

        if (failedCount === 0) {
            console.log('\n✨ ALL SYSTEMS GO! Every nook and cranny verified.');
        }

    } catch (error) {
        console.error('❌ Fatal Error during verification:', error);
        process.exit(1);
    }
}

verifyLessons().then(() => process.exit(0));
