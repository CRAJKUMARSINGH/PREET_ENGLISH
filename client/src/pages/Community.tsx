import { useState } from 'react';
import { CommunityForum } from '@/components/CommunityForum';
import { ReferralProgram } from '@/components/ReferralProgram';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { LaunchCountdown } from '@/components/LaunchCountdown';
import { MessageSquare, Gift, Mail, Rocket } from 'lucide-react';

export default function Community() {
  const [activeTab, setActiveTab] = useState<'forum' | 'referral' | 'newsletter' | 'launch'>('forum');

  const tabs = [
    { id: 'forum' as const, label: 'Forum', icon: MessageSquare },
    { id: 'referral' as const, label: 'Referrals', icon: Gift },
    { id: 'newsletter' as const, label: 'Newsletter', icon: Mail },
    { id: 'launch' as const, label: 'Launch', icon: Rocket },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          समुदाय (Community)
        </h1>
        <p className="text-lg text-muted-foreground">
          Connect, share, and grow together
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
                  ? 'bg-blue-600 text-white shadow-lg'
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
        {activeTab === 'forum' && <CommunityForum />}
        {activeTab === 'referral' && <ReferralProgram />}
        {activeTab === 'newsletter' && <NewsletterSignup />}
        {activeTab === 'launch' && <LaunchCountdown />}
      </div>
    </div>
  );
}
