import { cn } from "@/lib/utils";

// Saraswati image URL - Traditional painting of Goddess Saraswati with Veena
const SARASWATI_IMAGE = "https://i.postimg.cc/htJBJjyc/saraswati.jpg";

// Small logo version for header/sidebar
export function SaraswatiLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-400 p-0.5">
        <div className="w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
          <img 
            src={SARASWATI_IMAGE}
            alt="माँ सरस्वती"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to emoji if image fails
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-2xl">🙏</div>';
            }}
          />
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
      {/* Saraswati Image with Golden Frame */}
      <div className={cn(
        "relative rounded-2xl overflow-hidden shadow-2xl",
        "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-400 p-1.5",
        "animate-pulse-glow",
        sizeClasses[size]
      )}>
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
          {/* Traditional Saraswati Image */}
          <img 
            src={SARASWATI_IMAGE}
            alt="माँ सरस्वती - Goddess of Knowledge"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          
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
