import Box from '@mui/material/Box';
import { keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const shimmerSx = {
  background: 'linear-gradient(90deg, #F3EEE6 25%, #FBF6F0 50%, #F3EEE6 75%)',
  backgroundSize: '400% 100%',
  animation: `${shimmer} 1.8s ease-in-out infinite`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
};

function ProjectCardSkeleton() {
  return (
    <Box sx={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(122,143,123,0.1)', background: '#FFF' }}>
      <Box sx={{ width: '100%', aspectRatio: '16/9', ...shimmerSx }} />
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 1.2 }}>
        <Box sx={{ width: '55%', height: 18, borderRadius: '6px', ...shimmerSx }} />
        <Box sx={{ width: '100%', height: 11, borderRadius: '6px', ...shimmerSx }} />
        <Box sx={{ width: '80%', height: 11, borderRadius: '6px', ...shimmerSx }} />
        <Box sx={{ display: 'flex', gap: 0.7, mt: 1 }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ width: 52, height: 20, borderRadius: '8px', ...shimmerSx }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// count 만큼 카드 스켈레톤을 렌더링 (grid 컨테이너 안에서 그대로 사용)
export function ProjectCardSkeletonGrid({ count = 3 }) {
  return Array.from({ length: count }).map((_, i) => <ProjectCardSkeleton key={i} />);
}

export default ProjectCardSkeleton;
