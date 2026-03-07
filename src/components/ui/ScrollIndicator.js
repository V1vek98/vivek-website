import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator({ text = '>>> More rows available. Scroll to paginate.' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="flex flex-col items-center gap-2 py-8 text-content-tertiary"
    >
      <span className="text-xs font-mono">{text}</span>
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
        <ChevronDown size={20} />
      </motion.div>
    </motion.div>
  );
}
