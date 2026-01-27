
import { db } from "../server/db";
import { lessons } from "@shared/schema";
import fs from "fs";

async function verifyLessons() {
    const logFile = "verification_result.txt";
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + "\n");
    };

    // Clear previous log
    fs.writeFileSync(logFile, "Verification Report\n===================\n");

    try {
        const allLessons = await db.select().from(lessons);
        log(`Total lessons found: ${allLessons.length}`);

        if (allLessons.length === 0) {
            log("WARNING: No lessons found in the database!");
            return;
        }

        let validCount = 0;
        let issues = 0;

        for (const lesson of allLessons) {
            // Check for strictly required fields for the app to work
            const hasTitle = !!lesson.title;
            // Content must exist (either content or contentBlocks or both)
            const hasContent = !!(lesson.content || lesson.contentBlocks);

            const isValid = hasTitle && hasContent;

            if (isValid) {
                validCount++;
            } else {
                log(`[FAIL] Lesson ID ${lesson.id} ("${lesson.title || 'Untitled'}") is invalid. Missing content or title.`);
                issues++;
            }
        }

        log(`Valid lessons: ${validCount}`);

        if (issues > 0) {
            log(`[FAILURE] Issues found: ${issues}`);
        } else {
            log("[SUCCESS] All lessons found are valid.");
        }

        // Check for specific lesson 1 as example
        const lesson1 = allLessons.find(l => l.order === 1 || l.id === 1);
        if (lesson1) {
            log(`[INFO] Lesson 1 exists: ID ${lesson1.id}, Title: "${lesson1.title}"`);
        } else {
            log("[WARN] Lesson 1 (or order 1) not found.");
        }

        process.exit(0);

    } catch (error) {
        log(`[ERROR] Error fetching lessons: ${error}`);
        process.exit(1);
    }
}

verifyLessons();
