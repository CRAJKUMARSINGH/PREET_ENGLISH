import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mail, 
  FileText, 
  Copy, 
  CheckCircle,
  Briefcase,
  PenTool
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailTemplate {
  id: string;
  title: string;
  titleHindi: string;
  category: string;
  template: string;
  hindiExplanation: string;
  tips: string[];
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'leave_application',
    title: 'Leave Application',
    titleHindi: 'छुट्टी का आवेदन',
    category: 'HR',
    template: `Subject: Leave Application for [Number] Days

Dear [Manager's Name],

I am writing to request leave from [Start Date] to [End Date] for [Reason - personal/medical/family].

During my absence, [Colleague's Name] will handle my responsibilities. I will ensure all pending tasks are completed before my leave begins.

Please let me know if you need any additional information.

Thank you for your consideration.

Best regards,
[Your Name]
[Your Designation]
[Contact Number]`,
    hindiExplanation: 'यह टेम्पलेट छुट्टी के लिए औपचारिक अनुरोध के लिए है। हमेशा कारण और backup plan बताएं।',
    tips: [
      'Subject line में दिनों की संख्या लिखें',
      'Backup arrangement का उल्लेख करें',
      'Professional tone बनाए रखें',
      'Contact details दें'
    ]
  },
  {
    id: 'meeting_request',
    title: 'Meeting Request',
    titleHindi: 'मीटिंग का अनुरोध',
    category: 'Business',
    template: `Subject: Meeting Request - [Topic]

Dear [Recipient's Name],

I hope this email finds you well.

I would like to schedule a meeting to discuss [Topic/Project Name]. The purpose of this meeting is to [Brief Purpose].

Could you please let me know your availability for a [Duration] meeting this week? I am flexible with timing and can adjust according to your schedule.

Proposed agenda:
1. [Point 1]
2. [Point 2]
3. [Point 3]

Please confirm a suitable time, and I will send a calendar invite.

Thank you for your time.

Best regards,
[Your Name]`,
    hindiExplanation: 'मीटिंग request में हमेशा purpose और agenda स्पष्ट करें। Flexibility दिखाएं।',
    tips: [
      'Clear subject line लिखें',
      'Meeting का purpose बताएं',
      'Agenda points include करें',
      'Flexibility दिखाएं'
    ]
  },
  {
    id: 'job_application',
    title: 'Job Application',
    titleHindi: 'नौकरी का आवेदन',
    category: 'Career',
    template: `Subject: Application for [Job Title] Position - [Your Name]

Dear Hiring Manager,

I am writing to express my interest in the [Job Title] position at [Company Name], as advertised on [Source].

With [X] years of experience in [Field/Industry], I have developed strong skills in [Key Skills]. In my current role at [Current Company], I have [Key Achievement].

I am particularly drawn to [Company Name] because of [Reason - company values/projects/culture]. I believe my background in [Relevant Experience] aligns well with the requirements of this role.

I have attached my resume for your review. I would welcome the opportunity to discuss how my skills and experience can contribute to your team.

Thank you for considering my application.

Sincerely,
[Your Name]
[Phone Number]
[Email Address]
[LinkedIn Profile - optional]`,
    hindiExplanation: 'Job application में अपनी skills और achievements को company की requirements से जोड़ें।',
    tips: [
      'Subject में position और अपना नाम लिखें',
      'Company के बारे में research करें',
      'Specific achievements mention करें',
      'Resume attach करना न भूलें'
    ]
  },
  {
    id: 'thank_you_interview',
    title: 'Thank You After Interview',
    titleHindi: 'इंटरव्यू के बाद धन्यवाद',
    category: 'Career',
    template: `Subject: Thank You - [Job Title] Interview

Dear [Interviewer's Name],

Thank you for taking the time to meet with me today regarding the [Job Title] position at [Company Name].

I enjoyed learning more about the role and the team. Our discussion about [Specific Topic Discussed] was particularly interesting, and it reinforced my enthusiasm for this opportunity.

I am confident that my experience in [Relevant Skill/Experience] would enable me to contribute effectively to [Specific Project/Goal mentioned in interview].

Please don't hesitate to contact me if you need any additional information. I look forward to hearing from you.

Thank you again for the opportunity.

Best regards,
[Your Name]
[Phone Number]`,
    hindiExplanation: 'Interview के 24 घंटे के अंदर thank you email भेजें। Specific points mention करें।',
    tips: [
      '24 घंटे के अंदर भेजें',
      'Interview में discuss किए गए specific points mention करें',
      'अपनी interest दोबारा express करें',
      'Short और professional रखें'
    ]
  }
];

export function ProfessionalWriting() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate>(emailTemplates[0]);
  const [customizedEmail, setCustomizedEmail] = useState(emailTemplates[0].template);
  const [copied, setCopied] = useState(false);

  const handleTemplateSelect = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setCustomizedEmail(template.template);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(customizedEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="professional-writing space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-500" />
            Professional Email Writing
            <Badge variant="secondary" className="ml-auto">Hindi Guide</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            भारतीय कार्यक्षेत्र के लिए professional email templates। 
            Templates को customize करें और अपनी जरूरत के अनुसार उपयोग करें।
          </p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Template Selection */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Email Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {emailTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant={selectedTemplate.id === template.id ? "default" : "outline"}
                  className="w-full justify-start h-auto p-3"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="text-left">
                    <div className="font-medium">{template.title}</div>
                    <div className="text-xs opacity-80">{template.titleHindi}</div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PenTool className="w-5 h-5" />
                Writing Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {selectedTemplate.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Template Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {selectedTemplate.title}
                </CardTitle>
                <Badge variant="outline">{selectedTemplate.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hindi Explanation */}
              <div className="hindi-explanation bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Hindi में:</strong> {selectedTemplate.hindiExplanation}
                </div>
              </div>

              {/* Editable Template */}
              <div className="template-editor">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Email Template (Editable):</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <Textarea
                  value={customizedEmail}
                  onChange={(e) => setCustomizedEmail(e.target.value)}
                  className="min-h-[400px] font-mono text-sm"
                />
              </div>

              {/* Placeholder Guide */}
              <div className="placeholder-guide bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
                <div className="text-sm">
                  <strong className="text-yellow-700 dark:text-yellow-300">
                    📝 Placeholders को replace करें:
                  </strong>
                  <div className="text-yellow-600 dark:text-yellow-400 mt-1">
                    [Square brackets] में दिए गए text को अपनी जानकारी से बदलें।
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={() => setCustomizedEmail(selectedTemplate.template)} variant="outline">
                  Reset Template
                </Button>
                <Button onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}