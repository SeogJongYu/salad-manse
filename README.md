# 🥗 샐러드만세 (Salad-Manse)

**사용자의 건강 목표와 상태에 맞춰 최적의 샐러드 조합과 스토리를 추천하는 개인 맞춤형 웹 서비스입니다.**

<br>

![샐러드만세 메인 데모 GIF](./public/saladmanse-demo.gif?v=3)

<br>

## 📄 프로젝트 소개 (Overview)

건강 관리에 대한 관심은 높지만, 개인에게 맞는 영양 균형 잡힌 샐러드를 매번 구성하는 것은 어렵습니다. `샐러드만세`는 사용자의 건강 목표(체중 감량, 근육 증가 등), 건강 상태(고혈압, 고지혈증 등) 데이터를 기반으로, 최적의 샐러드 재료 조합을 추천하고 AI가 생성한 매력적인 샐러드 스토리를 제공하여 건강한 식단 관리를 돕습니다.

이 프로젝트는 **Next.js 15 (App Router)**의 서버 컴포넌트(RSC)와 서버 액션을 중심으로 풀스택 개발을 경험하고, **Zustand**를 이용한 클라이언트 상태 관리, **Supabase** 백엔드 연동, **Jest**를 활용한 단위 테스트 등 모던 웹 개발 스택을 깊이 있게 학습하는 것을 목표로 진행했습니다.

