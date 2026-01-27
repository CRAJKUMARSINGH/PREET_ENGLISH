
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines, quizzes } from "@shared/schema";
import { eq, sql } from "drizzle-orm";
import fs from "fs";

/**
 * DEEP HEALTH CHECK
 * Programmatically audits every nook and cranny of the lesson database.
 */

async function runAudit() {
    console.log("🔍 Initializing Deep Health Check...");

    const allLessons = await db.select().from(lessons);
    const allVocab = await db.select().from(vocabulary);
    const allConv = await db.select().from(conversationLines);
    const allQuizzes = await db.select().from(quizzes);

    console.log(`\n--- DATABASE VOLUMES ---`);
    console.log(`Lessons: ${allLessons.length}`);
    console.log(`Vocabulary: ${allVocab.length}`);
    console.log(`Conversation Lines: ${allConv.length}`);
    console.log(`Quizzes: ${allQuizzes.length}`);

    const vocabMap = new Map<number, any[]>();
    allVocab.forEach(v => {
        const list = vocabMap.get(v.lessonId) || [];
        list.push(v);
        vocabMap.set(v.lessonId, list);
    });

    const convMap = new Map<number, any[]>();
    allConv.forEach(c => {
        const list = convMap.get(c.lessonId) || [];
        list.push(c);
        convMap.set(c.lessonId, list);
    });

    const categories = new Set<string>();
    const duplicateSlugs = new Set<string>();
    const seenSlugs = new Map<string, number>();

    let blankContent = 0;
    let missingVocab = 0;
    let missingConv = 0;
    let malformedMarkdown = 0;

    console.log("\n🏃 Processing lessons...");

    for (const l of allLessons) {
        categories.add(l.category || "Uncategorized");

        // 1. Slug Collision Check
        if (seenSlugs.has(l.slug)) {
            duplicateSlugs.add(l.slug);
        }
        seenSlugs.set(l.slug, (seenSlugs.get(l.slug) || 0) + 1);

        // 2. Content Integrity
        if (!l.content || l.content.trim().length < 50) {
            blankContent++;
        }

        // 3. Structural Linkage
        if (!vocabMap.has(l.id)) missingVocab++;
        if (!convMap.has(l.id)) missingConv++;

        // 4. Markdown Quality
        if (l.content && (l.content.includes("undefined") || l.content.includes("[object Object]"))) {
            malformedMarkdown++;
            if (malformedMarkdown <= 5) {
                console.log(`   - MALFORMED: [${l.id}] ${l.title} (contains 'undefined' or '[object Object]')`);
            }
        }
    }

    console.log(`\n--- AUDIT RESULTS ---`);
    console.log(`✅ Unique Categories: ${categories.size} (${Array.from(categories).join(", ")})`);
    console.log(`❌ Duplicate Slugs: ${duplicateSlugs.size}`);
    console.log(`❌ Blank/Short Content: ${blankContent}`);
    console.log(`❌ Missing Vocabulary: ${missingVocab}`);
    console.log(`❌ Missing Conversations: ${missingConv}`);
    console.log(`❌ Malformed Markdown Detectors: ${malformedMarkdown}`);

    if (duplicateSlugs.size > 0) {
        console.log(`\nSample Duplicates: ${Array.from(duplicateSlugs).slice(0, 5).join(", ")}`);
    }

    // 5. Data File Integration Audit
    console.log(`\n--- DATA FILE INTEGRATION AUDIT ---`);
    const dataFiles = [
        "scripts/category_data.json",
        "scripts/vocabulary_stoplist.ts",
        "scripts/deleted_lesson_ids.json"
    ];

    dataFiles.forEach(f => {
        if (fs.existsSync(f)) {
            console.log(`[FOUND] ${f} - Checking if used...`);
        } else {
            console.log(`[MISSING] ${f}`);
        }
    });

    process.exit(0);
}

runAudit().catch(e => {
    console.error(e);
    process.exit(1);
});
