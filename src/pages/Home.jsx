import { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { keyframes } from '@emotion/react';
import { useInView } from '../hooks/useInView';
import { usePortfolio } from '../context/PortfolioContext';
import { ICON_EMOJI, CATEGORY_META } from '../data/skillsData';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { supabase } from '../lib/supabase';

// ─── Design Tokens ───────────────────────────────────────────
const G = '#7A8F7B';
const GLASS = {
  background: 'rgba(255,255,255,0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.65)',
};

const EMOJIS = ['👋', '😊', '🚀', '💼', '🌏', '🤝', '✨', '💡', '🎯', '❤️'];
const REGIONS = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '해외'];
const EMAIL = 'thdekals724272@gmail.com';
const WHATSAPP = '+82-10-0000-0000';

const TECH_COLORS = {
  React: '#C17F59',
  Supabase: '#10B981',
  PostgreSQL: '#8B7355',
  MUI: '#7A8F7B',
  CSS3: '#D9A273',
  Recharts: '#F59E0B',
  'AI-Assisted': '#D9A273',
  'UI/UX': '#D88C7A',
};

const HERO_BADGES = ['AI-Assisted', 'React', 'Supabase', 'UI/UX'];
const HERO_MINI_PROJECTS = [
  { name: 'Export Connect', desc: '중고차 수출 정보 공유 플랫폼' },
  { name: 'Wedding SNS', desc: '결혼 준비를 기록하는 SNS' },
];

// ─── Hero 배경/등장 애니메이션 키프레임 ──────────────────────────
const floatSlow = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-16px, -22px); }
`;
const floatMed = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(18px, 16px); }
`;
const floatFast = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-14px, 14px); }
`;
const fadeUpKeyframes = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;
const bounceKeyframes = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.55; }
  50% { transform: translateY(8px); opacity: 1; }
`;
const reduceMotion = { '@media (prefers-reduced-motion: reduce)': { animation: 'none' } };

const sectionLabel = {
  display: 'inline-block',
  px: 2, py: 0.6, mb: 2,
  borderRadius: '999px',
  background: 'linear-gradient(135deg, rgba(122,143,123,0.1), rgba(217,162,115,0.1))',
  border: '1px solid rgba(122,143,123,0.2)',
  color: '#7A8F7B',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
};

// ─── FadeIn ──────────────────────────────────────────────────
function FadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView();
  const translate = direction === 'up' ? 'translateY(24px)' : 'translateY(-12px)';
  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : translate,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
}

function SectionDivider() {
  return (
    <Box sx={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(122,143,123,0.15), transparent)', mx: 4 }} />
  );
}

// 스크롤과 무관하게, 마운트 시 한 번 fade-up 되는 등장 애니메이션 (Hero처럼 항상 화면에 보이는 영역용)
function FadeInMount({ children, delay = 0 }) {
  return (
    <Box sx={{ animation: `${fadeUpKeyframes} 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`, ...reduceMotion }}>
      {children}
    </Box>
  );
}

