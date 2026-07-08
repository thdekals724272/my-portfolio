import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';

// 요소 종류별 목표 스케일 — 카드 > 버튼 > 링크 > 기본 순으로 커진다
const KIND_SCALE = { default: 1, link: 1.15, button: 1.5, card: 2.1 };
const KIND_LOOK = {
  default: { background: 'rgba(122,143,123,0.16)', borderColor: 'rgba(122,143,123,0.5)' },
  button: { background: 'rgba(122,143,123,0.22)', borderColor: 'rgba(122,143,123,0.65)' },
  card: { background: 'rgba(122,143,123,0.1)', borderColor: 'rgba(122,143,123,0.4)' },
  link: { background: 'rgba(217,162,115,0.28)', borderColor: 'rgba(217,162,115,0.75)' },
};

// 데스크톱 전용 커스텀 커서 팔로워. 기본 커서는 그대로 두고,
// 은은한 반투명 원이 약간의 딜레이(lerp)를 두고 따라오도록 requestAnimationFrame으로 구현한다.
function CursorFollower() {
  const dotRef = useRef(null);
  // 터치/모바일·prefers-reduced-motion 이면 아예 비활성화 (렌더 자체를 하지 않음)
  const enabledRef = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (!enabledRef.current) return undefined;
    const el = dotRef.current;
    if (!el) return undefined;

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const follower = { ...pointer };
    let scale = 1;
    let targetScale = 1;
    let pressed = false;
    let currentKind = 'default';
    let visible = false;

    const applyKind = (kind) => {
      if (kind === currentKind) return;
      currentKind = kind;
      const look = KIND_LOOK[kind];
      el.style.background = look.background;
      el.style.borderColor = look.borderColor;
      targetScale = KIND_SCALE[kind] * (pressed ? 0.7 : 1);
    };

    const handleMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = '1';
        follower.x = e.clientX;
        follower.y = e.clientY;
      }
    };
    const handleLeaveWindow = () => {
      visible = false;
      el.style.opacity = '0';
    };
    const handleOver = (e) => {
      const target = e.target;
      if (target.closest?.('.zoom-trigger')) applyKind('card');
      else if (target.closest?.('.MuiButtonBase-root')) applyKind('button');
      else if (target.closest?.('a[href]')) applyKind('link');
      else applyKind('default');
    };
    const handleDown = () => {
      pressed = true;
      targetScale = KIND_SCALE[currentKind] * 0.7;
    };
    const handleUp = () => {
      pressed = false;
      targetScale = KIND_SCALE[currentKind];
    };

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseleave', handleLeaveWindow);
    document.addEventListener('mousedown', handleDown);
    document.addEventListener('mouseup', handleUp);

    let raf = requestAnimationFrame(function tick() {
      // 위치와 스케일 모두 lerp로 부드럽게 목표값을 뒤쫓아간다 (60fps, GPU 가속 transform)
      follower.x += (pointer.x - follower.x) * 0.18;
      follower.y += (pointer.y - follower.y) * 0.18;
      scale += (targetScale - scale) * 0.22;
      el.style.transform = `translate3d(${follower.x}px, ${follower.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeaveWindow);
      document.removeEventListener('mousedown', handleDown);
      document.removeEventListener('mouseup', handleUp);
    };
  }, []);

  if (!enabledRef.current) return null;

  return (
    <Box
      ref={dotRef}
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'rgba(122,143,123,0.16)',
        border: '1px solid rgba(122,143,123,0.5)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        pointerEvents: 'none',
        zIndex: 2000,
        opacity: 0,
        willChange: 'transform, opacity',
        transition: 'opacity 0.25s ease, background 0.3s ease, border-color 0.3s ease',
      }}
    />
  );
}

export default CursorFollower;
