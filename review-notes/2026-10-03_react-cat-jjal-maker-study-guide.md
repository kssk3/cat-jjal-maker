# 고양이 짤방 생성기로 배우는 React — 파일 순서별 학습 가이드

> 대상: `answers/` 폴더의 HTML 파일을 **번호 순서대로** 따라가는 React 입문자
> 목표: ① 각 단계에서 "무엇이 새로 생겼는지"를 빠르게 잡고 ② 강의 코드 중 실무에서 고쳐 쓰는 부분까지 함께 익히기
> 형식: 각 단계는 review-notes 형식(`핵심 요약` / `복습 포인트`)으로 정리했습니다. 💼 표시는 "실무에서는 이렇게"입니다.

---

## 0. 이 가이드를 쓰는 법

### 핵심 요약

- 이 프로젝트의 HTML 파일들은 **바로 앞 파일에서 조금씩만 바뀌는** 구조입니다. 그래서 파일 전체를 읽기보다 **앞 파일과 비교(diff)** 해서 "무엇이 바뀌었나"를 보는 것이 가장 빠른 학습법입니다.
  - VS Code: 두 파일을 같이 선택한 뒤 우클릭 → **Compare Selected**
  - 터미널:

```bash
diff answers/14-state.html answers/15-lifting-state-up.html
```

- 번호가 비어 있는 회차(1, 3, 5, 24~27, 30)는 HTML 파일이 없는 강의 회차입니다. 아래 로드맵은 **파일이 있는 회차** 기준입니다.
- 지금 작업 중인 루트의 `index.html`은 **15~16단계(state 끌어올리기)** 근처이고, 강의(React 17)와 달리 이미 **React 18의 `createRoot`** 를 쓰고 있습니다. 좋은 선택입니다(아래 2단계 참고).
- 화면이 만들어지는 방식(명령형 → 선언형)을 한 문장으로 요약하면 이렇습니다.
  **"DOM을 직접 고치지 말고, state를 바꾸면 React가 화면을 다시 그린다."**

### 복습 포인트

- 단계를 하나 끝낼 때마다 "**이번 파일에서 새로 생긴 줄**"만 소리 내어 설명할 수 있으면 통과입니다.
- 💼 강의 코드는 학습용이라 일부러 단순하게 만들어졌습니다. 각 단계의 💼 항목은 "왜 실무 코드는 다르게 생겼는지"를 미리 알려 주는 것이지, 강의 코드를 틀렸다고 보는 것이 아닙니다.

---

## 학습 로드맵

| 단계 | 파일 | 새로 배우는 것 | 💼 실무 키워드 |
|---|---|---|---|
| 1 | `2-setup`, `4-vanilla-js` | 정적 HTML 뼈대, DOM 직접 조작 | 명령형 vs 선언형 |
| 2 | `6-react-tasting`, `7-jsx`, `8-jsx-quiz-answer` | React 로딩, JSX, 화면에 그리기 | `createRoot`, 빌드 도구 |
| 3 | `9-what-is-component`, `10-making-component`, `11-component-quiz-answer` | 컴포넌트, props, children | PascalCase, 구조 분해 |
| 4 | `12-styling` | `className`, `style` 객체 | CSS 클래스 우선 |
| 5 | `13-event` | `onClick`, `onSubmit`, `preventDefault` | 함수 "전달" vs "호출" |
| 6 | `14-state`, `15-lifting-state-up`, `16-state-quiz-answer` | `useState`, state 끌어올리기 | 단방향 데이터 흐름 |
| 7 | `17-list`, `18-state-prop-event-list` | `map`, `key`, 배열 state | 불변성, 안정적인 key |
| 8 | `19-form`, `20-form-validation` | 제어 컴포넌트, 유효성 검사 | 입력 중 + 제출 시 검증 |
| 9 | `21-code-cleanup` | props 이름 규칙, early return | `onX` / `handleX` |
| 10 | `22-localstorage-1`, `23-localstorage-2` | localStorage, JSON 저장 | 저장 로직 한곳에 모으기 |
| 11 | `28-api`, `29-useEffect` | `fetch`, `async/await`, `useEffect` | 에러 처리, cleanup |
| 12 | `31-conditional-rendering`, `32-conditional-rendering-quiz` | 조건부 렌더링, 파생 값 | `&&`와 숫자 0 함정 |
| 13 | `33-setState-deep-dive` | 지연 초기화, 함수형 업데이트 | 업데이트 함수는 순수하게 |
| 14 | `cat-jjal-maker-cra/` | 파일 분리, `import/export`, 빌드/배포 | Vite, 폴더 구조 |

---

## 1단계 · HTML 뼈대와 순수 JS — `2-setup.html`, `4-vanilla-js.html`

### 핵심 요약

- `2-setup`: 앞으로 만들 화면의 **정적인 완성본**입니다. 제목(`h1`), 대사 입력 폼, 메인 고양이 카드(이미지 + 🤍 버튼), 즐겨찾기 목록(`ul.favorites`)으로 이루어져 있습니다. 이 4개 덩어리가 나중에 그대로 **컴포넌트 4개**가 됩니다.
- `4-vanilla-js`: 하트를 누르면 ① 버튼을 찾고 → ② 이벤트를 걸고 → ③ 하트를 바꾸고 → ④~⑧ `li`와 `img`를 만들어 붙입니다. 이 8단계를 전부 **직접 지시**하는 것이 **명령형(imperative)** 방식입니다.
- 이 방식의 문제는 "지금 즐겨찾기가 몇 개인가?" 같은 **데이터가 DOM 안에 흩어져** 있다는 것입니다. 화면이 커질수록 데이터와 화면이 서로 어긋나기 쉽습니다.
- React는 **선언형(declarative)** 입니다. "데이터(state)가 이렇다면 화면은 이렇게 생겼다"만 적어 두면, DOM을 고치는 일은 React가 합니다.

