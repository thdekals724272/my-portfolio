# 프로젝트 썸네일 로컬 이미지

여기에 프로젝트별 썸네일 이미지를 넣으면 외부 스크린샷 서비스 없이 안정적으로 표시됩니다.

파일을 추가한 뒤 Supabase `projects` 테이블의 `thumbnail_url` 값을 아래처럼
**맨 앞에 `/` 없이** 상대 경로로 지정하세요 (GitHub Pages 서브패스 배포와 Vercel 루트 배포 양쪽에서
정상 동작하려면 `src/utils/resolveThumbnailUrl.js` 가 자동으로 배포 경로를 붙여주기 때문에
`/`로 시작하면 안 됩니다).

```
images/projects/export-connect.png
images/projects/wedding-sns.png
images/projects/portfolio.png
```

권장: 16:9 비율, 1200x675px 이상, PNG/JPG/WebP.
