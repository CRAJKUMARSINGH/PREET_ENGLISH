import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Users, Briefcase, Heart, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CulturalContextCardProps {
  englishPhrase: string;
  hindiEquivalent: string;
  culturalContext: string;
  formalUsage: string;
  informalUsage: string;
  businessContext?: string;
  socialContext?: string;
  dosDonts: {
    dos: string[];
    donts: string[];
  };
  indianEnglishVariation?: string;
  className?: string;
}

export function CulturalContextCard({
  englishPhrase,
  hindiEquivalent,
  culturalContext,
  formalUsage,
  informalUsage,
  businessContext,
  socialContext,
  dosDonts,
  indianEnglishVariation,
  className
}: CulturalContextCardProps) {
  const [activeTab, setActiveTab] = useState('context');

  return (
    <Card className={cn('cultural-context-card', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-500" />
          Cultural Context Guide
        </CardTitle>
        <div className="phrase-header">
          <h3 className="text-lg font-semibold mb-1">{englishPhrase}</h3>
          <p className="text-blue-600 dark:text-blue-400">
            Hindi में: {hindiEquivalent}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="context">संदर्भ</TabsTrigger>
            <TabsTrigger value="usage">उपयोग</TabsTrigger>
            <TabsTrigger value="business">व्यापार</TabsTrigger>
            <TabsTrigger value="social">सामाजिक</TabsTrigger>
          </TabsList>

          <TabsContent value="context" className="space-y-4">
            <div className="cultural-explanation">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-red-500" />
                सांस्कृतिक संदर्भ:
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {culturalContext}
              </p>
            </div>

            {indianEnglishVariation && (
              <div className="indian-english bg-orange-50 dark:bg-orange-950/20 p-3 rounded-lg">
                <h4 className="font-medium text-orange-700 dark:text-orange-300 mb-2">
                  🇮🇳 Indian English में:
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {indianEnglishVariation}
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="usage-comparison grid gap-4">
              <div className="formal-usage">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                  औपचारिक उपयोग:
                </h4>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {formalUsage}
                  </p>
                </div>
              </div>

              <div className="informal-usage">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-green-500" />
                  अनौपचारिक उपयोग:
                </h4>
                <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {informalUsage}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            {businessContext ? (
              <div className="business-context">
                <h4 className="font-medium mb-2">💼 व्यापारिक संदर्भ:</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {businessContext}
                </p>
              </div>
            ) : (
              <div className="no-business-context text-center py-8 text-muted-foreground">
                <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>इस वाक्य का विशेष व्यापारिक संदर्भ नहीं है।</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            {socialContext ? (
              <div className="social-context">
                <h4 className="font-medium mb-2">👥 सामाजिक संदर्भ:</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {socialContext}
                </p>
              </div>
            ) : (
              <div className="no-social-context text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>इस वाक्य का विशेष सामाजिक संदर्भ नहीं है।</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Do's and Don'ts */}
        <div className="dos-donts mt-6 grid md:grid-cols-2 gap-4">
          <div className="dos">
            <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">
              ✅ करें:
            </h4>
            <ul className="space-y-1">
              {dosDonts.dos.map((item, index) => (
                <li key={index} className="text-sm text-green-600 dark:text-green-400 flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="donts">
            <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">
              ❌ न करें:
            </h4>
            <ul className="space-y-1">
              {dosDonts.donts.map((item, index) => (
                <li key={index} className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Quick Cultural Tips Component
export function QuickCulturalTips() {
  const culturalTips = [
    {
      category: 'Greetings',
      hindi: 'अभिवादन',
      tip: 'अंग्रेजी में "How are you?" का जवाब हमेशा "I\'m fine" नहीं होता। "Good", "Great", "Not bad" भी कह सकते हैं।'
    },
    {
      category: 'Politeness',
      hindi: 'शिष्टाचार',
      tip: '"Please" और "Thank you" का अधिक उपयोग करें। भारतीय संस्कृति में यह कम प्रचलित है पर अंग्रेजी में जरूरी है।'
    },
    {
      category: 'Small Talk',
      hindi: 'छोटी बातचीत',
      tip: 'मौसम, काम, शौक के बारे में बात करें। व्यक्तिगत सवाल (उम्र, वेतन, शादी) से बचें।'
    },
    {
      category: 'Business',
      hindi: 'व्यापार',
      tip: 'ईमेल में "Dear Sir/Madam" से शुरू करें और "Best regards" से समाप्त करें।'
    }
  ];

  return (
    <Card className="quick-cultural-tips">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-500" />
          Quick Cultural Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {culturalTips.map((tip, index) => (
            <div key={index} className="tip-item p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{tip.category}</Badge>
                <span className="text-sm text-muted-foreground">{tip.hindi}</span>
              </div>
              <p className="text-sm text-muted-foreground">{tip.tip}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Indian English vs Standard English Component
export function IndianEnglishGuide() {
  const variations = [
    {
      indian: 'What is your good name?',
      standard: 'What is your name?',
      explanation: 'भारत में "good name" कहना सम्मान दिखाने के लिए है, पर अंग्रेजी में सिर्फ "name" कहते हैं।'
    },
    {
      indian: 'I am having a car.',
      standard: 'I have a car.',
      explanation: 'स्थायी चीजों के लिए continuous tense का उपयोग नहीं करते।'
    },
    {
      indian: 'Please do the needful.',
      standard: 'Please take the necessary action.',
      explanation: '"Do the needful" भारतीय अंग्रेजी में प्रचलित है पर मानक अंग्रेजी में स्पष्ट रूप से कहना बेहतर है।'
    },
    {
      indian: 'I am going to temple.',
      standard: 'I am going to the temple.',
      explanation: 'स्थानों के साथ articles (a, an, the) का सही उपयोग जरूरी है।'
    }
  ];

  return (
    <Card className="indian-english-guide">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🇮🇳 Indian English vs Standard English
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {variations.map((variation, index) => (
            <div key={index} className="variation-item border rounded-lg p-4">
              <div className="grid gap-2 mb-3">
                <div className="indian-version">
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                    🇮🇳 Indian English:
                  </span>
                  <p className="text-orange-600 dark:text-orange-400">{variation.indian}</p>
                </div>
                <div className="standard-version">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    🌍 Standard English:
                  </span>
                  <p className="text-green-600 dark:text-green-400">{variation.standard}</p>
                </div>
              </div>
              <div className="explanation bg-blue-50 dark:bg-blue-950/20 p-2 rounded text-sm text-blue-600 dark:text-blue-400">
                <strong>समझाइए:</strong> {variation.explanation}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}