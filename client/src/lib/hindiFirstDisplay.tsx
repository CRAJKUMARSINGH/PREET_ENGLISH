/**
 * Hindi-First Content Display Utilities
 * Ensures Hindi content is prioritized and displayed prominently
 */

import React from 'react';

/**
 * Hindi-First Layout Component
 * Displays Hindi content before English content
 */
export interface HindiFirstProps {
  englishContent: React.ReactNode;
  hindiContent: React.ReactNode;
  title?: string;
  className?: string;
  displayOrder?: 'hindi-english' | 'english-hindi';
}

export const HindiFirstLayout: React.FC<HindiFirstProps> = ({
  englishContent,
  hindiContent,
  title,
  className = '',
  displayOrder = 'hindi-english'
}) => {
  const contentOrder = displayOrder === 'hindi-english' 
    ? [hindiContent, englishContent] 
    : [englishContent, hindiContent];

  return (
    <div className={`hindi-first-container ${className}`}>
      {title && <h3 className="hindi-first-title text-lg font-semibold mb-3">{title}</h3>}
      <div className="hindi-first-content">
        {contentOrder[0]}
        {contentOrder[1]}
      </div>
    </div>
  );
};

/**
 * Hindi-First Text Component
 * Displays Hindi text before English text
 */
export interface HindiFirstTextProps {
  english: string;
  hindi: string;
  className?: string;
  textType?: 'word' | 'sentence' | 'paragraph';
}

export const HindiFirstText: React.FC<HindiFirstTextProps> = ({
  english,
  hindi,
  className = '',
  textType = 'sentence'
}) => {
  const textClass = textType === 'word' 
    ? 'hindi-word text-xl font-bold' 
    : textType === 'sentence' 
      ? 'hindi-sentence text-lg' 
      : 'hindi-paragraph';

  return (
    <div className={`hindi-first-text ${className}`}>
      <div className={`${textClass} text-slate-800 mb-1`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {hindi}
      </div>
      <div className="english-translation text-muted-foreground text-base">
        {english}
      </div>
    </div>
  );
};

/**
 * Hindi-First Vocabulary Display Component
 * Prioritizes Hindi translation in vocabulary items
 */
export interface HindiFirstVocabularyProps {
  word: string;
  hindiTranslation: string;
  definition?: string;
  example?: string;
  pronunciation?: string;
  className?: string;
}

export const HindiFirstVocabulary: React.FC<HindiFirstVocabularyProps> = ({
  word,
  hindiTranslation,
  definition,
  example,
  pronunciation,
  className = ''
}) => {
  return (
    <div className={`hindi-first-vocabulary bg-secondary/30 rounded-xl p-6 border border-transparent hover:border-primary/10 transition-colors ${className}`}>
      <div className="flex flex-col gap-4">
        {/* Hindi Translation First */}
        <div className="hindi-translation-section">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-lg font-semibold text-slate-700">हिंदी अर्थ</h4>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 mb-3">
            <p className="text-slate-800 font-medium text-xl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {hindiTranslation}
            </p>
          </div>
        </div>

        {/* English Word */}
        <div className="english-word-section">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-primary font-display">{word}</h4>
            {pronunciation && (
              <span className="text-sm text-muted-foreground">
                /{pronunciation}/
              </span>
            )}
          </div>
          
          {definition && (
            <p className="text-foreground font-medium mb-2 text-base">{definition}</p>
          )}
          
          {example && (
            <div className="bg-white p-3 rounded-lg border border-border/50 text-sm italic text-muted-foreground">
              "{example}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Utility function to determine if text is Hindi
 */
export const isHindiText = (text: string): boolean => {
  // Check if the text contains Devanagari characters (Hindi script)
  const hindiRegex = /[\u0900-\u097F]/;
  return hindiRegex.test(text);
};

/**
 * Utility function to format content with Hindi-first approach
 */
export const formatHindiFirstContent = (content: {
  title: string;
  hindiTitle?: string;
  description: string;
  hindiDescription?: string;
  content: string;
  hindiContent?: string;
}): { 
  title: React.ReactNode; 
  description: React.ReactNode; 
  content: React.ReactNode 
} => {
  return {
    title: content.hindiTitle ? (
      <HindiFirstText 
        english={content.title} 
        hindi={content.hindiTitle} 
        textType="word"
      />
    ) : content.title,
    
    description: content.hindiDescription ? (
      <HindiFirstText 
        english={content.description} 
        hindi={content.hindiDescription || content.description} 
        textType="sentence"
      />
    ) : content.description,
    
    content: content.hindiContent ? (
      <HindiFirstLayout 
        englishContent={content.content}
        hindiContent={content.hindiContent}
      />
    ) : content.content
  };
};