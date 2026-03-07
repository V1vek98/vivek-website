import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SaaSAnalytics = lazy(() => import('../components/dashboards/SaaSAnalytics'));
const HotelPerformance = lazy(() => import('../components/dashboards/HotelPerformance'));
const SupplyChainOps = lazy(() => import('../components/dashboards/SupplyChainOps'));
const NLPAnalytics = lazy(() => import('../components/dashboards/NLPAnalytics'));

const tabs = [
  { id: 'saas', label: 'SaaS Analytics', component: SaaSAnalytics },
  { id: 'hotel', label: 'Hotel Performance', component: HotelPerformance },
  { id: 'supply', label: 'Supply Chain', component: SupplyChainOps },
  { id: 'nlp', label: 'NLP Analytics', component: NLPAnalytics },
];

function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-surface-tertiary rounded-xl" />
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-64 bg-surface-tertiary rounded-xl" />
        <div className="h-64 bg-surface-tertiary rounded-xl" />
      </div>
      <div className="h-48 bg-surface-tertiary rounded-xl" />
    </div>
  );
}

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState('saas');
  const ActiveDashboard = tabs.find((t) => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-surface-primary pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="p-2 rounded-lg hover:bg-surface-secondary transition-colors text-content-secondary">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-content-primary">Dashboard Showcase</h1>
            <p className="text-sm text-content-tertiary font-mono">Built by Vivek Patel</p>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mb-8 bg-surface-secondary p-1 rounded-xl overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'text-content-primary' : 'text-content-tertiary hover:text-content-secondary'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="dashboard-tab"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dashboard content */}
        <Suspense fallback={<Skeleton />}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-12"
          >
            {ActiveDashboard && <ActiveDashboard />}
          </motion.div>
        </Suspense>

        {/* Watermark */}
        <div className="fixed bottom-4 right-4 text-[10px] font-mono text-content-tertiary/40">
          Built by Vivek Patel
        </div>
      </div>
    </div>
  );
}
