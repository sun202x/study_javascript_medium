// 자바스크립트에서는 함수를 아래와 같이 정의힌다.
function printLog(a = 1) { // 이런식으로 매개변수의 기본값을 입력할 수 있다.
    console.log({ a });
}
printLog();  // result: { a: 1 }
printLog(3); // result: { a: 3 }

// 매개변수의 기본값도 마찬가지로 함수의 반환값을 사용할 수 있다.
function getDefault() {
    console.log('called getDefault');
    return 1;
}
function printLog(a = getDefault()) { // 역시나 기본값이 사용될 때만 함수가 호출된다.
    console.log({ a });
}
printLog();
printLog(3);

// 매개변수가 undefined일 때만 함수가 호출되는 것을 이용하면
// 매개변수를 필수 값으로 만들 수도 있다.
function required() {
    throw new Error('no parameter');
}
function printLog(a = getDefault()) {
    console.log({ a });
}
printLog(10);
printLog();

// 나머지 매개변수(rest parameter)를 정의하려면 아래와 같이 작성하면 된다.
// 나머지 매개변수를 사용하여 입력될 파라미터의 개수를 제한하지 않을 수 있다.
function printLog(a, ...rest) { // ... 키워드를 사용한다.
    console.log({ a, rest });
}
printLog(1, 2, 3);

// es6 전에는 arguments로 나머지 매개변수와 비슷한 역할을 할 수 있었지만,
// arguments는 파라미터가 명시적이지 않아 가독성이 좋지 않다는 문제가 있다.
// 또한 arguments는 유사 배열이기 때문에 배열로 변환해야 한다는 단점도 있다.
function printLog(a) {
    const rest = Array.from(arguments).splice(1);
    console.log({ a, rest });
}
printLog(1, 2, 3);

// 명명된 매개변수(named parameter)를 사용하여 아래와 같이 작성할 수 있다.
function getValues1(numbers, greaterThan, lessThan) {
    return numbers.filter(item => greaterThan < item && item < lessThan);
}
function getValues2({ numbers, greaterThan, lessThan }) {
    return numbers.filter(item => greaterThan < item && item < lessThan);
}

// 명명된 매개변수를 사용하면 함수 호출시에 값과 이름을 동시에 적을 수 있기 때문에 가독성이 높다.
const numbers = [10, 20, 30, 40];
const result2 = getValues2({ numbers, greaterThan: 5, lessThan: 25 });

// 만약 아래와 같이 작성했다면 두번째, 세번째 변수가 무엇을 의미하는지 몰랐을 것이다.
const numbers = [10, 20, 30, 40];
const result1 = getValues1(numbers, 5, 25);

// 명명된 매개변수에서 기본값을 사용하려면 아래와 같이 사용하면 된다.
function getValues({ numbers, greaterThan = 0, lessThan = Number.MAX_VALUE }) {
    return numbers.filter(item => greaterThan < item && item < lessThan);
}

const numbers = [10, 20, 30, 40];
console.log(getValues({ numbers, greaterThan: 5, lessThan: 25 }));
console.log(getValues({ numbers, greaterThan: 15 }));
console.log(getValues({ lessThan: 25, numbers })); // 이런식으로 위치는 중요하지 않다.

// 만약 명명된 매개변수를 사용하지 않고 일부 변수를 입력하지 않는다면
// 아래와 같이 undefined를 입력해야 하고 다소 불편하다.
// getValues(numbers, undefined, 25);

// 명명된 매개변수에서도 나머지 매개변수를 입력할 수 있다.
function f1({ p1, p3, ...rest }) {
    console.log({ p1, p3, rest });
}

f1({ p1: 'a', p2: 'b', p3: 'c', p4: 'd' });
f1({ p1: 'a', p3: 'b' });

// 아래와 같이 화살표 함수를 이용하면 함수를 간결하게 작성할 수 있다.
// 함수를 중괄호를 감싸지 않으면 안의 로직의 결과값이 반환 된다.
// 명시적으로 return 키워드를 작성하지 않아도 되기 때문에 코드가 간결해진다.
const add = (a, b) => a + b;
const add5 = a => a + 5; // 매개 변수가 하나라면 소괄호도 생략 가능하다. 
const addAndReturnObject = (a, b) => ({ result: a + b }); // 객체를 반환하려면 이렇게 소괄호로 감싸주면 된다.

// 화살표 함수에 아래와 같이 여러줄의 로직이 들어갈 경우
// 다음과 같이 중괄호로 묶어주면 된다.
const add = (a, b) => {
    if (a <= 0 || b <= 0) {
        throw new Error('must be positive number');
    }
    return a + b; // return 키워드를 통해 반환해야 한다.
};

// 화살표 함수가 일반함수와 다른 것은 this와 arguments가 바인딩 되지 않는다는 점이다.
// 따라서 화살표 함수에서 arguments가 필요하다면 아래와 같이 나머지 매개변수를 사용해야 한다.
const printLog = (...rest) => console.log(rest);
printLog(1, 2);