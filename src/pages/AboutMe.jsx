import { useState, useMemo, useRef, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { usePortfolio } from '../context/PortfolioContext';
import { ICON_EMOJI, ICON_OPTIONS, CATEGORIES, CATEGORY_META } from '../data/skillsData';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InterestsIcon from '@mui/icons-material/Interests';
import BuildIcon from '@mui/icons-material/Build';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';

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
    <Box ref={ref} sx={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </Box>
  );
}

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

// ─── Photo Upload ─────────────────────────────────────────────
function PhotoArea({ photo, onPhotoChange }) {
  const fileRef = useRef(null);
  return (
    <Box
      onClick={() => fileRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="프로필 사진 변경"
      onKeyDown={(e) => e.key === 'Enter' && fileRef.current?.click()}
      sx={{
        width: 120, height: 120, borderRadius: '50%', mx: 'auto', mb: 2.5,
        position: 'relative', cursor: 'pointer',
        background: photo ? 'transparent' : G,
        boxShadow: '0 12px 40px rgba(99,102,241,0.3)',
        border: '4px solid rgba(255,255,255,0.9)',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        '&:hover': { transform: 'scale(1.04)', boxShadow: '0 16px 48px rgba(99,102,241,0.4)' },
        '&:hover .photo-overlay': { opacity: 1 },
      }}
    >
      {photo
        ? <Box component="img" src={photo} alt="프로필" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>👤</Box>
      }
      <Box className="photo-overlay" sx={{ position: 'absolute', inset: 0, background: 'rgba(99,102,241,0.65)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.22s ease', gap: 0.5 }}>
        <CameraAltIcon sx={{ color: '#FFF', fontSize: 24 }} />
        <Typography variant="caption" sx={{ color: '#FFF', fontWeight: 700, fontSize: '0.65rem' }}>사진 변경</Typography>
      </Box>
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onPhotoChange} />
    </Box>
  );
}

// ─── BasicInfo Edit Dialog ────────────────────────────────────
function BasicInfoDialog({ open, onClose, info, onSave }) {
  const [form, setForm] = useState({ ...info });
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSave = () => { onSave(form); onClose(); };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 800, color: '#0F172A', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        프로필 수정
        <IconButton size="small" onClick={onClose} sx={{ color: '#94A3B8' }}><CloseIcon fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: '12px !important' }}>
        {[
          { key: 'name', label: '이름' },
          { key: 'position', label: '포지션' },
          { key: 'interest', label: '관심 분야' },
          { key: 'workflow', label: '작업 방식' },
          { key: 'experience', label: '경력' },
        ].map(({ key, label }) => (
          <TextField
            key={key} label={label} size="small" fullWidth
            value={form[key]} onChange={(e) => set(key, e.target.value)}
          />
        ))}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: '#64748B', borderRadius: '10px' }}>취소</Button>
        <Button variant="contained" onClick={handleSave} sx={{ background: G, borderRadius: '10px', fontWeight: 700, px: 3, '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' } }}>
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Skill Card ───────────────────────────────────────────────
const SkillCard = memo(function SkillCard({ skill, onEdit }) {
  const [ref, inView] = useInView();
  const meta = CATEGORY_META[skill.category] || CATEGORY_META['Frontend'];

  return (
    <Tooltip
      title={skill.description || ''}
      placement="top"
      arrow
      slotProps={{
        tooltip: { sx: { background: 'rgba(15,23,42,0.92)', backdropFilter: 'blur(10px)', borderRadius: '10px', fontSize: '0.78rem', lineHeight: 1.65, maxWidth: 210, py: 1, px: 1.5 } },
        arrow: { sx: { color: 'rgba(15,23,42,0.92)' } },
      }}
    >
      <Box
        ref={ref}
        sx={{
          ...GLASS, borderRadius: '20px', p: 2.5,
          display: 'flex', flexDirection: 'column', gap: 1.5,
          boxShadow: '0 2px 14px rgba(99,102,241,0.05)',
          cursor: 'default', position: 'relative',
          transition: 'all 0.28s ease',
          '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 16px 40px ${meta.color}26`, border: `1px solid ${meta.color}35` },
          '&:hover .skill-edit-btn, &:focus-within .skill-edit-btn': { opacity: 1 },
        }}
      >
        {/* Edit button — hover(데스크톱)/focus(키보드)로 표시, 터치 기기에서는 항상 표시 */}
        <IconButton
          className="skill-edit-btn"
          size="small"
          onClick={() => onEdit(skill)}
          aria-label={`${skill.name} 스킬 수정`}
          sx={{
            position: 'absolute', top: 10, right: 10,
            opacity: 0, transition: 'opacity 0.2s ease',
            color: '#6366F1', background: 'rgba(99,102,241,0.08)',
            '&:hover': { background: 'rgba(99,102,241,0.15)' },
            '&:focus-visible': { opacity: 1 },
            '@media (hover: none)': { opacity: 1 },
            width: 28, height: 28,
          }}
        >
          <EditIcon sx={{ fontSize: '0.85rem' }} />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ width: 44, height: 44, borderRadius: '13px', background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
            {ICON_EMOJI[skill.icon] || ICON_EMOJI.default}
          </Box>
          <Chip
            label={skill.category} size="small"
            sx={{ height: 20, fontSize: '0.62rem', fontWeight: 700, borderRadius: '7px', color: meta.color, background: meta.bg, border: `1px solid ${meta.color}25`, '& .MuiChip-label': { px: 1 } }}
          />
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '0.9rem' }}>{skill.name}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 700, color: meta.color, fontSize: '0.8rem' }}>{skill.level}%</Typography>
          </Box>
          <Box sx={{ height: 7, borderRadius: '999px', background: '#F1F5F9', overflow: 'hidden' }}>
            <Box sx={{ height: '100%', width: inView ? `${skill.level}%` : '0%', borderRadius: '999px', background: `linear-gradient(90deg, ${meta.color}BB, ${meta.color})`, transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.25s' }} />
          </Box>
        </Box>
      </Box>
    </Tooltip>
  );
});

