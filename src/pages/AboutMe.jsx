import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { aboutMeData } from '../data/aboutMeData';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InterestsIcon from '@mui/icons-material/Interests';
import BuildIcon from '@mui/icons-material/Build';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

// ─── Design Tokens ───────────────────────────────────────────
const G = 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)';
const GLASS = {
  background: 'rgba(255,255,255,0.78)',
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

function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
}

// ─── Info Row ─────────────────────────────────────────────────
function InfoRow({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, py: 1.2, borderBottom: '1px solid rgba(99,102,241,0.07)', '&:last-child': { borderBottom: 'none' } }}>
      <Box sx={{ color: '#6366F1', mt: 0.15, flexShrink: 0 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, fontSize: '0.67rem', letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 0.2 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#0F172A', fontWeight: 600, lineHeight: 1.6, fontSize: '0.88rem' }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Photo Upload ──────────────────────────────────────────────
function PhotoArea({ photo, onPhotoChange }) {
  const fileRef = useRef(null);
  return (
    <Box
      onClick={() => fileRef.current?.click()}
      sx={{
        width: 120, height: 120, borderRadius: '50%', mx: 'auto', mb: 2.5,
        position: 'relative', cursor: 'pointer',
        background: photo ? 'transparent' : G,
        boxShadow: '0 12px 40px rgba(99,102,241,0.3)',
        border: '4px solid rgba(255,255,255,0.9)',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': { transform: 'scale(1.04)', boxShadow: '0 16px 48px rgba(99,102,241,0.4)' },
        '&:hover .overlay': { opacity: 1 },
      }}
    >
      {photo ? (
        <Box component="img" src={photo} alt="프로필" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
          👤
        </Box>
      )}
      {/* Hover overlay */}
      <Box
        className="overlay"
        sx={{
          position: 'absolute', inset: 0,
          background: 'rgba(99,102,241,0.65)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          opacity: 0, transition: 'opacity 0.22s ease',
          gap: 0.5,
        }}
      >
        <CameraAltIcon sx={{ color: '#FFF', fontSize: 24 }} />
        <Typography variant="caption" sx={{ color: '#FFF', fontWeight: 700, fontSize: '0.65rem' }}>
          사진 변경
        </Typography>
      </Box>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onPhotoChange}
      />
    </Box>
  );
}

// ─── Main Page ────────────────────────────────────────────────
function AboutMe() {
  const [data] = useState(aboutMeData);
  const [photo, setPhoto] = useState(data.basicInfo.photo);
  const [expanded, setExpanded] = useState('service-story');

  const { basicInfo, sections } = data;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleAccordion = (id) => (_, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };

  return (
    <Box component="main" sx={{ background: '#F8FAFF', minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Hero / Profile Card ── */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 55%, #F3E8FF 100%)',
          py: { xs: 8, md: 12 },
          overflow: 'hidden',
        }}
      >
        {/* Background orbs */}
        {[
          { size: 480, color: 'rgba(99,102,241,0.13)', top: -160, right: -70 },
          { size: 320, color: 'rgba(139,92,246,0.09)', bottom: -60, left: -50 },
        ].map((orb, i) => (
          <Box key={i} sx={{ position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%', background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, top: orb.top, right: orb.right, bottom: orb.bottom, left: orb.left, pointerEvents: 'none' }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: 6 },
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            {/* Left — Photo + Name */}
            <Box sx={{ textAlign: 'center', flexShrink: 0, minWidth: 200 }}>
              <PhotoArea photo={photo} onPhotoChange={handlePhotoChange} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.7, letterSpacing: '-0.02em' }}>
                {basicInfo.name}
              </Typography>
              <Box
                sx={{
                  display: 'inline-block', px: 2.5, py: 0.7, borderRadius: '999px',
                  background: G, color: '#FFF', fontSize: '0.78rem', fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(99,102,241,0.3)', mb: 2.5,
                }}
              >
                {basicInfo.position}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <IconButton href="mailto:thdekals724272@gmail.com" size="small" sx={{ color: '#6366F1', background: 'rgba(99,102,241,0.08)', '&:hover': { background: 'rgba(99,102,241,0.15)' }, borderRadius: '10px' }}>
                  <EmailIcon fontSize="small" />
                </IconButton>
                <IconButton href="https://github.com/thdekals724272" target="_blank" rel="noopener noreferrer" size="small" sx={{ color: '#0F172A', background: 'rgba(15,23,42,0.06)', '&:hover': { background: 'rgba(15,23,42,0.12)' }, borderRadius: '10px' }}>
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Right — Info Card */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={{ ...GLASS, borderRadius: '24px', p: { xs: 3, md: 4 }, boxShadow: '0 4px 28px rgba(99,102,241,0.08)' }}>
                <Box sx={sectionLabel}>기본 정보</Box>
                <InfoRow icon={<InterestsIcon sx={{ fontSize: 18 }} />} label="관심 분야" value={basicInfo.interest} />
                <InfoRow icon={<BuildIcon sx={{ fontSize: 18 }} />} label="작업 방식" value={basicInfo.workflow} />
                <InfoRow icon={<WorkHistoryIcon sx={{ fontSize: 18 }} />} label="경력" value={basicInfo.experience} />
              </Box>

              {/* Tags */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {['React', 'Supabase', 'MUI', 'Vite', 'GitHub', 'Claude AI'].map((tag) => (
                  <Box
                    key={tag}
                    sx={{
                      px: 2, py: 0.55, borderRadius: '999px', fontSize: '0.76rem', fontWeight: 600,
                      background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(99,102,241,0.15)', color: '#64748B',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Story Sections (Accordion) ── */}
      <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 7, md: 11 } }}>
        <Container maxWidth="md">
          <FadeIn>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box sx={sectionLabel}>Story</Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.1rem' }, letterSpacing: '-0.02em' }}>
                나의 이야기
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 1.5 }}>
                항목을 클릭해서 내용을 확인하세요.
              </Typography>
            </Box>
          </FadeIn>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {sections.map((section, i) => (
              <FadeIn key={section.id} delay={i * 80}>
                <Accordion
                  expanded={expanded === section.id}
                  onChange={handleAccordion(section.id)}
                  disableGutters
                  elevation={0}
                  sx={{
                    ...GLASS,
                    borderRadius: '18px !important',
                    boxShadow: expanded === section.id
                      ? '0 8px 32px rgba(99,102,241,0.13)'
                      : '0 2px 12px rgba(99,102,241,0.05)',
                    transition: 'box-shadow 0.3s ease',
                    '&:before': { display: 'none' },
                    overflow: 'hidden',
                    border: expanded === section.id
                      ? '1px solid rgba(99,102,241,0.25) !important'
                      : '1px solid rgba(255,255,255,0.65) !important',
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: expanded === section.id ? '#6366F1' : '#94A3B8',
                          transition: 'color 0.2s ease',
                        }}
                      />
                    }
                    sx={{
                      px: 3, py: 0.5,
                      '& .MuiAccordionSummary-content': { my: 1.8 },
                      '&:hover': { background: 'rgba(99,102,241,0.03)' },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          width: 42, height: 42, borderRadius: '13px', flexShrink: 0,
                          background: expanded === section.id
                            ? G
                            : 'linear-gradient(135deg, #EEF2FF, #F3E8FF)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 20,
                          boxShadow: expanded === section.id ? '0 4px 14px rgba(99,102,241,0.3)' : 'none',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {section.emoji}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700, fontSize: '0.95rem', color: '#0F172A',
                            letterSpacing: '-0.01em', lineHeight: 1.3,
                          }}
                        >
                          {section.title}
                        </Typography>
                      </Box>
                      {section.showInHome && (
                        <Chip
                          icon={<HomeIcon sx={{ fontSize: '0.75rem !important', color: '#6366F1 !important' }} />}
                          label="홈 노출"
                          size="small"
                          sx={{
                            height: 22, fontSize: '0.65rem', fontWeight: 700,
                            background: 'rgba(99,102,241,0.08)',
                            color: '#6366F1',
                            border: '1px solid rgba(99,102,241,0.2)',
                            borderRadius: '8px',
                            flexShrink: 0,
                            '& .MuiChip-label': { px: 1 },
                          }}
                        />
                      )}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                    <Box
                      sx={{
                        pl: 7,
                        borderLeft: '3px solid',
                        borderImage: `${G} 1`,
                        borderRadius: '0 0 0 4px',
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: '#475569', lineHeight: 2, fontSize: '0.93rem' }}
                      >
                        {section.content}
                      </Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </FadeIn>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── CTA ── */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #EEF2FF 0%, #F3E8FF 100%)',
          py: { xs: 8, md: 11 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, letterSpacing: '-0.02em' }}>
              함께 만들고 싶은 게 있으신가요?
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', mb: 4, lineHeight: 1.8 }}>
              아이디어를 서비스로 만들고 싶다면 언제든 연락해주세요.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/"
                sx={{
                  background: G, fontWeight: 700, borderRadius: '14px', px: 4, py: 1.4,
                  boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
                  '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(99,102,241,0.4)' },
                  transition: 'all 0.25s ease',
                }}
              >
                연락하기
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={Link}
                to="/projects"
                sx={{
                  borderColor: 'rgba(99,102,241,0.3)', color: '#6366F1', fontWeight: 700,
                  borderRadius: '14px', px: 4, py: 1.4,
                  background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
                  '&:hover': { background: 'rgba(99,102,241,0.06)', borderColor: '#6366F1', transform: 'translateY(-2px)' },
                  transition: 'all 0.25s ease',
                }}
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
