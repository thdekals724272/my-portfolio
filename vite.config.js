import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 상대 경로로 두면 GitHub Pages(서브패스)와 Vercel(루트 도메인) 양쪽에서 자산 경로가 올바르게 해석된다.
  base: './',
});
