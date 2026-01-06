import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernBadge from '../ui/ModernBadge';
import ModernButton from '../ui/ModernButton';
import ProgressRing from '../ui/ProgressRing';
import AnimatedCounter from '../ui/AnimatedCounter';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lessonsCompleted: number;
  rank: number;
  rankChange: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
  location?: string;
  achievements: number;
}

interface SocialLeaderboardProps {
  className?: string;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'all-time';
  showFriends?: boolean;
}

const SocialLeaderboard: React.FC<SocialLeaderboardProps> = ({
  className,
  timeframe = 'weekly',
  showFriends = false,
}) => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [currentTimeframe, setCurrentTimeframe] = useState(timeframe);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null);
  
  useEffect(() => {
    loadLeaderboardData();
  }, [currentTimeframe, showFriends]);
  
  const loadLeaderboardData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock leaderboard data
    const mockUsers: LeaderboardUser[] = [
      {
        id: '1',
        name: 'Priya Sharma',
        avatar: '👩‍💼',
        xp: 15420,
        level: 28,
        streak: 45,
        lessonsCompleted: 156,
        rank: 1,
        rankChange: 'same',
        location: 'Mumbai',
        achievements: 23
      },
      {
        id: '2',
        name: 'Rahul Kumar',
        avatar: '👨‍💻',
        xp: 14890,
        level: 27,
        streak: 32,
        lessonsCompleted: 142,
        rank: 2,
        rankChange: 'up',
        location: 'Delhi',
        achievements: 19
      },
      {
        id: '3',
        name: 'Anita Patel',
        avatar: '👩‍🎓',
        xp: 13750,
        level: 25,
        streak: 28,
        lessonsCompleted: 134,
        rank: 3,
        rankChange: 'down',
        location: 'Ahmedabad',
        achievements: 21
      },
      {
        id: '4',
        name: 'Vikram Singh',
        avatar: '👨‍🏫',
        xp: 12980,
        level: 24,
        streak: 41,
        lessonsCompleted: 128,
        rank: 4,
        rankChange: 'up',
        location: 'Jaipur',
        achievements: 18
      },
      {
        id: '5',
        name: 'Sunita Gupta',
        avatar: '👩‍⚕️',
        xp: 11650,
        level: 22,
        streak: 19,
        lessonsCompleted: 115,
        rank: 5,
        rankChange: 'same',
        location: 'Pune',
        achievements: 16
      },
      {
        id: 'current',
        name: 'You',
        avatar: '🎯',
        xp: 8420,
        level: 18,
        streak: 12,
        lessonsCompleted: 89,
        rank: 12,
        rankChange: 'up',
        location: 'Udaipur',
        achievements: 11,
        isCurrentUser: true
      }
    ];
    
    setUsers(mockUsers.slice(0, 5));
    setCurrentUser(mockUsers.find(u => u.isCurrentUser) || null);
    setIsLoading(false);
  };
  
  const getRankChangeIcon = (change: 'up' | 'down' | 'same') => {
    switch (change) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'same': return '➖';
    }
  };
  
  const getRankChangeColor = (change: 'up' | 'down' | 'same') => {
    switch (change) {
      case 'up': return 'text-success-600 dark:text-success-400';
      case 'down': return 'text-error-600 dark:text-error-400';
      case 'same': return 'text-neutral-600 dark:text-neutral-400';
    }
  };
  
  const getLevelColor = (level: number) => {
    if (level >= 25) return 'from-yellow-400 to-orange-500';
    if (level >= 20) return 'from-purple-400 to-pink-500';
    if (level >= 15) return 'from-blue-400 to-indigo-500';
    if (level >= 10) return 'from-green-400 to-emerald-500';
    return 'from-neutral-400 to-neutral-500';
  };
  
  const timeframes = [
    { key: 'daily', label: 'Today', icon: '📅' },
    { key: 'weekly', label: 'This Week', icon: '📊' },
    { key: 'monthly', label: 'This Month', icon: '📈' },
    { key: 'all-time', label: 'All Time', icon: '🏆' }
  ] as const;
  
  if (isLoading) {
    return (
      <ModernCard variant="glass" className={cn('p-6', className)}>
        <div className="space-y-4">
          <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-700 rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                </div>
                <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </ModernCard>
    );
  }
  
  return (
    <ModernCard variant="glass" className={cn('p-6 space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white text-lg">
            🏆
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Leaderboard
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Compete with other learners
            </p>
          </div>
        </div>
        
        <ModernButton
          variant="outline"
          size="sm"
          onClick={() => setCurrentTimeframe(currentTimeframe === 'weekly' ? 'monthly' : 'weekly')}
        >
          Switch View
        </ModernButton>
      </div>
      
      {/* Timeframe Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {timeframes.map((tf) => (
          <button
            key={tf.key}
            onClick={() => setCurrentTimeframe(tf.key)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
              currentTimeframe === tf.key
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            )}
          >
            <span>{tf.icon}</span>
            <span>{tf.label}</span>
          </button>
        ))}
      </div>
      
      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {users.slice(0, 3).map((user, index) => (
          <div key={user.id} className="text-center">
            <div className="relative mb-3">
              <div className={cn(
                'w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl',
                index === 0 && 'bg-gradient-to-br from-yellow-400 to-yellow-600 animate-glow',
                index === 1 && 'bg-gradient-to-br from-gray-300 to-gray-500',
                index === 2 && 'bg-gradient-to-br from-amber-600 to-amber-800'
              )}>
                {user.avatar}
              </div>
              <div className={cn(
                'absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold',
                index === 0 && 'bg-yellow-500',
                index === 1 && 'bg-gray-400',
                index === 2 && 'bg-amber-600'
              )}>
                {index + 1}
              </div>
            </div>
            
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
              {user.name}
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-2">
              {user.location}
            </p>
            
            <div className="space-y-1">
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                <AnimatedCounter value={user.xp} suffix=" XP" />
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <ModernBadge variant="primary" size="sm">
                  L{user.level}
                </ModernBadge>
                <span className="text-neutral-600 dark:text-neutral-400">
                  🔥{user.streak}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Full Leaderboard */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Top Learners
        </h4>
        
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className={cn(
                'flex items-center gap-4 p-3 rounded-lg transition-all duration-200',
                user.isCurrentUser
                  ? 'bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800'
                  : 'bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )}
            >
              {/* Rank */}
              <div className="flex items-center gap-2 min-w-[3rem]">
                <span className={cn(
                  'text-lg font-bold',
                  user.rank <= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-600 dark:text-neutral-400'
                )}>
                  #{user.rank}
                </span>
                <span className={cn('text-sm', getRankChangeColor(user.rankChange))}>
                  {getRankChangeIcon(user.rankChange)}
                </span>
              </div>
              
              {/* Avatar & Info */}
              <div className="flex items-center gap-3 flex-1">
                <div className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center text-xl',
                  `bg-gradient-to-br ${getLevelColor(user.level)}`
                )}>
                  {user.avatar}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {user.name}
                    </h5>
                    {user.isCurrentUser && (
                      <ModernBadge variant="primary" size="sm">
                        You
                      </ModernBadge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <span>📍 {user.location}</span>
                    <span>🏆 {user.achievements}</span>
                    <span>📚 {user.lessonsCompleted}</span>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="text-right">
                <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  <AnimatedCounter value={user.xp} />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ModernBadge variant="secondary" size="sm">
                    L{user.level}
                  </ModernBadge>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    🔥{user.streak}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current User Position (if not in top 5) */}
      {currentUser && currentUser.rank > 5 && (
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between p-3 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                #{currentUser.rank}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentUser.avatar}</span>
                <div>
                  <h5 className="font-semibold text-neutral-900 dark:text-neutral-100">
                    Your Position
                  </h5>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {currentUser.xp} XP • Level {currentUser.level}
                  </p>
                </div>
              </div>
            </div>
            
            <ModernButton variant="primary" size="sm">
              Climb Higher! 🚀
            </ModernButton>
          </div>
        </div>
      )}
      
      {/* Weekly Challenge */}
      <ModernCard variant="gradient" className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">
              🎯 Weekly Challenge
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Complete 10 lessons to earn bonus XP
            </p>
          </div>
          
          <div className="text-center">
            <ProgressRing
              progress={60}
              size="sm"
              color="success"
              showPercentage
            />
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
              6/10 lessons
            </p>
          </div>
        </div>
      </ModernCard>
    </ModernCard>
  );
};

export default SocialLeaderboard;