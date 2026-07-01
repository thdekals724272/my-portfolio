import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { aboutMeData } from '../data/aboutMeData';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Chip from '@mui/material/Chip';
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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { supabase } from '../lib/supabase';

// ─── Design Tokens ───────────────────────────────────────────
const G = 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)';
const GLASS = {
  background: 'rgba(255,255,255,0.75)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.65)',
};

const EMOJIS = ['👋', '😊', '🚀', '💼', '🌏', '🤝', '✨', '💡', '🎯', '❤️'];
const REGIONS = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '해외'];

const TECH_COLORS = {
  React: '#0EA5E9',
  Supabase: '#10B981',
  PostgreSQL: '#3B82F6',
  MUI: '#6366F1',
  CSS3: '#8B5CF6',
  Recharts: '#F59E0B',
};

const SKILLS = [
  { name: 'React', color: '#0EA5E9', bg: '#E0F2FE' },
  { name: 'JavaScript', color: '#D97706', bg: '#FEF3C7' },
  { name: 'TypeScript', color: '#3B82F6', bg: '#DBEAFE' },
  { name: 'Node.js', color: '#16A34A', bg: '#DCFCE7' },
  { name: 'CSS', color: '#6366F1', bg: '#EEF2FF' },
  { name: 'Git', color: '#DC2626', bg: '#FEE2E2' },
  { name: 'Supabase', color: '#059669', bg: '#D1FAE5' },
  { name: 'MUI', color: '#1D4ED8', bg: '#DBEAFE' },
];

const sectionLabel = {
  display: 'inline-block',
  px: 2, py: 0.6, mb: 2,
  borderRadius: '999px',
  background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
  border: '1px solid rgba(99,102,241,0.2)',
  color: '#6366F1',
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
    <Box sx={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent)', mx: 4 }} />
  );
}