// ─── Hero 우측 Product Builder 카드 ─────────────────────────────
function ProductBuilderCard({ basicInfo, compact = false }) {
  return (
    <Box
      sx={{
        ...GLASS,
        borderRadius: '28px',
        p: compact ? 2.75 : { xs: 3, md: 3.5 },
        maxWidth: compact ? 320 : 380,
        width: '100%',
        mx: { xs: 'auto', md: 0 },
        boxShadow: '0 20px 60px rgba(122,143,123,0.16)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        '&:hover': { transform: 'scale(1.03)', boxShadow: '0 28px 72px rgba(122,143,123,0.22)' },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
        <Avatar
          src={basicInfo.photo || undefined}
          sx={{ width: 64, height: 64, background: G, fontSize: 28, boxShadow: '0 8px 20px rgba(122,143,123,0.3)', border: '3px solid rgba(255,255,255,0.9)' }}
        >
          {!basicInfo.photo && '👤'}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2F2F2F', fontSize: '1.05rem' }}>
            {basicInfo.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#7A8F7B', fontWeight: 700, fontSize: '0.8rem' }}>
            {basicInfo.position}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2.5 }}>
        {HERO_BADGES.map((b) => (
          <Box
            key={b}
            sx={{
              px: 1.4, py: 0.4, borderRadius: '999px', fontSize: '0.7rem', fontWeight: 700,
              background: `${TECH_COLORS[b] || '#7A8F7B'}14`,
              color: TECH_COLORS[b] || '#7A8F7B',
              border: `1px solid ${TECH_COLORS[b] || '#7A8F7B'}30`,
            }}
          >
            {b}
          </Box>
        ))}
      </Box>

      <Box sx={{ height: '1px', background: 'rgba(122,143,123,0.1)', mb: 2.5 }} />

      <Typography variant="caption" sx={{ color: '#9C9691', fontWeight: 700, fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 1.2 }}>
        만든 프로젝트
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
        {HERO_MINI_PROJECTS.map((p) => (
          <Box
            key={p.name}
            component={Link}
            to="/projects"
            sx={{
              display: 'block', textDecoration: 'none', minHeight: 44,
              p: 1.4, borderRadius: '14px',
              background: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(122,143,123,0.1)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': { transform: 'scale(1.03)', boxShadow: '0 8px 20px rgba(122,143,123,0.15)', border: '1px solid rgba(122,143,123,0.25)' },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 800, color: '#2F2F2F', fontSize: '0.85rem' }}>
              {p.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.72rem' }}>
              {p.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
const HERO_ORBS = [
  { size: 620, color: 'rgba(122,143,123,0.18)', top: -200, right: -140, anim: floatSlow, dur: '11s' },
  { size: 460, color: 'rgba(216,140,122,0.16)', bottom: -140, left: -100, anim: floatMed, dur: '13s' },
  { size: 320, color: 'rgba(217,162,115,0.14)', top: '30%', left: '4%', anim: floatFast, dur: '9s' },
];

const HeroSection = memo(function HeroSection() {
  const { homeData } = usePortfolio();
  const { basicInfo } = homeData;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(768));
  const isTablet = useMediaQuery(theme.breakpoints.between(768, 1200));
  const isDesktop = useMediaQuery(theme.breakpoints.up(1200));

  const scrollToProjects = useCallback(() => {
    document.getElementById('home-projects-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToAbout = useCallback(() => {
    document.getElementById('home-about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // 모바일에서는 배경 오브젝트 개수/크기를 줄여 과하지 않게 처리
  const orbs = isMobile ? HERO_ORBS.slice(0, 2) : HERO_ORBS;

  return (
    <Box
      component="section"
      aria-label="소개 섹션"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: isMobile ? 'auto' : '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #FBF6F0 0%, #FBF7F1 45%, #F7F0E8 100%)',
        pt: isMobile ? 6 : isTablet ? 9 : 12,
        pb: isMobile ? 8 : isTablet ? 9 : 12,
      }}
    >
      {/* 배경 블러 오브젝트 — 블루 / 민트 / 퍼플, 은은한 floating 애니메이션 */}
      {orbs.map((orb, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: isMobile ? orb.size * 0.42 : isTablet ? orb.size * 0.75 : orb.size,
            height: isMobile ? orb.size * 0.42 : isTablet ? orb.size * 0.75 : orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            top: orb.top, right: orb.right, bottom: orb.bottom, left: orb.left,
            pointerEvents: 'none',
            animation: `${orb.anim} ${orb.dur} ease-in-out infinite`,
            ...reduceMotion,
          }}
        />
      ))}

      {/* 은은한 라인 액센트 (모바일에서는 생략) */}
      {!isMobile && (
        <>
          <Box sx={{ position: 'absolute', top: '18%', left: '-5%', width: '45%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(122,143,123,0.25), transparent)', transform: 'rotate(-8deg)', pointerEvents: 'none' }} />
          <Box sx={{ position: 'absolute', bottom: '22%', right: '-5%', width: '40%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(216,140,122,0.3), transparent)', transform: 'rotate(6deg)', pointerEvents: 'none' }} />
        </>
      )}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={isMobile ? 6 : isTablet ? 5 : 8}
          sx={{ alignItems: 'center' }}
        >
          {/* 왼쪽 — 텍스트 */}
          <Box sx={{ width: isMobile ? '100%' : '50%', textAlign: isMobile ? 'center' : 'left' }}>
            <FadeInMount>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 0.9, mb: 3, borderRadius: '999px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(122,143,123,0.2)', boxShadow: '0 2px 12px rgba(122,143,123,0.08)' }}>
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E88' }} />
                <Typography variant="caption" sx={{ color: '#7A8F7B', fontWeight: 700, fontSize: '0.78rem', letterSpacing: 0.3 }}>
                  Product Builder · Available
                </Typography>
              </Box>
            </FadeInMount>

            <FadeInMount delay={100}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: isMobile ? '1.85rem' : isTablet ? '2.5rem' : '3.2rem',
                  color: '#2F2F2F',
                  lineHeight: 1.3,
                  letterSpacing: '-0.02em',
                  wordBreak: 'keep-all',
                  mb: 2.5,
                }}
              >
                가르치던 사람에서 만드는 사람으로,
                <br />
                <Box
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #7A8F7B 0%, #D9A273 55%, #D88C7A 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}
                >
                  Product Builder
                </Box>{' '}
                {basicInfo.name}
              </Typography>
            </FadeInMount>

            <FadeInMount delay={200}>
              <Typography
                variant="body1"
                sx={{
                  color: '#4B4842',
                  mb: 4.5,
                  lineHeight: 1.75,
                  fontSize: isMobile ? '0.95rem' : isTablet ? '1.05rem' : '1.15rem',
                  maxWidth: isMobile ? '100%' : 460,
                  mx: isMobile ? 'auto' : 0,
                }}
              >
                사람의 성장을 돕던 경험을 바탕으로, 이제는 사람들에게 도움이 되는 서비스를 만들고 있습니다.
              </Typography>
            </FadeInMount>

            <FadeInMount delay={300}>
              <Box sx={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column', gap: isMobile ? 2 : 2.5, mb: 3, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Button
                  variant="contained" size="large" onClick={scrollToProjects} aria-label="프로젝트 둘러보기 섹션으로 스크롤 이동"
                  sx={{
                    background: G, color: '#FFF', fontWeight: 700, px: 4.5, py: 1.6, minHeight: 44,
                    borderRadius: '999px', width: isDesktop ? 'auto' : '100%',
                    boxShadow: '0 8px 24px rgba(122,143,123,0.35)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: '#647566',
                      boxShadow: '0 16px 38px rgba(122,143,123,0.45)',
                      transform: 'scale(1.03) translateY(-2px)',
                    },
                    '&:active': { transform: 'scale(0.97)' },
                  }}
                >
                  프로젝트 둘러보기
                </Button>
                <Button
                  variant="outlined" size="large" onClick={scrollToAbout} aria-label="About Me 섹션으로 스크롤 이동"
                  sx={{
                    borderColor: 'rgba(122,143,123,0.35)', color: '#7A8F7B', fontWeight: 700, px: 4.5, py: 1.6, minHeight: 44,
                    borderRadius: '999px', width: isDesktop ? 'auto' : '100%',
                    backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(122,143,123,0.08)',
                      borderColor: '#7A8F7B',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(122,143,123,0.15)',
                    },
                    '&:active': { transform: 'scale(0.97)' },
                  }}
                >
                  About Me
                </Button>
              </Box>
            </FadeInMount>

            <FadeInMount delay={380}>
              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Tooltip title="GitHub" placement="top">
                  <IconButton
                    component="a"
                    href="https://github.com/thdekals724272"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub 프로필 새 탭에서 열기"
                    sx={{
                      width: 44, height: 44, color: '#6B7280',
                      background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(122,143,123,0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': { color: '#7A8F7B', background: 'rgba(122,143,123,0.08)', borderColor: 'rgba(122,143,123,0.3)', transform: 'translateY(-3px)', boxShadow: '0 8px 20px rgba(122,143,123,0.2)' },
                      '&:active': { transform: 'scale(0.94)' },
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Email" placement="top">
                  <IconButton
                    component="a"
                    href="mailto:thdekals724272@gmail.com"
                    aria-label="이메일 보내기"
                    sx={{
                      width: 44, height: 44, color: '#6B7280',
                      background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(122,143,123,0.15)',
                      transition: 'all 0.3s ease',
                      '&:hover': { color: '#7A8F7B', background: 'rgba(122,143,123,0.08)', borderColor: 'rgba(122,143,123,0.3)', transform: 'translateY(-3px)', boxShadow: '0 8px 20px rgba(122,143,123,0.2)' },
                      '&:active': { transform: 'scale(0.94)' },
                    }}
                  >
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </FadeInMount>
          </Box>

          {/* 오른쪽 — Product Builder 카드 */}
          <Box sx={{ width: isMobile ? '100%' : '50%', display: 'flex', justifyContent: isDesktop ? 'flex-start' : 'center' }}>
            <FadeInMount delay={250}>
              <ProductBuilderCard basicInfo={basicInfo} compact={isTablet} />
            </FadeInMount>
          </Box>
        </Stack>
      </Container>

      {/* 스크롤 유도 (모바일은 콘텐츠 기준 높이라 생략) */}
      {!isMobile && (
        <Box
          role="button"
          tabIndex={0}
          aria-label="아래로 스크롤하여 About Me 섹션 보기"
          onClick={scrollToAbout}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scrollToAbout(); } }}
          sx={{
            position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 0.3,
            minWidth: 44, minHeight: 44,
            cursor: 'pointer', color: '#7A8F7B', zIndex: 1, borderRadius: '14px',
            transition: 'color 0.3s ease',
            '&:hover': { color: '#647566' },
            '&:active': { transform: 'translateX(-50%) scale(0.94)' },
            '&:focus-visible': { outline: '2px solid #7A8F7B', outlineOffset: 2 },
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.68rem', letterSpacing: 1.2, textTransform: 'uppercase' }}>
            Scroll Down
          </Typography>
          <KeyboardArrowDownIcon sx={{ animation: `${bounceKeyframes} 1.6s ease-in-out infinite`, ...reduceMotion }} />
        </Box>
      )}
    </Box>
  );
});

// ─── About ────────────────────────────────────────────────────
const AboutSection = memo(function AboutSection() {
  const { homeData } = usePortfolio();
  const { content, skills: topSkills, basicInfo } = homeData;

  return (
    <Box id="home-about" component="section" aria-label="어떤 사람인지 소개" sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <FadeIn>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={sectionLabel}>어떤 사람인지</Box>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 800, color: '#2F2F2F', fontSize: { xs: '1.8rem', md: '2.2rem' }, letterSpacing: '-0.02em' }}>
              {basicInfo.name} 소개
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              {basicInfo.position}
            </Typography>
          </Box>
        </FadeIn>

        {/* 2-col: stories + profile card */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr auto' }, gap: 3, mb: 4, alignItems: 'start' }}>
          {/* Left — Story cards */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {content.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6, color: '#9C9691' }}>
                <Typography variant="body2">About Me 탭에서 이야기를 추가하면 여기에 표시됩니다.</Typography>
              </Box>
            ) : content.map((section, i) => (
              <FadeIn key={section.id} delay={i * 80}>
                <Box
                  sx={{
                    display: 'flex', gap: 2.5, alignItems: 'flex-start',
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(122,143,123,0.1)',
                    borderRadius: '20px', p: 3,
                    boxShadow: '0 2px 14px rgba(122,143,123,0.06)',
                    transition: 'all 0.25s ease',
                    '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(122,143,123,0.12)', border: '1px solid rgba(122,143,123,0.2)' },
                  }}
                >
                  <Box sx={{ width: 44, height: 44, borderRadius: '13px', flexShrink: 0, background: 'linear-gradient(135deg, #FBF6F0, #F7EFE6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                    {section.emoji}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#2F2F2F', mb: 0.5, fontSize: '0.93rem' }}>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.8, fontSize: '0.85rem' }}>
                      {section.summary}
                    </Typography>
                  </Box>
                </Box>
              </FadeIn>
            ))}

          </Box>

          {/* Right — Profile mini-card */}
          <FadeIn delay={150}>
            <Box
              sx={{
                width: { xs: '100%', md: 220 },
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(122,143,123,0.12)',
                borderRadius: '24px', p: 3,
                boxShadow: '0 4px 20px rgba(122,143,123,0.07)',
                textAlign: 'center',
              }}
            >
              {/* Photo */}
              <Box
                sx={{
                  width: 76, height: 76, borderRadius: '50%', mx: 'auto', mb: 1.5,
                  background: basicInfo.photo ? 'transparent' : G,
                  border: '3px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 8px 24px rgba(122,143,123,0.25)',
                  overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 34,
                }}
              >
                {basicInfo.photo
                  ? <Box component="img" src={basicInfo.photo} alt="프로필" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : '👤'
                }
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2F2F2F', mb: 0.5, fontSize: '0.95rem' }}>
                {basicInfo.name}
              </Typography>
              <Box sx={{ display: 'inline-block', px: 1.5, py: 0.4, borderRadius: '999px', background: G, color: '#FFF', fontSize: '0.68rem', fontWeight: 700, mb: 2, lineHeight: 1.5 }}>
                {basicInfo.position}
              </Box>
              <Box sx={{ height: '1px', background: 'rgba(122,143,123,0.1)', mb: 2 }} />
              <Typography variant="caption" sx={{ color: '#9C9691', fontWeight: 700, fontSize: '0.65rem', letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
                관심 분야
              </Typography>
              <Typography variant="body2" sx={{ color: '#4B4842', fontSize: '0.78rem', lineHeight: 1.6 }}>
                {basicInfo.interest}
              </Typography>
            </Box>
          </FadeIn>
        </Box>

        {/* Top skills pills */}
        {topSkills.length > 0 && (
          <FadeIn delay={200}>
            <Box sx={{ mb: 5 }}>
              <Typography variant="caption" sx={{ color: '#9C9691', fontWeight: 700, fontSize: '0.68rem', letterSpacing: 1, textTransform: 'uppercase', display: 'block', mb: 1.5 }}>
                주요 스킬
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
                {topSkills.map((skill) => {
                  const meta = CATEGORY_META[skill.category] || { color: '#7A8F7B', bg: '#FBF6F0' };
                  return (
                    <Box
                      key={skill.id}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.8,
                        borderRadius: '12px', background: meta.bg, border: `1.5px solid ${meta.color}25`,
                        transition: 'all 0.22s ease',
                        '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 6px 16px ${meta.color}22`, border: `1.5px solid ${meta.color}50` },
                      }}
                    >
                      <Typography sx={{ fontSize: 16, lineHeight: 1 }}>{ICON_EMOJI[skill.icon] || '🔧'}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: meta.color, fontSize: '0.82rem' }}>{skill.name}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </FadeIn>
        )}

        <FadeIn delay={300}>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              component={Link}
              to="/about"
              sx={{
                background: G, color: '#FFF', fontWeight: 700,
                px: 4.5, py: 1.3, borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(122,143,123,0.3)',
                '&:hover': { background: '#647566', transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(122,143,123,0.4)' },
                transition: 'all 0.25s ease',
              }}
            >
              더 알아보기
            </Button>
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
});

// ─── Skills ───────────────────────────────────────────────────
const SkillSection = memo(function SkillSection() {
  const { homeData } = usePortfolio();
  const { skills: topSkills } = homeData;

  return (
    <Box component="section" aria-label="어떤 도구를 쓰는지" sx={{ backgroundColor: '#FAF8F5', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <FadeIn>
          <Box sx={sectionLabel}>어떤 도구로</Box>
          <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 800, color: '#2F2F2F', fontSize: { xs: '1.8rem', md: '2.2rem' }, letterSpacing: '-0.02em' }}>
            기술 스택
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 5 }}>서비스를 만들 때 활용하는 주요 도구입니다.</Typography>
          {topSkills.length === 0 ? (
            <Box sx={{ py: 6, color: '#9C9691' }}>
              <Typography variant="body2">About Me 탭에서 스킬을 추가하면 여기에 표시됩니다.</Typography>
            </Box>
          ) : (
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {topSkills.map((skill, i) => {
              const meta = CATEGORY_META[skill.category] || { color: '#7A8F7B', bg: '#FBF6F0' };
              return (
                <FadeIn key={skill.id} delay={i * 70}>
                  <Box
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.5,
                      px: 3, py: 1.6, borderRadius: '16px',
                      background: meta.bg, border: `1.5px solid ${meta.color}25`,
                      cursor: 'default',
                      transition: 'all 0.25s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: `0 12px 28px ${meta.color}25`, border: `1.5px solid ${meta.color}60` },
                    }}
                  >
                    <Typography sx={{ fontSize: 22, lineHeight: 1 }}>
                      {ICON_EMOJI[skill.icon] || ICON_EMOJI.default}
                    </Typography>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: meta.color, fontSize: '0.9rem', lineHeight: 1.2 }}>
                        {skill.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: `${meta.color}AA`, fontSize: '0.66rem', fontWeight: 600 }}>
                        {skill.category}
                      </Typography>
                    </Box>
                  </Box>
                </FadeIn>
              );
            })}
          </Box>
          )}
        </FadeIn>

        <FadeIn delay={400}>
          <Button
            variant="outlined"
            component={Link}
            to="/about"
            aria-label="About Me에서 전체 스킬 보기"
            sx={{
              mt: 5, borderColor: 'rgba(122,143,123,0.3)', color: '#7A8F7B', fontWeight: 700,
              px: 4, py: 1.1, borderRadius: '14px', fontSize: '0.88rem',
              '&:hover': { background: 'rgba(122,143,123,0.06)', borderColor: '#7A8F7B', transform: 'translateY(-2px)' },
              transition: 'all 0.25s ease',
            }}
          >
            전체 스킬 보기
          </Button>
        </FadeIn>
      </Container>
    </Box>
  );
});

