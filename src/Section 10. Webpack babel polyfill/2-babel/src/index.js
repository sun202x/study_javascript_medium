// 바벨(babel)은 입력과 출력이 모두 자바스크립트인 컴파일러이다.
// 초기(2015)에는 자바스크립트 최신 문법을 기존 문법으로 변환해주는
// 용도로 사용됐다.
// 지금은 코드 압축이나 리액트의 JSX처럼 자바스크립트 코드가 아닌 것을
// 자바스크립트 표준 문법으로 변환해주는 용도로 사용되기도 한다.
// babel을 사용하기 위해 역시나 package.json 파일을 만들어 준다.
// npm init -y
// 아래와 같이 입력해서 바벨을 설치해준다.
// npm install @babel/core @babel/cli @babel/plugin-proposal-optional-chaining
// plugin-proposal-optional-chaining은 optional chaining을 위한 플러그인이다.
// 이제 아래와 같이 입력하여 바벨을 실행해 보자.
// npx babel --plugins @babel/plugin-proposal-optional-chaining src/index.js
// 아래와 같이 출력 결과가 나온다.
`
const person = {
    name: 'mike'
};
const age = person === null || person === void 0 ? void 0 : person.age;
`
// 현재는 로그로 출력됐지만 옵션을 사용하면 파일로도 출력할 수 있다.
const person = {
    name: 'mike'
};

const age = person?.age;