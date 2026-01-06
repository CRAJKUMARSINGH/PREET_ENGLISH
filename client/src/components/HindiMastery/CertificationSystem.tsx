import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Award,
  Star,
  CheckCircle,
  Lock,
  Download,
  Share2,
  Medal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Certificate {
  id: string;
  title: string;
  titleHindi: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  requirements: string[];
  progress: number;
  isUnlocked: boolean;
  earnedDate?: string;
}

interface Achievement {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  icon: string;
  isEarned: boolean;
  earnedDate?: string;
}

const certificates: Certificate[] = [
  {
    id: 'basic_english',
    title: 'Basic English Proficiency',
    titleHindi: 'बेसिक अंग्रेजी प्रवीणता',
    level: 'beginner',
    description: 'Foundation level English skills for Hindi speakers',
    requirements: [
      'Complete 50 basic lessons',
      'Score 70%+ in pronunciation tests',
      'Complete 10 translation exercises',
      'Practice 5 conversation scenarios'
    ],
    progress: 85,
    isUnlocked: false
  },
  {
    id: 'intermediate_english',
    title: 'Intermediate English Proficiency',
    titleHindi: 'मध्यम अंग्रेजी प्रवीणता',
    level: 'intermediate',
    description: 'Intermediate level English communication skills',
    requirements: [
      'Complete Basic English certificate',
      'Complete 100 intermediate lessons',
      'Score 80%+ in grammar tests',
      'Complete 20 translation exercises'
    ],
    progress: 45,
    isUnlocked: false
  },
  {
    id: 'business_english',
    title: 'Business English Certificate',
    titleHindi: 'व्यावसायिक अंग्रेजी प्रमाणपत्र',
    level: 'advanced',
    description: 'Professional English for Indian workplace',
    requirements: [
      'Complete Intermediate certificate',
      'Complete all email templates',
      'Score 85%+ in business vocabulary',
      'Complete 10 interview practice sessions'
    ],
    progress: 20,
    isUnlocked: false
  },
  {
    id: 'expert_english',
    title: 'Expert English Mastery',
    titleHindi: 'विशेषज्ञ अंग्रेजी महारत',
    level: 'expert',
    description: 'Advanced English fluency and communication mastery',
    requirements: [
      'Complete all previous certificates',
      'Score 90%+ in all assessments',
      'Complete 50 conversation simulations',
      'Maintain 30-day learning streak'
    ],
    progress: 5,
    isUnlocked: false
  }
];

const achievements: Achievement[] = [
  {
    id: 'first_lesson',
    title: 'First Step',
    titleHindi: 'पहला कदम',
    description: 'Complete your first lesson',
    icon: '🎯',
    isEarned: true,
    earnedDate: '2025-12-15'
  },
  {
    id: 'week_streak',
    title: 'Week Warrior',
    titleHindi: 'सप्ताह योद्धा',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    isEarned: true,
    earnedDate: '2025-12-22'
  },
  {
    id: 'pronunciation_pro',
    title: 'Pronunciation Pro',
    titleHindi: 'उच्चारण विशेषज्ञ',
    description: 'Score 90%+ in pronunciation test',
    icon: '🎤',
    isEarned: false
  },
  {
    id: 'grammar_guru',
    title: 'Grammar Guru',
    titleHindi: 'व्याकरण गुरु',
    description: 'Complete all grammar lessons',
    icon: '📚',
    isEarned: false
  },
  {
    id: 'conversation_king',
    title: 'Conversation King',
    titleHindi: 'बातचीत का राजा',
    description: 'Complete 25 conversation simulations',
    icon: '👑',
    isEarned: false
  },
  {
    id: 'translation_master',
    title: 'Translation Master',
    titleHindi: 'अनुवाद मास्टर',
    description: 'Complete 50 translation exercises with 85%+ accuracy',
    icon: '🌐',
    isEarned: false
  }
];

export function CertificationSystem() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'expert': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const earnedAchievements = achievements.filter(a => a.isEarned).length;
  const totalAchievements = achievements.length;

  return (
    <div className="certification-system space-y-6">
      {/* Header Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            Certifications & Achievements
            <Badge variant="secondary" className="ml-auto">Hindi Learners</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-600">
                {certificates.filter(c => c.isUnlocked).length}/{certificates.length}
              </div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {earnedAchievements}/{totalAchievements}
              </div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(certificates.reduce((acc, c) => acc + c.progress, 0) / certificates.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <Card
                key={cert.id}
                className={cn(
                  'cursor-pointer transition-all hover:shadow-md',
                  cert.isUnlocked ? 'border-yellow-500' : 'opacity-80'
                )}
                onClick={() => setSelectedCertificate(cert)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {cert.isUnlocked ? (
                          <Award className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <Lock className="w-5 h-5 text-gray-400" />
                        )}
                        <h3 className="font-semibold">{cert.title}</h3>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{cert.titleHindi}</p>
                    </div>
                    <Badge className={getLevelColor(cert.level)}>
                      {cert.level}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{cert.progress}%</span>
                    </div>
                    <Progress value={cert.progress} />
                  </div>

                  {cert.isUnlocked && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certificate Details Modal */}
      {selectedCertificate && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-yellow-500" />
                {selectedCertificate.title}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCertificate(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-blue-600 dark:text-blue-400 font-medium">
                {selectedCertificate.titleHindi}
              </div>

              <div>
                <h4 className="font-medium mb-2">Requirements:</h4>
                <ul className="space-y-2">
                  {selectedCertificate.requirements.map((req, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className={cn(
                        'w-4 h-4',
                        index < Math.floor(selectedCertificate.progress / 25)
                          ? 'text-green-500'
                          : 'text-gray-300'
                      )} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{selectedCertificate.progress}%</span>
                </div>
                <Progress value={selectedCertificate.progress} />
              </div>

              {selectedCertificate.progress < 100 && (
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg text-sm">
                  <strong className="text-blue-700 dark:text-blue-300">
                    💡 Tip:
                  </strong>
                  <span className="text-blue-600 dark:text-blue-400 ml-1">
                    Continue practicing to unlock this certificate!
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={cn(
                  'text-center p-4 rounded-lg border transition-all',
                  achievement.isEarned
                    ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
                    : 'bg-gray-50 dark:bg-gray-800 opacity-60'
                )}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="font-medium text-sm">{achievement.title}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">{achievement.titleHindi}</div>
                <div className="text-xs text-muted-foreground mt-1">{achievement.description}</div>
                {achievement.isEarned && achievement.earnedDate && (
                  <div className="text-xs text-green-600 mt-2">
                    ✓ Earned {achievement.earnedDate}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}