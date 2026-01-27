import { db } from "../server/db";
import { lessons, vocabulary, conversationLines, InsertVocabulary as VocabularyInsert, InsertConversationLine as ConversationLineInsert } from "../shared/schema";
import { eq } from "drizzle-orm";

const LESSON_ID = 5871;

const lessonContent = {
    blocks: [
        {
            type: "text",
            content: "Namaste! Welcome to your first step in mastering English introductions.",
            hindiContent: "नमस्ते! अंग्रेजी में अपना परिचय देने में महारत हासिल करने की दिशा में यह आपका पहला कदम है।"
        },
        {
            type: "video",
            content: "Watch how Rahul introduces himself confidently.",
            videoId: "h1" // Placeholder ID, or use a real one if available
        },
        {
            type: "quiz",
            question: "When should you use 'Good Morning'?",
            options: ["Before 12 PM", "After 12 PM", "At night", "When saying goodbye"],
            answer: 0
        },
        {
            type: "cultural_note",
            title: "Respectful Greetings",
            hindiTitle: "सम्मानजनक अभिवादन",
            content: "In India, adding 'Ji' or using 'Aap' shows respect. In English, respect is shown through tone and polite phrases like 'Could you please...'.",
            hindiContent: "भारत में, 'जी' जोड़ना या 'आप' का उपयोग करना सम्मान दर्शाता है। अंग्रेजी में, सम्मान स्वर और 'Could you please...' जैसे विनम्र वाक्यांशों के माध्यम से दिखाया जाता है।",
            noteType: "culture"
        },
        {
            type: "common_mistake",
            mistake: "My self Rahul.",
            correction: "I am Rahul / My name is Rahul.",
            explanation: "'Myself' is a reflexive pronoun and cannot be used as a subject.",
            hindiExplanation: "'Myself' का उपयोग अकेले नहीं किया जा सकता, यह गलत व्याकरण है।"
        },
        {
            type: "fill_in_the_blanks",
            sentence: "My name ____ Rahul.",
            hindiTranslation: "मेरा नाम राहुल है।",
            options: ["are", "is"],
            answer: "is"
        },
        {
            type: "sentence_reordering",
            hindiMeaning: "आप कैसे हैं?",
            correctSentence: "How are you",
            words: ["How", "are", "you", "is", "am"]
        },
        {
            type: "speaking",
            phrase: "Nice to meet you",
            hindiPhrase: "आपसे मिलकर खुशी हुई"
        }
    ]
};

const newVocabulary: VocabularyInsert[] = [
    { lessonId: LESSON_ID, word: "Introduction", definition: "To tell someone your name and details.", example: "Let me give a brief introduction.", hindiTranslation: "परिचय", hindiPronunciation: "इंट्रोडक्शन", exampleHindi: "मुझे संक्षेप में अपना परिचय देने दें।" },
    { lessonId: LESSON_ID, word: "Greeting", definition: "Something you say when you meet someone.", example: "'Hello' is a common greeting.", hindiTranslation: "अभिवादन", hindiPronunciation: "ग्रीटिंग", exampleHindi: "'हैलो' एक सामान्य अभिवादन है।" },
    { lessonId: LESSON_ID, word: "Polite", definition: "Showing good manners and respect.", example: "Always be polite to elders.", hindiTranslation: "विनम्र", hindiPronunciation: "पोलाइट", exampleHindi: "बड़ों के प्रति सदैव विनम्र रहें।" },
    { lessonId: LESSON_ID, word: "Occupation", definition: "Your job or profession.", example: "What is your occupation?", hindiTranslation: "व्यवसाय", hindiPronunciation: "ऑक्यूपेशन", exampleHindi: "आपका व्यवसाय क्या है?" },
    { lessonId: LESSON_ID, word: "Hometown", definition: "The city or town where you were born.", example: "My hometown is Jaipur.", hindiTranslation: "गृह नगर", hindiPronunciation: "होमटाउन", exampleHindi: "मेरा गृह नगर जयपुर है।" },
    { lessonId: LESSON_ID, word: "Neighbor", definition: "Someone who lives near you.", example: "He is my new neighbor.", hindiTranslation: "पड़ोसी", hindiPronunciation: "नेबर", exampleHindi: "वह मेरा नया पड़ोसी है।" },
    { lessonId: LESSON_ID, word: "Pleasure", definition: "A feeling of happiness or enjoyment.", example: "It is a pleasure to meet you.", hindiTranslation: "आनंद / खुशी", hindiPronunciation: "प्लेज़र", exampleHindi: "आपसे मिल कर खुशी हुई।" },
    { lessonId: LESSON_ID, word: "Respect", definition: "Admiration for someone.", example: "We respect our teachers.", hindiTranslation: "सम्मान", hindiPronunciation: "रेस्पेक्ट", exampleHindi: "हम अपने शिक्षकों का सम्मान करते हैं।" },
    { lessonId: LESSON_ID, word: "Formal", definition: "Official or serious style.", example: "Wear formal clothes for the interview.", hindiTranslation: "औपचारिक", hindiPronunciation: "फॉर्मल", exampleHindi: "इंटरव्यू के लिए औपचारिक कपड़े पहनें।" },
    { lessonId: LESSON_ID, word: "Casual", definition: "Relaxed and informal.", example: "Casual meeting with friends.", hindiTranslation: "अनौपचारिक", hindiPronunciation: "कैजुअल", exampleHindi: "दोस्तों के साथ अनौपचारिक मुलाकात।" }
];

