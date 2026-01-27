
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines, Lesson } from "../shared/schema";
import { eq, inArray, and } from "drizzle-orm";
import OpenAI from "openai";
import fs from "fs";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "dummy_key_for_no_crash",
});

const PROGRESS_FILE = "improvement_progress_sprint.json";

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

    // If no API key, simulate success for demonstration if strictly necessary, but preferably fail.
    if (!process.env.OPENAI_API_KEY) {
        console.warn("⚠️ No OPENAI_API_KEY found. Skipping AI generation.");
        return "SKIPPED_NO_KEY";
    }

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
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost effective and fast
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const rawResult = response.choices[0].message.content || "";

        // Extract content using the markers
        const contentParts = rawResult.split("VOCAB:");
        const content = contentParts[0].trim();

        let vocabList = [];
        let convList = [];

        if (contentParts.length > 1) {
            const jsonPart = "VOCAB:" + contentParts[1];

            const vocabMatch = jsonPart.match(/VOCAB:\s*(\[.*?\])/s);
            const convMatch = jsonPart.match(/CONV:\s*(\[.*?\])/s);

            if (vocabMatch) {
                try { vocabList = JSON.parse(vocabMatch[1]); } catch (e) {
                    console.error("Failed to parse VOCAB JSON", e);
                }
            }
            if (convMatch) {
                try { convList = JSON.parse(convMatch[1]); } catch (e) {
                    console.error("Failed to parse CONV JSON", e);
                }
            }
        }

        // Update database
        await db.update(lessons).set({
            content: content
            // We could also update hindiTitle if we parsed it, but content is main target
        }).where(eq(lessons.id, lesson.id));

        // Refresh vocab if we got new ones (optional: merge or replace? Plan said replace)
        if (vocabList.length > 0) {
            await db.delete(vocabulary).where(eq(vocabulary.lessonId, lesson.id));
            for (const v of vocabList) {
                await db.insert(vocabulary).values({
                    lessonId: lesson.id,
                    word: v.word,
                    definition: v.definition,
                    hindiTranslation: v.hindi,
                    pronunciation: v.pronunciation || "/.../",
                    example: v.example
                    // Add tier 1 fields if available or default
                });
            }
        }

        // Refresh conversation if we got new ones
        if (convList.length > 0) {
            await db.delete(conversationLines).where(eq(conversationLines.lessonId, lesson.id));
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
        }

        return true;
    } catch (error: any) {
        console.error(`❌ Error in lesson ${lesson.id}: ${error?.message || error}`);
        if (error?.message?.includes("429") || error?.message?.includes("quota")) return "QUOTA_EXCEEDED";
        return false;
    }
}

async function runImprovement() {
    console.log("🚀 Starting AI SPRINT Improvement Process...");

    if (!process.env.OPENAI_API_KEY) {
        console.error("❌ ERROR: OPENAI_API_KEY is not set in environment variables.");
        console.log("Please set the key to proceed with AI enhancements.");
        process.exit(1);
    }

    const allLessons = await db.select().from(lessons);

    // Filter for lessons that need improvement (Tier 1: low hindi content)
    // We check for absence of Hindi chars in content as a heuristic
    const lowQuality = allLessons.filter(l =>
        !l.content ||
        !l.content.match(/[\u0900-\u097F]/) || // Hindi Unicode range
        l.content.length < 800
    );

    const progress = loadProgress();
    const completedIds = new Set(progress.completedIds as number[]);
    const toImprove = lowQuality.filter(l => !completedIds.has(l.id));

    console.log(`Total lessons: ${allLessons.length}`);
    console.log(`Identified for improvement: ${lowQuality.length}`);
    console.log(`Already completed: ${completedIds.size}`);
    console.log(`Remaining to improve: ${toImprove.length}`);

    if (toImprove.length === 0) {
        console.log("✅ All targeted lessons are already improved!");
        process.exit(0);
    }

    // Process in a limited batch for this sprint run (e.g. 50 to start, monitoring)
    const BATCH_SIZE = 50;
    const currentBatch = toImprove.slice(0, BATCH_SIZE);

    console.log(`Processing batch of ${currentBatch.length} lessons...`);

    let successCount = 0;
    for (let i = 0; i < currentBatch.length; i++) {
        const result = await improveLesson(currentBatch[i], i);
        if (result === true) {
            successCount++;
            completedIds.add(currentBatch[i].id);
            saveProgress(Array.from(completedIds));
        } else if (result === "QUOTA_EXCEEDED") {
            console.log("⚠️ Quota exceeded. Stopping batch.");
            break;
        } else if (result === "SKIPPED_NO_KEY") {
            break;
        }
    }

    console.log(`\n✅ Finished batch processing. Successfully improved: ${successCount} lessons.`);
    process.exit(0);
}

runImprovement();
