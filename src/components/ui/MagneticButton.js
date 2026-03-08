import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default function MagneticButton({ children, className = '', as = 'button', href, onClick, strength = 0.3, ...props }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    if (isTouch) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    setPosition({ x, y });
  };

  const handleLeave = () => {
    if (isTouch) return;
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      onMouseMove={isTouch ? undefined : handleMouse}
      onMouseLeave={isTouch ? undefined : handleLeave}
      animate={isTouch ? undefined : { x: position.x, y: position.y }}
      transition={isTouch ? undefined : { type: 'spring', stiffness: 150, damping: 15 }}
      className={className}
      href={href}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
