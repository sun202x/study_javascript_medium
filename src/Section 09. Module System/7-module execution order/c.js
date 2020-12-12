import { sayHello } from './b.js';
console.log('c.js');
export const sayHello2 = () => {
    sayHello();
    sayHello();
};