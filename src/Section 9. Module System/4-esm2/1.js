// 아래와 같이 변수 왼쪽에 export 키워드를
// 사용하여 내보낼 수 있고, 
export let v1 = 123;
export const v2 = 'abc';
// 함수도 마찬가지이댜.
export function v3() {}
// 또한 export default 키워드를 사용할 수 있는데
// 하나의 모듈에서 하나의 default를 설정할 수 있다.
export default function sayHello() {
    console.log(`hello~!`);
}