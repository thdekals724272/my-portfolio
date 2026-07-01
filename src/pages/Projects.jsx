import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../lib/supabase';

const G = 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)';
const GLASS = {
  background: 'rgba(255,255,255,0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.65)',
};

const TECH_COLORS = {
  React: '#0EA5E9',
  Supabase: '#10B981',
  PostgreSQL: '#3B82F6',
  MUI: '#6366F1',
  CSS3: '#8B5CF6',
  Recharts: '#F59E0B',
  'Unsplash API': '#0F172A',
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

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <FadeIn delay={index * 100}>
      <Box
        sx={{
          ...GLASS,
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 24px rgba(99,102,241,0.07)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.01)',
            boxShadow: '0 24px 56px rgba(99,102,241,0.18)',
          },
          height: '100%',
        }}
      >
        {/* Thumbnail */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#F1F5F9',
            overflow: 'hidden',
          }}
        >
          {!imgError && project.thumbnail_url ? (
            <>
              {!imgLoaded && (
                <Box
                  sx={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, #EEF2FF, #F3E8FF)',
                  }}
                >
                  <CircularProgress size={24} sx={{ color: '#6366F1' }} />
                </Box>
              )}
              <Box
                component="img"
                src={project.thumbnail_url}
                alt={project.title}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                sx={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: imgLoaded ? 'block' : 'none',
                  transition: 'transform 0.45s ease',
                  '&:hover': { transform: 'scale(1.06)' },
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
        </Box>

        {/* Body */}
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
            {project.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.75, mb: 2.5, flex: 1, fontSize: '0.84rem' }}>
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
                  backgroundColor: `${TECH_COLORS[tech] || '#6366F1'}15`,
                  color: TECH_COLORS[tech] || '#6366F1',
                  border: `1px solid ${TECH_COLORS[tech] || '#6366F1'}30`,
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
                  flex: 1, background: G, fontWeight: 700, fontSize: '0.74rem',
                  borderRadius: '10px', py: 0.9,
                  boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
                  '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', transform: 'translateY(-1px)', boxShadow: '0 8px 22px rgba(99,102,241,0.38)' },
                  transition: 'all 0.22s ease',
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
                flex: 1, borderColor: 'rgba(99,102,241,0.25)', color: '#6366F1',
                fontWeight: 700, fontSize: '0.74rem', borderRadius: '10px', py: 0.9,
                '&:hover': { borderColor: '#6366F1', background: 'rgba(99,102,241,0.05)', transform: 'translateY(-1px)' },
                transition: 'all 0.22s ease',
              }}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Box>
    </FadeIn>
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
    <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)', background: '#F8FAFF' }}>
      {/* Hero header */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 55%, #F3E8FF 100%)',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {[
          { size: 500, color: 'rgba(99,102,241,0.14)', top: -180, right: -80 },
          { size: 360, color: 'rgba(139,92,246,0.10)', bottom: -80, left: -60 },
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
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.2)', color: '#6366F1',
              fontSize: '0.7rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase',
            }}
          >
            Projects
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800, mb: 2,
              background: 'linear-gradient(135deg, #1E1B4B 0%, #6366F1 50%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontSize: { xs: '2rem', md: '3rem' }, letterSpacing: '-0.03em', lineHeight: 1.2,
            }}
          >
            대표 프로젝트
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.8, maxWidth: 480, mx: 'auto' }}>
            바이브코딩으로 만든 프로젝트들을 소개합니다.
          </Typography>
        </Container>
      </Box>

      {/* Project grid */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress sx={{ color: '#6366F1' }} />
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography variant="body1" sx={{ color: '#94A3B8' }}>등록된 프로젝트가 없습니다.</Typography>
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
