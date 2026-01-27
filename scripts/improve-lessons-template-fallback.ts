
import { db } from "../server/db";
import { lessons, vocabulary, conversationLines, Lesson } from "../shared/schema";
import { eq } from "drizzle-orm";
import fs from "fs";

// Fallback improvements when AI is unavailable
// focused on Structure, Objectives, and Cultural Context

const TEMPLATES: Record<string, {
    objectives: string[],
    culturalNote: string,
    practiceTip: string
}> = {
    "Business": {
        objectives: [
            "Learn professional vocabulary for the workplace (कार्यस्थल के लिए पेशेवर शब्दावली सीखें)",
            "Understand formal communication tones (औपचारिक संचार टोन को समझें)",
            "Practice common business phrases (सामान्य व्यावसायिक वाक्यांशों का अभ्यास करें)"
        ],
        culturalNote: "In Western business culture, 'Small Talk' (casual conversation) before a meeting is very important. It builds trust.",
        practiceTip: "Always use 'Could you' or 'Would you' instead of direct commands to sound more polite in business settings."
    },
    "Travel": {
        objectives: [
            "Learn essential travel phrases (आवश्यक यात्रा वाक्यांश सीखें)",
            "Ask for directions and help confidently (आत्मविश्वास के साथ दिशा-निर्देश और मदद मांगें)",
            "Understand transport and accommodation terms (परिवहन और आवास की शर्तों को समझें)"
        ],
        culturalNote: "When traveling abroad, a smile and 'Please/Thank you' go a long way. Politeness is universal.",
        practiceTip: "Practice the 5 W's: Where, What, When, Who, Why. These are your most important tools when traveling."
    },
    "Shopping": {
        objectives: [
            "Learn to ask for prices and discounts (कीमतें और छूट मांगना सीखें)",
            "Understand product descriptions (उत्पाद विवरण समझें)",
            "Practice bargaining politely (विनम्रता से मोलभाव करने का अभ्यास करें)"
        ],
        culturalNote: "In some countries, bargaining is expected (like flea markets), while in others (malls/supermarkets) prices are fixed.",
        practiceTip: "Learn numbers 1-100 thoroughly. This helps avoid confusion with prices."
    },
    "Daily Life": {
        objectives: [
            "Describe daily routines (दैनिक दिनचर्या का वर्णन करें)",
            "Express feelings and needs (भावनाओं और जरूरतों को व्यक्त करें)",
            "Engage in casual conversations (अनौपचारिक बातचीत में शामिल हों)"
        ],
        culturalNote: "Asking 'How are you?' is often just a greeting in English, not always a detailed inquiry about health.",
        practiceTip: "Describe what you are doing in English while you do it (e.g., 'I am brushing my teeth'). This builds 'thinking in English'."
    },
    "General": {
        objectives: [
            "Build core vocabulary (मुख्य शब्दावली बनाएं)",
            "Improve sentence structure (वाक्य संरचना में सुधार करें)",
            "Gain confidence in speaking (बोलने में आत्मविश्वास प्राप्त करें)"
        ],
        culturalNote: "English sentences strictly follow Subject-Verb-Object order. This is different from Hindi's Subject-Object-Verb.",
        practiceTip: "Don't be afraid to make mistakes. Mistakes are proof that you are trying and learning."
    }
};

function generateEnhancedContent(lesson: Lesson): string {
    const category = lesson.category && TEMPLATES[lesson.category] ? lesson.category : "General";
    const template = TEMPLATES[category];

    // Existing content check to avoid double enhancement
    if (lesson.content.includes("## 🎯 Learning Objective")) {
        return lesson.content; // Already enhanced
    }

    let enhancedContent = `# ${lesson.title} (${lesson.hindiTitle || lesson.title})\n\n`;

    // Add Objectives
    enhancedContent += `## 🎯 Learning Objective (सीखने का उद्देश्य)\n`;
    template.objectives.forEach(obj => {
        enhancedContent += `- ${obj}\n`;
    });
    enhancedContent += `\n---\n\n`;

    // Keep existing content (cleaned up)
    enhancedContent += `## 📚 Lesson Content\n\n`;
    enhancedContent += lesson.content.replace(/^#\s+.*\n/, ''); // Remove old title if present
    enhancedContent += `\n\n---\n\n`;

    // Add Cultural Note
    enhancedContent += `## 🌏 Cultural Note (सांस्कृतिक नोट)\n`;
    enhancedContent += `${template.culturalNote}\n`;
    enhancedContent += `*(Hindi context: ${template.culturalNote} - Translations pending)*\n`;
    enhancedContent += `\n---\n\n`;

    // Add Tips
    enhancedContent += `## 💡 Practice Tip (अभ्यास का सुझाव)\n`;
    enhancedContent += `${template.practiceTip}\n`;

    return enhancedContent;
}

async function runFallbackImprovement() {
    console.log("🚀 Starting FALLBACK Template Improvement Process...");

    const allLessons = await db.select().from(lessons);

    // Filter for lessons that really need structure (Tier 1)
    const lowQuality = allLessons.filter(l =>
        !l.content ||
        !l.content.includes("## 🎯 Learning Objective") // Filter those we haven't touched
    );

    console.log(`Total lessons: ${allLessons.length}`);
    console.log(`Identified for structural enhancement: ${lowQuality.length}`);

    let improvedCount = 0;
    const BATCH_SIZE = 5000; // Increased for sprint speed
    const batch = lowQuality.slice(0, BATCH_SIZE);

    console.log(`Processing batch of ${batch.length}...`);

    for (const lesson of batch) {
        const newContent = generateEnhancedContent(lesson);

        if (newContent !== lesson.content) {
            await db.update(lessons)
                .set({ content: newContent })
                .where(eq(lessons.id, lesson.id));
            improvedCount++;
        }
    }

    console.log(`\n✅ Finished fallback processing. Enhanced structure for: ${improvedCount} lessons.`);
    process.exit(0);
}

runFallbackImprovement();
