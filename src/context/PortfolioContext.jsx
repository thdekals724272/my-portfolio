import { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';

const PortfolioContext = createContext(null);
const STORAGE_KEY = 'portfolio-about-me-data';

const INITIAL_DATA = {
  basicInfo: {
    name: '송다민',
    position: 'Product Builder / Startup Founder',
    interest: '웹 서비스 기획, UI/UX, AI 기반 개발',
    workflow: 'VS Code와 Claude를 활용한 바이브코딩',
    experience: '창업 준비 및 프로젝트 제작 경험',
    photo: '',
  },
  sections: [
    {
      id: 'service-story',
      title: '나의 서비스 제작 스토리',
      emoji: '🚀',
      content:
        '아이디어를 실제 웹 서비스로 만들어보고 싶어 웹 개발과 서비스 기획을 함께 배우기 시작했습니다. 단순히 화면을 만드는 것보다, 사용자가 어떤 문제를 겪고 있고 어떤 흐름으로 서비스를 이용하는지 고민하며 프로젝트를 만들고 있습니다.',
      showInHome: true,
    },
    {
      id: 'product-standard',
      title: '서비스를 만드는 기준',
      emoji: '🎯',
      content:
        '사용자가 쉽고 편하게 이해할 수 있는 서비스를 만드는 것을 중요하게 생각합니다. 보기 좋은 디자인뿐 아니라, 직관적인 화면 구성과 자연스러운 사용 흐름을 함께 고려합니다.',
      showInHome: true,
    },
    {
      id: 'workflow',
      title: '나의 작업 방식',
      emoji: '⚡',
      content:
        'VS Code와 Claude를 활용해 아이디어를 빠르게 화면으로 구현하고, React와 Supabase를 기반으로 실제 동작하는 웹 서비스를 만들어가고 있습니다. 기획, UI 구성, 기능 구현까지 직접 경험하며 프로덕트 제작 역량을 키우고 있습니다.',
      showInHome: true,
    },
    {
      id: 'personal',
      title: '개인적인 이야기',
      emoji: '💬',
      content:
        '새로운 아이디어를 서비스로 구체화하는 과정을 좋아합니다. 일상 속에서 불편했던 경험이나 필요한 기능을 발견하면, 그것을 프로젝트로 만들어보며 배우고 성장하고 있습니다.',
      showInHome: false,
    },
  ],
  skills: [
    { id: 1, icon: 'atom', name: 'React', level: 70, category: 'Frontend', description: '컴포넌트 기반 UI를 구현할 때 활용합니다.', showInHome: true },
    { id: 2, icon: 'zap', name: 'JavaScript', level: 65, category: 'Frontend', description: '웹 페이지의 동적인 기능을 구현할 때 활용합니다.', showInHome: true },
    { id: 3, icon: 'database', name: 'Supabase', level: 65, category: 'Backend & Database', description: '로그인, 데이터베이스, 게시글 저장 기능 구현에 활용합니다.', showInHome: true },
    { id: 4, icon: 'code', name: 'VS Code', level: 80, category: 'Development Tool', description: '프로젝트 개발과 코드 수정에 사용하는 메인 개발 환경입니다.', showInHome: true },
    { id: 5, icon: 'sparkles', name: 'Claude', level: 80, category: 'AI Tool', description: '기획을 코드로 구현하고 UI/UX 개선 방향을 구체화할 때 활용합니다.', showInHome: true },
    { id: 6, icon: 'github', name: 'GitHub', level: 70, category: 'Collaboration Tool', description: '프로젝트 저장소 관리와 배포 흐름을 관리할 때 활용합니다.', showInHome: true },
  ],
};

const loadInitialData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return INITIAL_DATA;
    const parsed = JSON.parse(saved);
    return {
      basicInfo: { ...INITIAL_DATA.basicInfo, ...parsed.basicInfo },
      sections: Array.isArray(parsed.sections) ? parsed.sections : INITIAL_DATA.sections,
      skills: Array.isArray(parsed.skills) ? parsed.skills : INITIAL_DATA.skills,
    };
  } catch {
    return INITIAL_DATA;
  }
};

export const PortfolioProvider = ({ children }) => {
  const [aboutMeData, setAboutMeData] = useState(loadInitialData);

  // ── Persist to localStorage so edits survive reloads/새 탭 ──
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(aboutMeData));
    } catch {
      // 저장 공간 초과 등은 조용히 무시 (편집 자체는 세션 내에서 계속 동작)
    }
  }, [aboutMeData]);

  // ── Stable updaters (useCallback prevents child re-renders) ──
  const updateBasicInfo = useCallback(
    (changes) =>
      setAboutMeData((prev) => ({ ...prev, basicInfo: { ...prev.basicInfo, ...changes } })),
    []
  );

  const updateSection = useCallback(
    (id, changes) =>
      setAboutMeData((prev) => ({
        ...prev,
        sections: prev.sections.map((s) => (s.id === id ? { ...s, ...changes } : s)),
      })),
    []
  );

  const updateSkill = useCallback(
    (skillId, changes) =>
      setAboutMeData((prev) => ({
        ...prev,
        skills: prev.skills.map((s) => (s.id === skillId ? { ...s, ...changes } : s)),
      })),
    []
  );

  const addSkill = useCallback(
    (newSkill) =>
      setAboutMeData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] })),
    []
  );

  // ── Pre-computed home data (useMemo avoids repeated sort/filter) ──
  const homeData = useMemo(
    () => ({
      content: aboutMeData.sections
        .filter((s) => s.showInHome)
        .map((s) => ({
          id: s.id,
          title: s.title,
          emoji: s.emoji,
          summary:
            s.content.length > 100 ? s.content.substring(0, 100) + '...' : s.content,
        })),
      skills: [...aboutMeData.skills]
        .filter((s) => s.showInHome)
        .sort((a, b) => b.level - a.level)
        .slice(0, 4),
      basicInfo: aboutMeData.basicInfo,
    }),
    [aboutMeData]
  );

  return (
    <PortfolioContext.Provider
      value={{
        aboutMeData,
        homeData,
        updateBasicInfo,
        updateSection,
        updateSkill,
        addSkill,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};