// ─── Skill Edit Dialog ────────────────────────────────────────
function SkillEditDialog({ open, skill, onClose, onSave }) {
  const [form, setForm] = useState(skill || {});
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  if (!skill) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 800, color: '#0F172A', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        스킬 수정
        <IconButton size="small" onClick={onClose} sx={{ color: '#94A3B8' }}><CloseIcon fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '12px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, borderRadius: '14px', background: CATEGORY_META[form.category]?.bg || '#EEF2FF' }}>
          <Typography sx={{ fontSize: 28 }}>{ICON_EMOJI[form.icon] || '🔧'}</Typography>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>{form.name}</Typography>
            <Typography variant="caption" sx={{ color: '#64748B' }}>{form.category}</Typography>
          </Box>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.72rem', letterSpacing: 0.8, textTransform: 'uppercase' }}>숙련도</Typography>
            <Typography variant="caption" sx={{ color: '#6366F1', fontWeight: 800, fontSize: '0.85rem' }}>{form.level}%</Typography>
          </Box>
          <Slider
            value={form.level}
            onChange={(_, v) => set('level', v)}
            min={0} max={100} step={5}
            sx={{ color: '#6366F1', '& .MuiSlider-thumb': { width: 16, height: 16 } }}
          />
        </Box>

        <TextField
          label="한 줄 설명 (툴팁)" size="small" fullWidth
          value={form.description || ''} onChange={(e) => set('description', e.target.value)}
          slotProps={{ htmlInput: { maxLength: 80 } }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={!!form.showInHome}
              onChange={(e) => set('showInHome', e.target.checked)}
              sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366F1' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { background: '#6366F1' } }}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
              <HomeIcon sx={{ fontSize: 16, color: '#6366F1' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>홈 탭에 표시</Typography>
            </Box>
          }
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} sx={{ color: '#64748B', borderRadius: '10px' }}>취소</Button>
        <Button
          variant="contained"
          onClick={() => { onSave(form.id, { level: form.level, description: form.description, showInHome: form.showInHome }); onClose(); }}
          sx={{ background: G, borderRadius: '10px', fontWeight: 700, px: 3, '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' } }}
        >
          저장
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Add Skill Dialog ─────────────────────────────────────────
function AddSkillDialog({ open, onClose, onAdd }) {
  const EMPTY = { name: '', category: 'Frontend', level: 50, icon: 'code', description: '', showInHome: false };
  const [form, setForm] = useState(EMPTY);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleAdd = () => {
    if (!form.name.trim()) return;
    onAdd({ ...form, id: Date.now(), name: form.name.trim() });
    setForm(EMPTY);
  };
  const handleClose = () => { setForm(EMPTY); onClose(); };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 800, color: '#0F172A', pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        새 스킬 추가
        <IconButton size="small" onClick={handleClose} sx={{ color: '#94A3B8' }}><CloseIcon fontSize="small" /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '12px !important' }}>
        <Box>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.72rem', letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', mb: 1 }}>아이콘</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {ICON_OPTIONS.map((opt) => (
              <Box
                key={opt.key}
                role="button"
                tabIndex={0}
                aria-label={opt.label}
                aria-pressed={form.icon === opt.key}
                onClick={() => set('icon', opt.key)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); set('icon', opt.key); } }}
                title={opt.label}
                sx={{ width: 38, height: 38, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, cursor: 'pointer', userSelect: 'none', border: form.icon === opt.key ? '2px solid #6366F1' : '2px solid rgba(99,102,241,0.12)', background: form.icon === opt.key ? 'rgba(99,102,241,0.08)' : 'rgba(248,250,255,0.8)', transition: 'all 0.18s ease', '&:hover': { borderColor: '#6366F1', background: 'rgba(99,102,241,0.06)' }, '&:focus-visible': { outline: '2px solid #6366F1', outlineOffset: 2 } }}>
                {ICON_EMOJI[opt.key]}
              </Box>
            ))}
          </Box>
        </Box>
        <TextField label="기술명 *" size="small" value={form.name} onChange={(e) => set('name', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAdd()} slotProps={{ htmlInput: { maxLength: 30 } }} fullWidth />
        <FormControl size="small" fullWidth>
          <InputLabel>카테고리</InputLabel>
          <Select label="카테고리" value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: CATEGORY_META[c]?.color || '#6366F1' }} />
                  {c}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700, fontSize: '0.72rem', letterSpacing: 0.8, textTransform: 'uppercase' }}>숙련도</Typography>
            <Typography variant="caption" sx={{ color: '#6366F1', fontWeight: 800, fontSize: '0.85rem' }}>{form.level}%</Typography>
          </Box>
          <Slider value={form.level} onChange={(_, v) => set('level', v)} min={0} max={100} step={5} sx={{ color: '#6366F1', '& .MuiSlider-thumb': { width: 16, height: 16 } }} />
        </Box>
        <TextField label="한 줄 설명 (툴팁)" size="small" value={form.description} onChange={(e) => set('description', e.target.value)} slotProps={{ htmlInput: { maxLength: 80 } }} fullWidth />
        <FormControlLabel
          control={<Switch checked={form.showInHome} onChange={(e) => set('showInHome', e.target.checked)} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#6366F1' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { background: '#6366F1' } }} />}
          label={<Typography variant="body2" sx={{ fontWeight: 600, color: '#475569', fontSize: '0.85rem' }}>홈 탭에 표시</Typography>}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={handleClose} sx={{ color: '#64748B', borderRadius: '10px' }}>취소</Button>
        <Button variant="contained" onClick={handleAdd} disabled={!form.name.trim()} sx={{ background: G, borderRadius: '10px', fontWeight: 700, px: 3, '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' }, '&:disabled': { background: '#E2E8F0', color: '#94A3B8' } }}>
          추가하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ─── Skills Section ───────────────────────────────────────────
