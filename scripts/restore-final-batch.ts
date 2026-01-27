
/**
 * RESTORE FINAL BATCH (DAILY BUSINESS PHRASES)
 * Restores ~40 daily business phrases using direct SQLite access.
 */

import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = (process.env.DATABASE_URL || 'preet_english.db').replace('file:', '');
const db = new Database(dbPath);

const finalBatch = [
    // Ending Work
    { title: "I'm leaving for the day.", hindi: "मैं आज के लिए निकल रहा हूं।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "See you tomorrow.", hindi: "कल मिलते हैं।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "Have a good evening.", hindi: "शाम अच्छी बिताएं।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "I'll finish this tomorrow.", hindi: "मैं कल यह पूरा करूंगा।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "The office closes at 6.", hindi: "कार्यालय 6 बजे बंद होता है।", subcategory: "Daily Office", difficulty: "Beginner" },

    // Starting Work
    { title: "Good morning, everyone.", hindi: "सभी को सुप्रभात।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "Let's get started.", hindi: "चलिए शुरू करते हैं।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "What's on the schedule today?", hindi: "आज का शेड्यूल क्या है?", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "I have a busy day ahead.", hindi: "आज मेरा व्यस्त दिन है।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "Let me check my emails first.", hindi: "पहले मुझे अपने ईमेल देखने दीजिए।", subcategory: "Daily Office", difficulty: "Beginner" },

    // Lunch/Breaks
    { title: "Let's grab lunch.", hindi: "चलो लंच करते हैं।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "I'm taking a quick break.", hindi: "मैं छोटा ब्रेक ले रहा हूं।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "Would you like some coffee?", hindi: "क्या आप कॉफी लेंगे?", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "I'll be back in 15 minutes.", hindi: "मैं 15 मिनट में वापस आऊंगा।", subcategory: "Daily Office", difficulty: "Beginner" },
    { title: "The cafeteria is on the first floor.", hindi: "कैफेटेरिया पहली मंजिल पर है।", subcategory: "Daily Office", difficulty: "Beginner" },

    // Asking for Help
    { title: "Can you help me with this?", hindi: "क्या आप इसमें मेरी मदद कर सकते हैं?", subcategory: "Asking for Help", difficulty: "Beginner" },
    { title: "I need some guidance.", hindi: "मुझे कुछ मार्गदर्शन चाहिए।", subcategory: "Asking for Help", difficulty: "Beginner" },
    { title: "Could you show me how to do this?", hindi: "क्या आप मुझे बता सकते हैं यह कैसे करें?", subcategory: "Asking for Help", difficulty: "Beginner" },
    { title: "I'm not sure about this.", hindi: "मुझे इसके बारे में पक्का नहीं पता।", subcategory: "Asking for Help", difficulty: "Beginner" },
    { title: "Who should I contact about this?", hindi: "इसके बारे में मुझे किससे संपर्क करना चाहिए?", subcategory: "Asking for Help", difficulty: "Intermediate" },

    // Offering Help
    { title: "Let me know if you need anything.", hindi: "अगर कुछ चाहिए तो बताएं।", subcategory: "Offering Help", difficulty: "Beginner" },
    { title: "I'm happy to help.", hindi: "मुझे मदद करके खुशी होगी।", subcategory: "Offering Help", difficulty: "Beginner" },
    { title: "Would you like me to assist?", hindi: "क्या आप चाहते हैं कि मैं सहायता करूं?", subcategory: "Offering Help", difficulty: "Intermediate" },
    { title: "I can handle this for you.", hindi: "मैं आपके लिए यह संभाल सकता हूं।", subcategory: "Offering Help", difficulty: "Beginner" },
    { title: "Don't hesitate to ask.", hindi: "पूछने में संकोच न करें।", subcategory: "Offering Help", difficulty: "Beginner" },

    // Agreement
    { title: "That sounds good.", hindi: "यह अच्छा लगता है।", subcategory: "Agreement", difficulty: "Beginner" },
    { title: "I agree with that.", hindi: "मैं इससे सहमत हूं।", subcategory: "Agreement", difficulty: "Beginner" },
    { title: "That makes sense.", hindi: "यह समझ में आता है।", subcategory: "Agreement", difficulty: "Beginner" },
    { title: "Absolutely.", hindi: "बिल्कुल।", subcategory: "Agreement", difficulty: "Beginner" },
    { title: "I'm on board with that.", hindi: "मैं इसके साथ हूं।", subcategory: "Agreement", difficulty: "Intermediate" },

    // Disagreement (Polite)
    { title: "I see it differently.", hindi: "मेरा नज़रिया अलग है।", subcategory: "Disagreement", difficulty: "Intermediate" },
    { title: "I'm not entirely convinced.", hindi: "मैं पूरी तरह आश्वस्त नहीं हूं।", subcategory: "Disagreement", difficulty: "Advanced" },
    { title: "Perhaps we should reconsider.", hindi: "शायद हमें पुनर्विचार करना चाहिए।", subcategory: "Disagreement", difficulty: "Intermediate" },
    { title: "I have some concerns about this.", hindi: "इसके बारे में मेरी कुछ चिंताएं हैं।", subcategory: "Disagreement", difficulty: "Intermediate" },
    { title: "Let me play devil's advocate.", hindi: "मुझे दूसरा पक्ष रखने दीजिए।", subcategory: "Disagreement", difficulty: "Advanced" },

    // Clarification
    { title: "Can you explain that again?", hindi: "क्या आप दोबारा समझा सकते हैं?", subcategory: "Clarification", difficulty: "Beginner" },
    { title: "What do you mean by that?", hindi: "इससे आपका क्या मतलब है?", subcategory: "Clarification", difficulty: "Beginner" },
    { title: "Could you be more specific?", hindi: "क्या आप और स्पष्ट कर सकते हैं?", subcategory: "Clarification", difficulty: "Intermediate" },
    { title: "I want to make sure I understand.", hindi: "मैं सुनिश्चित करना चाहता हूं कि मैं समझा।", subcategory: "Clarification", difficulty: "Intermediate" },
    { title: "So, if I understand correctly...", hindi: "तो, अगर मैं सही समझा....", subcategory: "Clarification", difficulty: "Intermediate" },

    // Confirming
    { title: "Just to confirm...", hindi: "सिर्फ पुष्टि के लिए...", subcategory: "Confirming", difficulty: "Beginner" },
    { title: "Is that correct?", hindi: "क्या यह सही है?", subcategory: "Confirming", difficulty: "Beginner" },
    { title: "Am I right in saying that?", hindi: "क्या मैं यह कहने में सही हूं?", subcategory: "Confirming", difficulty: "Intermediate" },
    { title: "Let me repeat that back to you.", hindi: "मुझे आपको यह दोहराने दीजिए।", subcategory: "Confirming", difficulty: "Intermediate" },
    { title: "We're all clear on this?", hindi: "हम सब इस पर स्पष्ट हैं?", subcategory: "Confirming", difficulty: "Intermediate" },

    // Updates
    { title: "Here's a quick update.", hindi: "यह एक त्वरित अपडेट है।", subcategory: "Updates", difficulty: "Beginner" },
    { title: "The status is as follows.", hindi: "स्थिति इस प्रकार है।", subcategory: "Updates", difficulty: "Intermediate" },
    { title: "We've made good progress.", hindi: "हमने अच्छी प्रगति की है।", subcategory: "Updates", difficulty: "Beginner" },
    { title: "Everything is on track.", hindi: "सब कुछ सही दिशा में है।", subcategory: "Updates", difficulty: "Beginner" },
    { title: "There's been a slight delay.", hindi: "थोड़ी देरी हुई है।", subcategory: "Updates", difficulty: "Intermediate" },

    // Appreciation
    { title: "Thank you for your hard work.", hindi: "आपकी मेहनत के लिए धन्यवाद।", subcategory: "Appreciation", difficulty: "Beginner" },
    { title: "Well done!", hindi: "बहुत बढ़िया!", subcategory: "Appreciation", difficulty: "Beginner" },
    { title: "I really appreciate your effort.", hindi: "मैं आपके प्रयास की सराहना करता हूं।", subcategory: "Appreciation", difficulty: "Beginner" },
    { title: "You've done an excellent job.", hindi: "आपने बेहतरीन काम किया है।", subcategory: "Appreciation", difficulty: "Beginner" },
    { title: "Couldn't have done it without you.", hindi: "आपके बिना यह संभव नहीं था।", subcategory: "Appreciation", difficulty: "Intermediate" },
];

function generateContent(topic: { title: string; hindi: string; subcategory: string; difficulty: string }): string {
    return JSON.stringify({
        blocks: [
            {
                type: "markdown",
                content: `
# ${topic.title}

## 🎯 Learning Objective
Master the phrase "${topic.title}" for everyday office situations.

---

## 📘 English Explanation

**Phrase:** ${topic.title}

This is a ${topic.difficulty.toLowerCase()}-level phrase used in ${topic.subcategory.toLowerCase()} contexts.

### When to Use
Use this phrase in everyday office conversations.

### Examples
1. "${topic.title}"
2. Colleague: "Are you available?" — You: "${topic.title}"

---

## 📙 हिंदी व्याख्या

**वाक्य:** ${topic.hindi}

${topic.difficulty === "Beginner" ? "यह एक सरल वाक्य है जो हर रोज़ ऑफिस में उपयोग होता है।" : "इसे विभिन्न पेशेवर स्थितियों में उपयोग करें।"}

---

## 💡 Practice
Use this phrase at least once today in your workplace.
`
            }
        ]
    });
}

async function restoreFinalBatch() {
    console.log('=== RESTORING FINAL BATCH (DAILY OFFICE PHRASES) ===\n');

    const insertLessonStmt = db.prepare(`
        INSERT INTO lessons (title, hindi_title, slug, description, hindi_description, content, category, difficulty, "order", image_url)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Get max order
    const maxOrderStmt = db.prepare('SELECT MAX("order") as maxOrder FROM lessons');
    const result = maxOrderStmt.get() as { maxOrder: number };
    let currentOrder = (result.maxOrder || 1000) + 1;

    let added = 0;

    for (const topic of finalBatch) {
        try {
            const slug = topic.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50);
            const content = generateContent(topic);

            insertLessonStmt.run(
                topic.title,
                topic.hindi,
                slug,
                `Learn: "${topic.title}"`,
                `सीखें: "${topic.hindi}"`,
                content,
                "Business", // Category
                topic.difficulty,
                currentOrder++,
                "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
            );

            console.log(`✅ Restored: ${topic.title}`);
            added++;

        } catch (err: any) {
            if (err.message.includes('UNIQUE')) {
                console.log(`⏭️ Skipped (Exists): ${topic.title}`);
            } else {
                console.error(`❌ Error: ${topic.title}`, err.message);
            }
        }
    }

    console.log(`\n=== FINAL BATCH COMPLETE: ${added} lessons processed ===`);
}

restoreFinalBatch();
