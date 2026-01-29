// Hindi dialogues for conversation practice
export interface Dialogue {
  id: number;
  title: string;
  participants: string[];
  lines: {
    speaker: string;
    english: string;
    hindi: string;
    pronunciation: string;
  }[];
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  context: string;
}

export const dialogues: Dialogue[] = [
  {
    id: 1,
    title: "Meeting a Friend",
    participants: ["Raj", "Priya"],
    lines: [
      {
        speaker: "Raj",
        english: "Hi Priya! How are you?",
        hindi: "हाय प्रिया! तुम कैसी हो?",
        pronunciation: "Hi Priya! Tum kaisi ho?"
      },
      {
        speaker: "Priya",
        english: "I'm fine, thank you. How about you?",
        hindi: "मैं ठीक हूँ, धन्यवाद। तुम कैसे हो?",
        pronunciation: "Main theek hun, dhanyawad. Tum kaise ho?"
      }
    ],
    category: "social",
    difficulty: "beginner",
    context: "Casual meeting between friends"
  }
];