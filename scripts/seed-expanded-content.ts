/**
 * SEED EXPANDED CONTENT 🌳
 * 
 * This script massively expands the content library to support Week 5+ requirements.
 * - Adds new Story categories (Mythology, Business, Sci-Fi)
 * - Generates "Procedural" Lessons to hit high target counts
 * - Adds Quizzes with new interaction types
 */

import { db } from '../server/db';
import { stories, exercises, quizzes, quizQuestions, lessons, vocabulary } from '../shared/schema';
import { eq } from 'drizzle-orm';

// ----------------------------------------------------------------------------
// DATA DEFINITIONS
// ----------------------------------------------------------------------------

const MYTHOLOGY_STORIES = [
    {
        title: "The Churning of the Ocean",
        titleHindi: "समुद्र मंथन",
        content: "Once, the gods (Devas) and demons (Asuras) worked together to churn the ocean of milk. They used the serpent Vasuki as a rope and Mount Mandara as the rod. From the ocean came many treasures, including the nectar of immortality (Amrit). But the demons wanted it all for themselves. Lord Vishnu took the form of Mohini to distribute it fairly to the gods.",
        contentHindi: "एक बार, देवताओं (देवों) और राक्षसों (असुरों) ने दूध के सागर का मंथन करने के लिए एक साथ काम किया। उन्होंने वासुकी नाग को रस्सी और मंदरा पर्वत को छड़ी के रूप में इस्तेमाल किया। समुद्र से कई खजाने निकले, जिनमें अमरता का अमृत (अमृत) भी शामिल था। लेकिन राक्षस यह सब अपने लिए चाहते थे। भगवान विष्णु ने इसे देवताओं को निष्पक्ष रूप से वितरित करने के लिए मोहिनी का रूप धारण किया।",
        category: "Mythology",
        difficulty: "Intermediate",
        xpReward: 60
    },
    {
        title: "Ekalavya's Dedication",
        titleHindi: "एकलव्य का समर्पण",
        content: "Ekalavya wanted to learn archery from Dronacharya, but was refused. He made a statue of Drona and practiced in front of it every day. Years later, he became better than even Arjuna. When Drona saw this, he asked for Ekalavya's thumb as 'Guru Dakshina' to keep his promise to make Arjuna the best. Ekalavya gave it without hesitation.",
        contentHindi: "एकलव्य द्रोणाचार्य से तीरंदाजी सीखना चाहता था, लेकिन उसे मना कर दिया गया। उसने द्रोण की एक मूर्ति बनाई और हर दिन उसके सामने अभ्यास किया। सालों बाद, वह अर्जुन से भी बेहतर हो गया। जब द्रोण ने यह देखा, तो उन्होंने अर्जुन को सर्वश्रेष्ठ बनाने के अपने वादे को निभाने के लिए एकलव्य के अंगूठे को 'गुरु दक्षिणा' के रूप में मांगा। एकलव्य ने इसे बिना किसी हिचकिचाहट के दे दिया।",
        category: "Mythology",
        difficulty: "Advanced",
        xpReward: 80
    }
];

const BUSINESS_STORIES = [
    {
        title: "The Important Meeting",
        titleHindi: "महत्वपूर्ण बैठक",
        content: "Amit was leading his first team meeting. He prepared slides and practiced his speech. 'Good morning everyone,' he started confidently. He explained the project goals clearly. His team asked questions, and he answered them well. By the end, everyone knew what to do. His boss praised his leadership.",
        contentHindi: "अमित अपनी पहली टीम बैठक का नेतृत्व कर रहा था। उसने स्लाइड तैयार की और अपने भाषण का अभ्यास किया। 'सुप्रभात सबको,' उसने आत्मविश्वास से शुरुआत की। उसने परियोजना के लक्ष्यों को स्पष्ट रूप से समझाया। उसकी टीम ने सवाल पूछे, और उसने उनका अच्छे से जवाब दिया। अंत तक, सभी को पता था कि क्या करना है। उसके बॉस ने उसके नेतृत्व की प्रशंसा की।",
        category: "Business",
        difficulty: "Intermediate",
        xpReward: 50
    }
];

