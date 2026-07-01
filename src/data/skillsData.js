export const ICON_EMOJI = {
  atom: '⚛️',
  zap: '⚡',
  database: '🗄️',
  code: '💻',
  sparkles: '✨',
  github: '🐙',
  html: '🌐',
  css: '🎨',
  typescript: '📘',
  tailwind: '🌊',
  postgresql: '🐘',
  firebase: '🔥',
  chatgpt: '🤖',
  figma: '✏️',
  canva: '🖼️',
  git: '📦',
  default: '🔧',
};

export const ICON_OPTIONS = [
  { key: 'atom', label: 'React' },
  { key: 'zap', label: 'JS/TS' },
  { key: 'database', label: 'DB' },
  { key: 'code', label: 'Code' },
  { key: 'sparkles', label: 'AI' },
  { key: 'github', label: 'GitHub' },
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'tailwind', label: 'Tailwind' },
  { key: 'postgresql', label: 'PostgreSQL' },
  { key: 'firebase', label: 'Firebase' },
  { key: 'chatgpt', label: 'ChatGPT' },
  { key: 'figma', label: 'Figma' },
  { key: 'canva', label: 'Canva' },
  { key: 'git', label: 'Git' },
];

export const CATEGORIES = [
  'Frontend',
  'Backend & Database',
  'AI Tool',
  'Development Tool',
  'Collaboration Tool',
  'Design',
];

export const CATEGORY_META = {
  Frontend: { color: '#0EA5E9', bg: '#E0F2FE' },
  'Backend & Database': { color: '#10B981', bg: '#D1FAE5' },
  'AI Tool': { color: '#8B5CF6', bg: '#EDE9FE' },
  'Development Tool': { color: '#F59E0B', bg: '#FEF3C7' },
  'Collaboration Tool': { color: '#6366F1', bg: '#EEF2FF' },
  Design: { color: '#EC4899', bg: '#FCE7F3' },
};

export const skillsData = [
  {
    id: 1, icon: 'atom', name: 'React', level: 70,
    category: 'Frontend',
    description: '컴포넌트 기반 UI를 구현할 때 활용합니다.',
    showInHome: true,
  },
  {
    id: 2, icon: 'zap', name: 'JavaScript', level: 65,
    category: 'Frontend',
    description: '웹 페이지의 동적인 기능을 구현할 때 활용합니다.',
    showInHome: true,
  },
  {
    id: 3, icon: 'database', name: 'Supabase', level: 65,
    category: 'Backend & Database',
    description: '로그인, 데이터베이스, 게시글 저장 기능 구현에 활용합니다.',
    showInHome: true,
  },
  {
    id: 4, icon: 'code', name: 'VS Code', level: 80,
    category: 'Development Tool',
    description: '프로젝트 개발과 코드 수정에 사용하는 메인 개발 환경입니다.',
    showInHome: true,
  },
  {
    id: 5, icon: 'sparkles', name: 'Claude', level: 80,
    category: 'AI Tool',
    description: '기획을 코드로 구현하고 UI/UX 개선 방향을 구체화할 때 활용합니다.',
    showInHome: true,
  },
  {
    id: 6, icon: 'github', name: 'GitHub', level: 70,
    category: 'Collaboration Tool',
    description: '프로젝트 저장소 관리와 배포 흐름을 관리할 때 활용합니다.',
    showInHome: true,
  },
];
