import { motion } from 'framer-motion';

const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

export default function DataPipeline({ height = 600, className = '' }) {
  return (
    <div className={`relative flex justify-center ${className}`} style={{ height }}>
      {/* Vertical line */}
      <motion.div
        className="w-0.5 bg-surface-tertiary"
        style={{ height: '100%' }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      {/* Flowing dots */}
      {COLORS.map((color, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: color, left: 'calc(50% - 4px)' }}
          animate={{ top: ['0%', '100%'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.75,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
