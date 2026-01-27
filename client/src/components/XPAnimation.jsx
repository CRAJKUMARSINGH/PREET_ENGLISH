import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
export function XPAnimation(_a) {
    var xpGained = _a.xpGained;
    var _b = useState(true), isVisible = _b[0], setIsVisible = _b[1];
    useEffect(function () {
        var timer = setTimeout(function () {
            setIsVisible(false);
        }, 2000);
        return function () { return clearTimeout(timer); };
    }, []);
    return (<AnimatePresence>
            {isVisible && (<motion.div className="fixed bottom-20 right-8 z-50 flex items-center gap-2 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-full shadow-lg border-2 border-yellow-200" initial={{ opacity: 0, y: 50, scale: 0.5 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -50, scale: 0.5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <Zap className="h-6 w-6 fill-yellow-700"/>
                    <span className="text-xl font-bold">+{xpGained} XP</span>
                </motion.div>)}
        </AnimatePresence>);
}
