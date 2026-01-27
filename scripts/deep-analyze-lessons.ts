
import { db } from "../server/db";
import { lessons } from "@shared/schema";
import fs from "fs";

async function deepAnalysis() {
    const logFile = "deep_analysis.txt";
    const log = (msg: string) => {
        console.log(msg);
        fs.appendFileSync(logFile, msg + "\n");
    };

    fs.writeFileSync(logFile, "Deep Lesson Analysis\n====================\n\n");

    try {
        const allLessons = await db.select().from(lessons);
        log(`Total lessons: ${allLessons.length}\n`);

        // Group by category
        const categories = new Map<string, number>();
        for (const lesson of allLessons) {
            const cat = lesson.category || "uncategorized";
            categories.set(cat, (categories.get(cat) || 0) + 1);
        }

        log("--- LESSONS BY CATEGORY ---");
        for (const [cat, count] of Array.from(categories.entries()).sort((a, b) => b[1] - a[1])) {
            log(`  ${cat}: ${count}`);
        }

        // Check for similar content (first 100 chars)
        log("\n--- CHECKING CONTENT SIMILARITY ---");
        const contentHashes = new Map<string, number[]>();
        for (const lesson of allLessons) {
            const contentStart = (lesson.content || "").substring(0, 100).toLowerCase().trim();
            if (contentStart.length > 20) {
                if (!contentHashes.has(contentStart)) {
                    contentHashes.set(contentStart, []);
                }
                contentHashes.get(contentStart)!.push(lesson.id);
            }
        }

        const similarContent = Array.from(contentHashes.entries())
            .filter(([_, ids]) => ids.length > 1);

        log(`Content similarity groups (same first 100 chars): ${similarContent.length}`);
        for (const [content, ids] of similarContent.slice(0, 10)) {
            log(`  "${content.substring(0, 40)}..." -> ${ids.length} lessons (IDs: ${ids.slice(0, 5).join(", ")}${ids.length > 5 ? "..." : ""})`);
        }

        // Check for short/empty content
        const shortLessons = allLessons.filter(l =>
            (!l.content || l.content.length < 100) &&
            (!l.contentBlocks || l.contentBlocks.length < 50)
        );
        log(`\n--- SHORT/EMPTY CONTENT LESSONS: ${shortLessons.length} ---`);
        for (const lesson of shortLessons.slice(0, 10)) {
            log(`  ID ${lesson.id}: "${lesson.title.substring(0, 40)}..." (content: ${lesson.content?.length || 0} chars)`);
        }

        // Sample 10 random lessons to show their structure
        log("\n--- SAMPLE LESSONS (first 10 by order) ---");
        const sampleLessons = allLessons.slice(0, 10);
        for (const lesson of sampleLessons) {
            log(`  ID ${lesson.id} | Order ${lesson.order} | "${lesson.title.substring(0, 50)}..." | Cat: ${lesson.category} | Diff: ${lesson.difficulty}`);
        }

        // Find lessons that might be test/dev data
        log("\n--- POTENTIAL TEST DATA (checking patterns) ---");
        const testPatterns = allLessons.filter(l =>
            l.title.match(/test|sample|todo|fixme|xxx|placeholder/i) ||
            l.description?.match(/test|sample|todo|fixme|xxx/i)
        );
        log(`Lessons with test-like patterns: ${testPatterns.length}`);
        for (const lesson of testPatterns.slice(0, 20)) {
            log(`  ID ${lesson.id}: "${lesson.title}"`);
        }

        process.exit(0);
    } catch (error) {
        log(`Error: ${error}`);
        process.exit(1);
    }
}

deepAnalysis();
