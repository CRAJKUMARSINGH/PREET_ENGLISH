import { cn } from "@/lib/utils";

interface SaraswatiMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  mood?: 'happy' | 'encouraging' | 'celebrating' | 'teaching';
  message?: string;
  className?: string;
  showMessage?: boolean;
  showCredit?: boolean;
}

// Saraswati image URL - beautiful traditional painting
// Using a reliable image source
const SARASWATI_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Saraswati_by_Raja_Ravi_Varma.jpg/440px-Saraswati_by_Raja_Ravi_Varma.jpg";

export function SaraswatiMascot({ 
  size = 'md', 
  mood = 'happy',
  message,
  className,
  showMessage = true,
  showCredit = false
}: SaraswatiMascotProps) {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36',
    xl: 'w-44 h-44'
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
        "relative rounded-2xl overflow-hidden shadow-xl",
        "bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-400 p-1",
        sizeClasses[size]
      )}>
        {/* Inner frame */}
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
          <img 
            src={SARASWATI_IMAGE}
            alt="माँ सरस्वती - Goddess Saraswati"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23FEF3C7" width="100" height="100"/><text x="50" y="55" text-anchor="middle" font-size="40">🙏</text></svg>';
            }}
          />
          
          {/* Animated Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-yellow-300/20 animate-pulse" />
        </div>
        
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-amber-300 rounded-br-full" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-amber-300 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-amber-300 rounded-tr-full" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-300 rounded-tl-full" />
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
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700 rounded-2xl px-4 py-2 shadow-sm">
            <p className="text-sm text-amber-900 dark:text-amber-100 text-center font-medium">
              {getMoodMessage()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Logo component with Saraswati and Credit
export function SaraswatiLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-400 p-0.5">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <img 
            src={SARASWATI_IMAGE}
            alt="माँ सरस्वती"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23FEF3C7" width="100" height="100"/><text x="50" y="55" text-anchor="middle" font-size="40">🙏</text></svg>';
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg text-primary dark:text-primary">
          Preet English
        </span>
        <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
          By Mrs. Premlata Jain
        </span>
      </div>
    </div>
  );
}
