import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Calendar, Trophy, Target, Star, CheckCircle } from "lucide-react";

interface DayProgress {
  day: string;
  dayHindi: string;
  completed: boolean;
  wordsLearned: number;
  quizScore: number;
}

const weekProgress: DayProgress[] = [
  { day: "Mon", dayHindi: "सोम", completed: true, wordsLearned: 5, quizScore: 80 },
  { day: "Tue", dayHindi: "मंगल", completed: true, wordsLearned: 4, quizScore: 70 },
  { day: "Wed", dayHindi: "बुध", completed: true, wordsLearned: 6, quizScore: 90 },
  { day: "Thu", dayHindi: "गुरु", completed: true, wordsLearned: 3, quizScore: 60 },
  { day: "Fri", dayHindi: "शुक्र", completed: false, wordsLearned: 0, quizScore: 0 },
  { day: "Sat", dayHindi: "शनि", completed: false, wordsLearned: 0, quizScore: 0 },
  { day: "Sun", dayHindi: "रवि", completed: false, wordsLearned: 0, quizScore: 0 },
];

const achievements = [
  { id: 1, name: "पहला कदम", nameEn: "First Step", icon: "🎯", description: "पहला शब्द सीखा", earned: true },
  { id: 2, name: "शब्द संग्राहक", nameEn: "Word Collector", icon: "📚", description: "10 शब्द सीखे", earned: true },
  { id: 3, name: "सप्ताह योद्धा", nameEn: "Week Warrior", icon: "⚔️", description: "7 दिन लगातार", earned: false },
  { id: 4, name: "प्रश्नोत्तरी मास्टर", nameEn: "Quiz Master", icon: "🧠", description: "100% स्कोर", earned: false },
  { id: 5, name: "महीना चैंपियन", nameEn: "Month Champion", icon: "🏆", description: "30 दिन पूरे", earned: false },
  { id: 6, name: "शब्द गुरु", nameEn: "Word Guru", icon: "👑", description: "100 शब्द सीखे", earned: false },
];

export function LearningStreak() {
  const currentStreak = 4;
  const longestStreak = 12;
  const totalWordsLearned = 156;
  const totalQuizzes = 23;

  const completedDays = weekProgress.filter(d => d.completed).length;

  return (
    <Card className="border-2 border-amber-200 dark:border-amber-800">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
        <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
          <Flame className="h-6 w-6" />
          सीखने की लय (Learning Streak)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Streak Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
            <Flame className="h-8 w-8 mx-auto text-orange-500 mb-2" />
            <div className="text-3xl font-bold text-orange-600">{currentStreak}</div>
            <div className="text-sm text-muted-foreground">वर्तमान स्ट्रीक</div>
          </div>
          <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
            <Trophy className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <div className="text-3xl font-bold text-yellow-600">{longestStreak}</div>
            <div className="text-sm text-muted-foreground">सबसे लंबी</div>
          </div>
          <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
            <Target className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <div className="text-3xl font-bold text-green-600">{totalWordsLearned}</div>
            <div className="text-sm text-muted-foreground">शब्द सीखे</div>
          </div>
          <div className="text-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <Star className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <div className="text-3xl font-bold text-blue-600">{totalQuizzes}</div>
            <div className="text-sm text-muted-foreground">प्रश्नोत्तरी</div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              इस सप्ताह की प्रगति
            </h3>
            <Badge variant="outline">{completedDays}/7 दिन</Badge>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {weekProgress.map((day, index) => (
              <div
                key={index}
                className={`text-center p-3 rounded-xl transition-all ${
                  day.completed
                    ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-300"
                    : "bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700"
                }`}
              >
                <div className="text-xs font-medium">{day.day}</div>
                <div className="text-xs text-muted-foreground font-hindi">{day.dayHindi}</div>
                {day.completed ? (
                  <CheckCircle className="h-5 w-5 mx-auto mt-1 text-green-500" />
                ) : (
                  <div className="h-5 w-5 mx-auto mt-1 rounded-full border-2 border-slate-300" />
                )}
                {day.completed && (
                  <div className="text-xs mt-1 text-green-600">{day.wordsLearned} शब्द</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="font-bold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            उपलब्धियाँ (Achievements)
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-xl text-center transition-all ${
                  achievement.earned
                    ? "bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300"
                    : "bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 opacity-50"
                }`}
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="font-medium text-sm">{achievement.name}</div>
                <div className="text-xs text-muted-foreground">{achievement.nameEn}</div>
                <div className="text-xs text-muted-foreground mt-1">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation */}
        <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl text-center">
          <p className="text-amber-700 dark:text-amber-300 font-medium">
            🔥 {currentStreak} दिन की स्ट्रीक! कल भी सीखना मत भूलना!
          </p>
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
            Keep your {currentStreak}-day streak going! Don't forget to learn tomorrow!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}