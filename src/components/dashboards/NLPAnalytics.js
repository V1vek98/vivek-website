import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, Brain } from 'lucide-react';
import {
  nlpKPIs, nlpSentimentTrend, nlpSentimentDonut, nlpTopics,
  nlpWordCloud, nlpModelMetrics, nlpConfusionMatrix,
} from '../../config/dashboardData';

/* ── Shared Tooltip ────────────────────────────────────────────────────────── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-gray-200 shadow-lg p-3 rounded-lg text-xs">
      <p className="text-content-secondary mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color || entry.stroke }} className="font-medium">
          {entry.name}: {entry.value}
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
        <div className="h-full rounded-full" style={{ width: '75%', background: kpi.color }} />
      </div>
    </motion.div>
  );
};

/* ── Radial Gauge (SVG) ────────────────────────────────────────────────────── */
const RadialGauge = ({ label, value, color, index }) => {
  const size = 120;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const rotation = -90;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center"
    >
      <svg width={size} height={size} className="transform">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth={stroke}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
          className="transition-all duration-1000 ease-out"
        />
        {/* Center text */}
        <text
          x={size / 2}
          y={size / 2 - 4}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-lg font-bold"
          fill="#0F172A"
        >
          {value}%
        </text>
        <text
          x={size / 2}
          y={size / 2 + 14}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[10px]"
          fill="#94A3B8"
        >
          {label}
        </text>
      </svg>
    </motion.div>
  );
};

