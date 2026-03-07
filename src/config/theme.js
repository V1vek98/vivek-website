const theme = {
  colors: {
    surface: { primary: '#FFFFFF', secondary: '#F8FAFC', tertiary: '#F1F5F9' },
    content: { primary: '#0F172A', secondary: '#475569', tertiary: '#94A3B8' },
    accent: {
      blue: '#4285F4',
      red: '#EA4335',
      yellow: '#FBBC05',
      green: '#34A853',
    },
    google: ['#4285F4', '#EA4335', '#FBBC05', '#34A853'],
  },
  typography: {
    display: 'clamp(3rem, 7vw, 5.5rem)',
    h1: 'clamp(2rem, 4.5vw, 3.5rem)',
    h2: 'clamp(1.5rem, 3vw, 2.5rem)',
    h3: 'clamp(1.25rem, 2vw, 1.75rem)',
  },
  fonts: {
    sans: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
    serif: "'Instrument Serif', Georgia, serif",
  },
  animation: {
    easing: {
      smooth: [0.25, 0.46, 0.45, 0.94],
      bounce: [0.68, -0.55, 0.265, 1.55],
      snap: [0.77, 0, 0.175, 1],
    },
    spring: {
      gentle: { type: 'spring', stiffness: 120, damping: 14 },
      snappy: { type: 'spring', stiffness: 300, damping: 30 },
      wobbly: { type: 'spring', stiffness: 180, damping: 12 },
    },
    duration: {
      fast: 0.2,
      normal: 0.4,
      slow: 0.8,
      glacial: 1.2,
    },
  },
  parallax: {
    slow: 0.3,
    medium: 0.5,
    fast: 0.8,
  },
};

export default theme;
