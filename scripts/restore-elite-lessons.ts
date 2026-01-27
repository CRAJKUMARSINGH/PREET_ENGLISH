
/**
 * RESTORE ELITE LESSONS
 * Restores high-quality, app-inspired lessons using direct SQLite access.
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';
import { slugify } from '../client/src/lib/slugify'; // Optional, or simple regex replacement

dotenv.config();

const dbPath = (process.env.DATABASE_URL || 'preet_english.db').replace('file:', '');
const db = new Database(dbPath);

const eliteLessons = [
    {
        title: "Mastering the 'V' vs 'W' Distinction",
        hindiTitle: "'V' और 'W' के बीच के अंतर में महारत",
        category: "Pronunciation",
        difficulty: "Beginner",
        content: `
# Mastering the 'V' vs 'W' Distinction ('V' और 'W' के बीच का अंतर)

## 🎯 Learning Objective (सीखने का उद्देश्य)
Understand and practice the physical mouth positions for the English 'V' and 'W' sounds to reduce accent and improve clarity.
(हिंदी भाषियों के लिए 'V' और 'W' की आवाज़ों के बीच के अंतर को समझना और सही उच्चारण का अभ्यास करना।)

---

## 📘 Pronunciation Guide (ELSA Speak Style)

For many Hindi speakers, 'V' and 'W' are pronounced the same (like the Hindi 'व'). However, in English, they use completely different mouth positions.

### 1. The 'V' Sound (Fricative)
- **Mouth Position:** Place your top teeth gently on your bottom lip.
- **Action:** Blow air through the gap while vibrating your vocal cords. It should feel like a 'buzzing' sensation on your lip.
- **Hindi Reference:** think of 'व' but with more 'friction' from the teeth.

### 2. The 'W' Sound (Gliding)
- **Mouth Position:** Round your lips into a tight 'O' shape (like you are about to whistle or say 'oo').
- **Action:** Quickly move your lips outward. Your teeth should NOT touch your lips.
- **Hindi Reference:** This is closer to the 'उ' sound moving into a vowel.

---

## 🎶 Sound Matching (ध्वनि मिलान)
Practice these "Minimal Pairs" to hear the difference:
- **Vest** (बनियान) vs **West** (पश्चिम)
- **Vine** (बेल) vs **Wine** (शराब)
- **Veal** (बछड़े का मांस) vs **Wheel** (पहिया)

---

## 💡 Pro Tips for Accent Reduction
- **Mirror Practice:** Watch your mouth. If you see your teeth on your lip for 'W', it's wrong!
- **The Tissue Test:** Hold a tissue in front of your mouth for 'W'. It should move slightly from the puff of air.
`,
        vocab: [
            { word: "Minimal Pair", def: "Two words that differ by only one sound.", h: "न्यूनतम युग्म" },
            { word: "Fricative", def: "A sound made by forcing air through a narrow gap.", h: "संघर्षी" },
            { word: "Vibrate", def: "To move back and forth quickly.", h: "कंपन" }
        ]
    },
    {
        title: "The 'Elevator Pitch' for Networking",
        hindiTitle: "नेटवर्किंग के लिए 'एलीवेटर पिच'",
        category: "Public Speaking",
        difficulty: "Intermediate",
        content: `
# The 'Elevator Pitch' for Networking (नेटवर्किंग के लिए 'एलीवेटर पिच')

## 🎯 Learning Objective (सीखने का उद्देश्य)
Learn how to introduce yourself and your work in under 30 seconds with a professional tone.
(30 सेकंड से कम समय में पेशेवर लहजे में अपना और अपने काम का परिचय देना सीखें।)

---

## 📘 Public Speaking Insight (Orai/Cambly Style)

An "Elevator Pitch" is a short summary used to quickly and simply define a profession, product, or service. It should be as long as an elevator ride (30-60 seconds).

### Key Components:
1. **The Hook:** Who are you?
2. **The Problem:** What do you solve?
3. **The Value:** Why are you the best?
4. **The Call to Action:** What do you want next?

---

## 💡 Tone & Pitch (लहजा और पिच)
In professional English, your **Intonation** (how your voice goes up and down) communicates confidence.
- **Rising Intonation:** Used for questions. (Avoid this when stating your name!)
- **Falling Intonation:** Used for statements. Use this for your name to sound authoritative.
- **Bad Habit:** "Up-talking" (ending every sentence like a question) can make you sound unsure.

---

## 📝 The Framework
"Hi, I'm **[Name]**. I help **[Target Audience]** achieve **[Benefit]** by **[Your Method]**. Currently, I'm looking to **[Your Goal]**."

---

## 🚀 Pro Tip
Record yourself on your phone. Listen back. Are you speaking too fast? Aim for 130-150 words per minute.
`,
        vocab: [
            { word: "Elevator Pitch", def: "A short, persuasive speech.", h: "संक्षिप्त और प्रेरक भाषण" },
            { word: "Intonation", def: "The rise and fall of the voice in speaking.", h: "स्वर का उतार-चढ़ाव" },
            { word: "Authoritative", def: "Sounding commanding and self-confident.", h: "अधिकारपूर्ण" }
        ]
    }
];

async function seedElite() {
    console.log('=== RESTORING ELITE LESSONS ===\n');

    const insertLessonStmt = db.prepare(`
        INSERT INTO lessons (title, hindi_title, slug, description, hindi_description, content, category, difficulty, "order", image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertVocabStmt = db.prepare(`
        INSERT INTO vocabulary (lesson_id, word, definition, hindi_translation, example, pronunciation)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const l of eliteLessons) {
        try {
            console.log(`Processing: ${l.title}`);
            const slug = l.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);

            const result = insertLessonStmt.run(
                l.title,
                l.hindiTitle,
                slug,
                `App-inspired ${l.category} practice.`,
                `${l.category} के लिए बेहतरीन अभ्यास।`,
                JSON.stringify({ blocks: [{ type: "markdown", content: l.content }] }),
                l.category,
                l.difficulty,
                200,
                "https://plus.unsplash.com/premium_photo-1661632733475-6e42661f4961?auto=format&fit=crop&q=80"
            );

            const newId = result.lastInsertRowid;

            for (const v of l.vocab) {
                insertVocabStmt.run(
                    newId,
                    v.word,
                    v.def,
                    v.h,
                    `Self-practice: Use '${v.word}' in a sentence.`,
                    "/-/" // Placeholder pronunciation
                );
            }
            console.log(`✅ Restored: ${l.title}`);
        } catch (err: any) {
            if (err.message.includes('UNIQUE')) {
                console.log(`⏭️ Skipped (Exists): ${l.title}`);
            } else {
                console.error(`❌ Error: ${l.title}`, err.message);
            }
        }
    }
    console.log('\n=== ELITE LESSONS RESTORED ===');
}

seedElite();
