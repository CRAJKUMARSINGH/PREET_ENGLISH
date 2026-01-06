import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Loader2, ChevronLeft, ChevronRight, Home, BookOpen, Languages, Heart } from "lucide-react";
import type { Quiz as QuizType } from "@shared/schema";
import { Layout } from "@/components/Layout";
import { VocabularyItem } from "@/components/VocabularyItem";
import { CelebrationModal } from "@/components/CelebrationModal";
import { RatingDialog } from "@/components/RatingDialog";
import { AudioButton } from "@/components/AudioButton";
import { useLesson, useLessons } from "@/hooks/use-lessons";
import { useMarkComplete, useProgress } from "@/hooks/use-progress";
import { SpeechEvaluator } from "@/components/SpeechEvaluator";
import { useUserStats, useUpdateUserStats, useDailyGoal, useUpdateDailyGoal, useAchievements, useUnlockAchievement } from "@/hooks/use-gamification";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Quiz } from "@/components/Quiz";
import { SEO } from "@/components/SEO";
import { useAnalytics } from "@/hooks/use-analytics";
import { apiRequest } from "@/lib/queryClient";

export default function LessonView() {
  const [, params] = useRoute("/lesson/:id");
  const id = params ? parseInt(params.id) : null;
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = useState(false);
  const [showRating, setShowRating] = useState(false);

  const { data: lessonData, isLoading: lessonLoading } = useLesson(id);
  const { data: allLessons } = useLessons();
  const { data: progress } = useProgress();
  const { data: userStats } = useUserStats();
  const { data: dailyGoal } = useDailyGoal();
  const queryClient = useQueryClient();
  const { trackEvent } = useAnalytics();
  const [quizOpen, setQuizOpen] = useState(false);

  useEffect(() => {
    if (lessonData) {
      trackEvent("lesson_start", { lessonId: lessonData.id, title: lessonData.title });
    }
  }, [lessonData, trackEvent]);
  const { data: achievements } = useAchievements();
  const { mutate: updateUserStats } = useUpdateUserStats();
  const { mutate: updateDailyGoal } = useUpdateDailyGoal();
  const { mutate: unlockAchievement } = useUnlockAchievement();
  const { mutate: markComplete, isPending: isMarking } = useMarkComplete();

  // Fetch Quiz for this lesson
  const { data: quiz, isLoading: quizLoading } = useQuery<QuizType>({
    queryKey: ['lesson-quiz', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/lessons/${id}/quiz`, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to load quiz");
      return res.json();
    },
    enabled: !!id,
    retry: false,
  });

  const [showQuiz, setShowQuiz] = useState(false);

  // If quiz exists, we only mark complete when quiz is passed
  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed) {
      setQuizOpen(false);
      trackEvent("quiz_complete", { lessonId: lessonData?.id, score });
      handleComplete(); // Auto-mark complete on pass
    }
  };

  // Find prev/next lessons
  const sortedLessons = allLessons?.sort((a, b) => a.order - b.order) || [];
  const currentIndex = sortedLessons.findIndex(l => l.id === id);
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex !== -1 && currentIndex < sortedLessons.length - 1
    ? sortedLessons[currentIndex + 1]
    : null;

  // Recommended next lesson: first uncompleted lesson in same category after current, else next by order
  const recommendedNextLesson = (() => {
    if (!lessonData || sortedLessons.length === 0) return null;
    const completedIds = new Set((progress ?? []).filter(p => p.completed).map(p => p.lessonId));

    const sameCategoryNext = sortedLessons.find(l =>
      l.category === lessonData.category &&
      l.order > lessonData.order &&
      !completedIds.has(l.id)
    );
    if (sameCategoryNext) return sameCategoryNext;

    // Fallback: first uncompleted lesson after current by order
    const genericNext = sortedLessons.find(l => l.order > lessonData.order && !completedIds.has(l.id));
    return genericNext ?? nextLesson;
  })();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (lessonLoading || !lessonData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  const { vocabulary, conversationLines } = lessonData;
  const isCompleted = progress?.some(p => p.lessonId === id && p.completed);
  const progressPercent = sortedLessons.length > 0 ? ((currentIndex + 1) / sortedLessons.length) * 100 : 0;

  const totalCompletedBefore = progress?.filter(p => p.completed).length || 0;

  const handleComplete = () => {
    if (!id || !lessonData) return;

    // Confetti effect on completion
    import('canvas-confetti').then(confetti => {
      confetti.default({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    });

    // Compute XP reward based on difficulty
    const baseXp = (() => {
      switch (lessonData.difficulty) {
        case "Advanced":
          return 20;
        case "Intermediate":
          return 15;
        default:
          return 10;
      }
    })();

    markComplete({ lessonId: id, completed: true }, {
      onSuccess: () => {
        setShowCelebration(true);
        toast({
          title: "पूर्ण! 🎉",
          description: "बहुत अच्छा! आपकी प्रगति सहेज ली गई है।",
          duration: 3000,
        });

        // Update gamification stats (best-effort, ignore if not initialized)
        if (userStats) {
          const currentStreak = Number(userStats.currentStreak ?? 0) + 1;
          const longestStreak = Math.max(Number(userStats.longestStreak ?? 0), currentStreak);
          updateUserStats({
            xpPoints: Number(userStats.xpPoints ?? 0) + baseXp,
            currentStreak,
            longestStreak,
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

        // Unlock "First Steps" achievement on first-ever completed lesson, if present
        if (totalCompletedBefore === 0 && achievements && achievements.length > 0) {
          const firstSteps = achievements.find(
            (a) => a.name === "First Steps" || a.nameHindi === "पहले कदम",
          );
          if (firstSteps) {
            unlockAchievement(firstSteps.id);
          }
        }
      }
    });
  };

  // Extract Hindi content from markdown (content after ## हिंदी)
  const contentParts = lessonData.content.split(/##\s*हिंदी/i);
  const englishContent = contentParts[0] || lessonData.content;
  const hindiContent = contentParts[1] ? `## हिंदी${contentParts[1]}` : null;

  return (
    <Layout>
      <SEO
        title={lessonData?.title || "Lesson"}
        description={lessonData?.content || "Learn English with Hindi support."}
        ogType="article"
      />
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          setShowRating(true);
        }}
        lessonTitle={lessonData?.title || ""}
        hindiTitle={lessonData?.hindiTitle || undefined}
      />

      <RatingDialog
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        contentType="LESSON"
        contentId={id || 0}
        contentTitle={lessonData?.title || ""}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/50 pb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  पाठ {lessonData.order || currentIndex + 1}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold",
                  lessonData.difficulty === "Beginner" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                  lessonData.difficulty === "Intermediate" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                  lessonData.difficulty === "Advanced" && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
                )}>
                  {lessonData.difficulty === "Beginner" ? "प्रारंभिक" :
                    lessonData.difficulty === "Intermediate" ? "मध्यम" : "उच्च"}
                </span>
                {isCompleted && (
                  <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" /> पूर्ण
                  </span>
                )}
              </div>

              {/* Hindi Title First - Large */}
              {lessonData.hindiTitle && (
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary">
                    {lessonData.hindiTitle}
                  </h1>
                  <AudioButton text={lessonData.hindiTitle} language="hi" size="md" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300">
                  {lessonData.title}
                </h2>
                <AudioButton text={lessonData.title} language="en" size="md" />
              </div>

              <p className="text-muted-foreground mt-2">
                {lessonData.description}
              </p>
            </div>

            {lessonData.imageUrl && (
              <div className="hidden md:block w-32 h-32 rounded-2xl overflow-hidden shadow-md shrink-0">
                <img
                  src={lessonData.imageUrl}
                  alt={lessonData.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            )}
          </div>
        </div>

        {/* Split View Content - English & Hindi Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* English Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden h-full">
              <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 dark:bg-blue-800 p-1.5 rounded">
                    <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-blue-700 dark:text-blue-400">English Content</h3>
                </div>
                <AudioButton
                  text={englishContent.replace(/[#*_`]/g, '').substring(0, 500)}
                  language="en"
                  size="sm"
                  showText
                />
              </div>
              <div className="p-6 prose prose-slate dark:prose-invert max-w-none">
                <ReactMarkdown>{englishContent}</ReactMarkdown>
              </div>
            </div>
          </motion.div>

          {/* Hindi Explanation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl shadow-sm border border-amber-200 dark:border-amber-800/30 overflow-hidden h-full">
              <div className="bg-amber-100 dark:bg-amber-900/30 px-6 py-4 border-b border-amber-200 dark:border-amber-800/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-amber-200 dark:bg-amber-800 p-1.5 rounded">
                    <Languages className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                  </div>
                  <h3 className="font-bold text-amber-800 dark:text-amber-400">हिंदी व्याख्या (Hindi Explanation)</h3>
                </div>
                {hindiContent && (
                  <AudioButton
                    text={hindiContent.replace(/[#*_`]/g, '').substring(0, 500)}
                    language="hi"
                    size="sm"
                    showText
                    className="text-amber-700 dark:text-amber-400"
                  />
                )}
              </div>
              <div className="p-6 prose prose-slate dark:prose-invert max-w-none">
                {hindiContent ? (
                  <ReactMarkdown>{hindiContent}</ReactMarkdown>
                ) : (
                  <div className="text-amber-700 dark:text-amber-400">
                    <p className="text-lg font-medium mb-4">📚 इस पाठ में सीखें:</p>
                    <p className="mb-2"><strong>शीर्षक:</strong> {lessonData.hindiTitle || lessonData.title}</p>
                    <p><strong>श्रेणी:</strong> {lessonData.category || "General"}</p>
                    <p className="mt-4 text-sm">💡 ऊपर दिए गए English content को ध्यान से पढ़ें और समझें।</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vocabulary Section */}
        {vocabulary && vocabulary.length > 0 && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-2 rounded-lg text-sm">ABC</span>
              मुख्य शब्दावली (Key Vocabulary)
            </h2>
            <div className="grid gap-4">
              {vocabulary.map((word) => (
                <VocabularyItem key={word.id} word={word} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Dialogue / Roleplay Section */}
        {conversationLines && conversationLines.length > 0 && (
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-2 rounded-lg text-sm">🗣️</span>
              बातचीत / संवाद (Conversation)
            </h2>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              {conversationLines.map((line, idx) => (
                <div
                  key={line.id}
                  className={cn(
                    "p-6 flex flex-col sm:flex-row gap-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                    line.speaker === 'Speaker A' || idx % 2 === 0 ? "bg-slate-50/50 dark:bg-slate-900" : "bg-white dark:bg-slate-950"
                  )}
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0",
                      line.speaker === 'Speaker A' || idx % 2 === 0
                        ? "bg-primary/10 text-primary"
                        : "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
                    )}>
                      {line.emoji || (line.speaker === 'Speaker A' ? 'A' : 'B')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">{line.speaker}</span>
                        <AudioButton text={line.englishText} language="en" size="sm" />
                      </div>
                      <p className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-1 leading-relaxed">
                        {line.englishText}
                      </p>
                      <p className="text-sm text-muted-foreground font-hindi">
                        {line.hindiText}
                      </p>
                    </div>
                  </div>

                  {/* Speech Practice Area */}
                  <div className="sm:ml-auto flex items-center pt-2 sm:pt-0 pl-14 sm:pl-0">
                    <SpeechEvaluator
                      targetText={line.englishText}
                      className="shrink-0"
                      onComplete={(score) => {
                        if (score >= 80) {
                          toast({
                            title: "Excellent! 🎉",
                            description: "+5 XP for great pronunciation",
                            duration: 2000,
                          });
                          if (userStats) {
                            updateUserStats({
                              xpPoints: Number(userStats.xpPoints || 0) + 5
                            });
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Complete Button */}
        {/* Complete Button / Quiz Section */}
        <div className="mb-8">
          {quiz && !isCompleted ? (
            !showQuiz ? (
              <div className="text-center p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold mb-4">Ready to test your knowledge?</h3>
                <p className="text-muted-foreground mb-6">Take a quick quiz to complete this lesson.</p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-8 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all"
                >
                  Start Quiz
                </button>
              </div>
            ) : (
              <Quiz quizId={quiz.id} onComplete={handleQuizComplete} />
            )
          ) : (
            <button
              onClick={handleComplete}
              disabled={isCompleted || isMarking || (!!quiz && !isCompleted)}
              className={cn(
                "w-full px-8 py-4 rounded-xl font-bold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 text-lg",
                isCompleted
                  ? "bg-green-100 text-green-700 border-green-200 cursor-default dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
              )}
            >
              {isMarking ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isCompleted ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  पाठ पूर्ण हो गया! ✅
                </>
              ) : (
                "✨ पाठ पूर्ण करें (Mark Complete)"
              )}
            </button>
          )}
        </div>

        {/* Recommended Next Lesson */}
        {isCompleted && recommendedNextLesson && (
          <div className="mb-8 p-4 rounded-2xl border bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                अगला सुझावित पाठ (Recommended Next Lesson)
              </p>
              <p className="text-base font-medium text-emerald-900 dark:text-emerald-100">
                {recommendedNextLesson.hindiTitle || recommendedNextLesson.title}
              </p>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 mt-1">
                श्रेणी: {recommendedNextLesson.category} • स्तर: {recommendedNextLesson.difficulty}
              </p>
            </div>
            <Link href={`/lesson/${recommendedNextLesson.id}`}>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
                अभी शुरू करें
              </button>
            </Link>
          </div>
        )}

        {/* Prev/Next Navigation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-center justify-between gap-4 mb-8">
          {prevLesson ? (
            <Link href={`/lesson/${prevLesson.id}`}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <div className="text-left hidden sm:block">
                  <span className="block text-xs text-muted-foreground">पिछला पाठ</span>
                  <span className="block text-sm font-medium max-w-[150px] truncate">{prevLesson.hindiTitle || prevLesson.title}</span>
                </div>
                <span className="sm:hidden text-sm">पिछला</span>
              </button>
            </Link>
          ) : (
            <div className="w-[100px]" />
          )}

          <Link href="/">
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Home className="h-5 w-5 text-muted-foreground" />
            </button>
          </Link>

          {nextLesson ? (
            <Link href={`/lesson/${nextLesson.id}`}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 group">
                <div className="text-right hidden sm:block">
                  <span className="block text-xs text-primary-foreground/80">अगला पाठ</span>
                  <span className="block text-sm font-medium max-w-[150px] truncate">{nextLesson.hindiTitle || nextLesson.title}</span>
                </div>
                <span className="sm:hidden text-sm">अगला</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          ) : (
            <Link href="/">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors shadow-lg">
                🎉 कोर्स पूर्ण!
              </button>
            </Link>
          )}
        </div>

        {/* Credits Footer */}
        <footer className="text-center pb-8">
          <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <p className="text-sm font-medium">
              Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
            </p>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          </div>
        </footer>
      </div>
    </Layout>
  );
}
