import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Flashcard } from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, CheckCircle, ArrowRight, Home } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SaraswatiMascot } from "@/components/SaraswatiMascot";
import confetti from "canvas-confetti";

export default function DailyReview() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { data: dueWords, isLoading } = useQuery<any[]>({
        queryKey: ["/api/vocabulary/due"],
    });

    const reviewMutation = useMutation({
        mutationFn: async ({ id, quality }: { id: number; quality: number }) => {
            await apiRequest("POST", `/api/vocabulary/review`, { vocabularyId: id, quality });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/vocabulary/due"] });
        },
    });

    const activityMutation = useMutation({
        mutationFn: async (content: string) => {
            await apiRequest("POST", "/api/activity-feed", {
                type: 'GOAL_MET',
                content
            });
        }
    });

    useEffect(() => {
        if (isFinished && dueWords) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#22c55e', '#10b981', '#fbbf24']
            });

            activityMutation.mutate(`completed a daily review session of ${dueWords.length} words! 📚`);
        }
    }, [isFinished, dueWords]);

    const handleRate = async (quality: number) => {
        if (!dueWords) return;

        const currentWord = dueWords[currentIndex];
        reviewMutation.mutate({ id: currentWord.id, quality });

        if (currentIndex < dueWords.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setIsFinished(true);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!dueWords || dueWords.length === 0) {
        return (
            <div className="max-w-md mx-auto text-center py-12 space-y-8">
                <SaraswatiMascot mood="happy" size="lg" />
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">All caught up!</h2>
                    <p className="text-lg text-muted-foreground font-hindi">
                        सब कुछ याद है! नए शब्द सीखने का समय है। ✨
                    </p>
                </div>
                <Link href="/">
                    <Button size="lg" className="w-full h-14 rounded-2xl text-lg font-bold">
                        Back to Dashboard
                    </Button>
                </Link>
            </div>
        );
    }

    if (isFinished) {
        return (
            <div className="max-w-md mx-auto text-center py-12 space-y-8">
                <div className="relative">
                    <CheckCircle className="h-24 w-24 text-green-500 mx-auto animate-bounce-in" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-green-500/10 rounded-full animate-ping" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">Review Complete!</h2>
                    <p className="text-lg text-muted-foreground font-hindi">
                        शानदार! आपने आज का अभ्यास पूरा किया। 🎉
                    </p>
                    <div className="mt-4 p-4 bg-primary/5 rounded-2xl inline-block">
                        <p className="text-sm font-bold text-primary">+{dueWords.length * 10} XP points earned</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/">
                        <Button variant="outline" className="w-full h-12 rounded-xl flex items-center gap-2">
                            <Home className="h-4 w-4" /> Home
                        </Button>
                    </Link>
                    <Link href="/lessons">
                        <Button className="w-full h-12 rounded-xl flex items-center gap-2">
                            Learn More <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const current = dueWords[currentIndex];
    const progress = ((currentIndex) / dueWords.length) * 100;

    return (
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
            {/* Header & Progress */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                        <BookOpen className="h-6 w-6 text-primary" />
                        Daily Review • दैनिक अभ्यास
                    </h1>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {currentIndex + 1} / {dueWords.length}
                    </span>
                </div>
                <Progress value={progress} className="h-3 rounded-full" />
            </div>

            {/* Hero Animation Background */}
            <div className="relative pt-8">
                <Flashcard
                    word={current}
                    onRate={handleRate}
                />
            </div>

            <p className="text-center text-sm text-muted-foreground font-medium">
                Reviewing words due for practice today.
            </p>
        </div>
    );
}
