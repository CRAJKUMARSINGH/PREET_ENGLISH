import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { commonGrammarMistakes } from "@/data/hindiLearningData";

export type GrammarCategoryKey = "articles" | "prepositions" | "present_continuous";

const grammarCategoryMap: Record<GrammarCategoryKey, string> = {
  articles: "Articles (a, an, the)",
  prepositions: "Prepositions (in, on, at)",
  present_continuous: "Present Continuous Overuse",
};

export function getGrammarEntryForKey(key: GrammarCategoryKey) {
  const categoryName = grammarCategoryMap[key];
  return commonGrammarMistakes.find((m) => m.category === categoryName) ?? null;
}

interface SupportCardProps {
  categoryKey: GrammarCategoryKey | null;
}

export function inferGrammarCategoryFromText(text: string): GrammarCategoryKey | null {
  const lower = text.toLowerCase();

  if (/\b(a|an|the)\b/.test(lower)) {
    return "articles";
  }

  if (/\b(in|on|at)\b/.test(lower)) {
    return "prepositions";
  }

  if (/(am|is|are)\s+\w+ing/.test(lower)) {
    return "present_continuous";
  }

  return null;
}

export function SupportCard({ categoryKey }: SupportCardProps) {
  if (!categoryKey) return null;

  const entry = getGrammarEntryForKey(categoryKey);

  if (!entry) return null;

  const [first] = entry.mistakes;

  return (
    <Card className="mt-4 border-amber-200 bg-amber-50/80 dark:bg-amber-900/20 dark:border-amber-700">
      <CardHeader className="flex flex-row items-start gap-3 pb-3">
        <div className="mt-0.5">
          <Lightbulb className="h-4 w-4 text-amber-600 dark:text-amber-300" />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-sm font-semibold text-amber-900 dark:text-amber-100">
            व्याकरण सहायता (Grammar Support)
          </CardTitle>
          <p className="text-xs text-amber-800/80 dark:text-amber-200/80">{entry.category}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <p className="text-sm text-amber-900 dark:text-amber-50">
          {entry.hindiExplanation}
        </p>
        {first && (
          <div className="text-xs bg-white/80 dark:bg-black/20 rounded-lg border border-amber-200/70 dark:border-amber-700/70 p-3 space-y-1">
            <p>
              <span className="font-semibold">गलत: </span>
              <span>{first.wrong}</span>
            </p>
            <p>
              <span className="font-semibold">सही: </span>
              <span>{first.correct}</span>
            </p>
            <p className="text-[11px] text-amber-800/90 dark:text-amber-200/80">
              क्यों? {first.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}