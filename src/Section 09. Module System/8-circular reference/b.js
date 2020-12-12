import { NAME } from './a.js';
console.log('b.js');
export const sayHello = () => {
    console.log('hello~!', NAME);
    // 아래와 같이 사용한다고 생각할 수 있다.
    // console.log('hello~!', aModuleObject.NAME);
};