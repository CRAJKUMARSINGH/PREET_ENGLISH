import { Link } from "wouter";
import { Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Lesson, Progress } from "@shared/schema";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
  progress?: Progress;
}

export function LessonCard({ lesson, progress }: LessonCardProps) {
  const isCompleted = progress?.completed;
  const { t } = useTranslation();

  return (
    <Link href={`/lesson/${lesson.id}`}>
      <div className="group relative bg-white rounded-2xl border border-border p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-pointer h-full flex flex-col overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150" />
        
        <div className="relative z-10 flex-1">
          <div className="flex justify-between items-start mb-4">
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
              lesson.difficulty === "Beginner" && "bg-green-100 text-green-700",
              lesson.difficulty === "Intermediate" && "bg-blue-100 text-blue-700",
              lesson.difficulty === "Advanced" && "bg-purple-100 text-purple-700",
            )}>
              {t(lesson.difficulty.toLowerCase())}
            </span>
            {isCompleted && (
              <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-100" />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {lesson.title}
          </h3>
          
          {/* Hindi Title for Hindi speakers */}
          {lesson.hindiTitle && (
            <p className="text-lg text-slate-600 mb-2 font-medium" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {lesson.hindiTitle}
            </p>
          )}
          
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
            {lesson.description}
          </p>
        </div>

        <div className="relative z-10 pt-4 border-t border-border/50 flex items-center justify-between mt-auto">
          <div className="flex items-center text-xs text-muted-foreground font-medium">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>{t("lesson_duration")}</span>
          </div>
          
          <span className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform duration-200">
            {isCompleted ? t("review_lesson") : t("start_lesson")}
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
