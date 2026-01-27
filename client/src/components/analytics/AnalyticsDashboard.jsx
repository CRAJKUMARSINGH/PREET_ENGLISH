var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernBadge from '../ui/ModernBadge';
import ProgressRing from '../ui/ProgressRing';
import AnimatedCounter from '../ui/AnimatedCounter';
var AnalyticsDashboard = function (_a) {
    var className = _a.className;
    var _b = useState(null), analytics = _b[0], setAnalytics = _b[1];
    var _c = useState('30d'), timeRange = _c[0], setTimeRange = _c[1];
    var _d = useState(true), isLoading = _d[0], setIsLoading = _d[1];
    useEffect(function () {
        // Simulate loading analytics data
        var loadAnalytics = function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        // Simulate API call delay
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                    case 1:
                        // Simulate API call delay
                        _a.sent();
                        mockData = {
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
                        return [2 /*return*/];
                }
            });
        }); };
        loadAnalytics();
    }, [timeRange]);
    var getDifficultyColor = function (difficulty) {
        switch (difficulty.toLowerCase()) {
            case 'beginner': return 'success';
            case 'intermediate': return 'warning';
            case 'advanced': return 'error';
            default: return 'primary';
        }
    };
    var formatDuration = function (minutes) {
        var hours = Math.floor(minutes / 60);
        var mins = Math.floor(minutes % 60);
        return hours > 0 ? "".concat(hours, "h ").concat(mins, "m") : "".concat(mins, "m");
    };
    if (isLoading) {
        return (<ModernCard variant="glass" className={cn('p-6', className)}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"/>
            <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"/>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }, function (_, i) { return (<div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"/>); })}
          </div>
          
          <div className="h-64 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"/>
        </div>
      </ModernCard>);
    }
    if (!analytics)
        return null;
    return (<ModernCard variant="glass" className={cn('p-6 space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Analytics Dashboard
        </h2>
        
        <div className="flex items-center gap-2">
          {['7d', '30d', '90d'].map(function (range) { return (<button key={range} onClick={function () { return setTimeRange(range); }} className={cn('px-3 py-1 rounded-lg text-sm font-medium transition-colors', timeRange === range
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700')}>
              {range}
            </button>); })}
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
              <AnimatedCounter value={analytics.totalUsers}/>
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
              <AnimatedCounter value={analytics.activeUsers}/>
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
              <ProgressRing progress={analytics.completionRate} size="md" color="success" showPercentage/>
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
                  <div className="bg-primary-500 h-2 rounded-full transition-all duration-1000" style={{ width: "".concat(analytics.retentionRate, "%") }}/>
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
                  <div className="bg-success-500 h-2 rounded-full transition-all duration-1000" style={{ width: "".concat(analytics.engagementScore, "%") }}/>
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
            {analytics.userActivity.map(function (day, index) { return (<div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-primary-500 rounded-t transition-all duration-1000 hover:bg-primary-600" style={{
                height: "".concat((day.users / Math.max.apply(Math, analytics.userActivity.map(function (d) { return d.users; }))) * 100, "%"),
                minHeight: '4px'
            }} title={"".concat(day.users, " users on ").concat(day.date)}/>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {new Date(day.date).getDate()}
                </span>
              </div>); })}
          </div>
        </ModernCard>
      </div>
      
      {/* Popular Lessons */}
      <ModernCard variant="default" className="p-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
          Popular Lessons
        </h3>
        
        <div className="space-y-3">
          {analytics.popularLessons.map(function (lesson, index) { return (<div key={lesson.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg">
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
                <ModernBadge variant={getDifficultyColor(lesson.difficulty)} size="sm">
                  {lesson.difficulty}
                </ModernBadge>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {lesson.averageScore}%
                </span>
              </div>
            </div>); })}
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
    </ModernCard>);
};
export default AnalyticsDashboard;
