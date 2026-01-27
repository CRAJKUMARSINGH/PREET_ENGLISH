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
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, FileText, Copy, CheckCircle, PenTool } from 'lucide-react';
var emailTemplates = [
    {
        id: 'leave_application',
        title: 'Leave Application',
        titleHindi: 'छुट्टी का आवेदन',
        category: 'HR',
        template: "Subject: Leave Application for [Number] Days\n\nDear [Manager's Name],\n\nI am writing to request leave from [Start Date] to [End Date] for [Reason - personal/medical/family].\n\nDuring my absence, [Colleague's Name] will handle my responsibilities. I will ensure all pending tasks are completed before my leave begins.\n\nPlease let me know if you need any additional information.\n\nThank you for your consideration.\n\nBest regards,\n[Your Name]\n[Your Designation]\n[Contact Number]",
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
        template: "Subject: Meeting Request - [Topic]\n\nDear [Recipient's Name],\n\nI hope this email finds you well.\n\nI would like to schedule a meeting to discuss [Topic/Project Name]. The purpose of this meeting is to [Brief Purpose].\n\nCould you please let me know your availability for a [Duration] meeting this week? I am flexible with timing and can adjust according to your schedule.\n\nProposed agenda:\n1. [Point 1]\n2. [Point 2]\n3. [Point 3]\n\nPlease confirm a suitable time, and I will send a calendar invite.\n\nThank you for your time.\n\nBest regards,\n[Your Name]",
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
        template: "Subject: Application for [Job Title] Position - [Your Name]\n\nDear Hiring Manager,\n\nI am writing to express my interest in the [Job Title] position at [Company Name], as advertised on [Source].\n\nWith [X] years of experience in [Field/Industry], I have developed strong skills in [Key Skills]. In my current role at [Current Company], I have [Key Achievement].\n\nI am particularly drawn to [Company Name] because of [Reason - company values/projects/culture]. I believe my background in [Relevant Experience] aligns well with the requirements of this role.\n\nI have attached my resume for your review. I would welcome the opportunity to discuss how my skills and experience can contribute to your team.\n\nThank you for considering my application.\n\nSincerely,\n[Your Name]\n[Phone Number]\n[Email Address]\n[LinkedIn Profile - optional]",
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
        template: "Subject: Thank You - [Job Title] Interview\n\nDear [Interviewer's Name],\n\nThank you for taking the time to meet with me today regarding the [Job Title] position at [Company Name].\n\nI enjoyed learning more about the role and the team. Our discussion about [Specific Topic Discussed] was particularly interesting, and it reinforced my enthusiasm for this opportunity.\n\nI am confident that my experience in [Relevant Skill/Experience] would enable me to contribute effectively to [Specific Project/Goal mentioned in interview].\n\nPlease don't hesitate to contact me if you need any additional information. I look forward to hearing from you.\n\nThank you again for the opportunity.\n\nBest regards,\n[Your Name]\n[Phone Number]",
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
    var _this = this;
    var _a = useState(emailTemplates[0]), selectedTemplate = _a[0], setSelectedTemplate = _a[1];
    var _b = useState(emailTemplates[0].template), customizedEmail = _b[0], setCustomizedEmail = _b[1];
    var _c = useState(false), copied = _c[0], setCopied = _c[1];
    var handleTemplateSelect = function (template) {
        setSelectedTemplate(template);
        setCustomizedEmail(template.template);
        setCopied(false);
    };
    var copyToClipboard = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, navigator.clipboard.writeText(customizedEmail)];
                case 1:
                    _a.sent();
                    setCopied(true);
                    setTimeout(function () { return setCopied(false); }, 2000);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Failed to copy:', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<div className="professional-writing space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-500"/>
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
              {emailTemplates.map(function (template) { return (<Button key={template.id} variant={selectedTemplate.id === template.id ? "default" : "outline"} className="w-full justify-start h-auto p-3" onClick={function () { return handleTemplateSelect(template); }}>
                  <div className="text-left">
                    <div className="font-medium">{template.title}</div>
                    <div className="text-xs opacity-80">{template.titleHindi}</div>
                  </div>
                </Button>); })}
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PenTool className="w-5 h-5"/>
                Writing Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {selectedTemplate.tips.map(function (tip, index) { return (<li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"/>
                    <span>{tip}</span>
                  </li>); })}
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
                  <FileText className="w-5 h-5"/>
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
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? (<>
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500"/>
                        Copied!
                      </>) : (<>
                        <Copy className="w-4 h-4 mr-2"/>
                        Copy
                      </>)}
                  </Button>
                </div>
                <Textarea value={customizedEmail} onChange={function (e) { return setCustomizedEmail(e.target.value); }} className="min-h-[400px] font-mono text-sm"/>
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
                <Button onClick={function () { return setCustomizedEmail(selectedTemplate.template); }} variant="outline">
                  Reset Template
                </Button>
                <Button onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-2"/>
                  Copy to Clipboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
}