// ─── Hero ─────────────────────────────────────────────────────
function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 55%, #F3E8FF 100%)',
        py: { xs: 10, md: 16 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      {[
        { size: 640, color: 'rgba(99,102,241,0.16)', top: -220, right: -120 },
        { size: 420, color: 'rgba(6,182,212,0.13)', bottom: -100, left: -80 },
        { size: 300, color: 'rgba(139,92,246,0.11)', top: '28%', left: '6%' },
      ].map((orb, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: orb.size, height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            top: orb.top, right: orb.right, bottom: orb.bottom, left: orb.left,
            pointerEvents: 'none',
          }}
        />
      ))}

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Status badge */}
        <Box
          sx={{
            display: 'inline-flex', alignItems: 'center', gap: 1,
            px: 2.5, py: 0.9, mb: 4, borderRadius: '999px',
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
          }}
        >
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E88' }} />
          <Typography variant="caption" sx={{ color: '#6366F1', fontWeight: 700, fontSize: '0.78rem', letterSpacing: 0.3 }}>
            Available for opportunities
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.4rem', md: '3.8rem' },
            background: 'linear-gradient(135deg, #1E1B4B 0%, #6366F1 50%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2.5,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
          }}
        >
          홍길동의 포트폴리오
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: '#64748B', mb: 5, lineHeight: 1.85, fontWeight: 400, maxWidth: 520, mx: 'auto', fontSize: { xs: '1rem', md: '1.05rem' } }}
        >
          여기는 Hero 섹션입니다.
          <br />
          메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 5 }}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/projects"
            sx={{
              background: G,
              color: '#FFF',
              fontWeight: 700,
              px: 4.5, py: 1.6,
              borderRadius: '14px',
              boxShadow: '0 8px 24px rgba(99,102,241,0.35)',
              '&:hover': { background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 12px 32px rgba(99,102,241,0.45)', transform: 'translateY(-2px)' },
              transition: 'all 0.25s ease',
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
              borderColor: 'rgba(99,102,241,0.35)',
              color: '#6366F1',
              fontWeight: 700,
              px: 4.5, py: 1.6,
              borderRadius: '14px',
              backgroundColor: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(8px)',
              '&:hover': { backgroundColor: 'rgba(99,102,241,0.06)', borderColor: '#6366F1', transform: 'translateY(-2px)' },
              transition: 'all 0.25s ease',
            }}
          >
            About Me
          </Button>
        </Box>

        {/* Tech pills */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['React', 'TypeScript', 'Supabase', 'MUI', 'Git'].map((tech) => (
            <Box
              key={tech}
              sx={{
                px: 2, py: 0.6, borderRadius: '999px', fontSize: '0.76rem', fontWeight: 600,
                background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(99,102,241,0.12)', color: '#64748B',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              {tech}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// ─── About ────────────────────────────────────────────────────
function AboutSection() {
  const { basicInfo, sections } = aboutMeData;
  const homeSections = sections.filter((s) => s.showInHome);

  return (
    <Box component="section" sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <FadeIn>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={sectionLabel}>About Me</Box>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.2rem' }, letterSpacing: '-0.02em' }}>
              자기소개
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              {basicInfo.name} · {basicInfo.position}
            </Typography>
          </Box>
        </FadeIn>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 5 }}>
          {homeSections.map((section, i) => (
            <FadeIn key={section.id} delay={i * 90}>
              <Box
                sx={{
                  display: 'flex', gap: 2.5, alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(99,102,241,0.1)',
                  borderRadius: '20px',
                  p: 3,
                  boxShadow: '0 2px 14px rgba(99,102,241,0.06)',
                  transition: 'all 0.25s ease',
                  '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 30px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' },
                }}
              >
                <Box
                  sx={{
                    width: 44, height: 44, borderRadius: '13px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #EEF2FF, #F3E8FF)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                  }}
                >
                  {section.emoji}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5, fontSize: '0.93rem' }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.8, fontSize: '0.85rem' }}>
                    {section.content}
                  </Typography>
                </Box>
              </Box>
            </FadeIn>
          ))}
        </Box>

        <FadeIn delay={300}>
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              component={Link}
              to="/about"
              sx={{
                background: G, color: '#FFF', fontWeight: 700,
                px: 4.5, py: 1.3, borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
                '&:hover': { background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(99,102,241,0.4)' },
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
}

// ─── Skills ───────────────────────────────────────────────────
function SkillSection() {
  return (
    <Box component="section" sx={{ backgroundColor: '#F8FAFF', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <FadeIn>
          <Box sx={sectionLabel}>Skill Tree</Box>
          <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.2rem' }, letterSpacing: '-0.02em' }}>
            기술 스택
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 5 }}>주로 사용하는 기술 스택을 소개합니다.</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {SKILLS.map((skill, i) => (
              <FadeIn key={skill.name} delay={i * 55}>
                <Box
                  sx={{
                    display: 'flex', alignItems: 'center', gap: 1.2,
                    px: 2.5, py: 1.4, borderRadius: '14px',
                    background: skill.bg,
                    border: `1.5px solid ${skill.color}25`,
                    cursor: 'default',
                    transition: 'all 0.25s ease',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 10px 24px ${skill.color}22`, border: `1.5px solid ${skill.color}55` },
                  }}
                >
                  <Box sx={{ width: 9, height: 9, borderRadius: '50%', background: skill.color, boxShadow: `0 0 7px ${skill.color}70` }} />
                  <Typography variant="body2" sx={{ fontWeight: 700, color: skill.color, fontSize: '0.88rem' }}>
                    {skill.name}
                  </Typography>
                </Box>
              </FadeIn>
            ))}
          </Box>
        </FadeIn>
      </Container>
    </Box>
  );
}

// ─── Projects ─────────────────────────────────────────────────
function ProjectsSection() {
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
    <Box component="section" sx={{ backgroundColor: '#FFFFFF', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <FadeIn>
          <Box sx={sectionLabel}>Projects</Box>
          <Typography variant="h3" sx={{ mb: 1.5, fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.2rem' }, letterSpacing: '-0.02em' }}>
            대표 프로젝트
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 5 }}>바이브코딩으로 만든 프로젝트들입니다.</Typography>
        </FadeIn>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#6366F1' }} />
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
                    boxShadow: '0 4px 24px rgba(99,102,241,0.07)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': { transform: 'translateY(-7px) scale(1.01)', boxShadow: '0 20px 48px rgba(99,102,241,0.16)' },
                  }}
                >
                  <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
                    {!imgErrors[project.id] && project.thumbnail_url ? (
                      <>
                        {!imgLoaded[project.id] && (
                          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #EEF2FF, #F3E8FF)' }}>
                            <CircularProgress size={24} sx={{ color: '#6366F1' }} />
                          </Box>
                        )}
                        <Box
                          component="img"
                          src={project.thumbnail_url}
                          alt={project.title}
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
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5, fontSize: '1.05rem', letterSpacing: '-0.01em' }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.7, mb: 2, flex: 1, fontSize: '0.84rem' }}>
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
                          onClick={(e) => e.stopPropagation()}
                          sx={{
                            flex: 1, background: G, fontWeight: 700, fontSize: '0.74rem',
                            borderRadius: '10px', py: 0.8,
                            boxShadow: '0 4px 12px rgba(99,102,241,0.28)',
                            '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', transform: 'translateY(-1px)' },
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
                          flex: 1, borderColor: 'rgba(99,102,241,0.28)', color: '#6366F1',
                          fontWeight: 700, fontSize: '0.74rem', borderRadius: '10px', py: 0.8,
                          '&:hover': { borderColor: '#6366F1', background: 'rgba(99,102,241,0.05)', transform: 'translateY(-1px)' },
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
              borderColor: 'rgba(99,102,241,0.3)', color: '#6366F1', fontWeight: 700,
              px: 5, py: 1.3, borderRadius: '14px', fontSize: '0.95rem',
              '&:hover': { background: 'rgba(99,102,241,0.06)', borderColor: '#6366F1', transform: 'translateY(-2px)' },
              transition: 'all 0.25s ease',
            }}
          >
            더 보기
          </Button>
        </FadeIn>
      </Container>
    </Box>
  );
}

// ─── Contact ──────────────────────────────────────────────────
function ContactSection() {
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

  const EMAIL = 'thdekals724272@gmail.com';
  const WHATSAPP = '+82-10-0000-0000';

  useEffect(() => { fetchGuestbook(); }, []);

  const fetchGuestbook = async () => {
    setLoadingGuests(true);
    const { data } = await supabase.from('guestbook').select('*').order('created_at', { ascending: false }).limit(20);
    if (data) setGuestbook(data);
    setLoadingGuests(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
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
  };

  const handleDeleteOpen = async (entry) => {
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
  };

  const handleDeleteClose = () => { setDeleteTarget(null); setDeletePassword(''); setDeleteError(''); };

  const handleDeleteConfirm = async () => {
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
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const contactCardSx = {
    flex: 1,
    ...GLASS,
    borderRadius: '20px',
    p: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    boxShadow: '0 4px 20px rgba(99,102,241,0.06)',
    transition: 'all 0.25s ease',
  };

  return (
    <Box component="section" sx={{ background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%)', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">

        {/* Header */}
        <FadeIn>
          <Box sx={{ textAlign: 'center', mb: 7 }}>
            <Box sx={sectionLabel}>Contact</Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, fontSize: { xs: '1.8rem', md: '2.2rem' }, letterSpacing: '-0.02em' }}>
              연락하기
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.8 }}>
              언제든지 편하게 연락해주세요. 빠르게 답변드리겠습니다.
            </Typography>
          </Box>
        </FadeIn>

        {/* Contact cards */}
        <FadeIn delay={100}>
          <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* Email */}
            <Box sx={{ ...contactCardSx, '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)' } }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <EmailIcon sx={{ color: '#6366F1', fontSize: 22 }} />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.67rem' }}>Email</Typography>
                <Typography variant="body2" sx={{ color: '#0F172A', fontWeight: 600, mt: 0.3, wordBreak: 'break-all', fontSize: '0.82rem' }}>{EMAIL}</Typography>
              </Box>
              <IconButton size="small" onClick={handleCopyEmail} sx={{ color: copied ? '#22C55E' : '#94A3B8', flexShrink: 0, transition: 'color 0.2s' }}>
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
                <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', fontSize: '0.67rem' }}>WhatsApp</Typography>
                <Typography variant="body2" sx={{ color: '#0F172A', fontWeight: 600, mt: 0.3, fontSize: '0.82rem' }}>{WHATSAPP}</Typography>
              </Box>
            </Box>
          </Box>
        </FadeIn>

        {/* SNS icons */}
        <FadeIn delay={200}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 7, justifyContent: 'center' }}>
            {[
              { icon: <GitHubIcon sx={{ fontSize: 20 }} />, label: 'GitHub', href: 'https://github.com/thdekals724272', color: '#0F172A', bg: '#F1F5F9' },
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
                  color: '#64748B', textDecoration: 'none',
                  transition: 'all 0.22s ease',
                  '&:hover': { color, background: bg, border: `1px solid ${color}30`, transform: 'translateY(-3px)', boxShadow: `0 8px 20px ${color}22` },
                }}
              >
                {icon}
              </Box>
            ))}
          </Box>
        </FadeIn>

        <Divider sx={{ mb: 7, borderColor: 'rgba(99,102,241,0.1)' }} />

        {/* Guestbook header */}
        <FadeIn>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1, letterSpacing: '-0.02em' }}>
              방명록
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              방문해주셔서 감사합니다. 짧은 메시지를 남겨주세요 😊
            </Typography>
          </Box>
        </FadeIn>

        {/* Guestbook form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ ...GLASS, borderRadius: '24px', p: { xs: 3, md: 4 }, mb: 4, boxShadow: '0 4px 24px rgba(99,102,241,0.08)' }}
        >
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 700, mb: 1.5, fontSize: '0.82rem' }}>이모지 선택</Typography>
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mb: 3 }}>
            {EMOJIS.map((emoji) => (
              <Box
                key={emoji}
                onClick={() => setForm({ ...form, emoji })}
                sx={{
                  width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, borderRadius: '12px', cursor: 'pointer',
                  border: form.emoji === emoji ? '2px solid #6366F1' : '2px solid rgba(99,102,241,0.15)',
                  background: form.emoji === emoji ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.6)',
                  transition: 'all 0.18s ease',
                  userSelect: 'none',
                  '&:hover': { borderColor: '#6366F1', background: 'rgba(99,102,241,0.06)' },
                }}
              >
                {emoji}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField label="이름 *" size="small" fullWidth value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} inputProps={{ 'data-gramm': 'false', spellCheck: false, maxLength: 20 }} />
            <TextField label="소속 / 직업 (선택)" size="small" fullWidth value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} inputProps={{ 'data-gramm': 'false', spellCheck: false, maxLength: 30 }} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 700, mb: 1, fontSize: '0.82rem' }}>거주 지역 (선택)</Typography>
            <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
              {REGIONS.map((r) => (
                <Box
                  key={r}
                  onClick={() => setForm({ ...form, region: form.region === r ? '' : r })}
                  sx={{
                    px: 1.5, py: 0.5, borderRadius: '999px',
                    border: form.region === r ? '1.5px solid #6366F1' : '1.5px solid rgba(99,102,241,0.18)',
                    background: form.region === r ? '#6366F1' : 'transparent',
                    color: form.region === r ? '#FFFFFF' : '#64748B',
                    fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer', userSelect: 'none',
                    transition: 'all 0.18s ease',
                    '&:hover': { borderColor: '#6366F1', color: form.region === r ? '#FFFFFF' : '#6366F1' },
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
            inputProps={{ 'data-gramm': 'false', spellCheck: false, maxLength: 300 }}
            placeholder="짧은 인사나 메시지를 남겨주세요."
            sx={{ mb: 3 }}
          />

          <TextField
            label="삭제 비밀번호 (선택)" type="password" size="small" fullWidth
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            inputProps={{ 'data-gramm': 'false', spellCheck: false, maxLength: 50 }}
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
                boxShadow: '0 6px 20px rgba(99,102,241,0.3)',
                '&:hover': { background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', boxShadow: '0 10px 28px rgba(99,102,241,0.4)' },
                '&:disabled': { background: '#E2E8F0', color: '#94A3B8' },
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
            <CircularProgress sx={{ color: '#6366F1' }} />
          </Box>
        ) : guestbook.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6, color: '#94A3B8' }}>
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
                  boxShadow: '0 2px 12px rgba(99,102,241,0.05)',
                  transition: 'all 0.22s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 28px rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.18)' },
                }}
              >
                <Box sx={{ width: 46, height: 46, borderRadius: '14px', background: 'linear-gradient(135deg, #EEF2FF, #F3E8FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
                  {entry.emoji || '👋'}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>{entry.name}</Typography>
                    {entry.company && (
                      <Box sx={{ px: 1, py: 0.15, borderRadius: '6px', background: G, color: '#FFF', fontSize: '0.68rem', fontWeight: 700 }}>{entry.company}</Box>
                    )}
                    {entry.region && (
                      <Box sx={{ px: 1, py: 0.15, borderRadius: '6px', background: 'rgba(99,102,241,0.08)', color: '#6366F1', fontSize: '0.68rem', fontWeight: 600 }}>📍 {entry.region}</Box>
                    )}
                    <Typography variant="caption" sx={{ color: '#CBD5E1', ml: 'auto', fontSize: '0.72rem' }}>{formatDate(entry.created_at)}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteOpen(entry)}
                      title="삭제"
                      sx={{ color: '#CBD5E1', '&:hover': { color: '#EF4444', background: 'rgba(239,68,68,0.06)' }, borderRadius: '8px', flexShrink: 0 }}
                    >
                      <DeleteIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, wordBreak: 'break-word' }}>{entry.message}</Typography>
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
        <DialogTitle sx={{ fontWeight: 800, color: '#0F172A', pb: 1 }}>방명록 삭제</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
            작성 시 입력한 비밀번호를 입력하면 삭제됩니다.
          </Typography>
          <TextField
            label="비밀번호" type="password" fullWidth size="small" autoFocus
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDeleteConfirm()}
            inputProps={{ 'data-gramm': 'false', spellCheck: false }}
          />
          {deleteError && <Alert severity="error" sx={{ mt: 1.5, borderRadius: '12px' }}>{deleteError}</Alert>}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={handleDeleteClose} sx={{ color: '#64748B', borderRadius: '10px' }}>취소</Button>
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
}

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
