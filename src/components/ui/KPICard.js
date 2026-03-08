import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import MiniSparkline from './MiniSparkline';

const trendIcons = { up: TrendingUp, down: TrendingDown, flat: Minus };
const trendColors = { up: 'text-accent-green', down: 'text-accent-red', flat: 'text-content-tertiary' };

export default function KPICard({ label, value, sparkData, trend = 'up', trendValue, color = '#4285F4', tooltip, index = 0 }) {
  const TrendIcon = trendIcons[trend] || Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card-hover active:scale-[0.98] p-4 rounded-xl group relative"
      title={tooltip}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-content-tertiary uppercase tracking-wider">{label}</span>
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColors[trend]}`}>
          <TrendIcon size={12} />
          <span>{trendValue}</span>
        </div>
      </div>
      <div className="text-2xl font-bold text-content-primary mb-2" style={{ color }}>{value}</div>
      {sparkData && <MiniSparkline data={sparkData} color={color} />}
      {tooltip && <span className="text-[10px] text-content-tertiary mt-1 block sm:hidden">{tooltip}</span>}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: color }}
      />
    </motion.div>
  );
}
