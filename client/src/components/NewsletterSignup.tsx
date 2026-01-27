import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setSubscribed(true);
      setLoading(false);
      
      // Store in localStorage
      localStorage.setItem('newsletter_subscribed', 'true');
      localStorage.setItem('newsletter_email', email);
    }, 1000);
  };

  if (subscribed) {
    return (
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
            सदस्यता सफल! (Subscribed!)
          </h3>
          <p className="text-green-700 dark:text-green-300">
            Thank you for subscribing! You'll receive updates about new lessons, features, and tips.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-600" />
          <span>समाचार पत्र (Newsletter)</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Get weekly English learning tips, new lessons, and exclusive content delivered to your inbox!
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                'Subscribing...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </form>

        {/* Benefits */}
        <div className="mt-6 space-y-2">
          <p className="font-semibold text-sm">You'll receive:</p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>✅ Weekly learning tips</li>
            <li>✅ New lesson notifications</li>
            <li>✅ Exclusive content</li>
            <li>✅ Community highlights</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
