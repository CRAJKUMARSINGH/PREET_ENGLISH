import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Mic, 
  Globe, 
  Users, 
  Briefcase, 
  ShoppingCart,
  MessageCircle,
  GraduationCap,
  Target,
  TrendingUp
} from 'lucide-react';

// Import Hindi-specific components
import { HindiExplanation, CommonMistakeCard, PronunciationGuide } from '@/components/HindiComponents/HindiText';
import { HindiLearningCard, GrammarExplanationCard } from '@/components/HindiComponents/HindiLearningCard';
import { PronunciationCoach, QuickPronunciationTips } from '@/components/HindiComponents/PronunciationCoach';
import { CulturalContextCard, QuickCulturalTips, IndianEnglishGuide } from '@/components/HindiComponents/CulturalContextCard';

// Import Hindi learning data
import { 
  hindiLearningData,
  pronunciationChallenges,
  commonGrammarMistakes,
  culturalContextData,
  dailyEnglishPhrases 
} from '@/data/hindiLearningData';

export default function HindiLearning() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPronunciationChallenge, setSelectedPronunciationChallenge] = useState('th_sounds');

  return (
    <div className="hindi-learning-page container mx-auto px-4 py-8">
      {/* Header */}
      <div className="header mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-primary">
          🇮🇳 Hindi Speakers के लिए English Learning
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          हिंदी भाषी लोगों के लिए विशेष रूप से डिज़ाइन किया गया English learning platform। 
          आपकी आम समस्याओं का समाधान और व्यावहारिक अंग्रेजी सीखें।
        </p>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="pronunciation" className="flex items-center gap-1">
            <Mic className="w-4 h-4" />
            उच्चारण
          </TabsTrigger>
          <TabsTrigger value="grammar" className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            व्याकरण
          </TabsTrigger>
          <TabsTrigger value="culture" className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            संस्कृति
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            व्यापार
          </TabsTrigger>
          <TabsTrigger value="daily" className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            दैनिक
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="overview-section">
            <h2 className="text-2xl font-semibold mb-4">
              Hindi Speakers की मुख्य चुनौतियां
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card className="challenge-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-5 h-5 text-red-500" />
                    उच्चारण की समस्याएं
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• TH sounds (think/this)</li>
                    <li>• V vs W confusion</li>
                    <li>• English R sound</li>
                    <li>• Silent letters</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="challenge-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    व्याकरण की कठिनाइयां
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Articles (a, an, the)</li>
                    <li>• Prepositions (in, on, at)</li>
                    <li>• Tenses का गलत उपयोग</li>
                    <li>• Word order</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="challenge-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-500" />
                    सांस्कृतिक अंतर
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Formal vs Informal</li>
                    <li>• Small talk culture</li>
                    <li>• Direct communication</li>
                    <li>• Business etiquette</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="stats-section grid md:grid-cols-4 gap-4 mb-8">
              <Card className="stat-card text-center">
                <CardContent className="pt-6">
                  <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-2xl font-bold">1625+</div>
                  <div className="text-sm text-muted-foreground">Hindi-focused lessons</div>
                </CardContent>
              </Card>
              
              <Card className="stat-card text-center">
                <CardContent className="pt-6">
                  <Mic className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-muted-foreground">Pronunciation guides</div>
                </CardContent>
              </Card>
              
              <Card className="stat-card text-center">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-muted-foreground">Cultural contexts</div>
                </CardContent>
              </Card>
              
              <Card className="stat-card text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-muted-foreground">Success rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Tips */}
            <QuickCulturalTips />
          </div>
        </TabsContent>

        {/* Pronunciation Tab */}
        <TabsContent value="pronunciation" className="space-y-6">
          <div className="pronunciation-section">
            <h2 className="text-2xl font-semibold mb-4">
              उच्चारण सुधार - Hindi Speakers के लिए
            </h2>

            {/* Pronunciation Challenge Selector */}
            <div className="challenge-selector mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(pronunciationChallenges).map(([key, challenge]) => (
                  <Button
                    key={key}
                    variant={selectedPronunciationChallenge === key ? "default" : "outline"}
                    onClick={() => setSelectedPronunciationChallenge(key)}
                  >
                    {challenge.title}
                  </Button>
                ))}
              </div>

              {/* Selected Challenge Details */}
              {selectedPronunciationChallenge && (
                <Card className="challenge-details">
                  <CardHeader>
                    <CardTitle>
                      {pronunciationChallenges[selectedPronunciationChallenge as keyof typeof pronunciationChallenges].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {pronunciationChallenges[selectedPronunciationChallenge as keyof typeof pronunciationChallenges].description}
                    </p>
                    
                    <div className="words-grid grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {pronunciationChallenges[selectedPronunciationChallenge as keyof typeof pronunciationChallenges].words.map((wordData, index) => (
                        <PronunciationGuide
                          key={index}
                          englishWord={wordData.word}
                          hindiComparison={wordData.hindi}
                          soundTip={wordData.tip}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Interactive Pronunciation Coach */}
            <PronunciationCoach
              targetWord="think"
              hindiComparison="सोचना"
              soundTips={[
                'जीभ को दांतों के बीच रखें',
                'हवा को धीरे-धीरे निकालें',
                'हिंदी के "थ" जैसा नहीं बोलें'
              ]}
              difficulty="medium"
            />

            {/* Quick Pronunciation Tips */}
            <QuickPronunciationTips />
          </div>
        </TabsContent>

        {/* Grammar Tab */}
        <TabsContent value="grammar" className="space-y-6">
          <div className="grammar-section">
            <h2 className="text-2xl font-semibold mb-4">
              व्याकरण - Hindi Speakers की आम गलतियां
            </h2>

            <div className="grammar-mistakes space-y-6">
              {commonGrammarMistakes.map((category, index) => (
                <GrammarExplanationCard
                  key={index}
                  rule={category.category}
                  hindiExplanation={category.hindiExplanation}
                  englishExamples={category.mistakes.map(m => `✅ ${m.correct}`)}
                  hindiComparison={category.mistakes[0].explanation}
                />
              ))}
            </div>

            {/* Common Mistakes Examples */}
            <div className="mistakes-examples mt-8">
              <h3 className="text-xl font-semibold mb-4">आम गलतियों के उदाहरण:</h3>
              <div className="grid gap-4">
                {commonGrammarMistakes[0].mistakes.map((mistake, index) => (
                  <CommonMistakeCard
                    key={index}
                    wrongSentence={mistake.wrong}
                    correctSentence={mistake.correct}
                    hindiExplanation={mistake.explanation}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Culture Tab */}
        <TabsContent value="culture" className="space-y-6">
          <div className="culture-section">
            <h2 className="text-2xl font-semibold mb-4">
              सांस्कृतिक संदर्भ - English Communication
            </h2>

            {/* Cultural Context Cards */}
            <div className="cultural-contexts space-y-6">
              {culturalContextData.map((context, index) => (
                <CulturalContextCard
                  key={index}
                  englishPhrase={context.englishPhrase}
                  hindiEquivalent={context.hindiEquivalent}
                  culturalContext={context.culturalContext}
                  formalUsage={context.formalUsage}
                  informalUsage={context.informalUsage}
                  businessContext={context.businessContext}
                  socialContext={context.socialContext}
                  dosDonts={context.dosDonts}
                  indianEnglishVariation={context.indianEnglishVariation}
                />
              ))}
            </div>

            {/* Indian English vs Standard English */}
            <IndianEnglishGuide />
          </div>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business" className="space-y-6">
          <div className="business-section">
            <h2 className="text-2xl font-semibold mb-4">
              व्यापारिक अंग्रेजी - Indian Workplace के लिए
            </h2>

            <div className="business-scenarios grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Email Writing for Indians
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <HindiExplanation
                      englishText="Professional Email Structure"
                      hindiExplanation="व्यावसायिक ईमेल की संरचना भारतीय style से अलग होती है"
                      tip="'Respected Sir' के बजाय 'Dear Mr./Ms.' का उपयोग करें"
                    />
                    
                    <div className="email-example bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="text-sm font-mono">
                        <div><strong>Subject:</strong> Meeting Request for Project Discussion</div>
                        <div className="mt-2"><strong>Dear Ms. Sharma,</strong></div>
                        <div className="mt-2">I hope this email finds you well.</div>
                        <div className="mt-2">I would like to schedule a meeting to discuss the upcoming project...</div>
                        <div className="mt-2">Please let me know your availability.</div>
                        <div className="mt-2"><strong>Best regards,</strong></div>
                        <div><strong>Raj Kumar</strong></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Phone Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CommonMistakeCard
                    wrongSentence="Hello, myself Raj from ABC Company."
                    correctSentence="Good morning, this is Raj from ABC Company."
                    hindiExplanation="'Myself' का उपयोग introduction के लिए नहीं करते। 'This is' या 'My name is' कहें।"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Daily Tab */}
        <TabsContent value="daily" className="space-y-6">
          <div className="daily-section">
            <h2 className="text-2xl font-semibold mb-4">
              दैनिक अंग्रेजी - Practical Phrases
            </h2>

            <div className="daily-categories space-y-6">
              {dailyEnglishPhrases.map((category, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {category.category === 'Shopping' && <ShoppingCart className="w-5 h-5" />}
                      {category.category === 'Transportation' && <Users className="w-5 h-5" />}
                      {category.category === 'Restaurant' && <MessageCircle className="w-5 h-5" />}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="phrases-grid space-y-4">
                      {category.phrases.map((phrase, phraseIndex) => (
                        <HindiLearningCard
                          key={phraseIndex}
                          englishSentence={phrase.english}
                          hindiMeaning={phrase.hindi}
                          pronunciation={phrase.pronunciation}
                          difficulty="easy"
                          category={category.category}
                          tips={[phrase.usage]}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}