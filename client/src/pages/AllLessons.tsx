import { useState } from "react";
import { Layout } from "@/components/Layout";
import { LessonCard } from "@/components/LessonCard";
import { useLessons } from "@/hooks/use-lessons";
import { useProgress } from "@/hooks/use-progress";
import { Loader2, Filter, Search, BookOpen, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AllLessons() {
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const { data: progress, isLoading: progressLoading } = useProgress();

  const [difficultyFilter, setDifficultyFilter] = useState<"all" | "Beginner" | "Intermediate" | "Advanced">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const isLoading = lessonsLoading || progressLoading;

  const categories = lessons
    ? Array.from(new Set(lessons.map((l: any) => l.category))).sort()
    : [];

  const filteredLessons = (lessons || []).filter((lesson: any) => {
    const matchesDifficulty = difficultyFilter === "all" || lesson.difficulty === difficultyFilter;
    const matchesCategory = categoryFilter === "all" || lesson.category === categoryFilter;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.hindiTitle && lesson.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDifficulty && matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4">

        {/* Helper Header */}
        <header className="mb-10 relative overflow-hidden rounded-3xl bg-secondary/30 border border-border/50 p-8">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <BookOpen className="w-48 h-48" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest border border-primary/20">
                <Layers className="h-3 w-3" />
                <span>Curriculum</span>
              </div>
              <h1 className="text-4xl font-extrabold font-display tracking-tight">All Lessons</h1>
              <p className="text-muted-foreground max-w-xl text-lg">
                Explore our comprehensive curriculum designed to take you from beginner to fluent speaker.
              </p>
            </div>

            {/* Search Bar */}
            <div className="w-full md:w-auto relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search lessons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-xl bg-background border border-border focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none w-full md:w-80 transition-all shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 sticky top-20 z-30 bg-background/80 backdrop-blur-md p-2 rounded-2xl border border-transparent has-[:checked]:border-border/50 transition-all">
          <div className="flex flex-wrap gap-2">
            {(["all", "Beginner", "Intermediate", "Advanced"] as const).map(
              (level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficultyFilter(level)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border",
                    difficultyFilter === level
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105"
                      : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {level === "all" ? "All Levels" : level}
                </button>
              )
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={cn(
                  "whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                  categoryFilter === "all" ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:border-primary/50"
                )}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat as string}
                  onClick={() => setCategoryFilter(cat as string)}
                  className={cn(
                    "whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors capitalize",
                    categoryFilter === cat ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:border-primary/50"
                  )}
                >
                  {(cat as string).replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-border rounded-3xl bg-secondary/20">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No lessons found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => { setDifficultyFilter("all"); setCategoryFilter("all"); setSearchQuery(""); }}
              className="mt-4 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredLessons
              .slice()
              .sort((a: any, b: any) => a.order - b.order)
              .map((lesson: any) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  progress={
                    progress?.find((p: any) => p.lessonId === lesson.id) ?? undefined
                  }
                />
              ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
