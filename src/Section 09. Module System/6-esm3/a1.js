// ESM은 CommonJS와 달리 기본적으로 정적인 모듈 시스템이다.
// 컴파일 타임에 어떤 것을 내보내고 어떤 것을 가져올지 결정이 되어야 한다.
// 아래의 코드는 if 문을 사용하여 동적으로 모듈을 가져오고 있는데,
// 아래 코드를 사용하면 에러가 발생한다.
if (Math.random() < 0.5) {
    import { b1 } from './b.js';
    console.log(b1);
} else {
    import { c1 } from './c.js';
    console.log(c1);
}