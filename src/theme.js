import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#7A8F7B', light: '#96AC97', dark: '#647566', contrastText: '#FFFFFF' },
    secondary: { main: '#D9A273', contrastText: '#FFFFFF' },
    info: { main: '#C97B63' },
    background: { default: '#FAF8F5', paper: '#FFFFFF' },
    text: { primary: '#2F2F2F', secondary: '#6B7280', disabled: '#9C9691' },
    divider: '#E8E3DB',
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
  shape: { borderRadius: 20 },
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
    MuiButtonBase: {
      styleOverrides: {
        root: {
          // 리플이 배경 위에서 은은하게 보이도록 보정
          '& .MuiTouchRipple-child': { opacity: 0.65 },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 1px 0 rgba(122,143,123,0.08)',
          color: '#2F2F2F',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#7A8F7B' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7A8F7B' },
          },
          '& .MuiInputLabel-root.Mui-focused': { color: '#7A8F7B' },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '24px',
          boxShadow: '0 20px 56px rgba(47,47,47,0.10)',
        },
      },
    },
  },
});

export default theme;