### 복습 포인트

- `4-vanilla-js`는 하트를 누를 때마다 **같은 고양이를 계속 추가**합니다(중복 검사 없음). 이 문제는 31단계까지도 남아 있고, 마지막의 실무형 완성본에서 해결합니다.
- 스스로 물어보기: "명령형과 선언형의 차이를 이 프로젝트의 하트 버튼으로 설명할 수 있나?"

---

## 2단계 · React 맛보기와 JSX — `6-react-tasting.html`, `7-jsx.html`, `8-jsx-quiz-answer.html`

### 핵심 요약

- `<script>` 3개의 역할:
  - `react`: 컴포넌트·훅 같은 **React의 핵심**
  - `react-dom`: 만든 화면을 **브라우저 DOM에 그리는** 역할
  - `babel-standalone`: 브라우저가 모르는 **JSX를 일반 JS로 변환** (`<script type="text/babel">` 안의 코드만 변환)
- **JSX는 HTML이 아니라 JS 표현식**입니다. 내부적으로 `React.createElement(...)` 호출로 바뀝니다. 그래서 `const catItem = (<li>...</li>)`처럼 **변수에 담을 수 있고**, `{catItem}`처럼 중괄호로 다른 JSX 안에 끼워 넣을 수 있습니다(7·8번).
- JSX 기본 규칙
  - 최상위는 **하나의 부모**로 감싸기 (`<div>...</div>`)
  - 모든 태그는 **닫기** (`<img />`, `<input />`)
  - `{}` 안에는 **값이 되는 표현식만** 넣기 (변수, 함수 호출, 삼항 연산자 O / `if`, `for` 문 X)
- 화면에 그리는 API는 React 버전에 따라 다릅니다.

| 버전 | 코드 | 상태 |
|---|---|---|
| React 17 (강의 파일) | `ReactDOM.render(<App />, rootElement)` | React 18에서 경고, **React 19에서 제거됨** |
| React 18 이상 (현재 `index.html`) | `ReactDOM.createRoot(rootElement).render(<App />)` | 현재 표준 |

### 복습 포인트

- 7~11번은 JSX에 `class="favorites"`를 쓰는데, JSX에서는 `className`이 맞습니다. 그대로 두면 콘솔에 경고가 뜨고, 12단계에서 고칩니다. (`class`는 JS의 예약어이기 때문입니다.)
- 💼 `babel-standalone`처럼 **브라우저에서 매번 변환하는 방식은 학습용**입니다. 실무에서는 Vite 같은 빌드 도구가 미리 변환합니다(14단계).
- 💼 강의의 `babel-standalone@6`은 오래된 버전이라 `??`, `?.`, Fragment 단축 문법 `<>` 같은 최신 문법을 처리하지 못할 수 있습니다. HTML 파일로 계속 실습한다면 `@babel/standalone`(v7)으로 바꾸는 편이 안전합니다. 또한 React 19부터는 이런 `<script>`용(UMD) 빌드가 제공되지 않으므로, 이 실습 방식은 **React 18까지만** 쓸 수 있습니다.
- 💼 `const 여기다가그려 = ...`처럼 한글 변수명도 동작은 하지만, 실무 코드에서는 `rootElement`처럼 영어 이름을 씁니다.

---

## 3단계 · 컴포넌트와 props — `9-what-is-component.html`, `10-making-component.html`, `11-component-quiz-answer.html`

### 핵심 요약

- **컴포넌트 = props를 받아서 JSX를 돌려주는 함수**입니다. 9번은 일반 함수 `sayHello(name)`와 나란히 놓고 이 점을 보여 줍니다.
- 9번의 `Card("리액트 짱", "...")`는 "함수 호출" 형태이고, 주석에 있는 `<Card title="..." description="..." />`가 **React에서 쓰는 올바른 형태**입니다. 인자는 **props 객체 하나**로 들어옵니다.
- 10번에서 화면 덩어리들이 컴포넌트가 됩니다: `Title`, `CatItem`, `Favorites`, `MainCard`.
  - `props.children`: 여는 태그와 닫는 태그 **사이에 넣은 내용**입니다(`<Title>1번째 고양이 가라사대</Title>`).
  - `props.img`: 속성으로 넘긴 값입니다(`<CatItem img="..." />`).
- 11번(퀴즈 답): `Form`도 컴포넌트로 만들고, `MainCard`가 이미지를 props로 받도록 바꿉니다. 이때 **구조 분해** `({ img }) => ...`를 써서 `props.img` 대신 `img`로 바로 씁니다.
- 컴포넌트 이름은 반드시 **대문자로 시작**해야 합니다. 소문자로 시작하면(`<card />`) React가 HTML 태그로 착각합니다.

```jsx
function Card({ title, description }) {
  return (
    <div>
      <h2>{title}</h2>
      {description}
    </div>
  );
}
const s2 = <Card title="리액트 짱" description="리액트 입니다" />;
```

### 복습 포인트

- 함수 선언(`function CatItem(props)`)과 화살표 함수(`const MainCard = ({ img }) => ...`)는 컴포넌트로서 똑같이 동작합니다. 💼 팀에서 **한 가지 스타일로 통일**하는 것이 중요합니다.
- 💼 컴포넌트를 `Card(...)`처럼 직접 호출하면, 나중에 그 안에서 `useState` 같은 훅을 쓸 때 문제가 생깁니다(호출한 쪽 컴포넌트의 훅으로 취급됨). 항상 `<Card />` 형태로 쓰세요.
- 💼 "컴포넌트 하나 = 역할 하나". 이름만 보고 무엇을 하는지 알 수 있으면 잘 나눈 것입니다.

