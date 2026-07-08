import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const G = '#7A8F7B';

// 썸네일이 없거나(로드 실패·타임아웃) 표시할 수 없을 때 보여주는 Warm Minimal 톤의 대체 카드.
function ProjectThumbnailFallback({ title }) {
  return (
    <Box
      sx={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
        background: `linear-gradient(135deg, ${G} 0%, #647566 100%)`,
        px: 2, textAlign: 'center',
      }}
    >
      <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
        🖥️
      </Box>
      <Typography sx={{ color: '#FFF', fontWeight: 800, fontSize: '0.85rem', lineHeight: 1.3 }}>
        {title}
      </Typography>
      <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.66rem', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        Preview Coming Soon
      </Typography>
    </Box>
  );
}

export default ProjectThumbnailFallback;
