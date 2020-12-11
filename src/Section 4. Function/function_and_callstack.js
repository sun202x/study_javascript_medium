// 자바스크립트에서 함수는 First class citizen이다.
// 다른 말로 일급 함수라고도 부른다.
// MDN에서 정의한 내용을 보면
// https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function
`
A programming language is said to have First-class functions when functions in that language are treated like any other variable.
`
// 프로그래밍 언어가 일급 함수를 갖고 있다고 말하려면,
// 함수가 다른 변수처럼 취급되면 그 언어는 일급 함수를 갖고 있다.
// 라고 말할 수 있다고 한다.

// 자바스크립트가 일급 함수를 가지고 있기 때문에
// 아래와 같이 변수에 함수를 담을 수 있다.
const add10 = function (a) {
    return 10 + b;
}

// 그리고 함수를 매개변수로 전달할 수도 있다.
function apply(arr, op) {
    return arr.map(op);
}
apply([1, 2, 3], add10);

// 또한, 함수 안에서 다른 함수를 반환할 수도 있다.
function makeAdd(v1) {
    return function (v2) {
        return v1 + v2;
    }
}
// 이런식으로 반환받은 함수를 사용할수도 있다.
const add3 = makeAdd(3);
console.log(add3(10));
const add7 = makeAdd(7);
console.log(add7(10));

// 자바스크립트에는 클로저(closure)라는 기능이 있다.
// 클로저는 함수와 그 함수를 둘러싸고 있는 주변의 상태를 기억하는 기능이다.
function makeAdd(v1) {
    // 클로저 덕분에 내부 함수는 외부 함수의 지역변수와 매개변수에 접근할 수 있다.
    // 많은 언어에서 지역변수와 매개변수는 함수가 실행되는 동안에만 존재한다.
    // 그러나 자바스크립트에서는 클로저를 사용하여 접근할 수 있다.
    return function (v2) {
        return v1 + v2; // 클로저가 없었다면 v1에 접근하지 못했을 것이다.
    }
}

const add3 = makeAdd(3);
console.log(add3(10)); // result: 13
const add7 = makeAdd(7);
console.log(add7(10)); // result: 17

// 모든 언어에서는 함수의 실행 정보를 관리하기 위해
// 콜스택(call stack)이라는 것을 관리한다.
function f1() {
    const v1 = 123;
    console.log(v1);
}
const v2 = 456;
function f2() {
    f1();
    console.log(v2);
}
// 이렇게 함수가 실행될 때마다 현재 까지 실행하던
// 함수의 정보를 콜스택에 저장을 하고,
// 함수가 실행을 종료하면 콜스택에서 이저에 마지막으로 실행했던
// 그 함수의 정보를 꺼내온다.
// 그래서 이전에 멈췄던 부분부터 다시 실행한다.
f2();

// 자바스크립트에서는 이렇게 콜스택에 담기는 함수 실행정보를
// execution context 라고 부른다.
// 그리고 전체를 감싸는 하나의 커다란 함수가 있다고 생각할 수 있는데,
// 그래서 프로그램이 처음에 실행될 때 global execution context라는 것이 생성이 된다.
// global execution context가 만들어진 상태에서 위에서 부터 실행된다.
// 함수가 실행되면 지역변수를 만나게 되는데,
// 이런 지역변수의 정보를 갖고 있는 것을 lexical environment라고 한다.
// execution context안에 lexical environment가 있는 것이다.
// lexical environment는 { 변수이름: 값 } 형태로 갖고 있는 map이라고 생각하면 된다.
// 