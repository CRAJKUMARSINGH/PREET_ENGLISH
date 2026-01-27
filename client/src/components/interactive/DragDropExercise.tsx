import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernButton from '../ui/ModernButton';
import CelebrationEffect from '../ui/CelebrationEffect';

interface DragItem {
  id: string;
  content: string;
  type: 'word' | 'phrase' | 'sentence';
  correctPosition?: number;
}

interface DropZone {
  id: string;
  label?: string;
  acceptedTypes?: string[];
  placeholder?: string;
}

interface DragDropExerciseProps {
  title: string;
  instruction: string;
  items: DragItem[];
  dropZones: DropZone[];
  onComplete: (result: { correct: boolean; score: number; timeSpent: number }) => void;
  showHints?: boolean;
  timeLimit?: number;
}

const DragDropExercise: React.FC<DragDropExerciseProps> = ({
  title,
  instruction,
  items,
  dropZones,
  onComplete,
  showHints = true,
  timeLimit,
}) => {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [droppedItems, setDroppedItems] = useState<Record<string, DragItem>>({});
  const [availableItems, setAvailableItems] = useState<DragItem[]>(items);
  const [isComplete, setIsComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    if (timeLimit && timeLeft !== undefined && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimeUp();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft, timeLimit]);
  
  const handleTimeUp = () => {
    const timeSpent = (Date.now() - startTime) / 1000;
    const score = calculateScore();
    onComplete({ correct: false, score, timeSpent });
  };
  
  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
  };
  
  const handleDragOver = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverZone(zoneId);
  };
  
  const handleDragLeave = () => {
    setDragOverZone(null);
  };
  
  const handleDrop = (e: React.DragEvent, zoneId: string) => {
    e.preventDefault();
    setDragOverZone(null);
    
    if (!draggedItem) return;
    
    // Remove item from available items
    setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
    
    // Add item to dropped items
    setDroppedItems(prev => ({
      ...prev,
      [zoneId]: draggedItem
    }));
    
    setDraggedItem(null);
    
    // Check if exercise is complete
    checkCompletion();
  };
  
  const handleRemoveItem = (zoneId: string) => {
    const item = droppedItems[zoneId];
    if (item) {
      setAvailableItems(prev => [...prev, item]);
      setDroppedItems(prev => {
        const newDropped = { ...prev };
        delete newDropped[zoneId];
        return newDropped;
      });
    }
  };
  
  const checkCompletion = () => {
    const allZonesFilled = dropZones.every(zone => droppedItems[zone.id]);
    if (allZonesFilled) {
      setIsComplete(true);
      setShowCelebration(true);
      
      const timeSpent = (Date.now() - startTime) / 1000;
      const score = calculateScore();
      const isCorrect = checkCorrectness();
      
      setTimeout(() => {
        onComplete({ correct: isCorrect, score, timeSpent });
      }, 2000);
    }
  };
  
  const calculateScore = () => {
    const correctCount = dropZones.reduce((count, zone) => {
      const droppedItem = droppedItems[zone.id];
      if (droppedItem && droppedItem.correctPosition === dropZones.indexOf(zone)) {
        return count + 1;
      }
      return count;
    }, 0);
    
    return Math.round((correctCount / dropZones.length) * 100);
  };
  
  const checkCorrectness = () => {
    return dropZones.every((zone, index) => {
      const droppedItem = droppedItems[zone.id];
      return droppedItem && droppedItem.correctPosition === index;
    });
  };
  
  const resetExercise = () => {
    setAvailableItems(items);
    setDroppedItems({});
    setIsComplete(false);
    setShowCelebration(false);
    setTimeLeft(timeLimit);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <ModernCard variant="glass" className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          {timeLimit && timeLeft !== undefined && (
            <div className={cn(
              'px-3 py-1 rounded-full text-sm font-medium',
              timeLeft <= 30 
                ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-300'
                : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
            )}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          )}
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">
          {instruction}
        </p>
      </div>
      
      {/* Available Items */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Drag items to complete the sentence:
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              className={cn(
                'px-3 py-2 bg-white dark:bg-neutral-800 border-2 border-primary-200 dark:border-primary-800',
                'rounded-lg cursor-move select-none transition-all duration-200',
                'hover:border-primary-400 hover:shadow-md hover:scale-105',
                'active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500'
              )}
              tabIndex={0}
            >
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {item.content}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Drop Zones */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Drop zones:
        </h4>
        <div className="space-y-2">
          {dropZones.map((zone, index) => {
            const droppedItem = droppedItems[zone.id];
            const isDragOver = dragOverZone === zone.id;
            
            return (
              <div
                key={zone.id}
                onDragOver={(e) => handleDragOver(e, zone.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, zone.id)}
                className={cn(
                  'min-h-[3rem] p-3 border-2 border-dashed rounded-lg transition-all duration-200',
                  'flex items-center justify-between',
                  droppedItem
                    ? 'border-success-300 bg-success-50 dark:border-success-700 dark:bg-success-900/20'
                    : isDragOver
                    ? 'border-primary-400 bg-primary-50 dark:border-primary-600 dark:bg-primary-900/20'
                    : 'border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800/50'
                )}
              >
                {droppedItem ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium text-success-700 dark:text-success-300">
                      {droppedItem.content}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(zone.id)}
                      className="ml-2 p-1 text-neutral-500 hover:text-error-600 transition-colors"
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {zone.placeholder || `Drop item ${index + 1} here`}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <ModernButton
          variant="outline"
          size="sm"
          onClick={resetExercise}
          disabled={isComplete}
        >
          Reset
        </ModernButton>
        
        {showHints && (
          <ModernButton
            variant="ghost"
            size="sm"
            onClick={() => {/* Show hint logic */}}
            disabled={isComplete}
          >
            💡 Hint
          </ModernButton>
        )}
        
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {Object.keys(droppedItems).length} / {dropZones.length} completed
        </div>
      </div>
      
      {/* Celebration Effect */}
      <CelebrationEffect
        trigger={showCelebration}
        type="confetti"
        intensity="medium"
        duration={2000}
        onComplete={() => setShowCelebration(false)}
      />
    </ModernCard>
  );
};

export default DragDropExercise;