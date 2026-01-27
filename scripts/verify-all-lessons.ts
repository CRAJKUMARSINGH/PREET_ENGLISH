
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "@shared/schema";
import { eq } from "drizzle-orm";

async function verifyAllLessons() {
    console.log("🚀 Starting Programmatic Lesson Verification...");

    const allLessons = await db.select().from(lessons);
    console.log(`📊 Total Lessons found: ${allLessons.length}`);

    let issues = 0;
    let missingVocab = 0;
    let missingConversation = 0;

    for (const lesson of allLessons) {
        // 1. Basic Content Check
        if (!lesson.title || !lesson.content) {
            console.error(`❌ Lesson ${lesson.id} [${lesson.category}] is missing basic content!`);
            issues++;
        }

        // 2. Vocabulary Check
        const vocab = await db.select().from(vocabulary).where(eq(vocabulary.lessonId, lesson.id));
        if (vocab.length === 0) {
            // console.warn(`⚠️ Lesson ${lesson.id} has NO vocabulary items.`);
            missingVocab++;
        }

        // 3. Conversation Lines Check (if applicable)
        const lines = await db.select().from(conversationLines).where(eq(conversationLines.lessonId, lesson.id));
        if (lines.length === 0 && lesson.category === "Business") {
            // most business lessons should have conversation lines
            missingConversation++;
        }

        // 4. JSON Validation (if content is JSON)
        if (typeof lesson.content === 'string' && (lesson.content.startsWith('{') || lesson.content.startsWith('['))) {
            try {
                JSON.parse(lesson.content);
            } catch (e) {
                console.error(`❌ Lesson ${lesson.id} has invalid JSON content!`);
                issues++;
            }
        }
    }

    console.log("\n--- Verification Report ---");
    console.log(`✅ Lessons Processed: ${allLessons.length}`);
    console.log(`❌ Critical Issues: ${issues}`);
    console.log(`⚠️ Lessons with no Vocabulary: ${missingVocab}`);
    console.log(`💬 Lessons with no Conversation Lines: ${missingConversation}`);

    if (issues === 0) {
        console.log("🎉 All lessons passed structural verification!");
    } else {
        console.log("⚠️ Some lessons require attention.");
    }

    process.exit(0);
}

verifyAllLessons().catch(err => {
    console.error("FATAL ERROR during verification:", err);
    process.exit(1);
});
