import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationEffectProps {
  trigger: boolean;
  type?: 'sparkles' | 'confetti' | 'fireworks';
  intensity?: string;
  duration?: number;
  onComplete?: () => void;
}

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({ 
  trigger, 
  type = 'confetti',
  intensity = 'medium',
  duration = 1000,
  onComplete 
}) => {
  useEffect(() => {
    if (trigger) {
      // Fire confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      // Call onComplete after animation
      const timer = setTimeout(() => {
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [trigger, onComplete]);

  return null;
};

export default CelebrationEffect;