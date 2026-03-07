import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import BottomTabBar from './components/layout/BottomTabBar';
import BreadcrumbBar from './components/layout/BreadcrumbBar';
import Footer from './components/layout/Footer';
import PageTransition from './components/layout/PageTransition';
import BootSequence from './components/ui/BootSequence';
import CustomCursor from './components/ui/CustomCursor';
import CursorTrail from './components/ui/CursorTrail';
import CommandPalette from './components/ui/CommandPalette';
import useReducedMotion from './hooks/useReducedMotion';
import useKonamiCode from './hooks/useKonamiCode';
import { easterEggs } from './config/data';
import HomePage from './pages/HomePage';

const DashboardShowcase = lazy(() => import('./pages/DashboardShowcase'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function KonamiOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center" onClick={onClose}>
      <div className="text-center text-white p-8 animate-bounce">
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="text-2xl font-bold mb-2">{easterEggs.konamiReward}</h2>
        <p className="text-gray-400 text-sm font-mono">&#8593;&#8593;&#8595;&#8595;&#8592;&#8594;&#8592;&#8594;BA</p>
        <p className="text-gray-500 text-xs mt-4">Click anywhere to close</p>
      </div>
    </div>
  );
}

export default function App() {
  const reducedMotion = useReducedMotion();
  const { activated: konamiActivated, reset: resetKonami } = useKonamiCode();
  const [bootComplete, setBootComplete] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;

  // Console easter egg
  useEffect(() => {
    console.log(
      '%c' + easterEggs.consoleMessage,
      'color: #4285F4; font-size: 12px; font-family: monospace;'
    );
  }, []);

  // Ctrl+K handler
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Skip boot on reduced motion
  useEffect(() => {
    if (reducedMotion) setBootComplete(true);
  }, [reducedMotion]);

  return (
    <Router>
      <div className="noise-overlay">
        {/* Boot sequence */}
        {!bootComplete && !reducedMotion && (
          <BootSequence onComplete={() => setBootComplete(true)} />
        )}

        {/* Custom cursor - desktop only, not reduced motion */}
        {bootComplete && !reducedMotion && !isTouch && <CustomCursor />}
        {bootComplete && !reducedMotion && !isTouch && <CursorTrail />}

        {/* Konami overlay */}
        {konamiActivated && <KonamiOverlay onClose={resetKonami} />}

        {/* Navigation */}
        {bootComplete && (
          <>
            <BreadcrumbBar onSearchClick={() => setCommandPaletteOpen(true)} />
            <Sidebar />

            <div className="dashboard-content pt-8">
              <Suspense fallback={<div className="min-h-screen" />}>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboards" element={<DashboardShowcase />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </PageTransition>
              </Suspense>
              <Footer />
            </div>

            <BottomTabBar />
            <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
          </>
        )}
      </div>
    </Router>
  );
}
