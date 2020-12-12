// 다른 방식으로 아래와 같이 미리 정의된 변수를
// 하나의 export 안에 모아서 내보낼 수도 있다.
let v1 = 123;
const v2 = 'abc';
function v3() {}

// 이 때 as 키워드를 사용하여 이름을 변경할 수도 있다.
export { v1, v2, v3 as v4 };
export default function sayHello() {
    console.log(`hello~!`);
}