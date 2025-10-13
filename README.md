# Next.js 15 스타터 키트

Next.js로 빠르게 모던 웹 프로젝트를 시작하기 위한 저장소입니다.
<br>
<br>

## 📦 스택

- **Node.js**: v22.16.0
- **pnpm**: v10.11.0
- **React**: v19.1.0
- **Next.js**: v15.5.2
- **TypeScript**: ^5
- **Tailwind CSS**: ^4
- **shadcn/ui** (TailwindCSS)
  <br>

## 🚀 설치 & 실행

```bash
pnpm install
pnpm run dev
```

<br>

## 🎯 Git Hooks & 커밋 컨벤션

이 프로젝트는 일관된 코드 품질과 커밋 메시지 규칙을 위해 다음 도구들을 사용합니다:

### 🔧 설정된 도구들

- **Husky**: Git hooks 관리
- **lint-staged**: 스테이징된 파일에 대해서만 린트/포맷팅 실행
- **Commitlint**: 커밋 메시지 규칙 검증
- **Commitizen**: 대화형 커밋 메시지 작성

### 📝 커밋 방법

**Commitizen을 사용한 대화형 커밋 (권장):**

```bash
git add .
pnpm run commit
```

### 🚨 자동 검사 항목

**Pre-commit (커밋 전):**

- ESLint로 코드 품질 검사 및 자동 수정
- Prettier로 코드 포맷팅

**Commit-msg (커밋 메시지 작성 시):**

- 커밋 메시지 컨벤션 검증

<br>

## 🏗️ 프로젝트 구조

```bash
src/
  features/               # 도메인별 기능 모듈 (FSD)
    example/
      components/         # feature 기반 컴포넌트 (Atomic)
      api/           # API 함수
      model/              # 모델 정의
  shared/                 # 공통 모듈 (프로젝트 전역)
    components/           # 전역 UI 컴포넌트 (Atomic)
    api/                  # 공통 유틸 (fetcher 등)
    utils/                # 함수 유틸
    constants/            # 상수 모음
    providers/            # 전역 Providers (예: ReactScan)
  app/                    # Next.js App Router 엔트리
    page.tsx
    layout.tsx
    globals.css
```

<br>

### 🔍 ReactScan

[React Scan](https://www.npmjs.com/package/react-scan)은 React 앱의 성능을 자동으로 감지합니다.  
개발 환경 (NODE_ENV=development)에서 자동 활성화  
shared/providers/ReactScan.tsx에서 관리
