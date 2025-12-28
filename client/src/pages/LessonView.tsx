import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { VocabularyItem } from "@/components/VocabularyItem";
import { CelebrationModal } from "@/components/CelebrationModal";
import { useLesson } from "@/hooks/use-lessons";
import { useMarkComplete, useProgress } from "@/hooks/use-progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function LessonView() {
  const [, params] = useRoute("/lesson/:id");
  const id = params ? parseInt(params.id) : null;
  const { toast } = useToast();
  const [showCelebration, setShowCelebration] = useState(false);

  const { data: lessonData, isLoading: lessonLoading } = useLesson(id);
  const { data: progressList } = useProgress();
  const { mutate: markComplete, isPending: isMarking } = useMarkComplete();

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

  return (
    <Layout>
      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        lessonTitle={lessonData?.title || ""}
        hindiTitle={lessonData?.hindiTitle || undefined}
      />
      
      <div className="max-w-3xl mx-auto">
        {/* Navigation & Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            डैशबोर्ड पर वापस जाएं
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3",
                lessonData.difficulty === "Beginner" && "bg-green-100 text-green-700",
                lessonData.difficulty === "Intermediate" && "bg-blue-100 text-blue-700",
                lessonData.difficulty === "Advanced" && "bg-purple-100 text-purple-700",
              )}>
                {lessonData.difficulty === "Beginner" ? "प्रारंभिक" : 
                 lessonData.difficulty === "Intermediate" ? "मध्यम" : "उच्च"}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 font-display">
                {lessonData.title}
              </h1>
              
              {/* Hindi Title for Hindi speakers */}
              {lessonData.hindiTitle && (
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-700 mb-3" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  {lessonData.hindiTitle}
                </h2>
              )}
              
              <p className="text-lg text-muted-foreground">
                {lessonData.description}
              </p>
            </div>
            
            {/* Dynamic Image from DB or fallback */}
            {lessonData.imageUrl && (
              <div className="hidden md:block w-32 h-32 rounded-2xl overflow-hidden shadow-md shrink-0">
                <img 
                  src={lessonData.imageUrl} 
                  alt={lessonData.title}
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border mb-8">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-strong:text-slate-900">
            <ReactMarkdown>
              {lessonData.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Vocabulary Section */}
        {vocabulary && vocabulary.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 text-primary p-2 rounded-lg text-sm">ABC</span>
              मुख्य शब्दावली
            </h2>
            <div className="grid gap-4">
              {vocabulary.map((word) => (
                <VocabularyItem key={word.id} word={word} />
              ))}
            </div>
          </section>
        )}

        {/* Action Bar */}
        <div className="sticky bottom-6 bg-white/90 backdrop-blur-lg border p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4">
          <div className="text-sm font-medium text-muted-foreground hidden sm:block">
            {isCompleted ? "आपने इस पाठ को पूरा कर लिया है!" : "इस पाठ को पूरा करने के लिए तैयार हैं?"}
          </div>
          
          <button
            onClick={handleComplete}
            disabled={isCompleted || isMarking}
            className={cn(
              "flex-1 sm:flex-none px-8 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2",
              isCompleted 
                ? "bg-green-100 text-green-700 border-green-200 cursor-default" 
                : "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            )}
          >
            {isMarking ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : isCompleted ? (
              <>
                <CheckCircle className="h-5 w-5" />
                पूर्ण
              </>
            ) : (
              "पूर्ण करें"
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}
