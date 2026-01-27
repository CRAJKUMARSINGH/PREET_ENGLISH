var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';
import ModernCard from '../ui/ModernCard';
import ModernButton from '../ui/ModernButton';
import CelebrationEffect from '../ui/CelebrationEffect';
var DragDropExercise = function (_a) {
    var title = _a.title, instruction = _a.instruction, items = _a.items, dropZones = _a.dropZones, onComplete = _a.onComplete, _b = _a.showHints, showHints = _b === void 0 ? true : _b, timeLimit = _a.timeLimit;
    var _c = useState(null), draggedItem = _c[0], setDraggedItem = _c[1];
    var _d = useState({}), droppedItems = _d[0], setDroppedItems = _d[1];
    var _e = useState(items), availableItems = _e[0], setAvailableItems = _e[1];
    var _f = useState(false), isComplete = _f[0], setIsComplete = _f[1];
    var _g = useState(false), showCelebration = _g[0], setShowCelebration = _g[1];
    var startTime = useState(Date.now())[0];
    var _h = useState(timeLimit), timeLeft = _h[0], setTimeLeft = _h[1];
    var _j = useState(null), dragOverZone = _j[0], setDragOverZone = _j[1];
    var timerRef = useRef();
    useEffect(function () {
        if (timeLimit && timeLeft !== undefined && timeLeft > 0) {
            timerRef.current = setTimeout(function () {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        }
        else if (timeLeft === 0) {
            handleTimeUp();
        }
        return function () {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [timeLeft, timeLimit]);
    var handleTimeUp = function () {
        var timeSpent = (Date.now() - startTime) / 1000;
        var score = calculateScore();
        onComplete({ correct: false, score: score, timeSpent: timeSpent });
    };
    var handleDragStart = function (e, item) {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item.id);
    };
    var handleDragOver = function (e, zoneId) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverZone(zoneId);
    };
    var handleDragLeave = function () {
        setDragOverZone(null);
    };
    var handleDrop = function (e, zoneId) {
        e.preventDefault();
        setDragOverZone(null);
        if (!draggedItem)
            return;
        // Remove item from available items
        setAvailableItems(function (prev) { return prev.filter(function (item) { return item.id !== draggedItem.id; }); });
        // Add item to dropped items
        setDroppedItems(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[zoneId] = draggedItem, _a)));
        });
        setDraggedItem(null);
        // Check if exercise is complete
        checkCompletion();
    };
    var handleRemoveItem = function (zoneId) {
        var item = droppedItems[zoneId];
        if (item) {
            setAvailableItems(function (prev) { return __spreadArray(__spreadArray([], prev, true), [item], false); });
            setDroppedItems(function (prev) {
                var newDropped = __assign({}, prev);
                delete newDropped[zoneId];
                return newDropped;
            });
        }
    };
    var checkCompletion = function () {
        var allZonesFilled = dropZones.every(function (zone) { return droppedItems[zone.id]; });
        if (allZonesFilled) {
            setIsComplete(true);
            setShowCelebration(true);
            var timeSpent_1 = (Date.now() - startTime) / 1000;
            var score_1 = calculateScore();
            var isCorrect_1 = checkCorrectness();
            setTimeout(function () {
                onComplete({ correct: isCorrect_1, score: score_1, timeSpent: timeSpent_1 });
            }, 2000);
        }
    };
    var calculateScore = function () {
        var correctCount = dropZones.reduce(function (count, zone) {
            var droppedItem = droppedItems[zone.id];
            if (droppedItem && droppedItem.correctPosition === dropZones.indexOf(zone)) {
                return count + 1;
            }
            return count;
        }, 0);
        return Math.round((correctCount / dropZones.length) * 100);
    };
    var checkCorrectness = function () {
        return dropZones.every(function (zone, index) {
            var droppedItem = droppedItems[zone.id];
            return droppedItem && droppedItem.correctPosition === index;
        });
    };
    var resetExercise = function () {
        setAvailableItems(items);
        setDroppedItems({});
        setIsComplete(false);
        setShowCelebration(false);
        setTimeLeft(timeLimit);
    };
    var formatTime = function (seconds) {
        var mins = Math.floor(seconds / 60);
        var secs = seconds % 60;
        return "".concat(mins, ":").concat(secs.toString().padStart(2, '0'));
    };
    return (<ModernCard variant="glass" className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {title}
          </h3>
          {timeLimit && timeLeft !== undefined && (<div className={cn('px-3 py-1 rounded-full text-sm font-medium', timeLeft <= 30
                ? 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-300'
                : 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300')}>
              ⏱️ {formatTime(timeLeft)}
            </div>)}
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
          {availableItems.map(function (item) { return (<div key={item.id} draggable onDragStart={function (e) { return handleDragStart(e, item); }} className={cn('px-3 py-2 bg-white dark:bg-neutral-800 border-2 border-primary-200 dark:border-primary-800', 'rounded-lg cursor-move select-none transition-all duration-200', 'hover:border-primary-400 hover:shadow-md hover:scale-105', 'active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500')} tabIndex={0}>
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {item.content}
              </span>
            </div>); })}
        </div>
      </div>
      
      {/* Drop Zones */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Drop zones:
        </h4>
        <div className="space-y-2">
          {dropZones.map(function (zone, index) {
            var droppedItem = droppedItems[zone.id];
            var isDragOver = dragOverZone === zone.id;
            return (<div key={zone.id} onDragOver={function (e) { return handleDragOver(e, zone.id); }} onDragLeave={handleDragLeave} onDrop={function (e) { return handleDrop(e, zone.id); }} className={cn('min-h-[3rem] p-3 border-2 border-dashed rounded-lg transition-all duration-200', 'flex items-center justify-between', droppedItem
                    ? 'border-success-300 bg-success-50 dark:border-success-700 dark:bg-success-900/20'
                    : isDragOver
                        ? 'border-primary-400 bg-primary-50 dark:border-primary-600 dark:bg-primary-900/20'
                        : 'border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800/50')}>
                {droppedItem ? (<div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium text-success-700 dark:text-success-300">
                      {droppedItem.content}
                    </span>
                    <button onClick={function () { return handleRemoveItem(zone.id); }} className="ml-2 p-1 text-neutral-500 hover:text-error-600 transition-colors" title="Remove item">
                      ✕
                    </button>
                  </div>) : (<span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {zone.placeholder || "Drop item ".concat(index + 1, " here")}
                  </span>)}
              </div>);
        })}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-700">
        <ModernButton variant="outline" size="sm" onClick={resetExercise} disabled={isComplete}>
          Reset
        </ModernButton>
        
        {showHints && (<ModernButton variant="ghost" size="sm" onClick={function () { }} disabled={isComplete}>
            💡 Hint
          </ModernButton>)}
        
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {Object.keys(droppedItems).length} / {dropZones.length} completed
        </div>
      </div>
      
      {/* Celebration Effect */}
      <CelebrationEffect trigger={showCelebration} type="confetti" intensity="medium" duration={2000} onComplete={function () { return setShowCelebration(false); }}/>
    </ModernCard>);
};
export default DragDropExercise;
