import { useEffect, useRef, useState } from 'react';
import { resolveThumbnailUrl } from '../utils/resolveThumbnailUrl';

// 프로젝트 썸네일 로딩 상태를 관리하는 훅.
// onLoad/onError 뿐 아니라, 지정 시간 안에 응답이 없으면(외부 스크린샷 생성 서비스가
// 느리거나 멈춘 경우) 강제로 실패 처리해 무한 로딩 스피너를 방지한다.
export function useThumbnail(url, { timeout = 12000 } = {}) {
  const src = resolveThumbnailUrl(url);
  const [state, setState] = useState(src ? 'loading' : 'error'); // 'loading' | 'loaded' | 'error'
  const timerRef = useRef(null);

  useEffect(() => {
    if (!src) return undefined;

    timerRef.current = setTimeout(() => {
      setState((s) => (s === 'loading' ? 'error' : s));
    }, timeout);

    return () => clearTimeout(timerRef.current);
  }, [src, timeout]);

  const handleLoad = () => {
    clearTimeout(timerRef.current);
    setState('loaded');
  };
  const handleError = () => {
    clearTimeout(timerRef.current);
    setState('error');
  };

  return { src, state, handleLoad, handleError };
}
