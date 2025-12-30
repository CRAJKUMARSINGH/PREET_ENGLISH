import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Play, RotateCcw } from 'lucide-react';

interface VideoScriptProps {
  topicTitle: string;
  hindiInstruction: string;
  englishModel: string;
  hindiBridge: string;
  confidenceBoost: string;
}

export function VideoScriptComponent({ 
  topicTitle, 
  hindiInstruction, 
  englishModel, 
  hindiBridge, 
  confidenceBoost 
}: VideoScriptProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const totalDuration = 45; // 45 seconds total

  const startVideo = () => {
    setIsPlaying(true);
    setCurrentTime(0);
    
    // Simulate video playback
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= totalDuration) {
          clearInterval(interval);
          setIsPlaying(false);
          return totalDuration;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetVideo = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const getSegment = () => {
    if (currentTime < 5) return "instruction";
    if (currentTime < 20) return "model";
    if (currentTime < 30) return "bridge";
    return "confidence";
  };

  const getSegmentText = () => {
    const segment = getSegment();
    switch(segment) {
      case "instruction": return hindiInstruction;
      case "model": return englishModel;
      case "bridge": return hindiBridge;
      case "confidence": return confidenceBoost;
      default: return "";
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎥 Video-Assisted Speaking: {topicTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🎬</div>
              <p className="text-lg font-medium">Video Script Preview</p>
              <p className="text-sm text-muted-foreground">Click play to start</p>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 bg-black/70 text-white p-2 text-center text-sm">
            {currentTime}s / {totalDuration}s
          </div>
        </div>
        
        <div className="mb-4 p-4 bg-secondary rounded-lg">
          <p className="text-muted-foreground text-sm mb-1">Current Segment:</p>
          <p className="font-medium">{getSegmentText()}</p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={startVideo} disabled={isPlaying} className="flex items-center gap-2">
            <Play className="h-4 w-4" /> {isPlaying ? "Playing..." : "Play Video"}
          </Button>
          <Button onClick={resetVideo} variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="mb-1"><strong>How it works:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Watch the 45-second video guide</li>
            <li>Repeat the English sentences</li>
            <li>Use the frame-based speaking approach</li>
            <li>Think of your own speaking prompt</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
