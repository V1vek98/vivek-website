import { useState } from 'react';
import { motion } from 'framer-motion';

const segments = [
  { label: 'Full Stack', color: '#4285F4', percent: 30 },
  { label: 'Data Eng', color: '#EA4335', percent: 25 },
  { label: 'NLP / AI', color: '#FBBC05', percent: 20 },
  { label: 'Dashboarding', color: '#34A853', percent: 25 },
];

export default function DonutProfileFrame({ imageSrc, size = 240, className = '' }) {
  const [hovered, setHovered] = useState(null);
  const r = size / 2;
  const strokeWidth = 8;
  const radius = r - strokeWidth / 2 - 4;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90">
        {segments.map((seg, i) => {
          const dashLength = (seg.percent / 100) * circumference;
          const gap = circumference - dashLength;
          const currentOffset = offset;
          offset += dashLength;

          return (
            <motion.circle
              key={i}
              cx={r}
              cy={r}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={hovered === i ? strokeWidth + 3 : strokeWidth}
              strokeDasharray={`${dashLength - 3} ${gap + 3}`}
              strokeDashoffset={-currentOffset}
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              whileInView={{ strokeDasharray: `${dashLength - 3} ${gap + 3}` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all"
            />
          );
        })}
      </svg>

      {/* Profile image */}
      <div
        className="absolute rounded-full overflow-hidden border-4 border-white shadow-lg"
        style={{
          width: size - (strokeWidth + 4) * 2 - 8,
          height: size - (strokeWidth + 4) * 2 - 8,
          top: strokeWidth + 4 + 4,
          left: strokeWidth + 4 + 4,
        }}
      >
        <img src={imageSrc} alt="Vivek Patel" className="w-full h-full object-cover" />
      </div>

      {/* Tooltip */}
      {hovered !== null && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-content-primary text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {segments[hovered].label} — {segments[hovered].percent}%
        </div>
      )}
    </div>
  );
}
