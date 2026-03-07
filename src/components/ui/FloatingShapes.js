import { motion } from 'framer-motion';

const shapes = [
  { type: 'circle', size: 8, x: '15%', y: '25%', color: '#4285F4', duration: 7 },
  { type: 'ring', size: 16, x: '85%', y: '15%', color: '#EA4335', duration: 9 },
  { type: 'plus', size: 12, x: '75%', y: '75%', color: '#FBBC05', duration: 8 },
  { type: 'circle', size: 6, x: '25%', y: '80%', color: '#34A853', duration: 10 },
  { type: 'ring', size: 12, x: '50%', y: '50%', color: '#4285F4', duration: 11 },
  { type: 'plus', size: 10, x: '10%', y: '60%', color: '#EA4335', duration: 6 },
];

function Shape({ type, size, color }) {
  if (type === 'circle') return <div className="rounded-full" style={{ width: size, height: size, background: color, opacity: 0.3 }} />;
  if (type === 'ring') return <div className="rounded-full border-2" style={{ width: size, height: size, borderColor: color, opacity: 0.25 }} />;
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" style={{ opacity: 0.3 }}>
      <line x1="6" y1="1" x2="6" y2="11" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="1" y1="6" x2="11" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function FloatingShapes({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{ y: [0, -15, 5, -10, 0], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'linear' }}
        >
          <Shape {...s} />
        </motion.div>
      ))}
    </div>
  );
}
