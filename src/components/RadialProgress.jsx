import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';

const SIZE = 128;
const STROKE = 10;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// SVG 기반 원형 프로그레스. 숫자와 링이 같은 count-up 값을 공유해 항상 동기화된다.
function RadialProgress({ value, label, color, delay = 0 }) {
  const [ref, inView] = useInView();
  const count = useCountUp(value, { active: inView, duration: 1400, delay });
  const dashOffset = CIRCUMFERENCE * (1 - count / 100);

  return (
    <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{ position: 'relative', width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="#EFEAE3" strokeWidth={STROKE} />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 800, color: '#2F2F2F', fontSize: '1.3rem', fontVariantNumeric: 'tabular-nums' }}>
            {count}%
          </Typography>
        </Box>
      </Box>
      <Typography variant="body2" sx={{ fontWeight: 700, color: '#4B4842', textAlign: 'center', fontSize: '0.85rem', lineHeight: 1.4 }}>
        {label}
      </Typography>
    </Box>
  );
}

export default RadialProgress;
