import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
// Removed unused Button import
import { Trophy, Crown, Medal, Award, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
var leagueConfig = {
    Bronze: { color: 'bg-amber-600', icon: Medal, minXP: 0 },
    Silver: { color: 'bg-gray-400', icon: Award, minXP: 500 },
    Gold: { color: 'bg-yellow-500', icon: Trophy, minXP: 1500 },
    Platinum: { color: 'bg-purple-500', icon: Crown, minXP: 3000 },
    Diamond: { color: 'bg-blue-500', icon: Crown, minXP: 5000 }
};
export function LeagueSystem() {
    var user = useAuth().user;
    var _a = useState(null), leagueData = _a[0], setLeagueData = _a[1];
    var _b = useState(true), loading = _b[0], setLoading = _b[1];
    useEffect(function () {
        // Simulate league data - in real app, fetch from API
        var mockLeagueData = {
            currentLeague: 'Gold',
            position: 7,
            weeklyXP: 1250,
            promotionThreshold: 10, // Top 10 get promoted
            demotionThreshold: 5, // Bottom 5 get demoted
            timeLeft: '2 days 14 hours',
            participants: [
                { id: '1', username: 'RahulSpeaks', weeklyXP: 2150, totalXP: 8500, position: 1 },
                { id: '2', username: 'PriyaEnglish', weeklyXP: 1980, totalXP: 7200, position: 2 },
                { id: '3', username: 'AmitLearner', weeklyXP: 1850, totalXP: 6800, position: 3 },
                { id: '4', username: 'SuneetaFluent', weeklyXP: 1720, totalXP: 6400, position: 4 },
                { id: '5', username: 'VikasEnglish', weeklyXP: 1650, totalXP: 6100, position: 5 },
                { id: '6', username: 'NehaLearns', weeklyXP: 1480, totalXP: 5800, position: 6 },
                { id: '7', username: (user === null || user === void 0 ? void 0 : user.username) || 'You', weeklyXP: 1250, totalXP: 5200, position: 7 },
                { id: '8', username: 'RajeshSpeaks', weeklyXP: 1180, totalXP: 4900, position: 8 },
                { id: '9', username: 'KavitaEnglish', weeklyXP: 1050, totalXP: 4600, position: 9 },
                { id: '10', username: 'ManishLearner', weeklyXP: 980, totalXP: 4300, position: 10 },
                { id: '11', username: 'ShaliniSpeaks', weeklyXP: 850, totalXP: 4000, position: 11 },
                { id: '12', username: 'DeepakEnglish', weeklyXP: 720, totalXP: 3700, position: 12 },
                { id: '13', username: 'AnuLearns', weeklyXP: 650, totalXP: 3400, position: 13 },
                { id: '14', username: 'SureshSpeaks', weeklyXP: 580, totalXP: 3100, position: 14 },
                { id: '15', username: 'MeenaEnglish', weeklyXP: 520, totalXP: 2800, position: 15 }
            ]
        };
        setTimeout(function () {
            setLeagueData(mockLeagueData);
            setLoading(false);
        }, 1000);
    }, [user]);
    if (loading) {
        return (<Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5"/>
            Loading League...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>);
    }
    if (!leagueData)
        return null;
    var currentLeague = leagueData.currentLeague, position = leagueData.position, weeklyXP = leagueData.weeklyXP, participants = leagueData.participants, promotionThreshold = leagueData.promotionThreshold, timeLeft = leagueData.timeLeft;
    var LeagueIcon = leagueConfig[currentLeague].icon;
    var leagueColor = leagueConfig[currentLeague].color;
    var getPositionStatus = function (pos) {
        if (pos <= promotionThreshold)
            return { status: 'promotion', color: 'text-green-600', text: 'Promotion Zone' };
        if (pos > participants.length - 5)
            return { status: 'demotion', color: 'text-red-600', text: 'Demotion Zone' };
        return { status: 'safe', color: 'text-blue-600', text: 'Safe Zone' };
    };
    var positionStatus = getPositionStatus(position);
    return (<div className="space-y-6">
      {/* League Header */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={"p-2 rounded-full ".concat(leagueColor, " text-white")}>
                <LeagueIcon className="w-6 h-6"/>
              </div>
              <div>
                <h3 className="text-xl font-bold">{currentLeague} League</h3>
                <p className="text-sm text-muted-foreground">Position #{position} of {participants.length}</p>
              </div>
            </div>
            <Badge variant={positionStatus.status === 'promotion' ? 'default' : positionStatus.status === 'demotion' ? 'destructive' : 'secondary'}>
              {positionStatus.text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Weekly Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Weekly XP: {weeklyXP}</span>
              <span className="text-sm text-muted-foreground">Time left: {timeLeft}</span>
            </div>
            <Progress value={(weeklyXP / 2500) * 100} className="h-2"/>
          </div>

          {/* Position Info */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-bold text-green-600">Top {promotionThreshold}</div>
              <div className="text-xs text-muted-foreground">Get Promoted</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-lg font-bold text-blue-600">#{position}</div>
              <div className="text-xs text-muted-foreground">Your Position</div>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-lg font-bold text-red-600">Bottom 5</div>
              <div className="text-xs text-muted-foreground">Get Demoted</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5"/>
            Weekly Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {participants.map(function (participant) {
            var isCurrentUser = participant.username === (user === null || user === void 0 ? void 0 : user.username) || participant.username === 'You';
            var posStatus = getPositionStatus(participant.position);
            return (<div key={participant.id} className={"flex items-center justify-between p-3 rounded-lg border ".concat(isCurrentUser ? 'bg-primary/5 border-primary/20' : 'bg-muted/30')}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {participant.position <= 3 && (<div className={"w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ".concat(participant.position === 1 ? 'bg-yellow-500' :
                        participant.position === 2 ? 'bg-gray-400' :
                            'bg-amber-600')}>
                          {participant.position}
                        </div>)}
                      {participant.position > 3 && (<div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                          {participant.position}
                        </div>)}
                    </div>
                    <div>
                      <div className="font-medium">{participant.username}</div>
                      <div className="text-xs text-muted-foreground">
                        Total: {participant.totalXP.toLocaleString()} XP
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{participant.weeklyXP}</div>
                    <div className={"text-xs ".concat(posStatus.color)}>
                      {posStatus.status === 'promotion' ? '↗️' : posStatus.status === 'demotion' ? '↘️' : '→'}
                    </div>
                  </div>
                </div>);
        })}
          </div>
        </CardContent>
      </Card>

      {/* League Info */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5"/>
            How Leagues Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <strong>Promotion:</strong> Top {promotionThreshold} users advance to the next league
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div>
              <strong>Demotion:</strong> Bottom 5 users drop to the previous league
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <strong>Weekly Reset:</strong> Competition resets every Monday at midnight
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <strong>Earn XP:</strong> Complete lessons, exercises, and challenges to climb the leaderboard
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);
}
