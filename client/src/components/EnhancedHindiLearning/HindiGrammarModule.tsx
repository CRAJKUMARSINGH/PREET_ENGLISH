import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Lightbulb,
  Heart,
  Star,
  ArrowRight,
  RotateCcw,
  Award,
  Zap,
  Brain,
  Target,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { SaraswatiMascot } from '../SaraswatiMascot';
import { CelebrationModal } from '../CelebrationModal';

interface GrammarRule {
  id: string;
  title: string;
  hindiTitle: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  englishExplanation: string;
  hindiExplanation: string;
  hindiComparison: string;
  examples: {
    correct: {
      english: string;
      hindi: string;
      hindiTranslation: string;
    };
    incorrect: {
      english: string;
      hindi: string;
      reason: string;
    };
  }[];
  practice: {
    question: string;
    questionHindi: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    explanationHindi: string;
  }[];
  xpReward: number;
}



const grammarRules: GrammarRule[] = [
  {
    id: 'subject-verb-agreement',
    title: 'Subject-Verb Agreement',
    hindiTitle: 'कर्ता-क्रिया समझौता',
    difficulty: 'beginner',
    category: 'Basic Grammar',
    englishExplanation: 'The verb must agree with the subject in number and person.',
    hindiExplanation: 'क्रिया को कर्ता के साथ संख्या और पुरुष में मेल खाना चाहिए।',
    hindiComparison: 'हिंदी में भी यही नियम है - "लड़का जाता है" (एकवचन), "लड़के जाते हैं" (बहुवचन)',
    examples: [
      {
        correct: {
          english: 'She goes to school.',
          hindi: 'वह स्कूल जाती है।',
          hindiTranslation: 'She (singular) + goes (singular verb)'
        },
        incorrect: {
          english: 'She go to school.',
          hindi: 'गलत - वह स्कूल जाना है।',
          reason: 'Singular subject needs singular verb "goes", not "go"'
        }
      },
      {
        correct: {
          english: 'They are playing cricket.',
          hindi: 'वे क्रिकेट खेल रहे हैं।',
          hindiTranslation: 'They (plural) + are (plural verb)'
        },
        incorrect: {
          english: 'They is playing cricket.',
          hindi: 'गलत - वे क्रिकेट खेल रहा है।',
          reason: 'Plural subject needs plural verb "are", not "is"'
        }
      }
    ],
    practice: [
      {
        question: 'Choose the correct verb: "My brother ___ to work every day."',
        questionHindi: 'सही क्रिया चुनें: "मेरा भाई रोज काम पर ___ है।"',
        options: ['go', 'goes', 'going', 'gone'],
        correctAnswer: 1,
        explanation: '"My brother" is singular, so we use "goes"',
        explanationHindi: '"मेरा भाई" एकवचन है, इसलिए हम "goes" का उपयोग करते हैं'
      },
      {
        question: 'Choose the correct verb: "The children ___ in the park."',
        questionHindi: 'सही क्रिया चुनें: "बच्चे पार्क में ___ हैं।"',
        options: ['is playing', 'are playing', 'was playing', 'plays'],
        correctAnswer: 1,
        explanation: '"Children" is plural, so we use "are playing"',
        explanationHindi: '"बच्चे" बहुवचन है, इसलिए हम "are playing" का उपयोग करते हैं'
      }
    ],
    xpReward: 50
  },
  {
    id: 'present-tense',
    title: 'Present Tense',
    hindiTitle: 'वर्तमान काल',
    difficulty: 'beginner',
    category: 'Tenses',
    englishExplanation: 'Present tense describes actions happening now or regularly.',
    hindiExplanation: 'वर्तमान काल उन कार्यों को दर्शाता है जो अभी हो रहे हैं या नियमित रूप से होते हैं।',
    hindiComparison: 'हिंदी में: "मैं खाता हूँ" (Simple Present), "मैं खा रहा हूँ" (Present Continuous)',
    examples: [
      {
        correct: {
          english: 'I eat rice every day.',
          hindi: 'मैं रोज चावल खाता हूँ।',
          hindiTranslation: 'Simple Present - regular action'
        },
        incorrect: {
          english: 'I am eat rice every day.',
          hindi: 'गलत - मैं रोज चावल खा रहा हूँ।',
          reason: 'For regular actions, use simple present "eat", not "am eat"'
        }
      }
    ],
    practice: [
      {
        question: 'Choose the correct form: "She ___ English very well."',
        questionHindi: 'सही रूप चुनें: "वह अंग्रेजी बहुत अच्छी ___ है।"',
        options: ['speak', 'speaks', 'speaking', 'is speak'],
        correctAnswer: 1,
        explanation: 'For abilities and facts, use simple present "speaks"',
        explanationHindi: 'योग्यता और तथ्यों के लिए, simple present "speaks" का उपयोग करें'
      }
    ],
    xpReward: 40
  },
  {
    id: 'articles',
    title: 'Articles (A, An, The)',
    hindiTitle: 'आर्टिकल (A, An, The)',
    difficulty: 'intermediate',
    category: 'Articles',
    englishExplanation: 'Articles are used before nouns to specify or generalize them.',
    hindiExplanation: 'आर्टिकल का उपयोग संज्ञा से पहले उसे विशिष्ट या सामान्य बनाने के लिए किया जाता है।',
    hindiComparison: 'हिंदी में आर्टिकल नहीं होते, लेकिन "एक" (a/an) और "वह/यह" (the) का भाव होता है',
    examples: [
      {
        correct: {
          english: 'I saw a dog in the park.',
          hindi: 'मैंने पार्क में एक कुत्ता देखा।',
          hindiTranslation: '"a" for any dog, "the" for specific park'
        },
        incorrect: {
          english: 'I saw dog in park.',
          hindi: 'गलत - मैंने पार्क में कुत्ता देखा।',
          reason: 'Need "a" before "dog" and "the" before "park"'
        }
      }
    ],
    practice: [
      {
        question: 'Fill in the blank: "___ apple a day keeps ___ doctor away."',
        questionHindi: 'रिक्त स्थान भरें: "___ सेब रोज ___ डॉक्टर को दूर रखता है।"',
        options: ['A, the', 'An, the', 'The, a', 'An, a'],
        correctAnswer: 1,
        explanation: '"An" before vowel sound "apple", "the" for specific doctor',
        explanationHindi: 'स्वर ध्वनि "apple" से पहले "An", विशिष्ट डॉक्टर के लिए "the"'
      }
    ],
    xpReward: 60
  }
];

