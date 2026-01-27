var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wand2, BookOpen, Loader2, Download, Eye, Sparkles, Globe, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
export function LessonGenerator() {
    var _this = this;
    var _a = useState(''), topic = _a[0], setTopic = _a[1];
    var _b = useState('Beginner'), userLevel = _b[0], setUserLevel = _b[1];
    var _c = useState('visual'), learningStyle = _c[0], setLearningStyle = _c[1];
    var _d = useState(null), generatedLesson = _d[0], setGeneratedLesson = _d[1];
    var _e = useState(false), loading = _e[0], setLoading = _e[1];
    var _f = useState(false), showPreview = _f[0], setShowPreview = _f[1];
    var generateLesson = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, lesson, error, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!topic.trim())
                        return [2 /*return*/];
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, 8, 9]);
                    return [4 /*yield*/, fetch('/api/ai/generate-lesson', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                userLevel: userLevel,
                                topic: topic.trim(),
                                learningStyle: learningStyle,
                            }),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    return [4 /*yield*/, response.json()];
                case 3:
                    lesson = _a.sent();
                    setGeneratedLesson(lesson);
                    setShowPreview(true);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    error = _a.sent();
                    throw new Error(error.message || 'Failed to generate lesson');
                case 6: return [3 /*break*/, 9];
                case 7:
                    err_1 = _a.sent();
                    console.error('Lesson generation error:', err_1);
                    alert(err_1.message || 'Failed to generate lesson. Please try again.');
                    return [3 /*break*/, 9];
                case 8:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var downloadLesson = function () {
        if (!generatedLesson)
            return;
        var lessonData = __assign(__assign({}, generatedLesson), { generatedAt: new Date().toISOString(), parameters: { topic: topic, userLevel: userLevel, learningStyle: learningStyle } });
        var blob = new Blob([JSON.stringify(lessonData, null, 2)], {
            type: 'application/json',
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "ai-lesson-".concat(topic.replace(/\s+/g, '-').toLowerCase(), ".json");
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter' && !loading) {
            generateLesson();
        }
    };
    return (<div className="space-y-6">
      {/* Generator Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-purple-600"/>
            AI Lesson Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Input value={topic} onChange={function (e) { return setTopic(e.target.value); }} onKeyPress={handleKeyPress} placeholder="e.g., Restaurant Ordering, Job Interview" disabled={loading}/>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Level</label>
              <select value={userLevel} onChange={function (e) { return setUserLevel(e.target.value); }} disabled={loading} className="w-full p-2 border rounded-md">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Learning Style</label>
              <select value={learningStyle} onChange={function (e) { return setLearningStyle(e.target.value); }} disabled={loading} className="w-full p-2 border rounded-md">
                <option value="visual">Visual</option>
                <option value="auditory">Auditory</option>
                <option value="kinesthetic">Kinesthetic</option>
                <option value="reading">Reading/Writing</option>
              </select>
            </div>
          </div>

          <Button onClick={generateLesson} disabled={loading || !topic.trim()} className="w-full">
            {loading ? (<>
                <Loader2 className="w-4 h-4 mr-2 animate-spin"/>
                Generating Lesson...
              </>) : (<>
                <Sparkles className="w-4 h-4 mr-2"/>
                Generate AI Lesson
              </>)}
          </Button>

          <Alert>
            <Brain className="h-4 w-4"/>
            <AlertDescription>
              AI will create a personalized lesson with English content, Hindi translations, 
              vocabulary, and exercises tailored to your specified level and learning style.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Generated Lesson Preview */}
      {generatedLesson && (<Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600"/>
                Generated Lesson: {generatedLesson.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={function () { return setShowPreview(!showPreview); }}>
                  <Eye className="w-4 h-4 mr-1"/>
                  {showPreview ? 'Hide' : 'Show'} Preview
                </Button>
                <Button variant="outline" size="sm" onClick={downloadLesson}>
                  <Download className="w-4 h-4 mr-1"/>
                  Download
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">{userLevel}</Badge>
              <Badge variant="outline">{learningStyle}</Badge>
              <Badge variant="outline">{topic}</Badge>
            </div>
          </CardHeader>

          {showPreview && (<CardContent className="space-y-6">
              {/* English Content */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Globe className="h-4 w-4"/>
                  English Content
                </h3>
                <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg">
                  <ReactMarkdown>{generatedLesson.content}</ReactMarkdown>
                </div>
              </div>

              {/* Hindi Content */}
              {generatedLesson.hindiContent && (<div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4"/>
                    Hindi Content (हिंदी सामग्री)
                  </h3>
                  <div className="prose prose-sm max-w-none bg-blue-50 p-4 rounded-lg">
                    <ReactMarkdown>{generatedLesson.hindiContent}</ReactMarkdown>
                  </div>
                </div>)}

              {/* Vocabulary */}
              {generatedLesson.vocabulary && generatedLesson.vocabulary.length > 0 && (<div>
                  <h3 className="text-lg font-semibold mb-2">Vocabulary</h3>
                  <div className="grid gap-3">
                    {generatedLesson.vocabulary.map(function (vocab, index) { return (<Card key={index} className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-600">{vocab.word}</span>
                            {vocab.hindiTranslation && (<Badge variant="outline">{vocab.hindiTranslation}</Badge>)}
                          </div>
                          <p className="text-sm text-gray-600">{vocab.definition}</p>
                          {vocab.example && (<p className="text-sm italic">Example: {vocab.example}</p>)}
                        </div>
                      </Card>); })}
                  </div>
                </div>)}

              {/* Exercises */}
              {generatedLesson.exercises && generatedLesson.exercises.length > 0 && (<div>
                  <h3 className="text-lg font-semibold mb-2">Practice Exercises</h3>
                  <div className="space-y-4">
                    {generatedLesson.exercises.map(function (exercise, index) { return (<Card key={index} className="p-4">
                        <div className="space-y-3">
                          <p className="font-medium">
                            {index + 1}. {exercise.question}
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {exercise.options.map(function (option, optionIndex) { return (<div key={optionIndex} className={"p-2 border rounded text-sm ".concat(option === exercise.correctAnswer
                                ? 'bg-green-100 border-green-300'
                                : 'bg-gray-50')}>
                                {String.fromCharCode(65 + optionIndex)}. {option}
                                {option === exercise.correctAnswer && (<span className="ml-2 text-green-600">✓</span>)}
                              </div>); })}
                          </div>
                        </div>
                      </Card>); })}
                  </div>
                </div>)}
            </CardContent>)}
        </Card>)}
    </div>);
}
