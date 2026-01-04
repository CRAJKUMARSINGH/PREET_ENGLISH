import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from "lucide-react";

interface Question {
  id: number;
  question: string;
  questionHindi: string;
  options: { text: string; textHindi: string }[];
  correctAnswer: number;
  explanation: string;
  explanationHindi: string;
}

const quizzes: { storyTitle: string; storyTitleHindi: string; questions: Question[] }[] = [
  {
    storyTitle: "The Honest Woodcutter",
    storyTitleHindi: "ईमानदार लकड़हारा",
    questions: [
      {
        id: 1,
        question: "What fell into the river?",
        questionHindi: "नदी में क्या गिरा?",
        options: [
          { text: "A golden axe", textHindi: "सोने की कुल्हाड़ी" },
          { text: "An iron axe", textHindi: "लोहे की कुल्हाड़ी" },
          { text: "A silver axe", textHindi: "चांदी की कुल्हाड़ी" },
          { text: "A wooden axe", textHindi: "लकड़ी की कुल्हाड़ी" }
        ],
        correctAnswer: 1,
        explanation: "The woodcutter's iron axe slipped from his hands and fell into the river.",
        explanationHindi: "लकड़हारे की लोहे की कुल्हाड़ी उसके हाथ से फिसल कर नदी में गिर गई।"
      },
      {
        id: 2,
        question: "Who helped the woodcutter?",
        questionHindi: "लकड़हारे की मदद किसने की?",
        options: [
          { text: "A king", textHindi: "एक राजा" },
          { text: "A water fairy", textHindi: "एक जल परी" },
          { text: "Another woodcutter", textHindi: "एक और लकड़हारा" },
          { text: "A fish", textHindi: "एक मछली" }
        ],
        correctAnswer: 1,
        explanation: "A water fairy appeared and helped the woodcutter find his axe.",
        explanationHindi: "एक जल परी प्रकट हुई और लकड़हारे को उसकी कुल्हाड़ी खोजने में मदद की।"
      },
      {
        id: 3,
        question: "Why was the woodcutter rewarded?",
        questionHindi: "लकड़हारे को इनाम क्यों मिला?",
        options: [
          { text: "Because he was strong", textHindi: "क्योंकि वह मजबूत था" },
          { text: "Because he was honest", textHindi: "क्योंकि वह ईमानदार था" },
          { text: "Because he was rich", textHindi: "क्योंकि वह अमीर था" },
          { text: "Because he was clever", textHindi: "क्योंकि वह चतुर था" }
        ],
        correctAnswer: 1,
        explanation: "The woodcutter was honest and did not claim the golden or silver axes as his own.",
        explanationHindi: "लकड़हारा ईमानदार था और उसने सोने या चांदी की कुल्हाड़ियों को अपना नहीं बताया।"
      }
    ]
  },
  {
    storyTitle: "The Thirsty Crow",
    storyTitleHindi: "प्यासा कौआ",
    questions: [
      {
        id: 1,
        question: "What was the crow looking for?",
        questionHindi: "कौआ क्या ढूंढ रहा था?",
        options: [
          { text: "Food", textHindi: "खाना" },
          { text: "Water", textHindi: "पानी" },
          { text: "A nest", textHindi: "एक घोंसला" },
          { text: "Friends", textHindi: "दोस्त" }
        ],
        correctAnswer: 1,
        explanation: "The crow was very thirsty and was looking for water to drink.",
        explanationHindi: "कौआ बहुत प्यासा था और पीने के लिए पानी ढूंढ रहा था।"
      },
      {
        id: 2,
        question: "What did the crow find under the tree?",
        questionHindi: "कौए को पेड़ के नीचे क्या मिला?",
        options: [
          { text: "A bucket", textHindi: "एक बाल्टी" },
          { text: "A pot with water", textHindi: "पानी वाला घड़ा" },
          { text: "A river", textHindi: "एक नदी" },
          { text: "A well", textHindi: "एक कुआं" }
        ],
        correctAnswer: 1,
        explanation: "The crow found a pot with some water at the bottom under a tree.",
        explanationHindi: "कौए को पेड़ के नीचे एक घड़ा मिला जिसमें तल में कुछ पानी था।"
      },
      {
        id: 3,
        question: "How did the crow drink the water?",
        questionHindi: "कौए ने पानी कैसे पिया?",
        options: [
          { text: "By breaking the pot", textHindi: "घड़ा तोड़कर" },
          { text: "By dropping pebbles", textHindi: "कंकड़ डालकर" },
          { text: "By asking for help", textHindi: "मदद मांगकर" },
          { text: "By using a straw", textHindi: "तिनके का उपयोग करके" }
        ],
        correctAnswer: 1,
        explanation: "The crow dropped pebbles into the pot to raise the water level.",
        explanationHindi: "कौए ने पानी का स्तर बढ़ाने के लिए घड़े में कंकड़ डाले।"
      }
    ]
  }
];

