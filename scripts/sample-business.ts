
import { db } from "../server/db";
import { lessons } from "@shared/schema";
import { eq } from "drizzle-orm";
import fs from "fs";

async function sampleBusinessLessons() {
    const logFile = "business_sample.txt";
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + "\n");
    };

    fs.writeFileSync(logFile, "Business Lessons Sample\n=======================\n\n");

    try {
        const businessLessons = await db.select().from(lessons).where(eq(lessons.category, "Business"));
        log(`Total Business lessons: ${businessLessons.length}\n`);

        // Sample 5 random Business lessons
        const sample = businessLessons.slice(0, 5);
        for (const lesson of sample) {
            log(`\n--- LESSON ID ${lesson.id} ---`);
            log(`Title: ${lesson.title}`);
            log(`Hindi: ${lesson.hindiTitle || "N/A"}`);
            log(`Difficulty: ${lesson.difficulty}`);
            log(`Content (first 300 chars):\n${lesson.content?.substring(0, 300) || "EMPTY"}...`);
            log(`Content length: ${lesson.content?.length || 0}`);
        }

        // Check content length distribution
        const lengths = businessLessons.map(l => l.content?.length || 0);
        const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
        const minLength = Math.min(...lengths);
        const maxLength = Math.max(...lengths);

        log(`\n--- CONTENT LENGTH STATS ---`);
        log(`Average: ${Math.round(avgLength)} chars`);
        log(`Min: ${minLength} chars`);
        log(`Max: ${maxLength} chars`);

        // Count very short business lessons
        const shortBusiness = businessLessons.filter(l => (l.content?.length || 0) < 200);
        log(`Business lessons with < 200 chars: ${shortBusiness.length}`);

        process.exit(0);
    } catch (error) {
        log(`Error: ${error}`);
        process.exit(1);
    }
}

sampleBusinessLessons();