---

## 4단계 · 스타일링 — `12-styling.html`

### 핵심 요약

- `class` → **`className`** 으로 수정합니다.
- 인라인 스타일은 **객체**로 씁니다: `style={{ width: "150px" }}`
  - 바깥 `{}` = "여기서부터 JS 표현식", 안쪽 `{}` = **JS 객체 리터럴**
  - CSS 속성 이름은 camelCase로 씁니다 (`background-color` → `backgroundColor`).
  - 숫자만 쓰면 px로 처리되는 속성도 많습니다 (`{ width: 150 }`).

### 복습 포인트

- 💼 고정된 스타일은 CSS 클래스(`<style>`, CSS 파일, CSS Modules, Tailwind 등)에 두고, 인라인 `style`은 **값이 state에 따라 바뀌는 경우**에 주로 씁니다. 인라인 스타일은 재사용이 어렵고 `:hover` 같은 상태 선택자도 쓸 수 없습니다.

---

## 5단계 · 이벤트 — `13-event.html`

### 핵심 요약

- 이벤트 속성은 camelCase로 씁니다: `onClick`, `onSubmit`, `onMouseOver`
- 이벤트 속성에는 **함수 자체를 전달**합니다. 호출 결과를 넣으면 안 됩니다.
- `event.preventDefault()`: 폼을 제출하면 페이지가 **새로고침되는 브라우저 기본 동작**을 막습니다. 이 줄이 없으면 state가 전부 초기화됩니다.
- 이벤트 처리 함수는 `handle + 대상 + 이벤트` 형태로 이름을 짓습니다(`handleHeartClick`, `handleFormSubmit`).

```jsx
function S1({ handleClick }) {
  return (
    <div>
      <button onClick={handleClick}>✅ 클릭할 때 실행</button>
      <button onClick={handleClick()}>❌ 렌더링될 때 바로 실행</button>
      <button onClick={() => handleClick("인자")}>✅ 인자가 필요하면 화살표 함수로 감싸기</button>
    </div>
  );
}
```

### 복습 포인트

- 초보자가 가장 많이 하는 실수가 `onClick={handleClick()}` 입니다. 이렇게 쓰면 **화면을 그리는 순간** 함수가 실행되고, 그 안에서 state를 바꾸면 무한 렌더링이 일어날 수 있습니다.
- `preventDefault()`를 빼고 제출해 보세요. 콘솔 로그가 순간 떴다가 사라지는 것으로 새로고침을 확인할 수 있습니다.

---

## 6단계 · state와 끌어올리기 — `14-state.html`, `15-lifting-state-up.html`, `16-state-quiz-answer.html`

### 핵심 요약

- `const [counter, setCounter] = React.useState(1);`
  - `counter`: 지금 렌더링에서의 값
  - `setCounter`: 값을 바꾸고 **컴포넌트를 다시 실행(리렌더링)하도록 요청**하는 함수
  - `1`: 처음 한 번만 쓰이는 초기값
- 일반 변수(`let counter = 1`)로는 안 되는 이유: ① 값을 바꿔도 React가 다시 그리지 않고 ② 컴포넌트 함수가 다시 실행될 때마다 1로 초기화됩니다.
- 14번의 `console.log("카운터", counter)`는 **제출할 때마다 다시 찍힙니다**. "state가 바뀌면 컴포넌트 함수 전체가 다시 실행된다"를 눈으로 확인하는 장치입니다.
- 15번 **state 끌어올리기(lifting state up)**: `Title`도 `counter`가 필요해졌습니다. 형제 컴포넌트끼리는 데이터를 직접 주고받을 수 없으므로, state를 **공통 부모(`App`)로 옮기고** 다음처럼 나눕니다.
  - 데이터는 props로 **내려보내고**: `<Title>{counter}번째 ...</Title>`
  - 바꾸는 함수도 props로 내려보내 자식이 **이벤트로 알려 주게** 합니다: `<Form handleFormSubmit={handleFormSubmit} />`
- 16번: `mainCat` state를 추가해서, 제출하면 메인 고양이가 `CAT2`로 바뀝니다. **state는 여러 개 둘 수 있습니다.**

```text
              App  ← state: counter, mainCat (그리고 18단계부터 favorites)
   ┌───────────┼────────────┬──────────────┐
   ▼ props     ▼ props      ▼ props        ▼ props
 Title        Form        MainCard      Favorites
              │ ↑ 제출      │ ↑ 하트 클릭    └─ CatItem × n
              └─ 이벤트는 함수 호출로 위로 올라감
```

### 복습 포인트

- `setCounter(counter + 1)` 직후에 `console.log(counter)`를 찍으면 **아직 이전 값**이 나옵니다. set 함수는 값을 즉시 바꾸는 것이 아니라 "다음 렌더링에 쓸 값"을 **예약**합니다.
- 그래서 `setCounter(counter + 1)`을 한 함수 안에서 두 번 불러도 결과는 +1입니다. 직접 실행해 보면 `counter + 1` 방식은 2, `prev => prev + 1` 방식은 3이 나옵니다. 이 차이는 13단계에서 다시 다룹니다.
- 💼 state는 **그 값을 필요로 하는 컴포넌트들의 가장 가까운 공통 부모**에 둡니다. 무조건 최상위로 올리면 관계없는 컴포넌트까지 다시 렌더링됩니다.
- 💼 `CAT1`처럼 변하지 않는 상수를 `App` 안에 선언하면 렌더링할 때마다 다시 만들어집니다. **컴포넌트 밖**으로 빼는 것이 좋습니다(`resources/utils.js`가 이미 그렇게 정리되어 있습니다).

