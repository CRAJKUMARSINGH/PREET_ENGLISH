import { Video, Bot, BarChart3, Users, Rocket } from "lucide-react";

const upcomingFeatures = [
  {
    icon: Video,
    title: "Hindi-Guided Videos",
    titleHindi: "हिंदी-गाइडेड वीडियो",
    description: "Short video lessons with Hindi explanations",
    emoji: "🎥",
    color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
  },
  {
    icon: Bot,
    title: "AI Speaking Feedback",
    titleHindi: "AI स्पीकिंग फीडबैक",
    description: "Get instant feedback on your pronunciation",
    emoji: "🤖",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
  },
  {
    icon: BarChart3,
    title: "Fluency Tracker",
    titleHindi: "फ्लुएंसी ट्रैकर",
    description: "Track your speaking improvement over time",
    emoji: "📈",
    color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
  },
  {
    icon: Users,
    title: "Pair Speaking Practice",
    titleHindi: "जोड़ी अभ्यास",
    description: "Practice with other learners",
    emoji: "🧑‍🤝‍🧑",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
  }
];

export function ComingSoon() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-2 rounded-xl">
          <Rocket className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">🆕 Coming Soon</h2>
          <p className="text-sm text-muted-foreground">जल्द आ रहा है</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {upcomingFeatures.map((feature, index) => (
          <div 
            key={index}
            className="relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 opacity-75 hover:opacity-100 transition-all"
          >
            {/* Coming Soon Badge */}
            <div className="absolute top-2 right-2">
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-medium rounded-full">
                Soon
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl ${feature.color}`}>
                <feature.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                  {feature.emoji} {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-1">{feature.titleHindi}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          🙏 Stay tuned for exciting updates!
        </p>
      </div>
    </div>
  );
}
