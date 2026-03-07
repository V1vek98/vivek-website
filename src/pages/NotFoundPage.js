import { motion } from 'framer-motion';
import { Home, Search, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { easterEggs } from '../config/data';

export default function NotFoundPage() {
  const { notFoundCopy } = easterEggs;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-surface-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full"
      >
        {/* Terminal card */}
        <div className="rounded-xl overflow-hidden bg-[#0F172A] shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1E293B] border-b border-[#334155]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#EA4335]" />
              <div className="w-3 h-3 rounded-full bg-[#FBBC05]" />
              <div className="w-3 h-3 rounded-full bg-[#34A853]" />
            </div>
            <span className="text-xs text-gray-400 font-mono ml-2">query_result</span>
          </div>

          <div className="p-6 font-mono text-sm">
            <div className="text-gray-400 mb-2">mysql&gt; <span className="text-gray-300">{notFoundCopy.query}</span></div>
            <div className="text-accent-red mb-4">{notFoundCopy.result}</div>
            <div className="text-6xl font-bold text-gradient-google mb-4">404</div>
            <h1 className="text-xl font-bold text-white mb-2">{notFoundCopy.title}</h1>
            <p className="text-gray-400 text-sm">{notFoundCopy.suggestion}</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Link to="/" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent-blue text-white rounded-xl text-sm font-medium no-underline hover:shadow-lg transition-shadow">
            <Home size={16} /> Go Home
          </Link>
          <Link to="/dashboards" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-surface-tertiary text-content-primary rounded-xl text-sm font-medium no-underline hover:shadow-lg transition-shadow">
            <BarChart3 size={16} /> Dashboards
          </Link>
          <button onClick={() => window.history.back()} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-surface-tertiary text-content-primary rounded-xl text-sm font-medium hover:shadow-lg transition-shadow">
            <Search size={16} /> Go Back
          </button>
        </div>

        <p className="text-xs text-content-tertiary text-center mt-6 font-mono italic">
          "Not all who wander are lost... but you definitely are."
        </p>
      </motion.div>
    </div>
  );
}