```jsx
const CAT_URL = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
const S6 = () => {
  const [mainCat, setMainCat] = React.useState(CAT_URL);
  return <img src={mainCat} alt="고양이" />;
};
```

---

## 7단계 · 리스트와 key — `17-list.html`, `18-state-prop-event-list.html`

### 핵심 요약

- 17번: 배열 → JSX 배열로 바꾸는 `map`을 씁니다.
  `{cats.map((cat) => <CatItem img={cat} key={cat} />)}`
- **`key`** 는 React가 목록에서 "어떤 항목이 추가·삭제·이동되었는지" 알아보는 **이름표**입니다. 형제 사이에서 **유일하고, 렌더링이 바뀌어도 그대로 유지되는 값**이어야 합니다.
- 18번: 즐겨찾기 배열을 **state**(`favorites`)로 만들고 `Favorites`에 props로 넘깁니다. 하트 클릭 처리도 `App`으로 올립니다(이벤트는 위로, 데이터는 아래로).
- 배열 state는 **새 배열로 바꿔야** 합니다: `setFavorites([...favorites, CAT3])`

```jsx
function S7() {
  const [favorites, setFavorites] = React.useState([]);
  function bad(cat) {
    favorites.push(cat);
    setFavorites(favorites);
  }
  function good(cat) {
    setFavorites([...favorites, cat]);
  }
  return null;
}
```

### 복습 포인트

- `bad`가 왜 안 될까요? `push`는 **같은 배열**을 고치므로 React가 "이전 값과 같다(같은 참조)"고 판단해 다시 그리지 않을 수 있습니다. 스프레드(`[...a, b]`)는 **새 배열**을 만듭니다.
- 18번에서 하트를 두 번 누르면 `CAT3`이 두 번 들어가 **key가 중복**되고, 콘솔에 "same key" 경고가 뜹니다. key로 쓰는 값은 정말 유일해야 합니다.
- 💼 배열 인덱스(`key={index}`)는 항목이 삭제되거나 순서가 바뀌는 목록에서 버그를 만듭니다. 실무에서는 서버가 주는 `id`처럼 **안정적인 고유값**을 씁니다.

---

## 8단계 · 폼 다루기 — `19-form.html`, `20-form-validation.html`

### 핵심 요약

- **제어 컴포넌트(controlled component)**: input의 값을 state가 "쥐고" 있게 만드는 방식입니다.
  - `value={value}`: 화면에 보이는 값은 항상 state
  - `onChange={handleInputChange}`: 입력할 때마다 state 갱신
  - 덕분에 `toUpperCase()`처럼 **입력값을 가공**해서 보여 줄 수 있습니다(19번: 입력하면 자동으로 대문자로 바뀜).
- 20번 유효성 검사:
  - `errorMessage` state를 하나 두고, `<p style={{ color: "red" }}>{errorMessage}</p>`로 보여 줍니다.
  - 입력 중: 한글이 들어오면 에러 메시지를 띄웁니다.
  - 제출 시: 빈 값이면 에러 메시지를 띄웁니다.
- 20번에서 `Form`이 검사를 직접 하게 되면서 `App`이 넘겨주는 `handleFormSubmit`을 **받지 않습니다**. 그래서 20번에서는 제출해도 고양이가 바뀌지 않으며, 이 문제는 21단계에서 해결됩니다.

### 복습 포인트

- `value`만 주고 `onChange`를 빼면 **입력이 되지 않습니다**(읽기 전용 경고). 두 속성은 항상 짝으로 씁니다.
- ⚠️ 강의의 한글 검사 정규식 `/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i`에는 버그가 있습니다. 대괄호(문자 클래스) 안의 `|`는 "또는"이 아니라 **파이프 문자 그 자체**로 처리됩니다. 그래서 `"a|b"`를 넣어도 한글이 들어온 것으로 판정합니다(실행해서 확인). 올바른 식은 `/[ㄱ-ㅎㅏ-ㅣ가-힣]/` 이고, 한글에는 대소문자가 없으므로 `i` 플래그도 필요 없습니다.
- ⚠️ 입력 중에 한글 경고가 떠도 **제출은 그대로 진행**됩니다(제출할 때는 빈 값만 검사). 💼 실무에서는 **입력 중 검사(친절한 안내) + 제출 시 검사(최종 차단)** 를 둘 다 하고, 중요한 값은 서버에서도 다시 검사합니다.

---

## 9단계 · 코드 정리 — `21-code-cleanup.html`

### 핵심 요약

- 이름 규칙을 정리합니다.
  - 부모가 자식에게 넘기는 **콜백 props**: `onX` (`onHeartClick`)
  - 컴포넌트 안에서 이벤트를 **처리하는 함수**: `handleX` (`handleHeartClick`)
  - 그래서 `<MainCard onHeartClick={handleHeartClick} />` 형태가 됩니다.
- `Form`은 검사가 통과했을 때만 `updateMainCat()`을 호출합니다. 실패하면 `return`으로 **일찍 빠져나갑니다(early return)**.
- 디버깅용 `console.log`를 지웁니다.

### 복습 포인트

