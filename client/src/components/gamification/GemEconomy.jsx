var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gem, ShoppingCart, Zap, Shield, Eye, Clock, Star, Gift } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
var powerUps = [
    {
        id: 'streak-freeze',
        name: 'Streak Freeze',
        description: 'Protect your streak for one day',
        cost: 10,
        icon: Shield,
        category: 'streak',
        available: true
    },
    {
        id: 'hint-unlock',
        name: 'Hint Unlock',
        description: 'Get a hint for difficult questions',
        cost: 5,
        icon: Eye,
        category: 'learning',
        available: true
    },
    {
        id: 'double-xp',
        name: 'Double XP',
        description: '2x XP for next 30 minutes',
        cost: 20,
        icon: Zap,
        category: 'bonus',
        available: true
    },
    {
        id: 'extra-time',
        name: 'Extra Time',
        description: '+30 seconds for timed exercises',
        cost: 15,
        icon: Clock,
        category: 'learning',
        available: true
    },
    {
        id: 'bonus-gems',
        name: 'Gem Multiplier',
        description: '1.5x gems for next hour',
        cost: 25,
        icon: Star,
        category: 'bonus',
        available: true
    }
];
var gemEarningMethods = [
    { activity: 'Complete Lesson', gems: 5, icon: '📚' },
    { activity: 'Perfect Score', gems: 10, icon: '🎯' },
    { activity: 'Daily Streak', gems: 15, icon: '🔥' },
    { activity: 'Weekly Goal', gems: 25, icon: '🏆' },
    { activity: 'AI Conversation', gems: 8, icon: '🤖' },
    { activity: 'Speaking Exercise', gems: 12, icon: '🎤' },
    { activity: 'Challenge Win', gems: 20, icon: '⚔️' },
    { activity: 'League Promotion', gems: 50, icon: '👑' }
];
export function GemEconomy() {
    var user = useAuth().user;
    var _a = useState({
        total: 145,
        earned: 320,
        spent: 175,
        dailyEarned: 25,
        weeklyEarned: 180
    }), gemData = _a[0], setGemData = _a[1];
    var _b = useState('all'), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = useState(null), purchaseAnimation = _c[0], setPurchaseAnimation = _c[1];
    var handlePurchase = function (powerUp) {
        if (gemData.total >= powerUp.cost) {
            setGemData(function (prev) { return (__assign(__assign({}, prev), { total: prev.total - powerUp.cost, spent: prev.spent + powerUp.cost })); });
            setPurchaseAnimation(powerUp.id);
            setTimeout(function () { return setPurchaseAnimation(null); }, 2000);
            // Here you would typically activate the power-up
            console.log("Purchased ".concat(powerUp.name, " for ").concat(powerUp.cost, " gems"));
        }
    };
    var filteredPowerUps = selectedCategory === 'all'
        ? powerUps
        : powerUps.filter(function (p) { return p.category === selectedCategory; });
    var getCategoryColor = function (category) {
        switch (category) {
            case 'learning': return 'bg-blue-500';
            case 'streak': return 'bg-orange-500';
            case 'bonus': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };
    return (<div className="space-y-6">
      {/* Gem Balance Header */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Gem className="w-6 h-6"/>
              </div>
              <div>
                <h3 className="text-2xl font-bold">{gemData.total} Gems</h3>
                <p className="text-purple-100">Your gem balance</p>
              </div>
            </div>
            <Gift className="w-8 h-8 opacity-50"/>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">{gemData.earned}</div>
              <div className="text-xs text-purple-100">Total Earned</div>
            </div>
            <div>
              <div className="text-lg font-bold">{gemData.spent}</div>
              <div className="text-xs text-purple-100">Total Spent</div>
            </div>
            <div>
              <div className="text-lg font-bold">{gemData.dailyEarned}</div>
              <div className="text-xs text-purple-100">Today</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Earn Gems */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500"/>
            How to Earn Gems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gemEarningMethods.map(function (method, index) { return (<div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-2xl mb-1">{method.icon}</div>
                <div className="font-medium text-sm">{method.activity}</div>
                <div className="text-xs text-muted-foreground">+{method.gems} gems</div>
              </div>); })}
          </div>
        </CardContent>
      </Card>

      {/* Power-ups Store */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5"/>
              Power-ups Store
            </div>
            <div className="flex gap-2">
              <Button variant={selectedCategory === 'all' ? 'default' : 'outline'} size="sm" onClick={function () { return setSelectedCategory('all'); }}>
                All
              </Button>
              <Button variant={selectedCategory === 'learning' ? 'default' : 'outline'} size="sm" onClick={function () { return setSelectedCategory('learning'); }}>
                Learning
              </Button>
              <Button variant={selectedCategory === 'streak' ? 'default' : 'outline'} size="sm" onClick={function () { return setSelectedCategory('streak'); }}>
                Streak
              </Button>
              <Button variant={selectedCategory === 'bonus' ? 'default' : 'outline'} size="sm" onClick={function () { return setSelectedCategory('bonus'); }}>
                Bonus
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPowerUps.map(function (powerUp) {
            var Icon = powerUp.icon;
            var canAfford = gemData.total >= powerUp.cost;
            var isAnimating = purchaseAnimation === powerUp.id;
            return (<div key={powerUp.id} className={"p-4 border rounded-lg transition-all ".concat(isAnimating ? 'scale-105 shadow-lg bg-green-50 dark:bg-green-900/20' : '', " ").concat(canAfford ? 'hover:shadow-md' : 'opacity-60')}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={"p-2 rounded-full ".concat(getCategoryColor(powerUp.category), " text-white")}>
                      <Icon className="w-4 h-4"/>
                    </div>
                    <Badge variant={powerUp.category === 'bonus' ? 'default' : 'secondary'}>
                      {powerUp.category}
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold mb-1">{powerUp.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{powerUp.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Gem className="w-4 h-4 text-purple-500"/>
                      <span className="font-bold">{powerUp.cost}</span>
                    </div>
                    <Button size="sm" disabled={!canAfford || !powerUp.available} onClick={function () { return handlePurchase(powerUp); }} className={isAnimating ? 'bg-green-500 hover:bg-green-600' : ''}>
                      {isAnimating ? '✓ Purchased!' : 'Buy'}
                    </Button>
                  </div>
                </div>);
        })}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Gem Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500"/>
            Weekly Gem Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress: {gemData.weeklyEarned}/250 gems</span>
              <span className="text-sm text-muted-foreground">
                {250 - gemData.weeklyEarned} gems to go
              </span>
            </div>
            <Progress value={(gemData.weeklyEarned / 250) * 100} className="h-3"/>
            <div className="text-center">
              <Badge variant="outline" className="text-xs">
                🎁 Bonus: 50 gems for reaching weekly goal!
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);
}
