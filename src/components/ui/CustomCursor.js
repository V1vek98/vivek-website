import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.cursor = 'none';

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    const over = (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, select, [data-hover]')) {
        setHovering(true);
      }
    };
    const out = (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, select, [data-hover]')) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-blue rounded-full pointer-events-none z-[95]"
        animate={{ x: pos.x - 3, y: pos.y - 3, scale: hovering ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 border-2 border-accent-blue rounded-full pointer-events-none z-[95]"
        animate={{
          x: pos.x - 12,
          y: pos.y - 12,
          scale: hovering ? 1.8 : 1,
          borderColor: hovering ? '#EA4335' : '#4285F4',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}
