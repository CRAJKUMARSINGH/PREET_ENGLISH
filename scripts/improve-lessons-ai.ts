
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines, Lesson } from "../shared/schema";
import { eq, inArray, and } from "drizzle-orm";
import OpenAI from "openai";
import fs from "fs";

/**
 * ENHANCED AI LESSON IMPROVER (App-Inspired)
 * Rotates through themes: ELSA (Pronunciation), Speak (AI Partner), Andy (Casual), Orai (Public Speaking)
 */

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const PROGRESS_FILE = "improvement_progress.json";

function loadProgress() {
    if (fs.existsSync(PROGRESS_FILE)) {
        return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
    }
    return { completedIds: [] };
}

function saveProgress(completedIds: number[]) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ completedIds }, null, 2));
}

const THEMES = [
    {
        name: "Pronunciation & Accent (ELSA Style)",
        focus: "IPA guides, syllable stress, accent reduction, and common pronunciation pitfalls for Hindi speakers.",
        promptExtra: "Include a section on 'Sound Matching' where you compare similar English sounds that are tricky for Hindi speakers (e.g., 'v' vs 'w', 'th' vs 'dh')."
    },
    {
        name: "AI Conversation Partner (Speak/TalkPal Style)",
        focus: "Interactive-style roleplay, natural responses, and situational fluency.",
        promptExtra: "Focus heavily on the 'Conversation' block. Make it 6-8 lines long and include 'User Options' (suggested things the student could say next)."
    },
    {
        name: "Casual Social Chat (Andy style)",
        focus: "Idioms, slang, casual greetings, and friendly social English.",
        promptExtra: "Use a friendly, upbeat tone. Explain one common English idiom in detail with its cultural context."
    },
    {
        name: "Public Speaking & Business (Orai/Cambly style)",
        focus: "Presentation skills, meeting etiquette, tone detection, and professional vocabulary.",
        promptExtra: "Include a section on 'Tone & Pitch' - explaining how the same sentence can mean different things depending on emphasis."
    }
];

async function improveLesson(lesson: Lesson, themeIdx: number) {
    const theme = THEMES[themeIdx % THEMES.length];
    console.log(`\n✨ Improving Lesson: [${theme.name}] ${lesson.title} (ID: ${lesson.id})`);

    const prompt = `
    You are an expert English teacher for Hindi speakers. 
    Theme: ${theme.name}
    Focus: ${theme.focus}
    Extra Instructions: ${theme.promptExtra}
    
    Lesson Title: "${lesson.title}"
    Category: ${lesson.category}
    
    REQUIRED FORMAT (Markdown):
    # ${lesson.title} (${lesson.hindiTitle || lesson.title})
    
    ## 🎯 Learning Objective (सीखने का उद्देश्य)
    [Bilingual Objective]
    
    ---
    
    ## 📘 ${theme.name} Focus
    [Detailed explanation in English and Hindi. Use bullet points. Ensure content length is substantial (>1000 characters total for the whole lesson).]
    
    ---
    
    ## 💡 Practice Tips (अभ्यास का सुझाव)
    [Bilingual tips related to ${theme.name}]
    
    ---
    
    ## 📝 Practical Example / Context
    [Detailed scenario]
    
    VOCABULARY JSON (Last line of response, strictly JSON):
    VOCAB: [{"word": "...", "definition": "...", "hindi": "...", "pronunciation": "...", "example": "..."}, ...]
    
    CONVERSATION JSON (Strictly JSON after VOCAB):
    CONV: [{"speaker": "...", "english": "...", "hindi": "...", "emoji": "..."}]
    `;

    try {

        // Attempt primary model, fallback to cheaper model on quota errors
        let response;
        try {
            response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
            });
        } catch (err: any) {
            if (err?.message?.includes("quota")) {
                console.warn("⚠️ Primary model quota exceeded, falling back to gpt-3.5-turbo");
                response = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7,
                });
            } else {
                throw err;
            }
        }
        const rawResult = response.choices[0].message.content || "";

        const content = rawResult.split("VOCAB:")[0].trim();
        const vocabMatch = rawResult.match(/VOCAB:\s*(\[.*\])/s);
        const convMatch = rawResult.match(/CONV:\s*(\[.*\])/s);

        let vocabList = [];
        try { vocabList = vocabMatch ? JSON.parse(vocabMatch[1]) : []; } catch (e) { }

        let convList = [];
        try { convList = convMatch ? JSON.parse(convMatch[1]) : []; } catch (e) { }

        await db.update(lessons).set({ content }).where(eq(lessons.id, lesson.id));
        await db.delete(vocabulary).where(eq(vocabulary.lessonId, lesson.id));
        await db.delete(conversationLines).where(eq(conversationLines.lessonId, lesson.id));

        for (const v of vocabList) {
            await db.insert(vocabulary).values({
                lessonId: lesson.id,
                word: v.word,
                definition: v.definition,
                hindiTranslation: v.hindi,
                pronunciation: v.pronunciation || "/.../",
                example: v.example
            });
        }

        for (let i = 0; i < convList.length; i++) {
            const c = convList[i];
            await db.insert(conversationLines).values({
                lessonId: lesson.id,
                speaker: c.speaker,
                englishText: c.english,
                hindiText: c.hindi,
                emoji: c.emoji || "👤",
                lineOrder: i + 1
            });
        }

        return true;
    } catch (error: any) {
        console.error(`❌ Error: ${error?.message || error}`);
        if (error?.message?.includes("quota")) return "QUOTA_EXCEEDED";
        return false;
    }
}

