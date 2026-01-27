import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HolographicDashboardProps {
  defaultTab?: string;
  onFeatureActivated?: (feature: string) => void;
}

export function HolographicDashboard({ defaultTab, onFeatureActivated }: HolographicDashboardProps) {
  const handleFeatureClick = (feature: string) => {
    onFeatureActivated?.(feature);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
      <CardHeader>
        <CardTitle className="text-purple-400">🔮 Holographic Learning</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-300">
            Experience the future of language learning with our experimental holographic features.
          </p>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeatureClick('3d_pronunciation')}
              className="border-purple-500/50 hover:bg-purple-500/20"
            >
              3D Pronunciation
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeatureClick('ar_vocabulary')}
              className="border-blue-500/50 hover:bg-blue-500/20"
            >
              AR Vocabulary
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeatureClick('virtual_tutor')}
              className="border-green-500/50 hover:bg-green-500/20"
            >
              Virtual Tutor
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleFeatureClick('immersive_stories')}
              className="border-orange-500/50 hover:bg-orange-500/20"
            >
              Immersive Stories
            </Button>
          </div>
          
          <div className="text-xs text-gray-400 mt-4">
            ⚠️ Experimental features - requires modern browser support
          </div>
        </div>
      </CardContent>
    </Card>
  );
}