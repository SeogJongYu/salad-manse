# 🥗 샐러드만세 (Salad-Manse)

사용자의 건강 목표와 상태에 맞춰 최적의 샐러드 조합과 스토리를 추천하는 개인 맞춤형 웹 서비스입니다.

<br>

![샐러드만세 메인 데모 GIF](./public/saladmanse-demo.gif?v=3)

<br>

## 프로젝트 소개

건강 관리에 대한 관심은 높지만, 개인에게 맞는 영양 균형 잡힌 샐러드를 매번 구성하는 것은 어렵습니다. **샐러드만세**는 사용자의 건강 목표(체중 감량, 근육 증가 등), 건강 상태(고혈압, 고지혈증 등) 데이터를 기반으로, 최적의 샐러드 재료 조합을 추천하고 AI가 생성한 매력적인 샐러드 스토리를 제공하여 건강한 식단 관리를 돕습니다.

- **서비스 배포 주소:** [https://saladmanse.com](https://saladmanse.com)

<br>

## 기술 스택

| Category     | Stack                  | 상세 내용                                                      |
| :----------- | :--------------------- | :------------------------------------------------------------- |
| **Frontend** | `Next.js 15`           | App Router, RSC, Server Actions                                |
|              | `React 19`             | useActionState, useTransition                                  |
|              | `TypeScript`           | 전 구간 타입 안정성 확보                                       |
|              | `Zustand`              | 멀티스텝 폼 상태 관리 (persist 미들웨어 사용)                  |
|              | `TailwindCSS`          | 유틸리티 기반 반응형 스타일링                                  |
|              | `framer-motion`        | 상세 Dialog 레이아웃 애니메이션                                |
| **Backend**  | `Supabase`             | PostgreSQL DB, Storage (CDN 이미지 변환)                       |
|              | `Prisma`               | ORM, 스키마 관리 및 타입 생성, Accelerate (Connection Pooling) |
| **Infra**    | `Vercel`               | 배포, ISR 캐시                                                 |
| **Testing**  | `Jest`                 | 서버 액션 및 유틸리티 함수 단위 테스트 (Mocking 활용)          |
| **DevOps**   | `GitHub Actions`       | CI: 자동화된 테스트 Jest 및 빌드 검증                          |
|              | `Husky`, `lint-staged` | Git Hooks 자동화 (Commit 전 코드 검사)                         |
|              | `commitlint`           | Conventional Commits 강제                                      |
|              | `Branch Protection`    | main 브랜치 보호 (PR 필수, CI 통과 조건)                       |

<br>

## 주요 기능

### 1. 맞춤 샐러드 추천 로직

- 사용자의 건강 목표와 특정 건강 상태 데이터를 입력받습니다.
- 서버 액션(`requestSalad`) 내에서 목표별 재료 구성 규칙과 유효 태그 필터링 로직을 통해 추천할 재료 후보군을 선정합니다.

### 2. AI 기반 샐러드 스토리 생성

- 조합된 샐러드 재료 목록과 사용자의 건강 목표를 기반으로, OpenAI (GPT-4o)를 활용하여 각 샐러드에 맞는 매력적인 타이틀과 요약글을 동적으로 생성합니다. (`openai.service.ts`)
- 생성된 스토리는 추천된 샐러드 조합과 함께 DB에 저장됩니다.

### 3. 중복 추천 방지 및 캐싱

- 사용자에게 동일한 재료 조합의 샐러드를 추천할 경우, AI 스토리 생성을 건너뛰고 기존에 저장된 SaladStory를 반환하여 비용(API 호출)과 시간을 절약합니다. (`findDuplicatedSalad`)
- 샐러드 상세 페이지([saladId])는 `unstable_cache`와 `revalidate: false`를 사용하여 On-demand ISR로 구현, 최초 방문 시 생성된 후 영구 캐시됩니다. (추후 `revalidateTag` 연동 가능)

### 4. 멀티스텝 설문 UI 및 상태 관리

- 관심사 분리: 설문 기능을 `PreferencePage`(메타데이터/레이아웃) → `PreferenceFlow`(데이터 인터랙션/로직) → `PreferenceSteps`(UI 렌더링)의 3계층으로 분리하여 코드의 응집도와 유지보수성을 높였습니다.
- 데이터 유지: Zustand와 persist 미들웨어(sessionStorage)를 도입하여, 사용자가 설문 도중 새로고침을 하거나 이탈해도 입력 데이터가 유지되도록 구현했습니다.
- 끊김 없는 로딩 경험: 최종 제출 시 startTransition을 활용하여 Server Action(Prisma, OpenAI) 수행부터 새로운 페이지 빌드 및 이동 시점까지 로딩 상태를 유지합니다. 이를 통해 별도의 useState 관리 없이도 깜빡임 없는 부드러운 UX를 제공합니다.

<br>

## 기술적 도전 및 해결

### 1. Zustand 하이드레이션과 useState 스냅샷 문제 해결

- **문제**<br>새로고침 시, Step 컴포넌트의 State가 Zustand의 초기값(빈 값)으로 먼저 스냅샷되었습니다. 그 직후 session storage에서 데이터가 복원되어도, 이미 초기화된 state는 갱신되지 않는 문제가 있었습니다. 데이터는 존재하지만 UI는 갱신되지 않아 사용자는 선택을 다시 해야 하는 불편함이 있었습니다.
- **해결**
  - 범용 `PersistHydrationBoundary`: zustand의 store 인스턴스를 props로 전달받고 store 상태를 구독합니다. 이 스토어의 하이드레이션이 완료되면, key를 변경하여 children을 강제로 재마운트시키는 **Boundary**를 구현했습니다.
  - `PreferenceStoreHydrationBoundary`: 설문 과정에서 사용되는 preferenceStore 인스턴스를 `PersistHydrationBoundary`에 주입하는 컨테이너 Boundary를 만들었습니다. Persist 데이터 하이드레이션으로 인한 데이터 미스매치가 발생하는 컴포넌트 트리를 이 컴포넌트로 감싸면 하이드레이션 완료 후 트리가 재마운트되어 UI가 올바른 값으로 갱신됩니다.
- **핵심**
  - `PersistHydrationBoundary`가 데이터 동기화 책임을 가지고 있기 때문에, 페이지 컴포넌트에서 동기화에 대한 각종 명령형 코드들을 제거하여 서비스 흐름에 집중할 수 있습니다. 그리고 Step 컴포넌트들은 별도의 동기화 로직이 필요 없는 단순한 컴포넌트로 남게되어, 컴포넌트 본 목적에 집중할 수 있게 되어 유지보수성이 증가합니다.

### 2. Headless Funnel 패턴을 통한 네비게이션 로직 추상화

- **문제**<br>설문 과정에서 **입력 데이터**와 **현재 단계(Step)**라는 성격이 다른 두 상태가 한 훅에 뒤섞여 결합도가 높아지는 문제가 있었습니다. 또한, useState로만 단계를 관리할 경우 브라우저의 뒤로 가기나 새로고침 시 진행 상황이 유실되어 사용자 경험(UX)을 저해하는 문제가 있었습니다.
- **해결**
  - 책임 분리: 데이터 관리(Zustand)와 흐름 제어(Step)의 책임을 분리하기 위해 Headless UI 패턴을 적용한 useFunnel 훅을 구현했습니다. 이 훅은 Step 목록(name list)을 주입받아, 현재 상태에 맞는 컴포넌트만 `<Funnel.Step name="something">`을 통해 **선언적**으로 렌더링합니다.
  - URL 기반 상태 동기화: Funnel의 상태를 내부 state가 아닌 `useQueryState를` 통해 URL Query Parameter로 관리했습니다. 이를 통해 별도의 로직 없이도 새로고침 시 상태 유지 및 브라우저 히스토리(뒤로 가기) 연동을 구현했습니다.
  - 로직 캡슐화: `stepNext`, `stepBack`, `progressRatio` 등 복잡한 인덱스 계산 로직을 훅 내부로 은닉하고, 사용하는 쪽에서는 메서드 호출만으로 제어하도록 하여 유지보수성을 높였습니다.
- **핵심**
  - 복잡한 네비게이션 분기(if/else)를 제거하고, 선언형 구조로 개편하여 비즈니스 로직과 UI 흐름을 한눈에 파악할 수 있게 개선했습니다.

### 3. Vercel 환경에서의 DB 연결 최적화

- **문제**<br>Vercel(서버리스 환경)에 배포 시, 각 서버리스 함수 실행마다 새로운 DB 연결을 시도하게 됩니다. 이로 인해 DB의 최대 연결 수(Connection Limit)를 빠르게 소진하는 P6001 에러와 심각한 성능 저하가 발생했습니다.
- **해결**
  _ 일반 서버에서 사용되는 Prisma Client 인스턴스를 제거하고, Connection Pooler에 http 요청을 통해 ORM을 처리하는 **Prisma Accelerate**를 도입했습니다.
  _ **이점**: 서버리스 함수가 실행될 때마다 새로운 연결을 생성하는 대신, Accelerate의 Connection Pool을 통해 기존 연결을 재사용함으로써 서버리스 환경에서의 문제를 개선했습니다.
  <br>

## 🚀 프로젝트 실행 방법 (Getting Started)

```bash
# 1. 저장소 클론
$ git clone https://github.com/SeogJongYu/salad-manse.git

# 2. 의존성 설치 (pnpm 사용 권장)
$ pnpm install

# 3. .env 파일 생성 (Supabase, OpenAI 키 등)

# 4. 개발 서버 실행
$ pnpm dev

# 5. 브라우저에서 http://localhost:3000 으로 접속
```
