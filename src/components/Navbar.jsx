import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
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
    <AppBar position="sticky" elevation={2}>
      <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: '#FFFFFF',
            textDecoration: 'none',
            letterSpacing: 1,
          }}
        >
          MY PORTFOLIO
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Box sx={{ width: 220, pt: 2 }}>
                <List>
                  {NAV_LINKS.map(({ label, path }) => (
                    <ListItem key={path} disablePadding>
                      <ListItemButton
                        component={Link}
                        to={path}
                        selected={location.pathname === path}
                        onClick={() => setDrawerOpen(false)}
                        sx={{
                          '&.Mui-selected': {
                            borderLeft: '4px solid #00AAD2',
                            color: '#002C5F',
                            fontWeight: 700,
                          },
                        }}
                      >
                        <ListItemText primary={label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {NAV_LINKS.map(({ label, path }) => (
              <Button
                key={path}
                component={Link}
                to={path}
                sx={{
                  color: '#FFFFFF',
                  fontWeight: location.pathname === path ? 700 : 400,
                  borderBottom: location.pathname === path ? '2px solid #00AAD2' : '2px solid transparent',
                  borderRadius: 0,
                  px: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: '#00AAD2',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
