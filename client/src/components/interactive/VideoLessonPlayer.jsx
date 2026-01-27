import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernButton from '../ui/ModernButton';
import ModernBadge from '../ui/ModernBadge';
var VideoLessonPlayer = function (_a) {
    var lesson = _a.lesson, onComplete = _a.onComplete, _b = _a.showSubtitles, showSubtitles = _b === void 0 ? true : _b, _c = _a.showChapters, showChapters = _c === void 0 ? true : _c;
    var _d = useState(false), isPlaying = _d[0], setIsPlaying = _d[1];
    var _e = useState(0), currentTime = _e[0], setCurrentTime = _e[1];
    var _f = useState(0), duration = _f[0], setDuration = _f[1];
    var _g = useState(1), volume = _g[0], setVolume = _g[1];
    var _h = useState(1), playbackRate = _h[0], setPlaybackRate = _h[1];
    var _j = useState(true), showControls = _j[0], setShowControls = _j[1];
    var _k = useState(null), currentSubtitle = _k[0], setCurrentSubtitle = _k[1];
    var _l = useState(true), subtitlesEnabled = _l[0], setSubtitlesEnabled = _l[1];
    var _m = useState(0), currentChapter = _m[0], setCurrentChapter = _m[1];
    var _o = useState(0), watchTime = _o[0], setWatchTime = _o[1];
    var _p = useState(0), interactionCount = _p[0], setInteractionCount = _p[1];
    var _q = useState(false), isFullscreen = _q[0], setIsFullscreen = _q[1];
    var videoRef = useRef(null);
    var containerRef = useRef(null);
    var controlsTimeoutRef = useRef();
    useEffect(function () {
        var video = videoRef.current;
        if (!video)
            return;
        var handleTimeUpdate = function () {
            setCurrentTime(video.currentTime);
            setWatchTime(function (prev) { return prev + 0.25; }); // Increment watch time
            // Update current subtitle
            if (lesson.subtitles && subtitlesEnabled) {
                var subtitle = lesson.subtitles.find(function (sub) { return video.currentTime >= sub.start && video.currentTime <= sub.end; });
                setCurrentSubtitle(subtitle || null);
            }
            // Update current chapter
            if (lesson.chapters) {
                var chapterIndex = lesson.chapters.findIndex(function (chapter, index) {
                    var nextChapter = lesson.chapters[index + 1];
                    return video.currentTime >= chapter.startTime &&
                        (!nextChapter || video.currentTime < nextChapter.startTime);
                });
                if (chapterIndex !== -1) {
                    setCurrentChapter(chapterIndex);
                }
            }
        };
        var handleLoadedMetadata = function () {
            setDuration(video.duration);
        };
        var handleEnded = function () {
            setIsPlaying(false);
            var interactionScore = Math.min(100, (interactionCount * 10) + (watchTime / duration * 50));
            onComplete(watchTime, interactionScore);
        };
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('ended', handleEnded);
        return function () {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
        };
    }, [lesson, watchTime, duration, interactionCount, onComplete, subtitlesEnabled]);
    var togglePlay = function () {
        var video = videoRef.current;
        if (!video)
            return;
        if (isPlaying) {
            video.pause();
        }
        else {
            video.play();
        }
        setIsPlaying(!isPlaying);
        setInteractionCount(function (prev) { return prev + 1; });
    };
    var handleSeek = function (time) {
        var video = videoRef.current;
        if (!video)
            return;
        video.currentTime = time;
        setCurrentTime(time);
        setInteractionCount(function (prev) { return prev + 1; });
    };
    var handleVolumeChange = function (newVolume) {
        var video = videoRef.current;
        if (!video)
            return;
        video.volume = newVolume;
        setVolume(newVolume);
        setInteractionCount(function (prev) { return prev + 1; });
    };
    var handlePlaybackRateChange = function (rate) {
        var video = videoRef.current;
        if (!video)
            return;
        video.playbackRate = rate;
        setPlaybackRate(rate);
        setInteractionCount(function (prev) { return prev + 1; });
    };
    var jumpToChapter = function (chapterIndex) {
        if (!lesson.chapters)
            return;
        var chapter = lesson.chapters[chapterIndex];
        handleSeek(chapter.startTime);
        setCurrentChapter(chapterIndex);
    };
    var toggleFullscreen = function () {
        var container = containerRef.current;
        if (!container)
            return;
        if (!isFullscreen) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
        setInteractionCount(function (prev) { return prev + 1; });
    };
    var formatTime = function (seconds) {
        var mins = Math.floor(seconds / 60);
        var secs = Math.floor(seconds % 60);
        return "".concat(mins, ":").concat(secs.toString().padStart(2, '0'));
    };
    var hideControlsAfterDelay = function () {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(function () {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };
    var showControlsTemporarily = function () {
        setShowControls(true);
        hideControlsAfterDelay();
    };
    return (<ModernCard variant="glass" className="overflow-hidden">
      <div ref={containerRef} className="relative bg-black aspect-video" onMouseMove={showControlsTemporarily} onMouseLeave={function () { return isPlaying && setShowControls(false); }}>
        {/* Video Element */}
        <video ref={videoRef} className="w-full h-full object-cover" poster={lesson.thumbnail} onClick={togglePlay}>
          <source src={lesson.videoUrl} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        
        {/* Subtitles */}
        {currentSubtitle && subtitlesEnabled && (<div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 max-w-4xl px-4">
            <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-center">
              <p className="text-lg leading-relaxed">{currentSubtitle.text}</p>
              {currentSubtitle.hindi && (<p className="text-sm text-neutral-300 mt-1">{currentSubtitle.hindi}</p>)}
            </div>
          </div>)}
        
        {/* Video Controls */}
        <div className={cn('absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent', 'transition-opacity duration-300', showControls ? 'opacity-100' : 'opacity-0')}>
          {/* Play/Pause Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ModernButton variant="glass" size="xl" onClick={togglePlay} className="w-20 h-20 rounded-full text-3xl" icon={isPlaying ? '⏸️' : '▶️'}/>
          </div>
          
          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            {/* Progress Bar */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 relative">
                <input type="range" min={0} max={duration} value={currentTime} onChange={function (e) { return handleSeek(Number(e.target.value)); }} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"/>
                <div className="absolute top-0 left-0 h-2 bg-primary-500 rounded-lg pointer-events-none" style={{ width: "".concat((currentTime / duration) * 100, "%") }}/>
              </div>
              <span>{formatTime(duration)}</span>
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ModernButton variant="ghost" size="sm" onClick={togglePlay} icon={isPlaying ? '⏸️' : '▶️'} className="text-white hover:bg-white/20"/>
                
                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm">🔊</span>
                  <input type="range" min={0} max={1} step={0.1} value={volume} onChange={function (e) { return handleVolumeChange(Number(e.target.value)); }} className="w-20 h-1 bg-white/20 rounded appearance-none cursor-pointer"/>
                </div>
                
                {/* Playback Speed */}
                <select value={playbackRate} onChange={function (e) { return handlePlaybackRateChange(Number(e.target.value)); }} className="bg-white/20 text-white text-sm px-2 py-1 rounded border-none outline-none">
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
                {lesson.subtitles && (<ModernButton variant="ghost" size="sm" onClick={function () {
                setSubtitlesEnabled(!subtitlesEnabled);
                setInteractionCount(function (prev) { return prev + 1; });
            }} className={cn('text-white hover:bg-white/20', subtitlesEnabled ? 'bg-white/20' : '')}>
                    CC
                  </ModernButton>)}
                
                {/* Fullscreen Toggle */}
                <ModernButton variant="ghost" size="sm" onClick={toggleFullscreen} icon={isFullscreen ? '🗗' : '⛶'} className="text-white hover:bg-white/20"/>
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
        {lesson.chapters && showChapters && (<div className="space-y-3">
            <h4 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Chapters
            </h4>
            <div className="space-y-2">
              {lesson.chapters.map(function (chapter, index) { return (<button key={index} onClick={function () { return jumpToChapter(index); }} className={cn('w-full text-left p-3 rounded-lg transition-colors', 'hover:bg-neutral-100 dark:hover:bg-neutral-800', currentChapter === index
                    ? 'bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800'
                    : 'bg-neutral-50 dark:bg-neutral-800/50')}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {chapter.title}
                      </h5>
                      {chapter.description && (<p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {chapter.description}
                        </p>)}
                    </div>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {formatTime(chapter.startTime)}
                    </span>
                  </div>
                </button>); })}
            </div>
          </div>)}
        
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
    </ModernCard>);
};
export default VideoLessonPlayer;
