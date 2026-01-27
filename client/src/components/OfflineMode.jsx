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
import { useState, useEffect } from 'react';
import { WifiOff, Wifi, Download, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
export function OfflineMode() {
    var _this = this;
    var _a = useState(navigator.onLine), isOnline = _a[0], setIsOnline = _a[1];
    var _b = useState(0), downloadedLessons = _b[0], setDownloadedLessons = _b[1];
    var totalLessons = useState(1625)[0];
    var _c = useState(false), isDownloading = _c[0], setIsDownloading = _c[1];
    var _d = useState(0), downloadProgress = _d[0], setDownloadProgress = _d[1];
    useEffect(function () {
        var handleOnline = function () { return setIsOnline(true); };
        var handleOffline = function () { return setIsOnline(false); };
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        // Load downloaded lessons count
        var stored = localStorage.getItem('offline_lessons');
        if (stored) {
            setDownloadedLessons(parseInt(stored, 10));
        }
        return function () {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    var downloadForOffline = function () { return __awaiter(_this, void 0, void 0, function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsDownloading(true);
                    setDownloadProgress(0);
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i <= 100)) return [3 /*break*/, 4];
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                case 2:
                    _a.sent();
                    setDownloadProgress(i);
                    _a.label = 3;
                case 3:
                    i += 10;
                    return [3 /*break*/, 1];
                case 4:
                    setDownloadedLessons(totalLessons);
                    localStorage.setItem('offline_lessons', totalLessons.toString());
                    setIsDownloading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="space-y-6">
      {/* Connection Status */}
      <Card className={isOnline ? 'bg-green-50 dark:bg-green-900/20' : 'bg-orange-50 dark:bg-orange-900/20'}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            {isOnline ? (<>
                <Wifi className="w-8 h-8 text-green-600"/>
                <div>
                  <p className="font-bold text-green-900 dark:text-green-100">ऑनलाइन (Online)</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Connected to internet</p>
                </div>
              </>) : (<>
                <WifiOff className="w-8 h-8 text-orange-600"/>
                <div>
                  <p className="font-bold text-orange-900 dark:text-orange-100">ऑफ़लाइन (Offline)</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Using cached content</p>
                </div>
              </>)}
          </div>
        </CardContent>
      </Card>

      {/* Download Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-6 h-6"/>
            ऑफ़लाइन सामग्री (Offline Content)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Downloaded lessons:</span>
            <span className="font-bold">{downloadedLessons} / {totalLessons}</span>
          </div>
          
          <Progress value={(downloadedLessons / totalLessons) * 100} className="h-2"/>

          {isDownloading && (<div className="space-y-2">
              <p className="text-sm text-muted-foreground">Downloading... {downloadProgress}%</p>
              <Progress value={downloadProgress} className="h-2"/>
            </div>)}

          {downloadedLessons === totalLessons ? (<div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5"/>
              <span className="font-medium">All lessons available offline!</span>
            </div>) : (<Button onClick={downloadForOffline} disabled={isDownloading || !isOnline} className="w-full">
              <Download className="w-4 h-4 mr-2"/>
              {isDownloading ? 'Downloading...' : 'Download All Lessons'}
            </Button>)}

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-sm text-blue-900 dark:text-blue-100">
              💡 <strong>Tip:</strong> Download lessons while online to access them anytime, anywhere!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Offline Features */}
      <Card>
        <CardHeader>
          <CardTitle>ऑफ़लाइन सुविधाएं (Offline Features)</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600"/>
              <span>Access all downloaded lessons</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600"/>
              <span>Take quizzes offline</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600"/>
              <span>Practice pronunciation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600"/>
              <span>Track progress locally</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600"/>
              <span>Auto-sync when back online</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>);
}
