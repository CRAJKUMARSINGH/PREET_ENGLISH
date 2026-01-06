import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation & Layout
      "welcome": "Welcome back to Preet English",
      "subtitle": "Continue your journey to mastering English with Hindi translations and pronunciation guides. You're doing great!",
      "home": "Home",
      "profile": "My Profile",
      "lessons": "Lessons",
      "vocabulary": "Vocabulary",
      "progress": "Progress",
      "language": "Language",
      
      // Lesson Interface
      "start_lesson": "Start Lesson",
      "review_lesson": "Review Lesson",
      "mark_complete": "Mark as Complete",
      "completed": "Completed",
      "back_to_dashboard": "Back to Dashboard",
      "key_vocabulary": "Key Vocabulary",
      "listen_pronunciation": "Listen to pronunciation",
      "hindi_translation": "Hindi Translation",
      "pronunciation": "Pronunciation",
      
      // Progress & Stats
      "your_progress": "Your Progress",
      "lessons_completed": "Lessons Completed",
      "available_lessons": "Available Lessons",
      "keep_momentum": "Keep up the momentum to unlock your full potential.",
      
      // Difficulty Levels
      "beginner": "Beginner",
      "intermediate": "Intermediate", 
      "advanced": "Advanced",
      
      // Categories
      "greetings": "Greetings",
      "daily": "Daily Conversations",
      "business": "Business",
      "travel": "Travel",
      "shopping": "Shopping",
      "food": "Food & Dining",
      "health": "Health",
      "education": "Education",
      "technology": "Technology",
      "grammar": "Grammar",
      "idioms": "Idioms",
      "emotions": "Emotions",
      "weather": "Weather",
      "numbers": "Numbers",
      "family": "Family",
      "hobbies": "Hobbies",
      
      // Additional UI Elements
      "loading": "Loading...",
      "error": "Error",
      "retry": "Retry",
      "no_lessons": "No lessons available yet. Check back soon!",
      "lesson_duration": "15 mins",
      "pro_tip": "Pro Tip",
      "consistency_tip": "Consistency is key! Try to complete one lesson every day to build your vocabulary.",
      
      // Credits
      "prepared_by": "Prepared on Initiative of",
      "initiative_credit": "An Initiative by",
      "dedication_message": "Dedicated to English Learning Excellence",
      
      // Celebration
      "congratulations": "Congratulations",
      "lesson_completed_message": "You've successfully completed this lesson!",
      "keep_learning_message": "You're making amazing progress!",
      "continue_learning": "Continue Learning"
    }
  },
  hi: {
    translation: {
      // Navigation & Layout
      "welcome": "प्रीत इंग्लिश में वापस स्वागत है",
      "subtitle": "हिंदी अनुवाद और उच्चारण गाइड के साथ अंग्रेजी में महारत हासिल करने की अपनी यात्रा जारी रखें। आप बहुत अच्छा कर रहे हैं!",
      "home": "होम",
      "profile": "मेरी प्रोफाइल",
      "lessons": "पाठ",
      "vocabulary": "शब्दावली",
      "progress": "प्रगति",
      "language": "भाषा",
      
      // Lesson Interface
      "start_lesson": "पाठ शुरू करें",
      "review_lesson": "पाठ की समीक्षा करें",
      "mark_complete": "पूर्ण के रूप में चिह्नित करें",
      "completed": "पूर्ण",
      "back_to_dashboard": "डैशबोर्ड पर वापस जाएं",
      "key_vocabulary": "मुख्य शब्दावली",
      "listen_pronunciation": "उच्चारण सुनें",
      "hindi_translation": "हिंदी अनुवाद",
      "pronunciation": "उच्चारण",
      
      // Progress & Stats
      "your_progress": "आपकी प्रगति",
      "lessons_completed": "पाठ पूर्ण",
      "available_lessons": "उपलब्ध पाठ",
      "keep_momentum": "अपनी पूरी क्षमता को अनलॉक करने के लिए गति बनाए रखें।",
      
      // Difficulty Levels
      "beginner": "शुरुआती",
      "intermediate": "मध्यम",
      "advanced": "उन्नत",
      
      // Categories
      "greetings": "अभिवादन",
      "daily": "दैनिक बातचीत",
      "business": "व्यापार",
      "travel": "यात्रा",
      "shopping": "खरीदारी",
      "food": "भोजन और भोजन",
      "health": "स्वास्थ्य",
      "education": "शिक्षा",
      "technology": "प्रौद्योगिकी",
      "grammar": "व्याकरण",
      "idioms": "मुहावरे",
      "emotions": "भावनाएं",
      "weather": "मौसम",
      "numbers": "संख्याएं",
      "family": "परिवार",
      "hobbies": "शौक",
      
      // Additional UI Elements
      "loading": "लोड हो रहा है...",
      "error": "त्रुटि",
      "retry": "पुनः प्रयास करें",
      "no_lessons": "अभी तक कोई पाठ उपलब्ध नहीं है। जल्द ही वापस देखें!",
      "lesson_duration": "15 मिनट",
      "pro_tip": "प्रो टिप",
      "consistency_tip": "निरंतरता महत्वपूर्ण है! अपनी शब्दावली बनाने के लिए हर दिन एक पाठ पूरा करने का प्रयास करें।",
      
      // Credits
      "prepared_by": "की पहल पर तैयार",
      "initiative_credit": "की पहल",
      "dedication_message": "अंग्रेजी सीखने की उत्कृष्टता को समर्पित",
      
      // Celebration
      "congratulations": "बधाई हो",
      "lesson_completed_message": "आपने इस पाठ को सफलतापूर्वक पूरा किया है!",
      "keep_learning_message": "आप अद्भुत प्रगति कर रहे हैं!",
      "continue_learning": "सीखना जारी रखें"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || "en", // Remember user preference
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

// Save language preference
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;