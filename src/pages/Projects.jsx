import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Projects() {
  return (
    <Box
      component="main"
      sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#FFFFFF' }}
    >
      <Box
        sx={{
          backgroundColor: '#002C5F',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: '#00AAD2', letterSpacing: 3, fontWeight: 700 }}>
            PROJECTS
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, fontWeight: 700, color: '#FFFFFF' }}>
            Projects
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Box
          sx={{
            border: '2px dashed #DDDDDD',
            borderRadius: 3,
            p: { xs: 5, md: 10 },
            backgroundColor: '#F4F4F4',
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 3,
              backgroundColor: '#00AAD2',
              mx: 'auto',
              mb: 4,
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222', mb: 2 }}>
            Projects 페이지
          </Typography>
          <Typography variant="body1" sx={{ color: '#888888', lineHeight: 2 }}>
            Projects 페이지가 개발될 공간입니다.
            <br />
            포트폴리오 작품들이 들어갈 예정입니다.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Projects;
