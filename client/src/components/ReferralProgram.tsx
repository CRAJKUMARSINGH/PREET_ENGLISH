import { useState } from 'react';
import { Gift, Copy, Share2, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export function ReferralProgram() {
  const { toast } = useToast();
  const [referralCode] = useState('PREET' + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [referrals] = useState(5);
  const [rewards] = useState(250); // XP earned from referrals

  const referralLink = `https://preet-english.vercel.app?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: 'Copied!',
      description: 'Referral link copied to clipboard',
    });
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Learn English with Preet English',
          text: 'Join me on Preet English - the best way to learn English for Hindi speakers!',
          url: referralLink,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Gift className="w-8 h-8" />
            रेफरल प्रोग्राम (Referral Program)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Invite friends and earn rewards! Get 50 XP for each friend who joins.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <Users className="w-6 h-6 mb-2" />
              <div className="text-3xl font-bold">{referrals}</div>
              <div className="text-sm">Friends Referred</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <Award className="w-6 h-6 mb-2" />
              <div className="text-3xl font-bold">{rewards}</div>
              <div className="text-sm">XP Earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Link */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Link</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"
            />
            <Button onClick={copyToClipboard} variant="outline">
              <Copy className="w-4 h-4" />
            </Button>
            <Button onClick={shareReferral}>
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold mb-2">How it works:</h4>
            <ol className="space-y-1 text-sm text-muted-foreground">
              <li>1. Share your unique referral link</li>
              <li>2. Your friend signs up using your link</li>
              <li>3. You both get 50 XP bonus!</li>
              <li>4. Keep referring to unlock special badges</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Tiers */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-bronze rounded-full flex items-center justify-center text-xl">
                  🥉
                </div>
                <div>
                  <p className="font-semibold">Bronze Referrer</p>
                  <p className="text-sm text-muted-foreground">5 referrals</p>
                </div>
              </div>
              <span className={referrals >= 5 ? 'text-green-600' : 'text-gray-400'}>
                {referrals >= 5 ? '✓ Unlocked' : 'Locked'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-silver rounded-full flex items-center justify-center text-xl">
                  🥈
                </div>
                <div>
                  <p className="font-semibold">Silver Referrer</p>
                  <p className="text-sm text-muted-foreground">10 referrals</p>
                </div>
              </div>
              <span className={referrals >= 10 ? 'text-green-600' : 'text-gray-400'}>
                {referrals >= 10 ? '✓ Unlocked' : 'Locked'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-xl">
                  🥇
                </div>
                <div>
                  <p className="font-semibold">Gold Referrer</p>
                  <p className="text-sm text-muted-foreground">25 referrals</p>
                </div>
              </div>
              <span className={referrals >= 25 ? 'text-green-600' : 'text-gray-400'}>
                {referrals >= 25 ? '✓ Unlocked' : 'Locked'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
