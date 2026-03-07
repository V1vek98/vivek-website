import { motion } from 'framer-motion';

function NodesPreview({ color }) {
  const nodes = [
    { cx: 20, cy: 20 }, { cx: 50, cy: 15 }, { cx: 80, cy: 25 },
    { cx: 35, cy: 45 }, { cx: 65, cy: 40 },
  ];
  const lines = [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4]];

  return (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      {lines.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke={color} strokeWidth="1" opacity="0.3"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
          viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.cx} cy={n.cy} r="4" fill={color}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
        />
      ))}
    </svg>
  );
}

function BarsPreview({ color }) {
  const bars = [35, 55, 42, 68, 50, 75, 60];
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={5 + i * 14} y={60 - (h * 0.8)} width="10" height={h * 0.8}
          rx="2" fill={color} opacity="0.7"
          initial={{ height: 0, y: 60 }} whileInView={{ height: h * 0.8, y: 60 - h * 0.8 }}
          viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}
        />
      ))}
    </svg>
  );
}

function MapPreview({ color }) {
  const dots = [{ cx: 25, cy: 30 }, { cx: 50, cy: 20 }, { cx: 75, cy: 35 }, { cx: 40, cy: 45 }];
  return (
    <svg viewBox="0 0 100 60" className="w-full h-full">
      {dots.map((d, i) => (
        <g key={i}>
          <motion.circle
            cx={d.cx} cy={d.cy} r="8" fill={color} opacity="0.15"
            animate={{ r: [8, 14, 8] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          />
          <circle cx={d.cx} cy={d.cy} r="3" fill={color} opacity="0.8" />
        </g>
      ))}
    </svg>
  );
}

const previewMap = { nodes: NodesPreview, bars: BarsPreview, map: MapPreview };

export default function ProjectMiniPreview({ type = 'bars', color = '#4285F4', className = '' }) {
  const Preview = previewMap[type] || BarsPreview;
  return (
    <div className={`h-20 bg-surface-secondary rounded-lg p-2 ${className}`}>
      <Preview color={color} />
    </div>
  );
}