export const HindiGrammarModule: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<GrammarRule>(grammarRules[0]);
  const [currentPractice, setCurrentPractice] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'progress'>('learn');

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === selectedRule.practice[currentPractice].correctAnswer) {
      setScore(score + 1);
      setTotalXP(totalXP + selectedRule.xpReward);
      setShowCelebration(true);
    }
  };

  const nextPractice = () => {
    if (currentPractice < selectedRule.practice.length - 1) {
      setCurrentPractice(currentPractice + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetPractice = () => {
    setCurrentPractice(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SaraswatiMascot size="md" />
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Grammar Module
            </h1>
            <p className="text-lg text-muted-foreground">
              हिंदी में समझें, English में सीखें 📚
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            <span className="text-2xl font-bold text-yellow-600">{totalXP}</span>
            <span className="text-sm text-muted-foreground">XP</span>
          </div>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            Score: {score}/{selectedRule.practice.length}
          </Badge>
        </div>
      </div>

      {/* Grammar Rules Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Grammar Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {grammarRules.map((rule) => (
              <Button
                key={rule.id}
                variant={selectedRule.id === rule.id ? "default" : "outline"}
                className="h-auto p-4 text-left justify-start"
                onClick={() => {
                  setSelectedRule(rule);
                  resetPractice();
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{rule.title}</span>
                    <Badge className={getDifficultyColor(rule.difficulty)}>
                      {rule.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rule.hindiTitle}</p>
                  <div className="flex items-center gap-1 text-xs text-yellow-600">
                    <Zap className="h-3 w-3" />
                    {rule.xpReward} XP
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Learn
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{selectedRule.title}</span>
                <Badge className={getDifficultyColor(selectedRule.difficulty)}>
                  {selectedRule.difficulty}
                </Badge>
              </CardTitle>
              <p className="text-lg text-muted-foreground">{selectedRule.hindiTitle}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Explanation */}
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    English Explanation
                  </h4>
                  <p className="text-blue-700 dark:text-blue-400">{selectedRule.englishExplanation}</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    हिंदी में समझाइए
                  </h4>
                  <p className="text-green-700 dark:text-green-400">{selectedRule.hindiExplanation}</p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    हिंदी से तुलना
                  </h4>
                  <p className="text-amber-700 dark:text-amber-400">{selectedRule.hindiComparison}</p>
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Examples / उदाहरण</h4>
                {selectedRule.examples.map((example, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-green-200 dark:border-green-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-green-700 dark:text-green-400">Correct</span>
                        </div>
                        <p className="font-medium mb-1">{example.correct.english}</p>
                        <p className="text-sm text-muted-foreground">{example.correct.hindi}</p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">{example.correct.hindiTranslation}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-red-200 dark:border-red-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="font-medium text-red-700 dark:text-red-400">Incorrect</span>
                        </div>
                        <p className="font-medium mb-1 line-through">{example.incorrect.english}</p>
                        <p className="text-sm text-muted-foreground">{example.incorrect.hindi}</p>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-2">{example.incorrect.reason}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Practice: {selectedRule.title}</span>
                <Badge variant="outline">
                  Question {currentPractice + 1} of {selectedRule.practice.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {selectedRule.practice.length > 0 && (
                <>
                  <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="font-medium text-lg mb-2">
                        {selectedRule.practice[currentPractice].question}
                      </p>
                      <p className="text-muted-foreground">
                        {selectedRule.practice[currentPractice].questionHindi}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedRule.practice[currentPractice].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={
                            selectedAnswer === index
                              ? index === selectedRule.practice[currentPractice].correctAnswer
                                ? "default"
                                : "destructive"
                              : "outline"
                          }
                          className="h-auto p-4 text-left justify-start"
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showResult}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-xs">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span>{option}</span>
                          </div>
                        </Button>
                      ))}
                    </div>

                    {showResult && (
                      <div className={`p-4 rounded-lg border ${selectedAnswer === selectedRule.practice[currentPractice].correctAnswer
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        }`}>
                        <div className="flex items-center gap-2 mb-2">
                          {selectedAnswer === selectedRule.practice[currentPractice].correctAnswer ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <span className="font-medium">
                            {selectedAnswer === selectedRule.practice[currentPractice].correctAnswer ? 'Correct!' : 'Incorrect'}
                          </span>
                        </div>
                        <p className="mb-1">{selectedRule.practice[currentPractice].explanation}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedRule.practice[currentPractice].explanationHindi}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      {showResult && currentPractice < selectedRule.practice.length - 1 && (
                        <Button onClick={nextPractice} className="flex items-center gap-2">
                          Next Question
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}

                      <Button variant="outline" onClick={resetPractice} className="flex items-center gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Reset Practice
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <p className="text-2xl font-bold">{totalXP}</p>
                <p className="text-sm text-muted-foreground">Total XP Earned</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{score}</p>
                <p className="text-sm text-muted-foreground">Questions Correct</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Brain className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <p className="text-2xl font-bold">{grammarRules.length}</p>
                <p className="text-sm text-muted-foreground">Topics Available</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grammar Mastery Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {grammarRules.map((rule) => (
                  <div key={rule.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{rule.title}</span>
                      <Badge className={getDifficultyColor(rule.difficulty)}>
                        {rule.difficulty}
                      </Badge>
                    </div>
                    <Progress value={Math.random() * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Celebration Modal */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        lessonTitle={selectedRule.title}
        hindiTitle={selectedRule.hindiTitle}
      />

      {/* Credits Footer */}
      <footer className="mt-8 pt-6 border-t text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </div>
      </footer>
    </div>
  );
};