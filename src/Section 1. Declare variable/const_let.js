// cosnt, let은 블록 scope이다.
// 함수 scope의 대부분 단점이 블록 scope에는 없다.
// 대부분의 언어가 블록 scope를 가지기 때문에 다른 언어를 사용했을 경우 더 익숙할 것이다.
if (true) {
    const i = 0; // 이런 식으로 블록 안에서만 변수가 유효하다.
}
console.log(i); // ReferenceError

// 블록 scope를 가지기 때문에 아래처럼 중복으로 변수를 선언한다 해도,
let foo = 'bar1';
console.log(foo); // bar1
if (true) {
    // if 문 안에서는 별 개의 변수로 사용할 수 있다.
    const foo = 'bar2';
    console.log(foo); // bar2
}
console.log(foo); // bar1

// 물론 const, let으로 정의된 변수도 호이스팅이 된다.
// 하지만 변수 정의전에 사용하려 하면 ReferenceError가 발생하게 된다.
// var 키워드와 다른 점은 var 키워드는 hoisting된 후 undefine가 할당되지만,
// const, let은 아무 것도 할당되지 않는다.(메모리 주소가 할당되지 않는다는 말인듯함)
console.log(foo);
const foo = 1;

// 만약 const 변수가 hoisting되지 않았다면
// console.log에는 1이라는 값이 출력됐겠지만,
// 아래 로직을 실행해보면 hoisting 되기 때문에
// ReferenceError가 발생하는 것을 확인할 수 있다.
const foo = 1;
{
    console.log(foo); // 아래 const foo 변수가 hoisting 되어 아무 것도 할당되지 않았다.
    const foo = 2; // 이 코드를 주석처리한다면 에러가 발생하지 않는다.
}

// var 키워드를 사용하여 이전코드 구현하기
var foo = 1;
(function () {
    console.log(foo); // undefined가 출력된다.
    var foo = 2;
})();

// const는 재할당이 불가능하다.
const bar = 'a';
bar = 'b'; // TypeError: Assignment to constant variable.
var foo = 'a';
foo = 'b';
// let은 재할당이 가능하다.
let value = 'a';
value = 'b';

// 재할당이 불가능한 변수는 프로그램의 복잡도를 낮춰주기 때문에
// 되도록이면 재할당 불가능한 변수를 사용하는게 좋다.

// 주의해야할 점은 객체의 property 값은 변경 가능하다.
// 이미 존재하는 property뿐만 아니라 새로운 속성값 추가도 가능하다.
// 내부 속성값도 변경불가능하게 하려면 immer와 같은 외부패키지를 활용하는 것이 좋다.
const bar = { prop1: 'a' };
bar.prop1 = 'b';
bar.prop2 = 123;
console.log(bar);
const arr = [10, 20];
arr[0] = 100;
arr.push(300);
console.log(arr);

// 단지 수정만 불가능하게 하고 싶으면 이와같은 자바스크립트 내장함수를 사용하면 된다.
'use strict';

const bar = Object.freeze({ prop1: 'a' });
bar.prop1 = 'b'; // error가 발생한다.
console.log(bar);
// Object.preventExtensions - 새 property 추가를 막는다. __proto__에도 마찬가지로 추가 불가다.
// Object.seal - 객체를 밀봉한다. property의 값은 변경가능하나, property의 추가/삭제는 불가능하다.
// Object.freeze - property의 추가/삭제/값 수정/재구성, prototype 변경 모두 불가능하다.

// const로 정의된 경우 아래와 같이 재할당은 불가능하다.
const bar = { prop1: 'a' };
bar = { prop2: 123 };