/**
 * Audio Player Component for Listening Exercises
 * Features: Play/pause, speed control, repeat section, transcript toggle
 */
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
export function AudioPlayer(_a) {
    var audioUrl = _a.audioUrl, text = _a.text, textHindi = _a.textHindi, onComplete = _a.onComplete, _b = _a.autoPlay, autoPlay = _b === void 0 ? false : _b;
    var _c = useState(false), isPlaying = _c[0], setIsPlaying = _c[1];
    var _d = useState(0), currentTime = _d[0], setCurrentTime = _d[1];
    var _e = useState(0), duration = _e[0], setDuration = _e[1];
    var _f = useState(1), playbackRate = _f[0], setPlaybackRate = _f[1];
    var _g = useState(false), showTranscript = _g[0], setShowTranscript = _g[1];
    var _h = useState(false), isMuted = _h[0], setIsMuted = _h[1];
    var audioRef = useRef(null);
    useEffect(function () {
        var audio = audioRef.current;
        if (!audio)
            return;
        var updateTime = function () { return setCurrentTime(audio.currentTime); };
        var updateDuration = function () { return setDuration(audio.duration); };
        var handleEnded = function () {
            setIsPlaying(false);
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        };
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', handleEnded);
        return function () {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [onComplete]);
    useEffect(function () {
        if (audioRef.current) {
            audioRef.current.playbackRate = playbackRate;
        }
    }, [playbackRate]);
    useEffect(function () {
        if (audioRef.current) {
            audioRef.current.muted = isMuted;
        }
    }, [isMuted]);
    useEffect(function () {
        if (autoPlay && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [autoPlay]);
    var togglePlayPause = function () {
        var audio = audioRef.current;
        if (!audio)
            return;
        if (isPlaying) {
            audio.pause();
        }
        else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };
    var handleSeek = function (value) {
        var audio = audioRef.current;
        if (audio) {
            audio.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };
    var handleSpeedChange = function (speed) {
        setPlaybackRate(speed);
    };
    var repeatSection = function () {
        var audio = audioRef.current;
        if (audio) {
            // Repeat last 5 seconds
            audio.currentTime = Math.max(0, audio.currentTime - 5);
            if (!isPlaying) {
                audio.play();
                setIsPlaying(true);
            }
        }
    };
    var formatTime = function (seconds) {
        var mins = Math.floor(seconds / 60);
        var secs = Math.floor(seconds % 60);
        return "".concat(mins, ":").concat(secs.toString().padStart(2, '0'));
    };
    // Use Web Speech API for TTS if no audio URL
    var speakText = function () {
        if (!text)
            return;
        if ('speechSynthesis' in window) {
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = playbackRate;
            speechSynthesis.speak(utterance);
            setIsPlaying(true);
            utterance.onend = function () {
                setIsPlaying(false);
                onComplete === null || onComplete === void 0 ? void 0 : onComplete();
            };
        }
    };
    return (<Card className="w-full">
      <CardContent className="p-6">
        {/* Audio Element */}
        {audioUrl ? (<audio ref={audioRef} src={audioUrl} preload="metadata"/>) : (<div className="hidden"/>)}

        {/* Controls */}
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider value={[currentTime]} max={duration || 100} step={0.1} onValueChange={handleSeek} className="w-full"/>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={repeatSection} title="Repeat last 5 seconds">
              <RotateCcw className="h-4 w-4"/>
            </Button>

            <Button variant="ghost" size="icon" onClick={function () {
            if (audioRef.current) {
                audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
            }
        }}>
              -10s
            </Button>

            <Button size="lg" onClick={audioUrl ? togglePlayPause : speakText} className="rounded-full w-16 h-16">
              {isPlaying ? (<Pause className="h-6 w-6"/>) : (<Play className="h-6 w-6"/>)}
            </Button>

            <Button variant="ghost" size="icon" onClick={function () {
            if (audioRef.current) {
                audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
            }
        }}>
              +10s
            </Button>

            <Button variant="outline" size="icon" onClick={function () { return setIsMuted(!isMuted); }} title={isMuted ? 'Unmute' : 'Mute'}>
              {isMuted ? (<VolumeX className="h-4 w-4"/>) : (<Volume2 className="h-4 w-4"/>)}
            </Button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            {[0.5, 0.75, 1, 1.25, 1.5].map(function (speed) { return (<Button key={speed} variant={playbackRate === speed ? 'default' : 'outline'} size="sm" onClick={function () { return handleSpeedChange(speed); }}>
                {speed}x
              </Button>); })}
          </div>

          {/* Transcript Toggle */}
          {(text || textHindi) && (<div className="pt-4 border-t">
              <Button variant="ghost" onClick={function () { return setShowTranscript(!showTranscript); }} className="w-full">
                {showTranscript ? 'Hide' : 'Show'} Transcript
              </Button>

              {showTranscript && (<div className="mt-4 space-y-2 p-4 bg-muted rounded-lg">
                  {text && (<div>
                      <p className="text-sm font-semibold mb-1">English:</p>
                      <p className="text-sm">{text}</p>
                    </div>)}
                  {textHindi && (<div>
                      <p className="text-sm font-semibold mb-1">Hindi:</p>
                      <p className="text-sm">{textHindi}</p>
                    </div>)}
                </div>)}
            </div>)}
        </div>
      </CardContent>
    </Card>);
}
