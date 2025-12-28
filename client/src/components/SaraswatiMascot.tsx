import { cn } from "@/lib/utils";

// Small logo version for header/sidebar
export function SaraswatiLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-400 p-0.5">
        <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Sky Background */}
            <defs>
              <linearGradient id="logoSkyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB"/>
                <stop offset="50%" stopColor="#E0F4FF"/>
                <stop offset="100%" stopColor="#B8E6B8"/>
              </linearGradient>
              <radialGradient id="logoHaloGrad" cx="50%" cy="30%" r="40%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
              </radialGradient>
            </defs>
            
            <rect width="200" height="200" fill="url(#logoSkyGrad)"/>
            <circle cx="100" cy="70" r="55" fill="url(#logoHaloGrad)"/>
            
            {/* Simplified Saraswati */}
            <ellipse cx="100" cy="60" rx="25" ry="28" fill="#FDEBD0"/>
            <path d="M75 55 Q70 30 100 25 Q130 30 125 55 Q120 35 100 32 Q80 35 75 55" fill="#1A1A2E"/>
            <path d="M78 32 L82 18 L88 28 L100 12 L112 28 L118 18 L122 32" fill="#FFD700"/>
            <circle cx="100" cy="18" r="4" fill="#E11D48"/>
            <ellipse cx="90" cy="55" rx="4" ry="5" fill="#1A1A2E"/>
            <ellipse cx="110" cy="55" rx="4" ry="5" fill="#1A1A2E"/>
            <circle cx="100" cy="45" r="3" fill="#E11D48"/>
            <path d="M92 72 Q100 78 108 72" stroke="#C4A484" fill="none" strokeWidth="2" strokeLinecap="round"/>
            <path d="M70 100 Q100 110 130 100 L140 165 Q100 175 60 165 Z" fill="#FFFAF0"/>
            <path d="M60 170 Q80 155 100 170 Q120 155 140 170 Q130 180 100 185 Q70 180 60 170" fill="#FF69B4"/>
          </svg>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          PREET ENGLISH
        </h1>
        <p className="text-xs text-muted-foreground">विद्या ददाति विनयम्</p>
      </div>
    </div>
  );
}

interface SaraswatiMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'encouraging' | 'celebrating' | 'teaching';
  message?: string;
  className?: string;
  showMessage?: boolean;
  showCredit?: boolean;
}

