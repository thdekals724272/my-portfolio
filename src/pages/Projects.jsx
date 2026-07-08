import { useState, useEffect } from 'react';
import { useHoverActive } from '../hooks/useHoverActive';
import { useThumbnail } from '../hooks/useThumbnail';
import { gradientButtonSx, outlineButtonSx, imageZoomSx, imageOverlaySx } from '../styles/interactions';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProjectCardSkeletonGrid } from '../components/ProjectCardSkeleton';
import ProjectThumbnailFallback from '../components/ProjectThumbnailFallback';
import ScrollReveal from '../components/ScrollReveal';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../lib/supabase';

const G = '#7A8F7B';
const GLASS = {
  background: 'rgba(255,255,255,0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.65)',
};

// 세이지 / 베이지 / 테라코타 / 앰버 톤을 순서대로 순환시켜 기술 배지를 Warm Minimal 톤으로 통일한다
const BADGE_PALETTE = ['#7A8F7B', '#D9A273', '#D88C7A', '#C99A3E'];
const badgeColor = (i) => BADGE_PALETTE[i % BADGE_PALETTE.length];

// 프로젝트별 Problem / Solution / Result 한 줄 스토리 (제목으로 매칭, 없으면 표시하지 않음)
const PROJECT_STORY = {
  'Export Connect': {
    problem: '중고차 수출 정보를 한곳에서 공유하기 어려움',
    solution: '업계 종사자를 위한 커뮤니티 구조 설계',
    result: '정보 공유와 네트워킹이 가능한 웹 커뮤니티 구현',
  },
  'Wedding SNS': {
    problem: '예비부부의 결혼 준비 기록이 흩어져 있음',
    solution: '사진과 글을 함께 기록할 수 있는 SNS 구조 설계',
    result: '결혼 준비 과정을 공유하는 미니 SNS 구현',
  },
  'Portfolio Website': {
    problem: '내가 만든 프로젝트와 성장 과정을 한눈에 보여주기 어려움',
    solution: 'Product Builder 포지셔닝에 맞춘 포트폴리오 구성',
    result: '프로젝트와 스토리를 함께 보여주는 웹사이트 구현',
  },
};

const STORY_ROWS = [
  { key: 'problem', label: 'Problem', icon: '🔍', color: '#D88C7A' },
  { key: 'solution', label: 'Solution', icon: '💡', color: '#D9A273' },
  { key: 'result', label: 'Result', icon: '✅', color: '#7A8F7B' },
];

