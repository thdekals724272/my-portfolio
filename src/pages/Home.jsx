import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

const sectionLabel = {
  display: 'inline-block',
  px: 1.5,
  py: 0.5,
  mb: 2,
  borderRadius: 1,
  backgroundColor: '#002C5F',
  color: '#FFFFFF',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
};

function SectionDivider() {
  return <Divider sx={{ borderColor: '#DDDDDD' }} />;
}

/* ─── Hero 섹션 ─── */
function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#002C5F',
        color: '#FFFFFF',
        py: { xs: 8, md: 14 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="overline" sx={{ color: '#00AAD2', letterSpacing: 3, fontWeight: 700 }}>
          PORTFOLIO
        </Typography>
        <Typography variant="h2" sx={{ mt: 1, mb: 2, fontWeight: 700, color: '#FFFFFF' }}>
          홍길동의 포트폴리오
        </Typography>
        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.75)', mb: 4, lineHeight: 1.8 }}>
          여기는 Hero 섹션입니다.
          <br />
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/projects"
            sx={{
              backgroundColor: '#00AAD2',
              color: '#FFFFFF',
              fontWeight: 700,
              px: 4,
              '&:hover': { backgroundColor: '#0090B5' },
            }}
          >
            Projects 보기
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/about"
            sx={{
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              fontWeight: 700,
              px: 4,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: '#00AAD2', color: '#00AAD2' },
            }}
          >
            About Me
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

/* ─── About Me 섹션 ─── */
function AboutSection() {
  return (
    <Box component="section" sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={sectionLabel}>About Me</Box>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#222222' }}>
          자기소개
        </Typography>
        <Box
          sx={{
            borderLeft: '4px solid #002C5F',
            textAlign: 'left',
            pl: 3,
            py: 2,
            mb: 4,
            backgroundColor: '#F4F4F4',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <Typography variant="body1" sx={{ color: '#444444', lineHeight: 2 }}>
            여기는 About Me 섹션입니다.
            <br />
            간단한 자기소개와 '더 알아보기' 버튼이 들어갈 예정입니다.
          </Typography>
        </Box>
        <Button
          variant="contained"
          component={Link}
          to="/about"
          sx={{
            backgroundColor: '#002C5F',
            color: '#FFFFFF',
            fontWeight: 700,
            px: 4,
            '&:hover': { backgroundColor: '#00AAD2' },
          }}
        >
          더 알아보기
        </Button>
      </Container>
    </Box>
  );
}

/* ─── Skill Tree 섹션 ─── */
function SkillSection() {
  return (
    <Box component="section" sx={{ backgroundColor: '#F4F4F4', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={sectionLabel}>Skill Tree</Box>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#222222' }}>
          기술 스택
        </Typography>
        <Box
          sx={{
            border: '2px dashed #BBBBBB',
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            backgroundColor: '#FFFFFF',
          }}
        >
          <Typography variant="body1" sx={{ color: '#888888', lineHeight: 2 }}>
            여기는 Skill Tree 섹션입니다.
            <br />
            기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['React', 'JavaScript', 'TypeScript', 'Node.js', 'CSS', 'Git'].map((skill) => (
              <Box
                key={skill}
                sx={{
                  px: 2,
                  py: 0.8,
                  borderRadius: 2,
                  backgroundColor: '#002C5F',
                  color: '#FFFFFF',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

/* ─── Projects 섹션 ─── */
function ProjectsSection() {
  return (
    <Box component="section" sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={sectionLabel}>Projects</Box>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#222222' }}>
          대표 프로젝트
        </Typography>
        <Typography variant="body2" sx={{ mb: 5, color: '#888888' }}>
          여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 '더 보기' 버튼이 들어갈 예정입니다.
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 2.5,
            mb: 5,
          }}
        >
          {['Project 01', 'Project 02', 'Project 03'].map((proj) => (
            <Box
              key={proj}
              sx={{
                backgroundColor: '#F4F4F4',
                borderRadius: 3,
                p: 4,
                border: '1px solid #DDDDDD',
                minHeight: 160,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#002C5F',
                  boxShadow: '0 4px 16px rgba(0,44,95,0.12)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#002C5F',
                  mb: 2,
                }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#222222' }}>
                {proj}
              </Typography>
              <Typography variant="body2" sx={{ color: '#888888', mt: 0.5, fontSize: '0.8rem' }}>
                썸네일 영역
              </Typography>
            </Box>
          ))}
        </Box>
        <Button
          variant="outlined"
          component={Link}
          to="/projects"
          sx={{
            borderColor: '#002C5F',
            color: '#002C5F',
            fontWeight: 700,
            px: 4,
            '&:hover': { backgroundColor: '#002C5F', color: '#FFFFFF' },
          }}
        >
          더 보기
        </Button>
      </Container>
    </Box>
  );
}

/* ─── Contact 섹션 ─── */
function ContactSection() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#1A1A1A',
        color: '#FFFFFF',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="overline"
          sx={{ color: '#00AAD2', letterSpacing: 3, fontWeight: 700 }}
        >
          CONTACT
        </Typography>
        <Typography variant="h3" sx={{ mt: 1, mb: 2, fontWeight: 700, color: '#FFFFFF' }}>
          연락하기
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.65)', mb: 4, lineHeight: 2 }}>
          여기는 Contact 섹션입니다.
          <br />
          연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
            mt: 3,
          }}
        >
          {['Email', 'GitHub', 'LinkedIn'].map((sns) => (
            <Box
              key={sns}
              sx={{
                px: 3,
                py: 1.5,
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: 2,
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#00AAD2',
                  color: '#00AAD2',
                },
              }}
            >
              {sns}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/* ─── Home 페이지 ─── */
function Home() {
  return (
    <main>
      <HeroSection />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <SkillSection />
      <SectionDivider />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

export default Home;
