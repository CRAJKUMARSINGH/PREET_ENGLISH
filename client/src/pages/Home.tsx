import { Layout } from "@/components/Layout";
import { LessonCard } from "@/components/LessonCard";
import { useLessons } from "@/hooks/use-lessons";
import { useProgress } from "@/hooks/use-progress";
import { Loader2, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const { data: progress, isLoading: progressLoading } = useProgress();
  const { t } = useTranslation();

  const isLoading = lessonsLoading || progressLoading;

  // Simple progress calculation
  const completedCount = progress?.filter(p => p.completed).length || 0;
  const totalLessons = lessons?.length || 0;
  const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <Layout>
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
          {t("welcome")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {t("subtitle")}
        </p>
      </header>

      {/* Progress Overview */}
      <section className="mb-12 bg-white rounded-3xl p-6 md:p-8 border shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-primary font-semibold mb-2">
              <Sparkles className="h-5 w-5" />
              <span>{t("your_progress")}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{completedCount} of {totalLessons} {t("lessons_completed")}</h2>
            <p className="text-muted-foreground">{t("keep_momentum")}</p>
          </div>
          
          <div className="flex items-center gap-4 min-w-[200px]">
            <div className="w-full bg-secondary h-4 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="font-bold text-xl text-primary">{percentage}%</span>
          </div>
        </div>
      </section>

      {/* Lessons Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t("available_lessons")}</h2>
          {/* Future: Add filter/sort controls here */}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons?.sort((a, b) => a.order - b.order).map((lesson) => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                progress={progress?.find(p => p.lessonId === lesson.id)}
              />
            ))}
            
            {(!lessons || lessons.length === 0) && (
              <div className="col-span-full text-center py-12 text-muted-foreground bg-white rounded-2xl border border-dashed">
                {t("no_lessons")}
              </div>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}
