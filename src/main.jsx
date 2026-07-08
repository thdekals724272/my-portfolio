import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { HashRouter } from 'react-router-dom';

import theme from './theme.js';
import App from './App.jsx';
import { PortfolioProvider } from './context/PortfolioContext.jsx';

// GitHub Pages는 정적 호스팅이라 BrowserRouter의 /about 같은 경로를 직접 열면 서버가 404를 반환한다.
// HashRouter는 라우트 정보를 #/about 처럼 해시에 담아 서버에 전달하지 않으므로, 새로고침·직접 접속·공유 링크 모두 항상 index.html만 요청해 404가 발생할 수 없다.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
);
