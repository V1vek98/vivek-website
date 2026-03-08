import { motion } from 'framer-motion';
import Container from '../layout/Container';
import Section from '../layout/Section';
import DataPipeline from '../ui/DataPipeline';
import GitCommitCard from '../ui/GitCommitCard';
import { experiences, education } from '../../config/data';
import { fadeInUp } from '../../utils/animations';

export default function ExperienceSection() {
  return (
    <Section id="experience" bg="alt">
      <Container>
        {/* Header */}
        <motion.div {...fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-xs text-content-tertiary mb-2">
            <span className="text-accent-blue">pipeline_runs</span>: career.log
          </div>
          <h2 className="text-h2 font-bold text-content-primary">git log --oneline</h2>
        </motion.div>

        <div className="relative">
          {/* Central pipeline - desktop only */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0">
            <DataPipeline height={experiences.length * 350 + 300} />
          </div>

          {/* Mobile timeline line */}
          <div className="lg:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-surface-tertiary" />

          {/* Experience cards */}
          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp, i) => {
              const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
              return (
                <div key={exp.id} className="relative pl-10 lg:pl-0 lg:px-8">
                  {/* Mobile timeline dot */}
                  <div
                    className="lg:hidden absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  />
                  <GitCommitCard
                    data={exp}
                    side={i % 2 === 0 ? 'left' : 'right'}
                    index={i}
                  />
                </div>
              );
            })}

            {/* Education - merge commit */}
            <div className="relative pl-10 lg:pl-0 lg:px-8">
              {/* Mobile timeline dot */}
              <div
                className="lg:hidden absolute left-2.5 top-6 w-3 h-3 rounded-full border-2 border-white shadow-sm bg-accent-blue"
              />
              <GitCommitCard
                data={education}
                side={experiences.length % 2 === 0 ? 'left' : 'right'}
                isEducation
                index={experiences.length}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
