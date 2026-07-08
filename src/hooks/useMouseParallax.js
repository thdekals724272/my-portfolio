import { useEffect, useRef } from 'react';

// 컨테이너 안에서 마우스 위치를 -1~1 범위로 정규화해 CSS 변수(--mx, --my)로 내려준다.
// 자식 요소들은 calc(var(--mx, 0) * 깊이값px) 형태로 각자 다른 깊이감을 적용하면 된다
// (CSS 변수는 자식으로 상속되므로 별도 prop 전달 없이 하위 어디서나 읽을 수 있다).
// 데스크톱(hover 가능 기기)에서만 동작하고, prefers-reduced-motion 이면 비활성화된다.
export function useMouseParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isDesktop || prefersReducedMotion) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const handleLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave);

    // 감쇠 계수가 낮을수록(0.06) 목표 지점을 천천히, 묵직하게 뒤쫓아가 고급스러운 느낌을 준다
    let raf = requestAnimationFrame(function tick() {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      el.style.setProperty('--mx', current.x.toFixed(3));
      el.style.setProperty('--my', current.y.toFixed(3));
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return ref;
}
