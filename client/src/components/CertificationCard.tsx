import { Award, Star, Trophy, BookOpen, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificationCardProps {
  level: 'beginner' | 'intermediate' | 'advanced';
  lessonsCompleted: number;
  totalLessons: number;
  quizzesPassed: number;
  totalQuizzes: number;
}

export function CertificationCard({ 
  level, 
  lessonsCompleted, 
  totalLessons,
  quizzesPassed,
  totalQuizzes
}: CertificationCardProps) {
  const levelConfig = {
    beginner: {
      name: 'Basic Proficiency',
      nameHindi: 'बुनियादी दक्षता',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      icon: BookOpen,
      requiredLessons: 50,
      requiredQuizzes: 5
    },
    intermediate: {
      name: 'Independent User',
      nameHindi: 'स्वतंत्र उपयोगकर्ता',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      icon: Target,
      requiredLessons: 150,
      requiredQuizzes: 15
    },
    advanced: {
      name: 'Proficient User',
      nameHindi: 'कुशल उपयोगकर्ता',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800',
      icon: Zap,
      requiredLessons: 300,
      requiredQuizzes: 30
    }
  };

  const config = levelConfig[level];
  const Icon = config.icon;
  
  const lessonProgress = Math.min((lessonsCompleted / config.requiredLessons) * 100, 100);
  const quizProgress = Math.min((quizzesPassed / config.requiredQuizzes) * 100, 100);
  const overallProgress = (lessonProgress + quizProgress) / 2;
  const isUnlocked = lessonProgress >= 100 && quizProgress >= 100;

  return (
    <div className={cn(
      "relative rounded-2xl border-2 p-6 transition-all",
      isUnlocked ? config.borderColor : "border-slate-200 dark:border-slate-700",
      isUnlocked ? config.bgColor : "bg-slate-50 dark:bg-slate-800/50"
    )}>
      {/* Badge Icon */}
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center mb-4",
        isUnlocked 
          ? `bg-gradient-to-br ${config.color} shadow-lg` 
          : "bg-slate-200 dark:bg-slate-700"
      )}>
        {isUnlocked ? (
          <Award className="w-8 h-8 text-white" />
        ) : (
          <Icon className="w-8 h-8 text-slate-400" />
        )}
      </div>

      {/* Title */}
      <h3 className={cn(
        "text-lg font-bold mb-1",
        isUnlocked ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"
      )}>
        {config.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{config.nameHindi}</p>

      {/* Progress Bars */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">पाठ पूर्ण</span>
            <span className="font-medium">{lessonsCompleted}/{config.requiredLessons}</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isUnlocked ? `bg-gradient-to-r ${config.color}` : "bg-slate-400"
              )}
              style={{ width: `${lessonProgress}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">क्विज़ पास</span>
            <span className="font-medium">{quizzesPassed}/{config.requiredQuizzes}</span>
          </div>
          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                isUnlocked ? `bg-gradient-to-r ${config.color}` : "bg-slate-400"
              )}
              style={{ width: `${quizProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Status Badge */}
      {isUnlocked && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
            <Star className="w-3 h-3 fill-current" />
            अर्जित
          </div>
        </div>
      )}

      {/* Lock Overlay */}
      {!isUnlocked && overallProgress < 50 && (
        <div className="absolute inset-0 bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-2">
              🔒
            </div>
            <p className="text-sm text-muted-foreground">और पाठ पूरे करें</p>
          </div>
        </div>
      )}
    </div>
  );
}
