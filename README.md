## 🔧 기술 스택

- **프레임워크**: Next.js 15
- **언어**: TypeScript
- **데이터베이스**: PostgreSQL + Prisma ORM
- **Auth**: Clerk (구글 로그인)
- **이미지 업로드 및 저장**: AWS S3 (API Route 사용)
- **스타일링**: Tailwind CSS, Shadcn/UI
- **배포**: Vercel

---

## 📁 프로젝트 구조
```
|-- src/
|   |-- app/
|   |   |-- api/
|   |   |   `-- upload/  # S3 이미지 업로드 API Route
|   |   |-- layout.tsx  # 루트 레이아웃
|   |   `-- page.tsx  # 홈 페이지
|   |
|   |-- components/  # UI 컴포넌트
|   |   |-- ui/  # 재사용 가능한 컴포넌트 (버튼, 카드, 아바타 등 (Shadcn/UI의 컴포넌트 등))
|   |   |-- Navbar.tsx
|   |   |-- Sidebar.tsx
|   |   `-- ThemeProvider.tsx
|   |
|   |-- actions/  # 서버 액션 (생성, 수정, 삭제 등)
|   |   |-- post.action.ts  # 글 관련 CRUD
|   |   `-- user.action.ts  # 사용자 관련 CRUD
|   |
|   |-- lib/  # 유틸 및 설정 파일
|   |   |-- prisma.ts  # Prisma 클라이언트 생성
|   |   |-- utils.ts  # 유틸리티 함수들
|   |   `-- middleware.ts  # Clerk 미들웨어 설정
|   |
|   |-- fonts/  # 커스텀 폰트
|   `-- globals.css  # 전역 스타일
|
|-- .env  # 환경 변수
```

