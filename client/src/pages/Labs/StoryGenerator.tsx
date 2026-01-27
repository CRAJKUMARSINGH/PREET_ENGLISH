import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
    BookOpen,
    Sparkles,
    Wand2,
    RefreshCw,
    Play,
    Pause,
    Volume2,
    ChevronRight,
    CheckCircle,
    Languages,
    Brain,
    Heart,
    Star,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// Story difficulty levels
const difficultyLevels = [
    { id: "beginner", label: "Beginner", hindiLabel: "शुरुआती", color: "bg-green-500" },
    { id: "intermediate", label: "Intermediate", hindiLabel: "मध्यम", color: "bg-blue-500" },
    { id: "advanced", label: "Advanced", hindiLabel: "उन्नत", color: "bg-purple-500" },
];

// Story topics
const storyTopics = [
    { id: "daily-life", label: "Daily Life", hindiLabel: "दैनिक जीवन", icon: "🏠" },
    { id: "travel", label: "Travel", hindiLabel: "यात्रा", icon: "✈️" },
    { id: "business", label: "Business", hindiLabel: "व्यापार", icon: "💼" },
    { id: "friendship", label: "Friendship", hindiLabel: "दोस्ती", icon: "🤝" },
    { id: "adventure", label: "Adventure", hindiLabel: "साहसिक", icon: "🏔️" },
    { id: "culture", label: "Indian Culture", hindiLabel: "भारतीय संस्कृति", icon: "🪔" },
];

// Sample generated story (will be replaced by AI)
const sampleStory = {
    title: "The Morning Chai",
    hindiTitle: "सुबह की चाय",
    paragraphs: [
        {
            english: "Ravi woke up early in the morning. The sun was just rising over the city.",
            hindi: "रवि सुबह जल्दी उठा। सूरज शहर के ऊपर उग रहा था।",
        },
        {
            english: "He walked to the kitchen and started making chai. The aroma of cardamom filled the air.",
            hindi: "वह रसोई में गया और चाय बनाने लगा। इलायची की खुशबू हवा में फैल गई।",
        },
        {
            english: "His mother joined him. 'Good morning, beta,' she said with a warm smile.",
            hindi: "उसकी माँ उसके साथ आ गईं। 'सुप्रभात, बेटा,' उन्होंने गर्मजोशी से मुस्कुराते हुए कहा।",
        },
        {
            english: "They sat together on the balcony, sipping chai and watching the world wake up.",
            hindi: "वे बालकनी में साथ बैठ गए, चाय पीते हुए और दुनिया को जागते देखते हुए।",
        },
    ],
    vocabulary: [
        { word: "aroma", meaning: "सुगंध", example: "The aroma of spices filled the kitchen." },
        { word: "balcony", meaning: "बालकनी", example: "We enjoyed the view from the balcony." },
        { word: "sipping", meaning: "चुस्की लेना", example: "She was sipping her tea slowly." },
    ],
    quiz: [
        {
            question: "What did Ravi make in the kitchen?",
            hindiQuestion: "रवि ने रसोई में क्या बनाया?",
            options: ["Coffee", "Chai", "Juice", "Water"],
            correct: 1,
        },
        {
            question: "What spice's aroma filled the air?",
            hindiQuestion: "किस मसाले की खुशबू हवा में फैली?",
            options: ["Cinnamon", "Ginger", "Cardamom", "Cloves"],
            correct: 2,
        },
    ],
};

