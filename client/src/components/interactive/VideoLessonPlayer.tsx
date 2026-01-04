import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernButton from '../ui/ModernButton';
import ModernBadge from '../ui/ModernBadge';

interface VideoLesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in seconds
  thumbnail: string;
  videoUrl: string;
  subtitles?: Subtitle[];
  chapters?: Chapter[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

interface Subtitle {
  start: number;
  end: number;
  text: string;
  hindi?: string;
}

interface Chapter {
  title: string;
  startTime: number;
  description?: string;
}

interface VideoLessonPlayerProps {
  lesson: VideoLesson;
  onComplete: (watchTime: number, interactionScore: number) => void;
  showSubtitles?: boolean;
  showChapters?: boolean;
  children?: React.ReactNode;
}

const VideoLessonPlayer: React.FC<VideoLessonPlayerProps> = ({
  lesson,
  onComplete,
  showSubtitles = true,
  showChapters = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [interactionCount, setInteractionCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setWatchTime(prev => prev + 0.25); // Increment watch time
      
      // Update current subtitle
      if (lesson.subtitles && subtitlesEnabled) {
        const subtitle = lesson.subtitles.find(
          sub => video.currentTime >= sub.start && video.currentTime <= sub.end
        );
        setCurrentSubtitle(subtitle || null);
      }
      
      // Update current chapter
      if (lesson.chapters) {
        const chapterIndex = lesson.chapters.findIndex(
          (chapter, index) => {
            const nextChapter = lesson.chapters![index + 1];
            return video.currentTime >= chapter.startTime && 
                   (!nextChapter || video.currentTime < nextChapter.startTime);
          }
        );
        if (chapterIndex !== -1) {
          setCurrentChapter(chapterIndex);
        }
      }
    };
    
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      const interactionScore = Math.min(100, (interactionCount * 10) + (watchTime / duration * 50));
      onComplete(watchTime, interactionScore);
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [lesson, watchTime, duration, interactionCount, onComplete, subtitlesEnabled]);
  
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
    setInteractionCount(prev => prev + 1);
  };
  
  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime = time;
    setCurrentTime(time);
    setInteractionCount(prev => prev + 1);
  };
  
  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.volume = newVolume;
    setVolume(newVolume);
    setInteractionCount(prev => prev + 1);
  };
  
  const handlePlaybackRateChange = (rate: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.playbackRate = rate;
    setPlaybackRate(rate);
    setInteractionCount(prev => prev + 1);
  };
  
  const jumpToChapter = (chapterIndex: number) => {
    if (!lesson.chapters) return;
    
    const chapter = lesson.chapters[chapterIndex];
    handleSeek(chapter.startTime);
    setCurrentChapter(chapterIndex);
  };
  
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
    setInteractionCount(prev => prev + 1);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const hideControlsAfterDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };
  
  const showControlsTemporarily = () => {
    setShowControls(true);
    hideControlsAfterDelay();
  };
  
  return (
    <ModernCard variant="glass" className="overflow-hidden">
      <div
        ref={containerRef}
        className="relative bg-black aspect-video"
        onMouseMove={showControlsTemporarily}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={lesson.thumbnail}
          onClick={togglePlay}
        >
          <source src={lesson.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Subtitles */}
        {currentSubtitle && subtitlesEnabled && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 max-w-4xl px-4">
            <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-center">
              <p className="text-lg leading-relaxed">{currentSubtitle.text}</p>
              {currentSubtitle.hindi && (
                <p className="text-sm text-neutral-300 mt-1">{currentSubtitle.hindi}</p>
              )}
            </div>
          </div>
        )}
        
        {/* Video Controls */}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent',
          'transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0'
        )}>
          {/* Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ModernButton
              variant="glass"
              size="xl"
              onClick={togglePlay}
              className="w-20 h-20 rounded-full text-3xl"
              icon={isPlaying ? '⏸️' : '▶️'}
            />
          </div>
          
          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            {/* Progress Bar */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                />
                <div
                  className="absolute top-0 left-0 h-2 bg-primary-500 rounded-lg pointer-events-none"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ModernButton
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  icon={isPlaying ? '⏸️' : '▶️'}
                  className="text-white hover:bg-white/20"
                />
                
                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">🔊</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-20 h-1 bg-white/20 rounded appearance-none cursor-pointer"
                  />
                </div>
                
                {/* Playback Speed */}
                <select
                  value={playbackRate}
                  onChange={(e) => handlePlaybackRateChange(Number(e.target.value))}
                  className="bg-white/20 text-white text-sm px-2 py-1 rounded border-none outline-none"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Subtitles Toggle */}
                {lesson.subtitles && (
                  <ModernButton
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSubtitlesEnabled(!subtitlesEnabled);
                      setInteractionCount(prev => prev + 1);
                    }}
                    className={cn(
                      'text-white hover:bg-white/20',
                      subtitlesEnabled ? 'bg-white/20' : ''
                    )}
                  >
                    CC
                  </ModernButton>
                )}
                
                {/* Fullscreen Toggle */}
                <ModernButton
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  icon={isFullscreen ? '🗗' : '⛶'}
                  className="text-white hover:bg-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Lesson Info */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              {lesson.title}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              {lesson.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <ModernBadge variant="primary">
              {lesson.difficulty}
            </ModernBadge>
            <ModernBadge variant="secondary">
              {lesson.category}
            </ModernBadge>
          </div>
        </div>
        
        {/* Chapters */}
        {lesson.chapters && showChapters && (
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Chapters
            </h4>
            <div className="space-y-2">
              {lesson.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => jumpToChapter(index)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg transition-colors',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    currentChapter === index
                      ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800'
                      : 'bg-neutral-50 dark:bg-neutral-800/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {chapter.title}
                      </h5>
                      {chapter.description && (
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {chapter.description}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {formatTime(chapter.startTime)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Progress Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="text-center">
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {Math.round((currentTime / duration) * 100) || 0}%
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Progress
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {Math.round(watchTime / 60)}m
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Watch Time
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {interactionCount}
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Interactions
            </div>
          </div>
        </div>
      </div>
    </ModernCard>
  );
};

export default VideoLessonPlayer;