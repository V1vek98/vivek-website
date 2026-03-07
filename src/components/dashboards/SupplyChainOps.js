import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, Line,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { TrendingUp, TrendingDown, Star, Package, AlertTriangle } from 'lucide-react';
import {
  supplyChainKPIs, supplyChainForecast, supplyChainInventory,
  supplyChainRadar, supplyChainSuppliers, supplyChainFunnel,
} from '../../config/dashboardData';

/* ── Shared Tooltip ────────────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-gray-200 shadow-lg p-3 rounded-lg text-xs">
      <p className="text-content-secondary mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color || entry.stroke }} className="font-medium">
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
        </p>
      ))}
    </div>
  );
};

/* ── KPI Card ──────────────────────────────────────────────────────────────── */
const KPICard = ({ kpi, index }) => {
  const isPositive = kpi.trend === 'up';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card p-5 rounded-xl"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-content-tertiary uppercase tracking-wider">{kpi.label}</span>
        <span className={`text-xs font-medium flex items-center gap-1 ${isPositive ? 'text-google-green' : 'text-google-red'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {kpi.change}
        </span>
      </div>
      <div className="text-2xl font-bold text-content-primary">{kpi.value}</div>
      <div className="mt-3 h-1 rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: '70%', background: kpi.color }} />
      </div>
    </motion.div>
  );
};

/* ── Status Badge ──────────────────────────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const styles = {
    healthy:   'bg-green-50 text-green-700 border-green-200',
    warning:   'bg-yellow-50 text-yellow-700 border-yellow-200',
    critical:  'bg-red-50 text-red-700 border-red-200',
    preferred: 'bg-blue-50 text-blue-700 border-blue-200',
    approved:  'bg-green-50 text-green-700 border-green-200',
    probation: 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${styles[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
      {status}
    </span>
  );
};

/* ── Star Rating ───────────────────────────────────────────────────────────── */
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < full
              ? 'text-yellow-400 fill-yellow-400'
              : i === full && half
                ? 'text-yellow-400 fill-yellow-400/50'
                : 'text-gray-200'
          }
        />
      ))}
      <span className="text-[11px] text-content-secondary ml-1">{rating}</span>
    </div>
  );
};

/* ── Inventory Card ────────────────────────────────────────────────────────── */
const InventoryCard = ({ item, index }) => {
  const pct = (item.current / item.maximum) * 100;
  const barColor =
    item.status === 'critical' ? '#EA4335' :
    item.status === 'warning'  ? '#FBBC05' : '#34A853';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={`glass-card p-4 rounded-xl relative ${item.status === 'critical' ? 'ring-2 ring-red-400 animate-pulse' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Package size={14} className="text-content-tertiary" />
          <span className="text-sm font-medium text-content-primary">{item.name}</span>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="flex items-center justify-between text-xs text-content-tertiary mb-1.5">
        <span>{item.current.toLocaleString()} units</span>
        <span>max {item.maximum.toLocaleString()}</span>
      </div>

      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>

      {item.status === 'critical' && (
        <div className="flex items-center gap-1 mt-2 text-[10px] text-red-600 font-medium">
          <AlertTriangle size={10} />
          Below minimum ({item.minimum.toLocaleString()})
        </div>
      )}
    </motion.div>
  );
};

/* ── Order Fulfillment Funnel (div-based) ──────────────────────────────────── */
const FunnelChart = ({ data }) => {
  const maxValue = data[0].value;
  const colors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#7B61FF'];

  return (
    <div className="space-y-2">
      {data.map((item, i) => {
        const widthPct = (item.value / maxValue) * 100;
        const pctOfTotal = ((item.value / maxValue) * 100).toFixed(1);
        return (
          <motion.div
            key={item.stage}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ originX: 0 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs text-content-secondary w-28 shrink-0 text-right">{item.stage}</span>
              <div className="flex-1 relative">
                <div
                  className="h-9 rounded-md flex items-center px-3 transition-all duration-500"
                  style={{
                    width: `${widthPct}%`,
                    background: colors[i % colors.length],
                    minWidth: '60px',
                  }}
                >
                  <span className="text-white text-xs font-semibold whitespace-nowrap">
                    {item.value.toLocaleString()} ({pctOfTotal}%)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ── Main Component ────────────────────────────────────────────────────────── */
const SupplyChainOps = () => {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {supplyChainKPIs.map((kpi, i) => (
          <KPICard key={kpi.label} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Charts Row: Demand Forecast + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Demand Forecast */}
        <div className="glass-card p-5 rounded-xl lg:col-span-2">
          <h4 className="text-sm font-semibold text-content-primary mb-1">Demand Forecast</h4>
          <p className="text-[11px] text-content-tertiary mb-4">Actual vs. forecast with confidence bands</p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={supplyChainForecast}>
              <defs>
                <linearGradient id="scBandGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4285F4" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#4285F4" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fill: '#5f6368', fontSize: 11 }} axisLine={false} />
              <YAxis tick={{ fill: '#5f6368', fontSize: 11 }} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {/* Confidence band: area between upper and lower */}
              <Area
                type="monotone"
                dataKey="upper"
                stroke="none"
                fill="url(#scBandGrad)"
                name="Upper Bound"
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="none"
                fill="#FFFFFF"
                name="Lower Bound"
                connectNulls={false}
              />
              {/* Forecast line (dashed) */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#4285F4"
                strokeWidth={2}
                strokeDasharray="6 3"
                dot={false}
                name="Forecast"
                connectNulls
              />
              {/* Actual line (solid) */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#4285F4"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#4285F4' }}
                name="Actual"
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-3 text-[11px] text-content-tertiary">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-0.5 bg-[#4285F4] rounded" /> Actual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-5 h-0.5 bg-[#4285F4] rounded" style={{ borderTop: '2px dashed #4285F4', height: 0, background: 'none' }} /> Forecast
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-4 h-3 rounded bg-[#4285F4]/10" /> Confidence Band
            </span>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="glass-card p-5 rounded-xl">
          <h4 className="text-sm font-semibold text-content-primary mb-4">Supply Chain Health</h4>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={supplyChainRadar} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="rgba(0,0,0,0.08)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fill: '#5f6368', fontSize: 10 }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#94A3B8', fontSize: 9 }}
                axisLine={false}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#34A853"
                fill="#34A853"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="glass-card p-5 rounded-xl">
        <h4 className="text-sm font-semibold text-content-primary mb-4 flex items-center gap-2">
          <Package size={14} className="text-accent" />
          Inventory Levels
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {supplyChainInventory.map((item, i) => (
            <InventoryCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Supplier Scorecard */}
      <div className="glass-card p-5 rounded-xl overflow-x-auto">
        <h4 className="text-sm font-semibold text-content-primary mb-4">Supplier Scorecard</h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 px-3 text-xs text-content-tertiary uppercase tracking-wider font-medium">Supplier</th>
              <th className="text-left py-2 px-3 text-xs text-content-tertiary uppercase tracking-wider font-medium">Rating</th>
              <th className="text-right py-2 px-3 text-xs text-content-tertiary uppercase tracking-wider font-medium">On-Time %</th>
              <th className="text-right py-2 px-3 text-xs text-content-tertiary uppercase tracking-wider font-medium">Quality %</th>
              <th className="text-right py-2 px-3 text-xs text-content-tertiary uppercase tracking-wider font-medium">Lead Time</th>
              <th className="text-center py-2 px-3 text-xs text-content-tertiary uppercase tracking-wider font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {supplyChainSuppliers.map((s, i) => (
              <motion.tr
                key={s.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="border-b border-gray-50 hover:bg-surface-secondary/50 transition-colors"
              >
                <td className="py-3 px-3 font-medium text-content-primary">{s.name}</td>
                <td className="py-3 px-3"><StarRating rating={s.rating} /></td>
                <td className="py-3 px-3 text-right text-content-secondary">{s.onTime}%</td>
                <td className="py-3 px-3 text-right text-content-secondary">{s.quality}%</td>
                <td className="py-3 px-3 text-right text-content-secondary">{s.leadTime} days</td>
                <td className="py-3 px-3 text-center"><StatusBadge status={s.status} /></td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Fulfillment Funnel */}
      <div className="glass-card p-5 rounded-xl">
        <h4 className="text-sm font-semibold text-content-primary mb-4">Order Fulfillment Funnel</h4>
        <FunnelChart data={supplyChainFunnel} />
      </div>
    </div>
  );
};

export default React.memo(SupplyChainOps);
