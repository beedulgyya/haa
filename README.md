# beedulgyya 개인 한 페이지

이 프로젝트는 불특정 대중에게 공개하는 개인 한 페이지입니다.

## 핵심 구성
공개 범위 → 강점/취향 3개(상황·행동·결과) → 활동 → 검사 → 접근 가능한 상호작용 → 제출용 정보

## GitHub Pages
권장 저장소 이름: `beedulgyya.github.io`

배포 후 공개 주소: `https://beedulgyya.github.io/`

## 로컬 검사
```bash
npm install
npx playwright install chromium
npm run lint:secrets
npm test
```

## 제출물
결과물 주소 / 소스 주소 / 짧은 확인 방법 4줄 / AI와 나의 판단 3줄

실제 결함 3개 이상의 수정 전후와 최종 콘솔 상태는 별도로 `검수기록.md`에 보관합니다.


## 애니메이션
첫 화면 등장, 카드 hover, 스크롤 진입에 약한 애니메이션을 적용했습니다.
`움직임 줄이기` 버튼과 `prefers-reduced-motion`을 함께 지원합니다.


## 자연 테마
초록 계열 숲 분위기의 배경과 스크롤에 따른 은은한 배경 변화 효과를 적용했습니다. 움직임 줄이기와 prefers-reduced-motion도 지원합니다.


## 섹션별 자연 연출
스크롤하면서 현재 보고 있는 섹션이 바뀌면 배경 색감과 빛의 분위기가 달라집니다.
새싹 → 숲 → 바람 → 햇빛 → 깊은 숲 → 이끼 → 저녁 숲 순으로 연결했습니다.
