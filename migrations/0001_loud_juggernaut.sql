CREATE TABLE `cultural_scenario_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`scenario_type` text NOT NULL,
	`completion_count` integer DEFAULT 0,
	`best_score` integer DEFAULT 0,
	`confidence_level` integer DEFAULT 50,
	`last_practiced` text,
	`notes` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pronunciation_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`phoneme` text NOT NULL,
	`accuracy_history` text,
	`practice_count` integer DEFAULT 0,
	`last_practiced` text,
	`mastery_level` text DEFAULT 'learning',
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `speaking_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer NOT NULL,
	`expected_text` text,
	`spoken_text` text NOT NULL,
	`accuracy_score` integer NOT NULL,
	`pronunciation_issues` text,
	`feedback_data` text,
	`audio_duration_ms` integer,
	`attempt_number` integer NOT NULL,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`session_id`) REFERENCES `speaking_sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `speaking_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`lesson_id` integer,
	`scenario_id` integer,
	`session_type` text NOT NULL,
	`duration_seconds` integer NOT NULL,
	`overall_score` integer,
	`pronunciation_score` integer,
	`fluency_score` integer,
	`confidence_score` integer,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`completed_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`scenario_id`) REFERENCES `scenarios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_speaking_profiles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`current_level` text DEFAULT 'beginner' NOT NULL,
	`weak_phonemes` text,
	`strong_areas` text,
	`preferred_practice_type` text DEFAULT 'mixed',
	`cultural_context_preference` text DEFAULT 'indian_english',
	`total_practice_minutes` integer DEFAULT 0,
	`last_assessment_date` text,
	`improvement_rate` integer DEFAULT 0,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`updated_at` text DEFAULT 'CURRENT_TIMESTAMP',
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_speaking_profiles_user_id_unique` ON `user_speaking_profiles` (`user_id`);--> statement-breakpoint
ALTER TABLE `lessons` ADD `speaking_exercises` text;--> statement-breakpoint
ALTER TABLE `user_stats` ADD `speaking_minutes` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `user_stats` ADD `pronunciation_accuracy_avg` integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE `vocabulary` ADD `pronunciation_difficulty` integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE `vocabulary` ADD `common_mispronunciation` text;