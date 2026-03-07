import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sqlQuery = "SELECT * FROM developers WHERE name = 'Vivek Patel' AND passion = 'data';";

export default function BootSequence({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: typing, 1: result, 2: loading, 3: done
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (phase === 0) {
      if (typedChars < sqlQuery.length) {
        const timer = setTimeout(() => setTypedChars((c) => c + 1), 30);
        return () => clearTimeout(timer);
      } else {
        setTimeout(() => setPhase(1), 400);
      }
    } else if (phase === 1) {
      setTimeout(() => setPhase(2), 800);
    } else if (phase === 2) {
      setTimeout(() => setPhase(3), 1500);
    } else if (phase === 3) {
      setTimeout(() => onComplete?.(), 300);
    }
  }, [phase, typedChars, onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-[#0F172A] flex items-center justify-center"
        >
          <div className="max-w-2xl w-full px-6">
            {/* SQL Query */}
            <div className="font-mono text-sm mb-6">
              <span className="text-accent-blue">mysql&gt; </span>
              <span className="text-gray-300">
                {sqlQuery.substring(0, typedChars)}
                {phase === 0 && <span className="animate-blink-cursor text-accent-blue">|</span>}
              </span>
            </div>

            {/* Result */}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-sm text-accent-green mb-8"
              >
                1 row returned (0.042s)
              </motion.div>
            )}

            {/* Progress bar */}
            {phase >= 2 && (
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="h-full boot-progress rounded-full"
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
