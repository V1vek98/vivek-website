import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';

export default function GitCommitCard({ data, side = 'left', isEducation = false, index = 0 }) {
  const { commitHash, commitTag, company, title, location, period, wittyLine, wittyDetail, achievements, technologies, metrics } = data;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? -20 : (side === 'left' ? -30 : 30) }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className={`relative w-full lg:max-w-lg ${side === 'right' ? 'lg:ml-auto' : ''}`}
    >
      {/* Timeline dot */}
      <div className={`absolute top-6 ${side === 'left' ? '-right-[2.05rem]' : '-left-[2.05rem]'} w-4 h-4 rounded-full bg-accent-blue border-4 border-white shadow-sm hidden lg:block`} />

      <div className="glass-card-hover p-5 rounded-xl">
        {/* Git header */}
        <div className="font-mono text-xs text-content-tertiary mb-3 space-y-0.5">
          <div className="flex items-center gap-2">
            <GitCommit size={12} className="text-accent-blue" />
            <span className="text-accent-yellow">{commitHash}</span>
            {commitTag && <span className="px-1.5 py-0.5 bg-accent-blue/10 text-accent-blue rounded text-[10px]">{commitTag}</span>}
          </div>
          <div>
            {isEducation ? 'Merge: origin/education → main' : `Author: Vivek Patel <vivek.patel2901@gmail.com>`}
          </div>
          <div>Date: {period}</div>
        </div>

        {/* Company & title */}
        <h3 className="text-lg font-bold text-content-primary">{company || data.school}</h3>
        <p className="text-sm font-medium text-accent-blue mb-1">{title || data.degree}</p>
        <p className="text-xs text-content-tertiary mb-3">{location}</p>

        {/* Witty lines */}
        {wittyLine && (
          <div className="font-mono text-xs text-content-secondary mb-3 pl-3 border-l-2 border-accent-yellow">
            <div>&gt; {wittyLine}</div>
            {wittyDetail && <div className="text-content-tertiary">&gt; {wittyDetail}</div>}
          </div>
        )}

        {/* Achievements */}
        {achievements && (
          <ul className="space-y-1 mb-3">
            {achievements.map((a, i) => (
              <li key={i} className="text-sm text-content-secondary flex gap-2">
                <span className="text-accent-green mt-1 flex-shrink-0">+</span>
                {a}
              </li>
            ))}
          </ul>
        )}

        {/* Education highlights */}
        {data.highlights && (
          <ul className="space-y-1 mb-3">
            {data.highlights.map((h, i) => (
              <li key={i} className="text-sm text-content-secondary flex gap-2">
                <span className="text-accent-green mt-1 flex-shrink-0">+</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Metrics */}
        {metrics && (
          <div className="font-mono text-xs bg-surface-secondary rounded-lg p-2 mb-3">
            <span className="text-content-tertiary">{'{'}</span>
            {Object.entries(metrics).map(([k, v], i) => (
              <span key={k}>
                <span className="text-accent-blue"> "{k}"</span>
                <span className="text-content-tertiary">: </span>
                <span className="text-accent-green">"{v}"</span>
                {i < Object.entries(metrics).length - 1 && <span className="text-content-tertiary">,</span>}
              </span>
            ))}
            <span className="text-content-tertiary"> {'}'}</span>
          </div>
        )}

        {/* Technologies */}
        {technologies && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span key={tech} className="px-2 py-0.5 bg-surface-tertiary text-content-secondary text-xs rounded-md font-mono">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
