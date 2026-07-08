import Box from '@mui/material/Box';
import { useInView } from '../hooks/useInView';

// 스크롤로 화면에 들어올 때 한 번만 실행되는 fade + slide(+scale) 등장 애니메이션.
// 이동거리/스케일 값은 CSS Custom Properties로 관리하고, translate3d/scale3d로 GPU 가속을 사용한다.
// prefers-reduced-motion 이면 이동/확대 없이 옅은 opacity 전환만 적용한다.
function ScrollReveal({ children, delay = 0, scale = false, distance = 24, duration = 700, sx, ...rest }) {
  const [ref, inView] = useInView();
  const fromScale = scale ? 0.94 : 1;

  return (
    <Box
      ref={ref}
      sx={{
        '--reveal-y': inView ? '0px' : `${distance}px`,
        '--reveal-scale': inView ? 1 : fromScale,
        opacity: inView ? 1 : 0,
        transform: 'translate3d(0, var(--reveal-y), 0) scale3d(var(--reveal-scale), var(--reveal-scale), 1)',
        willChange: 'transform, opacity',
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        '@media (prefers-reduced-motion: reduce)': {
          transform: 'none',
          transition: `opacity ${duration}ms ease ${delay}ms`,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default ScrollReveal;
