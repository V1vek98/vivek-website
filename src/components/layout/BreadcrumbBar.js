import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import useScrollProgress from '../../hooks/useScrollProgress';
import { easterEggs } from '../../config/data';

export default function BreadcrumbBar({ onSearchClick }) {
  const progress = useScrollProgress();
  const labels = easterEggs.scrollProgressLabels;
  const labelIndex = Math.min(Math.floor((progress / 100) * labels.length), labels.length - 1);
  const currentLabel = labels[labelIndex] || labels[0];

  return (
    <motion.div
      initial={{ y: -32 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-8 z-50 bg-surface-secondary/90 backdrop-blur-sm border-b border-surface-tertiary flex items-center px-4 lg:pl-[72px]"
    >
      <span className="text-xs font-mono text-content-tertiary">
        vivek.dashboard <span className="text-content-tertiary/50">/</span>{' '}
        <span className="text-accent-blue">{currentLabel}</span>
      </span>

      <div className="ml-auto flex items-center gap-2">
        <span className="text-[10px] font-mono text-content-tertiary hidden sm:inline">
          QUERY: {progress}% complete
        </span>
        <button
          onClick={onSearchClick}
          className="p-1 rounded hover:bg-surface-tertiary transition-colors text-content-tertiary"
          title="Search (Ctrl+K)"
        >
          <Search size={14} />
        </button>
      </div>
    </motion.div>
  );
}
