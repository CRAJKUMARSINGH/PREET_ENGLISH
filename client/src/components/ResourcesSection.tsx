import { ExternalLink, Play, Headphones, BookOpen, Globe } from "lucide-react";
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
    video: { color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400", icon: Play },
    audio: { color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400", icon: Headphones },
    reading: { color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", icon: BookOpen },
    interactive: { color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400", icon: Globe }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-xl">
          <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">अतिरिक्त संसाधन</h2>
          <p className="text-sm text-muted-foreground">Recommended Learning Resources</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => {
          const config = typeConfig[resource.type];
          const TypeIcon = config.icon;
          
          return (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{resource.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{resource.titleHindi}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{resource.description}</p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <span className={cn("px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1", config.color)}>
                  <TypeIcon className="w-3 h-3" />
                  {resource.type === 'video' ? 'वीडियो' : 
                   resource.type === 'audio' ? 'ऑडियो' : 
                   resource.type === 'reading' ? 'पढ़ना' : 'इंटरैक्टिव'}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
