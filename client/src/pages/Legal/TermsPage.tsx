import React from 'react';
import { Card } from '../../components/ui/card';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

export function TermsPage() {
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
            <FileText className="h-8 w-8 text-[#1CE783]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Terms of Service
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                सेवा की शर्तें - PREET_ENGLISH
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
                Agreement to Terms / शर्तों से सहमति
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                By accessing and using PREET_ENGLISH, you agree to be bound by these Terms of Service 
                and all applicable laws and regulations. If you do not agree with any of these terms, 
                you are prohibited from using this service.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                PREET_ENGLISH का उपयोग करके, आप इन सेवा की शर्तों और सभी लागू कानूनों से बाध्य होने के लिए सहमत हैं।
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Description of Service / सेवा का विवरण
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                PREET_ENGLISH is an AI-powered English learning platform designed specifically for Hindi speakers. 
                Our service includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Interactive English lessons with Hindi translations</li>
                <li>AI-powered pronunciation feedback and conversation practice</li>
                <li>Gamified learning with XP, streaks, and achievements</li>
                <li>Progress tracking and personalized learning paths</li>
                <li>Speaking practice with Saraswati AI tutor</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                User Accounts / उपयोगकर्ता खाते
              </h2>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Account Creation
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>You must be at least 13 years old to create an account</li>
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the security of your password and account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Account Responsibilities
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>You are responsible for all activities under your account</li>
                <li>Do not share your account credentials with others</li>
                <li>Use the service only for personal, non-commercial learning purposes</li>
                <li>Respect other users and maintain appropriate conduct</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Acceptable Use / स्वीकार्य उपयोग
              </h2>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">✅ Permitted Uses</h3>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Learning English through our lessons and activities</li>
                  <li>• Practicing pronunciation and conversation skills</li>
                  <li>• Tracking your learning progress and achievements</li>
                  <li>• Providing feedback to improve the platform</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-red-800 dark:text-red-200 mb-2">❌ Prohibited Uses</h3>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                  <li>• Attempting to hack, reverse engineer, or exploit the platform</li>
                  <li>• Sharing inappropriate, offensive, or harmful content</li>
                  <li>• Creating multiple accounts to abuse free features</li>
                  <li>• Using automated tools or bots to interact with the service</li>
                  <li>• Violating any applicable laws or regulations</li>
                  <li>• Interfering with other users' learning experience</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Intellectual Property / बौद्धिक संपदा
              </h2>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Our Content
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                All content on PREET_ENGLISH, including lessons, exercises, AI-generated content, 
                design elements, and the Saraswati mascot, is owned by us or our licensors and 
                protected by copyright and other intellectual property laws.
              </p>

              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Your Content
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                You retain ownership of any content you create (such as speaking recordings or written responses). 
                By using our service, you grant us a limited license to use this content to provide 
                AI feedback and improve our services.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Note:</strong> Speaking recordings are processed locally for AI feedback 
                  and are not permanently stored on our servers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                AI Services and Limitations / AI सेवाएं और सीमाएं
              </h2>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                AI-Powered Features
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 mb-4">
                <li>Pronunciation feedback and speaking assessment</li>
                <li>Personalized lesson recommendations</li>
                <li>Conversation practice with Saraswati AI tutor</li>
                <li>Real-time story and content generation</li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Important Disclaimers</h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• AI feedback is for educational purposes and may not be 100% accurate</li>
                  <li>• AI-generated content should be verified for accuracy</li>
                  <li>• We are not responsible for AI-generated content that may be inappropriate</li>
                  <li>• AI services may be temporarily unavailable due to technical issues</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Privacy and Data Protection / गोपनीयता और डेटा सुरक्षा
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Your privacy is important to us. Please review our{' '}
                <a href="/legal/privacy" className="text-[#1CE783] hover:underline">
                  Privacy Policy
                </a>{' '}
                to understand how we collect, use, and protect your personal information.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Key Privacy Points</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• We do not sell your personal data</li>
                  <li>• Learning progress is stored securely</li>
                  <li>• You can delete your account and data at any time</li>
                  <li>• We comply with GDPR and CCPA regulations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Limitation of Liability / दायित्व की सीमा
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                PREET_ENGLISH is provided "as is" without warranties of any kind. We are not liable for:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Interruptions or errors in the service</li>
                <li>Loss of data or learning progress due to technical issues</li>
                <li>Inaccuracies in AI-generated feedback or content</li>
                <li>Any damages resulting from use of the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Termination / समाप्ति
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                We reserve the right to terminate or suspend your account for violations of these terms. 
                You may also delete your account at any time through your account settings.
              </p>
              
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                Upon Termination
              </h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li>Your access to the service will be immediately revoked</li>
                <li>Your learning data will be deleted within 30 days</li>
                <li>These terms will continue to apply to past use of the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Changes to Terms / शर्तों में परिवर्तन
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update these terms from time to time. We will notify users of significant 
                changes via email or in-app notifications. Continued use of the service after 
                changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Contact Information / संपर्क जानकारी
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  For questions about these Terms of Service:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li><strong>Email:</strong> legal@preetenglish.com</li>
                  <li><strong>Support:</strong> support@preetenglish.com</li>
                  <li><strong>Address:</strong> Available upon request</li>
                </ul>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                By using PREET_ENGLISH, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}