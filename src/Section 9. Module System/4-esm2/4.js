// import를 사용하는 또 다른 방법은
// 아래와 같은 방식으로 하나의 객체로 가져올 수 있다.
// 이 때 default로 내보내진 것은 default라는 속성이름으로 사용할 수 있다.
// 
import * as myModule from './1.js';

console.log(myModule.v1);
console.log(myModule.v2);
console.log(myModule.v3);
// sayHello가 동작한다.
myModule.default();