- `onClick`, `onSubmit`처럼 React 내장 이벤트도 `on` 접두사를 씁니다. 내가 만든 컴포넌트의 콜백 props도 같은 규칙을 따르면 **HTML 태그처럼 자연스럽게 읽힙니다**.
- 💼 `Form`은 "제출됐다(값은 이것)"만 알리고, **그 값으로 무엇을 할지는 부모가 결정**하게 만들면 재사용하기 좋습니다. 그래서 완성본에서는 `updateMainCat` 대신 더 일반적인 `onSubmit`이라는 이름을 씁니다.

---

## 10단계 · localStorage로 기억하기 — `22-localstorage-1.html`, `23-localstorage-2.html`

### 핵심 요약

- `localStorage`는 새로고침해도 남는 브라우저 저장소이며, **문자열만** 저장합니다.
- 22번: `Number(localStorage.getItem("counter"))`로 숫자로 바꿔서 읽습니다. 처음에는 저장된 값이 없어서 `getItem`이 `null`을 돌려주고, `Number(null)`은 `0`이므로 제목이 **"0번째"** 부터 시작합니다.
- 23번: `jsonLocalStorage` 래퍼를 만듭니다. `JSON.stringify`로 저장하고 `JSON.parse`로 읽기 때문에 **숫자·배열도 원래 타입 그대로** 저장할 수 있습니다.
  - `favorites`도 저장하고, 저장된 값이 없으면 `|| []`로 빈 배열에서 시작합니다.
  - 하트를 누르면 이제 `CAT3`이 아니라 **현재 메인 고양이(`mainCat`)** 를 저장합니다.
- 패턴: "다음 값을 먼저 계산 → state에 넣기 → 저장소에도 넣기"
  `const nextCounter = counter + 1; setCounter(nextCounter); jsonLocalStorage.setItem("counter", nextCounter);`

### 복습 포인트

- 23번에서 처음 실행하면 `JSON.parse(null)`이 `null`이라 `counter`가 `null`이 됩니다. 그래도 `null + 1`이 `1`이 되는 JS의 **암묵적 형변환** 덕분에 우연히 동작합니다(실행해서 확인). 이 `null`은 32단계에서 처리합니다.
- 💼 "state 바꾸기 + 저장하기"를 매번 두 줄씩 쓰면 **한쪽을 빠뜨리기 쉽습니다**. 실무에서는 `useEffect`나 커스텀 훅으로 저장 로직을 **한곳에** 모읍니다(완성본의 `useLocalStorageState`).
- 💼 사용자가 개발자 도구에서 값을 망가뜨리면 `JSON.parse`가 예외를 던져 **앱 전체가 멈춥니다**. 저장소에서 읽는 코드는 `try/catch`로 감쌉니다.
- 23번의 `useState(jsonLocalStorage.getItem(...))`는 **렌더링할 때마다** localStorage를 읽습니다. 13단계의 지연 초기화로 해결합니다.

---

## 11단계 · API 호출과 useEffect — `28-api.html`, `29-useEffect.html`

### 핵심 요약

- `fetchCat(text)`: 입력한 대사로 고양이 이미지 URL을 받아오는 `async` 함수입니다. `await fetch(...)` → `await response.json()` 순서로 진행합니다.
  - 이 함수가 **컴포넌트 밖**에 있는 것은 좋은 습관입니다. 화면과 상관없는 로직은 분리해 둡니다.
- `updateMainCat`도 `async`가 되고, `Form`은 입력값을 넘겨줍니다(`updateMainCat(value)`).
- 28번 파일에는 API 스펙이 바뀐 흔적(주석 처리된 코드, 다른 도메인)이 남아 있어 그대로 실행하면 고양이가 나오지 않을 수 있습니다. **`fetchCat`은 29번(cataas) 버전 기준으로** 보세요.
- 29번 **`useEffect`**: 렌더링이 끝난 **뒤에** 실행할 일(API 호출, 구독, 저장 등 "부수 효과")을 등록합니다.

| 의존성 배열 | 실행 시점 |
|---|---|
| 생략 | 렌더링될 때마다 |
| `[]` | 처음 화면에 나타날 때(마운트) 한 번 |
| `[a, b]` | 처음 한 번 + `a`나 `b`가 바뀔 때마다 |

- 29번은 `[]`를 써서 앱이 처음 열릴 때 "First cat" 고양이를 한 번 불러옵니다.

```jsx
function S4() {
  // ❌ effect 함수 자체를 async로
  React.useEffect(async () => {
    await fetchCat("First cat");
  }, []);

  // ✅ 안에서 async 함수를 만들어 호출
  React.useEffect(() => {
    async function setInitialCat() {
      const newCat = await fetchCat("First cat");
      setMainCat(newCat);
    }
    setInitialCat();
  }, []);
  return null;
}
```

### 복습 포인트

- 위 예시의 첫 번째(❌)처럼 effect 함수 자체를 `async`로 만들면 안 됩니다. effect는 "정리(cleanup) 함수"나 아무것도 돌려주지 않아야 하는데, `async` 함수는 항상 Promise를 돌려주기 때문입니다. 두 번째(✅)처럼 **안에서 async 함수를 만들어 호출**합니다(29번이 이 방식).
- ⚠️ 강의 코드에는 **에러 처리가 없습니다**. 네트워크가 끊기거나 서버가 404/500을 주면 조용히 실패합니다. 💼 `response.ok`를 확인하고 `try/catch`로 사용자에게 알려야 합니다.
- ⚠️ 입력값을 URL에 그대로 넣으면 `/`, `?`, `#` 같은 문자가 URL 구조를 깨뜨립니다. 💼 `encodeURIComponent(text)`로 감싸세요. 예를 들어 `"HI/THERE?#"`는 `HI%2FTHERE%3F%23`로 바뀝니다(실행해서 확인).
- 💼 개발 모드의 `<React.StrictMode>`는 버그를 찾기 위해 effect를 **일부러 두 번** 실행합니다(CRA의 `index.js`가 StrictMode를 씁니다). 그래서 effect에는 **cleanup**을 두어, 화면에서 사라진 뒤 도착한 응답은 무시하게 합니다(완성본의 `ignore` 플래그).
- 💼 실무에서는 로딩/에러/캐시를 직접 관리하는 대신 TanStack Query 같은 데이터 패칭 라이브러리나 프레임워크 기능을 많이 씁니다. 그래도 **원리는 이 단계의 `useEffect` + `fetch`** 입니다.