export function SaraswatiMascot({ 
  size = 'md', 
  mood = 'happy',
  message,
  className,
  showMessage = true,
  showCredit = false
}: SaraswatiMascotProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40',
    xl: 'w-48 h-48'
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
      {/* Saraswati SVG with Golden Frame */}
      <div className={cn(
        "relative rounded-2xl overflow-hidden shadow-2xl",
        "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-400 p-1.5",
        "animate-pulse-glow",
        sizeClasses[size]
      )}>
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100">
          {/* Beautiful Saraswati SVG */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Sky Background */}
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB"/>
                <stop offset="50%" stopColor="#E0F4FF"/>
                <stop offset="100%" stopColor="#B8E6B8"/>
              </linearGradient>
              <radialGradient id="haloGrad" cx="50%" cy="30%" r="40%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4"/>
                <stop offset="100%" stopColor="#FF1493"/>
              </linearGradient>
            </defs>
            
            <rect width="200" height="200" fill="url(#skyGrad)"/>
            
            {/* Divine Halo */}
            <circle cx="100" cy="70" r="55" fill="url(#haloGrad)"/>
            
            {/* Lotus Base */}
            <ellipse cx="100" cy="175" rx="50" ry="15" fill="#228B22" opacity="0.3"/>
            <path d="M60 170 Q80 155 100 170 Q120 155 140 170 Q130 180 100 185 Q70 180 60 170" fill="url(#lotusGrad)"/>
            <path d="M50 175 Q70 160 85 175" fill="#FF69B4" opacity="0.7"/>
            <path d="M150 175 Q130 160 115 175" fill="#FF69B4" opacity="0.7"/>
            
            {/* White Saree/Dress */}
            <path d="M70 100 Q100 110 130 100 L140 165 Q100 175 60 165 Z" fill="#FFFAF0"/>
            <path d="M70 100 Q85 108 100 105 L95 160 Q80 165 65 158 Z" fill="#FFF8DC" opacity="0.6"/>
            
            {/* Golden Border on Saree */}
            <path d="M65 160 Q100 170 135 160" stroke="#DAA520" strokeWidth="3" fill="none"/>
            
            {/* Neck */}
            <path d="M85 85 Q100 90 115 85 L112 100 Q100 105 88 100 Z" fill="#FDEBD0"/>
            
            {/* Face */}
            <ellipse cx="100" cy="60" rx="25" ry="28" fill="#FDEBD0"/>
            
            {/* Hair */}
            <path d="M75 55 Q70 30 100 25 Q130 30 125 55 Q120 35 100 32 Q80 35 75 55" fill="#1A1A2E"/>
            <path d="M72 60 Q68 45 75 55" fill="#1A1A2E"/>
            <path d="M128 60 Q132 45 125 55" fill="#1A1A2E"/>
            
            {/* Crown/Mukut */}
            <path d="M78 32 L82 18 L88 28 L100 12 L112 28 L118 18 L122 32" fill="#FFD700" stroke="#DAA520" strokeWidth="1"/>
            <circle cx="100" cy="18" r="4" fill="#E11D48"/>
            <circle cx="88" cy="24" r="2" fill="#00CED1"/>
            <circle cx="112" cy="24" r="2" fill="#00CED1"/>
            
            {/* Eyes */}
            <ellipse cx="90" cy="55" rx="4" ry="5" fill="#1A1A2E"/>
            <ellipse cx="110" cy="55" rx="4" ry="5" fill="#1A1A2E"/>
            <circle cx="89" cy="54" r="1.5" fill="white"/>
            <circle cx="109" cy="54" r="1.5" fill="white"/>
            
            {/* Eyebrows */}
            <path d="M84 48 Q90 45 96 48" stroke="#1A1A2E" strokeWidth="1" fill="none"/>
            <path d="M104 48 Q110 45 116 48" stroke="#1A1A2E" strokeWidth="1" fill="none"/>
            
            {/* Bindi */}
            <circle cx="100" cy="45" r="3" fill="#E11D48"/>
            
            {/* Nose */}
            <path d="M100 58 Q103 62 100 66" stroke="#C4A484" fill="none" strokeWidth="1.5"/>
            
            {/* Smile */}
            <path d="M92 72 Q100 78 108 72" stroke="#C4A484" fill="none" strokeWidth="2" strokeLinecap="round"/>
            
            {/* Earrings */}
            <circle cx="72" cy="62" r="4" fill="#FFD700"/>
            <circle cx="72" cy="68" r="2" fill="#E11D48"/>
            <circle cx="128" cy="62" r="4" fill="#FFD700"/>
            <circle cx="128" cy="68" r="2" fill="#E11D48"/>
            
            {/* Necklace */}
            <path d="M85 88 Q100 95 115 88" stroke="#FFD700" fill="none" strokeWidth="3"/>
            <circle cx="100" cy="93" r="4" fill="#E11D48"/>
            
            {/* Four Arms */}
            {/* Upper Left - Veena */}
            <path d="M70 100 Q50 85 45 70" stroke="#FDEBD0" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <ellipse cx="40" cy="65" rx="5" ry="3" fill="#FDEBD0"/>
            
            {/* Upper Right - Book */}
            <path d="M130 100 Q150 85 155 70" stroke="#FDEBD0" strokeWidth="8" fill="none" strokeLinecap="round"/>
            <ellipse cx="160" cy="65" rx="5" ry="3" fill="#FDEBD0"/>
            
            {/* Lower Left - Mala */}
            <path d="M75 105 Q55 115 50 130" stroke="#FDEBD0" strokeWidth="7" fill="none" strokeLinecap="round"/>
            <ellipse cx="48" cy="135" rx="4" ry="3" fill="#FDEBD0"/>
            
            {/* Lower Right - Lotus */}
            <path d="M125 105 Q145 115 150 130" stroke="#FDEBD0" strokeWidth="7" fill="none" strokeLinecap="round"/>
            <ellipse cx="152" cy="135" rx="4" ry="3" fill="#FDEBD0"/>
            
            {/* Veena */}
            <ellipse cx="35" cy="90" rx="12" ry="8" fill="#8B4513" transform="rotate(-30 35 90)"/>
            <line x1="30" y1="85" x2="55" y2="55" stroke="#8B4513" strokeWidth="3"/>
            <ellipse cx="58" cy="52" rx="6" ry="4" fill="#8B4513"/>
            <line x1="32" y1="87" x2="55" y2="58" stroke="#DAA520" strokeWidth="0.5"/>
            <line x1="34" y1="89" x2="57" y2="60" stroke="#DAA520" strokeWidth="0.5"/>
            
            {/* Book */}
            <rect x="155" y="55" width="20" height="15" rx="2" fill="#FFFAF0" stroke="#DAA520" strokeWidth="1" transform="rotate(15 165 62)"/>
            <line x1="165" y1="58" x2="165" y2="68" stroke="#DAA520" strokeWidth="0.5" transform="rotate(15 165 62)"/>
            
            {/* Mala (Prayer Beads) */}
            <circle cx="45" cy="140" r="8" fill="none" stroke="#8B4513" strokeWidth="2"/>
            <circle cx="45" cy="132" r="2" fill="#FFD700"/>
            <circle cx="40" cy="138" r="2" fill="#FFD700"/>
            <circle cx="50" cy="138" r="2" fill="#FFD700"/>
            <circle cx="45" cy="148" r="2" fill="#FFD700"/>
            
            {/* Lotus in Hand */}
            <circle cx="155" cy="135" r="6" fill="#FF69B4"/>
            <ellipse cx="155" cy="128" rx="3" ry="5" fill="#FF1493"/>
            <ellipse cx="150" cy="132" rx="3" ry="4" fill="#FF69B4" transform="rotate(-30 150 132)"/>
            <ellipse cx="160" cy="132" rx="3" ry="4" fill="#FF69B4" transform="rotate(30 160 132)"/>
            
            {/* Swan (Hamsa) */}
            <ellipse cx="165" cy="165" rx="15" ry="10" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
            <path d="M180 165 Q190 160 185 170" fill="white"/>
            <ellipse cx="175" cy="162" rx="3" ry="2" fill="#1A1A2E"/>
            <path d="M180 165 L185 163" stroke="#FF6B00" strokeWidth="2"/>
            <path d="M150 168 Q155 175 165 172" fill="white"/>
          </svg>
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
        
        {/* Golden Corner Decorations */}
        <div className="absolute top-0 left-0 w-4 h-4 bg-amber-300 rounded-br-full shadow-inner" />
        <div className="absolute top-0 right-0 w-4 h-4 bg-amber-300 rounded-bl-full shadow-inner" />
        <div className="absolute bottom-0 left-0 w-4 h-4 bg-amber-300 rounded-tr-full shadow-inner" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-amber-300 rounded-tl-full shadow-inner" />
      </div>

      {/* Credit Badge */}
      {showCredit && (
        <div className="mt-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-300 dark:border-amber-700 rounded-full px-3 py-1">
          <p className="text-xs text-amber-800 dark:text-amber-300 font-medium text-center">
            🙏 Mrs. Premlata Jain, AAO
          </p>
        </div>
      )}

      {/* Speech Bubble */}
      {showMessage && (
        <div className="relative mt-3 max-w-[220px]">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-amber-100 dark:border-b-amber-900/50" />
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700 rounded-2xl px-4 py-3 shadow-md">
            <p className="text-sm text-amber-900 dark:text-amber-100 text-center font-medium">
              {getMoodMessage()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
