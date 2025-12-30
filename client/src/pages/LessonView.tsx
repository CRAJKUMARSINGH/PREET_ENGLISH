import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, Loader2, ChevronLeft, ChevronRight, Home, BookOpen, Languages, Heart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { VocabularyItem } from "@/components/VocabularyItem";
import { CelebrationModal } from "@/components/CelebrationModal";
import { useLesson, useLessons } from "@/hooks/use-lessons";
import { useMarkComplete, useProgress } from "@/hooks/use-progress";
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
  const { mutate: markComplete, isPending: isMarking } = useMarkComplete();

  // Find prev/next lessons
  const sortedLessons = allLessons?.sort((a, b) => a.order - b.order) || [];
  const currentIndex = sortedLessons.findIndex(l => l.id === id);
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex !== -1 && currentIndex < sortedLessons.length - 1 
    ? sortedLessons[currentIndex + 1] 
    : null;

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

  const { vocabulary } = lessonData;
  const isCompleted = progressList?.some(p => p.lessonId === id && p.completed);
  const progressPercent = sortedLessons.length > 0 ? ((currentIndex + 1) / sortedLessons.length) * 100 : 0;

  const handleComplete = () => {
    if (!id) return;
    markComplete({ lessonId: id, completed: true }, {
      onSuccess: () => {
        setShowCelebration(true);
        toast({
          title: "पूर्ण! 🎉",
          description: "बहुत अच्छा! आपकी प्रगति सहेज ली गई है।",
          duration: 3000,
        });
      }
    });
  };

  // Extract Hindi content from markdown (content after ## हिंदी)
  const contentParts = lessonData.content.split(/##\s*हिंदी/i);
  const englishContent = contentParts[0] || lessonData.content;
  const hindiContent = contentParts[1] ? `## हिंदी${contentParts[1]}` : null;

  return (
    <Layout>
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        lessonTitle={lessonData?.title || ""}
        hindiTitle={lessonData?.hindiTitle || undefined}
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

      <div className="max-w-5xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            डैशबोर्ड पर वापस जाएं
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
                <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary mb-2">
                  {lessonData.hindiTitle}
                </h1>
              )}
              <h2 className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300">
                {lessonData.title}
              </h2>
              
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
              <div className="bg-blue-50 dark:bg-blue-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <div className="bg-blue-100 dark:bg-blue-800 p-1.5 rounded">
                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-blue-700 dark:text-blue-400">English Content</h3>
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
              <div className="bg-amber-100 dark:bg-amber-900/30 px-6 py-4 border-b border-amber-200 dark:border-amber-800/30 flex items-center gap-2">
                <div className="bg-amber-200 dark:bg-amber-800 p-1.5 rounded">
                  <Languages className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                </div>
                <h3 className="font-bold text-amber-800 dark:text-amber-400">हिंदी व्याख्या (Hindi Explanation)</h3>
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

        {/* Complete Button */}
        <div className="mb-8">
          <button
            onClick={handleComplete}
            disabled={isCompleted || isMarking}
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
        </div>

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
