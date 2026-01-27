
import { db } from '../server/db';
import { lessons } from '../shared/schema';

async function main() {
    console.log("Seeding minimal data...");

    // Clean up
    await db.delete(lessons);

    const newLessons = [];
    for (let i = 1; i <= 20; i++) {
        // Ensure ID 1, 5, 15 exist for the load test
        newLessons.push({
            id: i,
            title: `Lesson ${i}`,
            slug: `lesson-${i}`,
            description: `Description for Lesson ${i}`,
            content: JSON.stringify([{ type: 'text', value: 'Content' }]),
            difficulty: i <= 5 ? 'Beginner' : (i <= 10 ? 'Intermediate' : 'Advanced'),
            order: i,
            category: 'General',
            hindiTitle: `Paath ${i}`,
            isPublished: true
        });
    }

    await db.insert(lessons).values(newLessons);
    console.log("Seeding complete.");
}

main().catch(console.error);
