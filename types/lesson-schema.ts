// LOCKED CANONICAL SCHEMA - DO NOT MODIFY
export type Lesson = {
  id: number;
  level: "beginner" | "intermediate" | "advanced";
  english: string;
  hindi: string;
  pronunciation: string;
  note?: string; // OPTIONAL, lesson-specific only
};

// ❌ No other fields allowed
// ❌ No sections allowed  
// ❌ No instructional text allowed