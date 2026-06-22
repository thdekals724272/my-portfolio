import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#002C5F',
      light: '#1A4A7A',
      dark: '#001A3A',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A1A1A',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#00AAD2',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F4F4F4',
    },
    text: {
      primary: '#222222',
      secondary: '#444444',
      disabled: '#888888',
    },
    divider: '#DDDDDD',
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h1: { fontWeight: 700, color: '#222222' },
    h2: { fontWeight: 700, color: '#222222' },
    h3: { fontWeight: 600, color: '#444444' },
    h4: { fontWeight: 600, color: '#444444' },
    body1: { color: '#444444' },
    body2: { color: '#888888' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#002C5F',
          '&:hover': {
            backgroundColor: '#00AAD2',
          },
        },
        outlinedPrimary: {
          borderColor: '#002C5F',
          color: '#002C5F',
          '&:hover': {
            backgroundColor: '#002C5F',
            color: '#FFFFFF',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#002C5F',
        },
      },
    },
  },
});

export default theme;
