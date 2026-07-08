import { useState, useEffect } from 'react';
import { useHoverActive } from '../hooks/useHoverActive';
import { gradientButtonSx, outlineButtonSx, imageZoomSx, imageOverlaySx } from '../styles/interactions';
import LoadingSpinner from '../components/LoadingSpinner';
import { ProjectCardSkeletonGrid } from '../components/ProjectCardSkeleton';
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

const TECH_COLORS = {
  React: '#C17F59',
  Supabase: '#10B981',
  PostgreSQL: '#8B7355',
  MUI: '#7A8F7B',
  CSS3: '#D9A273',
  Recharts: '#F59E0B',
  'Unsplash API': '#2F2F2F',
};

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { ref, active, handlers } = useHoverActive();

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
          {!imgError && project.thumbnail_url ? (
            <>
              {!imgLoaded && (
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
                src={project.thumbnail_url}
                alt={project.title}
                loading="lazy"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                sx={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: imgLoaded ? 'block' : 'none',
                  ...imageZoomSx(active),
                }}
              />
            </>
          ) : (
            <Box
              sx={{
                width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: G, gap: 1,
              }}
            >
              <Box sx={{ width: 40, height: 40, borderRadius: '14px', background: 'rgba(255,255,255,0.25)' }} />
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.68rem' }}>Preview unavailable</Typography>
            </Box>
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
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Projects;
