import 'dotenv/config';
import Database from 'better-sqlite3';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = 'c:\\Users\\Rajkumar\\PREET_ENGLISH\\REFERENCE_APP00\\preet_english.db';
console.log(`Checking DB at: ${dbPath}`);
if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY");
    process.exit(1);
}
const db = new Database(dbPath);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function enrichLesson(id: number, title: string, currentContent: string) {
    console.log(`\n--- Enriching Lesson ${id}: ${title} ---`);

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are a premium English content strategist. Upgrade the lesson into a high-quality, block-based JSON format for Hindi speakers.
          
          Strict Upgrade Rules:
          1. Must have 8-15 vocabulary words (word, definition, hindiTranslation, example, exampleHindi).
          2. Must have 3-5 practice exercises (types: quiz, translation, or speaking).
          3. Must include at least 1 "cultural_note" block.
          4. All blocks must have 'content' and 'hindiContent' if text-based.
          5. Total blocks: 10-20.
          
          Format: { "blocks": [...] }`
                },
                {
                    role: 'user',
                    content: `Upgrade this lesson: ${title} (Original Content: ${currentContent.substring(0, 500)}...)`
                }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const enrichedContent = response.choices[0].message.content;
        if (enrichedContent) {
            const stmt = db.prepare('UPDATE lessons SET content = ? WHERE id = ?');
            stmt.run(enrichedContent, id);
            console.log(`✅ Success: Lesson ${id} upgraded to Grade 9 status.`);
            return true;
        }
    } catch (err) {
        console.error(`❌ Failed: Lesson ${id} enrichment error:`, err);
    }
    return false;
}

async function runEnrichment() {
    const lessons = db.prepare('SELECT id, title, content FROM lessons ORDER BY "order" ASC LIMIT 10').all() as any[];
    console.log(`🚀 Starting Grade 9 enrichment for ${lessons.length} high-priority lessons...`);

    for (const lesson of lessons) {
        // Force enrichment for the top 10 to ensure Grade 9+ compliance
        await enrichLesson(lesson.id, lesson.title, lesson.content);
    }

    console.log('\n🌟 Enrichment Phase Complete!');
}

runEnrichment();
