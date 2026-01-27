
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "@shared/schema";

async function verifyQuality() {
    console.log("🧐 Auditing content quality (Optimized Batch)...");

    const all = await db.select().from(lessons);
    const allVocab = await db.select().from(vocabulary);
    const allConv = await db.select().from(conversationLines);

    const vocabMap = new Map();
    allVocab.forEach(v => {
        const list = vocabMap.get(v.lessonId) || [];
        list.push(v);
        vocabMap.set(v.lessonId, list);
    });

    const convMap = new Map();
    allConv.forEach(c => {
        const list = convMap.get(c.lessonId) || [];
        list.push(c);
        convMap.set(c.lessonId, list);
    });

    let lowQuality = 0;
    let missingVocab = 0;
    let missingConv = 0;
    let shortContent = 0;

    for (const lesson of all) {
        const isShort = !lesson.content || lesson.content.length < 500;
        if (isShort) shortContent++;

        const vocabs = vocabMap.get(lesson.id) || [];
        if (vocabs.length === 0) missingVocab++;

        const convs = convMap.get(lesson.id) || [];
        if (convs.length === 0) missingConv++;

        if (isShort || vocabs.length === 0 || convs.length === 0) {
            lowQuality++;
        }
    }

    console.log(`\n--- AUDIT REPORT ---`);
    console.log(`Total Lessons: ${all.length}`);
    console.log(`Short Content (<500 chars): ${shortContent}`);
    console.log(`Missing Vocabulary: ${missingVocab}`);
    console.log(`Missing Conversations: ${missingConv}`);
    console.log(`Total "Low Quality" Flagged: ${lowQuality}`);

    process.exit(0);
}

verifyQuality();
