import { useCallback, useEffect, useRef, useState } from 'react';

// 데스크톱 hover/focus 와 모바일 tap 모두에서 동일한 '활성' 상태를 제공하는 훅.
// 터치 기기는 :hover 가 없으므로 탭으로 토글하고, 바깥을 탭하면 닫힌다.
export function useHoverActive() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  const onMouseEnter = useCallback(() => setActive(true), []);
  const onMouseLeave = useCallback(() => setActive(false), []);
  const onFocus = useCallback(() => setActive(true), []);
  const onBlur = useCallback(() => setActive(false), []);
  const onTouchStart = useCallback((e) => {
    e.stopPropagation();
    setActive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const handleOutsideTouch = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setActive(false);
    };
    document.addEventListener('touchstart', handleOutsideTouch);
    return () => document.removeEventListener('touchstart', handleOutsideTouch);
  }, [active]);

  return { ref, active, handlers: { onMouseEnter, onMouseLeave, onFocus, onBlur, onTouchStart } };
}
