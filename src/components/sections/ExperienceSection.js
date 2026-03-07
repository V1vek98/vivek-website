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

          {/* Experience cards */}
          <div className="space-y-8 lg:space-y-12">
            {experiences.map((exp, i) => (
              <div key={exp.id} className="lg:px-8">
                <GitCommitCard
                  data={exp}
                  side={i % 2 === 0 ? 'left' : 'right'}
                  index={i}
                />
              </div>
            ))}

            {/* Education - merge commit */}
            <div className="lg:px-8">
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
