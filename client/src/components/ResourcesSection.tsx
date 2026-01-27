import { ExternalLink, Play, Headphones, BookOpen, Globe, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Resource {
  title: string;
  titleHindi: string;
  description: string;
  url: string;
  type: 'video' | 'audio' | 'reading' | 'interactive';
  icon: string;
}

const resources: Resource[] = [
  {
    title: "BBC Learning English",
    titleHindi: "बीबीसी लर्निंग इंग्लिश",
    description: "Free English lessons with videos and audio",
    url: "https://www.bbc.co.uk/learningenglish",
    type: "video",
    icon: "🎬"
  },
  {
    title: "TED Talks",
    titleHindi: "टेड टॉक्स",
    description: "Inspiring talks with subtitles",
    url: "https://www.ted.com/talks",
    type: "video",
    icon: "🎤"
  },
  {
    title: "VOA Learning English",
    titleHindi: "वीओए लर्निंग इंग्लिश",
    description: "News in slow, clear English",
    url: "https://learningenglish.voanews.com",
    type: "audio",
    icon: "📻"
  },
  {
    title: "British Council",
    titleHindi: "ब्रिटिश काउंसिल",
    description: "Grammar and vocabulary exercises",
    url: "https://learnenglish.britishcouncil.org",
    type: "interactive",
    icon: "🇬🇧"
  },
  {
    title: "News in Levels",
    titleHindi: "न्यूज़ इन लेवल्स",
    description: "News articles at different levels",
    url: "https://www.newsinlevels.com",
    type: "reading",
    icon: "📰"
  },
  {
    title: "English Central",
    titleHindi: "इंग्लिश सेंट्रल",
    description: "Learn with video clips",
    url: "https://www.englishcentral.com",
    type: "video",
    icon: "🎥"
  }
];

export function ResourcesSection() {
  const typeConfig = {
    video: { color: "bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 border-red-100 dark:border-red-900/30", icon: Play },
    audio: { color: "bg-purple-50 dark:bg-purple-900/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/30", icon: Headphones },
    reading: { color: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/30", icon: BookOpen },
    interactive: { color: "bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 border-green-100 dark:border-green-900/30", icon: Globe }
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold font-display">Extra Resources</h2>
          <p className="text-sm text-muted-foreground font-medium">Curated content for you</p>
        </div>
      </div>

      <div className="space-y-4">
        {resources.map((resource, index) => {
          const config = typeConfig[resource.type];

          return (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-border/50 p-4 hover:bg-white dark:hover:bg-white/10 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                {resource.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-xs text-muted-foreground font-medium">{resource.description}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={cn("hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", config.color)}>
                  {resource.type}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
