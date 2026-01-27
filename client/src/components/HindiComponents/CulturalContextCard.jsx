import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Users, Briefcase, MessageCircle, CheckCircle, XCircle, Lightbulb, Volume2, Flag } from 'lucide-react';
export function CulturalContextCard(_a) {
    var englishPhrase = _a.englishPhrase, hindiEquivalent = _a.hindiEquivalent, culturalContext = _a.culturalContext, formalUsage = _a.formalUsage, informalUsage = _a.informalUsage, businessContext = _a.businessContext, socialContext = _a.socialContext, dosDonts = _a.dosDonts, indianEnglishVariation = _a.indianEnglishVariation;
    var _b = useState(false), isPlaying = _b[0], setIsPlaying = _b[1];
    var _c = useState('context'), activeTab = _c[0], setActiveTab = _c[1];
    var playAudio = function () {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            var utterance = new SpeechSynthesisUtterance(englishPhrase);
            utterance.lang = 'en-US';
            utterance.onend = function () { return setIsPlaying(false); };
            speechSynthesis.speak(utterance);
        }
    };
    return (<Card className="cultural-context-card">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 mb-2">
              <Globe className="h-5 w-5 text-primary"/>
              Cultural Context
            </CardTitle>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold text-primary">{englishPhrase}</p>
              <Button variant="ghost" size="sm" onClick={playAudio} disabled={isPlaying} className="h-8 w-8 p-0">
                <Volume2 className={"h-4 w-4 ".concat(isPlaying ? 'animate-pulse' : '')}/>
              </Button>
            </div>
            <p className="text-muted-foreground">
              <strong>हिंदी में:</strong> {hindiEquivalent}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="context" className="text-xs">
              <Globe className="w-3 h-3 mr-1"/>
              Context
            </TabsTrigger>
            <TabsTrigger value="usage" className="text-xs">
              <Users className="w-3 h-3 mr-1"/>
              Usage
            </TabsTrigger>
            <TabsTrigger value="business" className="text-xs">
              <Briefcase className="w-3 h-3 mr-1"/>
              Business
            </TabsTrigger>
            <TabsTrigger value="tips" className="text-xs">
              <Lightbulb className="w-3 h-3 mr-1"/>
              Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="context" className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                सांस्कृतिक संदर्भ:
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">{culturalContext}</p>
            </div>
            
            {indianEnglishVariation && (<div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-1">
                  <Flag className="h-4 w-4"/>
                  Indian English Variation:
                </h4>
                <p className="text-sm text-orange-600 dark:text-orange-400">{indianEnglishVariation}</p>
              </div>)}
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="grid gap-4">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                  Formal Usage (औपचारिक):
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">{formalUsage}</p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
                  Informal Usage (अनौपचारिक):
                </h4>
                <p className="text-sm text-purple-600 dark:text-purple-400">{informalUsage}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-4">
            <div className="space-y-4">
              {businessContext && (<div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2 flex items-center gap-1">
                    <Briefcase className="h-4 w-4"/>
                    Business Context:
                  </h4>
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">{businessContext}</p>
                </div>)}
              
              {socialContext && (<div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-2 flex items-center gap-1">
                    <MessageCircle className="h-4 w-4"/>
                    Social Context:
                  </h4>
                  <p className="text-sm text-teal-600 dark:text-teal-400">{socialContext}</p>
                </div>)}
              
              {!businessContext && !socialContext && (<div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    No specific business or social context available for this phrase.
                  </p>
                </div>)}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4"/>
                  Do's (करें):
                </h4>
                <ul className="space-y-2">
                  {dosDonts.dos.map(function (item, index) { return (<li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0"/>
                      <span className="text-green-700 dark:text-green-300">{item}</span>
                    </li>); })}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                  <XCircle className="h-4 w-4"/>
                  Don'ts (न करें):
                </h4>
                <ul className="space-y-2">
                  {dosDonts.donts.map(function (item, index) { return (<li key={index} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0"/>
                      <span className="text-red-700 dark:text-red-300">{item}</span>
                    </li>); })}
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>);
}
export function QuickCulturalTips() {
    var tips = [
        {
            icon: Users,
            title: 'Small Talk',
            hindi: 'छोटी बात',
            tip: 'Weather, traffic के बारे में बात करना normal है',
            color: 'text-blue-500'
        },
        {
            icon: Briefcase,
            title: 'Professional',
            hindi: 'व्यावसायिक',
            tip: '"Please" और "Thank you" का ज्यादा उपयोग करें',
            color: 'text-green-500'
        },
        {
            icon: MessageCircle,
            title: 'Direct Communication',
            hindi: 'सीधी बात',
            tip: 'Western culture में direct communication preferred है',
            color: 'text-purple-500'
        },
        {
            icon: Globe,
            title: 'Cultural Sensitivity',
            hindi: 'सांस्कृतिक संवेदनशीलता',
            tip: 'Different cultures के बारे में respectful रहें',
            color: 'text-orange-500'
        }
    ];
    return (<Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary"/>
          Quick Cultural Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map(function (tip, index) { return (<div key={index} className="p-3 bg-secondary/30 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <tip.icon className={"h-5 w-5 ".concat(tip.color)}/>
                <h4 className="font-semibold">{tip.title}</h4>
                <Badge variant="outline" className="text-xs">{tip.hindi}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{tip.tip}</p>
            </div>); })}
        </div>
      </CardContent>
    </Card>);
}
export function IndianEnglishGuide() {
    var variations = [
        {
            indian: 'Good name?',
            standard: 'What\'s your name?',
            context: 'Name पूछने का Indian way'
        },
        {
            indian: 'Out of station',
            standard: 'Out of town',
            context: 'शहर से बाहर होना'
        },
        {
            indian: 'Prepone',
            standard: 'Move to an earlier time',
            context: 'समय आगे करना (Indian English word)'
        },
        {
            indian: 'Do the needful',
            standard: 'Please take the necessary action',
            context: 'जरूरी काम करना'
        }
    ];
    return (<Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-orange-500"/>
          Indian English vs Standard English
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Indian English कई जगह acceptable है, लेकिन international context में standard English बेहतर है।
          </p>
          
          <div className="space-y-3">
            {variations.map(function (variation, index) { return (<div key={index} className="grid md:grid-cols-3 gap-3 p-3 bg-secondary/20 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                    Indian: {variation.indian}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    Standard: {variation.standard}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {variation.context}
                  </p>
                </div>
              </div>); })}
          </div>
        </div>
      </CardContent>
    </Card>);
}
