// Sound effects hook for celebrations and interactions
import { useCallback } from 'react';
// Sound URLs (using free sound effects)
var SOUNDS = {
    celebration: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
    levelUp: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    streak: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
    achievement: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3',
    error: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
};
export function useSound() {
    var playSound = useCallback(function (type, volume) {
        if (volume === void 0) { volume = 0.5; }
        try {
            var audio = new Audio(SOUNDS[type]);
            audio.volume = volume;
            audio.play().catch(function () {
                // Silently fail if autoplay is blocked
            });
        }
        catch (error) {
            // Silently fail
        }
    }, []);
    var playCelebration = useCallback(function () { return playSound('celebration', 0.6); }, [playSound]);
    var playSuccess = useCallback(function () { return playSound('success', 0.5); }, [playSound]);
    var playLevelUp = useCallback(function () { return playSound('levelUp', 0.6); }, [playSound]);
    var playClick = useCallback(function () { return playSound('click', 0.3); }, [playSound]);
    var playStreak = useCallback(function () { return playSound('streak', 0.5); }, [playSound]);
    var playAchievement = useCallback(function () { return playSound('achievement', 0.6); }, [playSound]);
    var playError = useCallback(function () { return playSound('error', 0.4); }, [playSound]);
    return {
        playSound: playSound,
        playCelebration: playCelebration,
        playSuccess: playSuccess,
        playLevelUp: playLevelUp,
        playClick: playClick,
        playStreak: playStreak,
        playAchievement: playAchievement,
        playError: playError,
    };
}
