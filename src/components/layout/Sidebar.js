import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { sidebarLinks } from '../../config/data';
import useScrollProgress from '../../hooks/useScrollProgress';

export default function Sidebar() {
  const [hovered, setHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const progress = useScrollProgress();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    );

    sidebarLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed left-0 top-0 h-screen z-40 hidden lg:flex flex-col pt-8 bg-white/80 backdrop-blur-md border-r border-surface-tertiary transition-all duration-300"
      style={{ width: hovered ? 220 : 64 }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-surface-tertiary">
        <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          VP
        </div>
        {hovered && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-3 font-semibold text-content-primary text-sm whitespace-nowrap"
          >
            Vivek Patel
          </motion.span>
        )}
      </div>

      {/* Nav items */}
      <div className="flex-1 py-4 space-y-1 px-2">
        {sidebarLinks.map(({ id, label, icon }) => {
          const Icon = Icons[icon] || Icons.Circle;
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
              className={`relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? 'text-accent-blue bg-accent-blue/10' : 'text-content-secondary hover:text-content-primary hover:bg-surface-secondary'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-blue rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={18} className="flex-shrink-0" />
              {hovered && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
                  {label}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {/* Scroll progress */}
      <div className="px-3 pb-4">
        <div className="h-1 bg-surface-tertiary rounded-full overflow-hidden">
          <motion.div
            className="h-full boot-progress rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        {hovered && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-content-tertiary font-mono mt-1 block">
            {progress}% scrolled
          </motion.span>
        )}
      </div>
    </motion.nav>
  );
}
