import { useState, useEffect } from 'react';
import { Rocket, Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function LaunchCountdown() {
  const launchDate = new Date('2025-01-15T00:00:00'); // Set your launch date
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isLaunched, setIsLaunched] = useState(false);

  function calculateTimeLeft(): TimeLeft {
    const difference = +launchDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsLaunched(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLaunched) {
    return (
      <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
        <CardContent className="pt-6 text-center">
          <Rocket className="w-16 h-16 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold mb-2">🎉 We're Live!</h2>
          <p className="text-lg">Preet English is now available to everyone!</p>
          <Button className="mt-4 bg-white text-green-600 hover:bg-gray-100">
            Start Learning Now
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Rocket className="w-8 h-8" />
          Launch Countdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold">{timeLeft.days}</div>
            <div className="text-sm">Days</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold">{timeLeft.hours}</div>
            <div className="text-sm">Hours</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold">{timeLeft.minutes}</div>
            <div className="text-sm">Minutes</div>
          </div>
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-4xl font-bold">{timeLeft.seconds}</div>
            <div className="text-sm">Seconds</div>
          </div>
        </div>

        {/* Launch Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5" />
            <span>Launch Date: January 15, 2025</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" />
            <span>Time: 12:00 AM IST</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5" />
            <span>1,234 people waiting</span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="mb-4">Get notified when we launch!</p>
          <Button className="bg-white text-purple-600 hover:bg-gray-100">
            Notify Me
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