function SkillsSection({ onSaved }) {
  const { aboutMeData, updateSkill, addSkill } = usePortfolio();
  const skills = aboutMeData.skills;

  const [activeCategory, setActiveCategory] = useState('전체');
  const [addOpen, setAddOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const handleEditSkill = useCallback((skill) => setEditingSkill(skill), []);
  const handleCloseEdit = useCallback(() => setEditingSkill(null), []);
  const handleSaveEdit = useCallback((id, changes) => { updateSkill(id, changes); setEditingSkill(null); onSaved?.('스킬 정보가 저장되었습니다.'); }, [updateSkill, onSaved]);
  const handleAddSkill = useCallback((newSkill) => { addSkill(newSkill); setAddOpen(false); onSaved?.(`'${newSkill.name}' 스킬이 추가되었습니다.`); }, [addSkill, onSaved]);

  const categories = useMemo(() => {
    const cats = [...new Set(skills.map((s) => s.category))];
    return ['전체', ...cats];
  }, [skills]);

  const filtered = useMemo(() => {
    const list = activeCategory === '전체' ? skills : skills.filter((s) => s.category === activeCategory);
    return [...list].sort((a, b) => b.level - a.level);
  }, [skills, activeCategory]);

  return (
    <Box component="section" sx={{ background: '#F8FAFF', py: { xs: 7, md: 11 } }}>
      <Container maxWidth="lg">
        <FadeIn>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box sx={sectionLabel}>Skills</Box>
            <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.1rem' }, letterSpacing: '-0.02em', mb: 1 }}>기술 스택</Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>카드에 마우스를 올리거나 포커스하면 설명과 수정 버튼을 볼 수 있어요.</Typography>
          </Box>
        </FadeIn>

        {/* Category filter */}
        <FadeIn delay={80}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', mb: 5 }}>
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat];
              const active = activeCategory === cat;
              return (
                <Box
                  key={cat}
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  onClick={() => setActiveCategory(cat)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveCategory(cat); } }}
                  sx={{ px: 2.5, py: 0.8, borderRadius: '999px', cursor: 'pointer', userSelect: 'none', fontSize: '0.82rem', fontWeight: active ? 700 : 500, border: active ? `1.5px solid ${meta?.color || '#6366F1'}` : '1.5px solid rgba(99,102,241,0.15)', background: active ? (meta?.bg || 'rgba(99,102,241,0.1)') : 'rgba(255,255,255,0.7)', color: active ? (meta?.color || '#6366F1') : '#64748B', backdropFilter: 'blur(8px)', transition: 'all 0.2s ease', '&:hover': { borderColor: meta?.color || '#6366F1', color: meta?.color || '#6366F1', background: meta?.bg || 'rgba(99,102,241,0.06)' }, '&:focus-visible': { outline: '2px solid #6366F1', outlineOffset: 2 } }}>
                  {cat}
                </Box>
              );
            })}
          </Box>
        </FadeIn>

        {/* Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 2.5, mb: 5 }}>
          {filtered.map((skill, i) => (
            <FadeIn key={skill.id} delay={i * 60}>
              <SkillCard skill={skill} onEdit={handleEditSkill} />
            </FadeIn>
          ))}
        </Box>

        {/* Add button */}
        <FadeIn delay={200}>
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}
              sx={{ borderColor: 'rgba(99,102,241,0.3)', color: '#6366F1', fontWeight: 700, px: 4, py: 1.1, borderRadius: '14px', fontSize: '0.88rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', '&:hover': { background: 'rgba(99,102,241,0.06)', borderColor: '#6366F1', transform: 'translateY(-2px)' }, transition: 'all 0.25s ease' }}>
              스킬 추가
            </Button>
          </Box>
        </FadeIn>
      </Container>

      <SkillEditDialog
        key={editingSkill?.id ?? 'none'}
        open={!!editingSkill}
        skill={editingSkill}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
      />
      <AddSkillDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAddSkill} />
    </Box>
  );
}

