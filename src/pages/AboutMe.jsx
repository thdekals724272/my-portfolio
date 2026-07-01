import { useInView } from '../hooks/useInView';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from 'react-router-dom';

const G = 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)';
const GLASS = {
  background: 'rgba(255,255,255,0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.65)',
};
const sectionLabel = {
  display: 'inline-block', px: 2, py: 0.6, mb: 2, borderRadius: '999px',
  background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
  border: '1px solid rgba(99,102,241,0.2)', color: '#6366F1',
  fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
};

const TIMELINE = [
  { icon: <WorkIcon sx={{ fontSize: 18, color: '#6366F1' }} />, period: '2024 — 현재', title: '바이브코딩 수강', desc: 'React, Supabase 등 프론트엔드 기술을 학습 중입니다.', color: '#EEF2FF' },
  { icon: <SchoolIcon sx={{ fontSize: 18, color: '#8B5CF6' }} />, period: '2020 — 2024', title: '대학교 졸업', desc: '컴퓨터 관련 학과를 졸업했습니다.', color: '#F3E8FF' },
];

const VALUES = [
  { emoji: '🎯', title: '목표 중심', desc: '명확한 목표를 설정하고 실용적인 방법으로 달성합니다.' },
  { emoji: '📚', title: '지속 성장', desc: '새로운 기술을 꾸준히 익히고 적용하는 것을 즐깁니다.' },
  { emoji: '🤝', title: '협업 중시', desc: '팀원과의 원활한 소통과 협업을 최우선으로 생각합니다.' },
  { emoji: '✨', title: '디테일 집착', desc: '사용자 경험의 작은 부분도 세심하게 다듬습니다.' },
];

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <Box ref={ref} sx={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </Box>
  );
}

