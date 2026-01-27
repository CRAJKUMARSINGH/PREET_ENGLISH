
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines, progress } from "@shared/schema";
import { or, like, inArray } from "drizzle-orm";

/**
 * deep-clear-app-lessons.ts
 * Thoroughly removes all lessons that match any of the app-inspired keywords.
 */

const keywords = [
    "ELSA Speak",
    "Speak (Speak Technologies)",
    "TalkPal",
    "Lingvist",
    "Andy (Chatbot)",
    "Speak Technologies",
    "Andy style",
    "ELSA Style",
    "Orai Style",
    "Cambly Style",
    "Speak Style",
    "mysivi.ai"
];

async function clear() {
    console.log("🧹 Performing Deep Clean of App-Inspired lessons...");

    const conditions = keywords.map(k => like(lessons.title, `%${k}%`));
    const toDelete = await db.select().from(lessons).where(or(...conditions));

    if (toDelete.length === 0) {
        console.log("No matching lessons found.");
        process.exit(0);
    }

    const ids = toDelete.map(l => l.id);
    console.log(`Found ${ids.length} lessons to delete.`);

    // Batching for safety in case it's huge
    const batchSize = 100;
    for (let i = 0; i < ids.length; i += batchSize) {
        const batch = ids.slice(i, i + batchSize);
        await db.delete(vocabulary).where(inArray(vocabulary.lessonId, batch));
        await db.delete(conversationLines).where(inArray(conversationLines.lessonId, batch));
        // Also clear progress if table exists
        try {
            await db.delete(progress).where(inArray(progress.lessonId, batch));
        } catch (e) { }

        await db.delete(lessons).where(inArray(lessons.id, batch));
        console.log(`Deleted batch ${i / batchSize + 1}...`);
    }

    console.log(`✅ Deep Clean completed! (${ids.length} lessons removed)`);
    process.exit(0);
}

clear();
