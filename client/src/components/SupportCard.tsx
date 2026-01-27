import { Lightbulb, AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { commonGrammarMistakes } from "@/data/hindiLearningData";
import { cn } from "@/lib/utils";

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
    <Card className={cn(
      "mt-4 overflow-hidden",
      "glass-card border-primary/20",
      "bg-gradient-to-br from-primary/5 via-background to-primary/5"
    )}>
      <CardHeader className="flex flex-row items-start gap-3 pb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div className="space-y-1 flex-1">
          <CardTitle className="text-sm font-bold text-foreground flex items-center justify-between">
            <span>व्याकरण सहायता (Grammar Support)</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              Tip
            </span>
          </CardTitle>
          <p className="text-xs text-muted-foreground font-medium">{entry.category}</p>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-foreground leading-relaxed">
          {entry.hindiExplanation}
        </p>
        {first && (
          <div className="rounded-xl border border-border/50 overflow-hidden">
            {/* Wrong Example */}
            <div className="p-3 bg-red-500/5 border-b border-border/50">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-0.5">गलत (Incorrect)</p>
                  <p className="text-sm text-foreground">{first.wrong}</p>
                </div>
              </div>
            </div>

            {/* Correct Example */}
            <div className="p-3 bg-green-500/5 border-b border-border/50">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-0.5">सही (Correct)</p>
                  <p className="text-sm text-foreground">{first.correct}</p>
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="p-3 bg-secondary/30">
              <p className="text-xs text-muted-foreground">
                <span className="font-bold text-primary">क्यों?</span> {first.explanation}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}