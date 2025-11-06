# 🥗 샐러드만세 (Salad-Manse)

사용자의 건강 목표와 상태에 맞춰 최적의 샐러드 조합과 스토리를 추천하는 개인 맞춤형 웹 서비스입니다.

<br>

![샐러드만세 메인 데모 GIF](./public/saladmanse-demo.gif?v=3)

<br>

## 프로젝트 소개

건강 관리에 대한 관심은 높지만, 개인에게 맞는 영양 균형 잡힌 샐러드를 매번 구성하는 것은 어렵습니다. **샐러드만세**는 사용자의 건강 목표(체중 감량, 근육 증가 등), 건강 상태(고혈압, 고지혈증 등) 데이터를 기반으로, 최적의 샐러드 재료 조합을 추천하고 AI가 생성한 매력적인 샐러드 스토리를 제공하여 건강한 식단 관리를 돕습니다.

이 프로젝트는 Next.js 15 (App Router)의 서버 컴포넌트와 서버 액션, Zustand를 이용한 클라이언트 상태 관리, Supabase 백엔드 연동, Jest를 활용한 단위 테스트 등 모던 웹 개발 스택을 이용해 개발되었습니다.

* **서비스 배포 주소:** [https://saladmanse.com](https://saladmanse.com)

<br>

## 기술 스택

| Category       | Stack                 | 상세 내용                                                              |
| :------------- | :-------------------- | :--------------------------------------------------------------------- |
| **Frontend** | `Next.js 15`          | App Router, RSC, Server Actions                                        |
|                | `React 19`            | useActionState, useTransition                                      |
|                | `TypeScript`          | 전 구간 타입 안정성 확보                                               |
|                | `Zustand`             | 멀티스텝 폼 상태 관리 (persist 미들웨어 사용)                        |
|                | `TailwindCSS`         | 유틸리티 기반 반응형 스타일링                                          |
|                | `framer-motion`       | 상세 Dialog 레이아웃 애니메이션                 |
| **Backend** | `Supabase`            | PostgreSQL DB, Storage (CDN 이미지 변환)                               |
|                | `Prisma`              | ORM, 스키마 관리 및 타입 생성, Accelerate (Connection Pooling)       |
| **Infra** | `Vercel`              | 배포, ISR 캐시                                                         |
| **Testing** | `Jest`                | 서버 액션 및 유틸리티 함수 단위 테스트 (Mocking 활용)                  |
| **DevOps** | `GitHub Actions`      | CI: 자동화된 테스트 Jest 및 빌드 검증                           |
|                | `Husky`, `lint-staged` | Git Hooks 자동화 (Commit 전 코드 검사)                                 |
|                | `commitlint`          | Conventional Commits 강제                                              |
|                | `Branch Protection`   | main 브랜치 보호 (PR 필수, CI 통과 조건)

<br>

## 주요 기능

### 1. 맞춤 샐러드 추천 로직
* 사용자의 건강 목표(`goal`)와 특정 건강 상태(`high_blood_pressure` 등) 데이터를 입력받습니다.
* 서버 액션(`requestSalad`) 내에서 목표별 재료 구성 규칙(`getRuleByGoal`)과 유효 태그 필터링(`getValidTags`) 로직을 통해 추천할 재료 후보군을 선정합니다.
* `assembleSalad`를 통해 규칙에 맞춰 최종 샐러드 재료 조합(`saladComponents`)을 결정합니다.

### 2. AI 기반 샐러드 스토리 생성
* 조합된 샐러드 재료 목록과 사용자의 건강 목표를 기반으로, `Vercel AI SDK`와 `OpenAI (GPT-4o)`를 활용하여 각 샐러드에 맞는 매력적인 제목(`title`)과 요약(`summary`)을 동적으로 생성합니다. (`openai.service.ts`)
* 생성된 스토리는 추천된 샐러드 조합과 함께 DB(`SaladStory` 테이블)에 저장됩니다.

### 3. 중복 추천 방지 및 캐싱
* 사용자에게 동일한 재료 조합의 샐러드를 추천할 경우, AI 스토리 생성을 건너뛰고 기존에 저장된 `SaladStory`를 반환하여 비용(API 호출)과 시간을 절약합니다. (`findDuplicatedSalad`)
* 샐러드 상세 페이지(`[saladId]`)는 `unstable_cache`와 `revalidate: false`를 사용하여 On-demand ISR로 구현, 최초 방문 시 생성된 후 영구 캐시됩니다. (추후 `revalidateTag` 연동 가능)

### 4. 멀티스텝 설문 UI 및 상태 관리
* 사용자 경험을 위해 긴 설문 과정을 여러 단계(`PreferenceFlow` >`PreferenceSteps` > `****Step`)로 분할했습니다.
* 단계별 입력 데이터는 `Zustand` 스토어와 `persist` 미들웨어(`sessionStorage`)를 사용하여 관리하고, 사용자가 중간에 **새로고침 하더라도 입력 내용을 유지**합니다.
* 최종 제출은 `PreferenceFlow` 컴포넌트에서 `useActionState`와 `startTransition`을 사용하여 서버 액션을 호출, **안전한 로딩 상태 관리**와 **선언적인 에러 처리**를 구현했습니다.

<br>

## 기술적 도전 및 해결

### 1. Zustand 하이드레이션과 useState 스냅샷 문제 해결
* **문제**<br>새로고침 시, Step 컴포넌트의 State가 Zustand의 초기값(빈 값)으로 먼저 스냅샷되었습니다. 그 직후 session storage에서 데이터가 복원되어도, 이미 초기화된 state는 갱신되지 않는 문제가 있었습니다. 데이터는 존재하지만 UI는 갱신되지 않아 사용자는 선택을 다시 해야 하는 불편함이 있었습니다.
* **해결**
    * 범용 `PersistHydrationBoundary`: zustand의 store 인스턴스를 props로 전달받고 store 상태를 구독합니다. 이 스토어의 하이드레이션이 완료되면, key를 변경하여 children을 강제로 재마운트시키는 **재사용 가능한 범용 Boundary**를 구현했습니다.
    * `PreferenceStoreHydrationBoundary`: Preference에서 사용되는 store 인스턴스를 위 범용 Boundary에 주입하는 컨테이너 Boundary를 만들었습니다. 문제가 발생하는 컴포넌트 트리를 이 컴포넌트로 감싸면 하이드레이션 완료 후 트리가 재마운트되어 UI가 올바른 값으로 갱신됩니다.
* **핵심**
    * `PersistHydrationBoundary`가 데이터 동기화 책임을 가지고 있기 때문에, 페이지 컴포넌트에서 동기화에 대한 각종 명령형 코드들을 제거하여 서비스 흐름에 집중할 수 있습니다. 그리고 Step 컴포넌트들은 별도의 동기화 로직이 필요 없는 단순한 컴포넌트로 남게되어, 컴포넌트 본 목적에 집중할 수 있게 되어 유지보수성이 증가합니다.
 
### 2. RSC/SSG 아키텍처와 하이드레이션 안정성을 통한 0.2s FCP 달성
* **목표**<br>깜빡임 없는 즉각적인 UI 로딩(평균 FCP 0.2s)을 서비스의 핵심 아키텍처 목표로 삼았습니다.
* **과정**
    * 이를 위해 Next.js의 서버 컴포넌트 기반 Full SSG 전략을 채택했습니다.
    * 하이드레이션 불일치 문제를 피하고자, RSC와 완벽히 호환되는 **shadcn/ui**를 채택하여 아키텍처 안정성을 확보했습니다.
* **결과**<br>하이드레이션 에러 없이 모든 UI의 사전 빌드에 성공했으며, 모든 페이지에서 평균 200ms FCP 반응성을 달성했습니다.

### 3. Vercel 환경에서의 DB 연결 최적화
* **문제**<br>Vercel(서버리스 환경)에 배포 시, 각 서버리스 함수 실행마다 새로운 DB 연결을 시도하게 됩니다. 이로 인해 DB의 최대 연결 수(Connection Limit)를 빠르게 소진하는 P6001 에러와 심각한 성능 저하가 발생했습니다.
* **해결**
    * 일반 서버에서 사용되는 Prisma Client 인스턴스를 제거하고, Connection Pooler에 http 요청을 통해 ORM을 처리하는 **Prisma Accelerate**를 도입했습니다.
    * **이점**: 서버리스 함수가 실행될 때마다 새로운 연결을 생성하는 대신, Accelerate의 Connection Pool을 통해 기존 연결을 재사용함으로써 서버리스 환경에서의 문제를 개선했습니다.
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
