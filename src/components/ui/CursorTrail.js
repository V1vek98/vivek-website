import { useEffect, useRef } from 'react';

const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

export default function CursorTrail() {
  const canvasRef = useRef(null);
  const points = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouse = (e) => {
      points.current.push({
        x: e.clientX,
        y: e.clientY,
        time: Date.now(),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };
    window.addEventListener('mousemove', handleMouse);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const now = Date.now();
      points.current = points.current.filter((p) => now - p.time < 500);

      points.current.forEach((p) => {
        const age = (now - p.time) / 500;
        const alpha = 1 - age;
        const size = 3 * (1 - age * 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha * 0.6;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[90]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
