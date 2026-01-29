/**
 * BILINGUAL HOOK - THE BRAIN OF GRADE 9 LANGUAGE SWITCHING
 * 
 * This hook manages the global language state and provides seamless switching
 * between English and Hindi throughout the entire application.
 */

import { useState, useCallback, useEffect } from 'react';
import { BILINGUAL_NAV, EDUCATIONAL_TERMS, GRAMMAR_TERMS, getBilingualText } from '../data/bilingualTranslations';

export type Language = 'en' | 'hi';

// Persistent storage key
const LANGUAGE_STORAGE_KEY = 'preet_english_language';

export const useBilingual = () => {
  // Initialize from localStorage or default to English
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      return stored === 'hi' || stored === 'en' ? stored : 'en';
    }
    return 'en';
  });

  // Toggle between languages
  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const newLang = prev === 'en' ? 'hi' : 'en';
      
      // Update HTML lang attribute for screen readers/SEO
      if (typeof document !== 'undefined') {
        document.documentElement.lang = newLang;
      }
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
      }
      
      return newLang;
    });
  }, []);

  // Set specific language
  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
    
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    }
  }, []);

  // Genius helper: Pass a key, get the translated string
  const t = useCallback((key: string) => {
    return getBilingualText(key, lang === 'hi');
  }, [lang]);

  // Get both languages for display
  const getBoth = useCallback((key: string) => {
    const text = BILINGUAL_NAV[key] || EDUCATIONAL_TERMS[key] || GRAMMAR_TERMS[key];
    return text ? `${text.en} (${text.hi})` : key;
  }, []);

  // Check if current language is Hindi
  const isHindi = lang === 'hi';
  const isEnglish = lang === 'en';

  // Get language display name
  const currentLanguageName = lang === 'hi' ? 'हिन्दी' : 'English';
  const otherLanguageName = lang === 'hi' ? 'English' : 'हिन्दी';

  // Initialize HTML lang attribute on mount
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return {
    lang,
    toggleLang,
    setLanguage,
    t,
    getBoth,
    isHindi,
    isEnglish,
    currentLanguageName,
    otherLanguageName
  };
};