import React, { useEffect, useRef, useState } from 'react';

/**
 * Counts a figure up when it first scrolls into view.
 *
 * Takes the rendered string ("50M+", "5k+", "5+") and animates only the
 * numeric part, so suffixes and units survive untouched. Anyone who asked for
 * reduced motion just gets the final value.
 */
const CountUp: React.FC<{ value: string; className?: string }> = ({ value, className = '' }) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const decimals = match && match[1].includes('.') ? 1 : 0;

  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(match ? 0 : target);
  const [done, setDone] = useState(!match);

  useEffect(() => {
    if (done || !ref.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(target);
      setDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setDone(true);

        const duration = 1400;
        const start = performance.now();
        let frame = 0;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // easeOutCubic: expo was so front-loaded the digits were unreadable
          // in flight, which defeats the point of counting them up.
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(target * eased);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
      },
      { threshold: 0.4 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [done, target]);

  return (
    <span ref={ref} className={className}>
      <span className="tabular-nums">{display.toFixed(decimals)}</span>
      {suffix}
    </span>
  );
};

export default CountUp;
