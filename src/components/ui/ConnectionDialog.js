import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { connectionDialogData } from '../../config/data';

const protocols = [
  { label: 'Email', icon: Mail, href: 'mailto:vspatel360@gmail.com' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/vspatel360' },
  { label: 'GitHub', icon: Github, href: 'https://github.com/V1vek98' },
  { label: 'Phone', icon: Phone, href: 'tel:+14802338735' },
];

export default function ConnectionDialog({ className = '' }) {
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const d = connectionDialogData;

  const handleTest = () => {
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult('Connection successful! Latency: 42ms');
      setTimeout(() => setTestResult(null), 4000);
    }, 2000);
  };

  return (
    <div className={`rounded-xl overflow-hidden bg-white border border-surface-tertiary shadow-lg ${className}`}>
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-secondary border-b border-surface-tertiary">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-accent-red" />
          <div className="w-3 h-3 rounded-full bg-accent-yellow" />
          <div className="w-3 h-3 rounded-full bg-accent-green" />
        </div>
        <span className="text-xs text-content-tertiary font-mono ml-2">connection_config.yml</span>
      </div>

      <div className="p-6">
        {/* Config grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-sm">
          <div>
            <span className="text-content-tertiary">host:</span>
            <span className="ml-2 text-content-primary">{d.host}</span>
          </div>
          <div>
            <span className="text-content-tertiary">port:</span>
            <span className="ml-2 text-content-primary">{d.port}</span>
          </div>
          <div>
            <span className="text-content-tertiary">auth:</span>
            <span className="ml-2 text-accent-green">{d.auth}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-content-tertiary">status:</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-accent-green opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-accent-green" />
            </span>
            <span className="text-accent-green">{d.status}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 mb-6 text-sm">
          <div>
            <span className="text-content-tertiary">avg_response:</span>
            <span className="ml-2 text-content-primary font-mono">{d.avgResponse}</span>
          </div>
          <div>
            <span className="text-content-tertiary">uptime:</span>
            <span className="ml-2 text-content-primary font-mono">{d.uptime}</span>
          </div>
        </div>

        {/* Protocol buttons */}
        <div className="mb-6">
          <span className="text-xs text-content-tertiary font-mono block mb-2">protocol:</span>
          <div className="flex flex-wrap gap-2">
            {protocols.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target={label !== 'Email' && label !== 'Phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-surface-secondary rounded-lg text-sm font-medium text-content-primary hover:bg-accent-blue hover:text-white transition-colors"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Test connection */}
        <button
          onClick={handleTest}
          disabled={testing}
          className="w-full py-2.5 bg-accent-blue text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-60"
        >
          {testing ? 'Testing...' : 'Test Connection'}
        </button>

        {/* Test progress */}
        {testing && (
          <div className="mt-3 h-1 bg-surface-tertiary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full boot-progress rounded-full"
            />
          </div>
        )}

        {/* Test result */}
        {testResult && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-mono"
          >
            {testResult}
          </motion.div>
        )}
      </div>
    </div>
  );
}