export default function StoryGenerator() {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("beginner");
    const [customPrompt, setCustomPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedStory, setGeneratedStory] = useState<typeof sampleStory | null>(null);
    const [currentParagraph, setCurrentParagraph] = useState(0);
    const [showHindi, setShowHindi] = useState(true);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
    const [quizComplete, setQuizComplete] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
            utterance.onend = () => setIsPlaying(false);
        }
    };

    const storyMutation = useMutation({
        mutationFn: async (params: { topic: string; difficulty: string; customPrompt: string }) => {
            return apiRequest("POST", "/api/ai/generate-story", params).then(res => res.json());
        },
        onSuccess: (data) => {
            setGeneratedStory(data);
            setCurrentParagraph(0);
            setQuizStarted(false);
            setQuizAnswers([]);
            setQuizComplete(false);
            setIsGenerating(false);
        },
        onError: () => {
            setIsGenerating(false);
            // Handle error toast if needed
        }
    });

    const handleGenerate = () => {
        if (!selectedTopic) return;
        setIsGenerating(true);
        storyMutation.mutate({
            topic: selectedTopic,
            difficulty: selectedDifficulty,
            customPrompt: customPrompt
        });
    };

    const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
        const newAnswers = [...quizAnswers];
        newAnswers[questionIndex] = answerIndex;
        setQuizAnswers(newAnswers);

        if (newAnswers.length === generatedStory?.quiz.length &&
            newAnswers.every((a) => a !== undefined)) {
            setQuizComplete(true);
        }
    };

    const getQuizScore = () => {
        if (!generatedStory) return 0;
        return quizAnswers.filter((a, i) => a === generatedStory.quiz[i].correct).length;
    };

    return (
        <Layout>
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full border border-purple-500/20">
                        <Wand2 className="h-5 w-5 text-purple-500" />
                        <span className="text-sm font-bold text-purple-600">AI-Powered • 2024 Innovation</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        AI Story Generator
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        कहानी जनरेटर • Create personalized bilingual stories for immersive learning
                    </p>
                </div>

                {!generatedStory ? (
                    /* Story Configuration */
                    <Card className="border-2 border-dashed border-purple-200 dark:border-purple-800">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-500" />
                                Create Your Story
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Topic Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Choose a Topic (विषय चुनें)</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {storyTopics.map((topic) => (
                                        <Button
                                            key={topic.id}
                                            variant={selectedTopic === topic.id ? "default" : "outline"}
                                            className={cn(
                                                "h-auto py-4 flex-col gap-1",
                                                selectedTopic === topic.id && "ring-2 ring-purple-500"
                                            )}
                                            onClick={() => setSelectedTopic(topic.id)}
                                        >
                                            <span className="text-2xl">{topic.icon}</span>
                                            <span className="font-medium">{topic.label}</span>
                                            <span className="text-xs text-muted-foreground">{topic.hindiLabel}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Difficulty Level (कठिनाई स्तर)</label>
                                <div className="flex gap-3">
                                    {difficultyLevels.map((level) => (
                                        <Button
                                            key={level.id}
                                            variant={selectedDifficulty === level.id ? "default" : "outline"}
                                            className={cn(
                                                "flex-1",
                                                selectedDifficulty === level.id && level.color
                                            )}
                                            onClick={() => setSelectedDifficulty(level.id)}
                                        >
                                            <span>{level.label}</span>
                                            <span className="text-xs ml-1 opacity-70">({level.hindiLabel})</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Prompt */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium">Custom Prompt (Optional)</label>
                                <Input
                                    placeholder="E.g., A story about a student learning to cook..."
                                    value={customPrompt}
                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                    className="h-12"
                                />
                            </div>

                            {/* Generate Button */}
                            <Button
                                onClick={handleGenerate}
                                disabled={!selectedTopic || isGenerating}
                                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Generating Story...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="mr-2 h-5 w-5" />
                                        Generate My Story ✨
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    /* Generated Story View */
                    <div className="space-y-6">
                        {/* Story Header */}
                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Badge className="mb-2 bg-purple-500">{selectedDifficulty}</Badge>
                                        <h2 className="text-2xl font-bold">{generatedStory.title}</h2>
                                        <p className="text-lg text-muted-foreground">{generatedStory.hindiTitle}</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setGeneratedStory(null)}>
                                        <RefreshCw className="h-4 w-4 mr-1" />
                                        New Story
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {!quizStarted ? (
                            <>
                                {/* Reading Progress */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Reading Progress</span>
                                        <span>{currentParagraph + 1} / {generatedStory.paragraphs.length}</span>
                                    </div>
                                    <Progress value={((currentParagraph + 1) / generatedStory.paragraphs.length) * 100} />
                                </div>

                                {/* Story Content */}
                                <Card>
                                    <CardContent className="p-8 space-y-6">
                                        {/* Current Paragraph */}
                                        <div className="space-y-4 cursor-pointer group" onClick={() => playAudio(generatedStory.paragraphs[currentParagraph].english)}>
                                            <p className="text-xl leading-relaxed font-medium group-hover:text-primary transition-colors">
                                                {generatedStory.paragraphs[currentParagraph].english}
                                                <Volume2 className={cn("inline ml-2 h-5 w-5 transition-opacity", isPlaying ? "opacity-100 text-primary animate-pulse" : "opacity-30 group-hover:opacity-100")} />
                                            </p>
                                            {showHindi && (
                                                <p className="text-lg text-purple-600 dark:text-purple-400 leading-relaxed border-l-4 border-purple-300 pl-4">
                                                    {generatedStory.paragraphs[currentParagraph].hindi}
                                                </p>
                                            )}
                                        </div>

                                        {/* Controls */}
                                        <div className="flex items-center justify-between pt-4 border-t">
                                            <Button
                                                variant="outline"
                                                onClick={() => setShowHindi(!showHindi)}
                                            >
                                                <Languages className="h-4 w-4 mr-2" />
                                                {showHindi ? "Hide Hindi" : "Show Hindi"}
                                            </Button>

                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    disabled={currentParagraph === 0}
                                                    onClick={() => setCurrentParagraph(currentParagraph - 1)}
                                                >
                                                    Previous
                                                </Button>
                                                {currentParagraph < generatedStory.paragraphs.length - 1 ? (
                                                    <Button onClick={() => setCurrentParagraph(currentParagraph + 1)}>
                                                        Next <ChevronRight className="h-4 w-4 ml-1" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        className="bg-green-500 hover:bg-green-600"
                                                        onClick={() => setQuizStarted(true)}
                                                    >
                                                        <Brain className="h-4 w-4 mr-2" />
                                                        Take Quiz
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Vocabulary */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5 text-blue-500" />
                                            Key Vocabulary
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-3">
                                            {generatedStory.vocabulary.map((word, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                                                    <div>
                                                        <span className="font-bold text-blue-600">{word.word}</span>
                                                        <span className="mx-2">-</span>
                                                        <span className="text-muted-foreground">{word.meaning}</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm">
                                                        <Volume2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            /* Quiz Section */
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Brain className="h-5 w-5 text-green-500" />
                                        Comprehension Quiz
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {generatedStory.quiz.map((q, qIndex) => (
                                        <div key={qIndex} className="space-y-3">
                                            <div>
                                                <p className="font-medium">{qIndex + 1}. {q.question}</p>
                                                <p className="text-sm text-muted-foreground">{q.hindiQuestion}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {q.options.map((option, oIndex) => (
                                                    <Button
                                                        key={oIndex}
                                                        variant={quizAnswers[qIndex] === oIndex ? "default" : "outline"}
                                                        className={cn(
                                                            quizComplete && oIndex === q.correct && "bg-green-500 hover:bg-green-500",
                                                            quizComplete && quizAnswers[qIndex] === oIndex && oIndex !== q.correct && "bg-red-500 hover:bg-red-500"
                                                        )}
                                                        onClick={() => !quizComplete && handleQuizAnswer(qIndex, oIndex)}
                                                        disabled={quizComplete}
                                                    >
                                                        {option}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {quizComplete && (
                                        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl text-center">
                                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                                            <h3 className="text-xl font-bold mb-2">
                                                Quiz Complete! 🎉
                                            </h3>
                                            <p className="text-lg">
                                                You scored <span className="font-bold text-green-600">{getQuizScore()}</span> out of {generatedStory.quiz.length}
                                            </p>
                                            <div className="flex gap-3 justify-center mt-4">
                                                <Button variant="outline" onClick={() => setGeneratedStory(null)}>
                                                    New Story
                                                </Button>
                                                <Button onClick={() => {
                                                    setQuizStarted(false);
                                                    setCurrentParagraph(0);
                                                    setQuizAnswers([]);
                                                    setQuizComplete(false);
                                                }}>
                                                    Read Again
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Credits Footer */}
                <footer className="pt-6 border-t text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        <p className="text-sm font-medium">
                            Inspired by Beelinguapp 2024 • Built for Hindi Speakers
                        </p>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </div>
                </footer>
            </div>
        </Layout>
    );
}
