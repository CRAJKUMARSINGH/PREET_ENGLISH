
import { db } from "../server/db";
import { lessons, vocabulary } from "../shared/schema";

async function seedShowcase() {
    console.log("Seeding Grade 9 Showcase Lesson...");

    const showcaseLesson = await db.insert(lessons).values({
        title: "Mastering Indian English Nuances",
        slug: "indian-english-nuances",
        description: "Explore the unique blend of Indian culture and English etiquette.",
        difficulty: "Intermediate",
        order: 999,
        category: "Culture",
        hindiTitle: "भारतीय अंग्रेजी की बारीकियां",
        hindiDescription: "भारतीय संस्कृति और अंग्रेजी शिष्टाचार के अनूठे मिश्रण का अन्वेषण करें।",
        content: JSON.stringify({
            blocks: [
                {
                    type: "text",
                    content: "Welcome to this advanced session on cultural nuances. English in India has its own beautiful flavor.",
                    hindiContent: "सांस्कृतिक बारीकियों पर इस उन्नत सत्र में आपका स्वागत है। भारत में अंग्रेजी का अपना सुंदर स्वाद है।"
                },
                {
                    type: "cultural_note",
                    title: "The Polite 'No'",
                    hindiTitle: "विनम्र 'नहीं'",
                    content: "In many Western cultures, a direct 'No' is seen as honest. However, in India, people often use 'I will try' or 'I'll see' to avoid being blunt. Understanding this helps in professional settings.",
                    hindiContent: "कई पश्चिमी संस्कृतियों में, सीधा 'नहीं' कहना ईमानदारी माना जाता है। हालाँकि, भारत में, लोग अक्सर रूखा होने से बचने के लिए 'मैं कोशिश करूँगा' या 'मैं देखूँगा' का उपयोग करते हैं। इसे समझना पेशेवर स्थितियों में मदद करता है।",
                    noteType: "etiquette"
                },
                {
                    type: "video",
                    videoId: "dQw4w9WgXcQ", // Placeholder for actual native video
                    content: "Watch how native speakers use indirect language in meetings."
                },
                {
                    type: "quiz",
                    question: "If a colleague in India says 'I will definitely try to be there', what might they actually mean?",
                    options: [
                        "They are 100% coming",
                        "They are politely indicating they might be busy",
                        "They are asking for directions",
                        "They don't understand the question"
                    ],
                    answer: 1
                }
            ]
        })
    }).returning();

    const lessonId = showcaseLesson[0].id;

    await db.insert(vocabulary).values([
        {
            lessonId,
            word: "Nuance",
            definition: "A subtle difference in meaning or expression.",
            hindiTranslation: "बारीकी",
            example: "The nuances of local language are important.",
            exampleHindi: "स्थानीय भाषा की बारीकियां महत्वपूर्ण हैं।"
        },
        {
            lessonId,
            word: "Etiquette",
            definition: "The customary code of polite behavior in society.",
            hindiTranslation: "शिष्टाचार",
            example: "Business etiquette varies across cultures.",
            exampleHindi: "व्यावसायिक शिष्टाचार विभिन्न संस्कृतियों में भिन्न होता है।"
        }
    ]);

    console.log(`Showcase lesson seeded with ID: ${lessonId}`);
}

import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    seedShowcase().catch(console.error);
}
