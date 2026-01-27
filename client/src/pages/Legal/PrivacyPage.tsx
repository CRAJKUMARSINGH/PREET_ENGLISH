import React from 'react';
import { Card } from '../../components/ui/card';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to App
          </Button>
          
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-[#1CE783]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                गोपनीयता नीति - PREET_ENGLISH
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            Last updated: January 11, 2026
          </p>
        </div>

        {/* Content */}
        <Card className="p-8 prose prose-gray dark:prose-invert max-w-none">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Overview / अवलोकन
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                PREET_ENGLISH is committed to protecting your privacy and personal data. 
                This policy explains how we collect, use, and protect your information when you use our English learning platform.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                PREET_ENGLISH आपकी गोपनीयता और व्यक्तिगत डेटा की सुरक्षा के लिए प्रतिबद्ध है। 
                यह नीति बताती है कि हम आपकी जानकारी कैसे एकत्र, उपयोग और सुरक्षित करते हैं।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Information We Collect / हम जो जानकारी एकत्र करते हैं
              </h2>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Account Information
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>Username and email address</li>
                <li>Password (encrypted and never stored in plain text)</li>
                <li>Profile preferences and settings</li>
                <li>Learning progress and achievements</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Learning Data
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>Lesson completion status and scores</li>
                <li>Speaking practice recordings (processed locally, not stored)</li>
                <li>Time spent on lessons and activities</li>
                <li>XP points, streaks, and gamification data</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Technical Information
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Device type and browser information</li>
                <li>IP address and general location (country/region)</li>
                <li>Usage patterns and feature interactions</li>
                <li>Error logs and performance data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How We Use Your Information / हम आपकी जानकारी का उपयोग कैसे करते हैं
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li><strong>Provide Learning Services:</strong> Track progress, personalize lessons, generate AI feedback</li>
                <li><strong>Improve Platform:</strong> Analyze usage patterns to enhance user experience</li>
                <li><strong>Communication:</strong> Send important updates about your account or new features</li>
                <li><strong>Security:</strong> Protect against fraud, abuse, and unauthorized access</li>
                <li><strong>Legal Compliance:</strong> Meet regulatory requirements and respond to legal requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Data Sharing and Third Parties / डेटा साझाकरण और तृतीय पक्ष
              </h2>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  ✅ We DO NOT sell your personal data to advertisers or marketing companies.
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We only share data with trusted service providers:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li><strong>OpenAI:</strong> For AI-powered feedback and story generation (anonymized)</li>
                <li><strong>Vercel/Database Providers:</strong> For hosting and data storage</li>
                <li><strong>Analytics Services:</strong> For usage statistics (with your consent)</li>
                <li><strong>Legal Authorities:</strong> Only when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Your Rights / आपके अधिकार
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">GDPR Rights (EU Users)</h3>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Access your data</li>
                    <li>• Correct inaccurate data</li>
                    <li>• Delete your account</li>
                    <li>• Data portability</li>
                    <li>• Withdraw consent</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">CCPA Rights (California Users)</h3>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Know what data we collect</li>
                    <li>• Delete personal information</li>
                    <li>• Opt-out of data sales</li>
                    <li>• Non-discrimination</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                To exercise these rights, contact us at privacy@preetenglish.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Data Security / डेटा सुरक्षा
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>End-to-end encryption for sensitive data</li>
                <li>Regular security audits and updates</li>
                <li>Secure hosting with industry-standard protections</li>
                <li>Limited access to personal data (need-to-know basis)</li>
                <li>Automatic session timeouts and secure authentication</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Children's Privacy / बच्चों की गोपनीयता
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                PREET_ENGLISH is designed for users 13 years and older. We do not knowingly collect 
                personal information from children under 13. If you believe a child has provided 
                personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Contact Us / संपर्क करें
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  For privacy-related questions or to exercise your rights:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li><strong>Email:</strong> privacy@preetenglish.com</li>
                  <li><strong>Response Time:</strong> Within 30 days</li>
                  <li><strong>Data Protection Officer:</strong> Available upon request</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Updates to This Policy / इस नीति में अपडेट
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this privacy policy to reflect changes in our practices or legal requirements. 
                We will notify users of significant changes via email or in-app notifications.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
}