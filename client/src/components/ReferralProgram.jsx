var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useState } from 'react';
import { Gift, Copy, Share2, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
export function ReferralProgram() {
    var _this = this;
    var toast = useToast().toast;
    var referralCode = useState('PREET' + Math.random().toString(36).substr(2, 6).toUpperCase())[0];
    var referrals = useState(5)[0];
    var rewards = useState(250)[0]; // XP earned from referrals
    var referralLink = "https://preet-english.vercel.app?ref=".concat(referralCode);
    var copyToClipboard = function () {
        navigator.clipboard.writeText(referralLink);
        toast({
            title: 'Copied!',
            description: 'Referral link copied to clipboard',
        });
    };
    var shareReferral = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!navigator.share) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.share({
                            title: 'Learn English with Preet English',
                            text: 'Join me on Preet English - the best way to learn English for Hindi speakers!',
                            url: referralLink,
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log('Share cancelled');
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    copyToClipboard();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Gift className="w-8 h-8"/>
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
              <Users className="w-6 h-6 mb-2"/>
              <div className="text-3xl font-bold">{referrals}</div>
              <div className="text-sm">Friends Referred</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <Award className="w-6 h-6 mb-2"/>
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
            <input type="text" value={referralLink} readOnly className="flex-1 px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900"/>
            <Button onClick={copyToClipboard} variant="outline">
              <Copy className="w-4 h-4"/>
            </Button>
            <Button onClick={shareReferral}>
              <Share2 className="w-4 h-4"/>
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
    </div>);
}
