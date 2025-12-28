import { Volume2 } from "lucide-react";
import type { Vocabulary } from "@shared/schema";

export function VocabularyItem({ word }: { word: Vocabulary }) {
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const playHindiAudio = () => {
    if (word.hindiTranslation) {
      const utterance = new SpeechSynthesisUtterance(word.hindiTranslation);
      utterance.lang = 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-secondary/30 rounded-xl p-6 hover:bg-secondary/50 transition-colors border border-transparent hover:border-primary/10">
      <div className="flex flex-col gap-4">
        {/* English Word Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-primary font-display">{word.word}</h4>
            <button 
              onClick={playAudio}
              className="p-1.5 rounded-full hover:bg-primary/10 text-primary/80 hover:text-primary transition-colors"
              title="उच्चारण सुनें"
            >
              <Volume2 className="h-4 w-4" />
            </button>
          </div>
          
          <p className="text-foreground font-medium mb-3 text-lg">{word.definition}</p>
          
          <div className="bg-white p-3 rounded-lg border border-border/50 text-sm italic text-muted-foreground">
            "{word.example}"
          </div>
        </div>

        {/* Hindi Translation Section */}
        {word.hindiTranslation && (
          <div className="border-t border-border/30 pt-4">
            <div className="flex items-center gap-3 mb-2">
              <h5 className="text-lg font-semibold text-slate-700">हिंदी अर्थ</h5>
              <button 
                onClick={playHindiAudio}
                className="p-1.5 rounded-full hover:bg-orange-100 text-orange-600 hover:text-orange-700 transition-colors"
                title="उच्चारण सुनें"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="text-slate-800 font-medium text-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {word.hindiTranslation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
