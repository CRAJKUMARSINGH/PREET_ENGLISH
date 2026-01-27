
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "@shared/schema";

/**
 * ELITE APP LESSON GENERATOR (API-Free)
 * This script generates 3,600 high-quality lessons inspired by popular apps.
 * Now includes mysivi.ai for visual branding lessons.
 */

const appThemes = [
    { app: "ELSA Speak", focus: "Pronunciation & Accent Reduction", count: 800 },
    { app: "Speak (Speak Technologies)", focus: "AI Conversation Partner", count: 800 },
    { app: "TalkPal", focus: "Voice-based tutoring", count: 500 },
    { app: "Lingvist", focus: "Vocabulary + Speaking", count: 500 },
    { app: "Andy (Chatbot)", focus: "Casual Social Chat", count: 500 },
    { app: "mysivi.ai", focus: "Visual Branding & AI Design", count: 500 },
];

const genericTopics = [
    "Introduction to Basics", "Common Greetings", "Asking for Directions", "Ordering Food", "at the Airport",
    "Booking a Hotel", "Job Interview Basics", "Team Meeting", "Client Call", "Negotiation",
    "Email Etiquette", "Phone Skills", "Networking Event", "Presentation Skills", "Handling Complaints",
    "Giving Feedback", "Remote Work", "Time Management", "Project Update", "Sales Pitch",
    "Daily Routine", "Family & Friends", "Hobbies", "Travel Plans", "Shopping",
    "Healthcare", "Emergency Situations", "Banking", "Weather Talk", "Celebrations"
];

function generateEliteContent(app: string, theme: string, topic: string) {
    if (app === "ELSA Speak") {
        return `
# ${topic} (${app} Style)
## 🎯 Learning Objective (सीखने का उद्देश्य)
Master the specific sounds and rhythm of "${topic}" to sound more like a native speaker.

---

## 📘 Pronunciation Focus: Accent Reduction
Hindi speakers often find the vowels in "${topic}" challenging. Focus on the **Syllable Stress**.
- **Rule:** In "${topic}", the emphasis is usually on the first part.
- **IPA Guide:** ${topic.split(' ')[0]} /.../ 
- **Drill:** Pronounce the word 5 times, slowly increasing speed.

---

## 💡 Sound Matching (ध्वनि मिलान)
Compare the English sound with the nearest Hindi sound:
- English sound is sharper and uses more air.
- Don't vibrate your throat as much as in Hindi.

---

## 🗣️ ELSA Feedback Simulation
> [!TIP]
> **AI COACH says:** "Try to open your mouth wider on the last syllable. You're sounding 80% confident!"
        `;
    }

    if (app.includes("Speak")) {
        return `
# ${topic} (${app} Style)
## 🎯 Interaction Goal (बातचीत का लक्ष्य)
Navigate a real-world "${topic}" scenario with natural responses.

---

## 📘 Situational Fluency
When ${topic.toLowerCase()}, it is important to use "Polite Fillers" like "I was wondering..." or "Could you please...".

### Roleplay Context
You are in a ${topic} situation. The AI partner will prompt you, and you must respond with clarity.

---

## 🗣️ Active Conversation
**AI Partner:** "How can I help you with ${topic.toLowerCase()} today?"
**You:** "I'd like to discuss the details, please."
**AI Partner:** "Certainly. Let's look at the options."

---

## 💡 Choose your next move:
1. **Option A:** Ask for a discount or better terms.
2. **Option B:** Thank them and say you'll think about it.
3. **Option C:** Ask for more documentation.
        `;
    }

    if (app === "mysivi.ai") {
        return `
# ${topic} (${app} Style)
## 🎯 Creative Goal (कल्पना का लक्ष्य)
Understand how to use AI Design tools to communicate "${topic}" visually in a business setting.

---

## 📘 Design-First Communication
In the ${app} philosophy, branding is about consistency. When professional English meets AI Design for "${topic}", we focus on clarity and visual hierarchy.

### Visual Keywords
- **Color Palette:** Professional Greens & Silvers.
- **Tone:** Modern, minimalistic, and high-impact.

---

## 🗣️ Design Presentation Dialogue
**Creative Lead:** "Our AI tool suggests a bold layout for ${topic.toLowerCase()}."
**Client:** "I like it, but does it align with our brand identity?"
**Creative Lead:** "Absolutely. It uses the latest visual English standards."

---

## 💡 AI Design Tip
> [!IMPORTANT]
> Use AI to generate 5 variations of a landing page for "${topic}" and summarize the key English selling points for each.
        `;
    }

    return `
# ${topic} (${app} Style)
## 🎯 Goal: ${theme}
Improve your ${theme.toLowerCase()} skills in the context of ${topic}.

---

## 📘 Expert Insights
Learning "${topic}" requires a balance between vocabulary and natural sentence structure. 
- **Keyword Focus:** ${topic}
- **Context:** Professional and Daily use.

---

## 🗣️ Practice Dialogue
**A:** "Let's talk about ${topic.toLowerCase()}."
**B:** "I'm ready. Where should we start?"
**A:** "First, let's master the key terms."

---

## 📝 Practice Exercise
Write 3 sentences using the concept of "${topic}" and read them aloud to practice your flow.
    `;
}

