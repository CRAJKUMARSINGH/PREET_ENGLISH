import { useState, useEffect } from 'react';
import { WifiOff, Wifi, Download, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function OfflineMode() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [downloadedLessons, setDownloadedLessons] = useState(0);
  const [totalLessons] = useState(1625);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load downloaded lessons count
    const stored = localStorage.getItem('offline_lessons');
    if (stored) {
      setDownloadedLessons(parseInt(stored, 10));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const downloadForOffline = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setDownloadProgress(i);
    }

    setDownloadedLessons(totalLessons);
    localStorage.setItem('offline_lessons', totalLessons.toString());
    setIsDownloading(false);
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className={isOnline ? 'bg-green-50 dark:bg-green-900/20' : 'bg-orange-50 dark:bg-orange-900/20'}>
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <>
                <Wifi className="w-8 h-8 text-green-600" />
                <div>
                  <p className="font-bold text-green-900 dark:text-green-100">ऑनलाइन (Online)</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Connected to internet</p>
                </div>
              </>
            ) : (
              <>
                <WifiOff className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="font-bold text-orange-900 dark:text-orange-100">ऑफ़लाइन (Offline)</p>
                  <p className="text-sm text-orange-700 dark:text-orange-300">Using cached content</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Download Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-6 h-6" />
            ऑफ़लाइन सामग्री (Offline Content)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Downloaded lessons:</span>
            <span className="font-bold">{downloadedLessons} / {totalLessons}</span>
          </div>
          
          <Progress value={(downloadedLessons / totalLessons) * 100} className="h-2" />

          {isDownloading && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Downloading... {downloadProgress}%</p>
              <Progress value={downloadProgress} className="h-2" />
            </div>
          )}

          {downloadedLessons === totalLessons ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">All lessons available offline!</span>
            </div>
          ) : (
            <Button 
              onClick={downloadForOffline} 
              disabled={isDownloading || !isOnline}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? 'Downloading...' : 'Download All Lessons'}
            </Button>
          )}

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
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Access all downloaded lessons</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Take quizzes offline</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Practice pronunciation</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Track progress locally</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Auto-sync when back online</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
