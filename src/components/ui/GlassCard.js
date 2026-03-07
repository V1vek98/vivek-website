import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
