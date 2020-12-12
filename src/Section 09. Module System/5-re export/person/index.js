// 아래에서 java-dev, python-dev 파일의 모든 것을 내보내고
export * from './programmer/java-dev.js'
export * from './programmer/python-dev.js'
// family 모듈의 haveDinnerTogether 함수를 default로 내보내고 있다.
export { haveDinnerTogether as default } from './family.js';
// 이런 식으로 index.js 파일과 같이 모든 모듈을 관리할 수도 있다.