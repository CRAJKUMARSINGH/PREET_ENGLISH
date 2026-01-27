import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Award, Clock, BookOpen, Mic, PenTool, Brain, Flame, Star, Calendar } from 'lucide-react';
var skillsProgress = [
    { name: 'Pronunciation', nameHindi: 'उच्चारण', progress: 72, level: 'Intermediate', icon: <Mic className="w-5 h-5"/> },
    { name: 'Grammar', nameHindi: 'व्याकरण', progress: 65, level: 'Intermediate', icon: <BookOpen className="w-5 h-5"/> },
    { name: 'Vocabulary', nameHindi: 'शब्दावली', progress: 80, level: 'Advanced', icon: <Brain className="w-5 h-5"/> },
    { name: 'Writing', nameHindi: 'लेखन', progress: 55, level: 'Intermediate', icon: <PenTool className="w-5 h-5"/> },
    { name: 'Speaking', nameHindi: 'बोलना', progress: 48, level: 'Beginner', icon: <Mic className="w-5 h-5"/> },
    { name: 'Listening', nameHindi: 'सुनना', progress: 70, level: 'Intermediate', icon: <Brain className="w-5 h-5"/> },
];
var recentAchievements = [
    { id: '1', title: 'First Lesson', titleHindi: 'पहला पाठ', icon: '🎯', earned: true, date: '2025-12-15' },
    { id: '2', title: '7-Day Streak', titleHindi: '7 दिन की लकीर', icon: '🔥', earned: true, date: '2025-12-22' },
    { id: '3', title: 'Grammar Pro', titleHindi: 'व्याकरण प्रो', icon: '📚', earned: true, date: '2025-12-28' },
    { id: '4', title: 'Vocabulary Master', titleHindi: 'शब्दावली मास्टर', icon: '🧠', earned: false },
    { id: '5', title: 'Speaking Champion', titleHindi: 'बोलने का चैंपियन', icon: '🎤', earned: false },
    { id: '6', title: '30-Day Streak', titleHindi: '30 दिन की लकीर', icon: '👑', earned: false },
];
export function ProgressDashboard() {
    var overallProgress = Math.round(skillsProgress.reduce(function (acc, s) { return acc + s.progress; }, 0) / skillsProgress.length);
    var earnedAchievements = recentAchievements.filter(function (a) { return a.earned; }).length;
    return (<div className="progress-dashboard space-y-6">
      {/* Overall Progress Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Learning Progress</h2>
              <p className="opacity-90">आपकी सीखने की प्रगति - Keep going!</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold">{overallProgress}%</div>
              <div className="text-sm opacity-90">Overall Progress</div>
            </div>
          </div>
          <Progress value={overallProgress} className="mt-4 h-3 bg-white/20"/>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500"/>
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Lessons Done</div>
            <div className="text-xs text-blue-600">पाठ पूरे</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500"/>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
            <div className="text-xs text-orange-600">दिन की लकीर</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500"/>
            <div className="text-2xl font-bold">2,450</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
            <div className="text-xs text-yellow-600">कुल अंक</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-green-500"/>
            <div className="text-2xl font-bold">24h</div>
            <div className="text-sm text-muted-foreground">Study Time</div>
            <div className="text-xs text-green-600">अध्ययन समय</div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500"/>
            Skills Progress
            <span className="text-sm font-normal text-muted-foreground">
              (कौशल प्रगति)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {skillsProgress.map(function (skill) { return (<div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {skill.icon}
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      ({skill.nameHindi})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{skill.level}</Badge>
                    <span className="font-bold">{skill.progress}%</span>
                  </div>
                </div>
                <Progress value={skill.progress} className="h-2"/>
              </div>); })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500"/>
            Achievements
            <span className="text-sm font-normal text-muted-foreground">
              (उपलब्धियां)
            </span>
            <Badge className="ml-auto">{earnedAchievements}/{recentAchievements.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {recentAchievements.map(function (achievement) { return (<div key={achievement.id} className={"text-center p-3 rounded-lg border ".concat(achievement.earned
                ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200'
                : 'bg-gray-50 dark:bg-gray-800 opacity-50')}>
                <div className="text-3xl mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium">{achievement.title}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">{achievement.titleHindi}</div>
                {achievement.earned && achievement.date && (<div className="text-xs text-green-600 mt-1">✓</div>)}
              </div>); })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500"/>
            This Week's Activity
            <span className="text-sm font-normal text-muted-foreground">
              (इस सप्ताह की गतिविधि)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end h-32">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(function (day, index) {
            var heights = [60, 80, 45, 90, 70, 30, 0];
            var height = heights[index];
            return (<div key={day} className="flex flex-col items-center gap-2">
                  <div className={"w-8 rounded-t ".concat(height > 0 ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700')} style={{ height: "".concat(height, "%") }}/>
                  <span className="text-xs text-muted-foreground">{day}</span>
                </div>);
        })}
          </div>
          <div className="text-center mt-4 text-sm text-muted-foreground">
            Average: 45 minutes/day | इस सप्ताह: 5 दिन active
          </div>
        </CardContent>
      </Card>

      {/* Motivation */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <CardContent className="p-6 text-center">
          <Award className="w-12 h-12 mx-auto mb-3 text-green-500"/>
          <h3 className="text-lg font-semibold mb-2">You're doing great! 🎉</h3>
          <p className="text-muted-foreground">
            आप बहुत अच्छा कर रहे हैं! Keep up the excellent work and you'll reach fluency soon!
          </p>
        </CardContent>
      </Card>
    </div>);
}
