import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { supabase } from '../lib/supabase';

const TECH_COLORS = {
  React: '#61DAFB',
  Supabase: '#3ECF8E',
  PostgreSQL: '#336791',
  MUI: '#007FFF',
  'CSS3': '#1572B6',
  Recharts: '#FF7300',
  'Unsplash API': '#000000',
};

function ProjectCard({ project }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 32px rgba(0,44,95,0.15)',
        },
        cursor: 'pointer',
      }}
    >
      {/* 썸네일 */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          backgroundColor: '#F1F5F9',
          overflow: 'hidden',
        }}
      >
        {!imgError && project.thumbnail_url ? (
          <>
            {!imgLoaded && (
              <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={28} sx={{ color: '#002C5F' }} />
              </Box>
            )}
            <Box
              component="img"
              src={project.thumbnail_url}
              alt={project.title}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: imgLoaded ? 'block' : 'none',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.04)' },
              }}
            />
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#002C5F',
              gap: 1,
            }}
          >
            <Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: '#00AAD2', opacity: 0.7 }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem' }}>
              Preview unavailable
            </Typography>
          </Box>
        )}
      </Box>

      {/* 카드 본문 */}
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
          {project.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.7, mb: 2, flex: 1 }}>
          {project.description}
        </Typography>

        {/* 기술 스택 뱃지 */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2.5 }}>
          {project.tech_stack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                fontSize: '0.7rem',
                fontWeight: 600,
                backgroundColor: `${TECH_COLORS[tech] || '#94A3B8'}18`,
                color: TECH_COLORS[tech] || '#64748B',
                border: `1px solid ${TECH_COLORS[tech] || '#94A3B8'}40`,
                borderRadius: 1.5,
                height: 24,
              }}
            />
          ))}
        </Box>

        {/* 버튼 */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {project.detail_url && (
            <Button
              variant="contained"
              size="small"
              href={project.detail_url}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon sx={{ fontSize: '0.85rem !important' }} />}
              onClick={(e) => e.stopPropagation()}
              sx={{
                flex: 1,
                backgroundColor: '#002C5F',
                fontWeight: 700,
                fontSize: '0.78rem',
                borderRadius: 2,
                py: 0.8,
                '&:hover': { backgroundColor: '#00AAD2' },
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
              flex: 1,
              borderColor: '#E2E8F0',
              color: '#475569',
              fontWeight: 700,
              fontSize: '0.78rem',
              borderRadius: 2,
              py: 0.8,
              '&:hover': { borderColor: '#002C5F', color: '#002C5F', backgroundColor: '#EFF6FF' },
            }}
          >
            GitHub
          </Button>
        </Box>
      </Box>
    </Box>
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
    <Box component="main" sx={{ minHeight: 'calc(100vh - 64px)', backgroundColor: '#F8FAFC' }}>
      {/* 헤더 */}
      <Box sx={{ backgroundColor: '#002C5F', py: { xs: 6, md: 10 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: '#00AAD2', letterSpacing: 3, fontWeight: 700 }}>
            PROJECTS
          </Typography>
          <Typography variant="h2" sx={{ mt: 1, fontWeight: 700, color: '#FFFFFF' }}>
            Projects
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
            바이브코딩으로 만든 프로젝트들을 소개합니다.
          </Typography>
        </Container>
      </Box>

      {/* 프로젝트 그리드 */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#002C5F' }} />
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10, color: '#94A3B8' }}>
            <Typography variant="body1">등록된 프로젝트가 없습니다.</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Projects;
