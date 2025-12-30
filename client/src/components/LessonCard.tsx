import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, CheckCircle2, BarChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Lesson, Progress } from "@shared/schema";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
  progress?: Progress;
  index?: number;
}

export function LessonCard({ lesson, progress, index = 0 }: LessonCardProps) {
  const isCompleted = progress?.completed;
  const { t } = useTranslation();

  return (
    <Link href={`/lesson/${lesson.id}`}>
      <motion.div 
        className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer h-full flex flex-col overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Image Header */}
        {lesson.imageUrl && (
          <div className="relative h-40 overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img 
              src={lesson.imageUrl} 
              alt={lesson.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <span className={cn(
              "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm",
              lesson.difficulty === "Beginner" && "bg-green-100/90 text-green-700",
              lesson.difficulty === "Intermediate" && "bg-blue-100/90 text-blue-700",
              lesson.difficulty === "Advanced" && "bg-purple-100/90 text-purple-700",
            )}>
              {lesson.difficulty === "Beginner" ? "प्रारंभिक" : 
               lesson.difficulty === "Intermediate" ? "मध्यम" : "उच्च"}
            </span>
          </div>
        )}
        
        {/* Decorative background blob (when no image) */}
        {!lesson.imageUrl && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150" />
        )}
        
        <div className="relative z-10 flex-1 p-5">
          {!lesson.imageUrl && (
            <div className="flex justify-between items-start mb-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
                lesson.difficulty === "Beginner" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                lesson.difficulty === "Intermediate" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                lesson.difficulty === "Advanced" && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
              )}>
                {lesson.difficulty === "Beginner" ? "प्रारंभिक" : 
                 lesson.difficulty === "Intermediate" ? "मध्यम" : "उच्च"}
              </span>
              {isCompleted && (
                <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-100" />
              )}
            </div>
          )}
          
          {/* Level indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              <BarChart className="w-3 h-3" /> पाठ {lesson.order || index + 1}
            </span>
            {lesson.imageUrl && isCompleted && (
              <>
                <span>•</span>
                <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> पूर्ण
                </span>
              </>
            )}
          </div>
          
          {/* Hindi Title First - Primary */}
          {lesson.hindiTitle && (
            <h3 className="text-lg font-bold text-primary dark:text-primary mb-1 group-hover:text-primary/80 transition-colors line-clamp-2">
              {lesson.hindiTitle}
            </h3>
          )}
          
          {/* English Title - Secondary */}
          <h4 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2 group-hover:text-slate-900 dark:group-hover:text-white transition-colors line-clamp-1">
            {lesson.title}
          </h4>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {lesson.hindiDescription || lesson.description}
          </p>
        </div>

        <div className="relative z-10 px-5 pb-5 pt-4 border-t border-border/50 flex items-center justify-between mt-auto bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center text-xs text-muted-foreground font-medium">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>5-10 मिनट</span>
          </div>
          
          <span className="flex items-center text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform duration-200">
            {isCompleted ? "दोहराएं" : "शुरू करें"}
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
