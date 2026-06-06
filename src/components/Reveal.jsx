import { useInView } from '../hooks/useInView';

/**
 * Wraps children in a scroll-triggered reveal.
 * variant: 'up' | 'left' | 'right' | 'scale'
 * delay: extra CSS transition-delay in seconds
 * stagger: adds reveal-stagger class so nth-child delays apply
 */
export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  stagger = false,
  threshold = 0.12,
  style = {},
  className = '',
}) {
  const [ref, visible] = useInView(threshold);

  const cls = {
    up:    'reveal',
    left:  'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[variant] ?? 'reveal';

  return (
    <div
      ref={ref}
      className={`${cls} ${visible ? 'visible' : ''} ${stagger ? 'reveal-stagger' : ''} ${className}`}
      style={{ transitionDelay: delay ? `${delay}s` : undefined, ...style }}
    >
      {children}
    </div>
  );
}
