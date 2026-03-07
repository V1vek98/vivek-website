import { motion } from 'framer-motion';

export default function AnimatedText({ text, className = '', as: Tag = 'span', delay = 0 }) {
  const letters = text.split('');

  return (
    <Tag className={`inline-block ${className}`}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + i * 0.03,
            type: 'spring',
            stiffness: 120,
            damping: 14,
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
}
