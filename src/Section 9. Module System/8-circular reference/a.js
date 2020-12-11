import { sayHello } from './b.js';
console.log('a.js');
export const NAME = 'mike';
sayHello();

// NAME이라는 변수를 내보내기 전에
// NAME변수를 사용하는 sayHello 함수를 실행하면
// 에러가 발생한다.
// 이런 식으로 순환참조를 할 때 내보내는 순서를 잘못 관리하면
// 에러가 발생할 가능성이 크다.
// sayHello();
// export const NAME = 'mike';