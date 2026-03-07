import { useState, useEffect, useCallback } from 'react';

export default function TypewriterText({ texts = [], speed = 80, deleteSpeed = 40, pauseDuration = 2000, className = '' }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentText = texts[textIndex] || '';

    if (!isDeleting) {
      setDisplayText(currentText.substring(0, displayText.length + 1));
      if (displayText.length === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      setDisplayText(currentText.substring(0, displayText.length - 1));
      if (displayText.length === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }
    }
  }, [displayText, isDeleting, textIndex, texts, pauseDuration]);

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, deleteSpeed, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink-cursor text-accent-blue">|</span>
    </span>
  );
}
