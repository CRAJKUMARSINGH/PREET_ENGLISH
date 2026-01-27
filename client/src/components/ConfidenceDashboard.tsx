import { TrendingUp, Target, Clock, Mic, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfidenceDashboardProps {
  confidenceScore: number;
  topicsCompleted: number;
  totalTopics: number;
  interviewAnswers: number;
  speakingMinutes: number;
  strengths: string[];
  focusAreas: string[];
}

export function ConfidenceDashboard({
  confidenceScore,
  topicsCompleted,
  totalTopics,
  interviewAnswers,
  speakingMinutes,
  strengths,
  focusAreas
}: ConfidenceDashboardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-yellow-500";
    return "text-orange-500";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🌟";
    if (score >= 60) return "💪";
    if (score >= 40) return "📈";
    return "🚀";
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">📈 My Progress</h2>
          <p className="text-sm text-muted-foreground">मेरी प्रगति</p>
        </div>
      </div>

      {/* Main Confidence Score */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-slate-200 dark:text-slate-700"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={`${confidenceScore * 3.52} 352`}
              strokeLinecap="round"
              className={getScoreColor(confidenceScore)}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{confidenceScore}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>
        <p className="mt-3 text-lg font-medium text-slate-700 dark:text-slate-300">
          Speaking Confidence {getScoreEmoji(confidenceScore)}
        </p>
        <p className="text-sm text-muted-foreground">बोलने का आत्मविश्वास</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <Target className="w-5 h-5 mx-auto mb-1 text-blue-500" />
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{topicsCompleted}</p>
          <p className="text-xs text-muted-foreground">Topics Done</p>
        </div>
        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <Mic className="w-5 h-5 mx-auto mb-1 text-purple-500" />
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{interviewAnswers}</p>
          <p className="text-xs text-muted-foreground">Interviews</p>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <Clock className="w-5 h-5 mx-auto mb-1 text-green-500" />
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{speakingMinutes}</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
      </div>

      {/* Strengths - Only positive feedback */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          Strengths (ताकतें)
        </h3>
        <div className="space-y-2">
          {strengths.map((strength, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
              <span className="text-green-500">✔</span>
              {strength}
            </div>
          ))}
        </div>
      </div>

      {/* Focus Areas - Encouraging, not negative */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Focus Area (अगला लक्ष्य)
        </h3>
        <div className="space-y-2">
          {focusAreas.map((area, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400">
              <span className="text-amber-500">→</span>
              {area}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
