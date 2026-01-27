import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { BookOpen, Volume2, Star } from "lucide-react";
export function LegacyVocabularyBuilder(_a) {
    var className = _a.className;
    return (<Card className={"p-6 ".concat(className)}>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Vocabulary Builder</h3>
        <p className="text-sm text-muted-foreground mb-4">शब्दावली निर्माता</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-[#1CE783]"/>
              <div className="text-left">
                <p className="font-medium">Hello</p>
                <p className="text-sm text-muted-foreground">नमस्ते</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost">
                <Volume2 className="h-4 w-4"/>
              </Button>
              <Button size="sm" variant="ghost">
                <Star className="h-4 w-4"/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>);
}
export default LegacyVocabularyBuilder;