function AboutMe() {
  return (
    <Box component="main" sx={{ background: '#F8FAFF', minHeight: 'calc(100vh - 64px)' }}>
      {/* Hero */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 55%, #F3E8FF 100%)',
          py: { xs: 10, md: 14 },
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {[
          { size: 480, color: 'rgba(99,102,241,0.15)', top: -160, right: -60 },
          { size: 320, color: 'rgba(139,92,246,0.1)', bottom: -60, left: -50 },
        ].map((orb, i) => (
          <Box key={i} sx={{ position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%', background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, top: orb.top, right: orb.right, bottom: orb.bottom, left: orb.left, pointerEvents: 'none' }} />
        ))}

        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Avatar */}
          <Box
            sx={{
              width: 110, height: 110, borderRadius: '50%', mx: 'auto', mb: 3,
              background: G,
              boxShadow: '0 12px 40px rgba(99,102,241,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 46,
              border: '4px solid rgba(255,255,255,0.9)',
            }}
          >
            👨‍💻
          </Box>

          <Box sx={{ display: 'inline-block', px: 2, py: 0.6, mb: 2.5, borderRadius: '999px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.2)', color: '#6366F1', fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            About Me
          </Box>

          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2, background: 'linear-gradient(135deg, #1E1B4B 0%, #6366F1 50%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: { xs: '2rem', md: '2.8rem' }, letterSpacing: '-0.03em' }}>
            안녕하세요, 홍길동입니다.
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.9, mb: 4, maxWidth: 420, mx: 'auto' }}>
            사용자를 위한 좋은 경험을 만들고자 하는 프론트엔드 개발자입니다.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" href="mailto:thdekals724272@gmail.com" startIcon={<EmailIcon />} sx={{ background: G, fontWeight: 700, borderRadius: '14px', px: 3.5, py: 1.3, boxShadow: '0 8px 24px rgba(99,102,241,0.3)', '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', transform: 'translateY(-2px)' }, transition: 'all 0.25s ease' }}>
              이메일 보내기
            </Button>
            <Button variant="outlined" size="large" href="https://github.com/thdekals724272" target="_blank" rel="noopener noreferrer" startIcon={<GitHubIcon />} sx={{ borderColor: 'rgba(99,102,241,0.3)', color: '#6366F1', fontWeight: 700, borderRadius: '14px', px: 3.5, py: 1.3, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', '&:hover': { background: 'rgba(99,102,241,0.06)', borderColor: '#6366F1', transform: 'translateY(-2px)' }, transition: 'all 0.25s ease' }}>
              GitHub
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Intro */}
      <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <FadeIn>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box sx={sectionLabel}>Intro</Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.1rem' }, letterSpacing: '-0.02em' }}>
                자기소개
              </Typography>
            </Box>
          </FadeIn>

          <FadeIn delay={100}>
            <Box
              sx={{
                ...GLASS, borderRadius: '24px', p: { xs: 3.5, md: 5 },
                boxShadow: '0 4px 28px rgba(99,102,241,0.07)',
                borderLeft: '4px solid #6366F1',
              }}
            >
              <Typography variant="body1" sx={{ color: '#475569', lineHeight: 2.1, fontSize: '1rem' }}>
                안녕하세요! 바이브코딩으로 React와 Supabase를 배우고 있는 홍길동입니다.
                <br /><br />
                사용자가 편리하게 사용할 수 있는 웹 서비스를 만드는 것을 좋아합니다.
                꾸준히 배우고 성장하는 개발자가 되고 싶습니다.
                <br /><br />
                현재 바이브코딩 강의를 통해 React, Supabase, MUI 등 프론트엔드 기술을 학습하며
                직접 프로젝트를 만들고 배포하는 경험을 쌓고 있습니다.
              </Typography>
            </Box>
          </FadeIn>
        </Container>
      </Box>

      {/* Values */}
      <Box sx={{ background: '#F8FAFF', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <FadeIn>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box sx={sectionLabel}>Values</Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.1rem' }, letterSpacing: '-0.02em' }}>
                저의 가치관
              </Typography>
            </Box>
          </FadeIn>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2.5 }}>
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={i * 80}>
                <Box
                  sx={{
                    ...GLASS, borderRadius: '20px', p: 3, textAlign: 'center',
                    boxShadow: '0 2px 16px rgba(99,102,241,0.06)',
                    transition: 'all 0.25s ease',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 16px 40px rgba(99,102,241,0.13)', border: '1px solid rgba(99,102,241,0.2)' },
                  }}
                >
                  <Typography sx={{ fontSize: 32, mb: 1.5 }}>{v.emoji}</Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.8, fontSize: '0.9rem' }}>
                    {v.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.65, fontSize: '0.78rem' }}>
                    {v.desc}
                  </Typography>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Timeline */}
      <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="sm">
          <FadeIn>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box sx={sectionLabel}>Timeline</Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.1rem' }, letterSpacing: '-0.02em' }}>
                주요 이력
              </Typography>
            </Box>
          </FadeIn>

          <Box sx={{ position: 'relative', pl: 3 }}>
            <Box sx={{ position: 'absolute', left: 19, top: 8, bottom: 8, width: 2, background: 'linear-gradient(180deg, #6366F1, #8B5CF6, transparent)', borderRadius: 2 }} />
            {TIMELINE.map((item, i) => (
              <FadeIn key={i} delay={i * 120}>
                <Box sx={{ display: 'flex', gap: 3, mb: 4, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '3px solid #FFFFFF', boxShadow: '0 2px 12px rgba(99,102,241,0.15)', zIndex: 1 }}>
                    {item.icon}
                  </Box>
                  <Box sx={{ ...GLASS, borderRadius: '18px', p: 2.5, flex: 1, boxShadow: '0 2px 14px rgba(99,102,241,0.06)' }}>
                    <Typography variant="caption" sx={{ color: '#6366F1', fontWeight: 700, fontSize: '0.7rem', letterSpacing: 0.5 }}>{item.period}</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.3, mb: 0.5 }}>{item.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.82rem', lineHeight: 1.7 }}>{item.desc}</Typography>
                  </Box>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F3E8FF 100%)', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <FadeIn>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 2, letterSpacing: '-0.02em' }}>
              함께 일하고 싶으신가요?
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', mb: 4, lineHeight: 1.8 }}>
              언제든지 편하게 연락해주세요. 좋은 기회를 기대하고 있습니다.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/#contact"
                sx={{ background: G, fontWeight: 700, borderRadius: '14px', px: 4.5, py: 1.4, boxShadow: '0 8px 24px rgba(99,102,241,0.3)', '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(99,102,241,0.4)' }, transition: 'all 0.25s ease' }}
              >
                연락하기
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/projects"
                sx={{ borderColor: 'rgba(99,102,241,0.3)', color: '#6366F1', fontWeight: 700, borderRadius: '14px', px: 4.5, py: 1.4, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', '&:hover': { background: 'rgba(99,102,241,0.06)', borderColor: '#6366F1', transform: 'translateY(-2px)' }, transition: 'all 0.25s ease' }}
              >
                Projects 보기
              </Button>
            </Box>
          </FadeIn>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutMe;
