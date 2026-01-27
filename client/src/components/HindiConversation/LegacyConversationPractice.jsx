import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
export function LegacyConversationPractice(_a) {
    var className = _a.className;
    return (<Card className={"p-6 ".concat(className)}>
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Conversation Practice</h3>
        <p className="text-sm text-muted-foreground mb-4">बातचीत का अभ्यास</p>
        
        <div className="flex justify-center gap-2">
          <Button size="sm" variant="outline">
            <Play className="h-4 w-4 mr-2"/>
            Start
          </Button>
          <Button size="sm" variant="outline">
            <Pause className="h-4 w-4 mr-2"/>
            Pause
          </Button>
          <Button size="sm" variant="outline">
            <RotateCcw className="h-4 w-4 mr-2"/>
            Reset
          </Button>
        </div>
      </div>
    </Card>);
}