* **서비스 배포 주소:** [https://saladmanse.com](https://saladmanse.com)

<br>

## 🛠️ 기술 스택 (Tech Stack)

| Category       | Stack                 | 상세 내용                                                              |
| :------------- | :-------------------- | :--------------------------------------------------------------------- |
| **Frontend** | `Next.js 15`          | App Router, RSC, Server Actions                                        |
|                | `React 19`            | `useActionState`, `useTransition`                                      |
|                | `TypeScript`          | 전 구간 타입 안정성 확보                                               |
|                | `Zustand`             | 멀티스텝 폼 상태 관리 (`persist` 미들웨어 사용)                        |
|                | `TailwindCSS`         | 유틸리티 기반 반응형 스타일링                                          |
|                | `framer-motion`       | 페이지 전환 및 상세 다이얼로그 애니메이션 (`layoutId`)                 |
| **Backend** | `Supabase`            | PostgreSQL DB, Storage (CDN 이미지 변환)                               |
|                | `Prisma`              | ORM, 스키마 관리 및 타입 생성, **Accelerate** (Connection Pooling)       |
|                | `Vercel AI SDK`       | OpenAI (GPT-4o) 연동, 샐러드 스토리 생성                               |
| **Infra** | `Vercel`              | 배포, ISR 캐시                                                         |
| **Testing** | `Jest`                | 서버 액션 및 유틸리티 함수 단위 테스트 (Mocking 활용)                  |
| **DevOps** | `GitHub Actions`      | **CI**: 자동화된 테스트 (`Jest`) 및 빌드 검증                           |
|                | `Husky`, `lint-staged` | Git Hooks 자동화 (Commit 전 코드 검사)                                 |
|                | `commitlint`          | Conventional Commits 강제                                              |
|                | `Branch Protection`   | `main` 브랜치 보호 (PR 필수, CI 통과 조건)

<br>

## ✨ 주요 기능 (Features)

### 1. 🥗 맞춤 샐러드 추천 로직
* 사용자의 건강 목표(`goal`)와 특정 건강 상태(`high_blood_pressure` 등) 데이터를 입력받습니다.
* 서버 액션(`requestSalad`) 내에서 목표별 재료 구성 규칙(`getRuleByGoal`)과 유효 태그 필터링(`getValidTags`) 로직을 통해 추천할 재료 후보군을 선정합니다.
* 순수 함수(`assembleSalad`)를 통해 규칙에 맞춰 최종 샐러드 재료 조합(`saladComponents`)을 결정합니다.

### 2. 🤖 AI 기반 샐러드 스토리 생성
* 조합된 샐러드 재료 목록과 사용자의 건강 목표를 기반으로, `Vercel AI SDK`와 `OpenAI (GPT-4o)`를 활용하여 각 샐러드에 맞는 매력적인 제목(`title`)과 요약(`summary`)을 동적으로 생성합니다. (`openai.service.ts`)
* 생성된 스토리는 추천된 샐러드 조합과 함께 DB(`SaladStory` 테이블)에 저장됩니다.

### 3. 🔍 중복 추천 방지 및 캐싱
* 사용자에게 동일한 재료 조합의 샐러드를 추천할 경우, AI 스토리 생성을 건너뛰고 기존에 저장된 `SaladStory`를 반환하여 비용(API 호출)과 시간을 절약합니다. (`findDuplicatedSalad`)
* 샐러드 상세 페이지(`[saladId]`)는 `unstable_cache`와 `revalidate: false`를 사용하여 On-demand ISR로 구현, 최초 방문 시 생성된 후 영구 캐시됩니다. (추후 `revalidateTag` 연동 가능)

### 4. 📝 멀티스텝 설문 UI 및 상태 관리
* 사용자 경험을 위해 긴 설문 과정을 여러 단계(`PreferenceSteps` > `XxxStep`)로 분할했습니다.
* 단계별 입력 데이터는 `Zustand` 스토어와 `persist` 미들웨어(`sessionStorage`)를 사용하여 관리, 사용자가 중간에 **새로고침 하더라도 입력 내용을 유지**합니다.
* 최종 제출은 `PreferenceFlow` 컴포넌트에서 `useActionState`와 `startTransition`을 사용하여 서버 액션을 호출, **안전한 로딩 상태 관리**와 **선언적인 에러 처리**를 구현했습니다.

<br>

## 💡 기술적 도전 및 해결 (Technical Highlights)

### 1. 서버 액션 아키텍처 설계 (Fat Server, Thin Client)
* **고민:** 클라이언트에서 서버 액션 호출 시, 데이터 필터링/유효성 검증과 라우팅(부수효과) 책임 소재를 어디에 둘 것인가?
* **해결:**
    * **"Fat Server"** 모델 채택: 서버 액션(`requestSalad`)이 클라이언트 데이터의 **필터링 및 유효성 검증**을 직접 수행하여 서버 측 보안 및 데이터 무결성 강화.
    * **"순수 함수 분리"** 원칙 적용: 복잡한 로직(`assembleSalad`, `getValidTags`, `getRuleByGoal`)은 테스트 가능한 순수 함수로 분리 (`utils/`).
 
### 2. `useActionState`와 멀티스텝 폼(Zustand) 연동
* **문제:** `<form>` 태그 기반이 아닌 Zustand 스토어 데이터로 서버 액션(`useActionState`) 호출 시, `isPending` 상태 관리 버그 및 "점진적 향상" 부재.
* **해결:**
    * `useActionState`와 `startTransition` 조합: **안전하고 정확한 로딩 상태(`isPending`)** 구현, 수동 상태 관리 버그 원천 차단.
    * **하이브리드 방식** 채택: 데이터 유지는 `Zustand persist`, 최종 제출은 `useActionState`로 처리하여 멀티스텝 환경의 복잡성 해결.

### 3. 단위 테스트(Jest) 및 CI(GitHub Actions) 전략 수립
* **목표:** 단순 커버리지 100%가 아닌, 의미 있고 안정적인 테스트 및 배포 파이프라인 구축.
* **전략:**
    * **유닛 테스트 (`Jest`)**:
        * **순수 함수(`utils/`)**: 다양한 입력값(엣지 케이스 포함) 검증으로 로직 견고함 확보.
        * **서버 액션(`actions/`)**: `jest.mock`으로 외부 의존성(DB, AI, Utils) 완벽 격리, Orchestration 로직의 분기 처리(성공, 실패, 중복 등) 시나리오별 검증.
    * **CI (`GitHub Actions`)**:
        * **자동 검증**: `stage` 브랜치 푸시 및 `main` 브랜치 PR 시, **자동으로 전체 유닛 테스트(`pnpm test --ci`) 및 빌드(`pnpm build`)** 실행.
        * **품질 게이트**: GitHub 브랜치 보호 규칙과 연동, **CI 검사를 통과한 코드만 `main` 브랜치에 병합**되도록 강제하여 코드 안정성 보장.

### 4. Vercel 환경에서의 DB 연결 최적화 (Prisma Accelerate)
* **문제:** 서버리스 환경(Vercel)에서 빈번한 DB 연결 시도 시 연결 제한(Connection Limit) 초과 및 성능 저하 발생.
* **해결:**
    * **Prisma Accelerate** 도입: Connection Pooler를 사용하여 DB 연결을 효율적으로 관리, 서버리스 환경의 한계 극복.
<br>

## 🚀 프로젝트 실행 방법 (Getting Started)

```bash
# 1. 저장소 클론
$git clone https://github.com/SeogJongYu/salad-manse.git

# 2. 의존성 설치 (pnpm 사용 권장)
$ pnpm install

# 3. .env 파일 생성 (Supabase, OpenAI 키 등)

# 4. 개발 서버 실행
$ pnpm dev

# 5. 브라우저에서 http://localhost:3000 으로 접속