function ProjectStoryRows({ story, compact = false }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.55, mb: compact ? 2.5 : 3 }}>
      {STORY_ROWS.map((row) => (
        <Box key={row.key} sx={{ display: 'flex', alignItems: 'baseline', gap: 0.8 }}>
          <Typography component="span" sx={{ fontWeight: 800, fontSize: compact ? '0.66rem' : '0.72rem', color: row.color, flexShrink: 0, letterSpacing: 0.2, whiteSpace: 'nowrap' }}>
            {row.icon} {row.label}
          </Typography>
          <Typography component="span" sx={{ fontSize: compact ? '0.76rem' : '0.84rem', color: '#6B7280', lineHeight: 1.5 }}>
            {story[row.key]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function ProjectCard({ project, index }) {
  const { src: thumbSrc, state: thumbState, handleLoad, handleError } = useThumbnail(project.thumbnail_url);
  const { ref, active, handlers } = useHoverActive();
  const story = PROJECT_STORY[project.title];

  return (
    <ScrollReveal delay={index * 100} scale>
      <Box
        sx={{
          ...GLASS,
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 24px rgba(122,143,123,0.07)',
          willChange: 'transform, box-shadow',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': { transform: 'translateY(-8px) scale(1.015)', boxShadow: '0 24px 56px rgba(122,143,123,0.18)' },
          },
          height: '100%',
        }}
      >
        {/* Thumbnail */}
        <Box
          ref={ref}
          {...handlers}
          className="zoom-trigger"
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#EFEAE3',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {thumbState === 'error' ? (
            <ProjectThumbnailFallback title={project.title} />
          ) : (
            <>
              {thumbState === 'loading' && (
                <Box
                  sx={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, #FBF6F0, #F7EFE6)',
                  }}
                >
                  <LoadingSpinner size={7} py={0} />
                </Box>
              )}
              <Box
                component="img"
                src={thumbSrc}
                alt={project.title}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                sx={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: thumbState === 'loaded' ? 'block' : 'none',
                  ...imageZoomSx(active),
                }}
              />
            </>
          )}
          {/* 이미지 오버레이 정보 — 데스크톱 hover / 모바일 tap 시 노출 */}
          <Box sx={imageOverlaySx(active)}>
            <Typography sx={{ color: '#FFF', fontWeight: 800, fontSize: '0.88rem', letterSpacing: '-0.01em' }}>
              {project.title}
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.72rem' }}>
              {project.tech_stack?.slice(0, 3).join(' · ')}
            </Typography>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#2F2F2F', mb: 0.5, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#6B7280', lineHeight: 1.75, mb: 2.5, flex: 1, fontSize: '0.84rem' }}>
            {project.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.7, mb: 2.5 }}>
            {project.tech_stack.map((tech, i) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  fontSize: '0.68rem', fontWeight: 700, height: 22, borderRadius: '8px',
                  backgroundColor: `${badgeColor(i)}15`,
                  color: badgeColor(i),
                  border: `1px solid ${badgeColor(i)}30`,
                }}
              />
            ))}
          </Box>

          {story && <ProjectStoryRows story={story} compact />}

          <Box sx={{ display: 'flex', gap: 1 }}>
            {project.detail_url && (
              <Button
                variant="contained"
                size="small"
                href={project.detail_url}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon sx={{ fontSize: '0.8rem !important' }} />}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  ...gradientButtonSx('#8FA490', '#647566', 'rgba(122,143,123,0.38)'),
                  flex: 1, fontWeight: 700, fontSize: '0.74rem',
                  borderRadius: '10px', py: 0.9,
                  boxShadow: '0 4px 14px rgba(122,143,123,0.3)',
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
              startIcon={<GitHubIcon sx={{ fontSize: '0.9rem !important' }} />}
              onClick={(e) => e.stopPropagation()}
              sx={{
                ...outlineButtonSx,
                flex: 1, borderColor: 'rgba(122,143,123,0.25)', color: '#7A8F7B',
                fontWeight: 700, fontSize: '0.74rem', borderRadius: '10px', py: 0.9,
                '@media (hover: hover) and (pointer: fine)': {
                  '&:hover': { borderColor: '#7A8F7B', background: 'rgba(122,143,123,0.05)', transform: 'perspective(700px) rotateX(6deg) translateY(-2px)' },
                },
              }}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  );
}

