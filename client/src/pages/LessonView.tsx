import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, ChevronLeft, ChevronRight, Home, BookOpen, Languages, Heart, XCircle, Sparkles, AlertCircle, Mic, Volume2 } from "lucide-react";
import { speechRecognitionService } from "@/lib/speechRecognition";
import { Layout } from "@/components/Layout";
import { VocabularyItem } from "@/components/VocabularyItem";
import { CelebrationModal } from "@/components/CelebrationModal";
import { AudioButton } from "@/components/AudioButton";
import { MistakeCorrection } from "@/components/MistakeCorrection";
import { CulturalNote } from "@/components/CulturalNote";
import { useLesson, useLessons } from "@/hooks/use-lessons";
import { Button } from "@/components/ui/button";
import { useMarkComplete, useProgress } from "@/hooks/use-progress";
import { useUserStats, useUpdateUserStats, useDailyGoal, useUpdateDailyGoal, useAchievements, useUnlockAchievement } from "@/hooks/use-gamification";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function LessonView() {
  const [, params] = useRoute("/lesson/:id");
  const id = params ? parseInt(params.id) : null;
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = useState(false);

  const { data: lessonData, isLoading: lessonLoading } = useLesson(id);
  const { data: allLessons } = useLessons();
  const { data: progressList } = useProgress();
  const { data: userStats } = useUserStats();
  const { data: dailyGoal } = useDailyGoal();
  const { mutate: updateUserStats } = useUpdateUserStats();
  const { mutate: updateDailyGoal } = useUpdateDailyGoal();
  const { mutate: markComplete, isPending: isMarking } = useMarkComplete();

  // Find prev/next lessons
  const sortedLessons = allLessons?.sort((a: any, b: any) => a.order - b.order) || [];
  const currentIndex = sortedLessons.findIndex((l: any) => l.id === id);
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex !== -1 && currentIndex < sortedLessons.length - 1
    ? sortedLessons[currentIndex + 1]
    : null;

  // State for block-based progression
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [blockFeedback, setBlockFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  // Scroll to top on load or block change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, currentBlockIndex]);

  if (lessonLoading || !lessonData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Parse blocks if they exist
  let blocks: any[] = [];
  try {
    // Check if lesson has content that can be parsed as blocks
    if (lessonData.content && lessonData.content.startsWith('{')) {
      const parsed = JSON.parse(lessonData.content);
      blocks = parsed.blocks || [];
    }
  } catch (e) {
    console.error("Failed to parse blocks:", e);
  }

  const { vocabulary } = lessonData;
  const isPreviouslyCompleted = progressList?.some((p: any) => p.lessonId === id && p.completed);

  const handleComplete = () => {
    if (!id || !lessonData) return;

    const baseXp = (() => {
      switch (lessonData.difficulty) {
        case "Advanced": return 20;
        case "Intermediate": return 15;
        default: return 10;
      }
    })();

    markComplete({ lessonId: id, completed: true }, {
      onSuccess: () => {
        setShowCelebration(true);
        setIsLessonCompleted(true);
        toast({
          title: "पूर्ण! 🎉",
          description: "बहुत अच्छा! आपकी प्रगति सहेज ली गई है।",
          duration: 3000,
        });

        if (userStats) {
          updateUserStats({
            xpPoints: Number(userStats.xpPoints ?? 0) + baseXp,
            currentStreak: Number(userStats.currentStreak ?? 0) + 1,
            longestStreak: Math.max(Number(userStats.longestStreak ?? 0), (Number(userStats.currentStreak ?? 0) + 1)),
            totalLessonsCompleted: Number(userStats.totalLessonsCompleted ?? 0) + 1,
            totalMinutesLearned: Number(userStats.totalMinutesLearned ?? 0) + 5,
          });
        }

        if (dailyGoal) {
          updateDailyGoal({
            lessonsCompleted: Number(dailyGoal.lessonsCompleted ?? 0) + 1,
            xpEarned: Number(dailyGoal.xpEarned ?? 0) + baseXp,
            minutesSpent: Number(dailyGoal.minutesSpent ?? 0) + 5,
          });
        }
      }
    });
  };

  const handleNextBlock = () => {
    if (currentBlockIndex < blocks.length - 1) {
      setCurrentBlockIndex(prev => prev + 1);
      setQuizSelection(null);
      setBlockFeedback(null);
    } else {
      handleComplete();
    }
  };

  const handleQuizSubmit = () => {
    const currentBlock = blocks[currentBlockIndex];
    if (quizSelection === null || currentBlock.type !== "quiz") return;

    if (quizSelection === currentBlock.answer) {
      setBlockFeedback("correct");
    } else {
      setBlockFeedback("incorrect");
    }
  };

  // Render Logic
  const renderLegacyView = () => {
    const contentParts = lessonData.content.split(/##\s*हिंदी/i);
    const englishContent = contentParts[0] || lessonData.content;
    const hindiContent = contentParts[1] ? `## हिंदी${contentParts[1]}` : null;

    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8 animate-in slide-in-from-top-4 duration-700">
          <Link href="/lessons">
            <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6 group">
              <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </div>
              <span>Back to Lessons</span>
            </button>
          </Link>

          <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <BookOpen className="h-32 w-32" />
            </div>

            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                  Lesson {lessonData.order}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border",
                  lessonData.difficulty === "Beginner" && "bg-emerald-500/5 text-emerald-500 border-emerald-500/20",
                  lessonData.difficulty === "Intermediate" && "bg-blue-500/5 text-blue-500 border-blue-500/20",
                  lessonData.difficulty === "Advanced" && "bg-purple-500/5 text-purple-500 border-purple-500/20"
                )}>
                  {lessonData.difficulty}
                </span>
                {(isPreviouslyCompleted || isLessonCompleted) && (
                  <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <CheckCircle className="h-3 w-3" /> Completed
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold font-display leading-tight">
                {lessonData.hindiTitle || lessonData.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {lessonData.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="glass-card p-6 md:p-8">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-blue-500">
                <BookOpen className="h-5 w-5" /> English Content
              </h3>
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown>{englishContent}</ReactMarkdown>
              </div>
            </div>

            <div className="glass-card p-6 md:p-8 border-amber-500/20 bg-amber-500/5">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-amber-600">
                <Languages className="h-5 w-5" /> हिंदी व्याख्या
              </h3>
              <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                {hindiContent ? <ReactMarkdown>{hindiContent}</ReactMarkdown> : <p className="italic text-muted-foreground">No translation available.</p>}
              </div>
            </div>
          </div>

          {/* Sidebar Vocabulary */}
          <div className="lg:col-span-4 space-y-6">
            {vocabulary && vocabulary.length > 0 && (
              <div className="glass-card p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Sparkles className="h-5 w-5 text-yellow-500" /> Key Vocabulary</h2>
                <div className="grid gap-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {vocabulary.map((word: any) => <VocabularyItem key={word.id} word={word} />)}
                </div>
              </div>
            )}

            <Button
              onClick={handleComplete}
              disabled={isPreviouslyCompleted || isLessonCompleted || isMarking}
              className={cn(
                "w-full py-8 text-lg font-bold rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]",
                (isPreviouslyCompleted || isLessonCompleted)
                  ? "bg-secondary text-muted-foreground cursor-not-allowed"
                  : "bg-primary text-primary-foreground shadow-primary/20 hover:bg-primary/90"
              )}
            >
              {isMarking ? <Loader2 className="h-6 w-6 animate-spin" /> : (isPreviouslyCompleted || isLessonCompleted) ? "Lesson Completed ✅" : "Complete Lesson"}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderBlockView = () => {
    const currentBlock = blocks[currentBlockIndex];
    const progressPercent = ((currentBlockIndex + 1) / blocks.length) * 100;

    if (isLessonCompleted) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in fade-in zoom-in duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 shadow-[0_0_40px_rgba(28,231,131,0.3)] animate-bounce-subtle">
            <CheckCircle className="w-16 h-16" />
          </div>

          <div className="relative z-10 space-y-4">
            <h1 className="text-5xl font-black mb-2 tracking-tight">Lesson Completed! 🎉</h1>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">Great job mastering this topic. You've earned your XP and moved one step closer to fluency!</p>
          </div>

          <div className="flex gap-4 relative z-10">
            <Link href="/lessons">
              <Button size="lg" variant="outline" className="rounded-2xl px-8 py-6 text-lg font-bold border-2 hover:bg-secondary">
                All Lessons
              </Button>
            </Link>
            {nextLesson && (
              <Link href={`/lesson/${nextLesson.id}`}>
                <Button size="lg" className="rounded-2xl px-8 py-6 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  Next Lesson <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto py-8 px-4 min-h-screen flex flex-col">
        {/* Progress Header */}
        <div className="flex items-center gap-6 mb-12 animate-in fade-in slide-in-from-top-4">
          <Link href="/lessons">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary w-12 h-12">
              <XCircle className="h-6 w-6 text-muted-foreground" />
            </Button>
          </Link>
          <div className="flex-1 h-4 bg-secondary/50 rounded-full overflow-hidden border border-border/50 shadow-inner">
            <motion.div
              className="h-full bg-primary shadow-[0_0_15px_rgba(28,231,131,0.6)]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
          <span className="text-xs font-bold text-muted-foreground whitespace-nowrap bg-secondary px-3 py-1 rounded-full border border-border/50">
            {currentBlockIndex + 1} <span className="text-muted-foreground/50">/</span> {blocks.length}
          </span>
        </div>

        {/* Dynamic Content */}
        <main className="flex-1 flex flex-col items-center justify-center w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBlockIndex}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentBlock.type === "text" && (
                <div className="text-center space-y-10 max-w-2xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">{currentBlock.content}</h2>
                  {currentBlock.hindiContent && (
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full opacity-50" />
                      <p className="relative text-3xl text-primary font-bold italic leading-relaxed font-serif">"{currentBlock.hindiContent}"</p>
                    </div>
                  )}
                </div>
              )}

              {currentBlock.type === "video" && (
                <div className="space-y-8 w-full max-w-3xl mx-auto">
                  <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-card group relative ring-1 ring-white/10">
                    <iframe
                      src={`https://www.youtube.com/embed/${currentBlock.videoId}?autoplay=0&rel=0`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-center mt-6 text-muted-foreground">{currentBlock.content}</h3>
                </div>
              )}

              {currentBlock.type === "quiz" && (
                <div className="space-y-10 w-full max-w-2xl mx-auto">
                  <div className="text-center space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">Quiz Time</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{currentBlock.question}</h2>
                  </div>

                  <div className="grid gap-4">
                    {currentBlock.options.map((option: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => !blockFeedback && setQuizSelection(idx)}
                        className={cn(
                          "w-full p-6 rounded-2xl border-2 text-left text-lg font-bold transition-all transform duration-200 group relative overflow-hidden",
                          quizSelection === idx
                            ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(28,231,131,0.15)] scale-[1.02]"
                            : "border-border bg-card/50 hover:bg-card hover:border-primary/30 hover:scale-[1.01]",
                          blockFeedback === "correct" && idx === currentBlock.answer && "bg-green-500/10 border-green-500 text-green-600 dark:text-green-400",
                          blockFeedback === "incorrect" && quizSelection === idx && "bg-red-500/10 border-red-500 text-red-500"
                        )}
                        disabled={!!blockFeedback}
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          <div className={cn(
                            "w-10 h-10 rounded-xl border-2 flex items-center justify-center text-sm font-black transition-colors",
                            quizSelection === idx ? "border-primary text-primary" : "border-border text-muted-foreground group-hover:border-primary/50",
                            blockFeedback === "correct" && idx === currentBlock.answer && "border-green-500 text-green-500",
                            blockFeedback === "incorrect" && quizSelection === idx && "border-red-500 text-red-500"
                          )}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className="flex-1">{option}</span>
                          {quizSelection === idx && !blockFeedback && <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {currentBlock.type === "cultural_note" && (
                <div className="w-full max-w-2xl mx-auto">
                  <CulturalNote
                    title={currentBlock.title}
                    hindiTitle={currentBlock.hindiTitle}
                    content={currentBlock.content}
                    hindiContent={currentBlock.hindiContent}
                    type={currentBlock.noteType || "context"}
                  />
                </div>
              )}


              {currentBlock.type === "common_mistake" && (
                <div className="w-full max-w-2xl mx-auto">
                  <MistakeCorrection
                    mistake={currentBlock.mistake}
                    correction={currentBlock.correction}
                    explanation={currentBlock.explanation}
                    hindiExplanation={currentBlock.hindiExplanation}
                  />
                </div>
              )}

              {currentBlock.type === "speaking" && (
                <div className="space-y-10 w-full max-w-2xl mx-auto text-center animate-in zoom-in-50 duration-500">
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20 shadow-sm">Native Practice</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">{currentBlock.phrase}</h2>
                    <p className="text-2xl text-muted-foreground/80 font-hindi italic">"{currentBlock.hindiPhrase}"</p>
                  </div>

                  <div className="flex flex-col items-center gap-8 py-10">
                    <div className="relative">
                      <AnimatePresence>
                        {blockFeedback === null && (
                          <motion.div
                            className="absolute -inset-4 bg-primary/20 rounded-full blur-xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </AnimatePresence>
                      <Button
                        size="lg"
                        className={cn(
                          "w-36 h-36 rounded-full shadow-[0_20px_50px_rgba(28,231,131,0.3)] transition-all duration-500 active:scale-95 border-4 border-white dark:border-slate-800",
                          blockFeedback === "correct" ? "bg-green-500 scale-110" : "bg-primary hover:bg-primary/90"
                        )}
                        onClick={() => {
                          if (!speechRecognition.isSupported()) {
                            toast({
                              title: "Not Supported",
                              description: "Speech recognition is not supported in this browser. Try Chrome!",
                              variant: "destructive"
                            });
                            return;
                          }
                          speechRecognition.startListening((res) => {
                            if (res.isFinal) {
                              const acc = speechRecognition.calculateAccuracy(res.transcript, currentBlock.phrase);
                              if (acc >= 75) {
                                setBlockFeedback("correct");
                                toast({ title: "Excellent! 🌟", description: `Accuracy: ${acc}%` });
                              } else {
                                setBlockFeedback("incorrect");
                                toast({ title: "Try again! 💪", description: `Accuracy: ${acc}%`, variant: "destructive" });
                              }
                            }
                          });
                        }}
                      >
                        <Mic className={cn("w-16 h-16", blockFeedback === "correct" ? "animate-bounce" : "")} />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-bold text-slate-900 dark:text-white">Tap to Start Speaking</p>
                      <p className="text-sm text-muted-foreground">Don't worry about being perfect, just try!</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className={cn(
          "fixed bottom-0 left-0 right-0 p-6 md:p-8 backdrop-blur-2xl z-40 transition-all duration-700 border-t",
          blockFeedback === "correct" ? "bg-green-500/10 border-green-500/30" : blockFeedback === "incorrect" ? "bg-red-500/10 border-red-500/30" : "bg-background/90 border-t border-border/50"
        )}>
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full md:w-auto">
              {blockFeedback === "correct" && (
                <div className="flex items-center gap-5 animate-in slide-in-from-bottom-6 duration-500">
                  <div className="bg-green-500 text-white p-4 rounded-2xl shadow-[0_10px_20px_rgba(34,197,94,0.4)]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-green-600 dark:text-green-400">Brilliant! 🏆</h4>
                    <p className="text-sm font-semibold opacity-80">You nailed the pronunciation.</p>
                  </div>
                </div>
              )}
              {blockFeedback === "incorrect" && (
                <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                  <div className="bg-red-500 text-white p-3 rounded-2xl shadow-lg shadow-red-500/30">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-red-500">Not quite right</h4>
                    <p className="text-sm font-medium opacity-80">Review the options and try again.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-full md:w-auto">
              {currentBlock.type === "quiz" && !blockFeedback ? (
                <Button
                  onClick={handleQuizSubmit}
                  disabled={quizSelection === null}
                  size="lg"
                  className="w-full md:w-auto px-10 py-8 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextBlock}
                  size="lg"
                  className={cn(
                    "w-full md:w-auto px-10 py-8 rounded-2xl font-black text-lg shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3",
                    blockFeedback === "incorrect" ? "bg-red-500 hover:bg-red-600 shadow-red-500/20" : "bg-primary hover:bg-primary/90 shadow-primary/20"
                  )}
                >
                  {currentBlockIndex === blocks.length - 1 ? (isMarking ? <Loader2 className="animate-spin" /> : "Complete Lesson") : "Continue"}
                  <ChevronRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <Layout>
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        lessonTitle={lessonData?.title || ""}
        hindiTitle={lessonData?.hindiTitle || undefined}
      />
      {blocks.length > 0 ? renderBlockView() : renderLegacyView()}
    </Layout>
  );
}
