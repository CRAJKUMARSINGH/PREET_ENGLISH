import { MessageCircle, Play, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
export function ScenarioCard(_a) {
    var title = _a.title, titleHindi = _a.titleHindi, description = _a.description, category = _a.category, difficulty = _a.difficulty, xpReward = _a.xpReward, completed = _a.completed, score = _a.score, onClick = _a.onClick;
    var getCategoryIcon = function (cat) {
        switch (cat) {
            case 'job_interview':
                return '💼';
            case 'doctor_visit':
                return '🏥';
            case 'restaurant':
                return '🍽️';
            case 'bank':
                return '🏦';
            case 'shopping':
                return '🛍️';
            case 'airport':
                return '✈️';
            case 'hotel':
                return '🏨';
            default:
                return '💬';
        }
    };
    var getCategoryName = function (cat) {
        switch (cat) {
            case 'job_interview':
                return 'नौकरी इंटरव्यू';
            case 'doctor_visit':
                return 'डॉक्टर';
            case 'restaurant':
                return 'रेस्टोरेंट';
            case 'bank':
                return 'बैंक';
            case 'shopping':
                return 'शॉपिंग';
            case 'airport':
                return 'एयरपोर्ट';
            case 'hotel':
                return 'होटल';
            default:
                return cat;
        }
    };
    return (<div onClick={onClick} className={cn("bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition-all duration-300", "hover:shadow-md hover:border-primary/30 hover:-translate-y-1", completed && "border-green-200 bg-green-50/30")}>
      <div className="flex items-start gap-4">
        <div className="text-3xl bg-slate-100 p-3 rounded-xl">
          {getCategoryIcon(category)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", difficulty === 'Beginner' && "bg-green-100 text-green-700", difficulty === 'Intermediate' && "bg-blue-100 text-blue-700", difficulty === 'Advanced' && "bg-purple-100 text-purple-700")}>
              {difficulty === 'Beginner' ? 'प्रारंभिक' :
            difficulty === 'Intermediate' ? 'मध्यम' : 'उच्च'}
            </span>
            <span className="text-xs text-muted-foreground">
              {getCategoryName(category)}
            </span>
          </div>
          
          <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
          {titleHindi && (<p className="text-sm text-slate-600 mb-2">{titleHindi}</p>)}
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground"/>
              <span className="text-xs text-muted-foreground">रोलप्ले अभ्यास</span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                +{xpReward} XP
              </span>
              
              {completed ? (<div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4"/>
                  {score && (<span className="text-xs font-medium">{score}%</span>)}
                </div>) : (<Play className="h-5 w-5 text-primary"/>)}
            </div>
          </div>
        </div>
      </div>
    </div>);
}
