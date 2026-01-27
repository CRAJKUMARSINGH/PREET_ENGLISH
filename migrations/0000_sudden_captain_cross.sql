CREATE TABLE `achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`name_hindi` text,
	`description` text NOT NULL,
	`description_hindi` text,
	`icon` text NOT NULL,
	`xp_reward` integer DEFAULT 50,
	`requirement` text NOT NULL,
	`category` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `activity_feed` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`type` text NOT NULL,
	`reference_id` integer,
	`content` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `certifications` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`level` text NOT NULL,
	`earned_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`lessons_completed` integer NOT NULL,
	`quizzes_passed` integer NOT NULL,
	`average_score` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `content_ratings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`content_type` text NOT NULL,
	`content_id` integer NOT NULL,
	`rating` integer NOT NULL,
	`review` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `conversation_lines` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lesson_id` integer NOT NULL,
	`speaker` text NOT NULL,
	`english_text` text NOT NULL,
	`hindi_text` text NOT NULL,
	`emoji` text,
	`line_order` integer NOT NULL,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`title` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `daily_goals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`date` text NOT NULL,
	`lessons_target` integer DEFAULT 3,
	`lessons_completed` integer DEFAULT 0,
	`xp_target` integer DEFAULT 50,
	`xp_earned` integer DEFAULT 0,
	`minutes_target` integer DEFAULT 15,
	`minutes_spent` integer DEFAULT 0,
	`completed` integer DEFAULT false,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `leaderboard` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`week_start` text NOT NULL,
	`xp_earned` integer DEFAULT 0,
	`lessons_completed` integer DEFAULT 0,
	`rank` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lessons` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`difficulty` text NOT NULL,
	`order` integer NOT NULL,
	`image_url` text,
	`emoji_theme` text,
	`hindi_title` text,
	`hindi_description` text,
	`category` text DEFAULT 'General' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `lessons_slug_unique` ON `lessons` (`slug`);--> statement-breakpoint
CREATE TABLE `listenings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`title_hindi` text,
	`description` text NOT NULL,
	`description_hindi` text,
	`difficulty` text NOT NULL,
	`category` text NOT NULL,
	`audio_text` text NOT NULL,
	`audio_text_hindi` text,
	`duration` text,
	`questions` text NOT NULL,
	`vocabulary` text,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`conversation_id` integer NOT NULL,
	`role` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`lesson_id` integer NOT NULL,
	`completed` integer DEFAULT false,
	`completed_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `quiz_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`quiz_id` integer NOT NULL,
	`score` integer NOT NULL,
	`total_points` integer NOT NULL,
	`percentage` integer NOT NULL,
	`passed` integer DEFAULT false,
	`answers` text,
	`started_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`completed_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `quiz_questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quiz_id` integer NOT NULL,
	`question_text` text NOT NULL,
	`question_text_hindi` text,
	`question_type` text NOT NULL,
	`options` text,
	`correct_answer` text NOT NULL,
	`explanation` text,
	`points` integer DEFAULT 10,
	`order` integer NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `quizzes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`title_hindi` text,
	`description` text,
	`difficulty` text NOT NULL,
	`category` text NOT NULL,
	`passing_score` integer DEFAULT 70,
	`time_limit` integer,
	`order` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scenario_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`scenario_id` integer NOT NULL,
	`completed` integer DEFAULT false,
	`score` integer,
	`completed_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`scenario_id`) REFERENCES `scenarios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `scenarios` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`title_hindi` text,
	`description` text,
	`description_hindi` text,
	`your_role` text,
	`your_role_hindi` text,
	`partner_role` text,
	`partner_role_hindi` text,
	`category` text NOT NULL,
	`difficulty` text NOT NULL,
	`dialogues` text NOT NULL,
	`tips` text,
	`xp_reward` integer DEFAULT 30
);
--> statement-breakpoint
CREATE TABLE `speaking_topics` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`hindi_title` text,
	`difficulty` text NOT NULL,
	`emoji` text,
	`category` text NOT NULL,
	`hindi_thoughts` text,
	`sentence_frames` text,
	`model_answer` text,
	`free_prompt` text,
	`confidence_tip` text,
	`order` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`title_hindi` text,
	`description` text NOT NULL,
	`description_hindi` text,
	`content` text NOT NULL,
	`content_hindi` text,
	`image_url` text,
	`difficulty` text NOT NULL,
	`category` text NOT NULL,
	`order` integer DEFAULT 0 NOT NULL,
	`vocabulary` text,
	`xp_reward` integer DEFAULT 50
);
--> statement-breakpoint
CREATE TABLE `user_achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`achievement_id` integer NOT NULL,
	`unlocked_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`achievement_id`) REFERENCES `achievements`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`xp_points` integer DEFAULT 0,
	`level` integer DEFAULT 1,
	`current_streak` integer DEFAULT 0,
	`longest_streak` integer DEFAULT 0,
	`last_active_date` text,
	`total_lessons_completed` integer DEFAULT 0,
	`total_quizzes_passed` integer DEFAULT 0,
	`total_minutes_learned` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_stats_user_id_unique` ON `user_stats` (`user_id`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`is_admin` integer DEFAULT false
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE TABLE `vocabulary` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`lesson_id` integer NOT NULL,
	`word` text NOT NULL,
	`pronunciation` text,
	`definition` text NOT NULL,
	`example` text NOT NULL,
	`hindi_translation` text,
	`hindi_pronunciation` text,
	`example_hindi` text,
	`usage_hindi` text,
	`audio_url` text,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `vocabulary_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`vocabulary_id` integer NOT NULL,
	`interval` integer DEFAULT 0,
	`ease_factor` integer DEFAULT 250,
	`repetition` integer DEFAULT 0,
	`next_review_date` text NOT NULL,
	`last_reviewed_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON UPDATE no action ON DELETE no action
);
