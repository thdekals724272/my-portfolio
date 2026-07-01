import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#6366F1', light: '#818CF8', dark: '#4F46E5', contrastText: '#FFFFFF' },
    secondary: { main: '#8B5CF6', contrastText: '#FFFFFF' },
    info: { main: '#06B6D4' },
    background: { default: '#F8FAFF', paper: '#FFFFFF' },
    text: { primary: '#0F172A', secondary: '#64748B', disabled: '#94A3B8' },
    divider: '#E2E8F0',
  },
  typography: {
    fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.8 },
    body2: { lineHeight: 1.7 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: '12px',
          fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(99,102,241,0.08)',
          color: '#0F172A',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366F1' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#6366F1' },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '24px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

export default theme;