// 첫 번째 프로젝트를 크게 보여주는 Featured 카드 — 데스크톱은 썸네일+정보 좌우 배치, 모바일은 세로 스택
function FeaturedProjectCard({ project }) {
  const { src: thumbSrc, state: thumbState, handleLoad, handleError } = useThumbnail(project.thumbnail_url);
  const { ref, active, handlers } = useHoverActive();
  const story = PROJECT_STORY[project.title];

  return (
    <ScrollReveal scale>
      <Box
        sx={{
          ...GLASS,
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          boxShadow: '0 6px 28px rgba(122,143,123,0.09)',
          willChange: 'transform, box-shadow',
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease',
          '@media (hover: hover) and (pointer: fine)': {
            '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 28px 64px rgba(122,143,123,0.2)' },
          },
        }}
      >
        {/* Thumbnail */}
        <Box
          ref={ref}
          {...handlers}
          className="zoom-trigger"
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '52%' },
            aspectRatio: { xs: '16/10', md: 'auto' },
            minHeight: { md: 320 },
            backgroundColor: '#EFEAE3',
            overflow: 'hidden',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {thumbState === 'error' ? (
            <ProjectThumbnailFallback title={project.title} />
          ) : (
            <>
              {thumbState === 'loading' && (
                <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FBF6F0, #F7EFE6)' }}>
                  <LoadingSpinner size={8} py={0} />
                </Box>
              )}
              <Box
                component="img"
                src={thumbSrc}
                alt={project.title}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                sx={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: thumbState === 'loaded' ? 'block' : 'none',
                  ...imageZoomSx(active),
                }}
              />
            </>
          )}
          <Box sx={imageOverlaySx(active)}>
            <Typography sx={{ color: '#FFF', fontWeight: 800, fontSize: '0.92rem', letterSpacing: '-0.01em' }}>{project.title}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.74rem' }}>{project.tech_stack?.slice(0, 3).join(' · ')}</Typography>
          </Box>
        </Box>

        {/* Info */}
        <Box sx={{ p: { xs: 3, md: 4.5 }, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.6, alignSelf: 'flex-start',
              px: 1.6, py: 0.5, mb: 1.8, borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(122,143,123,0.12), rgba(217,162,115,0.12))',
              border: '1px solid rgba(122,143,123,0.25)', color: '#7A8F7B',
              fontSize: '0.68rem', fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase',
            }}
          >
            ⭐ Featured Project
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#2F2F2F', mb: 1, fontSize: { xs: '1.3rem', md: '1.55rem' }, letterSpacing: '-0.01em' }}>
            {project.title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', lineHeight: 1.8, mb: 2.5, fontSize: { xs: '0.9rem', md: '0.95rem' } }}>
            {project.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 3 }}>
            {project.tech_stack.map((tech, i) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                sx={{
                  fontSize: '0.72rem', fontWeight: 700, height: 24, borderRadius: '8px',
                  backgroundColor: `${badgeColor(i)}15`,
                  color: badgeColor(i),
                  border: `1px solid ${badgeColor(i)}30`,
                }}
              />
            ))}
          </Box>

          {story && <ProjectStoryRows story={story} />}

          <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap' }}>
            {project.detail_url && (
              <Button
                variant="contained"
                href={project.detail_url}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon sx={{ fontSize: '0.9rem !important' }} />}
                onClick={(e) => e.stopPropagation()}
                sx={{
                  ...gradientButtonSx('#8FA490', '#647566', 'rgba(122,143,123,0.38)'),
                  fontWeight: 700, fontSize: '0.82rem',
                  borderRadius: '12px', px: 3, py: 1,
                  boxShadow: '0 4px 14px rgba(122,143,123,0.3)',
                }}
              >
                Live Demo
              </Button>
            )}
            <Button
              variant="outlined"
              href="https://github.com/thdekals724272/vibeCoding"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHubIcon sx={{ fontSize: '1rem !important' }} />}
              onClick={(e) => e.stopPropagation()}
              sx={{
                ...outlineButtonSx,
                borderColor: 'rgba(122,143,123,0.25)', color: '#7A8F7B',
                fontWeight: 700, fontSize: '0.82rem', borderRadius: '12px', px: 3, py: 1,
                '@media (hover: hover) and (pointer: fine)': {
                  '&:hover': { borderColor: '#7A8F7B', background: 'rgba(122,143,123,0.05)', transform: 'perspective(700px) rotateX(6deg) translateY(-2px)' },
                },
              }}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Box>
    </ScrollReveal>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setProjects(data);
        setLoading(false);
      });
  }, []);

  return (
    <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)', background: '#FAF8F5' }}>
      {/* Hero header */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #FBF6F0 0%, #FDF9F3 55%, #F7EFE6 100%)',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {[
          { size: 500, color: 'rgba(122,143,123,0.14)', top: -180, right: -80 },
          { size: 360, color: 'rgba(217,162,115,0.10)', bottom: -80, left: -60 },
        ].map((orb, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: orb.size, height: orb.size, borderRadius: '50%',
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              top: orb.top, right: orb.right, bottom: orb.bottom, left: orb.left,
              pointerEvents: 'none',
            }}
          />
        ))}
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'inline-block', px: 2, py: 0.6, mb: 2.5, borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(122,143,123,0.1), rgba(217,162,115,0.1))',
              border: '1px solid rgba(122,143,123,0.2)', color: '#7A8F7B',
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            }}
          >
            Projects
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800, mb: 2,
              background: 'linear-gradient(135deg, #4A4238 0%, #7A8F7B 50%, #D9A273 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontSize: { xs: '2rem', md: '3rem' }, letterSpacing: '-0.03em', lineHeight: 1.2,
            }}
          >
            대표 프로젝트
          </Typography>
          <Typography variant="body1" sx={{ color: '#6B7280', lineHeight: 1.8, maxWidth: 480, mx: 'auto' }}>
            바이브코딩으로 만든 프로젝트들을 소개합니다.
          </Typography>
        </Container>
      </Box>

      {/* Project grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {loading ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            <ProjectCardSkeletonGrid count={6} />
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography variant="body1" sx={{ color: '#9C9691' }}>등록된 프로젝트가 없습니다.</Typography>
          </Box>
        ) : (
          <>
            {/* 첫 번째 프로젝트 — Featured Card */}
            <Box sx={{ mb: { xs: 3, md: 4 } }}>
              <FeaturedProjectCard project={projects[0]} />
            </Box>

            {/* 나머지 프로젝트 — 일반 카드 그리드 */}
            {projects.length > 1 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  gap: 3,
                }}
              >
                {projects.slice(1).map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default Projects;
