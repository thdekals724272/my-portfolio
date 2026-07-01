import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
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
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { supabase } from '../lib/supabase';

const EMOJIS = ['👋', '😊', '🚀', '💼', '🌏', '🤝', '✨', '💡', '🎯', '❤️'];

const REGIONS = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '해외'];

function FadeIn({ children, delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView();
  const translate = direction === 'up' ? 'translateY(28px)' : 'translateY(-12px)';
  return (
    <Box
      ref={ref}
      sx={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : translate,
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
}

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
        <FadeIn>
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
        </FadeIn>
      </Container>
    </Box>
  );
}

/* ─── Skill Tree 섹션 ─── */
function SkillSection() {
  return (
    <Box component="section" sx={{ backgroundColor: '#F4F4F4', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <FadeIn>
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
        </FadeIn>
      </Container>
    </Box>
  );
}

const TECH_COLORS = {
  React: '#61DAFB',
  Supabase: '#3ECF8E',
  PostgreSQL: '#336791',
  MUI: '#007FFF',
  CSS3: '#1572B6',
  Recharts: '#FF7300',
};

/* ─── Projects 섹션 ─── */
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
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <FadeIn>
          <Box sx={sectionLabel}>Projects</Box>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: '#222222' }}>
            대표 프로젝트
          </Typography>
        </FadeIn>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#002C5F' }} />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(2, 1fr)' },
              gap: 2.5,
              mb: 5,
            }}
          >
            {projects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 120}>
                <Box
                  sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 3,
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 12px 32px rgba(0,44,95,0.15)',
                    },
                  }}
                >
                  {/* 썸네일 */}
                  <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#F1F5F9', overflow: 'hidden' }}>
                    {!imgErrors[project.id] && project.thumbnail_url ? (
                      <>
                        {!imgLoaded[project.id] && (
                          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress size={24} sx={{ color: '#002C5F' }} />
                          </Box>
                        )}
                        <Box
                          component="img"
                          src={project.thumbnail_url}
                          alt={project.title}
                          onLoad={() => setImgLoaded((prev) => ({ ...prev, [project.id]: true }))}
                          onError={() => setImgErrors((prev) => ({ ...prev, [project.id]: true }))}
                          sx={{
                            width: '100%', height: '100%', objectFit: 'cover',
                            display: imgLoaded[project.id] ? 'block' : 'none',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.04)' },
                          }}
                        />
                      </>
                    ) : (
                      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#002C5F' }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: 2, backgroundColor: '#00AAD2', opacity: 0.7 }} />
                      </Box>
                    )}
                  </Box>

                  {/* 카드 내용 */}
                  <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'left' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6, mb: 1.5, flex: 1, fontSize: '0.82rem' }}>
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mb: 2 }}>
                      {project.tech_stack.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            fontSize: '0.65rem', fontWeight: 600, height: 20,
                            backgroundColor: `${TECH_COLORS[tech] || '#94A3B8'}18`,
                            color: TECH_COLORS[tech] || '#64748B',
                            border: `1px solid ${TECH_COLORS[tech] || '#94A3B8'}40`,
                            borderRadius: 1,
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
                          sx={{
                            flex: 1, backgroundColor: '#002C5F', fontWeight: 700,
                            fontSize: '0.72rem', borderRadius: 1.5, py: 0.6,
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
                        sx={{
                          flex: 1, borderColor: '#E2E8F0', color: '#475569',
                          fontWeight: 700, fontSize: '0.72rem', borderRadius: 1.5, py: 0.6,
                          '&:hover': { borderColor: '#002C5F', color: '#002C5F' },
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

        <FadeIn delay={360}>
          <Button
            variant="outlined"
            component={Link}
            to="/projects"
            sx={{
              borderColor: '#002C5F', color: '#002C5F', fontWeight: 700, px: 4,
              '&:hover': { backgroundColor: '#002C5F', color: '#FFFFFF' },
            }}
          >
            더 보기
          </Button>
        </FadeIn>
      </Container>
    </Box>
  );
}

/* ─── Contact 섹션 ─── */
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

  useEffect(() => {
    fetchGuestbook();
  }, []);

  const fetchGuestbook = async () => {
    setLoadingGuests(true);
    const { data } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
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
      name: form.name.trim(),
      message: form.message.trim(),
      company: form.company.trim() || null,
      region: form.region || null,
      emoji: form.emoji,
      password: form.password.trim() || null,
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
      await supabase.rpc('delete_guestbook_entry', {
        entry_id: entry.id,
        entry_password: '',
      });
      setGuestbook((prev) => prev.filter((e) => e.id !== entry.id));
      setDeleting(false);
      return;
    }
    setDeleteTarget(entry.id);
    setDeletePassword('');
    setDeleteError('');
  };

  const handleDeleteClose = () => {
    setDeleteTarget(null);
    setDeletePassword('');
    setDeleteError('');
  };

  const handleDeleteConfirm = async () => {
    if (!deletePassword.trim()) return;
    setDeleting(true);
    setDeleteError('');
    const { data, error } = await supabase.rpc('delete_guestbook_entry', {
      entry_id: deleteTarget,
      entry_password: deletePassword,
    });
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

  return (
    <Box component="section" sx={{ backgroundColor: '#F8FAFC', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">

        {/* 섹션 헤더 */}
        <FadeIn>
        <Box sx={{ textAlign: 'center', mb: 7 }}>
          <Box sx={sectionLabel}>Contact</Box>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#0F172A', mb: 1.5 }}>
            연락하기
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', lineHeight: 1.8 }}>
            언제든지 편하게 연락해주세요. 빠르게 답변드리겠습니다.
          </Typography>
        </Box>
        </FadeIn>

        {/* 연락처 카드 */}
        <FadeIn delay={100}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          {/* 이메일 카드 */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 3,
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
          >
            <Box
              sx={{
                width: 48, height: 48, borderRadius: 2,
                backgroundColor: '#EFF6FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >
              <EmailIcon sx={{ color: '#002C5F', fontSize: 24 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
                Email
              </Typography>
              <Typography variant="body2" sx={{ color: '#1E293B', fontWeight: 600, mt: 0.3, wordBreak: 'break-all' }}>
                {EMAIL}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={handleCopyEmail}
              sx={{ color: copied ? '#22C55E' : '#94A3B8', flexShrink: 0 }}
            >
              {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
            </IconButton>
          </Box>

          {/* WhatsApp 카드 */}
          <Box
            component="a"
            href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              flex: 1,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 3,
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              textDecoration: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              '&:hover': {
                borderColor: '#25D366',
                boxShadow: '0 4px 16px rgba(37,211,102,0.15)',
              },
            }}
          >
            <Box
              sx={{
                width: 48, height: 48, borderRadius: 2,
                backgroundColor: '#F0FDF4',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
            >
              <WhatsAppIcon sx={{ color: '#25D366', fontSize: 24 }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>
                WhatsApp
              </Typography>
              <Typography variant="body2" sx={{ color: '#1E293B', fontWeight: 600, mt: 0.3 }}>
                {WHATSAPP}
              </Typography>
            </Box>
          </Box>
        </Box>

        </FadeIn>

        {/* SNS 아이콘 링크 */}
        <FadeIn delay={200}>
        <Box sx={{ display: 'flex', gap: 1, mb: 7, justifyContent: 'center' }}>
          {[
            { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/thdekals724272', color: '#1A1A1A' },
            { icon: <LinkedInIcon />, label: 'LinkedIn', href: '#', color: '#0A66C2' },
            { icon: <InstagramIcon />, label: 'Instagram', href: '#', color: '#E1306C' },
          ].map(({ icon, label, href, color }) => (
            <Box
              key={label}
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              sx={{
                width: 40, height: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 2,
                border: '1px solid #E2E8F0',
                color: '#94A3B8',
                textDecoration: 'none',
                transition: 'all 0.2s',
                '&:hover': { color, borderColor: color, backgroundColor: `${color}10` },
              }}
            >
              {icon}
            </Box>
          ))}
        </Box>

        </FadeIn>

        <Divider sx={{ mb: 7, borderColor: '#E2E8F0' }} />

        {/* 방명록 섹션 */}
        <FadeIn>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0F172A', mb: 1 }}>
            방명록
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            방문해주셔서 감사합니다. 짧은 메시지를 남겨주세요 😊
          </Typography>
        </Box>
        </FadeIn>

        {/* 방명록 작성 폼 */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            mb: 5,
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          {/* 이모지 선택 */}
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600, mb: 1.5 }}>
            이모지 선택
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {EMOJIS.map((emoji) => (
              <Box
                key={emoji}
                onClick={() => setForm({ ...form, emoji })}
                sx={{
                  width: 40, height: 40,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, borderRadius: 2, cursor: 'pointer',
                  border: form.emoji === emoji ? '2px solid #002C5F' : '2px solid #E2E8F0',
                  backgroundColor: form.emoji === emoji ? '#EFF6FF' : 'transparent',
                  transition: 'all 0.15s',
                  userSelect: 'none',
                  '&:hover': { borderColor: '#002C5F', backgroundColor: '#EFF6FF' },
                }}
              >
                {emoji}
              </Box>
            ))}
          </Box>

          {/* 이름 + 소속 */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              label="이름 *"
              size="small"
              fullWidth
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              inputProps={{ 'data-gramm': 'false', spellCheck: false, maxLength: 20 }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="소속 / 직업 (선택)"
              size="small"
              fullWidth
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              inputProps={{ 'data-gramm': 'false', spellCheck: false, maxLength: 30 }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Box>

          {/* 거주 지역 */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600, mb: 1 }}>
              거주 지역 (선택)
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
              {REGIONS.map((r) => (
                <Box
                  key={r}
                  onClick={() => setForm({ ...form, region: form.region === r ? '' : r })}
                  sx={{
                    px: 1.5, py: 0.5,
                    borderRadius: 5,
                    border: form.region === r ? '1.5px solid #002C5F' : '1.5px solid #E2E8F0',
                    backgroundColor: form.region === r ? '#002C5F' : 'transparent',
                    color: form.region === r ? '#FFFFFF' : '#64748B',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.15s',
                    '&:hover': { borderColor: '#002C5F', color: form.region === r ? '#FFFFFF' : '#002C5F' },
                  }}
                >
                  {r}
                </Box>
              ))}
            </Box>
          </Box>

          {/* 메시지 */}
          <TextField
            label="메시지 *"
            multiline
            rows={3}
            fullWidth
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            inputProps={{ 'data-gramm': 'false', spellCheck: false, maxLength: 300 }}
            sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            placeholder="짧은 인사나 메시지를 남겨주세요."
          />

          {/* 삭제 비밀번호 */}
          <TextField
            label="삭제 비밀번호 (선택)"
            type="password"
            size="small"
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            inputProps={{ 'data-gramm': 'false', spellCheck: false, maxLength: 50 }}
            helperText="비밀번호를 설정하면 나중에 내 글을 직접 삭제할 수 있어요."
            sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          {submitError && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{submitError}</Alert>}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || !form.name.trim() || !form.message.trim()}
              endIcon={submitting ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <SendIcon />}
              sx={{
                backgroundColor: '#002C5F',
                borderRadius: 2,
                px: 4,
                fontWeight: 700,
                '&:hover': { backgroundColor: '#00AAD2' },
              }}
            >
              {submitting ? '등록 중...' : '방명록 남기기'}
            </Button>
          </Box>
        </Box>

        {/* 방명록 목록 */}
        {loadingGuests ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress sx={{ color: '#002C5F' }} />
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
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 3,
                  p: 3,
                  display: 'flex',
                  gap: 2,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* 이모지 아바타 */}
                <Box
                  sx={{
                    width: 44, height: 44, borderRadius: 2,
                    backgroundColor: '#EFF6FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}
                >
                  {entry.emoji || '👋'}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B' }}>
                      {entry.name}
                    </Typography>
                    {entry.company && (
                      <Typography variant="caption" sx={{ color: '#FFFFFF', backgroundColor: '#002C5F', px: 1, py: 0.2, borderRadius: 1, fontSize: '0.7rem', fontWeight: 600 }}>
                        {entry.company}
                      </Typography>
                    )}
                    {entry.region && (
                      <Typography variant="caption" sx={{ color: '#64748B', backgroundColor: '#F1F5F9', px: 1, py: 0.2, borderRadius: 1, fontSize: '0.7rem' }}>
                        📍 {entry.region}
                      </Typography>
                    )}
                    <Typography variant="caption" sx={{ color: '#CBD5E1', ml: 'auto' }}>
                      {formatDate(entry.created_at)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteOpen(entry)}
                      title="삭제"
                      sx={{ color: '#CBD5E1', '&:hover': { color: '#EF4444' }, flexShrink: 0 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#475569', lineHeight: 1.7, wordBreak: 'break-word' }}>
                    {entry.message}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      {/* 성공 알림 */}
      <Snackbar open={submitSuccess} autoHideDuration={3000} onClose={() => setSubmitSuccess(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSubmitSuccess(false)} sx={{ borderRadius: 2 }}>
          방명록이 등록되었습니다! 감사합니다 😊
        </Alert>
      </Snackbar>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={deleteTarget !== null} onClose={handleDeleteClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: '#0F172A' }}>방명록 삭제</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
            작성 시 입력한 비밀번호를 입력하면 삭제됩니다.
          </Typography>
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            size="small"
            autoFocus
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleDeleteConfirm()}
            inputProps={{ 'data-gramm': 'false', spellCheck: false }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          {deleteError && (
            <Alert severity="error" sx={{ mt: 1.5, borderRadius: 2 }}>{deleteError}</Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
          <Button onClick={handleDeleteClose} sx={{ color: '#64748B' }}>
            취소
          </Button>
          <Button
            variant="contained"
            onClick={handleDeleteConfirm}
            disabled={deleting || !deletePassword.trim()}
            sx={{ backgroundColor: '#EF4444', '&:hover': { backgroundColor: '#DC2626' }, borderRadius: 2 }}
          >
            {deleting ? '삭제 중...' : '삭제'}
          </Button>
        </DialogActions>
      </Dialog>
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
