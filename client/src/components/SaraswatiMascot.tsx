import { cn } from "@/lib/utils";

interface SaraswatiMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'encouraging' | 'celebrating' | 'teaching';
  message?: string;
  className?: string;
  showMessage?: boolean;
}

export function SaraswatiMascot({ 
  size = 'md', 
  mood = 'happy',
  message,
  className,
  showMessage = true
}: SaraswatiMascotProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const getMoodMessage = () => {
    if (message) return message;
    switch (mood) {
      case 'happy':
        return 'नमस्ते! आज कुछ नया सीखें! 📚';
      case 'encouraging':
        return 'शाबाश! आप बहुत अच्छा कर रहे हैं! 🌟';
      case 'celebrating':
        return 'बधाई हो! आपने पाठ पूरा किया! 🎉';
      case 'teaching':
        return 'ज्ञान ही शक्ति है। सीखते रहें! 🙏';
      default:
        return 'विद्या ददाति विनयम् 🪷';
    }
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Saraswati SVG Illustration */}
      <div className={cn(
        "relative rounded-full bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 p-2 shadow-lg border-2 border-amber-200",
        sizeClasses[size]
      )}>
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Lotus */}
          <ellipse cx="50" cy="85" rx="35" ry="12" fill="#FDE68A" opacity="0.5"/>
          
          {/* Lotus Petals */}
          <path d="M50 75 Q35 70 30 80 Q40 78 50 85 Q60 78 70 80 Q65 70 50 75" fill="#F472B6" opacity="0.8"/>
          <path d="M50 75 Q30 65 25 78 Q35 73 50 82" fill="#EC4899" opacity="0.6"/>
          <path d="M50 75 Q70 65 75 78 Q65 73 50 82" fill="#EC4899" opacity="0.6"/>
          
          {/* Halo/Aura */}
          <circle cx="50" cy="35" r="28" fill="url(#haloGradient)" opacity="0.3"/>
          
          {/* Face */}
          <ellipse cx="50" cy="35" rx="18" ry="20" fill="#FDEBD0"/>
          
          {/* Hair */}
          <path d="M32 30 Q30 15 50 12 Q70 15 68 30 Q65 20 50 18 Q35 20 32 30" fill="#1A1A2E"/>
          <path d="M30 35 Q28 25 32 30" fill="#1A1A2E"/>
          <path d="M70 35 Q72 25 68 30" fill="#1A1A2E"/>
          
          {/* Crown/Mukut */}
          <path d="M35 18 L40 8 L45 15 L50 5 L55 15 L60 8 L65 18" fill="#FFD700" stroke="#DAA520" strokeWidth="1"/>
          <circle cx="50" cy="10" r="3" fill="#E11D48"/>
          
          {/* Eyes */}
          <ellipse cx="43" cy="33" rx="3" ry="4" fill="#1A1A2E"/>
          <ellipse cx="57" cy="33" rx="3" ry="4" fill="#1A1A2E"/>
          <circle cx="42" cy="32" r="1" fill="white"/>
          <circle cx="56" cy="32" r="1" fill="white"/>
          
          {/* Bindi */}
          <circle cx="50" cy="26" r="2" fill="#E11D48"/>
          
          {/* Nose */}
          <path d="M50 35 Q52 38 50 40" stroke="#C4A484" fill="none" strokeWidth="1"/>
          
          {/* Smile */}
          <path d="M44 44 Q50 48 56 44" stroke="#C4A484" fill="none" strokeWidth="1.5" strokeLinecap="round"/>
          
          {/* Earrings */}
          <circle cx="30" cy="38" r="3" fill="#FFD700"/>
          <circle cx="70" cy="38" r="3" fill="#FFD700"/>
          
          {/* Neck */}
          <path d="M42 52 Q50 55 58 52 L56 60 Q50 62 44 60 Z" fill="#FDEBD0"/>
          
          {/* Necklace */}
          <path d="M42 55 Q50 58 58 55" stroke="#FFD700" fill="none" strokeWidth="2"/>
          <circle cx="50" cy="58" r="2" fill="#E11D48"/>
          
          {/* Veena (simplified) */}
          <ellipse cx="25" cy="65" rx="8" ry="5" fill="#8B4513" transform="rotate(-20 25 65)"/>
          <line x1="20" y1="60" x2="35" y2="45" stroke="#8B4513" strokeWidth="2"/>
          <line x1="22" y1="62" x2="33" y2="50" stroke="#DAA520" strokeWidth="0.5"/>
          <line x1="24" y1="64" x2="35" y2="52" stroke="#DAA520" strokeWidth="0.5"/>
          
          {/* Book */}
          <rect x="65" y="55" width="15" height="12" rx="1" fill="#FEFCE8" stroke="#DAA520" strokeWidth="1"/>
          <line x1="72" y1="57" x2="72" y2="65" stroke="#DAA520" strokeWidth="0.5"/>
          <line x1="68" y1="59" x2="77" y2="59" stroke="#94A3B8" strokeWidth="0.3"/>
          <line x1="68" y1="61" x2="77" y2="61" stroke="#94A3B8" strokeWidth="0.3"/>
          <line x1="68" y1="63" x2="77" y2="63" stroke="#94A3B8" strokeWidth="0.3"/>
          
          {/* Hands holding items */}
          <ellipse cx="28" cy="58" rx="4" ry="3" fill="#FDEBD0"/>
          <ellipse cx="72" cy="58" rx="4" ry="3" fill="#FDEBD0"/>
          
          {/* Saree/Dress */}
          <path d="M40 60 Q50 65 60 60 L65 85 Q50 90 35 85 Z" fill="#FBBF24"/>
          <path d="M40 60 Q45 63 50 62 L48 80 Q43 82 38 78 Z" fill="#F59E0B" opacity="0.5"/>
          
          {/* Swan (Hamsa) - small */}
          <ellipse cx="78" cy="80" rx="6" ry="4" fill="white" stroke="#E5E7EB" strokeWidth="0.5"/>
          <path d="M84 80 Q88 78 86 82" fill="white"/>
          <circle cx="82" cy="79" r="1" fill="#1A1A2E"/>
          <path d="M84 80 L86 79" stroke="#F97316" strokeWidth="1"/>
          
          {/* Gradient Definitions */}
          <defs>
            <radialGradient id="haloGradient">
              <stop offset="0%" stopColor="#FCD34D"/>
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0"/>
            </radialGradient>
          </defs>
        </svg>
        
        {/* Animated Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200/30 to-orange-200/30 animate-pulse" />
      </div>

      {/* Speech Bubble */}
      {showMessage && (
        <div className="relative mt-3 max-w-[200px]">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-amber-100" />
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl px-4 py-2 shadow-sm">
            <p className="text-sm text-amber-900 text-center font-medium">
              {getMoodMessage()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
