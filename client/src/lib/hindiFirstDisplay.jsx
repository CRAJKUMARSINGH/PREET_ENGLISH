/**
 * Hindi-First Content Display Utilities
 * Ensures Hindi content is prioritized and displayed prominently
 */
import React from 'react';
export var HindiFirstLayout = function (_a) {
    var englishContent = _a.englishContent, hindiContent = _a.hindiContent, title = _a.title, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.displayOrder, displayOrder = _c === void 0 ? 'hindi-english' : _c;
    var contentOrder = displayOrder === 'hindi-english'
        ? [hindiContent, englishContent]
        : [englishContent, hindiContent];
    return (<div className={"hindi-first-container ".concat(className)}>
      {title && <h3 className="hindi-first-title text-lg font-semibold mb-3">{title}</h3>}
      <div className="hindi-first-content">
        {contentOrder[0]}
        {contentOrder[1]}
      </div>
    </div>);
};
export var HindiFirstText = function (_a) {
    var english = _a.english, hindi = _a.hindi, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.textType, textType = _c === void 0 ? 'sentence' : _c;
    var textClass = textType === 'word'
        ? 'hindi-word text-xl font-bold'
        : textType === 'sentence'
            ? 'hindi-sentence text-lg'
            : 'hindi-paragraph';
    return (<div className={"hindi-first-text ".concat(className)}>
      <div className={"".concat(textClass, " text-slate-800 mb-1")} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {hindi}
      </div>
      <div className="english-translation text-muted-foreground text-base">
        {english}
      </div>
    </div>);
};
export var HindiFirstVocabulary = function (_a) {
    var word = _a.word, hindiTranslation = _a.hindiTranslation, definition = _a.definition, example = _a.example, pronunciation = _a.pronunciation, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"hindi-first-vocabulary bg-secondary/30 rounded-xl p-6 border border-transparent hover:border-primary/10 transition-colors ".concat(className)}>
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
            {pronunciation && (<span className="text-sm text-muted-foreground">
                /{pronunciation}/
              </span>)}
          </div>
          
          {definition && (<p className="text-foreground font-medium mb-2 text-base">{definition}</p>)}
          
          {example && (<div className="bg-white p-3 rounded-lg border border-border/50 text-sm italic text-muted-foreground">
              "{example}"
            </div>)}
        </div>
      </div>
    </div>);
};
/**
 * Utility function to determine if text is Hindi
 */
export var isHindiText = function (text) {
    // Check if the text contains Devanagari characters (Hindi script)
    var hindiRegex = /[\u0900-\u097F]/;
    return hindiRegex.test(text);
};
/**
 * Utility function to format content with Hindi-first approach
 */
export var formatHindiFirstContent = function (content) {
    return {
        title: content.hindiTitle ? (<HindiFirstText english={content.title} hindi={content.hindiTitle} textType="word"/>) : content.title,
        description: content.hindiDescription ? (<HindiFirstText english={content.description} hindi={content.hindiDescription || content.description} textType="sentence"/>) : content.description,
        content: content.hindiContent ? (<HindiFirstLayout englishContent={content.content} hindiContent={content.hindiContent}/>) : content.content
    };
};
