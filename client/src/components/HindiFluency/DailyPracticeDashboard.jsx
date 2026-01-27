var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, Target, Flame, Award, Clock, CheckCircle, Play, Star, TrendingUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
var dailyGoals = [
    {
        id: 'lessons',
        title: 'Complete Lessons',
        titleHindi: 'पाठ पूरे करें',
        target: 3,
        completed: 2,
        type: 'lessons',
        xpReward: 50
    },
    {
        id: 'vocabulary',
        title: 'Learn New Words',
        titleHindi: 'नए शब्द सीखें',
        target: 10,
        completed: 7,
        type: 'vocabulary',
        xpReward: 30
    },
    {
        id: 'speaking',
        title: 'Speaking Practice',
        titleHindi: 'बोलने का अभ्यास',
        target: 5,
        completed: 3,
        type: 'speaking',
        xpReward: 40
    },
    {
        id: 'translation',
        title: 'Translation Exercises',
        titleHindi: 'अनुवाद अभ्यास',
        target: 5,
        completed: 5,
        type: 'translation',
        xpReward: 35
    }
];
var quickPracticeOptions = [
    {
        id: 'pronunciation',
        title: '5-Min Pronunciation',
        titleHindi: '5 मिनट उच्चारण',
        duration: 5,
        icon: '🎤',
        color: 'bg-purple-500'
    },
    {
        id: 'vocabulary',
        title: 'Quick Vocabulary',
        titleHindi: 'त्वरित शब्दावली',
        duration: 3,
        icon: '📚',
        color: 'bg-blue-500'
    },
    {
        id: 'grammar',
        title: 'Grammar Drill',
        titleHindi: 'व्याकरण अभ्यास',
        duration: 5,
        icon: '✏️',
        color: 'bg-green-500'
    },
    {
        id: 'listening',
        title: 'Listening Practice',
        titleHindi: 'सुनने का अभ्यास',
        duration: 5,
        icon: '👂',
        color: 'bg-orange-500'
    }
];
export function DailyPracticeDashboard() {
    var _a = useState({
        currentStreak: 7,
        longestStreak: 14,
        totalDays: 45,
        lastPracticeDate: new Date().toISOString().split('T')[0]
    }), streak = _a[0], setStreak = _a[1];
    var _b = useState(dailyGoals), goals = _b[0], setGoals = _b[1];
    var _c = useState(1250), totalXP = _c[0], setTotalXP = _c[1];
    var _d = useState(5), level = _d[0], setLevel = _d[1];
    var completedGoals = goals.filter(function (g) { return g.completed >= g.target; }).length;
    var totalGoals = goals.length;
    var overallProgress = Math.round((goals.reduce(function (acc, g) { return acc + Math.min(g.completed / g.target, 1); }, 0) / totalGoals) * 100);
    var getGoalIcon = function (type) {
        switch (type) {
            case 'lessons': return '📖';
            case 'vocabulary': return '📚';
            case 'speaking': return '🗣️';
            case 'translation': return '🌐';
            default: return '📝';
        }
    };
    var incrementGoal = function (goalId) {
        setGoals(function (prev) { return prev.map(function (g) {
            if (g.id === goalId && g.completed < g.target) {
                var newCompleted = g.completed + 1;
                if (newCompleted === g.target) {
                    setTotalXP(function (prev) { return prev + g.xpReward; });
                }
                return __assign(__assign({}, g), { completed: newCompleted });
            }
            return g;
        }); });
    };
    return (<div className="daily-practice-dashboard space-y-6">
      {/* Header with Streak */}
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Daily Practice</h2>
              <p className="opacity-90">आज का अभ्यास - Keep your streak alive!</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 text-4xl font-bold">
                <Flame className="w-10 h-10"/>
                {streak.currentStreak}
              </div>
              <div className="text-sm opacity-90">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500"/>
            <div className="text-2xl font-bold">{streak.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-yellow-500"/>
            <div className="text-2xl font-bold">{streak.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Best Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-500"/>
            <div className="text-2xl font-bold">{totalXP}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500"/>
            <div className="text-2xl font-bold">Level {level}</div>
            <div className="text-sm text-muted-foreground">Current Level</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5"/>
              Today's Goals
              <span className="text-sm font-normal text-muted-foreground">
                (आज के लक्ष्य)
              </span>
            </CardTitle>
            <Badge variant={completedGoals === totalGoals ? "default" : "secondary"}>
              {completedGoals}/{totalGoals} Complete
            </Badge>
          </div>
          <Progress value={overallProgress} className="mt-2"/>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.map(function (goal) { return (<div key={goal.id} className={cn("flex items-center justify-between p-4 rounded-lg border", goal.completed >= goal.target
                ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                : "bg-gray-50 dark:bg-gray-800")}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getGoalIcon(goal.type)}</span>
                  <div>
                    <div className="font-medium">{goal.title}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">{goal.titleHindi}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold">{goal.completed}/{goal.target}</div>
                    <div className="text-xs text-muted-foreground">+{goal.xpReward} XP</div>
                  </div>

                  {goal.completed >= goal.target ? (<CheckCircle className="w-6 h-6 text-green-500"/>) : (<Button size="sm" onClick={function () { return incrementGoal(goal.id); }}>
                      <Play className="w-4 h-4"/>
                    </Button>)}
                </div>
              </div>); })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Practice */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500"/>
            Quick Practice
            <span className="text-sm font-normal text-muted-foreground">
              (त्वरित अभ्यास)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickPracticeOptions.map(function (option) { return (<Button key={option.id} variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <span className="text-3xl">{option.icon}</span>
                <div className="text-center">
                  <div className="font-medium text-sm">{option.title}</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">{option.titleHindi}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    <Clock className="w-3 h-3 inline mr-1"/>
                    {option.duration} min
                  </div>
                </div>
              </Button>); })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5"/>
            This Week
            <span className="text-sm font-normal text-muted-foreground">
              (इस सप्ताह)
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(function (day, index) {
            var isCompleted = index < 5; // Simulated: first 5 days completed
            var isToday = index === 4; // Friday is today
            return (<div key={day} className={cn("flex flex-col items-center p-2 rounded-lg", isToday && "bg-blue-100 dark:bg-blue-900/20")}>
                  <span className="text-xs text-muted-foreground">{day}</span>
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center mt-1", isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700")}>
                    {isCompleted ? (<CheckCircle className="w-4 h-4"/>) : (<span className="text-xs">{index + 1}</span>)}
                  </div>
                </div>);
        })}
          </div>
        </CardContent>
      </Card>
    </div>);
}