---

## 12단계 · 조건부 렌더링 — `31-conditional-rendering.html`, `32-conditional-rendering-quiz.html`

### 핵심 요약

- 조건에 따라 다른 화면을 보여 주는 세 가지 방법:
  1. **early return**: `Favorites`에서 `favorites.length === 0`이면 안내 문구를 먼저 반환합니다.
  2. **삼항 연산자**: `const heartIcon = alreadyFavorite ? "💖" : "🤍";`
  3. **`&&`**: 조건이 참일 때만 보여 줍니다(아래 함정 주의).
- **파생 값(derived value)**: `const alreadyFavorite = favorites.includes(mainCat);`
  이미 있는 state로 **계산할 수 있는 값은 state로 만들지 않고**, 렌더링할 때마다 계산합니다.
- 32번(퀴즈): `counter`가 `null`(처음 방문)이면 "N번째"를 빼고 **"고양이 가라사대"** 만 보여 줍니다.
  `const counterTitle = counter === null ? "" : counter + "번째 ";`

```jsx
function S3({ favorites }) {
  return (
    <div>
      {favorites.length && <p>저장한 고양이가 있어요</p>}
      {favorites.length > 0 && <p>저장한 고양이가 있어요</p>}
    </div>
  );
}
```

### 복습 포인트

- ⚠️ `&&` 함정: `favorites.length`가 `0`이면 `0 && ...`의 결과는 `0`이고, **React는 숫자 0을 화면에 그대로 그립니다**. 그래서 `length > 0 &&`처럼 **진짜 불리언**으로 비교하세요(`0 && "x"`가 `0`을 돌려주는 것은 실행해서 확인).
- ⚠️ 하트가 💖로 바뀌어도 **다시 누르면 같은 고양이가 또 추가**되고 key 중복 경고가 뜹니다. 💼 이미 저장된 경우에는 아무것도 하지 않거나(가드) 저장을 취소하는(토글) 처리가 필요합니다.
- 💼 `alreadyFavorite`를 `useState`로 따로 관리하면, `favorites`가 바뀔 때마다 같이 바꿔 줘야 하고 **둘이 어긋나는 버그**가 생깁니다. "계산할 수 있으면 state가 아니다"를 기억하세요.

---

## 13단계 · setState 깊이 보기 — `33-setState-deep-dive.html`

### 핵심 요약

- **지연 초기화(lazy initial state)**: `useState(() => 초기값계산())`
  함수를 넘기면 React가 **첫 렌더링 때 한 번만** 호출합니다. localStorage 읽기처럼 비용이 드는 초기값에 씁니다.

```jsx
function S8() {
  const [a] = React.useState(jsonLocalStorage.getItem("favorites") || []);
  const [b] = React.useState(() => jsonLocalStorage.getItem("favorites") || []);
  return null;
}
```

- `a`: `getItem`이 **렌더링할 때마다** 실행됩니다(결과는 처음 것만 쓰고 나머지는 버려짐).
- `b`: 첫 렌더링 때 **한 번만** 실행됩니다.
- **함수형 업데이트**: `setCounter((prev) => prev + 1)`
  - `updateMainCat`은 `await fetchCat(...)`으로 **기다리는 동안** 다른 렌더링이 일어날 수 있습니다. 하지만 함수 안의 `counter`는 함수가 시작될 때의 값으로 **고정(클로저)** 되어 있어서 오래된 값일 수 있습니다.
  - `prev`는 React가 넘겨주는 **가장 최신 값**이므로 항상 안전합니다.
  - 6단계에서 본 "두 번 호출하면 2 vs 3"이 바로 이 차이입니다.

### 복습 포인트

- ⚠️ 33번은 업데이트 함수 **안에서** `jsonLocalStorage.setItem`을 호출합니다. 업데이트 함수는 **순수 함수(계산만 하는 함수)** 여야 합니다. StrictMode 개발 모드에서는 업데이트 함수도 **두 번** 호출됩니다. 여기서는 같은 값을 두 번 저장할 뿐이라 티가 나지 않지만, 좋은 습관은 아닙니다. 💼 저장은 `useEffect`로 분리합니다.

```jsx
function S5() {
  const [counter, setCounter] = React.useState(0);

  function bad() {
    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function good() {
    setCounter((prev) => prev + 1);
  }
  React.useEffect(() => {
    jsonLocalStorage.setItem("counter", counter);
  }, [counter]);
  return null;
}
```

- 💼 규칙 하나로 정리하면: **"다음 값이 이전 값에 따라 결정되면 함수형 업데이트를 쓴다."** `favorites`도 `setFavorites((prev) => [...prev, mainCat])`로 쓰는 것이 일관됩니다.

---

## 14단계 · 진짜 프로젝트로 — `answers/cat-jjal-maker-cra/`

### 핵심 요약

