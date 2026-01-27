
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "@shared/schema";

/**
 * ELITE LESSON INJECTOR
 * Demonstration of high-quality, app-inspired lessons.
 */

const eliteLessons = [
    {
        title: "Mastering the 'V' vs 'W' Distinction",
        hindiTitle: "'V' और 'W' के बीच के अंतर में महारत",
        category: "Pronunciation (ELSA Style)",
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
        ],
        conv: [
            { spk: "Tutor", en: "Let's practice. Say 'The West is very vast'.", hi: "चलो अभ्यास करते हैं। कहो 'पश्चिम बहुत विशाल है'।" },
            { spk: "Student", en: "The West is very vast.", hi: "पश्चिम बहुत विशाल है।" },
            { spk: "Tutor", en: "Good, but round your lips more for 'West'. Don't let your teeth touch!", hi: "अच्छा है, लेकिन 'West' के लिए अपने होठों को और गोल करें।" },
            { spk: "Student", en: "W-west... oh, I see! The West is very vast.", hi: "पश्चिम... ओह, समझ गया! पश्चिम बहुत विशाल है।" }
        ]
    },
    {
        title: "The 'Elevator Pitch' for Networking",
        hindiTitle: "नेटवर्किंग के लिए 'एलीवेटर पिच'",
        category: "Public Speaking (Orai Style)",
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
        ],
        conv: [
            { spk: "Professional A", en: "So, what do you do for a living?", hi: "तो, आप जीविका के लिए क्या करते हैं?" },
            { spk: "You", en: "I'm a software developer. I build apps that help small businesses automate their sales.", hi: "मैं एक सॉफ्टवेयर डेवलपर हूं। मैं ऐसे ऐप्स बनाता हूं जो छोटे व्यवसायों को उनकी बिक्री को स्वचालित करने में मदद करते हैं।" },
            { spk: "Professional A", en: "That sounds fascinating! Do you have a business card?", hi: "यह दिलचस्प लगता है! क्या आपके पास बिजनेस कार्ड है?" },
            { spk: "You", en: "Certainly. Let's connect on LinkedIn as well.", hi: "निश्चित रूप से। आइए लिंक्डइन पर भी जुड़ें।" }
        ]
    }
];

async function injectElite() {
    console.log("🚀 Injecting Elite App-Inspired Lessons...");

    for (const data of eliteLessons) {
        const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);

        // Check for existing
        const [existing] = await db.select().from(lessons).where(eq(lessons.title, data.title));
        let lessonId;

        if (existing) {
            console.log(`Updating existing lesson: ${data.title}`);
            await db.update(lessons).set({
                content: data.content,
                category: data.category,
                difficulty: data.difficulty,
                hindiTitle: data.hindiTitle
            }).where(eq(lessons.id, existing.id));
            lessonId = existing.id;

            // Clear old vocab/conv
            await db.delete(vocabulary).where(eq(vocabulary.lessonId, lessonId));
            await db.delete(conversationLines).where(eq(conversationLines.lessonId, lessonId));
        } else {
            console.log(`Creating new lesson: ${data.title}`);
            const [newLesson] = await db.insert(lessons).values({
                title: data.title,
                hindiTitle: data.hindiTitle,
                slug: slug,
                description: `App-inspired ${data.category} practice.`,
                hindiDescription: `${data.category} के लिए बेहतरीन अभ्यास।`,
                content: data.content,
                difficulty: data.difficulty,
                category: data.category,
                order: 9999, // High order for elite
                imageUrl: "https://plus.unsplash.com/premium_photo-1661632733475-6e42661f4961?auto=format&fit=crop&q=80"
            }).returning();
            lessonId = newLesson.id;
        }

        // Insert Vocab
        for (const v of data.vocab) {
            await db.insert(vocabulary).values({
                lessonId: lessonId,
                word: v.word,
                definition: v.def,
                hindiTranslation: v.h,
                pronunciation: "/.../",
                example: `Self-practice: Use '${v.word}' in a sentence.`
            });
        }

        // Insert Conv
        for (let i = 0; i < data.conv.length; i++) {
            const c = data.conv[i];
            await db.insert(conversationLines).values({
                lessonId: lessonId,
                speaker: c.spk,
                englishText: c.en,
                hindiText: c.hi,
                emoji: "👤",
                lineOrder: i + 1
            });
        }
    }

    console.log("✅ Elite lessons Injected!");
    process.exit(0);
}

injectElite();

// Helper for schema imports in one-off script
import { eq } from 'drizzle-orm';
