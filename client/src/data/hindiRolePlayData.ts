// Role-play scenarios for English conversation practice
export interface RolePlayScenario {
  id: number;
  title: string;
  description: string;
  roles: {
    name: string;
    description: string;
    objectives: string[];
  }[];
  setting: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  keyPhrases: {
    english: string;
    hindi: string;
    pronunciation: string;
  }[];
  duration: number; // in minutes
}

export const rolePlayScenarios: RolePlayScenario[] = [
  {
    id: 1,
    title: "At the Restaurant",
    description: "Practice ordering food and interacting with restaurant staff",
    roles: [
      {
        name: "Customer",
        description: "A person dining at a restaurant",
        objectives: ["Order food", "Ask about menu items", "Request the bill"]
      },
      {
        name: "Waiter",
        description: "Restaurant staff serving customers",
        objectives: ["Take orders", "Suggest dishes", "Provide good service"]
      }
    ],
    setting: "A busy restaurant during lunch time",
    difficulty: "intermediate",
    category: "dining",
    keyPhrases: [
      {
        english: "What would you recommend?",
        hindi: "आप क्या सुझाएंगे?",
        pronunciation: "Aap kya sujhaenge?"
      },
      {
        english: "Can I have the bill, please?",
        hindi: "कृपया बिल दे सकते हैं?",
        pronunciation: "Kripaya bill de sakte hain?"
      }
    ],
    duration: 15
  }
];