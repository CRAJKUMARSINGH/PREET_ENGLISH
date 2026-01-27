import { Award, Star, BookOpen, Target, Zap, Lock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
export function CertificationCard(_a) {
    var level = _a.level, lessonsCompleted = _a.lessonsCompleted, totalLessons = _a.totalLessons, quizzesPassed = _a.quizzesPassed, totalQuizzes = _a.totalQuizzes;
    var levelConfig = {
        beginner: {
            name: 'Basic Proficiency',
            nameHindi: 'बुनियादी दक्षता',
            color: 'text-green-500',
            gradient: 'from-green-400 to-emerald-600',
            bgColor: 'bg-green-50 dark:bg-green-900/10',
            borderColor: 'border-green-200 dark:border-green-800',
            icon: BookOpen,
            requiredLessons: 50,
            requiredQuizzes: 5
        },
        intermediate: {
            name: 'Independent User',
            nameHindi: 'स्वतंत्र उपयोगकर्ता',
            color: 'text-blue-500',
            gradient: 'from-blue-400 to-indigo-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/10',
            borderColor: 'border-blue-200 dark:border-blue-800',
            icon: Target,
            requiredLessons: 150,
            requiredQuizzes: 15
        },
        advanced: {
            name: 'Proficient User',
            nameHindi: 'कुशल उपयोगकर्ता',
            color: 'text-purple-500',
            gradient: 'from-purple-400 to-pink-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/10',
            borderColor: 'border-purple-200 dark:border-purple-800',
            icon: Zap,
            requiredLessons: 300,
            requiredQuizzes: 30
        }
    };
    var config = levelConfig[level];
    var Icon = config.icon;
    var lessonProgress = Math.min((lessonsCompleted / config.requiredLessons) * 100, 100);
    var quizProgress = Math.min((quizzesPassed / config.requiredQuizzes) * 100, 100);
    var overallProgress = (lessonProgress + quizProgress) / 2;
    var isUnlocked = lessonProgress >= 100 && quizProgress >= 100;
    return (<div className={cn("group relative overflow-hidden rounded-[2rem] border transition-all duration-500", isUnlocked
            ? "bg-white dark:bg-slate-900 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/40"
            : "bg-secondary/20 border-transparent opacity-80")}>
      {/* Background Decor */}
      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br", config.gradient)}/>

      <div className="relative p-6 z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-500", isUnlocked ? "bg-gradient-to-br ".concat(config.gradient, " text-white") : "bg-secondary text-muted-foreground")}>
              {isUnlocked ? <Award className="w-7 h-7"/> : <Icon className="w-7 h-7"/>}
            </div>
            <div>
              <h3 className="text-lg font-bold font-display text-foreground">{config.name}</h3>
              <p className="text-sm text-muted-foreground font-medium">{config.nameHindi}</p>
            </div>
          </div>

          {isUnlocked ? (<div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-yellow-200 dark:border-yellow-800">
              <Star className="w-3.5 h-3.5 fill-current"/>
              <span>Certified</span>
            </div>) : (<div className="bg-secondary text-muted-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5"/>
              <span>Locked</span>
            </div>)}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold tracking-wide">
              <span className="text-muted-foreground uppercase">Lessons</span>
              <span className={isUnlocked ? config.color : "text-muted-foreground"}>
                {lessonsCompleted}/{config.requiredLessons}
              </span>
            </div>
            <div className="h-2.5 bg-secondary rounded-full overflow-hidden border border-border/50">
              <div className={cn("h-full rounded-full transition-all duration-1000", isUnlocked ? "bg-gradient-to-r ".concat(config.gradient) : "bg-muted-foreground/30")} style={{ width: "".concat(lessonProgress, "%") }}/>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold tracking-wide">
              <span className="text-muted-foreground uppercase">Quizzes</span>
              <span className={isUnlocked ? config.color : "text-muted-foreground"}>
                {quizzesPassed}/{config.requiredQuizzes}
              </span>
            </div>
            <div className="h-2.5 bg-secondary rounded-full overflow-hidden border border-border/50">
              <div className={cn("h-full rounded-full transition-all duration-1000", isUnlocked ? "bg-gradient-to-r ".concat(config.gradient) : "bg-muted-foreground/30")} style={{ width: "".concat(quizProgress, "%") }}/>
            </div>
          </div>
        </div>

        {isUnlocked && (<div className="mt-6 pt-4 border-t border-border/50 flex justify-center">
            <button className={cn("text-sm font-bold flex items-center gap-2 transition-colors hover:underline decoration-2 underline-offset-4", config.color)}>
              View Certificate <CheckCircle className="w-4 h-4"/>
            </button>
          </div>)}
      </div>
    </div>);
}
