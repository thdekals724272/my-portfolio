import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

// 스크롤 진입 시 0에서 목표값까지 카운트업되는 통계 숫자.
function StatCounter({ value, suffix = '', label, color = '#7A8F7B', delay = 0 }) {
  const [ref, inView] = useInView();
  const count = useCountUp(value, { active: inView, duration: 1100, delay });

  return (
    <Box ref={ref} sx={{ textAlign: 'center' }}>
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: { xs: '1.7rem', md: '2.1rem' },
          color,
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.2,
        }}
      >
        {count}{suffix}
      </Typography>
      <Typography variant="caption" sx={{ color: '#9C9691', fontWeight: 700, letterSpacing: 0.8, fontSize: '0.68rem' }}>
        {label}
      </Typography>
    </Box>
  );
}

export default StatCounter;