- 하나의 HTML 파일에 있던 코드를 **파일 단위로 나눕니다**.
  - `src/components/Title.js`: `export default Title;`
  - `src/App.js`: `import Title from "./components/Title";`
  - `src/index.js`: `<React.StrictMode><App /></React.StrictMode>`를 `#root`에 렌더링
- `package.json`의 scripts:
  - `npm start`: 개발 서버
  - `npm run build`: 배포용 파일 생성
  - `npm run deploy`: `gh-pages`로 GitHub Pages에 배포
- 빌드 도구가 JSX를 **미리** 변환하므로 브라우저에서 Babel이 필요 없고, 속도가 빠르고, 에러도 일찍 발견됩니다.

### 복습 포인트

- 💼 Create React App(CRA)은 2025년에 공식적으로 지원이 종료(deprecated)되었습니다. 새 프로젝트는 **Vite**(가벼운 SPA)나 Next.js 같은 프레임워크로 시작합니다.

```bash
npm create vite@latest cat-jjal-maker -- --template react
```

- 💼 실무형 폴더 구조 예시(정답은 아니고 출발점입니다):

```text
src/
  api/cat.js                  ← fetchCat (네트워크)
  utils/storage.js            ← jsonLocalStorage
  utils/validation.js         ← includesHangul
  hooks/useLocalStorageState.js
  components/Title.jsx, Form.jsx, MainCard.jsx, Favorites.jsx
  App.jsx
```

- 💼 ESLint의 `react-hooks` 규칙을 켜 두면 `useEffect` 의존성 배열 실수를 자동으로 잡아 줍니다(CRA의 `eslintConfig`가 이미 포함하고 있습니다).

---

## 실무형 리팩터링 완성본

33번(최종 강의 코드)을 기준으로, 위에서 짚은 문제들을 고친 버전입니다. 지금 쓰는 `index.html`(React 18 + Babel)의 `<script type="text/babel">` 안에 그대로 넣어 실습할 수 있도록 **`??`, `?.`, `<>` 없이** 작성했습니다.

> 검증 범위: TypeScript 컴파일러(`tsc`)로 **JSX 문법 검사만** 통과했습니다. 실제 화면 동작은 외부 API(cataas.com)에 의존하므로 실행 결과는 확인하지 않았습니다. API 응답 형식(`_id`)은 강의 29번 코드를 따랐으며, API가 바뀌면 이 부분을 수정해야 합니다.

| 강의 코드의 문제 | 완성본에서 바꾼 점 |
|---|---|
| 정규식 안의 `\|` 버그 | `/[ㄱ-ㅎㅏ-ㅣ가-힣]/` |
| 한글이 있어도 제출됨 | 제출할 때도 한글 검사 |
| API 실패 시 조용히 멈춤 | `response.ok` 확인 + `Form`에서 에러 메시지 표시 |
| 대사의 특수문자가 URL을 깨뜨림 | `encodeURIComponent` |
| state + 저장 코드가 두 줄씩 중복 | `useLocalStorageState` 커스텀 훅 + `useEffect`로 동기화 |
| 깨진 localStorage 값으로 앱이 멈춤 | `getItem`에 `try/catch` |
| 같은 고양이를 중복 저장 → key 중복 | `alreadyFavorite`면 저장하지 않음 |
| 오래된 `counter` 값을 쓸 위험 | `setCounter((prev) => prev + 1)` |
| StrictMode에서 effect 두 번 실행 | cleanup의 `ignore` 플래그 |
| 상수가 컴포넌트 안에 있음 | 컴포넌트 밖으로 이동 |
| `img`에 `alt` 없음, 하트 버튼이 이모지뿐 | `alt`, `aria-label` 추가 (접근성) |
| `counter`가 `null`일 수 있음 | 초기값 `0`으로 통일 |

```jsx
// ─────────────────────────────────────────────
// 1) 컴포넌트 바깥: 렌더링과 상관없는 상수 · 순수 함수
// ─────────────────────────────────────────────
const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";
const OPEN_API_DOMAIN = "https://cataas.com";

const includesHangul = (text) => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text);

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      return null; // 저장된 값이 깨져 있어도 앱이 죽지 않게
    }
  },
};

const fetchCat = async (text) => {
  const encodedText = encodeURIComponent(text);
  const response = await fetch(
    `${OPEN_API_DOMAIN}/cat/says/${encodedText}?json=true`
  );
  if (!response.ok) {
    throw new Error("고양이를 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
  }
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/cat/${responseJson._id}/says/${encodedText}`;
};