/* ── Word Cloud (div-based) ────────────────────────────────────────────────── */
const WordCloud = ({ words }) => {
  const googleColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
  const maxVal = Math.max(...words.map((w) => w.value));
  const minVal = Math.min(...words.map((w) => w.value));

  // Deterministic pseudo-random rotation per word
  const getRotation = (text, i) => {
    const seed = (text.charCodeAt(0) * 7 + i * 13) % 31;
    return ((seed / 31) * 30 - 15).toFixed(1);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-4 px-2">
      {words.map((word, i) => {
        const normalized = (word.value - minVal) / (maxVal - minVal);
        const fontSize = 12 + normalized * 28; // 12px to 40px
        const color = googleColors[i % googleColors.length];
        const rotation = getRotation(word.text, i);

        return (
          <motion.span
            key={word.text}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            className="inline-block font-semibold cursor-default select-none hover:opacity-70 transition-opacity"
            style={{
              fontSize: `${fontSize}px`,
              color,
              transform: `rotate(${rotation}deg)`,
              lineHeight: 1.2,
            }}
          >
            {word.text}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ── Confusion Matrix ──────────────────────────────────────────────────────── */
const ConfusionMatrix = ({ matrix }) => {
  const labels = ['Positive', 'Neutral', 'Negative'];
  const allValues = matrix.flat();
  const maxVal = Math.max(...allValues);

  const getCellColor = (value, isOnDiagonal) => {
    const intensity = value / maxVal;
    if (isOnDiagonal) {
      // Correct predictions: green scale
      const alpha = 0.15 + intensity * 0.55;
      return `rgba(52, 168, 83, ${alpha})`;
    }
    // Off-diagonal: red scale
    const alpha = 0.05 + intensity * 0.35;
    return `rgba(234, 67, 53, ${alpha})`;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[320px]">
        {/* Header row: Predicted labels */}
        <div className="flex">
          <div className="w-20 shrink-0" />
          <div className="flex-1 text-center text-[10px] text-content-tertiary uppercase tracking-wider font-medium mb-2 col-span-3">
            Predicted
          </div>
        </div>
        <div className="flex mb-1">
          <div className="w-20 shrink-0" />
          {labels.map((l) => (
            <div key={l} className="flex-1 text-center text-[11px] text-content-secondary font-medium px-1">
              {l}
            </div>
          ))}
        </div>

        {/* Rows */}
        {matrix.map((row, ri) => (
          <motion.div
            key={ri}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: ri * 0.1 }}
            className="flex mb-1"
          >
            <div className="w-20 shrink-0 flex items-center text-[11px] text-content-secondary font-medium pr-2 justify-end">
              {labels[ri]}
            </div>
            {row.map((val, ci) => {
              const isOnDiagonal = ri === ci;
              return (
                <div
                  key={ci}
                  className={`flex-1 mx-0.5 rounded-lg flex items-center justify-center h-16 text-sm font-bold transition-all hover:scale-105 ${isOnDiagonal ? 'ring-1 ring-green-300' : ''}`}
                  style={{ background: getCellColor(val, isOnDiagonal) }}
                >
                  <span className={isOnDiagonal ? 'text-green-800' : 'text-red-800'}>
                    {val}
                  </span>
                </div>
              );
            })}
          </motion.div>
        ))}

        {/* Axis label */}
        <div className="flex mt-1">
          <div className="w-20 shrink-0 text-[10px] text-content-tertiary text-right pr-2 uppercase tracking-wider font-medium">
            Actual
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main Component ────────────────────────────────────────────────────────── */
const NLPAnalytics = () => {
  /* Sort topics by count descending for the bar chart */
  const sortedTopics = useMemo(
    () => [...nlpTopics].sort((a, b) => b.count - a.count),
    []
  );

  /* Prepare model metrics array for gauges */
  const gauges = [
    { label: 'Accuracy',  value: nlpModelMetrics.accuracy,  color: '#4285F4' },
    { label: 'Precision', value: nlpModelMetrics.precision,  color: '#34A853' },
    { label: 'Recall',    value: nlpModelMetrics.recall,     color: '#FBBC05' },
    { label: 'F1 Score',  value: nlpModelMetrics.f1,         color: '#EA4335' },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {nlpKPIs.map((kpi, i) => (
          <KPICard key={kpi.label} kpi={kpi} index={i} />
        ))}
      </div>

      {/* Row: Sentiment Trend + Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Trend - Stacked Area */}
        <div className="glass-card p-5 rounded-xl lg:col-span-2">
          <h4 className="text-sm font-semibold text-content-primary mb-1">Sentiment Trend</h4>
          <p className="text-[11px] text-content-tertiary mb-4">Distribution over time with composite score</p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={nlpSentimentTrend}>
              <defs>
                <linearGradient id="nlpPosGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34A853" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#34A853" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="nlpNeuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FBBC05" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#FBBC05" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="nlpNegGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EA4335" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#EA4335" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="month" tick={{ fill: '#5f6368', fontSize: 11 }} axisLine={false} />
              <YAxis yAxisId="left" tick={{ fill: '#5f6368', fontSize: 11 }} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 1]} tick={{ fill: '#5f6368', fontSize: 11 }} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#5f6368' }} />
              <Area yAxisId="left" type="monotone" dataKey="positive" stackId="1" stroke="#34A853" fill="url(#nlpPosGrad)" name="Positive" />
              <Area yAxisId="left" type="monotone" dataKey="neutral" stackId="1" stroke="#FBBC05" fill="url(#nlpNeuGrad)" name="Neutral" />
              <Area yAxisId="left" type="monotone" dataKey="negative" stackId="1" stroke="#EA4335" fill="url(#nlpNegGrad)" name="Negative" />
              <Line yAxisId="right" type="monotone" dataKey="score" stroke="#0F172A" strokeWidth={2} dot={{ r: 3, fill: '#0F172A' }} name="Score" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Donut */}
        <div className="glass-card p-5 rounded-xl flex flex-col items-center justify-center">
          <h4 className="text-sm font-semibold text-content-primary mb-4 self-start">Sentiment Distribution</h4>
          <div className="relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={nlpSentimentDonut}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {nlpSentimentDonut.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip
                  content={({ payload }) => {
                    if (!payload || !payload.length) return null;
                    return (
                      <div className="bg-white border border-gray-200 shadow-lg p-2 rounded text-xs">
                        <span className="text-content-primary">{payload[0].name}: {payload[0].value}%</span>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xs font-semibold text-content-secondary">Sentiment</span>
            </div>
          </div>
          <div className="space-y-2 mt-4 w-full">
            {nlpSentimentDonut.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                  <span className="text-content-secondary">{item.name}</span>
                </div>
                <span className="text-content-primary font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row: Topics Bar Chart + Word Cloud */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Bar Chart */}
        <div className="glass-card p-5 rounded-xl">
          <h4 className="text-sm font-semibold text-content-primary mb-4">Top Topics by Volume</h4>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={sortedTopics} layout="vertical" margin={{ left: 10, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#5f6368', fontSize: 11 }} axisLine={false} />
              <YAxis
                type="category"
                dataKey="topic"
                tick={{ fill: '#5f6368', fontSize: 11 }}
                axisLine={false}
                width={110}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white border border-gray-200 shadow-lg p-3 rounded-lg text-xs">
                      <p className="text-content-primary font-medium mb-1">{data.topic}</p>
                      <p className="text-content-secondary">Count: {data.count.toLocaleString()}</p>
                      <p className="text-content-secondary">Sentiment: {data.sentiment}</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                {sortedTopics.map((entry, i) => {
                  // Color based on sentiment: green for high, yellow for mid, red for low
                  const s = entry.sentiment;
                  const color = s >= 0.7 ? '#34A853' : s >= 0.5 ? '#FBBC05' : '#EA4335';
                  return <Cell key={i} fill={color} fillOpacity={0.75} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-content-tertiary mt-2">Bar color reflects topic sentiment (green = positive, yellow = mixed, red = negative)</p>
        </div>

        {/* Word Cloud */}
        <div className="glass-card p-5 rounded-xl">
          <h4 className="text-sm font-semibold text-content-primary mb-2 flex items-center gap-2">
            <Brain size={14} className="text-accent" />
            NLP Word Cloud
          </h4>
          <WordCloud words={nlpWordCloud} />
        </div>
      </div>

      {/* Row: Model Metrics Gauges + Confusion Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Metrics Gauges */}
        <div className="glass-card p-5 rounded-xl">
          <h4 className="text-sm font-semibold text-content-primary mb-6">Model Performance</h4>
          <div className="grid grid-cols-2 gap-6 place-items-center">
            {gauges.map((g, i) => (
              <RadialGauge key={g.label} label={g.label} value={g.value} color={g.color} index={i} />
            ))}
          </div>
        </div>

        {/* Confusion Matrix */}
        <div className="glass-card p-5 rounded-xl">
          <h4 className="text-sm font-semibold text-content-primary mb-4">Confusion Matrix</h4>
          <p className="text-[11px] text-content-tertiary mb-4">3-class sentiment classification (diagonal = correct)</p>
          <ConfusionMatrix matrix={nlpConfusionMatrix} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(NLPAnalytics);
