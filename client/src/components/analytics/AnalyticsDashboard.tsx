import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernBadge from '../ui/ModernBadge';
import ProgressRing from '../ui/ProgressRing';
import AnimatedCounter from '../ui/AnimatedCounter';

interface UserAnalytics {
  totalUsers: number;
  activeUsers: number;
  completionRate: number;
  averageSessionTime: number;
  popularLessons: LessonStats[];
  userActivity: ActivityData[];
  retentionRate: number;
  engagementScore: number;
}

interface LessonStats {
  id: string;
  title: string;
  completions: number;
  averageScore: number;
  difficulty: string;
}

interface ActivityData {
  date: string;
  users: number;
  lessons: number;
  quizzes: number;
}

interface AnalyticsDashboardProps {
  className?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className }) => {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock analytics data
      const mockData: UserAnalytics = {
        totalUsers: 1247,
        activeUsers: 892,
        completionRate: 78.5,
        averageSessionTime: 24.3,
        retentionRate: 65.2,
        engagementScore: 82.7,
        popularLessons: [
          {
            id: '1',
            title: 'Basic Greetings',
            completions: 456,
            averageScore: 87.3,
            difficulty: 'Beginner'
          },
          {
            id: '2',
            title: 'Business English',
            completions: 342,
            averageScore: 79.1,
            difficulty: 'Intermediate'
          },
          {
            id: '3',
            title: 'Pronunciation Practice',
            completions: 298,
            averageScore: 72.8,
            difficulty: 'Advanced'
          },
          {
            id: '4',
            title: 'Grammar Fundamentals',
            completions: 267,
            averageScore: 84.2,
            difficulty: 'Beginner'
          },
          {
            id: '5',
            title: 'Conversation Skills',
            completions: 234,
            averageScore: 76.5,
            difficulty: 'Intermediate'
          }
        ],
        userActivity: [
          { date: '2026-01-01', users: 145, lessons: 234, quizzes: 89 },
          { date: '2026-01-02', users: 167, lessons: 278, quizzes: 102 },
          { date: '2026-01-03', users: 189, lessons: 312, quizzes: 118 },
          { date: '2026-01-04', users: 203, lessons: 345, quizzes: 134 },
          { date: '2026-01-05', users: 178, lessons: 289, quizzes: 97 },
          { date: '2026-01-06', users: 156, lessons: 267, quizzes: 85 },
          { date: '2026-01-07', users: 134, lessons: 223, quizzes: 76 }
        ]
      };
      
      setAnalytics(mockData);
      setIsLoading(false);
    };
    
    loadAnalytics();
  }, [timeRange]);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'primary';
    }
  };
  
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };
  
  if (isLoading) {
    return (
      <ModernCard variant="glass" className={cn('p-6', className)}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
            <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse" />
            ))}
          </div>
          
          <div className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse" />
        </div>
      </ModernCard>
    );
  }
  
  if (!analytics) return null;
  
  return (
    <ModernCard variant="glass" className={cn('p-6 space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Analytics Dashboard
        </h2>
        
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                timeRange === range
                  ? 'bg-primary-500 text-white'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ModernCard variant="default" className="p-4 text-center">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Total Users
            </h3>
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              <AnimatedCounter value={analytics.totalUsers} />
            </div>
            <ModernBadge variant="success" size="sm">
              +12.5% from last month
            </ModernBadge>
          </div>
        </ModernCard>
        
        <ModernCard variant="default" className="p-4 text-center">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Active Users
            </h3>
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              <AnimatedCounter value={analytics.activeUsers} />
            </div>
            <ModernBadge variant="primary" size="sm">
              {Math.round((analytics.activeUsers / analytics.totalUsers) * 100)}% active
            </ModernBadge>
          </div>
        </ModernCard>
        
        <ModernCard variant="default" className="p-4 text-center">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Completion Rate
            </h3>
            <div className="flex items-center justify-center">
              <ProgressRing
                progress={analytics.completionRate}
                size="md"
                color="success"
                showPercentage
              />
            </div>
            <ModernBadge variant="success" size="sm">
              Above average
            </ModernBadge>
          </div>
        </ModernCard>
        
        <ModernCard variant="default" className="p-4 text-center">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Avg Session Time
            </h3>
            <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {formatDuration(analytics.averageSessionTime)}
            </div>
            <ModernBadge variant="warning" size="sm">
              +3.2 min increase
            </ModernBadge>
          </div>
        </ModernCard>
      </div>
      
      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernCard variant="default" className="p-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            User Engagement
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Retention Rate
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${analytics.retentionRate}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {analytics.retentionRate}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Engagement Score
              </span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                  <div
                    className="bg-success-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${analytics.engagementScore}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {analytics.engagementScore}%
                </span>
              </div>
            </div>
          </div>
        </ModernCard>
        
        <ModernCard variant="default" className="p-4">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
            Activity Trend
          </h3>
          
          <div className="h-32 flex items-end justify-between gap-1">
            {analytics.userActivity.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-primary-500 rounded-t transition-all duration-1000 hover:bg-primary-600"
                  style={{
                    height: `${(day.users / Math.max(...analytics.userActivity.map(d => d.users))) * 100}%`,
                    minHeight: '4px'
                  }}
                  title={`${day.users} users on ${day.date}`}
                />
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {new Date(day.date).getDate()}
                </span>
              </div>
            ))}
          </div>
        </ModernCard>
      </div>
      
      {/* Popular Lessons */}
      <ModernCard variant="default" className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Popular Lessons
        </h3>
        
        <div className="space-y-3">
          {analytics.popularLessons.map((lesson, index) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {lesson.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {lesson.completions} completions
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ModernBadge variant={getDifficultyColor(lesson.difficulty) as any} size="sm">
                  {lesson.difficulty}
                </ModernBadge>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {lesson.averageScore}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </ModernCard>
      
      {/* Insights */}
      <ModernCard variant="gradient" className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
          📊 Key Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-success-600 dark:text-success-400">✓</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                User engagement is 23% above industry average
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-success-600 dark:text-success-400">✓</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                Beginner lessons have highest completion rates
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-warning-600 dark:text-warning-400">⚠</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                Advanced lessons need more interactive elements
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-primary-600 dark:text-primary-400">💡</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                Peak usage time: 7-9 PM IST
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-600 dark:text-primary-400">💡</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                Mobile users: 68% of total traffic
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-600 dark:text-primary-400">💡</span>
              <span className="text-neutral-700 dark:text-neutral-300">
                Weekend activity 40% higher than weekdays
              </span>
            </div>
          </div>
        </div>
      </ModernCard>
    </ModernCard>
  );
};

export default AnalyticsDashboard;