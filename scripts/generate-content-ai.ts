#!/usr/bin/env tsx
// Week 12: AI Content Generation Pipeline
import { OpenAIProvider } from '../lib/ai/providers/openai';
import { prisma } from '../lib/prisma';

const ai = new OpenAIProvider();

async function generateLesson(topic: string, difficulty: string): Promise<any> {
  const prompt = `Create an English lesson for Hindi speakers on topic: "${topic}" at ${difficulty} level. Include:
1. Title (English and Hindi)
2. Description
3. 5 vocabulary words with Hindi translations
4. 3 example sentences
5. Practice exercises`;

  const response = await ai.generateResponse(prompt);
  
  // Parse AI response and structure lesson
  return {
    title: `${topic} - ${difficulty}`,
    titleHindi: `${topic} (हिंदी)`,
    description: response,
    difficulty: difficulty.toLowerCase(),
    category: 'AI Generated',
    content: response,
  };
}

async function generateBulkLessons(count: number = 100) {
  const topics = [
    'Business Communication',
    'Travel English',
    'Job Interviews',
    'Daily Conversations',
    'Technical English',
  ];
  
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  
  console.log(`🚀 Generating ${count} lessons...`);
  
  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length];
    const difficulty = difficulties[i % difficulties.length];
    
    try {
      const lesson = await generateLesson(topic, difficulty);
      
      await prisma.lesson.create({
        data: {
          ...lesson,
          slug: `ai-${topic.toLowerCase().replace(/\s+/g, '-')}-${i}`,
          order: 2000 + i,
        },
      });
      
      console.log(`✅ Generated lesson ${i + 1}/${count}: ${lesson.title}`);
    } catch (error) {
      console.error(`❌ Failed to generate lesson ${i + 1}:`, error);
    }
  }
  
  console.log(`🎉 Generated ${count} lessons successfully!`);
}

if (require.main === module) {
  generateBulkLessons(100).then(() => process.exit(0));
}
