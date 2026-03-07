import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import Container from '../layout/Container';
import Section from '../layout/Section';
import { skillCategories, radarSkills } from '../../config/data';
import { fadeInUp } from '../../utils/animations';

const filters = ['All', 'Languages', 'Frameworks', 'Data & Analytics'];
const proficiencyColor = (p) => p >= 85 ? '#34A853' : p >= 70 ? '#4285F4' : p >= 50 ? '#FBBC05' : '#EA4335';

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCategories = activeFilter === 'All'
    ? skillCategories
    : skillCategories.filter((c) => c.name === activeFilter);

  const allSkills = filteredCategories.flatMap((c) => c.skills);

  return (
    <Section id="skills">
      <Container>
        {/* Header */}
        <motion.div {...fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
          <div className="font-mono text-xs text-content-tertiary mb-2">
            <span className="text-accent-blue">DEPENDENCIES</span>
          </div>
          <h2 className="text-h2 font-bold text-content-primary">
            pip install <span className="text-accent-blue">vivek-patel</span>==latest
          </h2>
        </motion.div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10 relative">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f ? 'text-white' : 'text-content-secondary hover:text-content-primary bg-surface-secondary'
              }`}
            >
              {activeFilter === f && (
                <motion.div
                  layoutId="skill-filter"
                  className="absolute inset-0 bg-accent-blue rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-6 rounded-xl"
          >
            <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4">Skill Radar</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarSkills}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: '#475569' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  dataKey="value"
                  stroke="#4285F4"
                  fill="#4285F4"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar chart & heatmap */}
          <div className="space-y-6">
            {/* Horizontal bars */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-xl"
            >
              <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4">Proficiency</h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {allSkills.slice(0, 8).map((skill, i) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-content-primary font-medium">{skill.name}</span>
                        <span className="text-content-tertiary font-mono text-xs">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 bg-surface-tertiary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08, duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: proficiencyColor(skill.proficiency) }}
                        />
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Tech heatmap */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-xl"
            >
              <h3 className="text-sm font-medium text-content-tertiary uppercase tracking-wider mb-4">Experience Heatmap (years)</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {allSkills.map((skill) => (
                  <div
                    key={skill.name}
                    className="text-center p-2 rounded-lg transition-transform hover:scale-105 cursor-default"
                    style={{ backgroundColor: `rgba(66, 133, 244, ${skill.years / 7})` }}
                    title={`${skill.name}: ${skill.years} years`}
                  >
                    <div className="text-[10px] font-mono text-white/90 truncate">{skill.name}</div>
                    <div className="text-xs font-bold text-white">{skill.years}y</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <p className="text-xs text-content-tertiary text-center mt-8 font-mono italic">
          * Proficiency levels are self-assessed and relative. Your mileage may vary.
        </p>
      </Container>
    </Section>
  );
}
