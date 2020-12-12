// es5 이전 까지는 변수를 var로 정의
// es6 이후 부터는 const, let 키워드로 변수정의가 가능해졌다.

// var의 문제점
// 1. 정의된 변수가 함수 scope를 가진다.
// scope는 변수가 사용될 수 있는 영역을 말한다.
// scope는 변수가 정의된 위치에 의해서 결정된다.
// 따라서 아래 로직은 에러가 발생
function example() {
    var i = 1;
}
// ReferenceError 발생
console.log(i);


'use strict'; // 이런식으로 use string를 선언하면 명시적으로 ReferenceError가 발생한다.
function example1() {
    i = 1; // 전역에 선언된다.
}
function example2() {
    console.log(i);
}
example1();
example2();

// var는 함수 scope이기 때문에 for문에서 정의된 변수가 
// 반복문이 끝난 이후에도 변수가 계속 남아있다.(while, switch, if문도 동일)
for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log('last:', i); // for문에서 사용된 값이 여전히 남아있다.

// 아래와 같이 즉시실행 함수를 사용하여 var 변수의 scope를 제한할 수 있다.
(function () {
    for (var i = 0; i < 10; i++) {
        console.log(i); // var는 함수 scope 이기 때문에 여기서만 쓰인다.
    }
})();
console.log('last:', i); // ReferenceError

// 위와 같이 var 변수의 scope를 제한하려면 번거롭게 로직을 작성해야하고
// 가독성도 좋아지지 않는다.

// 2. hoisting
// var로 정의될 경우 함수의 최상단으로 끌어올려지는데
// 이를 호이스팅(hoisting)이라고 한다.
// 그래서 아래와 같이 변수 정의전에 사용해도 에러가 발생하지 않는다.
console.log(myVar);
var myVar = 1;

// 위 로직은 아래와 같다.
var myVar = undefined; // 이런 식으로 undefined가 할당된다.
console.log(myVar); // 그래서 undefined가 출력되는 것이다.
myVar = 1;

// 이러한 특징 때문에 변수가 선언되기도 전에 값을 할당할 수도 있다.
console.log(myVar);
myVar = 2;
console.log(myVar);
var myVar = 1;

// 이처럼 hoisting은 직관적이지 않고 보통의 언어에서 찾아보기 힘든 기능이다.

// 3. 변수 재정의
// 이런 로직이 에러 없이 사용된다는 것은 직관적이지 않으며
// 버그로 이어질 가능성이 크다.
var myVar = 1;
var myVar = 2;

// 4. 재할당 가능한 변수밖에 정의하지 못함
// 재할당 불가능한 변수를 잘 활용할 경우 코드의 복잡도가 낮아지고 가독성이 높아진다.
var PI = 3.141592;
PI = 123; // 이런 식으로 재할당이 가능하기 때문에 상수값을 보장하지 못한다.