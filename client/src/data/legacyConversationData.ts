// Legacy conversation data for compatibility
export const legacyConversationData = [
  {
    id: "1",
    title: "Daily Greetings",
    hindiTitle: "दैनिक अभिवादन",
    emoji: "👋",
    difficulty: "Easy" as const,
    conversation: [
      {
        id: "1-1",
        speaker: "A" as const,
        english: "Good morning! How are you?",
        hindi: "सुप्रभात! आप कैसे हैं?",
        emoji: "🌅"
      },
      {
        id: "1-2", 
        speaker: "B" as const,
        english: "Good morning! I'm fine, thank you.",
        hindi: "सुप्रभात! मैं ठीक हूँ, धन्यवाद।",
        emoji: "😊"
      }
    ]
  },
  {
    id: "2",
    title: "Shopping Conversations", 
    hindiTitle: "खरीदारी की बातचीत",
    emoji: "🛒",
    difficulty: "Medium" as const,
    conversation: [
      {
        id: "2-1",
        speaker: "A" as const,
        english: "How much does this cost?",
        hindi: "इसकी कीमत कितनी है?",
        emoji: "💰"
      },
      {
        id: "2-2",
        speaker: "B" as const, 
        english: "It costs fifty rupees.",
        hindi: "इसकी कीमत पचास रुपये है।",
        emoji: "💵"
      }
    ]
  }
];