import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';
import {
  hotelKPIs,
  hotelOccupancyTrend,
  hotelADRvsRevPAR,
  hotelHeatmapData,
  hotelMapProperties,
  hotelPropertyComparison,
} from '../../config/dashboardData';
import { TrendingUp, TrendingDown, MapPin, Star, BedDouble } from 'lucide-react';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const properties = ['The Grand', 'Seaside Resort', 'City Center', 'Mountain Lodge', 'Airport Inn', 'Beach Villa'];

function getHeatmapColor(value) {
  if (value >= 85) return { bg: 'rgba(52, 168, 83, 0.75)', text: '#fff' };
  if (value >= 70) return { bg: 'rgba(52, 168, 83, 0.40)', text: '#1a472a' };
  if (value >= 55) return { bg: 'rgba(251, 188, 5, 0.50)', text: '#6b5900' };
  if (value >= 40) return { bg: 'rgba(234, 67, 53, 0.35)', text: '#7f1d1d' };
  return { bg: 'rgba(234, 67, 53, 0.60)', text: '#fff' };
}

export default function HotelPerformance() {
  // Build lookup map for heatmap
  const heatmapLookup = {};
  hotelHeatmapData.forEach((d) => {
    if (!heatmapLookup[d.property]) heatmapLookup[d.property] = {};
    heatmapLookup[d.property][d.month] = d.occupancy;
  });

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {hotelKPIs.map((kpi, i) => {
          const isUp = kpi.trend === 'up';
          return (
            <motion.div
              key={kpi.label}
              {...fadeIn(i * 0.1)}
              className="glass-card-hover p-4 rounded-xl group relative"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-content-tertiary uppercase tracking-wider">
                  {kpi.label}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                    isUp
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-red-600'
                  }`}
                >
                  {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {kpi.change}
                </span>
              </div>
              <div
                className="text-2xl font-bold text-content-primary"
                style={{ color: kpi.color }}
              >
                {kpi.value}
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: kpi.color }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Area Chart */}
        <motion.div {...fadeIn(0.1)} className="glass-card p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
            Occupancy Trend
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={hotelOccupancyTrend}>
              <defs>
                <linearGradient id="occGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4285F4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#4285F4" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                domain={[50, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: 12,
                }}
                formatter={(v) => [`${v}%`, 'Occupancy']}
              />
              <Area
                type="monotone"
                dataKey="occupancy"
                stroke="#4285F4"
                strokeWidth={2}
                fill="url(#occGradient)"
                dot={{ r: 3, fill: '#4285F4', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ADR vs RevPAR Bar Chart */}
        <motion.div {...fadeIn(0.2)} className="glass-card p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
            ADR vs RevPAR
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={hotelADRvsRevPAR} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: 12,
                }}
                formatter={(v, name) => [`$${v}`, name.toUpperCase()]}
              />
              <Bar dataKey="adr" fill="#4285F4" radius={[4, 4, 0, 0]} barSize={14} />
              <Bar dataKey="revpar" fill="#34A853" radius={[4, 4, 0, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center">
            {[
              { label: 'ADR', color: '#4285F4' },
              { label: 'RevPAR', color: '#34A853' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-content-secondary">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Heatmap */}
      <motion.div {...fadeIn(0.1)} className="glass-card p-5 rounded-xl">
        <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
          Occupancy Heatmap
        </h3>
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            {/* Month Headers */}
            <div className="grid gap-1" style={{ gridTemplateColumns: '140px repeat(12, 1fr)' }}>
              <div />
              {months.map((m) => (
                <div
                  key={m}
                  className="text-[10px] font-semibold text-content-tertiary text-center uppercase"
                >
                  {m}
                </div>
              ))}
            </div>

            {/* Property Rows */}
            {properties.map((property, pi) => (
              <motion.div
                key={property}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pi * 0.05, duration: 0.3 }}
                className="grid gap-1 mt-1"
                style={{ gridTemplateColumns: '140px repeat(12, 1fr)' }}
              >
                <div className="text-xs font-medium text-content-secondary truncate flex items-center pr-2">
                  {property}
                </div>
                {months.map((month) => {
                  const value = heatmapLookup[property]?.[month] ?? 0;
                  const colors = getHeatmapColor(value);
                  return (
                    <div
                      key={`${property}-${month}`}
                      className="rounded text-center py-1.5 text-[10px] font-semibold cursor-default transition-transform hover:scale-110"
                      style={{ background: colors.bg, color: colors.text }}
                      title={`${property} - ${month}: ${value}%`}
                    >
                      {value}
                    </div>
                  );
                })}
              </motion.div>
            ))}

            {/* Legend */}
            <div className="flex items-center gap-3 mt-3 justify-end">
              {[
                { label: 'Low (<55%)', color: 'rgba(234, 67, 53, 0.35)' },
                { label: 'Mid (55-70%)', color: 'rgba(251, 188, 5, 0.50)' },
                { label: 'Good (70-85%)', color: 'rgba(52, 168, 83, 0.40)' },
                { label: 'High (85%+)', color: 'rgba(52, 168, 83, 0.75)' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1 text-[10px] text-content-tertiary">
                  <span className="w-3 h-3 rounded" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Property Comparison + Property Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Comparison - Progress Bars */}
        <motion.div {...fadeIn(0.1)} className="glass-card p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
            Property Comparison
          </h3>
          <div className="space-y-4">
            {hotelPropertyComparison.map((prop, i) => (
              <motion.div
                key={prop.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-content-primary">{prop.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-content-tertiary flex items-center gap-0.5">
                      <Star size={10} className="text-yellow-400 fill-yellow-400" />
                      {prop.rating}
                    </span>
                    <span className="text-xs font-semibold text-content-secondary">
                      {prop.occupancy}%
                    </span>
                  </div>
                </div>
                {/* Occupancy bar */}
                <div className="w-full h-2 bg-surface-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        prop.occupancy >= 80
                          ? '#34A853'
                          : prop.occupancy >= 70
                          ? '#4285F4'
                          : '#FBBC05',
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${prop.occupancy}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.2, duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Property Cards */}
        <motion.div {...fadeIn(0.2)} className="glass-card p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
            Properties
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hotelMapProperties.map((prop, i) => (
              <motion.div
                key={prop.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="border border-slate-100 rounded-lg p-3 hover:shadow-md transition-shadow bg-white/60"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-xs font-semibold text-content-primary leading-tight">
                    {prop.name}
                  </h4>
                  <span className="flex items-center gap-0.5 text-[10px] font-medium text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded-full">
                    <Star size={9} className="fill-yellow-400 text-yellow-400" />
                    {prop.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-content-tertiary mb-2">
                  <MapPin size={10} />
                  <span>
                    {prop.lat.toFixed(2)}, {prop.lng.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] text-content-secondary">
                    <BedDouble size={10} />
                    {prop.rooms} rooms
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      prop.occupancy >= 80
                        ? 'bg-green-50 text-green-600'
                        : prop.occupancy >= 70
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-yellow-50 text-yellow-700'
                    }`}
                  >
                    {prop.occupancy}% occ
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