// ─────────────────────────────────────────────
// 2) 커스텀 훅: "state + localStorage 동기화"를 한 곳에
// ─────────────────────────────────────────────
function useLocalStorageState(key, initialValue) {
  const [value, setValue] = React.useState(() => {
    const saved = jsonLocalStorage.getItem(key);
    return saved !== null ? saved : initialValue;
  });

  React.useEffect(() => {
    jsonLocalStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}

// ─────────────────────────────────────────────
// 3) 화면 조각(컴포넌트): props를 받아 JSX를 돌려줄 뿐
// ─────────────────────────────────────────────
const Title = ({ children }) => {
  return <h1>{children}</h1>;
};

const Form = ({ onSubmit }) => {
  const [value, setValue] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function handleInputChange(e) {
    const userValue = e.target.value;
    setErrorMessage(includesHangul(userValue) ? "한글은 입력할 수 없습니다." : "");
    setValue(userValue.toUpperCase());
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (value === "") {
      setErrorMessage("빈 값으로 만들 수 없습니다.");
      return;
    }
    if (includesHangul(value)) {
      setErrorMessage("한글은 입력할 수 없습니다.");
      return;
    }
    setErrorMessage("");
    try {
      await onSubmit(value);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="name"
        placeholder="영어 대사를 입력해주세요"
        value={value}
        onChange={handleInputChange}
      />
      <button type="submit">생성</button>
      <p style={{ color: "red" }}>{errorMessage}</p>
    </form>
  );
};

const MainCard = ({ img, onHeartClick, alreadyFavorite }) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";
  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="400" />
      <button
        onClick={onHeartClick}
        aria-label={alreadyFavorite ? "이미 저장한 고양이" : "고양이 저장하기"}
      >
        {heartIcon}
      </button>
    </div>
  );
};

const CatItem = ({ img }) => {
  return (
    <li>
      <img src={img} alt="저장한 고양이" style={{ width: "150px" }} />
    </li>
  );
};

const Favorites = ({ favorites }) => {
  if (favorites.length === 0) {
    return <div>사진 위 하트를 눌러 고양이 사진을 저장해봐요!</div>;
  }
  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
};

// ─────────────────────────────────────────────
// 4) App: state를 소유하고, 데이터(props)는 내려보내고, 이벤트는 올려받는다
// ─────────────────────────────────────────────
const App = () => {
  const [counter, setCounter] = useLocalStorageState("counter", 0);
  const [favorites, setFavorites] = useLocalStorageState("favorites", []);
  const [mainCat, setMainCat] = React.useState(CAT1);

  // 파생 값: state에서 계산할 수 있으면 state로 만들지 않는다
  const alreadyFavorite = favorites.includes(mainCat);
  const counterTitle = counter === 0 ? "" : counter + "번째 ";

  React.useEffect(() => {
    let ignore = false; // 컴포넌트가 사라진 뒤 도착한 응답은 무시
    fetchCat("First cat")
      .then((newCat) => {
        if (!ignore) setMainCat(newCat);
      })
      .catch((error) => console.error(error));
    return () => {
      ignore = true;
    };
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value); // 실패하면 Form의 catch로 전달됨
    setMainCat(newCat);
    setCounter((prev) => prev + 1);
  }

  function handleHeartClick() {
    if (alreadyFavorite) return; // 중복 저장 → key 중복 경고 방지
    setFavorites((prev) => [...prev, mainCat]);
  }

  return (
    <div>
      <Title>{counterTitle}고양이 가라사대</Title>
      <Form onSubmit={updateMainCat} />
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
};

ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**완성본을 읽는 순서**
1. **1) 컴포넌트 바깥**: React와 상관없는 코드(상수, 검사, 저장소, API)를 먼저 봅니다. 이 부분은 React 없이도 테스트할 수 있습니다.
2. **2) 커스텀 훅**: `useState` + `useEffect`를 묶어 "저장되는 state"라는 **새 도구**를 만들었습니다. 이름이 `use`로 시작하는 함수 = 커스텀 훅입니다.
3. **3) 화면 조각**: 각 컴포넌트는 props를 받아 JSX를 돌려줄 뿐입니다. `Form`만 자기 입력 state를 가집니다.
4. **4) App**: state를 소유하고, **데이터는 내려보내고 이벤트는 올려받는** 조립 역할만 합니다.

---

## 전체 정리

### 핵심 요약

- React의 핵심 공식은 **`화면 = 컴포넌트(state, props)`** 입니다. DOM을 직접 고치지 않고 state를 바꾸면, React가 컴포넌트 함수를 다시 실행해 화면을 갱신합니다(1·6단계).
- **컴포넌트**는 props를 받아 JSX를 돌려주는 대문자 함수이고, **JSX**는 `{}`로 JS 표현식을 끼워 넣는 JS 문법입니다(2·3단계).
- **데이터는 props로 아래로, 이벤트는 콜백(`onX`)으로 위로** 흐릅니다. 여러 컴포넌트가 쓰는 state는 가장 가까운 공통 부모로 끌어올립니다(6·9단계).
- 배열·객체 state는 **새로 만들어서** 바꾸고(불변성), 목록에는 **유일하고 안정적인 `key`** 를 줍니다(7단계).
- 입력은 **제어 컴포넌트**(`value` + `onChange`)로 다루고, 렌더링 밖의 일(API, 저장)은 **`useEffect`** 로 처리합니다(8·11단계).
- **계산할 수 있으면 state가 아니다**(파생 값). **이전 값에 의존하면 함수형 업데이트**, **비싼 초기값은 지연 초기화**를 씁니다(12·13단계).

### 복습 포인트

- `onClick={handleClick}` vs `onClick={handleClick()}`의 차이, `{list.length && ...}`의 0 함정: 둘 다 **눈으로 보면 맞아 보이는** 실수입니다.
- `setX(x + 1)` vs `setX((prev) => prev + 1)`: 한 번에 두 번 호출하면 결과가 2 vs 3. 특히 `await` 뒤에서는 항상 함수형 업데이트를 쓰세요.
- 정규식 문자 클래스 안의 `|`는 파이프 문자 그 자체입니다. 강의 코드라도 **직접 입력해서 검증하는 습관**이 실무 실력입니다.
- 업데이트 함수와 컴포넌트 본문은 **순수하게**: 저장·요청 같은 부수 효과는 이벤트 핸들러나 `useEffect`로 옮깁니다(StrictMode가 두 번 실행하며 찾아내는 바로 그 버그).
- 다음 단계로 직접 해 볼 과제: ① 즐겨찾기 **삭제(토글)** 기능 ② 고양이를 불러오는 동안 **로딩 표시** ③ 위 폴더 구조대로 **Vite 프로젝트로 옮기기**.
