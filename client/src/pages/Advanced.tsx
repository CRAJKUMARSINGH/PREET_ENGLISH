import { useState } from 'react';
import { PersonalizedLearningPath } from '@/components/PersonalizedLearningPath';
import { OfflineMode } from '@/components/OfflineMode';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import { Target, WifiOff, Mic } from 'lucide-react';

export default function Advanced() {
  const [activeTab, setActiveTab] = useState<'learning' | 'offline' | 'voice'>('learning');

  const tabs = [
    { id: 'learning' as const, label: 'Learning Path', icon: Target },
    { id: 'offline' as const, label: 'Offline Mode', icon: WifiOff },
    { id: 'voice' as const, label: 'Voice Assistant', icon: Mic },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          उन्नत सुविधाएं (Advanced Features)
        </h1>
        <p className="text-lg text-muted-foreground">
          Personalized learning, offline access, and voice control
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="animate-in fade-in duration-300">
        {activeTab === 'learning' && <PersonalizedLearningPath />}
        {activeTab === 'offline' && <OfflineMode />}
        {activeTab === 'voice' && <VoiceAssistant />}
      </div>
    </div>
  );
}