// ─── Projects ─────────────────────────────────────────────────
const ProjectsSection = memo(function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState({});
  const [imgLoaded, setImgLoaded] = useState({});

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .limit(3)
      .then(({ data }) => {
        if (data) setProjects(data);
        setLoading(false);
      });
  }, []);

  return (
    <Box id="home-projects-preview" component="section" aria-label="어떤 프로젝트를 만들었는지" sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <FadeIn>
          <Box sx={sectionLabel}>어떤 프로젝트를</Box>
          <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 800, color: '#2F2F2F', fontSize: { xs: '1.8rem', md: '2.2rem' }, letterSpacing: '-0.02em' }}>
            대표 프로젝트
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 5 }}>AI와 함께 직접 기획하고 만든 서비스들입니다.</Typography>
        </FadeIn>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#7A8F7B' }} />
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 5 }}>
            {projects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 120}>
                <Box
                  sx={{
                    ...GLASS,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 24px rgba(122,143,123,0.07)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { transform: 'translateY(-7px) scale(1.01)', boxShadow: '0 20px 48px rgba(122,143,123,0.16)' },
                  }}
                >
                  <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#EFEAE3', overflow: 'hidden' }}>
                    {!imgErrors[project.id] && project.thumbnail_url ? (
                      <>
                        {!imgLoaded[project.id] && (
                          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FBF6F0, #F7EFE6)' }}>
                            <CircularProgress size={24} sx={{ color: '#7A8F7B' }} />
                          </Box>
                        )}
                        <Box
                          component="img"
                          src={project.thumbnail_url}
                          alt={project.title}
                          loading="lazy"
                          onLoad={() => setImgLoaded((p) => ({ ...p, [project.id]: true }))}
                          onError={() => setImgErrors((p) => ({ ...p, [project.id]: true }))}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: imgLoaded[project.id] ? 'block' : 'none', transition: 'transform 0.4s ease', '&:hover': { transform: 'scale(1.05)' } }}
                        />
                      </>
                    ) : (
                      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: G }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: 2, background: 'rgba(255,255,255,0.25)' }} />
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2F2F2F', mb: 0.5, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.7, mb: 2, flex: 1, fontSize: '0.84rem' }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mb: 2.5 }}>
                      {project.tech_stack.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            fontSize: '0.68rem', fontWeight: 700, height: 22, borderRadius: '8px',
                            backgroundColor: `${TECH_COLORS[tech] || '#7A8F7B'}15`,
                            color: TECH_COLORS[tech] || '#7A8F7B',
                            border: `1px solid ${TECH_COLORS[tech] || '#7A8F7B'}30`,
                          }}
                        />
                      ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {project.detail_url && (
                        <Button
                          variant="contained"
                          size="small"
                          href={project.detail_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            flex: 1, background: G, fontWeight: 700, fontSize: '0.74rem',
                            borderRadius: '10px', py: 0.8,
                            boxShadow: '0 4px 12px rgba(122,143,123,0.28)',
                            '&:hover': { background: '#647566', transform: 'translateY(-1px)' },
                            transition: 'all 0.2s ease',
                          }}
                        >
                          Live Demo
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        size="small"
                        href="https://github.com/thdekals724272/vibeCoding"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                          flex: 1, borderColor: 'rgba(122,143,123,0.28)', color: '#7A8F7B',
                          fontWeight: 700, fontSize: '0.74rem', borderRadius: '10px', py: 0.8,
                          '&:hover': { borderColor: '#7A8F7B', background: 'rgba(122,143,123,0.05)', transform: 'translateY(-1px)' },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        GitHub
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </FadeIn>
            ))}
          </Box>
        )}

        <FadeIn delay={300}>
          <Button
            variant="outlined"
            component={Link}
            to="/projects"
            sx={{
              borderColor: 'rgba(122,143,123,0.3)', color: '#7A8F7B', fontWeight: 700,
              px: 5, py: 1.3, borderRadius: '14px', fontSize: '0.95rem',
              '&:hover': { background: 'rgba(122,143,123,0.06)', borderColor: '#7A8F7B', transform: 'translateY(-2px)' },
              transition: 'all 0.25s ease',
            }}
          >
            더 보기
          </Button>
        </FadeIn>
      </Container>
    </Box>
  );
});

