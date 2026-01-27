import { cn } from "@/lib/utils";
// Local Saraswati image - Traditional painting of Goddess Saraswati with Veena
var SARASWATI_IMAGE = "/saraswati.jpg";
// Small logo version for header/sidebar
export function SaraswatiLogo(_a) {
    var _b = _a.size, size = _b === void 0 ? "md" : _b;
    var sizeClasses = {
        xs: "w-8 h-8",
        sm: "w-10 h-10",
        md: "w-12 h-12",
        lg: "w-16 h-16"
    };
    return (<div className="flex items-center gap-3">
      <div className={cn("relative rounded-xl overflow-hidden shadow-lg border border-primary/20", sizeClasses[size])}>
        <div className="w-full h-full bg-secondary flex items-center justify-center overflow-hidden">
          <img src={SARASWATI_IMAGE} alt="माँ सरस्वती" className="w-full h-full object-cover" onError={function (e) {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-lg">🌸</div>';
        }}/>
        </div>
      </div>
    </div>);
}
export function SaraswatiMascot(_a) {
    var _b = _a.size, size = _b === void 0 ? 'md' : _b, _c = _a.mood, mood = _c === void 0 ? 'happy' : _c, message = _a.message, className = _a.className, _d = _a.showMessage, showMessage = _d === void 0 ? true : _d, _e = _a.showCredit, showCredit = _e === void 0 ? false : _e;
    var sizeClasses = {
        sm: 'w-24 h-24',
        md: 'w-32 h-32',
        lg: 'w-40 h-40',
        xl: 'w-48 h-48'
    };
    var getMoodMessage = function () {
        if (message)
            return message;
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
    return (<div className={cn("flex flex-col items-center", className)}>
      {/* Saraswati Image with Premium Green Frame */}
      <div className={cn("relative rounded-full overflow-hidden shadow-2xl", "border-[3px] border-primary/20 p-1", "bg-background", sizeClasses[size])}>
        <div className="relative w-full h-full rounded-full overflow-hidden bg-secondary">
          {/* Traditional Saraswati Image */}
          <img src={SARASWATI_IMAGE} alt="माँ सरस्वती - Goddess of Knowledge" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" onError={function (e) {
            e.currentTarget.style.display = 'none';
        }}/>
        </div>

        {/* Spinner/Glow Effect */}
        <div className="absolute inset-0 rounded-full border border-primary/30 animate-spin-slow-reverse" style={{ animationDuration: '10s' }}/>
      </div>

      {/* Credit Badge */}
      {showCredit && (<div className="mt-3 bg-primary/5 border border-primary/20 rounded-full px-4 py-1.5 backdrop-blur-sm">
          <p className="text-xs text-primary font-bold text-center tracking-wide">
            ✨ Mrs. Premlata Jain
          </p>
        </div>)}

      {/* Speech Bubble - Modern */}
      {showMessage && (<div className="relative mt-4 max-w-[240px] animate-fade-in-up">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-800 border-t border-l border-primary/20 rotate-45"/>
          <div className="relative bg-white dark:bg-slate-800 border border-primary/20 rounded-2xl px-5 py-4 shadow-xl shadow-primary/5">
            <p className="text-sm text-foreground/80 text-center font-medium leading-relaxed">
              {getMoodMessage()}
            </p>
          </div>
        </div>)}
    </div>);
}
