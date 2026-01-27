import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MessageCircle, Lightbulb, CheckCircle, Star, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
var interviewQuestions = [
    {
        id: '1',
        question: 'Tell me about yourself.',
        questionHindi: 'अपने बारे में बताइए।',
        category: 'Introduction',
        difficulty: 'common',
        sampleAnswer: "I am a [Your Profession] with [X] years of experience in [Industry/Field]. Currently, I work at [Current Company] where I [Key Responsibility]. \n\nMy key strengths include [Skill 1], [Skill 2], and [Skill 3]. In my previous role, I [Key Achievement with numbers if possible].\n\nI am excited about this opportunity because [Reason related to company/role]. I believe my experience in [Relevant Area] aligns well with what you're looking for.",
        hindiTips: [
            '2-3 मिनट में जवाब दें, ज्यादा लंबा न करें',
            'Professional background पर focus करें, personal life नहीं',
            'Recent experience से शुरू करें',
            'Company और role से जोड़ें'
        ],
        dosDonts: {
            dos: [
                'Professional achievements mention करें',
                'Relevant skills highlight करें',
                'Confident tone रखें'
            ],
            donts: [
                'Personal life details न बताएं',
                'Negative बातें न कहें',
                'बहुत लंबा जवाब न दें'
            ]
        },
        keywords: ['experience', 'skills', 'achievements', 'passion']
    },
    {
        id: '2',
        question: 'What are your strengths and weaknesses?',
        questionHindi: 'आपकी ताकत और कमजोरियां क्या हैं?',
        category: 'Self-Assessment',
        difficulty: 'common',
        sampleAnswer: "My key strengths include:\n1. [Strength 1] - For example, [Brief example]\n2. [Strength 2] - This has helped me [Achievement]\n3. [Strength 3] - I demonstrated this when [Situation]\n\nAs for areas of improvement, I am working on [Weakness]. I have been addressing this by [Action you're taking]. For instance, [Example of improvement].",
        hindiTips: [
            'Strengths को examples के साथ बताएं',
            'Weakness को improvement के साथ present करें',
            'Job-related strengths choose करें',
            'Honest रहें लेकिन strategic भी'
        ],
        dosDonts: {
            dos: [
                'Specific examples दें',
                'Weakness के साथ improvement plan बताएं',
                'Job-relevant strengths mention करें'
            ],
            donts: [
                '"I have no weaknesses" न कहें',
                'Critical weaknesses न बताएं',
                'Generic answers न दें'
            ]
        },
        keywords: ['strength', 'improvement', 'example', 'growth']
    },
    {
        id: '3',
        question: 'Why do you want to work here?',
        questionHindi: 'आप यहां क्यों काम करना चाहते हैं?',
        category: 'Motivation',
        difficulty: 'common',
        sampleAnswer: "I am excited about this opportunity for several reasons:\n\nFirst, [Company Name]'s reputation for [Company Strength - innovation/culture/growth] aligns with my professional values.\n\nSecond, the [Job Role] position offers the chance to [Opportunity - learn/grow/contribute] in [Specific Area].\n\nThird, I have been following [Company's recent achievement/project], and I would love to be part of such initiatives.\n\nI believe my skills in [Relevant Skills] would allow me to contribute meaningfully to your team.",
        hindiTips: [
            'Company research करके जाएं',
            'Specific reasons दें, generic नहीं',
            'Company और role दोनों mention करें',
            'अपनी skills को company needs से जोड़ें'
        ],
        dosDonts: {
            dos: [
                'Company के बारे में research करें',
                'Specific projects/values mention करें',
                'Genuine enthusiasm दिखाएं'
            ],
            donts: [
                '"Good salary" primary reason न बताएं',
                'Generic answers न दें',
                'Competitor को criticize न करें'
            ]
        },
        keywords: ['company', 'opportunity', 'growth', 'contribution']
    },
    {
        id: '4',
        question: 'Where do you see yourself in 5 years?',
        questionHindi: '5 साल बाद आप खुद को कहां देखते हैं?',
        category: 'Career Goals',
        difficulty: 'tricky',
        sampleAnswer: "In five years, I see myself having grown significantly in my career. \n\nShort-term, I aim to master the responsibilities of this role and become a valuable contributor to the team.\n\nMedium-term, I hope to take on more responsibilities, perhaps leading projects or mentoring junior team members.\n\nLong-term, I aspire to grow into a [Senior Role] position where I can contribute to strategic decisions while continuing to develop my expertise in [Field].\n\nI believe [Company Name] offers the right environment for this growth.",
        hindiTips: [
            'Realistic goals बताएं',
            'Company में growth दिखाएं',
            'Ambitious लेकिन practical रहें',
            'Role से related goals रखें'
        ],
        dosDonts: {
            dos: [
                'Company में growth path दिखाएं',
                'Realistic timeline रखें',
                'Learning और contribution mention करें'
            ],
            donts: [
                '"Your job" न कहें',
                'Unrealistic goals न बताएं',
                'Company छोड़ने की बात न करें'
            ]
        },
        keywords: ['growth', 'leadership', 'contribution', 'development']
    },
    {
        id: '5',
        question: 'Tell me about a challenging situation and how you handled it.',
        questionHindi: 'किसी चुनौतीपूर्ण स्थिति के बारे में बताइए और आपने उसे कैसे संभाला।',
        category: 'Behavioral',
        difficulty: 'behavioral',
        sampleAnswer: "I'll share an example using the STAR method:\n\n**Situation:** At [Previous Company], we faced [Challenge - tight deadline/difficult client/technical issue].\n\n**Task:** My responsibility was to [Your specific role in solving the problem].\n\n**Action:** I took the following steps:\n1. [First action you took]\n2. [Second action]\n3. [Third action]\n\n**Result:** As a result, [Positive outcome with numbers if possible]. This experience taught me [Key learning].",
        hindiTips: [
            'STAR method use करें (Situation, Task, Action, Result)',
            'Specific example दें',
            'अपनी role clearly बताएं',
            'Positive result और learning mention करें'
        ],
        dosDonts: {
            dos: [
                'STAR format follow करें',
                'Specific numbers/results दें',
                'अपनी contribution highlight करें'
            ],
            donts: [
                'Team को blame न करें',
                'Negative outcome वाले examples न दें',
                'Vague answers न दें'
            ]
        },
        keywords: ['STAR', 'challenge', 'action', 'result', 'learning']
    }
];
export function InterviewPrep() {
    var _a = useState(interviewQuestions[0]), selectedQuestion = _a[0], setSelectedQuestion = _a[1];
    var _b = useState(true), expandedAnswer = _b[0], setExpandedAnswer = _b[1];
    var _c = useState(false), practiceMode = _c[0], setPracticeMode = _c[1];
    var playQuestion = function () {
        if ('speechSynthesis' in window) {
            var utterance = new SpeechSynthesisUtterance(selectedQuestion.question);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            speechSynthesis.speak(utterance);
        }
    };
    var getDifficultyColor = function (difficulty) {
        switch (difficulty) {
            case 'common': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'tricky': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'behavioral': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            default: return 'bg-gray-100 text-gray-800';
        }
    };
    return (<div className="interview-prep space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-500"/>
            Interview Preparation
            <Badge variant="secondary" className="ml-auto">Hindi Guide</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Common interview questions with Hindi explanations and sample answers. 
            Practice करें और confident बनें!
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Question List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interview Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {interviewQuestions.map(function (q) { return (<Button key={q.id} variant={selectedQuestion.id === q.id ? "default" : "outline"} className="w-full justify-start h-auto p-3 text-left" onClick={function () { return setSelectedQuestion(q); }}>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{q.question}</div>
                    <div className="text-xs opacity-80 mt-1">{q.questionHindi}</div>
                  </div>
                </Button>); })}
            </CardContent>
          </Card>
        </div>

        {/* Question Detail */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{selectedQuestion.question}</CardTitle>
                  <div className="text-blue-600 dark:text-blue-400">{selectedQuestion.questionHindi}</div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Badge className={getDifficultyColor(selectedQuestion.difficulty)}>
                    {selectedQuestion.difficulty}
                  </Badge>
                  <Badge variant="outline">{selectedQuestion.category}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Listen Button */}
              <Button onClick={playQuestion} variant="outline" size="sm">
                <Volume2 className="w-4 h-4 mr-2"/>
                Listen to Question
              </Button>

              {/* Sample Answer */}
              <div className="sample-answer">
                <Button variant="ghost" className="w-full justify-between p-0 h-auto" onClick={function () { return setExpandedAnswer(!expandedAnswer); }}>
                  <span className="font-medium flex items-center gap-2">
                    <MessageCircle className="w-4 h-4"/>
                    Sample Answer
                  </span>
                  {expandedAnswer ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </Button>
                
                {expandedAnswer && (<div className="mt-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-sans">
                      {selectedQuestion.sampleAnswer}
                    </pre>
                  </div>)}
              </div>

              {/* Hindi Tips */}
              <div className="hindi-tips">
                <h4 className="font-medium flex items-center gap-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-yellow-500"/>
                  Hindi Tips
                </h4>
                <ul className="space-y-2">
                  {selectedQuestion.hindiTips.map(function (tip, index) { return (<li key={index} className="flex items-start gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0"/>
                      <span>{tip}</span>
                    </li>); })}
                </ul>
              </div>

              {/* Do's and Don'ts */}
              <div className="dos-donts grid md:grid-cols-2 gap-4">
                <div className="dos">
                  <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">✅ Do's:</h4>
                  <ul className="space-y-1">
                    {selectedQuestion.dosDonts.dos.map(function (item, index) { return (<li key={index} className="text-sm flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/>
                        <span>{item}</span>
                      </li>); })}
                  </ul>
                </div>
                
                <div className="donts">
                  <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">❌ Don'ts:</h4>
                  <ul className="space-y-1">
                    {selectedQuestion.dosDonts.donts.map(function (item, index) { return (<li key={index} className="text-sm flex items-start gap-2 text-red-600 dark:text-red-400">
                        <span className="mt-0.5">•</span>
                        <span>{item}</span>
                      </li>); })}
                  </ul>
                </div>
              </div>

              {/* Keywords */}
              <div className="keywords">
                <h4 className="font-medium mb-2">🔑 Key Words to Use:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedQuestion.keywords.map(function (keyword, index) { return (<Badge key={index} variant="secondary">{keyword}</Badge>); })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
}
