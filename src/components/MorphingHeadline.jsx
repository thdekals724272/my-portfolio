import { useEffect, useRef, useState } from 'react';
import { keyframes } from '@emotion/react';
import Typography from '@mui/material/Typography';

const wordUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 10px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
`;
const morphIn = keyframes`
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
`;
const morphInReduced = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Hero 헤드라인 첫 줄: 최초 등장 시엔 단어 단위로 순차 등장(stagger)하고,
// 이후로는 문구가 opacity+transform 크로스페이드로 부드럽게 모핑되며 반복된다.
// prefers-reduced-motion 이면 이동 없이 옅은 opacity 전환만 적용한다.
function MorphingHeadline({ phrases, interval = 2800, sx }) {
  const [index, setIndex] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const introDoneRef = useRef(false);

  useEffect(() => {
    if (phrases.length <= 1) return undefined;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % phrases.length);
      if (!introDoneRef.current) {
        introDoneRef.current = true;
        setIntroDone(true);
      }
    }, prefersReducedMotion ? interval * 1.4 : interval);
    return () => clearInterval(id);
  }, [phrases.length, interval]);

  const showIntro = index === 0 && !introDone;
  const words = phrases[index].split(' ');

  if (showIntro) {
    return (
      <Typography component="span" sx={sx}>
        {words.map((word, i) => (
          <Typography
            key={i}
            component="span"
            sx={{
              display: 'inline-block',
              opacity: 0,
              animation: `${wordUp} 0.5s ease forwards ${i * 90}ms`,
              '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 1 },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </Typography>
        ))}
      </Typography>
    );
  }

  return (
    <Typography
      component="span"
      key={index}
      sx={{
        ...sx,
        display: 'inline-block',
        animation: `${morphIn} 0.6s cubic-bezier(0.22,1,0.36,1) both`,
        '@media (prefers-reduced-motion: reduce)': { animation: `${morphInReduced} 0.3s ease both` },
      }}
    >
      {phrases[index]}
    </Typography>
  );
}

export default MorphingHeadline;
