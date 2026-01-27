
import { db } from "../server/db";
import { lessons, vocabulary } from "../shared/schema";
import { eq } from "drizzle-orm";

async function seedBusinessLesson() {
    console.log("Seeding Business English Lesson (ID 101)...");

    // 1. Check if lesson exists, if so, delete it to ensure fresh start
    const existing = await db.query.lessons.findFirst({
        where: eq(lessons.id, 101),
    });

    if (existing) {
        console.log("Lesson 101 exists. Updating/Overwriting...");
        await db.delete(lessons).where(eq(lessons.id, 101));
    }

    // 2. Define Content Blocks (JSON) for modern LessonView
    const businessContent = {
        blocks: [
            {
                type: "text",
                content: "Introduction to Business English",
                hindiContent: "बिज़नेस इंग्लिश का परिचय"
            },
            {
                type: "text",
                content: "In the professional world, how you introduce yourself matters. Let's learn standard phrases for meetings and interviews.",
                hindiContent: "पेशेवर दुनिया में, आप अपना परिचय कैसे देते हैं, यह मायने रखता है। आइए मीटिंग और इंटरव्यू के लिए मानक वाक्यांश सीखें।"
            },
            {
                type: "common_mistake",
                mistake: "I am having 5 years experience.",
                correction: "I have 5 years of experience.",
                explanation: "In English, we use 'have' for possession of experience, not continuous tense.",
                hindiExplanation: "अंग्रेजी में, अनुभव के लिए हम 'have' का उपयोग करते हैं, continuous tense का नहीं।"
            },
            {
                type: "speaking",
                phrase: "Let's get down to business.",
                hindiPhrase: "आइए काम की बात पर आते हैं।"
            },
            {
                type: "quiz",
                question: "Which phrase is best for starting a formal meeting?",
                options: ["What's up guys?", "Good morning, let's begin.", "Yo, listen up!", "Start now."],
                answer: 1
            }
        ]
    };

    // 3. Create the Lesson
    const [lesson] = await db.insert(lessons).values({
        id: 101, // Explicit ID for demo
        title: "Business English Basics",
        hindiTitle: "बिज़नेस इंग्लिश की मूल बातें",
        description: "Master introductions, meetings, and professional etiquette.",
        hindiDescription: "परिचय, मीटिंग और पेशेवर शिष्टाचार में महारत हासिल करें।",
        content: JSON.stringify(businessContent),
        slug: "business-english-basics", // Added slug requirement
        order: 101,
        difficulty: "Intermediate",
        category: "Business",
        published: true,
    }).returning();

    console.log("Created Lesson:", lesson.title);

    // 4. Add Vocabulary
    const vocabItems = [
        { word: "Resignation", hindi: "इस्तीफा", pronunciation: "rez-ig-nay-shun", definition: "A formal statement giving up an office or position." },
        { word: "Negotiation", hindi: "मोलभाव / बातचीत", pronunciation: "neh-go-she-ay-shun", definition: "Discussion aimed at reaching an agreement." },
        { word: "Deadline", hindi: "अंतिम तिथि", pronunciation: "ded-line", definition: "The latest time or date by which something should be completed." },
        { word: "Proposal", hindi: "प्रस्ताव", pronunciation: "pruh-poh-zul", definition: "A plan or suggestion put forward for consideration." },
        { word: "Colleague", hindi: "सहकर्मी", pronunciation: "kol-eeg", definition: "A person with whom one works." },
    ];

    for (const v of vocabItems) {
        await db.insert(vocabulary).values({
            lessonId: lesson.id,
            word: v.word,
            hindiTranslation: v.hindi, // Changed from hindiTerm based on schema inference or just standard
            pronunciation: v.pronunciation,
            definition: v.definition,
            example: "We have a deadline tomorrow.", // Required field
        });
    }
    console.log("Added 5 Vocabulary items.");

    console.log("✅ Business Lesson 101 Seeded Successfully!");
    process.exit(0);
}

seedBusinessLesson().catch((err) => {
    console.error("Error seeding lesson:", err);
    process.exit(1);
});
