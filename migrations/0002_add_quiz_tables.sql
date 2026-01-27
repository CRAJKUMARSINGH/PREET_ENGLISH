--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `quizzes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`title_hindi` text,
	`description` text,
	`description_hindi` text,
	`difficulty` text NOT NULL,
	`category` text NOT NULL,
	`passing_score` integer DEFAULT 70,
	`time_limit` integer,
	`order` integer DEFAULT 0 NOT NULL,
	`lesson_id` integer,
	`xp_reward` integer DEFAULT 50,
	`hints_allowed` integer DEFAULT true,
	FOREIGN KEY (`lesson_id`) REFERENCES `lessons`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `quiz_questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`quiz_id` integer NOT NULL,
	`question_text` text NOT NULL,
	`question_text_hindi` text,
	`question_type` text NOT NULL,
	`options` text,
	`correct_answer` text NOT NULL,
	`explanation` text,
	`explanation_hindi` text,
	`points` integer DEFAULT 10,
	`order` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `quiz_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`quiz_id` integer NOT NULL,
	`score` integer NOT NULL,
	`total_questions` integer NOT NULL,
	`answers` text,
	`time_spent` integer,
	`passed` integer DEFAULT false,
	`completed_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON UPDATE no action ON DELETE no action
);

