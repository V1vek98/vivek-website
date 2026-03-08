import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Download, ExternalLink, Mail, Navigation } from 'lucide-react';
import { commandPaletteCommands } from '../../config/data';

const actionIcons = {
  scroll: Navigation,
  download: Download,
  mailto: Mail,
  external: ExternalLink,
  navigate: ArrowRight,
  'easter-egg': ArrowRight,
};

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = commandPaletteCommands.filter(
    (cmd) => cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  const flatFiltered = filtered;

  const executeCommand = useCallback((cmd) => {
    onClose();
    setQuery('');
    switch (cmd.action) {
      case 'scroll': {
        const el = document.getElementById(cmd.target);
        el?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'download':
        window.open(cmd.target, '_blank');
        break;
      case 'mailto':
        window.location.href = cmd.target;
        break;
      case 'external':
        window.open(cmd.target, '_blank');
        break;
      case 'navigate':
        window.location.href = cmd.path;
        break;
      case 'easter-egg':
        if (cmd.egg === 'party') {
          document.body.classList.toggle('party-mode');
          setTimeout(() => document.body.classList.remove('party-mode'), 5000);
        } else if (cmd.egg === 'sql') {
          const el = document.getElementById('about');
          el?.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      default:
        break;
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, flatFiltered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && flatFiltered[selectedIndex]) {
        executeCommand(flatFiltered[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, selectedIndex, flatFiltered, onClose, executeCommand]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center pt-[10vh] sm:pt-[20vh]"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-surface-tertiary mx-4 sm:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-tertiary">
              <Search size={18} className="text-content-tertiary" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                placeholder="Type a command..."
                className="flex-1 bg-transparent outline-none text-sm text-content-primary placeholder:text-content-tertiary"
              />
              <kbd className="text-xs px-1.5 py-0.5 bg-surface-tertiary rounded text-content-tertiary font-mono hidden sm:inline-block">ESC</kbd>
              <button onClick={onClose} className="sm:hidden p-1 rounded hover:bg-surface-tertiary transition-colors text-content-tertiary">
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {Object.entries(grouped).map(([group, commands]) => (
                <div key={group}>
                  <div className="px-4 py-1 text-xs font-medium text-content-tertiary uppercase tracking-wider">{group}</div>
                  {commands.map((cmd) => {
                    const globalIdx = flatFiltered.indexOf(cmd);
                    const Icon = actionIcons[cmd.action] || ArrowRight;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => executeCommand(cmd)}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition-colors ${
                          globalIdx === selectedIndex ? 'bg-accent-blue/10 text-accent-blue' : 'text-content-primary hover:bg-surface-secondary'
                        }`}
                      >
                        <Icon size={14} className="flex-shrink-0" />
                        <span className="flex-1">{cmd.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
              {flatFiltered.length === 0 && (
                <div className="px-4 py-8 text-sm text-content-tertiary text-center">No commands found</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
