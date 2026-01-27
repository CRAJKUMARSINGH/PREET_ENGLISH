import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { X, Cookie, Shield, BarChart3 } from 'lucide-react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem('preet-cookie-consent');
    if (!savedConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(fullConsent);
  };

  const handleAcceptSelected = () => {
    saveConsent(consent);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveConsent(minimalConsent);
  };

  const saveConsent = (consentData: CookieConsent) => {
    localStorage.setItem('preet-cookie-consent', JSON.stringify({
      ...consentData,
      timestamp: new Date().toISOString(),
    }));
    
    // Initialize analytics based on consent
    if (consentData.analytics) {
      // Initialize Google Analytics or other analytics
      console.log('Analytics enabled');
    }
    
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <Card className="w-full max-w-2xl bg-white dark:bg-gray-900 border-2 border-[#1CE783]/20 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-[#1CE783]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Cookie Settings
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  कुकी सेटिंग्स
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="space-y-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <p className="mb-2">
                We use cookies to enhance your learning experience on PREET_ENGLISH. 
                Choose which cookies you'd like to accept.
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                हम PREET_ENGLISH पर आपके सीखने के अनुभव को बेहतर बनाने के लिए कुकीज़ का उपयोग करते हैं।
              </p>
            </div>

            {/* Cookie Categories */}
            {showDetails && (
              <div className="space-y-3 border-t pt-4">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Necessary Cookies
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Required for login, progress tracking, and core functionality.
                        <br />
                        लॉगिन, प्रगति ट्रैकिंग और मुख्य कार्यक्षमता के लिए आवश्यक।
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-green-600 font-medium">Always On</div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Analytics Cookies
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Help us understand how you use the platform to improve lessons.
                        <br />
                        पाठों को बेहतर बनाने के लिए प्लेटफॉर्म के उपयोग को समझने में मदद करता है।
                      </p>
                    </div>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      onChange={(e) => setConsent(prev => ({ ...prev, analytics: e.target.checked }))}
                      className="rounded border-gray-300 text-[#1CE783] focus:ring-[#1CE783]"
                    />
                  </label>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Cookie className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Marketing Cookies
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Personalize content and show relevant learning recommendations.
                        <br />
                        सामग्री को व्यक्तिगत बनाना और प्रासंगिक सिफारिशें दिखाना।
                      </p>
                    </div>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      onChange={(e) => setConsent(prev => ({ ...prev, marketing: e.target.checked }))}
                      className="rounded border-gray-300 text-[#1CE783] focus:ring-[#1CE783]"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleAcceptAll}
                className="bg-[#1CE783] hover:bg-[#1CE783]/90 text-black font-medium"
              >
                Accept All Cookies
              </Button>
              
              {showDetails && (
                <Button
                  onClick={handleAcceptSelected}
                  variant="outline"
                  className="border-[#1CE783] text-[#1CE783] hover:bg-[#1CE783]/10"
                >
                  Save Preferences
                </Button>
              )}
              
              <Button
                onClick={handleRejectAll}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Reject All
              </Button>
              
              <Button
                onClick={() => setShowDetails(!showDetails)}
                variant="ghost"
                className="text-gray-600 hover:text-gray-800"
              >
                {showDetails ? 'Hide Details' : 'Customize'}
              </Button>
            </div>

            {/* Privacy Policy Link */}
            <div className="text-xs text-gray-500 dark:text-gray-400 pt-2 border-t">
              By continuing, you agree to our{' '}
              <a href="/legal/privacy" className="text-[#1CE783] hover:underline">
                Privacy Policy
              </a>{' '}
              and{' '}
              <a href="/legal/terms" className="text-[#1CE783] hover:underline">
                Terms of Service
              </a>
              .
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}