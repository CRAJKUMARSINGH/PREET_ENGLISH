
import { db } from "../server/db";
import { lessons, vocabulary, progress, conversationLines } from "@shared/schema";
import { eq, inArray } from "drizzle-orm";
import fs from "fs";

async function cleanupLowQualityLessons() {
    const logFile = "cleanup_result.txt";
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + "\n");
    };

    fs.writeFileSync(logFile, "Lesson Cleanup Report\n=====================\n\n");

    try {
        // Find all Business lessons with short content (< 200 chars)
        const allLessons = await db.select().from(lessons);
        const lowQualityLessons = allLessons.filter(l =>
            l.category === "Business" && (l.content?.length || 0) < 200
        );

        log(`Found ${lowQualityLessons.length} low-quality Business lessons to remove.`);

        if (lowQualityLessons.length === 0) {
            log("No lessons to remove.");
            process.exit(0);
        }

        const idsToDelete = lowQualityLessons.map(l => l.id);

        // Backup IDs before deletion
        fs.writeFileSync("deleted_lesson_ids.json", JSON.stringify(idsToDelete));
        log(`IDs backed up to deleted_lesson_ids.json`);

        // Delete related conversationLines first
        log("\nDeleting related conversation lines...");
        for (const id of idsToDelete) {
            await db.delete(conversationLines).where(eq(conversationLines.lessonId, id));
        }
        log(`Deleted conversation lines for ${idsToDelete.length} lessons.`);

        // Delete related vocabulary
        log("\nDeleting related vocabulary...");
        for (const id of idsToDelete) {
            await db.delete(vocabulary).where(eq(vocabulary.lessonId, id));
        }
        log(`Deleted vocabulary for ${idsToDelete.length} lessons.`);

        // Delete related progress
        log("\nDeleting related progress...");
        for (const id of idsToDelete) {
            await db.delete(progress).where(eq(progress.lessonId, id));
        }
        log(`Deleted progress for ${idsToDelete.length} lessons.`);

        // Delete lessons in batches
        log("\nDeleting lessons...");
        const batchSize = 100;
        for (let i = 0; i < idsToDelete.length; i += batchSize) {
            const batch = idsToDelete.slice(i, i + batchSize);
            await db.delete(lessons).where(inArray(lessons.id, batch));
            log(`  Deleted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(idsToDelete.length / batchSize)}`);
        }

        // Verify
        const remainingLessons = await db.select().from(lessons);
        log(`\n--- CLEANUP COMPLETE ---`);
        log(`Removed: ${lowQualityLessons.length} lessons`);
        log(`Remaining: ${remainingLessons.length} lessons`);

        process.exit(0);
    } catch (error) {
        log(`Error: ${error}`);
        process.exit(1);
    }
}

cleanupLowQualityLessons();
