// generator는 함수의 실행을 중간에 멈추고 재개할 수 있는 독특한 기능이다.
// 실행 중간중간에 값을 전달할 수 있다.
// generator는 배열과 달리 값을 미리 만들어 두지 않는다. - 값을 미리 만들어 놓을 경우 불필요하게 메모리를 사용한다는 단점이 있다.

// 1. generator 함수는 *가 function keyword 옆에 붙는다.
function* f1() {
    console.log("f1-1");
    yield 10; // yield keyword를 사용하여 함수 실행을 중단시킬수 있다.
    console.log("f1-2");
    yield 20;
    console.log("f1-3");
    return "finished";
}

// 2. generator 함수를 호출할 경우 반환값으로 generator 객체가 반환된다.
const gen = f1();

// generator 객체는 아래와 같은 method들을 갖는다.

console.dir(">> gen: {", gen, "}");

// 3. next
// next method를 호출하여 다음 yield 까지 실행하게 된다.
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());

// 4. return
// return을 호출하게 될 경우 done이 true가 되고,
// 전달한 parameter가 value로 설정된 값이 반횐되며,
// generator 함수는 종료되게 된다.
// console.log(gen.next());
// console.log(gen.return('abc'));
// console.log(gen.next());

// 5. throw
// throw method를 호출할 경우 예외가 발생된 것으로 인식된다.
function* f2() {
    // 이런식으로 try catch 문을 사용하여 예외처리를 한다.
    try {
        console.log("f1-1");
        yield 10;
        console.log("f1-2");
        yield 20;
    } catch (e) {
        console.log("f1-catch", e);
        yield 30;
        console.log("f1-3");
        yield 40;
        console.log("f1-4");
    }
}

const gen2 = f2();
console.log(gen2.next());
console.log(gen2.throw('some error'));
console.log(gen2.next());
console.log(gen2.next());

// 6. generator 객체는 iterable이며 iterator다.
// iterator 조건
// - next method를 갖고 있다.
// - next method는 value와 done 속성값을 가진 객체를 반환한다.
// - done 속성값은 작업이 끝났을 때 참이 된다.
// iterable 조건
// - Symbol.iterator 속성값으로 함수를 갖고 있다.
// - 해당 함수를 호출하면 iterator를 반환한다.
const arr = [10, 20, 30];
const iter = arr[Symbol.iterator]();
console.log(iter.next());

function* f1() {
    // ...
}
const gen = f1();
// 아래 로직을 실행하면 true가 반환되므로
// generator는 iterable이자 iterator라고 할 수 있다.
console.log(gen[Symbol.iterator]() === gen);

// iterator는 for of 문법과 전개 연산자에서 유용하게 쓰인다.
function* f1() {
    yield 10;
    yield 20;
    yield 30;
}
// done 값이 true가 될 때까지 반복한다.
for (const v of f1()) {
    console.log(v);
}
// 마찬가지이다.
const arr = [...f1()];
console.log(arr);
