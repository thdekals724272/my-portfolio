import { useEffect, useRef } from 'react';

// 스크롤 위치를 rAF로 스로틀링해 엘리먼트의 CSS 변수(--parallax-y)에 직접 반영한다.
// React state를 쓰지 않고 DOM에 바로 쓰기 때문에 스크롤마다 리렌더가 발생하지 않는다.
// prefers-reduced-motion 이면 리스너 자체를 붙이지 않는다.
export function useScrollParallax(speed = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top * speed;
      el.style.setProperty('--parallax-y', `${offset}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}
