import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { 
  BookOpen, 
  Mic, 
  MessageCircle, 
  Trophy, 
  Target, 
  TrendingUp,
  Heart,
  Star,
  Clock,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HindiLearningStats {
  totalLessons: number;
  completedLessons: number;
  speakingPractice: number;
  vocabularyMastered: number;
  currentStreak: number;
  hindiConfidence: number;
  weeklyGoal: number;
  weeklyProgress: number;
}

export function HindiLearningDashboard() {
  const [stats, setStats] = useState<HindiLearningStats>({
    totalLessons: 4500,
    completedLessons: 245,
    speakingPractice: 18,
    vocabularyMastered: 156,
    currentStreak: 7,
    hindiConfidence: 75,
    weeklyGoal: 50,
    weeklyProgress: 32
  });

  const [selectedModule, setSelectedModule] = useState<string>('overview');

  const modules = [
    {
      id: 'speaking',
      title: 'Hindi Speaking Practice',
      titleHindi: 'हिंदी बोलचाल अभ्यास',
      icon: Mic,
      color: 'bg-purple-500',
      progress: 68,
      description: 'Improve your Hindi pronunciation and fluency',
      descriptionHindi: 'अपने हिंदी उच्चारण और प्रवाहता में सुधार करें'
    },
    {
      id: 'grammar',
      title: 'Hindi Grammar Mastery',
      titleHindi: 'हिंदी व्याकरण निपुणता',
      icon: BookOpen,
      color: 'bg-blue-500',
      progress: 45,
      description: 'Master Hindi grammar rules and sentence structure',
      descriptionHindi: 'हिंदी व्याकरण नियम और वाक्य संरचना में महारत हासिल करें'
    },
    {
      id: 'conversation',
      title: 'Hindi Conversations',
      titleHindi: 'हिंदी बातचीत',
      icon: MessageCircle,
      color: 'bg-green-500',
      progress: 82,
      description: 'Practice real-life Hindi conversations',
      descriptionHindi: 'वास्तविक जीवन की हिंदी बातचीत का अभ्यास करें'
    },
    {
      id: 'pronunciation',
      title: 'Pronunciation Tools',
      titleHindi: 'उच्चारण उपकरण',
      icon: Target,
      color: 'bg-orange-500',
      progress: 56,
      description: 'Perfect your Hindi pronunciation with audio guides',
      descriptionHindi: 'ऑडियो गाइड के साथ अपने हिंदी उच्चारण को सही करें'
    }
  ];

  const achievements = [
    {
      title: 'Hindi Enthusiast',
      titleHindi: 'हिंदी उत्साही',
      description: 'Completed 100 Hindi lessons',
      descriptionHindi: '100 हिंदी पाठ पूरे किए',
      icon: '🎯',
      earned: true
    },
    {
      title: 'Speaking Champion',
      titleHindi: 'बोलचाल चैंपियन',
      description: 'Practiced speaking for 7 days straight',
      descriptionHindi: '7 दिन लगातार बोलने का अभ्यास किया',
      icon: '🎤',
      earned: true
    },
    {
      title: 'Grammar Master',
      titleHindi: 'व्याकरण मास्टर',
      description: 'Mastered 50 grammar concepts',
      descriptionHindi: '50 व्याकरण अवधारणाओं में महारत हासिल की',
      icon: '📚',
      earned: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Hindi Learning Dashboard
        </h1>
        <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-1">
          हिंदी सीखने का डैशबोर्ड
        </p>
        <p className="text-muted-foreground">
          Your personalized Hindi learning journey • आपकी व्यक्तिगत हिंदी सीखने की यात्रा
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Lessons Completed</p>
                <p className="text-xs text-blue-500 dark:text-blue-300">पाठ पूरे किए</p>
                <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  {stats.completedLessons}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={(stats.completedLessons / stats.totalLessons) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Speaking Practice</p>
                <p className="text-xs text-purple-500 dark:text-purple-300">बोलने का अभ्यास</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                  {stats.speakingPractice}
                </p>
              </div>
              <Mic className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
              Sessions completed • सत्र पूरे किए
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">Vocabulary</p>
                <p className="text-xs text-green-500 dark:text-green-300">शब्दावली</p>
                <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                  {stats.vocabularyMastered}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2 text-xs text-green-600 dark:text-green-400">
              Words mastered • शब्द सीखे
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Current Streak</p>
                <p className="text-xs text-orange-500 dark:text-orange-300">वर्तमान स्ट्रीक</p>
                <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                  {stats.currentStreak} days
                </p>
              </div>
              <Trophy className="h-8 w-8 text-orange-500" />
            </div>
            <div className="mt-2 text-xs text-orange-600 dark:text-orange-400">
              Keep it up! • इसे जारी रखें!
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Modules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Hindi Learning Modules
            <span className="text-lg text-amber-600 dark:text-amber-400 ml-2">
              हिंदी सीखने के मॉड्यूल
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <Card 
                key={module.id} 
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  selectedModule === module.id ? "ring-2 ring-primary" : ""
                )}
                onClick={() => setSelectedModule(module.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn("p-2 rounded-lg", module.color)}>
                      <module.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {module.title}
                      </h3>
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-1">
                        {module.titleHindi}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {module.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        {module.descriptionHindi}
                      </p>
                      <div className="flex items-center justify-between">
                        <Progress value={module.progress} className="flex-1 mr-2" />
                        <span className="text-sm font-medium">{module.progress}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Hindi Learning Achievements
            <span className="text-lg text-amber-600 dark:text-amber-400 ml-2">
              हिंदी सीखने की उपलब्धियां
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <Card 
                key={index}
                className={cn(
                  "transition-all",
                  achievement.earned 
                    ? "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800" 
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                )}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className={cn(
                    "font-semibold mb-1",
                    achievement.earned ? "text-yellow-700 dark:text-yellow-300" : "text-slate-600 dark:text-slate-400"
                  )}>
                    {achievement.title}
                  </h3>
                  <p className={cn(
                    "text-sm mb-1",
                    achievement.earned ? "text-yellow-600 dark:text-yellow-400" : "text-slate-500 dark:text-slate-500"
                  )}>
                    {achievement.titleHindi}
                  </p>
                  <p className="text-xs text-muted-foreground mb-1">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.descriptionHindi}
                  </p>
                  {achievement.earned && (
                    <Badge className="mt-2 bg-yellow-500 text-white">
                      Earned • अर्जित
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
            <Clock className="h-5 w-5" />
            Weekly Goal • साप्ताहिक लक्ष्य
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                {stats.weeklyProgress} / {stats.weeklyGoal}
              </p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">
                Lessons this week • इस सप्ताह के पाठ
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-indigo-500" />
          </div>
          <Progress 
            value={(stats.weeklyProgress / stats.weeklyGoal) * 100} 
            className="mb-2"
          />
          <p className="text-sm text-indigo-600 dark:text-indigo-400">
            {stats.weeklyGoal - stats.weeklyProgress} lessons to go • {stats.weeklyGoal - stats.weeklyProgress} पाठ बाकी
          </p>
        </CardContent>
      </Card>

      {/* Credits Footer */}
      <footer className="text-center pt-6 border-t">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </div>
      </footer>
    </div>
  );
}