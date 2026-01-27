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
import { Award, Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
export function CertificateGenerator(_a) {
    var _this = this;
    var userName = _a.userName, level = _a.level, lessonsCompleted = _a.lessonsCompleted, completionDate = _a.completionDate;
    var handleDownload = function () {
        // Create certificate canvas
        var canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 800;
        var ctx = canvas.getContext('2d');
        // Background gradient
        var gradient = ctx.createLinearGradient(0, 0, 1200, 800);
        gradient.addColorStop(0, '#4F46E5');
        gradient.addColorStop(1, '#7C3AED');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1200, 800);
        // Border
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 20;
        ctx.strokeRect(40, 40, 1120, 720);
        // Title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Certificate of Completion', 600, 150);
        // Subtitle
        ctx.font = '30px Arial';
        ctx.fillText('Preet English - English Learning Platform', 600, 200);
        // Awarded to
        ctx.font = '24px Arial';
        ctx.fillText('This certificate is proudly awarded to', 600, 280);
        // User name
        ctx.font = 'bold 48px Arial';
        ctx.fillText(userName, 600, 350);
        // Achievement text
        ctx.font = '24px Arial';
        ctx.fillText("For successfully completing ".concat(lessonsCompleted, " lessons"), 600, 420);
        ctx.fillText("at ".concat(level, " level"), 600, 460);
        // Date
        ctx.font = '20px Arial';
        ctx.fillText("Completed on: ".concat(completionDate), 600, 540);
        // Signature
        ctx.font = 'italic 18px Arial';
        ctx.fillText('Prepared on initiative of Mrs. Premlata Jain', 600, 620);
        ctx.fillText('AAO, PWD Udaipur', 600, 650);
        // Award icon (emoji)
        ctx.font = '80px Arial';
        ctx.fillText('🏆', 600, 730);
        // Download
        canvas.toBlob(function (blob) {
            if (blob) {
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "preet-english-certificate-".concat(level.toLowerCase(), ".png");
                a.click();
                URL.revokeObjectURL(url);
            }
        });
    };
    var handleShare = function () { return __awaiter(_this, void 0, void 0, function () {
        var text, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    text = "\uD83C\uDF89 I just completed ".concat(lessonsCompleted, " lessons at ").concat(level, " level on Preet English! \uD83C\uDFC6\n\nLearn English with Hindi support at: ").concat(window.location.origin);
                    if (!navigator.share) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, navigator.share({
                            title: 'My Preet English Achievement',
                            text: text,
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error sharing:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 7];
                case 5: 
                // Fallback: copy to clipboard
                return [4 /*yield*/, navigator.clipboard.writeText(text)];
                case 6:
                    // Fallback: copy to clipboard
                    _a.sent();
                    alert('Achievement copied to clipboard!');
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (<Card className="border-2 border-primary">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-primary/10 rounded-full">
            <Award className="h-12 w-12 text-primary"/>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="text-muted-foreground">
              You've completed {lessonsCompleted} lessons at {level} level!
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
            <p className="text-sm font-medium">
              Download your certificate and share your achievement!
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2"/>
              Download Certificate
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2"/>
              Share Achievement
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Keep learning to unlock more certificates! 📚
          </p>
        </div>
      </CardContent>
    </Card>);
}
