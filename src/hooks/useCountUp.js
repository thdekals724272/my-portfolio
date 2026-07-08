import { useEffect, useRef, useState } from 'react';

// target 까지 requestAnimationFrame 으로 부드럽게 카운트업.
// active 가 true 로 바뀐 시점(스크롤 진입)에 한 번만 실행되고, prefers-reduced-motion 이면 즉시 목표값으로 이동.
export function useCountUp(target, { active = false, duration = 1200, delay = 0 } = {}) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return undefined;
    startedRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf;
    const timer = setTimeout(() => {
      if (prefersReducedMotion) {
        setValue(target);
        return;
      }
      const start = performance.now();
      const easeOutCubic = (t) => 1 - (1 - t) ** 3;

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        setValue(Math.round(target * easeOutCubic(progress)));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [active, target, duration, delay]);

  return value;
}