// ─── Main Page ────────────────────────────────────────────────
function AboutMe() {
  const { aboutMeData, updateBasicInfo, updateSection } = usePortfolio();
  const { basicInfo, sections } = aboutMeData;

  const [expanded, setExpanded] = useState('service-story');
  const [basicInfoOpen, setBasicInfoOpen] = useState(false);
  // per-section content editing
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingContent, setEditingContent] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = useCallback((message, severity = 'success') => {
    setToast({ open: true, message, severity });
  }, []);
  const closeToast = useCallback(() => setToast((t) => ({ ...t, open: false })), []);

  const MAX_PHOTO_MB = 3;
  const handlePhotoChange = useCallback((e) => {
    const file = e.target.files[0];
    e.target.value = ''; // 같은 파일 재선택 시에도 change가 발생하도록 초기화
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('이미지 파일만 업로드할 수 있어요.', 'error');
      return;
    }
    if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
      showToast(`이미지 용량은 ${MAX_PHOTO_MB}MB 이하만 가능해요.`, 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      updateBasicInfo({ photo: ev.target.result });
      showToast('프로필 사진이 변경되었습니다.');
    };
    reader.onerror = () => showToast('사진을 불러오는 중 오류가 발생했어요. 다시 시도해주세요.', 'error');
    reader.readAsDataURL(file);
  }, [updateBasicInfo, showToast]);

  const startContentEdit = useCallback((section) => {
    setEditingSectionId(section.id);
    setEditingContent(section.content);
  }, []);

  const saveContentEdit = useCallback((id) => {
    updateSection(id, { content: editingContent });
    setEditingSectionId(null);
    showToast('내용이 저장되었습니다.');
  }, [updateSection, editingContent, showToast]);

  return (
    <Box component="main" sx={{ background: '#F8FAFF', minHeight: 'calc(100vh - 64px)' }}>

      {/* ── Hero / Profile ── */}
      <Box sx={{ position: 'relative', background: 'linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 55%, #F3E8FF 100%)', py: { xs: 8, md: 12 }, overflow: 'hidden' }}>
        {[
          { size: 480, color: 'rgba(99,102,241,0.13)', top: -160, right: -70 },
          { size: 320, color: 'rgba(139,92,246,0.09)', bottom: -60, left: -50 },
        ].map((orb, i) => (
          <Box key={i} sx={{ position: 'absolute', width: orb.size, height: orb.size, borderRadius: '50%', background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, top: orb.top, right: orb.right, bottom: orb.bottom, left: orb.left, pointerEvents: 'none' }} />
        ))}

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 6 }, alignItems: { xs: 'center', md: 'flex-start' } }}>

            {/* Photo */}
            <Box sx={{ textAlign: 'center', flexShrink: 0, minWidth: 200 }}>
              <PhotoArea photo={basicInfo.photo} onPhotoChange={handlePhotoChange} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.7, letterSpacing: '-0.02em' }}>{basicInfo.name}</Typography>
              <Box sx={{ display: 'inline-block', px: 2.5, py: 0.7, borderRadius: '999px', background: G, color: '#FFF', fontSize: '0.78rem', fontWeight: 700, boxShadow: '0 4px 16px rgba(99,102,241,0.3)', mb: 2.5 }}>
                {basicInfo.position}
              </Box>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <IconButton href="mailto:thdekals724272@gmail.com" aria-label="이메일 보내기" size="small" sx={{ color: '#6366F1', background: 'rgba(99,102,241,0.08)', '&:hover': { background: 'rgba(99,102,241,0.15)' }, borderRadius: '10px' }}>
                  <EmailIcon fontSize="small" />
                </IconButton>
                <IconButton href="https://github.com/thdekals724272" target="_blank" rel="noopener noreferrer" aria-label="GitHub 프로필 보기" size="small" sx={{ color: '#0F172A', background: 'rgba(15,23,42,0.06)', '&:hover': { background: 'rgba(15,23,42,0.12)' }, borderRadius: '10px' }}>
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Info card */}
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={{ ...GLASS, borderRadius: '24px', p: { xs: 3, md: 4 }, boxShadow: '0 4px 28px rgba(99,102,241,0.08)', position: 'relative' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box sx={sectionLabel}>기본 정보</Box>
                  <Tooltip title="프로필 수정" placement="top">
                    <IconButton size="small" onClick={() => setBasicInfoOpen(true)} aria-label="프로필 기본 정보 수정" sx={{ color: '#6366F1', background: 'rgba(99,102,241,0.08)', '&:hover': { background: 'rgba(99,102,241,0.15)' }, borderRadius: '10px' }}>
                      <SettingsIcon sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <InfoRow icon={<InterestsIcon sx={{ fontSize: 18 }} />} label="관심 분야" value={basicInfo.interest} />
                <InfoRow icon={<BuildIcon sx={{ fontSize: 18 }} />} label="작업 방식" value={basicInfo.workflow} />
                <InfoRow icon={<WorkHistoryIcon sx={{ fontSize: 18 }} />} label="경력" value={basicInfo.experience} />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {['React', 'Supabase', 'MUI', 'Vite', 'GitHub', 'Claude AI'].map((tag) => (
                  <Box key={tag} sx={{ px: 2, py: 0.55, borderRadius: '999px', fontSize: '0.76rem', fontWeight: 600, background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(99,102,241,0.15)', color: '#64748B', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Story Sections ── */}
      <Box sx={{ backgroundColor: '#FFFFFF', py: { xs: 7, md: 11 } }}>
        <Container maxWidth="md">
          <FadeIn>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box sx={sectionLabel}>Story</Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.8rem', md: '2.1rem' }, letterSpacing: '-0.02em' }}>나의 이야기</Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mt: 1.5 }}>항목을 클릭하고 ✏️ 버튼으로 내용을 편집할 수 있어요.</Typography>
            </Box>
          </FadeIn>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {sections.map((section, i) => (
              <FadeIn key={section.id} delay={i * 80}>
                <Accordion
                  expanded={expanded === section.id}
                  onChange={(_, isExpanded) => setExpanded(isExpanded ? section.id : false)}
                  disableGutters elevation={0}
                  sx={{
                    ...GLASS, borderRadius: '18px !important',
                    boxShadow: expanded === section.id ? '0 8px 32px rgba(99,102,241,0.13)' : '0 2px 12px rgba(99,102,241,0.05)',
                    transition: 'box-shadow 0.3s ease',
                    '&:before': { display: 'none' }, overflow: 'hidden',
                    border: expanded === section.id ? '1px solid rgba(99,102,241,0.25) !important' : '1px solid rgba(255,255,255,0.65) !important',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: expanded === section.id ? '#6366F1' : '#94A3B8', transition: 'color 0.2s ease' }} />}
                    sx={{ px: 3, py: 0.5, '& .MuiAccordionSummary-content': { my: 1.8 }, '&:hover': { background: 'rgba(99,102,241,0.03)' } }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
                      <Box sx={{ width: 42, height: 42, borderRadius: '13px', flexShrink: 0, background: expanded === section.id ? G : 'linear-gradient(135deg, #EEF2FF, #F3E8FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, boxShadow: expanded === section.id ? '0 4px 14px rgba(99,102,241,0.3)' : 'none', transition: 'all 0.25s ease' }}>
                        {section.emoji}
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', letterSpacing: '-0.01em', flex: 1, minWidth: 0 }}>
                        {section.title}
                      </Typography>
                      {/* showInHome toggle */}
                      <Tooltip title={section.showInHome ? '홈 탭 노출 중 (클릭하여 숨기기)' : '홈 탭 숨김 (클릭하여 표시)'} placement="top">
                        <Box
                          role="button"
                          tabIndex={0}
                          aria-label={`${section.title} 홈 탭 ${section.showInHome ? '숨기기' : '표시하기'}`}
                          aria-pressed={section.showInHome}
                          onClick={(e) => { e.stopPropagation(); updateSection(section.id, { showInHome: !section.showInHome }); }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); e.preventDefault(); updateSection(section.id, { showInHome: !section.showInHome }); } }}
                          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1.2, py: 0.4, borderRadius: '10px', cursor: 'pointer', flexShrink: 0, background: section.showInHome ? 'rgba(99,102,241,0.08)' : 'rgba(148,163,184,0.08)', border: section.showInHome ? '1px solid rgba(99,102,241,0.2)' : '1px solid rgba(148,163,184,0.2)', transition: 'all 0.2s ease', '&:hover': { background: section.showInHome ? 'rgba(99,102,241,0.15)' : 'rgba(148,163,184,0.15)' } }}
                        >
                          <HomeIcon sx={{ fontSize: 13, color: section.showInHome ? '#6366F1' : '#94A3B8' }} />
                          <Typography variant="caption" sx={{ fontSize: '0.63rem', fontWeight: 700, color: section.showInHome ? '#6366F1' : '#94A3B8', letterSpacing: 0.3 }}>
                            {section.showInHome ? '홈 노출' : '숨김'}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  </AccordionSummary>

                  <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                    <Box sx={{ pl: 7 }}>
                      {editingSectionId === section.id ? (
                        // Edit mode
                        <Box>
                          <TextField
                            multiline fullWidth minRows={3}
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            sx={{ mb: 1.5 }}
                            slotProps={{ htmlInput: { maxLength: 500 } }}
                            autoFocus
                          />
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button size="small" variant="contained" startIcon={<CheckIcon />} onClick={() => saveContentEdit(section.id)}
                              sx={{ background: G, borderRadius: '10px', fontWeight: 700, fontSize: '0.78rem', '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)' } }}>
                              저장
                            </Button>
                            <Button size="small" onClick={() => setEditingSectionId(null)} sx={{ color: '#64748B', borderRadius: '10px', fontSize: '0.78rem' }}>
                              취소
                            </Button>
                          </Box>
                        </Box>
                      ) : (
                        // View mode
                        <Box sx={{ position: 'relative', borderLeft: '3px solid #6366F1', pl: 2 }}>
                          <Typography variant="body1" sx={{ color: '#475569', lineHeight: 2, fontSize: '0.93rem', pr: 4 }}>
                            {section.content}
                          </Typography>
                          <Tooltip title="내용 편집" placement="top">
                            <IconButton
                              size="small"
                              onClick={() => startContentEdit(section)}
                              aria-label={`${section.title} 내용 편집`}
                              sx={{ position: 'absolute', top: 0, right: 0, color: '#CBD5E1', '&:hover': { color: '#6366F1', background: 'rgba(99,102,241,0.08)' }, borderRadius: '8px' }}
                            >
                              <EditIcon sx={{ fontSize: '0.9rem' }} />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </FadeIn>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── Skills ── */}
      <SkillsSection onSaved={showToast} />

      {/* ── CTA ── */}
      <Box sx={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #F3E8FF 100%)', py: { xs: 8, md: 11 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />
        <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
          <FadeIn>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#0F172A', mb: 1.5, letterSpacing: '-0.02em' }}>함께 만들고 싶은 게 있으신가요?</Typography>
            <Typography variant="body1" sx={{ color: '#64748B', mb: 4, lineHeight: 1.8 }}>아이디어를 서비스로 만들고 싶다면 언제든 연락해주세요.</Typography>
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="contained" size="large" component={Link} to="/"
                sx={{ background: G, fontWeight: 700, borderRadius: '14px', px: 4, py: 1.4, boxShadow: '0 8px 24px rgba(99,102,241,0.3)', '&:hover': { background: 'linear-gradient(135deg,#4F46E5,#7C3AED)', transform: 'translateY(-2px)' }, transition: 'all 0.25s ease' }}>
                연락하기
              </Button>
              <Button variant="outlined" size="large" component={Link} to="/projects"
                sx={{ borderColor: 'rgba(99,102,241,0.3)', color: '#6366F1', fontWeight: 700, borderRadius: '14px', px: 4, py: 1.4, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', '&:hover': { background: 'rgba(99,102,241,0.06)', borderColor: '#6366F1', transform: 'translateY(-2px)' }, transition: 'all 0.25s ease' }}>
                Projects 보기
              </Button>
            </Box>
          </FadeIn>
        </Container>
      </Box>

      {/* BasicInfo Edit Dialog */}
      <BasicInfoDialog
        open={basicInfoOpen}
        onClose={() => setBasicInfoOpen(false)}
        info={basicInfo}
        onSave={(form) => { updateBasicInfo(form); showToast('프로필 정보가 저장되었습니다.'); }}
      />

      <Snackbar open={toast.open} autoHideDuration={2500} onClose={closeToast} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={toast.severity} onClose={closeToast} sx={{ borderRadius: '12px' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AboutMe;
