import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Brain,
    CheckCircle,
    XCircle,
    RefreshCw,
    Zap,
    Trophy,
    Calendar,
    Target,
    Volume2,
    RotateCcw,
    Heart,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSRS, ReviewQuality } from "@/hooks/use-srs";

// Quality button configurations
const qualityButtons = [
    { quality: 0, label: "Forgot", hindiLabel: "भूल गया", color: "bg-red-500 hover:bg-red-600", icon: XCircle },
    { quality: 3, label: "Hard", hindiLabel: "कठिन", color: "bg-orange-500 hover:bg-orange-600", icon: RefreshCw },
    { quality: 4, label: "Good", hindiLabel: "अच्छा", color: "bg-blue-500 hover:bg-blue-600", icon: CheckCircle },
    { quality: 5, label: "Easy", hindiLabel: "आसान", color: "bg-green-500 hover:bg-green-600", icon: Zap },
];

export default function VocabularyReview() {
    const { dueCards, reviewCard, getStats } = useSRS();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [sessionComplete, setSessionComplete] = useState(false);

    const stats = getStats();
    const currentCard = dueCards[currentIndex];

    const handleReview = (quality: ReviewQuality) => {
        if (!currentCard) return;

        reviewCard(currentCard.id, quality);
        setShowAnswer(false);

        if (currentIndex < dueCards.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setSessionComplete(true);
        }
    };

    const restartSession = () => {
        setCurrentIndex(0);
        setShowAnswer(false);
        setSessionComplete(false);
    };

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 rounded-full border border-blue-500/20">
                        <Brain className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-bold text-blue-600">Spaced Repetition System</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Vocabulary Review
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        शब्दावली अभ्यास • Scientifically optimized for long-term memory
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-4 text-center">
                            <Calendar className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                            <p className="text-2xl font-bold text-blue-600">{stats.due}</p>
                            <p className="text-xs text-muted-foreground">Due Today</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                        <CardContent className="p-4 text-center">
                            <Trophy className="h-6 w-6 mx-auto mb-2 text-green-500" />
                            <p className="text-2xl font-bold text-green-600">{stats.mastered}</p>
                            <p className="text-xs text-muted-foreground">Mastered</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800">
                        <CardContent className="p-4 text-center">
                            <Target className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                            <p className="text-2xl font-bold text-yellow-600">{stats.learning}</p>
                            <p className="text-xs text-muted-foreground">Learning</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                        <CardContent className="p-4 text-center">
                            <Sparkles className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                            <p className="text-2xl font-bold text-purple-600">{stats.new}</p>
                            <p className="text-xs text-muted-foreground">New Words</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Session Progress */}
                {dueCards.length > 0 && !sessionComplete && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Session Progress</span>
                            <span>{currentIndex + 1} / {dueCards.length}</span>
                        </div>
                        <Progress value={((currentIndex + 1) / dueCards.length) * 100} />
                    </div>
                )}

                {/* Review Card */}
                {dueCards.length > 0 && !sessionComplete ? (
                    <Card className="border-2">
                        <CardContent className="p-8 min-h-[300px] flex flex-col">
                            {/* Word Display */}
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                                        {currentCard?.word}
                                    </h2>
                                    <Button variant="ghost" size="sm">
                                        <Volume2 className="h-5 w-5 mr-2" />
                                        Listen
                                    </Button>
                                </div>

                                {showAnswer && currentCard && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                        <div className="p-4 bg-secondary/50 rounded-xl">
                                            <p className="text-xl">{currentCard.meaning}</p>
                                        </div>
                                        <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl border border-purple-200 dark:border-purple-800">
                                            <p className="text-xl text-purple-700 dark:text-purple-300">
                                                {currentCard.hindiMeaning}
                                            </p>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            Next review in: {currentCard.interval} day(s)
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            {/* Controls */}
                            <div className="pt-6 border-t">
                                {!showAnswer ? (
                                    <Button
                                        onClick={() => setShowAnswer(true)}
                                        className="w-full h-14 text-lg font-bold"
                                    >
                                        <RotateCcw className="mr-2 h-5 w-5" />
                                        Show Answer
                                    </Button>
                                ) : (
                                    <div className="space-y-3">
                                        <p className="text-center text-sm text-muted-foreground mb-3">
                                            How well did you remember? (आपको कितना याद था?)
                                        </p>
                                        <div className="grid grid-cols-4 gap-2">
                                            {qualityButtons.map((btn) => (
                                                <Button
                                                    key={btn.quality}
                                                    onClick={() => handleReview(btn.quality as ReviewQuality)}
                                                    className={cn("h-16 flex-col gap-1", btn.color)}
                                                >
                                                    <btn.icon className="h-5 w-5" />
                                                    <span className="text-xs">{btn.label}</span>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : sessionComplete ? (
                    /* Session Complete */
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                        <CardContent className="p-12 text-center space-y-6">
                            <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
                            <div>
                                <h2 className="text-3xl font-bold mb-2">Session Complete! 🎉</h2>
                                <p className="text-lg text-muted-foreground">
                                    You reviewed {dueCards.length} words today!
                                </p>
                                <p className="text-muted-foreground">
                                    आपने आज {dueCards.length} शब्दों का अभ्यास किया!
                                </p>
                            </div>
                            <div className="flex gap-4 justify-center">
                                <Button variant="outline" onClick={restartSession}>
                                    Review Again
                                </Button>
                                <Button>
                                    Back to Dashboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    /* No Cards Due */
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-12 text-center space-y-6">
                            <Trophy className="h-20 w-20 text-blue-500 mx-auto" />
                            <div>
                                <h2 className="text-3xl font-bold mb-2">All Caught Up! 🌟</h2>
                                <p className="text-lg text-muted-foreground">
                                    No words due for review right now.
                                </p>
                                <p className="text-muted-foreground">
                                    अभी कोई शब्द समीक्षा के लिए नहीं है।
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Come back later when more words are due!
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Credits Footer */}
                <footer className="pt-6 border-t text-center">
                    <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        <p className="text-sm font-medium">
                            Inspired by Memrise SRS • Built for Hindi Speakers
                        </p>
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                    </div>
                </footer>
            </div>
        </Layout>
    );
}
