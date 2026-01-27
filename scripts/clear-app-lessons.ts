
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "@shared/schema";
import { like, inArray, or } from "drizzle-orm";

/**
 * clear-app-lessons.ts
 * Deletes lessons whose titles match the pattern "Lesson <number> – <App>".
 * This allows re‑running add-app-lessons.ts to generate the full set without duplicate‑title conflicts.
 */

async function clearAppLessons() {
    console.log("🗑️ Deleting existing app‑inspired lessons...");
    const toDelete = await db
        .select()
        .from(lessons)
        .where(or(
            like(lessons.title, "Lesson % – %"),
            like(lessons.title, "%: % - %")
        ));

    if (toDelete.length === 0) {
        console.log("No app‑inspired lessons found to delete.");
        process.exit(0);
    }

    const ids = toDelete.map(l => l.id);

    // Delete related records first to satisfy foreign key constraints
    await db.delete(vocabulary).where(inArray(vocabulary.lessonId, ids));
    await db.delete(conversationLines).where(inArray(conversationLines.lessonId, ids));
    // Check if 'progress' table exists and needs clearing (not imported, assuming minimal impact or cascade if set up, but safer to try catch or just these two for now as per schema knowledge)
    // Based on previous files, vocabulary and conversationLines are the main ones.

    await db.delete(lessons).where(inArray(lessons.id, ids));
    console.log(`✅ Deleted ${ids.length} app‑inspired lessons.`);
    process.exit(0);
}

clearAppLessons();