async function runImprovement() {
    console.log("🚀 Starting AI App-Inspired Improvement Process...");

    const allLessons = await db.select().from(lessons);
    const allVocab = await db.select().from(vocabulary);
    const allConv = await db.select().from(conversationLines);

    const vocabCountMap = new Map();
    allVocab.forEach(v => vocabCountMap.set(v.lessonId, (vocabCountMap.get(v.lessonId) || 0) + 1));
    const convCountMap = new Map();
    allConv.forEach(c => convCountMap.set(c.lessonId, (convCountMap.get(c.lessonId) || 0) + 1));

    const toImproveIDs = fs.existsSync('failed_lessons.json')
        ? JSON.parse(fs.readFileSync('failed_lessons.json', 'utf-8'))
        : [];

    const lowQuality = allLessons.filter(l =>
        // 1. In the failed list (from Audit)
        toImproveIDs.includes(l.id) ||
        // 2. Truly empty/short content
        !l.content || l.content.length < 800 ||
        // 3. Explicitly marked for AI upgrade
        (l.description && l.description.includes("[AI_TARGET_APP]")) ||
        // 4. Missing components
        (vocabCountMap.get(l.id) || 0) === 0 ||
        (convCountMap.get(l.id) || 0) === 0
    );

    const progress = loadProgress();
    const completedIds = new Set(progress.completedIds as number[]);
    const toImprove = lowQuality.filter(l => !completedIds.has(l.id));

    console.log(`Targeting for Improvement (Source: Audit + Heuristics): ${lowQuality.length}`);
    console.log(`Already Improved: ${completedIds.size}`);
    console.log(`Remaining to improve: ${toImprove.length}`);

    if (toImprove.length === 0) {
        console.log("✅ All targeted lessons are already improved!");
        process.exit(0);
    }

    const batchSize = 25; // Small batch for testing
    const currentBatch = toImprove.slice(0, batchSize);

    for (let i = 0; i < currentBatch.length; i++) {
        const result = await improveLesson(currentBatch[i], i);
        if (result === true) {
            completedIds.add(currentBatch[i].id);
            saveProgress(Array.from(completedIds));
        } else if (result === "QUOTA_EXCEEDED") {
            console.log("⚠️ Quota exceeded. Stopping batch.");
            break;
        }
    }

    console.log(`\n✅ Finished batch processing.`);
    process.exit(0);
}

runImprovement();
