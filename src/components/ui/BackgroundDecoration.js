import { motion } from 'framer-motion';

const blobs = [
  { color: 'rgba(66, 133, 244, 0.08)', size: 600, x: '10%', y: '20%', delay: 0 },
  { color: 'rgba(234, 67, 53, 0.06)', size: 500, x: '70%', y: '10%', delay: 2 },
  { color: 'rgba(251, 188, 5, 0.06)', size: 450, x: '80%', y: '60%', delay: 4 },
  { color: 'rgba(52, 168, 83, 0.07)', size: 550, x: '20%', y: '70%', delay: 1 },
];

export default function BackgroundDecoration({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: blob.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
