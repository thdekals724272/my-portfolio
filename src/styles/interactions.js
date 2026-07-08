// 사이트 전반에서 재사용하는 호버/포커스 인터랙션 스타일 모음.
// 데스크톱 hover 효과는 `@media (hover: hover) and (pointer: fine)` 로 감싸
// 모바일 터치 기기에서 hover 가 눌어붙는(sticky hover) 현상을 막는다.
// 터치 기기에서는 대신 :active(탭) 또는 useHoverActive 훅으로 동일한 느낌을 재현한다.

const HOVER_MEDIA = '@media (hover: hover) and (pointer: fine)';

// 그라데이션 배경 + 3D 틸트 + 리플이 살아있는 primary 버튼
export const gradientButtonSx = (from, to, glow) => ({
  position: 'relative',
  overflow: 'hidden',
  background: `linear-gradient(120deg, ${from} 0%, ${to} 100%)`,
  backgroundSize: '220% auto',
  backgroundPosition: '0% 50%',
  willChange: 'transform, box-shadow, background-position',
  transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, background-position 0.6s ease',
  [HOVER_MEDIA]: {
    '&:hover': {
      backgroundPosition: '100% 50%',
      transform: 'perspective(700px) rotateX(8deg) translateY(-3px) scale(1.03)',
      boxShadow: `0 18px 40px ${glow}`,
    },
  },
  '&:active': { transform: 'scale(0.96)' },
});

// 테두리형(outlined) 버튼용 3D 틸트 인터랙션
export const outlineButtonSx = {
  position: 'relative',
  willChange: 'transform, box-shadow',
  transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease',
  [HOVER_MEDIA]: {
    '&:hover': { transform: 'perspective(700px) rotateX(6deg) translateY(-3px)' },
  },
  '&:active': { transform: 'scale(0.96)' },
};

// 카드 공통 — 떠오름 + 그림자 확장
export const cardLiftSx = (liftPx = 8, shadow = 'rgba(122,143,123,0.18)') => ({
  willChange: 'transform, box-shadow',
  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease, border-color 0.4s ease',
  [HOVER_MEDIA]: {
    '&:hover': {
      transform: `translateY(-${liftPx}px) scale(1.015)`,
      boxShadow: `0 ${liftPx * 3}px ${liftPx * 7}px ${shadow}`,
    },
  },
});

// 이미지 줌 + 필터(밝기/채도) 효과. 부모 Box 의 className="zoom-trigger" 에 hover/active 걸면 반응.
export const imageZoomSx = (active = false) => ({
  willChange: 'transform, filter',
  transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), filter 0.55s ease',
  transform: active ? 'scale(1.08)' : 'scale(1)',
  filter: active ? 'brightness(1.04) saturate(1.2)' : 'brightness(1) saturate(1)',
  [HOVER_MEDIA]: {
    '.zoom-trigger:hover &': { transform: 'scale(1.08)', filter: 'brightness(1.04) saturate(1.2)' },
  },
});

// 이미지 위에 정보를 드러내는 오버레이. active(터치) 상태를 받아 opacity 제어.
export const imageOverlaySx = (active = false) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  gap: 0.5,
  p: 2,
  background: 'linear-gradient(180deg, transparent 35%, rgba(20,26,20,0.78) 100%)',
  opacity: active ? 1 : 0,
  transform: active ? 'translateY(0)' : 'translateY(6px)',
  transition: 'opacity 0.35s ease, transform 0.35s ease',
  pointerEvents: 'none',
  [HOVER_MEDIA]: {
    '.zoom-trigger:hover &': { opacity: 1, transform: 'translateY(0)' },
  },
});

// 기술 스택 로고 — 회전 + 글로우
export const logoHoverSx = (color) => ({
  willChange: 'transform, filter',
  transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), filter 0.4s ease',
  [HOVER_MEDIA]: {
    '&:hover': {
      transform: 'rotate(14deg) scale(1.18)',
      filter: `drop-shadow(0 0 10px ${color}99)`,
    },
  },
  '&:active': { transform: 'rotate(14deg) scale(1.1)' },
});

// 아이콘/원형 버튼(SNS 등) — 회전 + 글로우 + 리프트
export const iconGlowSx = (color) => ({
  willChange: 'transform, box-shadow',
  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
  [HOVER_MEDIA]: {
    '&:hover': {
      color,
      transform: 'translateY(-4px) rotate(-8deg) scale(1.08)',
      boxShadow: `0 10px 22px ${color}33`,
    },
  },
  '&:active': { transform: 'scale(0.94)' },
});
