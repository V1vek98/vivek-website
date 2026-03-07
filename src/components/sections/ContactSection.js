import { motion } from 'framer-motion';
import Container from '../layout/Container';
import Section from '../layout/Section';
import ConnectionDialog from '../ui/ConnectionDialog';
import { connectionDialogData } from '../../config/data';
import { fadeInUp } from '../../utils/animations';

export default function ContactSection() {
  return (
    <Section id="contact" bg="alt">
      <Container>
        {/* Header */}
        <motion.div {...fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
          <div className="font-mono text-xs text-content-tertiary mb-2">
            <span className="text-accent-blue">OPEN A TICKET</span>
          </div>
          <h2 className="text-h2 font-bold text-content-primary">Establish Connection</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ConnectionDialog />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-content-secondary mb-4">
              {connectionDialogData.bodyCopy}
            </p>
            <p className="text-xs text-content-tertiary font-mono italic">
              {connectionDialogData.fairWarning}
            </p>
            <p className="text-xs text-content-tertiary/60 mt-2 font-mono">
              {connectionDialogData.carrierPigeon}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
