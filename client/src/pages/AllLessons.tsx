import { useState } from "react";
import { Layout } from "@/components/Layout";
import { LessonCard } from "@/components/LessonCard";
import { useLessons } from "@/hooks/use-lessons";
import { useProgress } from "@/hooks/use-progress";
import { Loader2, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AllLessons() {
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const { data: progress, isLoading: progressLoading } = useProgress();

  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "Beginner" | "Intermediate" | "Advanced">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const isLoading = lessonsLoading || progressLoading;

  const categories = lessons
    ? Array.from(new Set(lessons.map((l) => l.category))).sort()
    : [];

  const filteredLessons = (lessons || []).filter((lesson) => {
    const matchesDifficulty =
      difficultyFilter === "all" || lesson.difficulty === difficultyFilter;
    const matchesCategory =
      categoryFilter === "all" || lesson.category === categoryFilter;
    return matchesDifficulty && matchesCategory;
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-8">
        <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">सभी पाठ (All Lessons)</h1>
            <p className="text-sm text-muted-foreground mt-1">
              यहाँ से आप PREET ENGLISH के सभी पाठ देख सकते हैं और किसी भी पाठ पर सीधे जा सकते हैं।
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2 md:mt-0">
            <Filter className="h-4 w-4" />
            <span>Level और Category से फ़िल्टर करें</span>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2">
            {(["all", "Beginner", "Intermediate", "Advanced"] as const).map(
              (level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficultyFilter(level)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                    difficultyFilter === level
                      ? "bg-primary text-white border-primary"
                      : "bg-background text-muted-foreground border-border hover:bg-accent hover:text-foreground"
                  )}
                >
                  {level === "all"
                    ? "सभी स्तर"
                    : level === "Beginner"
                    ? "Beginner"
                    : level === "Intermediate"
                    ? "Intermediate"
                    : "Advanced"}
                </button>
              )
            )}
          </div>

          <div className="flex gap-2 items-center">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-full text-xs border bg-background"
            >
              <option value="all">सभी श्रेणियाँ</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Lessons Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground border rounded-2xl bg-background">
            कोई पाठ नहीं मिला। अलग फ़िल्टर आज़माएं।
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLessons
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  progress={
                    progress?.find((p) => p.lessonId === lesson.id) ?? undefined
                  }
                />
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
