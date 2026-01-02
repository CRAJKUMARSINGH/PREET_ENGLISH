import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Languages, 
  Mail, 
  Briefcase, 
  Award,
  Target,
  TrendingUp
} from 'lucide-react';

// Import Hindi Mastery components
import { TranslationPractice } from '@/components/HindiMastery/TranslationPractice';
import { ProfessionalWriting } from '@/components/HindiMastery/ProfessionalWriting';
import { InterviewPrep } from '@/components/HindiMastery/InterviewPrep';
import { CertificationSystem } from '@/components/HindiMastery/CertificationSystem';

export default function HindiMastery() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="hindi-mastery container mx-auto px-4 py-8">
      {/* Header */}
      <div className="header mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          🇮🇳 Hindi Mastery - Professional English
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Hindi speakers के लिए professional English mastery। Translation practice, 
          email writing, interview preparation, और certifications - सब कुछ एक जगह।
        </p>
        <Badge variant="secondary" className="mt-4 text-lg px-4 py-2">
          🎯 Career-Focused Learning
        </Badge>
      </div>

      {/* Feature Cards */}
      <div className="feature-cards grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('translation')}>
          <CardContent className="pt-6 text-center">
            <Languages className="w-12 h-12 mx-auto mb-3 text-blue-500" />
            <h3 className="font-semibold mb-2">Translation Practice</h3>
            <p className="text-sm text-muted-foreground">Hindi to English translation exercises</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('writing')}>
          <CardContent className="pt-6 text-center">
            <Mail className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <h3 className="font-semibold mb-2">Professional Writing</h3>
            <p className="text-sm text-muted-foreground">Email templates for Indian workplace</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('interview')}>
          <CardContent className="pt-6 text-center">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-purple-500" />
            <h3 className="font-semibold mb-2">Interview Prep</h3>
            <p className="text-sm text-muted-foreground">Common questions with Hindi tips</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setActiveTab('certification')}>
          <CardContent className="pt-6 text-center">
            <Award className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
            <h3 className="font-semibold mb-2">Certifications</h3>
            <p className="text-sm text-muted-foreground">Earn certificates and achievements</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="translation">Translation</TabsTrigger>
          <TabsTrigger value="writing">Writing</TabsTrigger>
          <TabsTrigger value="interview">Interview</TabsTrigger>
          <TabsTrigger value="certification">Certificates</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Hindi Mastery Program Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="intro">
                <p className="text-muted-foreground mb-4">
                  यह program specifically Hindi speakers के लिए design किया गया है जो 
                  professional English में mastery चाहते हैं। यहां आप सीखेंगे:
                </p>
              </div>

              <div className="features-grid grid md:grid-cols-2 gap-6">
                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Languages className="w-5 h-5 text-blue-500" />
                    Translation Practice
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Hindi to English translation exercises</li>
                    <li>• Common translation mistakes</li>
                    <li>• Context-aware translations</li>
                    <li>• Progressive difficulty levels</li>
                  </ul>
                </div>

                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-green-500" />
                    Professional Writing
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Email templates for Indian workplace</li>
                    <li>• Leave applications, meeting requests</li>
                    <li>• Job applications and follow-ups</li>
                    <li>• Hindi explanations for each template</li>
                  </ul>
                </div>

                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    Interview Preparation
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Common interview questions</li>
                    <li>• Sample answers with STAR method</li>
                    <li>• Hindi tips for each question</li>
                    <li>• Do's and Don'ts guidance</li>
                  </ul>
                </div>

                <div className="feature-item">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    Certification System
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 4 levels of certificates</li>
                    <li>• Achievement badges</li>
                    <li>• Progress tracking</li>
                    <li>• Shareable certificates</li>
                  </ul>
                </div>
              </div>

              <div className="cta bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  🚀 Ready to Start?
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  Choose any section above to begin your professional English journey. 
                  Track your progress and earn certificates as you learn!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Translation Tab */}
        <TabsContent value="translation">
          <TranslationPractice />
        </TabsContent>

        {/* Writing Tab */}
        <TabsContent value="writing">
          <ProfessionalWriting />
        </TabsContent>

        {/* Interview Tab */}
        <TabsContent value="interview">
          <InterviewPrep />
        </TabsContent>

        {/* Certification Tab */}
        <TabsContent value="certification">
          <CertificationSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
}