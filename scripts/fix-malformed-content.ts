
import { db } from "../server/db";
import { lessons } from "@shared/schema";
import { eq, or, like } from "drizzle-orm";

/**
 * FIX MALFORMED CONTENT
 * Detects and repairs lessons with 'undefined' or '[object Object]' in content.
 */

async function fix() {
    console.log("🛠️ Starting content repair...");

    const malformed = await db.select().from(lessons).where(
        or(
            like(lessons.content, "%undefined%"),
            like(lessons.content, "%[object Object]%")
        )
    );

    console.log(`Found ${malformed.length} malformed lessons.`);

    for (const l of malformed) {
        console.log(`Repairing [${l.id}] ${l.title}...`);

        // Basic template regeneration
        const cleanContent = `
# ${l.title}
## 🎯 Learning Objective (सीखने का उद्देश्य)
Master the concepts and vocabulary related to ${l.title} for better communication skills.

---

## 📘 Lesson Overview
This lesson focuses on practical usage of English in the context of **${l.title}**. 
Hindi speakers often find these specific business and professional terms useful for career growth.

---

## 💡 Key Tips (मुख्य सुझाव)
- **Practice Daily:** Use these phrases in your mock interviews or daily office talk.
- **Listen Closely:** Pay attention to how native speakers stress certain words.
- **Translate Mentally:** Try to think in English before speaking.

---

## 🗣️ Conversation Practice
Use the practice dialogue below to increase your situational fluency.
        `;

        await db.update(lessons)
            .set({ content: cleanContent.trim() })
            .where(eq(lessons.id, l.id));
    }

    console.log("✅ Repair complete!");
    process.exit(0);
}

fix().catch(console.error);
