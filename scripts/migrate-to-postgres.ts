#!/usr/bin/env tsx

/**
 * PostgreSQL Migration Script for PREET_ENGLISH
 * 
 * This script migrates the SQLite schema to PostgreSQL for Vercel deployment.
 * It handles the conversion of SQLite-specific types to PostgreSQL equivalents.
 * 
 * Usage:
 *   npm run migrate:postgres
 *   or
 *   tsx scripts/migrate-to-postgres.ts
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL environment variable is required');
  console.error('   Set it to your PostgreSQL connection string');
  console.error('   Example: postgresql://user:password@host:5432/database');
  process.exit(1);
}

if (!DATABASE_URL.startsWith('postgresql://') && !DATABASE_URL.startsWith('postgres://')) {
  console.error('❌ DATABASE_URL must be a PostgreSQL connection string');
  console.error('   Current value appears to be SQLite');
  console.error('   Use a PostgreSQL database for production deployment');
  process.exit(1);
}

// PostgreSQL Schema Creation SQL
const POSTGRES_SCHEMA = `
-- PREET_ENGLISH PostgreSQL Schema
-- Generated from SQLite schema for Vercel deployment

-- Enable UUID extension for better IDs (optional)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "is_admin" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lessons table
CREATE TABLE IF NOT EXISTS "lessons" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "slug" VARCHAR(255) NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "difficulty" VARCHAR(50) NOT NULL,
  "order" INTEGER NOT NULL,
  "image_url" VARCHAR(500),
  "emoji_theme" VARCHAR(10),
  "hindi_title" VARCHAR(255),
  "hindi_description" TEXT,
  "category" VARCHAR(100) NOT NULL DEFAULT 'General',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vocabulary table
CREATE TABLE IF NOT EXISTS "vocabulary" (
  "id" SERIAL PRIMARY KEY,
  "lesson_id" INTEGER NOT NULL REFERENCES "lessons"("id") ON DELETE CASCADE,
  "word" VARCHAR(255) NOT NULL,
  "pronunciation" VARCHAR(255),
  "definition" TEXT NOT NULL,
  "example" TEXT NOT NULL,
  "hindi_translation" VARCHAR(255),
  "hindi_pronunciation" VARCHAR(255),
  "example_hindi" TEXT,
  "usage_hindi" TEXT,
  "audio_url" VARCHAR(500),
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversation Lines table
CREATE TABLE IF NOT EXISTS "conversation_lines" (
  "id" SERIAL PRIMARY KEY,
  "lesson_id" INTEGER NOT NULL REFERENCES "lessons"("id") ON DELETE CASCADE,
  "speaker" VARCHAR(100) NOT NULL,
  "english_text" TEXT NOT NULL,
  "hindi_text" TEXT NOT NULL,
  "emoji" VARCHAR(10),
  "line_order" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Progress table
CREATE TABLE IF NOT EXISTS "progress" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "lesson_id" INTEGER NOT NULL REFERENCES "lessons"("id") ON DELETE CASCADE,
  "completed" BOOLEAN DEFAULT FALSE,
  "completed_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("user_id", "lesson_id")
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS "quizzes" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "title_hindi" VARCHAR(255),
  "description" TEXT,
  "difficulty" VARCHAR(50) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "passing_score" INTEGER DEFAULT 70,
  "time_limit" INTEGER,
  "order" INTEGER NOT NULL,
  "lesson_id" INTEGER REFERENCES "lessons"("id") ON DELETE SET NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz Questions table
CREATE TABLE IF NOT EXISTS "quiz_questions" (
  "id" SERIAL PRIMARY KEY,
  "quiz_id" INTEGER NOT NULL REFERENCES "quizzes"("id") ON DELETE CASCADE,
  "question_text" TEXT NOT NULL,
  "question_text_hindi" TEXT,
  "question_type" VARCHAR(50) NOT NULL,
  "options" JSONB,
  "correct_answer" TEXT NOT NULL,
  "explanation" TEXT,
  "points" INTEGER DEFAULT 10,
  "order" INTEGER NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz Attempts table
CREATE TABLE IF NOT EXISTS "quiz_attempts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "quiz_id" INTEGER NOT NULL REFERENCES "quizzes"("id") ON DELETE CASCADE,
  "score" INTEGER NOT NULL,
  "total_points" INTEGER NOT NULL,
  "percentage" INTEGER NOT NULL,
  "passed" BOOLEAN DEFAULT FALSE,
  "answers" JSONB,
  "started_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "completed_at" TIMESTAMP
);

-- User Stats table (Gamification)
CREATE TABLE IF NOT EXISTS "user_stats" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE UNIQUE,
  "xp_points" INTEGER DEFAULT 0,
  "level" INTEGER DEFAULT 1,
  "current_streak" INTEGER DEFAULT 0,
  "longest_streak" INTEGER DEFAULT 0,
  "last_active_date" DATE,
  "total_lessons_completed" INTEGER DEFAULT 0,
  "total_quizzes_passed" INTEGER DEFAULT 0,
  "total_minutes_learned" INTEGER DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Achievements table
CREATE TABLE IF NOT EXISTS "achievements" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "name_hindi" VARCHAR(255),
  "description" TEXT NOT NULL,
  "description_hindi" TEXT,
  "icon" VARCHAR(50) NOT NULL,
  "xp_reward" INTEGER DEFAULT 50,
  "requirement" JSONB NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Achievements table
CREATE TABLE IF NOT EXISTS "user_achievements" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "achievement_id" INTEGER NOT NULL REFERENCES "achievements"("id") ON DELETE CASCADE,
  "unlocked_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("user_id", "achievement_id")
);

-- Daily Goals table
CREATE TABLE IF NOT EXISTS "daily_goals" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "date" DATE NOT NULL,
  "lessons_target" INTEGER DEFAULT 3,
  "lessons_completed" INTEGER DEFAULT 0,
  "xp_target" INTEGER DEFAULT 50,
  "xp_earned" INTEGER DEFAULT 0,
  "minutes_target" INTEGER DEFAULT 15,
  "minutes_spent" INTEGER DEFAULT 0,
  "completed" BOOLEAN DEFAULT FALSE,
  UNIQUE("user_id", "date")
);

-- Leaderboard table
CREATE TABLE IF NOT EXISTS "leaderboard" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "week_start" DATE NOT NULL,
  "xp_earned" INTEGER DEFAULT 0,
  "lessons_completed" INTEGER DEFAULT 0,
  "rank" INTEGER,
  UNIQUE("user_id", "week_start")
);

-- Scenarios table
CREATE TABLE IF NOT EXISTS "scenarios" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "title_hindi" VARCHAR(255),
  "description" TEXT NOT NULL,
  "description_hindi" TEXT,
  "your_role" VARCHAR(255),
  "your_role_hindi" VARCHAR(255),
  "partner_role" VARCHAR(255),
  "partner_role_hindi" VARCHAR(255),
  "category" VARCHAR(100) NOT NULL,
  "difficulty" VARCHAR(50) NOT NULL,
  "dialogues" JSONB NOT NULL,
  "tips" JSONB,
  "xp_reward" INTEGER DEFAULT 30,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scenario Progress table
CREATE TABLE IF NOT EXISTS "scenario_progress" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "scenario_id" INTEGER NOT NULL REFERENCES "scenarios"("id") ON DELETE CASCADE,
  "completed" BOOLEAN DEFAULT FALSE,
  "score" INTEGER,
  "completed_at" TIMESTAMP,
  UNIQUE("user_id", "scenario_id")
);

-- Vocabulary Progress table (SRS)
CREATE TABLE IF NOT EXISTS "vocabulary_progress" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "vocabulary_id" INTEGER NOT NULL REFERENCES "vocabulary"("id") ON DELETE CASCADE,
  "interval" INTEGER DEFAULT 0,
  "ease_factor" INTEGER DEFAULT 250,
  "repetition" INTEGER DEFAULT 0,
  "next_review_date" TIMESTAMP NOT NULL,
  "last_reviewed_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("user_id", "vocabulary_id")
);

-- Stories table
CREATE TABLE IF NOT EXISTS "stories" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "title_hindi" VARCHAR(255),
  "description" TEXT NOT NULL,
  "description_hindi" TEXT,
  "content" TEXT NOT NULL,
  "content_hindi" TEXT,
  "image_url" VARCHAR(500),
  "difficulty" VARCHAR(50) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "vocabulary" JSONB,
  "xp_reward" INTEGER DEFAULT 50,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Listening Lessons table
CREATE TABLE IF NOT EXISTS "listenings" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "title_hindi" VARCHAR(255),
  "description" TEXT NOT NULL,
  "description_hindi" TEXT,
  "difficulty" VARCHAR(50) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "audio_text" TEXT NOT NULL,
  "audio_text_hindi" TEXT,
  "duration" VARCHAR(20),
  "questions" JSONB NOT NULL,
  "vocabulary" JSONB,
  "order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Speaking Topics table
CREATE TABLE IF NOT EXISTS "speaking_topics" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "hindi_title" VARCHAR(255),
  "difficulty" VARCHAR(50) NOT NULL,
  "emoji" VARCHAR(10),
  "category" VARCHAR(100) NOT NULL,
  "hindi_thoughts" JSONB,
  "sentence_frames" JSONB,
  "model_answer" TEXT,
  "free_prompt" TEXT,
  "confidence_tip" TEXT,
  "order" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity Feed table
CREATE TABLE IF NOT EXISTS "activity_feed" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "type" VARCHAR(50) NOT NULL,
  "reference_id" INTEGER,
  "content" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content Ratings table
CREATE TABLE IF NOT EXISTS "content_ratings" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "content_type" VARCHAR(50) NOT NULL,
  "content_id" INTEGER NOT NULL,
  "rating" INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  "review" TEXT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("user_id", "content_type", "content_id")
);

-- Certifications table
CREATE TABLE IF NOT EXISTS "certifications" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "level" VARCHAR(100) NOT NULL,
  "earned_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "lessons_completed" INTEGER NOT NULL,
  "quizzes_passed" INTEGER NOT NULL,
  "average_score" INTEGER NOT NULL
);

-- Session storage table (for production session management)
CREATE TABLE IF NOT EXISTS "user_sessions" (
  "sid" VARCHAR NOT NULL PRIMARY KEY,
  "sess" JSONB NOT NULL,
  "expire" TIMESTAMP(6) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_lessons_difficulty" ON "lessons" ("difficulty");
CREATE INDEX IF NOT EXISTS "idx_lessons_category" ON "lessons" ("category");
CREATE INDEX IF NOT EXISTS "idx_lessons_order" ON "lessons" ("order");
CREATE INDEX IF NOT EXISTS "idx_vocabulary_lesson_id" ON "vocabulary" ("lesson_id");
CREATE INDEX IF NOT EXISTS "idx_progress_user_id" ON "progress" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_progress_lesson_id" ON "progress" ("lesson_id");
CREATE INDEX IF NOT EXISTS "idx_quiz_attempts_user_id" ON "quiz_attempts" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_user_stats_user_id" ON "user_stats" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_user_achievements_user_id" ON "user_achievements" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_daily_goals_user_date" ON "daily_goals" ("user_id", "date");
CREATE INDEX IF NOT EXISTS "idx_leaderboard_week" ON "leaderboard" ("week_start");
CREATE INDEX IF NOT EXISTS "idx_vocabulary_progress_user_id" ON "vocabulary_progress" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_vocabulary_progress_next_review" ON "vocabulary_progress" ("next_review_date");
CREATE INDEX IF NOT EXISTS "idx_activity_feed_user_id" ON "activity_feed" ("user_id");
CREATE INDEX IF NOT EXISTS "idx_content_ratings_content" ON "content_ratings" ("content_type", "content_id");
CREATE INDEX IF NOT EXISTS "idx_session_expire" ON "user_sessions" ("expire");

-- Auto-delete expired sessions (PostgreSQL function)
CREATE OR REPLACE FUNCTION delete_expired_sessions()
RETURNS TRIGGER AS $$
BEGIN
  DELETE FROM user_sessions WHERE expire < NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-cleanup
DROP TRIGGER IF EXISTS trigger_delete_expired_sessions ON user_sessions;
CREATE TRIGGER trigger_delete_expired_sessions
  AFTER INSERT ON user_sessions
  EXECUTE FUNCTION delete_expired_sessions();
`;

// Sample data insertion
const SAMPLE_DATA = `
-- Insert sample data for testing

-- Sample user (password: 'password123' hashed with bcrypt)
INSERT INTO "users" ("username", "password", "is_admin") VALUES 
('demo_user', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQj', false),
('admin', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQj', true)
ON CONFLICT (username) DO NOTHING;

-- Sample lessons
INSERT INTO "lessons" ("title", "slug", "description", "content", "difficulty", "order", "category", "hindi_title", "hindi_description") VALUES 
('Introduction to Greetings', 'intro-greetings', 'Learn how to say hello and introduce yourself.', '# Greetings\n\nIn this lesson, we will learn basic greetings.\n\n- **Hello**: A formal greeting.\n- **Hi**: An informal greeting.', 'Beginner', 1, 'Greetings', 'अभिवादन का परिचय', 'नमस्ते कहना और अपना परिचय देना सीखें।'),
('Common Verbs', 'common-verbs', 'Essential verbs for daily communication.', '# Verbs\n\nVerbs are action words.\n\n- **To be**: I am, you are, he is.\n- **To have**: I have, you have.', 'Beginner', 2, 'Grammar', 'सामान्य क्रियाएं', 'दैनिक संवाद के लिए आवश्यक क्रियाएं।'),
('Numbers and Counting', 'numbers-counting', 'Learn to count and use numbers in English.', '# Numbers\n\nLearn numbers from 1 to 100.', 'Beginner', 3, 'Basics', 'संख्याएं और गिनती', 'अंग्रेजी में गिनती और संख्याओं का उपयोग सीखें।')
ON CONFLICT (slug) DO NOTHING;

-- Sample vocabulary
INSERT INTO "vocabulary" ("lesson_id", "word", "definition", "example", "pronunciation", "hindi_translation", "example_hindi") VALUES 
(1, 'Hello', 'Used as a greeting or to begin a telephone conversation.', 'Hello, how are you?', '/həˈləʊ/', 'नमस्ते', 'नमस्ते, आप कैसे हैं?'),
(1, 'Morning', 'The period of time between midnight and noon.', 'Good morning!', '/ˈmɔːnɪŋ/', 'सुबह', 'सुप्रभात!'),
(2, 'Run', 'Move at a speed faster than a walk.', 'I run every morning.', '/rʌn/', 'दौड़ना', 'मैं हर सुबह दौड़ता हूं।')
ON CONFLICT DO NOTHING;

-- Sample achievements
INSERT INTO "achievements" ("name", "description", "icon", "xp_reward", "requirement", "category", "name_hindi", "description_hindi") VALUES 
('First Steps', 'Complete your first lesson', '🎯', 50, '{"type": "lessons_completed", "value": 1}', 'lessons', 'पहले कदम', 'अपना पहला पाठ पूरा करें'),
('Quiz Master', 'Score 100% on any quiz', '🏆', 100, '{"type": "quiz_perfect", "value": 1}', 'quiz', 'प्रश्नोत्तरी मास्टर', 'किसी भी प्रश्नोत्तरी में 100% स्कोर करें'),
('Week Warrior', 'Maintain a 7-day streak', '🔥', 200, '{"type": "streak", "value": 7}', 'streak', 'सप्ताह योद्धा', '7 दिन की स्ट्रीक बनाए रखें')
ON CONFLICT DO NOTHING;

-- Initialize user stats for demo user
INSERT INTO "user_stats" ("user_id", "xp_points", "level", "current_streak", "longest_streak", "last_active_date") VALUES 
(1, 0, 1, 0, 0, CURRENT_DATE)
ON CONFLICT (user_id) DO NOTHING;
`;

async function runMigration() {
  console.log('🚀 Starting PostgreSQL migration for PREET_ENGLISH...\n');

  try {
    // Connect to PostgreSQL
    console.log('📡 Connecting to PostgreSQL database...');
    const client = postgres(DATABASE_URL, {
      ssl: 'require',
      max: 1,
    });

    const db = drizzle(client);

    console.log('✅ Connected successfully!\n');

    // Create schema
    console.log('📋 Creating database schema...');
    await client.unsafe(POSTGRES_SCHEMA);
    console.log('✅ Schema created successfully!\n');

    // Insert sample data
    console.log('📝 Inserting sample data...');
    await client.unsafe(SAMPLE_DATA);
    console.log('✅ Sample data inserted successfully!\n');

    // Verify migration
    console.log('🔍 Verifying migration...');
    const tables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;

    console.log('📊 Created tables:');
    tables.forEach((table: any) => {
      console.log(`   ✓ ${table.table_name}`);
    });

    // Check sample data
    const userCount = await client`SELECT COUNT(*) as count FROM users`;
    const lessonCount = await client`SELECT COUNT(*) as count FROM lessons`;
    const vocabCount = await client`SELECT COUNT(*) as count FROM vocabulary`;

    console.log('\n📈 Sample data verification:');
    console.log(`   ✓ Users: ${userCount[0].count}`);
    console.log(`   ✓ Lessons: ${lessonCount[0].count}`);
    console.log(`   ✓ Vocabulary: ${vocabCount[0].count}`);

    await client.end();

    console.log('\n🎉 PostgreSQL migration completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Update your Vercel environment variables');
    console.log('   2. Deploy your application');
    console.log('   3. Test the deployment');
    console.log('\n🔗 Your app should now work with PostgreSQL on Vercel!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
        console.error('\n💡 Connection troubleshooting:');
        console.error('   - Verify DATABASE_URL is correct');
        console.error('   - Check if database server is running');
        console.error('   - Ensure SSL is properly configured');
        console.error('   - Verify network connectivity');
      } else if (error.message.includes('authentication')) {
        console.error('\n💡 Authentication troubleshooting:');
        console.error('   - Check username and password in DATABASE_URL');
        console.error('   - Verify database user has necessary permissions');
      } else if (error.message.includes('permission')) {
        console.error('\n💡 Permission troubleshooting:');
        console.error('   - Ensure database user has CREATE TABLE permissions');
        console.error('   - Check if database exists and is accessible');
      }
    }
    
    process.exit(1);
  }
}

// Run migration if called directly
if (require.main === module) {
  runMigration();
}

export { runMigration };