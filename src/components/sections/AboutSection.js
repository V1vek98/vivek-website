import { motion } from 'framer-motion';
import Container from '../layout/Container';
import Section from '../layout/Section';
import DonutProfileFrame from '../ui/DonutProfileFrame';
import CodeBlock from '../ui/CodeBlock';
import StatusBadge from '../ui/StatusBadge';
import { personalInfo, pythonClassBio, statusBadges } from '../../config/data';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';

export default function AboutSection() {
  return (
    <Section id="about" bg="alt">
      <Container>
        {/* SQL Header */}
        <motion.div {...fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-xs text-content-tertiary mb-2">
            <span className="text-accent-blue">SELECT</span> * <span className="text-accent-blue">FROM</span> developers{' '}
            <span className="text-accent-blue">WHERE</span> name = <span className="text-accent-green">'Vivek Patel'</span>;
          </div>
          <div className="font-mono text-xs text-content-tertiary">
            <span className="text-accent-green">-- 1 row returned</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-12 items-start">
          {/* Left - Profile */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col items-center"
          >
            <DonutProfileFrame imageSrc={personalInfo.profileImage} size={260} />
            <p className="mt-8 text-center text-content-secondary text-sm max-w-sm">
              {personalInfo.bio}
            </p>
          </motion.div>

          {/* Right - Code block */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3 min-w-0"
          >
            <CodeBlock code={pythonClassBio} filename="vivek_patel.py" />
          </motion.div>
        </div>

        {/* Status badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-12"
        >
          {statusBadges.map((badge) => (
            <StatusBadge key={badge.label} {...badge} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
