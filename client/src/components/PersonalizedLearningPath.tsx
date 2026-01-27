import { useState, useEffect } from 'react';
import { Target, TrendingUp, Award, BookOpen, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export function PersonalizedLearningPath() {
  const [goals, setGoals] = useState<LearningGoal[]>([
    {
      id: '1',
      title: 'Master Basic Greetings',
      description: 'Learn essential greetings and introductions',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      estimatedTime: '2 hours',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Business English Fundamentals',
      description: 'Professional communication skills',
      progress: 40,
      totalLessons: 30,
      completedLessons: 12,
      estimatedTime: '5 hours',
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: 'Advanced Grammar Mastery',
      description: 'Complex sentence structures and tenses',
      progress: 10,
      totalLessons: 50,
      completedLessons: 5,
      estimatedTime: '10 hours',
      difficulty: 'advanced'
    }
  ]);

  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [weeklyGoal, setWeeklyGoal] = useState(5); // lessons per week
  const [completedThisWeek, setCompletedThisWeek] = useState(3);

  useEffect(() => {
    const stored = localStorage.getItem('learning_path');
    if (stored) {
      const data = JSON.parse(stored);
      setGoals(data.goals || goals);
      setUserLevel(data.level || 'beginner');
      setWeeklyGoal(data.weeklyGoal || 5);
      setCompletedThisWeek(data.completedThisWeek || 0);
    }
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'शुरुआती (Beginner)';
      case 'intermediate': return 'मध्यम (Intermediate)';
      case 'advanced': return 'उन्नत (Advanced)';
      default: return difficulty;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          आपका सीखने का रास्ता
        </h2>
        <p className="text-lg text-muted-foreground">
          Your Personalized Learning Path
        </p>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            साप्ताहिक लक्ष्य (Weekly Goal)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{completedThisWeek} / {weeklyGoal}</span>
            <span className="text-sm text-muted-foreground">lessons completed</span>
          </div>
          <Progress value={(completedThisWeek / weeklyGoal) * 100} className="h-3" />
          <p className="text-sm text-muted-foreground">
            {weeklyGoal - completedThisWeek > 0 
              ? `${weeklyGoal - completedThisWeek} more lessons to reach your weekly goal!`
              : '🎉 Weekly goal achieved! Keep going!'}
          </p>
        </CardContent>
      </Card>

      {/* Current Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" />
            आपका स्तर (Your Level)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${getDifficultyColor(userLevel)} flex items-center justify-center text-white text-2xl font-bold`}>
              {userLevel === 'beginner' ? 'B' : userLevel === 'intermediate' ? 'I' : 'A'}
            </div>
            <div>
              <p className="text-xl font-bold">{getDifficultyLabel(userLevel)}</p>
              <p className="text-sm text-muted-foreground">
                {userLevel === 'beginner' && 'Building foundation'}
                {userLevel === 'intermediate' && 'Expanding skills'}
                {userLevel === 'advanced' && 'Mastering English'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          सीखने के लक्ष्य (Learning Goals)
        </h3>
        
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-1">{goal.title}</h4>
                    <p className="text-sm text-muted-foreground">{goal.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(goal.difficulty)}`}>
                    {getDifficultyLabel(goal.difficulty)}
                  </span>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {goal.completedLessons} / {goal.totalLessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {goal.estimatedTime} remaining
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-right">
                    {goal.progress}% complete
                  </p>
                </div>

                {/* Action */}
                <Button className="w-full" variant={goal.progress > 0 ? 'default' : 'outline'}>
                  {goal.progress === 100 ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed!
                    </>
                  ) : goal.progress > 0 ? (
                    'Continue Learning'
                  ) : (
                    'Start Learning'
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle>💡 सिफारिशें (Recommendations)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">Based on your progress, we recommend:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✅ Complete "Master Basic Greetings" this week</li>
            <li>✅ Practice pronunciation daily for 10 minutes</li>
            <li>✅ Join a study group in the community</li>
            <li>✅ Take quizzes to reinforce learning</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
