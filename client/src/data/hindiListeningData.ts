// Hindi listening exercises for English learners
export interface ListeningLesson {
  id: number;
  title: string;
  audioUrl?: string;
  transcript: {
    english: string;
    hindi: string;
    pronunciation: string;
  };
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number; // in seconds
}

export const listeningLessons: ListeningLesson[] = [
  {
    id: 1,
    title: "Daily Routine",
    transcript: {
      english: "I wake up at 6 AM every morning. First, I brush my teeth and take a shower.",
      hindi: "मैं हर सुबह 6 बजे उठता हूँ। पहले मैं अपने दाँत साफ़ करता हूँ और नहाता हूँ।",
      pronunciation: "Main har subah 6 baje uthta hun. Pehle main apne daant saaf karta hun aur nahata hun."
    },
    questions: [
      {
        question: "What time does the person wake up?",
        options: ["5 AM", "6 AM", "7 AM", "8 AM"],
        correctAnswer: 1
      }
    ],
    difficulty: "beginner",
    category: "daily_life",
    duration: 30
  }
];