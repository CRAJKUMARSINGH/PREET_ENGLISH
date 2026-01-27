
import { db } from "../server/db";
import { lessons } from "@shared/schema";
import fs from "fs";

async function analyzeLessons() {
    const logFile = "lesson_analysis.txt";
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + "\n");
    };

    fs.writeFileSync(logFile, "Lesson Analysis Report\n======================\n\n");

    try {
        const allLessons = await db.select().from(lessons);
        log(`Total lessons: ${allLessons.length}\n`);

        // 1. Find exact title duplicates
        const titleCounts = new Map<string, number[]>();
        for (const lesson of allLessons) {
            const title = lesson.title.toLowerCase().trim();
            if (!titleCounts.has(title)) {
                titleCounts.set(title, []);
            }
            titleCounts.get(title)!.push(lesson.id);
        }

        const duplicateTitles = Array.from(titleCounts.entries())
            .filter(([_, ids]) => ids.length > 1);

        log(`\n--- DUPLICATE TITLES (${duplicateTitles.length} groups) ---`);
        for (const [title, ids] of duplicateTitles.slice(0, 20)) {
            log(`  "${title.substring(0, 50)}..." -> IDs: ${ids.join(", ")}`);
        }
        if (duplicateTitles.length > 20) {
            log(`  ... and ${duplicateTitles.length - 20} more duplicate groups`);
        }

        // 2. Identify potential fake/placeholder lessons
        const suspiciousPatterns = [
            /^test/i,
            /^sample/i,
            /^placeholder/i,
            /^lorem/i,
            /^untitled/i,
            /^lesson \d+$/i,
            /^new lesson/i,
        ];

        const fakeLessons = allLessons.filter(lesson =>
            suspiciousPatterns.some(pattern => pattern.test(lesson.title)) ||
            !lesson.content || lesson.content.length < 50
        );

        log(`\n--- POTENTIALLY FAKE/PLACEHOLDER LESSONS (${fakeLessons.length}) ---`);
        for (const lesson of fakeLessons.slice(0, 20)) {
            log(`  ID ${lesson.id}: "${lesson.title.substring(0, 40)}..." (content length: ${lesson.content?.length || 0})`);
        }
        if (fakeLessons.length > 20) {
            log(`  ... and ${fakeLessons.length - 20} more suspicious lessons`);
        }

        // 3. Summary stats
        const totalDuplicateIds = duplicateTitles.reduce((sum, [_, ids]) => sum + ids.length - 1, 0);
        log(`\n--- SUMMARY ---`);
        log(`Total lessons: ${allLessons.length}`);
        log(`Duplicate title groups: ${duplicateTitles.length}`);
        log(`Total duplicate entries to remove (keeping 1 each): ${totalDuplicateIds}`);
        log(`Potentially fake/placeholder: ${fakeLessons.length}`);

        // 4. Output IDs for removal
        const idsToRemove: number[] = [];

        // Add duplicate IDs (keep the first, remove the rest)
        for (const [_, ids] of duplicateTitles) {
            idsToRemove.push(...ids.slice(1)); // Keep first, remove rest
        }

        log(`\n--- IDs RECOMMENDED FOR REMOVAL ---`);
        log(`Duplicate IDs to remove: ${idsToRemove.length}`);

        // Write IDs to a separate file for the cleanup script
        fs.writeFileSync("duplicate_ids.json", JSON.stringify(idsToRemove));
        log(`\nDuplicate IDs written to duplicate_ids.json`);

        process.exit(0);
    } catch (error) {
        log(`Error: ${error}`);
        process.exit(1);
    }
}

analyzeLessons();
