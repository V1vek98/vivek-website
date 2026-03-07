import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Download, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import AnimatedText from '../ui/AnimatedText';
import TypewriterText from '../ui/TypewriterText';
import KPICard from '../ui/KPICard';
import ScrollIndicator from '../ui/ScrollIndicator';
import BackgroundDecoration from '../ui/BackgroundDecoration';
import MagneticButton from '../ui/MagneticButton';
import useTimeGreeting from '../../hooks/useTimeGreeting';
import { personalInfo, heroKPIs } from '../../config/data';
import { staggerContainer, staggerItem } from '../../utils/animations';

const ParticleField = lazy(() => import('../ui/ParticleField'));

export default function HeroSection() {
  const greeting = useTimeGreeting();

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-8">
      <BackgroundDecoration />
      <div className="absolute inset-0 dot-grid" />
      <Suspense fallback={null}>
        <ParticleField count={35} />
      </Suspense>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left - 60% */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3"
          >
            <motion.div variants={staggerItem} className="font-mono text-sm text-content-tertiary mb-4">
              {greeting} &mdash; <span className="text-accent-green">system online</span>
            </motion.div>

            <motion.div variants={staggerItem}>
              <AnimatedText text={personalInfo.name} as="h1" className="text-display font-bold text-content-primary leading-tight" />
            </motion.div>

            <motion.div variants={staggerItem} className="mt-4 text-h3 font-medium text-content-secondary">
              <TypewriterText texts={personalInfo.rotatingTitles} />
            </motion.div>

            <motion.p variants={staggerItem} className="mt-6 text-xl font-serif italic text-content-secondary max-w-xl">
              "{personalInfo.tagline}"
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-4 mt-8">
              <MagneticButton
                as="a"
                href="/dashboards"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-blue text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-blue-200 transition-shadow"
              >
                <Link to="/dashboards" className="flex items-center gap-2 text-white no-underline">
                  <BarChart3 size={18} />
                  View Live Dashboards
                </Link>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={personalInfo.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-surface-tertiary text-content-primary rounded-xl font-medium text-sm hover:shadow-lg transition-shadow"
              >
                <Download size={18} />
                Download .csv Resume
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right - 40% KPI Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-3">
              {heroKPIs.map((kpi, i) => (
                <KPICard key={kpi.label} {...kpi} index={i} />
              ))}
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </Container>
    </section>
  );
}
