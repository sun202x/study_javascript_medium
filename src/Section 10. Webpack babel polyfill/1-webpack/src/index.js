// 1.
// 웹팩(webpack)은 모듈 번들러이다.
// 우리가 모듈방식으로 작성하면
// 웹팩이 배포하기 좋은 형태로 파일을
// 만들어 준다.
// npm init -y
// 위 명령어를 통해 package.json 파일을 생성한다.
// npm install webpack webpack-cli
// 다음 명령어로 웹팩도 설치해준다. webpack-cli도 같이 설치해준다.
// npx webpack
// 위 명령어를 통해 웹팩을 실행해보면 dist 폴더가 생성이 되는 것을 확인할 수 있다.
import './a';

// 3.
// 예를 들어, json 파일을 모듈로 처리할 수 있다.
// json뿐만 아니라 이미지 파일이나 기타 여러가지 파일 포맷을
// 원하는 형태로 자바스크립트의 값으로 처리할 수 있게 해준다.
// 또 다른 웹팩의 좋은 점은 lodash 같은 외부 라이브러리도
// 번들링 파일에 포함시켜 CommonJS를 사용하든 상관하지 않고
// 오래된 브라우저에서 사용할 수 있도록 하게 해준다.
import dat from './data.json';
console.log(data.person);