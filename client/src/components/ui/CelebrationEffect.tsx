import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface CelebrationEffectProps {
  trigger: boolean;
  type?: 'confetti' | 'fireworks' | 'sparkles' | 'glow';
  duration?: number;
  intensity?: 'low' | 'medium' | 'high';
  colors?: string[];
  onComplete?: () => void;
}

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({
  trigger,
  type = 'confetti',
  duration = 3000,
  intensity = 'medium',
  colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'],
  onComplete,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    velocity: { x: number; y: number };
    rotation: number;
    rotationSpeed: number;
  }>>([]);
  
  const intensityConfig = {
    low: { count: 20, spread: 60 },
    medium: { count: 50, spread: 90 },
    high: { count: 100, spread: 120 },
  };
  
  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);
      generateParticles();
      
      const timer = setTimeout(() => {
        setIsActive(false);
        setParticles([]);
        onComplete?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, isActive, duration, onComplete]);
  
  const generateParticles = () => {
    const config = intensityConfig[intensity];
    const newParticles = [];
    
    for (let i = 0; i < config.count; i++) {
      const angle = (Math.PI * 2 * i) / config.count;
      const velocity = 2 + Math.random() * 4;
      
      newParticles.push({
        id: i,
        x: 50, // Start from center
        y: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 8,
        velocity: {
          x: Math.cos(angle) * velocity * (0.5 + Math.random() * 0.5),
          y: Math.sin(angle) * velocity * (0.5 + Math.random() * 0.5),
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }
    
    setParticles(newParticles);
  };
  
  if (!isActive) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {type === 'confetti' && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 animate-confetti"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {type === 'sparkles' && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-ping"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          <div
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size}px ${particle.color}`,
            }}
          />
        </div>
      ))}
      
      {type === 'glow' && (
        <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent animate-pulse" />
      )}
      
      {type === 'fireworks' && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        >
          <div
            className="w-1 h-8 rounded-full animate-ping"
            style={{
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`,
              animationDelay: `${Math.random() * 0.3}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CelebrationEffect;