import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

const breathe = keyframes`
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.35; }
  40% { transform: scale(1); opacity: 1; }
`;

// Warm Minimal 톤의 은은한 3-dot 로딩 스피너.
function LoadingSpinner({ size = 9, color = '#7A8F7B', py = 6 }) {
  return (
    <Box role="status" aria-label="불러오는 중" sx={{ display: 'flex', gap: 1.1, alignItems: 'center', justifyContent: 'center', py }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: size,
            height: size,
            borderRadius: '50%',
            background: color,
            animation: `${breathe} 1.1s ease-in-out ${i * 0.15}s infinite`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none', opacity: 0.6 },
          }}
        />
      ))}
    </Box>
  );
}

export default LoadingSpinner;
