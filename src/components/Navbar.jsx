import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Me', path: '/about' },
  { label: 'Projects', path: '/projects' },
];

function Navbar() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 }, minHeight: '64px !important' }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
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
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#0F172A' }}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  width: 260,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(20px)',
                  borderLeft: '1px solid rgba(99,102,241,0.1)',
                  pt: 2,
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
                <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#64748B' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <List>
                {NAV_LINKS.map(({ label, path }) => {
                  const active = location.pathname === path;
                  return (
                    <ListItem key={path} disablePadding sx={{ px: 2, mb: 0.5 }}>
                      <ListItemButton
                        component={Link}
                        to={path}
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          borderRadius: '12px',
                          background: active ? 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))' : 'transparent',
                          '&:hover': { background: 'rgba(99,102,241,0.06)' },
                        }}
                      >
                        <ListItemText
                          primary={label}
                          primaryTypographyProps={{
                            fontWeight: active ? 700 : 500,
                            color: active ? '#6366F1' : '#475569',
                            fontSize: '0.95rem',
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
            {NAV_LINKS.map(({ label, path }) => {
              const active = location.pathname === path;
              return (
                <Box
                  key={path}
                  component={Link}
                  to={path}
                  sx={{
                    px: 2.5,
                    py: 1,
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#6366F1' : '#64748B',
                    background: active ? 'rgba(99,102,241,0.08)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#6366F1',
                      background: 'rgba(99,102,241,0.06)',
                    },
                  }}
                >
                  {label}
                </Box>
              );
            })}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
