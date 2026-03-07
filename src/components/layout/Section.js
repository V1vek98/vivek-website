import { motion } from 'framer-motion';

const bgVariants = {
  default: 'bg-surface-primary',
  alt: 'bg-surface-secondary',
  tertiary: 'bg-surface-tertiary',
};

export default function Section({ id, children, bg = 'default', className = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
      className={`py-20 md:py-28 ${bgVariants[bg] || bgVariants.default} ${className}`}
    >
      {children}
    </motion.section>
  );
}
