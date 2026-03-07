import { motion } from 'framer-motion';
import {
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import {
  saasKPIs,
  saasMRRData,
  saasChurnData,
  saasUserGrowth,
  saasRevenueByPlan,
  saasActivityFeed,
} from '../../config/dashboardData';
import { TrendingUp, TrendingDown } from 'lucide-react';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5 },
});

const typeDotColors = {
  milestone: 'bg-yellow-400',
  signup: 'bg-green-400',
  upgrade: 'bg-blue-400',
  churn: 'bg-red-400',
};

const mrrAverage =
  saasMRRData.reduce((sum, d) => sum + d.mrr, 0) / saasMRRData.length;

export default function SaaSAnalytics() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {saasKPIs.map((kpi, i) => {
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR Area Chart */}
        <motion.div {...fadeIn(0.1)} className="glass-card p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
            Monthly Recurring Revenue
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={saasMRRData}>
              <defs>
                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
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
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: 12,
                }}
                formatter={(v) => [`$${(v / 1000).toFixed(0)}K`, 'MRR']}
              />
              <ReferenceLine
                y={mrrAverage}
                stroke="#94A3B8"
                strokeDasharray="4 4"
                label={{
                  value: 'Avg',
                  position: 'right',
                  fontSize: 11,
                  fill: '#94A3B8',
                }}
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#4285F4"
                strokeWidth={2}
                fill="url(#mrrGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Churn Line Chart */}
        <motion.div {...fadeIn(0.2)} className="glass-card p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
            Churn Rate Trend
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={saasChurnData}>
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
                domain={[1.5, 3.5]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: 12,
                }}
                formatter={(v) => [`${v}%`, 'Churn Rate']}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#EA4335"
                strokeWidth={2}
                dot={{ r: 4, fill: '#EA4335', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, fill: '#EA4335' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Stacked Area */}
        <motion.div {...fadeIn(0.1)} className="glass-card p-5 rounded-xl">
          <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
            User Growth by Tier
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={saasUserGrowth}>
              <defs>
                <linearGradient id="freeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#94A3B8" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="proGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4285F4" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#4285F4" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="entGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34A853" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#34A853" stopOpacity={0.05} />
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
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: 12,
                }}
                formatter={(v, name) => [v.toLocaleString(), name.charAt(0).toUpperCase() + name.slice(1)]}
              />
              <Area
                type="monotone"
                dataKey="free"
                stackId="1"
                stroke="#94A3B8"
                strokeWidth={1.5}
                fill="url(#freeGrad)"
              />
              <Area
                type="monotone"
                dataKey="pro"
                stackId="1"
                stroke="#4285F4"
                strokeWidth={1.5}
                fill="url(#proGrad)"
              />
              <Area
                type="monotone"
                dataKey="enterprise"
                stackId="1"
                stroke="#34A853"
                strokeWidth={1.5}
                fill="url(#entGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-3 justify-center">
            {[
              { label: 'Free', color: '#94A3B8' },
              { label: 'Pro', color: '#4285F4' },
              { label: 'Enterprise', color: '#34A853' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-content-secondary">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Donut + Activity Feed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Revenue Pie */}
          <motion.div {...fadeIn(0.2)} className="glass-card p-5 rounded-xl flex flex-col items-center">
            <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider self-start">
              Revenue Split
            </h3>
            <div className="relative">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={saasRevenueByPlan}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {saasRevenueByPlan.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(255,255,255,0.95)',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      fontSize: 12,
                    }}
                    formatter={(v) => [`${v}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs font-semibold text-content-secondary text-center leading-tight">
                  Revenue
                  <br />
                  Split
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-3 justify-center">
              {saasRevenueByPlan.map((p) => (
                <div key={p.name} className="flex items-center gap-1.5 text-xs text-content-secondary">
                  <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity Feed */}
          <motion.div {...fadeIn(0.3)} className="glass-card p-5 rounded-xl">
            <h3 className="text-sm font-semibold text-content-primary mb-4 uppercase tracking-wider">
              Activity Feed
            </h3>
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 custom-scrollbar">
              {saasActivityFeed.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5">
                  <span
                    className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                      typeDotColors[item.type] || 'bg-gray-400'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-content-primary leading-snug">
                      {item.message}
                    </p>
                    <p className="text-[10px] text-content-tertiary mt-0.5">
                      {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
