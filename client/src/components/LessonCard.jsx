import { Link } from "wouter";
import { motion } from "framer-motion";
import { Clock, ArrowRight, CheckCircle2, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
export function LessonCard(_a) {
    var lesson = _a.lesson, progress = _a.progress, _b = _a.index, index = _b === void 0 ? 0 : _b;
    var isCompleted = progress === null || progress === void 0 ? void 0 : progress.completed;
    var t = useTranslation().t;
    return (<Link href={"/lesson/".concat(lesson.id)}>
      <motion.div className="group relative h-full glass-card rounded-3xl cursor-pointer flex flex-col overflow-hidden" whileHover={{ y: -5 }} transition={{ duration: 0.3, ease: "easeOut" }}>
        {/* Card Background Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"/>

        {/* Content Section */}
        <div className="p-6 flex flex-col h-full relative z-10">

          {/* Header Badge Row */}
          <div className="flex justify-between items-start mb-4">
            <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-sm", lesson.difficulty === "Beginner" && "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400", lesson.difficulty === "Intermediate" && "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400", lesson.difficulty === "Advanced" && "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400 dark:bg-purple-500/20")}>
              {lesson.difficulty}
            </span>

            {isCompleted ? (<div className="bg-green-500/10 p-1.5 rounded-full border border-green-500/20 shadow-sm animate-in zoom-in duration-300">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400"/>
              </div>) : (<div className="bg-secondary p-1.5 rounded-full border border-border/50 opacity-30 group-hover:opacity-100 transition-opacity">
                {/* Placeholder icon slot */}
                <BookOpen className="h-4 w-4"/>
              </div>)}
          </div>

          {/* Titles */}
          <div className="space-y-1 mb-3">
            {lesson.hindiTitle && (<h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-1">
                {lesson.hindiTitle}
              </h3>)}
            <h4 className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 line-clamp-1">
              {lesson.title}
            </h4>
          </div>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-primary/20 rounded-full mb-3 group-hover:w-full transition-all duration-500"/>

          {/* Description */}
          <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed mb-6 flex-1">
            {lesson.hindiDescription || lesson.description}
          </p>

          {/* Footer Actions */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/10">
            <div className="flex items-center text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <span className="opacity-50 mr-2">LESSON {lesson.order || index + 1}</span>
              <div className="flex items-center gap-1 opacity-70">
                <Clock className="h-3 w-3"/>
                <span>5m</span>
              </div>
            </div>

            <button className={cn("relative overflow-hidden pl-4 pr-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border", isCompleted
            ? "bg-secondary text-foreground hover:bg-secondary/80 border-border"
            : "bg-primary/90 text-primary-foreground hover:bg-primary border-primary/50 shadow-lg shadow-primary/20")}>
              <div className="flex items-center gap-1.5">
                <span>{isCompleted ? t("review") : t("start")}</span>
                <ArrowRight className="h-3.5 w-3.5"/>
              </div>
            </button>
          </div>

        </div>
      </motion.div>
    </Link>);
}