function makeSlug(title: string, index: number): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50) + "-" + index;
}

async function execute() {
    console.log("🚀 Starting Elite Deterministic Generation (3,600 Lessons)...");

    const existing = await db.select().from(lessons);
    const existingTitles = new Set(existing.map(l => l.title.toLowerCase()));
    let order = Math.max(...existing.map(l => l.order), 0) + 1;
    let created = 0;

    for (const theme of appThemes) {
        console.log(`Processing ${theme.app}...`);
        for (let i = 1; i <= theme.count; i++) {
            const baseTopic = genericTopics[(i - 1) % genericTopics.length];
            const variant = Math.ceil(i / genericTopics.length);
            const title = `${theme.focus.split(' ')[0]}: ${baseTopic} ${variant > 1 ? `(Part ${variant})` : ''} - ${theme.app}`;

            if (existingTitles.has(title.toLowerCase())) continue;

            const slug = makeSlug(title, created);
            const content = generateEliteContent(theme.app, theme.focus, baseTopic);

            const [lesson] = await db.insert(lessons).values({
                title,
                hindiTitle: title,
                slug,
                description: `[ENHANCED] ${theme.focus} lesson from ${theme.app}`,
                hindiDescription: `${theme.focus} के लिए ${theme.app} प्रेरित पाठ`,
                content,
                difficulty: i % 3 === 0 ? "Beginner" : (i % 3 === 1 ? "Intermediate" : "Advanced"),
                category: "Business",
                order: order++,
                emojiTheme: "✨",
                imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
            }).returning();

            // Insert custom vocabulary per topic
            const vocab = [
                { w: baseTopic, d: `Core term for ${theme.app} style ${theme.focus}.`, h: baseTopic },
                { w: "fluency", d: "Ability to speak/write clearly.", h: "प्रवाह" },
                { w: "nuance", d: "A subtle difference in meaning.", h: "बारीकी" }
            ];

            for (const v of vocab) {
                await db.insert(vocabulary).values({
                    lessonId: lesson.id,
                    word: v.w,
                    definition: v.d,
                    hindiTranslation: v.h,
                    pronunciation: "/.../",
                    example: `Context: ${theme.app} ${baseTopic}`
                });
            }

            // Insert conversation lines
            const lines = [
                { s: "AI Coach", en: "Let's practice your pitch about " + baseTopic + ".", hi: "चलो " + baseTopic + " के बारे में आपकी पिच का अभ्यास करते हैं।" },
                { s: "Student", en: "I'm a bit nervous about the pronunciation.", hi: "मैं उच्चारण को लेकर थोड़ा घबराया हुआ हूं।" },
                { s: "AI Coach", en: "Don't worry, just focus on the breath.", hi: "चिंता न करें, बस सांस पर ध्यान दें।" },
                { s: "Student", en: "Okay, I'm ready!", hi: "ठीक है, मैं तैयार हूं!" }
            ];

            for (let idx = 0; idx < lines.length; idx++) {
                await db.insert(conversationLines).values({
                    lessonId: lesson.id,
                    speaker: lines[idx].s,
                    englishText: lines[idx].en,
                    hindiText: lines[idx].hi,
                    emoji: lines[idx].s === "Student" ? "👤" : "🤖",
                    lineOrder: idx + 1
                });
            }

            created++;
            if (created % 100 === 0) console.log(`Injected ${created} lessons...`);
        }
    }

    console.log(`\n✅ Successfully injected ${created} Elite Deterministic Lessons!`);
    process.exit(0);
}

execute();
import { inArray, eq } from "drizzle-orm";
