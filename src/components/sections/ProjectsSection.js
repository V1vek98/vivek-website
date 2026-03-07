import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import Section from '../layout/Section';
import ProjectMiniPreview from '../ui/ProjectMiniPreview';
import Modal from '../ui/Modal';
import { projects } from '../../config/data';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const filters = ['All', 'dashboard', 'ml', 'data', 'fullstack'];
const filterLabels = { All: 'All', dashboard: 'Dashboards', ml: 'ML / AI', data: 'Data', fullstack: 'Full Stack' };

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <Section id="projects">
      <Container>
        {/* Header */}
        <motion.div {...fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
          <div className="font-mono text-xs text-content-tertiary mb-2">
            <span className="text-accent-blue">LIVE QUERIES</span>
          </div>
          <h2 className="text-h2 font-bold text-content-primary">Featured Projects</h2>
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
                  layoutId="project-filter"
                  className="absolute inset-0 bg-accent-blue rounded-full"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filterLabels[f]}</span>
            </button>
          ))}
        </div>

        {/* Project cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={staggerItem}
                className={`glass-card-hover rounded-xl overflow-hidden group cursor-pointer ${
                  project.featured ? 'md:col-span-2' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Hover gradient line */}
                <div className="h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: project.color }} />

                <div className="p-6">
                  <ProjectMiniPreview type={project.previewType} color={project.color} className="mb-4" />

                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-tertiary text-content-tertiary">
                    {project.category}
                  </span>

                  <h3 className="text-lg font-bold text-content-primary mt-2">{project.title}</h3>
                  <p className="text-sm text-content-tertiary font-mono italic mb-2">{project.oneLiner}</p>
                  <p className="text-sm text-content-secondary mb-4 line-clamp-2">{project.description}</p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-surface-tertiary text-content-secondary text-xs rounded-md font-mono">{t}</span>
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="flex gap-4">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-lg font-bold" style={{ color: project.color }}>{m.value}</div>
                        <div className="text-[10px] text-content-tertiary uppercase">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dashboard CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-accent-blue/5 via-accent-red/5 to-accent-green/5 border border-surface-tertiary text-center"
        >
          <h3 className="text-xl font-bold text-content-primary mb-2">Want to see dashboards in action?</h3>
          <p className="text-sm text-content-secondary mb-4">Check out 4 fully interactive dashboard demos I built</p>
          <Link
            to="/dashboards"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-200 transition-shadow no-underline"
          >
            View Dashboard Showcase <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Detail Modal */}
        <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} title={selectedProject?.title}>
          {selectedProject && (
            <div>
              <p className="text-sm text-content-tertiary font-mono italic mb-4">{selectedProject.oneLiner}</p>
              <p className="text-content-secondary mb-6">{selectedProject.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((t) => (
                  <span key={t} className="px-3 py-1 bg-surface-tertiary text-content-secondary text-sm rounded-lg font-mono">{t}</span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                {selectedProject.metrics.map((m) => (
                  <div key={m.label} className="text-center p-3 bg-surface-secondary rounded-lg">
                    <div className="text-2xl font-bold" style={{ color: selectedProject.color }}>{m.value}</div>
                    <div className="text-xs text-content-tertiary uppercase mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-content-primary text-white rounded-lg text-sm">
                    <Github size={16} /> GitHub
                  </a>
                )}
                {selectedProject.live && (
                  <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-lg text-sm">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
      </Container>
    </Section>
  );
}
