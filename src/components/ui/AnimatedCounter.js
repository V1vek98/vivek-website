import useAnimatedCounter from '../../hooks/useAnimatedCounter';

export default function AnimatedCounter({ value, duration = 2000, suffix = '', prefix = '', className = '' }) {
  const { count, ref } = useAnimatedCounter(value, duration);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
