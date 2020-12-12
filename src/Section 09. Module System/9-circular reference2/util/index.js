// 이런식으로 한가지 파일에서 모든 모듈의 import를 담당하면
// import 순서 error를 피할 수 있다.
export * from './b.js';
export * from './a.js';