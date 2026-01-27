import { Lightbulb } from "lucide-react";
import { AudioButton } from "./AudioButton";
import { pronunciationChallenges } from "@/data/hindiLearningData";
function getPronunciationHint(word) {
    var lower = word.toLowerCase();
    for (var _i = 0, _a = Object.values(pronunciationChallenges); _i < _a.length; _i++) {
        var challenge = _a[_i];
        var match = challenge.words.find(function (w) { return w.word.toLowerCase() === lower; });
        if (match) {
            return {
                title: challenge.title,
                hindi: match.hindi,
                tip: match.tip,
            };
        }
    }
    return null;
}
export function VocabularyItem(_a) {
    var word = _a.word;
    var pronunciationHint = getPronunciationHint(word.word);
    return (<div className="bg-secondary/30 rounded-xl p-6 hover:bg-secondary/50 transition-colors border border-transparent hover:border-primary/10">
      <div className="flex flex-col gap-4">
        {/* English Word Section */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="text-xl font-bold text-primary font-display">{word.word}</h4>
            <AudioButton text={word.word} language="en" size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10"/>
          </div>

          {pronunciationHint && (<div className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-800 text-xs font-medium px-3 py-1 border border-amber-200 mb-3">
              <Lightbulb className="h-3 w-3"/>
              <span>
                Pronunciation Tip: {pronunciationHint.tip}
              </span>
            </div>)}

          <p className="text-foreground font-medium mb-3 text-lg">{word.definition}</p>

          <div className="bg-white p-3 rounded-lg border border-border/50 text-sm italic text-muted-foreground flex items-start gap-2">
            <span className="flex-1">"{word.example}"</span>
            <AudioButton text={word.example} language="en" size="sm" variant="ghost"/>
          </div>
        </div>

        {/* Hindi Translation Section */}
        {word.hindiTranslation && (<div className="border-t border-border/30 pt-4">
            <div className="flex items-center gap-3 mb-2">
              <h5 className="text-lg font-semibold text-slate-700">हिंदी अर्थ</h5>
              <AudioButton text={word.hindiTranslation} language="hi" size="sm" className="text-orange-600 hover:text-orange-700"/>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg border border-orange-200">
              <p className="text-slate-800 font-medium text-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                {word.hindiTranslation}
              </p>
            </div>
          </div>)}
      </div>
    </div>);
}
