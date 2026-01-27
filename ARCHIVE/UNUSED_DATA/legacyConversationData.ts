export interface ConversationData {
  id: number;
  title: string;
  titleHindi: string;
  scenario: string;
  scenarioHindi: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  participants: string[];
  dialogue: Array<{
    speaker: string;
    text: string;
    hindi: string;
  }>;
}

export const legacyConversationData: ConversationData[] = [
  {
    id: 1,
    title: "Meeting a Friend",
    titleHindi: "दोस्त से मिलना",
    scenario: "Two friends meet after a long time",
    scenarioHindi: "दो दोस्त लंबे समय बाद मिलते हैं",
    difficulty: "beginner",
    participants: ["Alex", "Priya"],
    dialogue: [
      {
        speaker: "Alex",
        text: "Hi Priya! How have you been?",
        hindi: "हाय प्रिया! तुम कैसी हो?"
      },
      {
        speaker: "Priya",
        text: "I'm doing great! What about you?",
        hindi: "मैं बहुत अच्छी हूँ! तुम कैसे हो?"
      },
      {
        speaker: "Alex",
        text: "I'm fine too. It's been so long since we met!",
        hindi: "मैं भी ठीक हूँ। हमें मिले बहुत समय हो गया है!"
      }
    ]
  },
  {
    id: 2,
    title: "At the Restaurant",
    titleHindi: "रेस्टोरेंट में",
    scenario: "Ordering food at a restaurant",
    scenarioHindi: "रेस्टोरेंट में खाना ऑर्डर करना",
    difficulty: "intermediate",
    participants: ["Customer", "Waiter"],
    dialogue: [
      {
        speaker: "Waiter",
        text: "Good evening! Welcome to our restaurant. How can I help you?",
        hindi: "शुभ संध्या! हमारे रेस्टोरेंट में आपका स्वागत है। मैं आपकी कैसे मदद कर सकता हूँ?"
      },
      {
        speaker: "Customer",
        text: "Thank you. Could I see the menu, please?",
        hindi: "धन्यवाद। क्या मैं मेन्यू देख सकता हूँ?"
      },
      {
        speaker: "Waiter",
        text: "Of course! Here's our menu. Would you like something to drink first?",
        hindi: "बिल्कुल! यह हमारा मेन्यू है। क्या आप पहले कुछ पीना चाहेंगे?"
      }
    ]
  }
];

export default legacyConversationData;