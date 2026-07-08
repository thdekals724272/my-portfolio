import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// path: 라우트 경로 / sectionId: Home 페이지 안에서 스크롤할 대상 섹션 id
const NAV_LINKS = [
  { label: 'Home', path: '/', sectionId: 'home-hero' },
  { label: 'About Me', path: '/about', sectionId: 'home-about' },
  { label: 'Projects', path: '/projects', sectionId: 'home-projects-preview' },
  { label: 'Contact', path: '/', sectionId: 'home-contact' },
];

const SCROLL_HIDE_THRESHOLD = 80; // 이 지점까지는 항상 헤더 표시
const SCROLL_DELTA = 4; // 스크롤 흔들림(bounce) 무시용 최소 이동량

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home-hero');
  const lastScrollY = useRef(0);

  const isHome = location.pathname === '/';

  // 1) 스크롤 다운 시 헤더 숨김 / 스크롤 업 시 표시 + 2) 읽기 진행률
  // rAF로 스로틀링해 한 프레임에 한 번만 계산하도록 최적화
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);

      if (y < SCROLL_HIDE_THRESHOLD) {
        setHidden(false);
      } else if (y > lastScrollY.current + SCROLL_DELTA) {
        setHidden(true);
      } else if (y < lastScrollY.current - SCROLL_DELTA) {
        setHidden(false);
      }
      lastScrollY.current = y;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(handleScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Home 페이지에서만: IntersectionObserver로 현재 보고 있는 섹션 감지
  useEffect(() => {
    if (!isHome) return;

    const ids = ['home-hero', 'home-about', 'home-projects-preview', 'home-contact'];
    const targets = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveSection(topMost.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, location.pathname]);

  // 3) 메뉴 클릭 시 섹션으로 부드럽게 이동 (Home 페이지 안에 있을 때만 스크롤, 아니면 라우트 이동)
  const handleNavClick = useCallback((e, link) => {
    setDrawerOpen(false);

    if (isHome && link.path === '/') {
      e.preventDefault();
      if (link.sectionId === 'home-hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.getElementById(link.sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // 다른 페이지에서 Contact 클릭: Home으로 이동 후 Contact 섹션까지 스크롤
    if (!isHome && link.label === 'Contact') {
      e.preventDefault();
      navigate('/', { state: { scrollTo: 'home-contact' } });
    }
    // 그 외(Home 아님 + About Me/Projects)는 일반 라우트 이동(Link 기본 동작)에 맡김
  }, [isHome, navigate]);

  // 4) 현재 섹션/페이지에 맞는 메뉴 active 표시
  const isActive = (link) => (isHome ? activeSection === link.sectionId : location.pathname === link.path);

  return (
    <>
      {/* 페이지 읽기 진행률 바 — 헤더 숨김 여부와 무관하게 항상 표시 */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'fixed', top: 0, left: 0,
          width: `${progress}%`, height: 3,
          background: '#7A8F7B',
          transition: 'width 0.15s ease',
          zIndex: (t) => t.zIndex.appBar + 1,
        }}
      />

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, minHeight: '64px !important' }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            onClick={(e) => handleNavClick(e, NAV_LINKS[0])}
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, #7A8F7B, #D9A273)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
            }}
          >
            Portfolio
          </Typography>

          {isMobile ? (
            <>
              <IconButton onClick={() => setDrawerOpen(true)} aria-label="메뉴 열기" sx={{ color: '#2F2F2F' }}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                slotProps={{
                  paper: {
                    sx: {
                      width: 260,
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(20px)',
                      borderLeft: '1px solid rgba(122,143,123,0.1)',
                      pt: 2,
                    },
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
                  <IconButton onClick={() => setDrawerOpen(false)} aria-label="메뉴 닫기" sx={{ color: '#6B7280' }}>
                    <CloseIcon />
                  </IconButton>
                </Box>
                <List>
                  {NAV_LINKS.map((link) => {
                    const active = isActive(link);
                    return (
                      <ListItem key={link.label} disablePadding sx={{ px: 2, mb: 0.5 }}>
                        <ListItemButton
                          component={Link}
                          to={link.path}
                          onClick={(e) => handleNavClick(e, link)}
                          sx={{
                            borderRadius: '12px',
                            background: active ? 'linear-gradient(135deg, rgba(122,143,123,0.1), rgba(217,162,115,0.1))' : 'transparent',
                            '&:hover': { background: 'rgba(122,143,123,0.06)' },
                          }}
                        >
                          <ListItemText
                            primary={link.label}
                            slotProps={{
                              primary: {
                                sx: {
                                  fontWeight: active ? 700 : 500,
                                  color: active ? '#7A8F7B' : '#4B4842',
                                  fontSize: '0.95rem',
                                },
                              },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <Box
                    key={link.label}
                    component={Link}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link)}
                    sx={{
                      px: 2.5,
                      py: 1,
                      borderRadius: '10px',
                      fontSize: '0.9rem',
                      fontWeight: active ? 700 : 500,
                      color: active ? '#7A8F7B' : '#6B7280',
                      background: active ? 'rgba(122,143,123,0.08)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#7A8F7B',
                        background: 'rgba(122,143,123,0.06)',
                      },
                    }}
                  >
                    {link.label}
                  </Box>
                );
              })}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
