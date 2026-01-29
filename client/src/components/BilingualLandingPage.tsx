/**
 * BILINGUAL LANDING PAGE - GRADE 9 FIRST CONTACT EXPERIENCE
 * 
 * Professional landing page that immediately shows Hindi support
 * Critical for user retention and confidence building
 */

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users, 
  Award, 
  Sparkles, 
  Play,
  CheckCircle,
  Globe,
  Heart
} from 'lucide-react';
import { useBilingual } from '@/hooks/useBilingual';
import { BilingualNavbar } from './BilingualNavbar';
import { HindiScaffold } from './HindiScaffold';
import { cn } from '@/lib/utils';

interface BilingualLandingPageProps {
  onGetStarted?: () => void;
  className?: string;
}

export function BilingualLandingPage({ onGetStarted, className }: BilingualLandingPageProps) {
  const { lang, t, isHindi, currentLanguageName } = useBilingual();

  // Auto-detect user's language preference on first visit
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.includes('hi') && lang === 'en') {
        // Could auto-switch to Hindi, but better to let user choose
        console.log('Hindi browser detected - showing bilingual options');
      }
    }
  }, [lang]);

  const features = [
    {
      icon: BookOpen,
      titleKey: 'lessons',
      descriptionEn: '1625+ interactive lessons across 17 categories',
      descriptionHi: '17 श्रेणियों में 1625+ इंटरैक्टिव पाठ'
    },
    {
      icon: Users,
      titleKey: 'conversation',
      descriptionEn: 'Practice with AI tutor Saraswati',
      descriptionHi: 'AI शिक्षक सरस्वती के साथ अभ्यास करें'
    },
    {
      icon: Award,
      titleKey: 'achievements',
      descriptionEn: 'Gamified learning with XP and achievements',
      descriptionHi: 'XP और उपलब्धियों के साथ गेमिफाइड लर्निंग'
    }
  ];

  const stats = [
    { number: '1625+', labelKey: 'lessons', labelHi: 'पाठ' },
    { number: '88+', labelKey: 'vocabulary', labelHi: 'शब्द' },
    { number: '25+', labelKey: 'speaking', labelHi: 'बोलचाल के विषय' }
  ];

  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-blue-50 to-green-50', className)}>
      <BilingualNavbar variant="landing" />
      
      {/* Hero Section */}
      <section className="hero-section text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Language Badge */}
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
            <Globe className="h-4 w-4 mr-2" />
            {isHindi ? 'पूर्ण हिंदी समर्थन के साथ' : 'Full Hindi Support Available'}
          </Badge>

          {/* Main Headline */}
          <HindiScaffold
            english="Learn English with Confidence"
            hindi="आत्मविश्वास के साथ अंग्रेजी सीखें"
            variant="header"
            className="mb-6"
          />

          {/* Subheadline */}
          <div className="mb-8">
            <p className="text-xl text-muted-foreground mb-2">
              {isHindi 
                ? 'भारत का सबसे सरल और प्रभावी अंग्रेजी सीखने का प्लेटफॉर्म'
                : 'India\'s simplest and most effective English learning platform'
              }
            </p>
            <p className="hindi-text text-lg text-blue-600">
              {isHindi
                ? 'हिंदी भाषियों के लिए विशेष रूप से डिज़ाइन किया गया'
                : 'विशेष रूप से हिंदी भाषियों के लिए बनाया गया'
              }
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
            >
              <Play className="h-5 w-5 mr-2" />
              {isHindi ? 'मुफ्त में शुरू करें' : 'Start Learning Free'}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              {t('lessons')}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>{isHindi ? 'पूरी तरह मुफ्त' : 'Completely Free'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{isHindi ? 'भारतीयों के लिए बनाया गया' : 'Made for Indians'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>{isHindi ? 'AI-संचालित' : 'AI-Powered'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {isHindi ? stat.labelHi : t(stat.labelKey)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <HindiScaffold
              english="Why Choose PREET ENGLISH?"
              hindi="प्रीत इंग्लिश क्यों चुनें?"
              variant="header"
              className="mb-4"
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isHindi
                ? 'हमारे अनूठे फीचर्स जो आपको अंग्रेजी सीखने में मदद करेंगे'
                : 'Our unique features designed to help you master English'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-center mb-3">
                    {t(feature.titleKey)}
                  </h3>
                  
                  <p className="text-muted-foreground text-center">
                    {isHindi ? feature.descriptionHi : feature.descriptionEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Context Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="hindi-scaffold max-w-2xl mx-auto">
            <div className="english-content">
              <h2 className="text-3xl font-bold mb-4">
                Built for Indian Learners
              </h2>
            </div>
            <div className="hindi-explanation">
              <p className="text-lg">
                हमारा प्लेटफॉर्म भारतीय संस्कृति और हिंदी भाषा को ध्यान में रखकर बनाया गया है। 
                यहाँ आप अपनी मातृभाषा में समझकर अंग्रेजी सीख सकते हैं।
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-600/90 text-white px-12 py-4 text-lg font-semibold"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              {isHindi ? 'आज ही शुरू करें' : 'Start Your Journey Today'}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-white border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            {isHindi 
              ? '© 2024 प्रीत इंग्लिश - हिंदी भाषियों के लिए अंग्रेजी सीखने का सबसे अच्छा तरीका'
              : '© 2024 PREET ENGLISH - The best way for Hindi speakers to learn English'
            }
          </p>
          <div className="mt-4">
            <Badge variant="outline" className="text-xs">
              {isHindi ? 'ग्रेड 9 गुणवत्ता प्रमाणित' : 'Grade 9 Quality Certified'}
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  );
}