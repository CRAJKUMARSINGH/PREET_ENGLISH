// Sound effects hook for celebrations and interactions
import { useCallback } from 'react';

// Sound URLs (using free sound effects)
const SOUNDS = {
  celebration: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  levelUp: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3',
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  streak: 'https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3',
  achievement: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3',
};

type SoundType = keyof typeof SOUNDS;

export function useSound() {
  const playSound = useCallback((type: SoundType, volume: number = 0.5) => {
    try {
      const audio = new Audio(SOUNDS[type]);
      audio.volume = volume;
      audio.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
    } catch (error) {
      // Silently fail
    }
  }, []);

  const playCelebration = useCallback(() => playSound('celebration', 0.6), [playSound]);
  const playSuccess = useCallback(() => playSound('success', 0.5), [playSound]);
  const playLevelUp = useCallback(() => playSound('levelUp', 0.6), [playSound]);
  const playClick = useCallback(() => playSound('click', 0.3), [playSound]);
  const playStreak = useCallback(() => playSound('streak', 0.5), [playSound]);
  const playAchievement = useCallback(() => playSound('achievement', 0.6), [playSound]);

  return {
    playSound,
    playCelebration,
    playSuccess,
    playLevelUp,
    playClick,
    playStreak,
    playAchievement,
  };
}