export function ComprehensionQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<typeof quizzes[0] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null || !selectedQuiz) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === selectedQuiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (!selectedQuiz) {
    return (
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <HelpCircle className="h-6 w-6" />
            समझ की परीक्षा (Comprehension Quiz)
          </CardTitle>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            कहानी पढ़ने के बाद अपनी समझ जांचें
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {quizzes.map((quiz, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedQuiz(quiz)}
                className="p-4 border-2 border-blue-100 dark:border-blue-800 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer transition-all hover:shadow-lg"
              >
                <h3 className="font-bold text-lg">{quiz.storyTitle}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-hindi">{quiz.storyTitleHindi}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <HelpCircle className="h-4 w-4" />
                  {quiz.questions.length} questions
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    return (
      <Card className="border-2 border-blue-200 dark:border-blue-800">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Award className="h-6 w-6" />
            परिणाम (Results)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 text-center space-y-6">
          <div className="text-6xl font-bold text-blue-600">{percentage}%</div>
          <div className="text-xl">
            आपने {selectedQuiz.questions.length} में से {score} सही उत्तर दिए!
          </div>
          <div className="text-lg text-muted-foreground">
            You got {score} out of {selectedQuiz.questions.length} correct!
          </div>

          {percentage >= 80 && (
            <Badge className="text-lg py-2 px-4 bg-green-500">🎉 बहुत बढ़िया! Excellent!</Badge>
          )}
          {percentage >= 50 && percentage < 80 && (
            <Badge className="text-lg py-2 px-4 bg-yellow-500">👍 अच्छा! Good!</Badge>
          )}
          {percentage < 50 && (
            <Badge className="text-lg py-2 px-4 bg-orange-500">📚 और अभ्यास करें! Keep practicing!</Badge>
          )}

          <div className="space-y-3 text-left">
            {selectedQuiz.questions.map((q, idx) => (
              <div key={idx} className="p-3 rounded-lg border flex items-center gap-3">
                {answers[idx] === q.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">{q.question}</p>
                  <p className="text-sm text-muted-foreground font-hindi">{q.questionHindi}</p>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={resetQuiz} className="mt-4">
            <RotateCcw className="h-4 w-4 mr-2" /> फिर से शुरू करें
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = selectedQuiz.questions[currentQuestion];

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-blue-700 dark:text-blue-300">{selectedQuiz.storyTitle}</CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} / {selectedQuiz.questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border">
          <p className="text-lg font-medium">{question.question}</p>
          <p className="text-blue-600 dark:text-blue-400 font-hindi mt-1">{question.questionHindi}</p>
        </div>

        <div className="grid gap-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${selectedAnswer === idx
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                }`}
            >
              <span className="font-medium">{option.text}</span>
              <span className="text-blue-600 dark:text-blue-400 font-hindi ml-2">({option.textHindi})</span>
            </button>
          ))}
        </div>

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full"
        >
          {currentQuestion < selectedQuiz.questions.length - 1 ? "अगला प्रश्न →" : "परिणाम देखें"}
        </Button>
      </CardContent>
    </Card>
  );
}