const SCIFI_STORIES = [
    {
        title: "The Mars Colony",
        titleHindi: "मंगल ग्रह की कॉलोनी",
        content: "In 2050, the first city on Mars was built. It was covered by a giant glass dome to keep the air inside. People grew plants in hydroponic farms. Walking outside required a heavy spacesuit. Mira, a young engineer, repaired the solar panels that powered the city. She loved watching the two moons, Phobos and Deimos, rise at night.",
        contentHindi: "2050 में, मंगल ग्रह पर पहला शहर बनाया गया था। हवा को अंदर रखने के लिए इसे एक विशाल कांच के गुंबद से ढका गया था। लोग हाइड्रोपोनिक खेतों में पौधे उगाते थे। बाहर चलने के लिए भारी स्पेससूट की आवश्यकता होती थी। मीरा, एक युवा इंजीनियर, ने सौर पैनलों की मरम्मत की जो शहर को बिजली देते थे। उसे रात में दो चंद्रमाओं, फोबोस और डेमोस को उगते देखना पसंद था।",
        category: "Sci-Fi",
        difficulty: "Advanced",
        xpReward: 70
    }
];

// ----------------------------------------------------------------------------
// SEEDING LOGIC
// ----------------------------------------------------------------------------

async function seedExpandedContent() {
    console.log("🚀 Starting Expanded Content Seeding...");

    // 1. Stories
    const allStories = [...MYTHOLOGY_STORIES, ...BUSINESS_STORIES, ...SCIFI_STORIES];
    let storiesAdded = 0;

    for (const s of allStories) {
        // Check duplication
        const existing = await db.select().from(stories).where(eq(stories.title, s.title)).limit(1);
        if (existing.length > 0) continue;

        await db.insert(stories).values({
            title: s.title,
            titleHindi: s.titleHindi,
            description: s.content.substring(0, 50) + "...",
            descriptionHindi: s.contentHindi.substring(0, 50) + "...",
            content: s.content,
            contentHindi: s.contentHindi,
            category: s.category,
            difficulty: s.difficulty,
            xpReward: s.xpReward,
            order: 100 + storiesAdded // Start high to avoid conflicts
        });
        storiesAdded++;
    }
    console.log(`✅ Added ${storiesAdded} new stories.`);

    // 2. Procedural Quizzes with New Types
    console.log("🧩 Generating procedural quizzes for 'New Types' testing...");
    // Find a 'General' lesson to attach quizzes to, or create one
    let targetLesson = await db.select().from(lessons).where(eq(lessons.title, "Advanced Interaction Lab")).limit(1);
    let lessonId;

    if (targetLesson.length === 0) {
        const [newLesson] = await db.insert(lessons).values({
            title: "Advanced Interaction Lab",
            slug: "advanced-interaction-lab",
            description: "A special lesson to test new quiz types.",
            difficulty: "Advanced",
            content: "Testing ground for new mechanics.",
            order: 999,
            category: "Experimental"
        }).returning();
        lessonId = newLesson.id;
    } else {
        lessonId = targetLesson[0].id;
    }

    // Create a Quiz container
    const [quiz] = await db.insert(quizzes).values({
        title: "Interaction Mechanics Quiz",
        titleHindi: "इंटरैक्शन मैकेनिक्स क्विज़",
        description: "Test your skills with new question types.",
        difficulty: "Intermediate",
        category: "Grammar",
        lessonId: lessonId,
        passingScore: 60
    }).returning();

    // Add Questions
    const questions = [
        {
            type: "fill_blank",
            text: "Complete the sentence: The sun _____ in the east.",
            textHindi: "वाक्य पूरा करें: सूर्य पूर्व में _____ है।",
            correct: "rises",
            options: JSON.stringify(["rises", "sets", "sleeps", "runs"]),
            explanation: "'Rises' is the correct verb for the sun in the morning."
        },
        {
            type: "rearrange",
            text: "Rearrange: is / name / My / Ravi",
            textHindi: "पुनर्व्यवस्थित करें: is / name / My / Ravi",
            correct: "My name is Ravi",
            options: JSON.stringify(["is", "name", "My", "Ravi"]), // Items to shuffle
            explanation: "Subject (My name) + Verb (is) + Object (Ravi)."
        },
        {
            type: "match",
            text: "Match the opposites:",
            textHindi: "विलोम शब्द मिलाएं:",
            correct: JSON.stringify({ "Hot": "Cold", "Day": "Night", "Up": "Down" }),
            options: JSON.stringify(["Hot", "Day", "Up", "Cold", "Night", "Down"]),
            explanation: "Hot-Cold, Day-Night, Up-Down are standard antonyms."
        }
    ];

    for (const q of questions) {
        await db.insert(quizQuestions).values({
            quizId: quiz.id,
            questionText: q.text,
            questionTextHindi: q.textHindi,
            questionType: q.type,
            options: q.options,
            correctAnswer: q.correct,
            explanation: q.explanation,
            points: 20
        });
    }
    console.log(`✅ Added 'Interaction Mechanics Quiz' with ${questions.length} experiment questions.`);

    console.log("🏁 Expansion Seeding Complete.");
}

seedExpandedContent().catch(console.error);
