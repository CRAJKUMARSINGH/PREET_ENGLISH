import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, TrendingUp, Users, BookOpen, Award, Clock } from 'lucide-react';
import { analytics } from '@/lib/analytics';
export function AnalyticsDashboard() {
    var _a = useState({
        totalEvents: 0,
        lessonsCompleted: 0,
        quizzesTaken: 0,
        speakingPractices: 0,
        audioPlays: 0,
        searches: 0,
    }), summary = _a[0], setSummary = _a[1];
    useEffect(function () {
        var data = analytics.getSummary();
        setSummary(data);
    }, []);
    var stats = [
        {
            title: 'Lessons Completed',
            value: summary.lessonsCompleted,
            icon: BookOpen,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            title: 'Quizzes Taken',
            value: summary.quizzesTaken,
            icon: Award,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
        },
        {
            title: 'Speaking Practice',
            value: summary.speakingPractices,
            icon: Users,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        },
        {
            title: 'Audio Plays',
            value: summary.audioPlays,
            icon: Clock,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900/30',
        },
        {
            title: 'Searches',
            value: summary.searches,
            icon: TrendingUp,
            color: 'text-pink-600',
            bgColor: 'bg-pink-100 dark:bg-pink-900/30',
        },
        {
            title: 'Total Activities',
            value: summary.totalEvents,
            icon: BarChart,
            color: 'text-indigo-600',
            bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
        },
    ];
    return (<div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Learning Analytics</h2>
        <p className="text-muted-foreground">Track your progress and achievements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(function (stat) { return (<Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={"p-2 rounded-lg ".concat(stat.bgColor)}>
                <stat.icon className={"h-4 w-4 ".concat(stat.color)}/>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Keep up the great work! 🎉
              </p>
            </CardContent>
          </Card>); })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <p className="font-medium">Most Active Feature</p>
              <p className="text-sm text-muted-foreground">
                {summary.audioPlays > summary.lessonsCompleted
            ? 'Audio Pronunciation 🔊'
            : 'Lesson Learning 📚'}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600"/>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div>
              <p className="font-medium">Completion Rate</p>
              <p className="text-sm text-muted-foreground">
                {summary.lessonsCompleted > 0
            ? "".concat(Math.round((summary.quizzesTaken / summary.lessonsCompleted) * 100), "% quiz completion")
            : 'Start learning to see stats'}
              </p>
            </div>
            <Award className="h-8 w-8 text-green-600"/>
          </div>

          <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div>
              <p className="font-medium">Learning Streak</p>
              <p className="text-sm text-muted-foreground">
                Keep practicing daily to build your streak! 🔥
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600"/>
          </div>
        </CardContent>
      </Card>
    </div>);
}
