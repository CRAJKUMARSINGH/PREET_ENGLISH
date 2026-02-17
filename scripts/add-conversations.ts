import { db } from "../server/db";
import { lessons, vocabulary, conversationLines } from "../shared/schema";
import { eq, isNull, and, sql } from "drizzle-orm";

interface ConversationTemplate {
    speaker: string;
    english: string;
    hindi: string;
    emoji: string;
}

const CONVERSATION_TEMPLATES: Record<string, ConversationTemplate[]> = {
    Business: [
        { speaker: "Manager", english: "Good morning! How's the project progressing?", hindi: "सुप्रभात! प्रोजेक्ट कैसा चल रहा है?", emoji: "👔" },
        { speaker: "You", english: "Good morning! It's going well, we're on schedule.", hindi: "सुप्रभात! यह अच्छा चल रहा है, हम समय पर हैं।", emoji: "💼" },
        { speaker: "Manager", english: "Excellent! Keep up the good work.", hindi: "बहुत बढ़िया! अच्छा काम जारी रखें।", emoji: "👍" },
        { speaker: "You", english: "Thank you! I'll update you by Friday.", hindi: "धन्यवाद! मैं शुक्रवार तक आपको अपडेट करूंगा।", emoji: "📅" },
    ],
    Travel: [
        { speaker: "Traveler", english: "Excuse me, where is the nearest metro station?", hindi: "माफ़ कीजिए, सबसे नज़दीकी मेट्रो स्टेशन कहाँ है?", emoji: "🚇" },
        { speaker: "Local", english: "Go straight and turn left. It's 5 minutes away.", hindi: "सीधे जाएं और बाएं मुड़ें। यह 5 मिनट दूर है।", emoji: "🗺️" },
        { speaker: "Traveler", english: "Thank you so much for your help!", hindi: "आपकी मदद के लिए बहुत धन्यवाद!", emoji: "🙏" },
        { speaker: "Local", english: "You're welcome! Have a safe journey.", hindi: "आपका स्वागत है! सुरक्षित यात्रा करें।", emoji: "✨" },
    ],
    Shopping: [
        { speaker: "Customer", english: "How much does this cost?", hindi: "यह कितने का है?", emoji: "🛍️" },
        { speaker: "Shopkeeper", english: "This is 500 rupees.", hindi: "यह 500 रुपये का है।", emoji: "💰" },
        { speaker: "Customer", english: "Can you give me a discount?", hindi: "क्या आप मुझे छूट दे सकते हैं?", emoji: "🤝" },
        { speaker: "Shopkeeper", english: "I can offer it for 450 rupees.", hindi: "मैं इसे 450 रुपये में दे सकता हूं।", emoji: "✅" },
    ],
    "Daily Life": [
        { speaker: "Friend", english: "What are you doing this weekend?", hindi: "इस सप्ताहांत आप क्या कर रहे हैं?", emoji: "🎉" },
        { speaker: "You", english: "I'm planning to visit my family.", hindi: "मैं अपने परिवार से मिलने जा रहा हूं।", emoji: "👨‍👩‍👧‍👦" },
        { speaker: "Friend", english: "That sounds nice! Enjoy your time.", hindi: "यह अच्छा लगता है! अपना समय का आनंद लें।", emoji: "😊" },
        { speaker: "You", english: "Thanks! See you on Monday.", hindi: "धन्यवाद! सोमवार को मिलते हैं।", emoji: "👋" },
    ],
    Food: [
        { speaker: "Waiter", english: "What would you like to order?", hindi: "आप क्या ऑर्डर करना चाहेंगे?", emoji: "🍽️" },
        { speaker: "Customer", english: "I'll have the vegetarian thali, please.", hindi: "मुझे वेजिटेरियन थाली चाहिए, कृपया।", emoji: "🥘" },
        { speaker: "Waiter", english: "Would you like anything to drink?", hindi: "क्या आप कुछ पीना चाहेंगे?", emoji: "🥤" },
        { speaker: "Customer", english: "Yes, a mango lassi please.", hindi: "हां, एक आम की लस्सी कृपया।", emoji: "🥭" },
    ],
    General: [
        { speaker: "Person A", english: "Hello! How are you today?", hindi: "नमस्ते! आज आप कैसे हैं?", emoji: "👋" },
        { speaker: "Person B", english: "I'm doing well, thank you! And you?", hindi: "मैं ठीक हूं, धन्यवाद! और आप?", emoji: "😊" },
        { speaker: "Person A", english: "I'm great! Nice weather today.", hindi: "मैं बहुत अच्छा हूं! आज मौसम अच्छा है।", emoji: "☀️" },
        { speaker: "Person B", english: "Yes, it's perfect for a walk!", hindi: "हां, यह टहलने के लिए बिल्कुल सही है!", emoji: "🚶" },
    ],
};

async function addConversationsToLessons() {
    console.log("🔄 Starting conversation expansion...\n");

    // Get lessons without conversations
    // @ts-ignore
    const lessonsWithoutConv = await db
        // @ts-ignore
        .select({
            id: lessons.id,
            title: lessons.title,
            category: lessons.category,
        })
        // @ts-ignore
        .from(lessons)

        .leftJoin(conversationLines, eq(lessons.id, conversationLines.lessonId))
        .where(isNull(conversationLines.id))
        .groupBy(lessons.id);

    console.log(`📊 Found ${lessonsWithoutConv.length} lessons without conversations\n`);

    let processed = 0;
    let added = 0;

    for (const lesson of lessonsWithoutConv) {
        const category = lesson.category || "General";
        const template = CONVERSATION_TEMPLATES[category] || CONVERSATION_TEMPLATES.General;

        try {
            const linesToInsert = template.map((item, i) => ({
                lessonId: lesson.id as number,
                speaker: item.speaker,
                englishText: item.english,
                hindiText: item.hindi,
                emoji: item.emoji,
                lineOrder: i + 1,
            }));

            // @ts-ignore - Drizzle union type mismatch
            await db.insert(conversationLines).values(linesToInsert);


            added += template.length;
            processed++;

            if (processed % 100 === 0) {
                console.log(`✅ Processed ${processed}/${lessonsWithoutConv.length} lessons (${added} conversations added)`);
            }
        } catch (error) {
            console.error(`❌ Error adding conversation to lesson ${lesson.id}:`, error);
        }
    }

    console.log(`\n✅ Conversation expansion complete!`);
    console.log(`📊 Total lessons processed: ${processed}`);
    console.log(`📊 Total conversation lines added: ${added}\n`);

    return { processed, added };
}

// Run the script
addConversationsToLessons()
    .then((result) => {
        console.log("🎉 Success! Conversations added to all lessons.");
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Error:", error);
        process.exit(1);
    });
