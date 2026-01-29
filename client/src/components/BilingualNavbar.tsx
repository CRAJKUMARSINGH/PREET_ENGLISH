/**
 * BILINGUAL NAVBAR - GRADE 9 NAVIGATION WITH LANGUAGE TOGGLE
 * 
 * Professional navigation bar with seamless language switching
 * Ensures Hindi speakers can navigate confidently from first contact
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  BookOpen, 
  BarChart3, 
  User, 
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useBilingual } from '@/hooks/useBilingual';
import { cn } from '@/lib/utils';

interface BilingualNavbarProps {
  className?: string;
  variant?: 'default' | 'compact' | 'landing';
}

export function BilingualNavbar({ className, variant = 'default' }: BilingualNavbarProps) {
  const { lang, toggleLang, t, isHindi, currentLanguageName, otherLanguageName } = useBilingual();

  const navItems = [
    { key: 'lessons', icon: BookOpen, href: '/lessons' },
    { key: 'progress', icon: BarChart3, href: '/progress' },
    { key: 'practice', icon: MessageCircle, href: '/speak' },
    { key: 'profile', icon: User, href: '/profile' }
  ];

  if (variant === 'landing') {
    return (
      <nav className={cn(
        'flex justify-between items-center p-6 bg-white/95 backdrop-blur-sm border-b shadow-sm',
        className
      )}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {isHindi ? 'प्रीत इंग्लिश' : 'PREET ENGLISH'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isHindi ? 'अंग्रेजी सीखने का सबसे आसान तरीका' : 'The easiest way to learn English'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={toggleLang}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 font-medium"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">
              {isHindi ? 'Switch to English' : 'हिन्दी में बदलें'}
            </span>
            <Badge variant="secondary" className="text-xs">
              {currentLanguageName}
            </Badge>
          </Button>
        </div>
      </nav>
    );
  }

  if (variant === 'compact') {
    return (
      <nav className={cn(
        'flex justify-between items-center p-4 bg-card border-b',
        className
      )}>
        <h1 className="text-lg font-semibold">
          {isHindi ? 'प्रीत इंग्लिश' : 'PREET ENGLISH'}
        </h1>
        
        <Button
          onClick={toggleLang}
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Globe className="h-4 w-4" />
          {currentLanguageName}
        </Button>
      </nav>
    );
  }

  // Default variant - full navigation
  return (
    <nav className={cn(
      'flex justify-between items-center p-4 bg-white shadow-md border-b',
      className
    )}>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {isHindi ? 'प्रीत इंग्लिश' : 'PREET ENGLISH'}
            </h1>
            <p className="text-xs text-muted-foreground">
              {t('home')}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(({ key, icon: Icon, href }) => (
            <a
              key={key}
              href={href}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{t(key)}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Language Toggle */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t('language')}:</span>
          <Badge variant="outline" className="font-medium">
            {currentLanguageName}
          </Badge>
        </div>
        
        <Button
          onClick={toggleLang}
          variant="outline"
          className="flex items-center gap-2 font-semibold transition-all hover:bg-primary hover:text-primary-foreground"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {isHindi ? 'Switch to English' : 'हिन्दी में बदलें'}
          </span>
          <span className="sm:hidden">
            {otherLanguageName}
          </span>
        </Button>
      </div>
    </nav>
  );
}

// Mobile Navigation Component
export function MobileBilingualNav({ className }: { className?: string }) {
  const { t, isHindi } = useBilingual();

  const navItems = [
    { key: 'lessons', icon: BookOpen, href: '/lessons' },
    { key: 'progress', icon: BarChart3, href: '/progress' },
    { key: 'practice', icon: MessageCircle, href: '/speak' },
    { key: 'profile', icon: User, href: '/profile' }
  ];

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden',
      className
    )}>
      <div className="flex items-center justify-around p-2">
        {navItems.map(({ key, icon: Icon, href }) => (
          <a
            key={key}
            href={href}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">
              {t(key)}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}