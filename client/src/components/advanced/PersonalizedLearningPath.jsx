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
import ModernButton from '../ui/ModernButton';
import ModernBadge from '../ui/ModernBadge';
import ProgressRing from '../ui/ProgressRing';
var PersonalizedLearningPath = function (_a) {
    var className = _a.className, onPathSelect = _a.onPathSelect;
    var _b = useState(null), userProfile = _b[0], setUserProfile = _b[1];
    var _c = useState([]), learningPaths = _c[0], setLearningPaths = _c[1];
    var _d = useState(null), selectedPath = _d[0], setSelectedPath = _d[1];
    var _e = useState(true), isLoading = _e[0], setIsLoading = _e[1];
    var _f = useState(false), showAssessment = _f[0], setShowAssessment = _f[1];
    useEffect(function () {
        loadUserProfile();
        generatePersonalizedPaths();
    }, []);
    var loadUserProfile = function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockProfile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Simulate loading user profile
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1000); })];
                case 1:
                    // Simulate loading user profile
                    _a.sent();
                    mockProfile = {
                        currentLevel: 15,
                        learningStyle: 'mixed',
                        weakAreas: ['pronunciation', 'articles', 'prepositions'],
                        strongAreas: ['vocabulary', 'reading'],
                        hindiProficiency: 'native',
                        goals: ['business_english', 'pronunciation', 'fluency'],
                        availableTime: 30
                    };
                    setUserProfile(mockProfile);
                    return [2 /*return*/];
            }
        });
    }); };
    var generatePersonalizedPaths = function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockPaths;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    // Simulate AI-powered path generation
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 1500); })];
                case 1:
                    // Simulate AI-powered path generation
                    _a.sent();
                    mockPaths = [
                        {
                            id: 'hindi-speaker-essentials',
                            title: 'Hindi Speaker Essentials',
                            titleHindi: 'हिंदी भाषी के लिए आवश्यक',
                            description: 'Specially designed for native Hindi speakers to master English fundamentals',
                            descriptionHindi: 'हिंदी भाषियों के लिए अंग्रेजी की बुनियादी बातें सीखने के लिए विशेष रूप से डिज़ाइन किया गया',
                            difficulty: 'intermediate',
                            estimatedTime: 25,
                            progress: 35,
                            isRecommended: true,
                            hindiSpecific: true,
                            lessons: [
                                {
                                    id: '1',
                                    title: 'Articles (a, an, the)',
                                    titleHindi: 'आर्टिकल्स (a, an, the)',
                                    type: 'lesson',
                                    duration: 45,
                                    completed: true,
                                    locked: false,
                                    xpReward: 100,
                                    hindiChallenges: ['Hindi has no articles', 'When to use which article']
                                },
                                {
                                    id: '2',
                                    title: 'Pronunciation: TH Sounds',
                                    titleHindi: 'उच्चारण: TH की आवाज़ें',
                                    type: 'practice',
                                    duration: 30,
                                    completed: true,
                                    locked: false,
                                    xpReward: 80,
                                    hindiChallenges: ['Think vs This', 'Tongue position']
                                },
                                {
                                    id: '3',
                                    title: 'Prepositions Mastery',
                                    titleHindi: 'प्रीपोज़िशन्स की महारत',
                                    type: 'lesson',
                                    duration: 50,
                                    completed: false,
                                    locked: false,
                                    xpReward: 120,
                                    hindiChallenges: ['In/On/At confusion', 'Time vs Place prepositions']
                                },
                                {
                                    id: '4',
                                    title: 'Business Email Writing',
                                    titleHindi: 'व्यावसायिक ईमेल लेखन',
                                    type: 'practice',
                                    duration: 40,
                                    completed: false,
                                    locked: true,
                                    xpReward: 150
                                }
                            ]
                        },
                        {
                            id: 'pronunciation-mastery',
                            title: 'Pronunciation Mastery',
                            titleHindi: 'उच्चारण में महारत',
                            description: 'Master English pronunciation with focus on Hindi speaker challenges',
                            descriptionHindi: 'हिंदी भाषियों की चुनौतियों पर ध्यान देते हुए अंग्रेजी उच्चारण में महारत हासिल करें',
                            difficulty: 'advanced',
                            estimatedTime: 18,
                            progress: 0,
                            isRecommended: true,
                            hindiSpecific: true,
                            lessons: [
                                {
                                    id: '1',
                                    title: 'V vs W Sounds',
                                    titleHindi: 'V और W की आवाज़ें',
                                    type: 'practice',
                                    duration: 35,
                                    completed: false,
                                    locked: false,
                                    xpReward: 90,
                                    hindiChallenges: ['Very vs Water', 'Lip position']
                                },
                                {
                                    id: '2',
                                    title: 'Silent Letters',
                                    titleHindi: 'मूक अक्षर',
                                    type: 'lesson',
                                    duration: 25,
                                    completed: false,
                                    locked: false,
                                    xpReward: 70
                                }
                            ]
                        },
                        {
                            id: 'business-communication',
                            title: 'Business Communication',
                            titleHindi: 'व्यावसायिक संवाद',
                            description: 'Professional English for Indian workplace',
                            descriptionHindi: 'भारतीय कार्यक्षेत्र के लिए व्यावसायिक अंग्रेजी',
                            difficulty: 'intermediate',
                            estimatedTime: 30,
                            progress: 15,
                            isRecommended: false,
                            hindiSpecific: true,
                            lessons: [
                                {
                                    id: '1',
                                    title: 'Meeting Etiquette',
                                    titleHindi: 'मीटिंग शिष्टाचार',
                                    type: 'lesson',
                                    duration: 45,
                                    completed: false,
                                    locked: false,
                                    xpReward: 110
                                }
                            ]
                        }
                    ];
                    setLearningPaths(mockPaths);
                    setIsLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'beginner': return 'success';
            case 'intermediate': return 'warning';
            case 'advanced': return 'error';
            default: return 'primary';
        }
    };
    var getLessonTypeIcon = function (type) {
        switch (type) {
            case 'lesson': return '📚';
            case 'quiz': return '❓';
            case 'practice': return '🎯';
            case 'assessment': return '📊';
            default: return '📖';
        }
    };
    var formatTime = function (minutes) {
        var hours = Math.floor(minutes / 60);
        var mins = minutes % 60;
        return hours > 0 ? "".concat(hours, "h ").concat(mins, "m") : "".concat(mins, "m");
    };
    var handlePathSelect = function (path) {
        setSelectedPath(path);
        onPathSelect === null || onPathSelect === void 0 ? void 0 : onPathSelect(path);
    };
    var startAssessment = function () {
        setShowAssessment(true);
    };
    if (isLoading) {
        return (<ModernCard variant="glass" className={cn('p-6', className)}>
        <div className="space-y-6">
          <div className="h-8 w-64 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"/>
          <div className="space-y-4">
            {Array.from({ length: 3 }, function (_, i) { return (<div key={i} className="h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"/>); })}
          </div>
        </div>
      </ModernCard>);
    }
    if (showAssessment) {
        return (<ModernCard variant="glass" className={cn('p-6', className)}>
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-3xl mx-auto">
            🎯
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Learning Style Assessment
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Take a quick assessment to get personalized learning recommendations
            </p>
          </div>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="p-4 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800">
              <h4 className="font-semibold text-primary-700 dark:text-primary-300 mb-2">
                What you'll discover:
              </h4>
              <ul className="text-sm text-primary-600 dark:text-primary-400 space-y-1">
                <li>• Your learning style (visual, auditory, kinesthetic)</li>
                <li>• Areas that need focus based on Hindi background</li>
                <li>• Optimal study schedule for your lifestyle</li>
                <li>• Personalized lesson recommendations</li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <ModernButton variant="outline" onClick={function () { return setShowAssessment(false); }} className="flex-1">
                Skip for Now
              </ModernButton>
              <ModernButton variant="primary" onClick={function () {
                setShowAssessment(false);
                // In real app, would start assessment
            }} className="flex-1">
                Start Assessment
              </ModernButton>
            </div>
          </div>
        </div>
      </ModernCard>);
    }
    return (<ModernCard variant="glass" className={cn('p-6 space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Personalized Learning Paths
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            AI-powered recommendations for Hindi speakers
          </p>
        </div>
        
        <ModernButton variant="outline" size="sm" onClick={startAssessment} icon="🎯">
          Retake Assessment
        </ModernButton>
      </div>
      
      {/* User Profile Summary */}
      {userProfile && (<ModernCard variant="default" className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                Level {userProfile.currentLevel}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Current Level
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 capitalize">
                {userProfile.learningStyle}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Learning Style
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {formatTime(userProfile.availableTime)}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Daily Time
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {userProfile.weakAreas.length}
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Focus Areas
              </div>
            </div>
          </div>
        </ModernCard>)}
      
      {/* Learning Paths */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Recommended Paths
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {learningPaths.map(function (path) {
            var _a;
            return (<ModernCard key={path.id} variant={path.isRecommended ? 'gradient' : 'default'} className={cn('p-4 cursor-pointer transition-all duration-200', (selectedPath === null || selectedPath === void 0 ? void 0 : selectedPath.id) === path.id && 'ring-2 ring-primary-500', 'hover:scale-[1.02]')} onClick={function () { return handlePathSelect(path); }}>
              <div className="space-y-4">
                {/* Path Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {path.title}
                      </h4>
                      {path.isRecommended && (<ModernBadge variant="success" size="sm">
                          Recommended
                        </ModernBadge>)}
                      {path.hindiSpecific && (<ModernBadge variant="cultural" size="sm">
                          🇮🇳 Hindi Focus
                        </ModernBadge>)}
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                      {path.titleHindi}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      {path.description}
                    </p>
                  </div>
                  
                  <div className="ml-4">
                    <ProgressRing progress={path.progress} size="sm" color="primary" showPercentage/>
                  </div>
                </div>
                
                {/* Path Details */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <ModernBadge variant={getDifficultyColor(path.difficulty)} size="sm">
                      {path.difficulty}
                    </ModernBadge>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      ⏱️ {path.estimatedTime}h
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      📚 {path.lessons.length} lessons
                    </span>
                  </div>
                </div>
                
                {/* Lesson Preview */}
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Next Lessons:
                  </h5>
                  <div className="space-y-1">
                    {path.lessons.slice(0, 2).map(function (lesson) { return (<div key={lesson.id} className="flex items-center gap-2 text-sm">
                        <span>{getLessonTypeIcon(lesson.type)}</span>
                        <span className={cn(lesson.completed
                        ? 'text-success-600 dark:text-success-400 line-through'
                        : lesson.locked
                            ? 'text-neutral-400 dark:text-neutral-600'
                            : 'text-neutral-700 dark:text-neutral-300')}>
                          {lesson.title}
                        </span>
                        {lesson.locked && <span className="text-neutral-400">🔒</span>}
                        {lesson.completed && <span className="text-success-500">✓</span>}
                      </div>); })}
                  </div>
                </div>
                
                {/* Hindi-specific challenges */}
                {path.hindiSpecific && ((_a = path.lessons[0]) === null || _a === void 0 ? void 0 : _a.hindiChallenges) && (<div className="p-3 bg-warning-50 dark:bg-warning-950 rounded-lg border border-warning-200 dark:border-warning-800">
                    <h6 className="text-sm font-medium text-warning-700 dark:text-warning-300 mb-1">
                      🎯 Hindi Speaker Challenges:
                    </h6>
                    <div className="flex flex-wrap gap-1">
                      {path.lessons[0].hindiChallenges.slice(0, 2).map(function (challenge, index) { return (<span key={index} className="text-xs bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 px-2 py-1 rounded">
                          {challenge}
                        </span>); })}
                    </div>
                  </div>)}
              </div>
            </ModernCard>);
        })}
        </div>
      </div>
      
      {/* Selected Path Details */}
      {selectedPath && (<ModernCard variant="default" className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {selectedPath.title} - Detailed Plan
            </h4>
            <ModernButton variant="primary" size="sm">
              Start Learning
            </ModernButton>
          </div>
          
          <div className="space-y-3">
            {selectedPath.lessons.map(function (lesson, index) { return (<div key={lesson.id} className={cn('flex items-center gap-4 p-3 rounded-lg', lesson.completed
                    ? 'bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800'
                    : lesson.locked
                        ? 'bg-neutral-50 dark:bg-neutral-800/50 opacity-60'
                        : 'bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800')}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getLessonTypeIcon(lesson.type)}</span>
                  <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {lesson.title}
                  </h5>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {lesson.titleHindi} • {formatTime(lesson.duration)} • {lesson.xpReward} XP
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  {lesson.completed && (<ModernBadge variant="success" size="sm">
                      ✓ Complete
                    </ModernBadge>)}
                  {lesson.locked && (<ModernBadge variant="secondary" size="sm">
                      🔒 Locked
                    </ModernBadge>)}
                  {!lesson.completed && !lesson.locked && (<ModernButton variant="outline" size="sm">
                      Start
                    </ModernButton>)}
                </div>
              </div>); })}
          </div>
        </ModernCard>)}
    </ModernCard>);
};
export default PersonalizedLearningPath;