// ─── Contact ──────────────────────────────────────────────────
const ContactSection = memo(function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', message: '', company: '', region: '', emoji: '👋', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [guestbook, setGuestbook] = useState([]);
  const [loadingGuests, setLoadingGuests] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const fetchGuestbook = useCallback(async () => {
    setLoadingGuests(true);
    const { data } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false }).limit(20);
    if (data) setGuestbook(data);
    setLoadingGuests(false);
  }, []);

  // 마운트 시 1회 방명록 조회 (표준 fetch-on-mount 패턴, 무한 루프 위험 없음)
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchGuestbook(); }, [fetchGuestbook]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    setSubmitting(true);
    setSubmitError('');
    const { error } = await supabase.from('guestbook').insert({
      name: form.name.trim(), message: form.message.trim(),
      company: form.company.trim() || null, region: form.region || null,
      emoji: form.emoji, password: form.password.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      setSubmitError('등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    } else {
      setForm({ name: '', message: '', company: '', region: '', emoji: '👋', password: '' });
      setSubmitSuccess(true);
      fetchGuestbook();
    }
  }, [form, fetchGuestbook]);

  const handleDeleteOpen = useCallback(async (entry) => {
    if (!entry.password) {
      setDeleting(true);
      await supabase.rpc('delete_guestbook_entry', { entry_id: entry.id, entry_password: '' });
      setGuestbook((prev) => prev.filter((e) => e.id !== entry.id));
      setDeleting(false);
      return;
    }
    setDeleteTarget(entry.id);
    setDeletePassword('');
    setDeleteError('');
  }, []);

  const handleDeleteClose = useCallback(() => { setDeleteTarget(null); setDeletePassword(''); setDeleteError(''); }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deletePassword.trim()) return;
    setDeleting(true);
    setDeleteError('');
    const { data, error } = await supabase.rpc('delete_guestbook_entry', { entry_id: deleteTarget, entry_password: deletePassword });
    setDeleting(false);
    if (error || !data) {
      setDeleteError('비밀번호가 올바르지 않습니다. 다시 확인해주세요.');
    } else {
      setGuestbook((prev) => prev.filter((e) => e.id !== deleteTarget));
      handleDeleteClose();
    }
  }, [deletePassword, deleteTarget, handleDeleteClose]);

  const formatDate = useCallback((d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  }, []);

  const contactCardSx = {
    flex: 1,
    ...GLASS,
    borderRadius: '20px',
    p: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    boxShadow: '0 4px 20px rgba(122,143,123,0.06)',
    transition: 'all 0.25s ease',
  };

  return (
    <Box component="section" sx={{ background: 'linear-gradient(180deg, #FAF8F5 0%, #FFFFFF 100%)', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">

        {/* Header */}
        <FadeIn>
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Box sx={sectionLabel}>Contact</Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#2F2F2F', mb: 1.5, fontSize: { xs: '1.8rem', md: '2.2rem' }, letterSpacing: '-0.02em' }}>
              연락하기
            </Typography>
            <Typography variant="body1" sx={{ color: '#6B7280', lineHeight: 1.8 }}>
              언제든지 편하게 연락해주세요. 빠르게 답변드리겠습니다.
            </Typography>
          </Box>
        </FadeIn>

        {/* Contact cards */}
        <FadeIn delay={100}>
          <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* Email */}
            <Box sx={{ ...contactCardSx, '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(122,143,123,0.12)', border: '1px solid rgba(122,143,123,0.25)' } }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: 'linear-gradient(135deg, #FBF6F0, #F3E9DD)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <EmailIcon sx={{ color: '#7A8F7B', fontSize: 22 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: '#9C9691', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.67rem' }}>Email</Typography>
                <Typography variant="body2" sx={{ color: '#2F2F2F', fontWeight: 600, mt: 0.3, wordBreak: 'break-all', fontSize: '0.82rem' }}>{EMAIL}</Typography>
              </Box>
              <IconButton size="small" onClick={handleCopyEmail} sx={{ color: copied ? '#22C55E' : '#9C9691', flexShrink: 0, transition: 'color 0.2s' }}>
                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
              </IconButton>
            </Box>

            {/* WhatsApp */}
            <Box
              component="a"
              href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, '')}`}
              target="_blank" rel="noopener noreferrer"
              sx={{ ...contactCardSx, textDecoration: 'none', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.3)' } }}
            >
              <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <WhatsAppIcon sx={{ color: '#25D366', fontSize: 22 }} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: '#9C9691', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.67rem' }}>WhatsApp</Typography>
                <Typography variant="body2" sx={{ color: '#2F2F2F', fontWeight: 600, mt: 0.3, fontSize: '0.82rem' }}>{WHATSAPP}</Typography>
              </Box>
            </Box>
          </Box>
        </FadeIn>

        {/* SNS icons */}
        <FadeIn delay={200}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 7, justifyContent: 'center' }}>
            {[
              { icon: <GitHubIcon sx={{ fontSize: 20 }} />, label: 'GitHub', href: 'https://github.com/thdekals724272', color: '#2F2F2F', bg: '#EFEAE3' },
              { icon: <LinkedInIcon sx={{ fontSize: 20 }} />, label: 'LinkedIn', href: '#', color: '#0A66C2', bg: '#EFF6FF' },
              { icon: <InstagramIcon sx={{ fontSize: 20 }} />, label: 'Instagram', href: '#', color: '#E1306C', bg: '#FFF0F5' },
            ].map(({ icon, label, href, color, bg }) => (
              <Box
                key={label}
                component="a"
                href={href}
                target="_blank" rel="noopener noreferrer"
                title={label}
                sx={{
                  width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '12px', background: bg, border: '1px solid transparent',
                  color: '#6B7280', textDecoration: 'none',
                  transition: 'all 0.22s ease',
                  '&:hover': { color, background: bg, border: `1px solid ${color}30`, transform: 'translateY(-3px)', boxShadow: `0 8px 20px ${color}22` },
                }}
              >
                {icon}
              </Box>
            ))}
          </Box>
        </FadeIn>

        <Divider sx={{ mb: 7, borderColor: 'rgba(122,143,123,0.1)' }} />

        {/* Guestbook header */}
        <FadeIn>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#2F2F2F', mb: 1, letterSpacing: '-0.02em' }}>
              방명록
            </Typography>
            <Typography variant="body2" sx={{ color: '#6B7280' }}>
              방문해주셔서 감사합니다. 짧은 메시지를 남겨주세요 😊
            </Typography>
          </Box>
        </FadeIn>

        {/* Guestbook form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ ...GLASS, borderRadius: '24px', p: { xs: 3, md: 4 }, mb: 4, boxShadow: '0 4px 24px rgba(122,143,123,0.08)' }}
        >
          <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 700, mb: 1.5, fontSize: '0.82rem' }}>이모지 선택</Typography>
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mb: 3 }}>
            {EMOJIS.map((emoji) => (
              <Box
                key={emoji}
                role="button"
                tabIndex={0}
                aria-label={`이모지 ${emoji} 선택`}
                aria-pressed={form.emoji === emoji}
                onClick={() => setForm({ ...form, emoji })}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setForm({ ...form, emoji }); } }}
                sx={{
                  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, borderRadius: '12px', cursor: 'pointer',
                  border: form.emoji === emoji ? '2px solid #7A8F7B' : '2px solid rgba(122,143,123,0.15)',
                  background: form.emoji === emoji ? 'rgba(122,143,123,0.08)' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.18s ease',
                  userSelect: 'none',
                  '&:hover': { borderColor: '#7A8F7B', background: 'rgba(122,143,123,0.06)' },
                  '&:focus-visible': { outline: '2px solid #7A8F7B', outlineOffset: 2 },
                }}
              >
                {emoji}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField label="이름 *" size="small" fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} slotProps={{ htmlInput: { 'data-gramm': 'false', spellCheck: false, maxLength: 20 } }} />
            <TextField label="소속 / 직업 (선택)" size="small" fullWidth value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} slotProps={{ htmlInput: { 'data-gramm': 'false', spellCheck: false, maxLength: 30 } }} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 700, mb: 1, fontSize: '0.82rem' }}>거주 지역 (선택)</Typography>
            <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
              {REGIONS.map((r) => (
                <Box
                  key={r}
                  role="button"
                  tabIndex={0}
                  aria-pressed={form.region === r}
                  onClick={() => setForm({ ...form, region: form.region === r ? '' : r })}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setForm({ ...form, region: form.region === r ? '' : r }); } }}
                  sx={{
                    px: 1.5, py: 0.5, borderRadius: '999px',
                    border: form.region === r ? '1.5px solid #7A8F7B' : '1.5px solid rgba(122,143,123,0.18)',
                    background: form.region === r ? '#7A8F7B' : 'transparent',
                    color: form.region === r ? '#FFFFFF' : '#6B7280',
                    fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer', userSelect: 'none',
                    transition: 'all 0.18s ease',
                    '&:hover': { borderColor: '#7A8F7B', color: form.region === r ? '#FFFFFF' : '#7A8F7B' },
                    '&:focus-visible': { outline: '2px solid #7A8F7B', outlineOffset: 2 },
                  }}
                >
                  {r}
                </Box>
              ))}
            </Box>
          </Box>

          <TextField
            label="메시지 *" multiline rows={3} fullWidth
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            slotProps={{ htmlInput: { 'data-gramm': 'false', spellCheck: false, maxLength: 300 } }}
            placeholder="짧은 인사나 메시지를 남겨주세요."
            sx={{ mb: 3 }}
          />

          <TextField
            label="삭제 비밀번호 (선택)" type="password" size="small" fullWidth
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            slotProps={{ htmlInput: { 'data-gramm': 'false', spellCheck: false, maxLength: 50 } }}
            helperText="비밀번호를 설정하면 나중에 내 글을 직접 삭제할 수 있어요."
            sx={{ mb: 3 }}
          />

          {submitError && <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>{submitError}</Alert>}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || !form.name.trim() || !form.message.trim()}
              endIcon={submitting ? <CircularProgress size={15} sx={{ color: '#fff' }} /> : <SendIcon sx={{ fontSize: '1rem !important' }} />}
              sx={{
                background: G, borderRadius: '12px', px: 4, fontWeight: 700,
                boxShadow: '0 6px 20px rgba(122,143,123,0.3)',
                '&:hover': { background: '#647566', boxShadow: '0 10px 28px rgba(122,143,123,0.4)' },
                '&:disabled': { background: '#E8E3DB', color: '#9C9691' },
                transition: 'all 0.25s ease',
              }}
            >
              {submitting ? '등록 중...' : '방명록 남기기'}
            </Button>
          </Box>
        </Box>

        {/* Guestbook list */}
        {loadingGuests ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#7A8F7B' }} />
          </Box>
        ) : guestbook.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, color: '#9C9691' }}>
            <Typography variant="body2">아직 방명록이 없습니다. 첫 번째로 남겨주세요!</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {guestbook.map((entry) => (
              <Box
                key={entry.id}
                sx={{
                  ...GLASS,
                  borderRadius: '20px',
                  p: 3,
                  display: 'flex',
                  gap: 2,
                  boxShadow: '0 2px 12px rgba(122,143,123,0.05)',
                  transition: 'all 0.22s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 28px rgba(122,143,123,0.1)', border: '1px solid rgba(122,143,123,0.18)' },
                }}
              >
                <Box sx={{ width: 46, height: 46, borderRadius: '14px', background: 'linear-gradient(135deg, #FBF6F0, #F7EFE6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {entry.emoji || '👋'}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#2F2F2F' }}>{entry.name}</Typography>
                    {entry.company && (
                      <Box sx={{ px: 1, py: 0.15, borderRadius: '6px', background: G, color: '#FFF', fontSize: '0.68rem', fontWeight: 700 }}>{entry.company}</Box>
                    )}
                    {entry.region && (
                      <Box sx={{ px: 1, py: 0.15, borderRadius: '6px', background: 'rgba(122,143,123,0.08)', color: '#7A8F7B', fontSize: '0.68rem', fontWeight: 600 }}>📍 {entry.region}</Box>
                    )}
                    <Typography variant="caption" sx={{ color: '#C9C2B8', ml: 'auto', fontSize: '0.72rem' }}>{formatDate(entry.created_at)}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteOpen(entry)}
                      title="삭제"
                      sx={{ color: '#C9C2B8', '&:hover': { color: '#EF4444', background: 'rgba(239,68,68,0.06)' }, borderRadius: '8px', flexShrink: 0 }}
                    >
                      <DeleteIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#4B4842', lineHeight: 1.7, wordBreak: 'break-word' }}>{entry.message}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      {/* Success Snackbar */}
      <Snackbar open={submitSuccess} autoHideDuration={3000} onClose={() => setSubmitSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSubmitSuccess(false)} sx={{ borderRadius: '12px' }}>
          방명록이 등록되었습니다! 감사합니다 😊
        </Alert>
      </Snackbar>

      {/* Delete Dialog */}
      <Dialog open={deleteTarget !== null} onClose={handleDeleteClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 800, color: '#2F2F2F', pb: 1 }}>방명록 삭제</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#6B7280', mb: 2 }}>
            작성 시 입력한 비밀번호를 입력하면 삭제됩니다.
          </Typography>
          <TextField
            label="비밀번호" type="password" fullWidth size="small" autoFocus
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDeleteConfirm()}
            slotProps={{ htmlInput: { 'data-gramm': 'false', spellCheck: false } }}
          />
          {deleteError && <Alert severity="error" sx={{ mt: 1.5, borderRadius: '12px' }}>{deleteError}</Alert>}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={handleDeleteClose} sx={{ color: '#6B7280', borderRadius: '10px' }}>취소</Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            disabled={deleting || !deletePassword.trim()}
            sx={{ background: 'linear-gradient(135deg, #EF4444, #DC2626)', borderRadius: '10px', boxShadow: '0 4px 12px rgba(239,68,68,0.3)', '&:hover': { background: 'linear-gradient(135deg, #DC2626, #B91C1C)' } }}
          >
            {deleting ? '삭제 중...' : '삭제'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

// ─── Home Page ────────────────────────────────────────────────
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