const newConversationLines: ConversationLineInsert[] = [
    { lessonId: LESSON_ID, speaker: "Rahul", englishText: "Namaste Uncle Ji! Good morning.", hindiText: "नमस्ते अंकल जी! शुभ प्रभात।", lineOrder: 1, emoji: "🙏" },
    { lessonId: LESSON_ID, speaker: "Uncle Ji", englishText: "Good morning beta. How are you?", hindiText: "शुभ प्रभात बेटा। तुम कैसे हो?", lineOrder: 2, emoji: "👴" },
    { lessonId: LESSON_ID, speaker: "Rahul", englishText: "I am fine, thank you. I am Rahul, your new neighbor.", hindiText: "मैं ठीक हूँ, धन्यवाद। मैं राहुल हूँ, आपका नया पड़ोसी।", lineOrder: 3, emoji: "😊" },
    { lessonId: LESSON_ID, speaker: "Uncle Ji", englishText: "Welcome Rahul! Where are you from?", hindiText: "स्वागत है राहुल! तुम कहाँ से हो?", lineOrder: 4, emoji: "🏡" },
    { lessonId: LESSON_ID, speaker: "Rahul", englishText: "I am from Jodhpur. I work as a software engineer.", hindiText: "मैं जोधपुर से हूँ। मैं एक सॉफ्टवेयर इंजीनियर के रूप में काम करता हूँ।", lineOrder: 5, emoji: "💻" },
    { lessonId: LESSON_ID, speaker: "Uncle Ji", englishText: "Very good. Nice to meet you.", hindiText: "बहुत अच्छा। तुमसे मिलकर खुशी हुई।", lineOrder: 6, emoji: "🤝" }
];

async function seed() {
    console.log("Starting seed for Lesson #5871...");

    try {
        const existingLesson = await db.select().from(lessons).where(eq(lessons.id, LESSON_ID)).get();

        if (existingLesson) {
            console.log("Updating existing Lesson #5871...");
            await db.update(lessons).set({
                title: "Introduction & Greetings",
                hindiTitle: "परिचय और अभिवादन",
                description: "Learn to introduce yourself formally and informally.",
                content: JSON.stringify(lessonContent),
                difficulty: "Beginner",
                category: "Basic Communication",
                order: 1
            }).where(eq(lessons.id, LESSON_ID));
        } else {
            console.log("Creating new Lesson #5871...");
            await db.insert(lessons).values({
                id: LESSON_ID,
                title: "Introduction & Greetings",
                hindiTitle: "परिचय और अभिवादन",
                description: "Learn to introduce yourself formally and informally.",
                content: JSON.stringify(lessonContent),
                difficulty: "Beginner",
                category: "Basic Communication",
                order: 1,
                slug: "introduction-and-greetings-5871"
            });
        }

        console.log("Clearing old vocabulary...");
        await db.delete(vocabulary).where(eq(vocabulary.lessonId, LESSON_ID));

        console.log("Inserting new vocabulary...");
        await db.insert(vocabulary).values(newVocabulary);

        console.log("Clearing old conversation lines...");
        await db.delete(conversationLines).where(eq(conversationLines.lessonId, LESSON_ID));

        console.log("Inserting new conversation lines...");
        await db.insert(conversationLines).values(newConversationLines);

        console.log("Seed for Lesson #5871 completed successfully! 🎉");
    } catch (error) {
        console.error("Error during seeding:", error);
    }
}

seed();
