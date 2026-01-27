
import { db } from "./server/db";
import { lessons } from "./shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
    console.log('🌱 Seeding interactive lessons from New folder...');

    const sampleLessons = [
        {
            title: "Introduction to Family",
            hindiTitle: "परिवार का परिचय",
            description: "Learn how to talk about your family members.",
            content: "# Introduction to Family\nLearn how to talk about your family members.",
            contentBlocks: JSON.stringify([
                { type: "text", content: "Family is an important part of our lives. Let's learn some basic words." },
                { type: "vocabulary", content: [{ word: "Father", meaning: "पिता" }, { word: "Mother", meaning: "माता" }] },
                { type: "quiz", question: "What is 'Mother' in Hindi?", options: ["माता", "पिता", "भाई"], answer: "माता" }
            ]),
            category: "vocabulary",
            order: 1,
            slug: "intro-to-family",
            xpReward: 15,
            difficulty: "Beginner"
        },
        {
            title: "Basic Greetings",
            hindiTitle: "बुनियादी अभिवादन",
            description: "Learn how to say Hello and Goodbye.",
            content: "# Basic Greetings\nLearn how to say Hello and Goodbye.",
            contentBlocks: JSON.stringify([
                { type: "text", content: "Greetings are the first step in any conversation." },
                { type: "video", url: "https://www.youtube.com/embed/example" },
                { type: "quiz", question: "When do you say 'Good Morning'?", options: ["At night", "In the morning", "In the afternoon"], answer: "In the morning" }
            ]),
            category: "speaking",
            order: 2,
            slug: "basic-greetings",
            xpReward: 10,
            difficulty: "Beginner"
        },
        {
            title: "Present Tense",
            hindiTitle: "वर्तमान काल",
            description: "Understand simple present tense.",
            content: "# Present Tense\nUnderstand simple present tense.",
            contentBlocks: JSON.stringify([
                { type: "text", content: "We use present tense for habits and facts." },
                { type: "quiz", question: "I ___ to school.", options: ["go", "going", "gone"], answer: "go" }
            ]),
            category: "grammar",
            order: 3,
            slug: "present-tense",
            xpReward: 20,
            difficulty: "Intermediate"
        }
    ];

    for (const l of sampleLessons) {
        const [existing] = await db.select().from(lessons).where(eq(lessons.slug, l.slug));
        if (existing) {
            console.log(`⚠️ Lesson already exists: ${l.slug}, updating...`);
            await db.update(lessons).set(l).where(eq(lessons.id, existing.id));
        } else {
            console.log(`✅ Inserting new lesson: ${l.slug}`);
            await db.insert(lessons).values(l);
        }
    }

    console.log('🎉 Seeding complete!');
}

seed().catch(console.error);
