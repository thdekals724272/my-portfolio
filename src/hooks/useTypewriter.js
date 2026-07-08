import { useEffect, useState } from 'react';

// setTimeout 체인으로 "타이핑 → 잠시 대기 → 지우기 → 다음 단어" 리듬을 제어하는 타이프라이터 훅.
// 탭이 백그라운드로 가면 자동으로 멈추고(pause), 다시 보이면 이어서 재생된다.
// prefers-reduced-motion 이면 글자 단위 타이핑 대신 단어 단위로 바로 전환한다.
export function useTypewriter(words, { typingSpeed = 90, deletingSpeed = 45, pauseDuration = 1500, active = true } = {}) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // 'typing' | 'deleting'
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const running = active && visible && words.length > 0;

  useEffect(() => {
    if (!running) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setText(words[wordIndex]);
        setWordIndex((i) => (i + 1) % words.length);
      }, pauseDuration + 900);
      return () => clearTimeout(timer);
    }

    const current = words[wordIndex];
    let timer;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timer = setTimeout(() => setPhase('deleting'), pauseDuration);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        timer = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase('typing');
        }, 0);
      }
    }

    return () => clearTimeout(timer);
  }, [running, text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
}
