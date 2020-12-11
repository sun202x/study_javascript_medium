// 아래와 같이 자바스크립트에서는 문자열을 숫자로 파싱할 수 있다.
// parseInt는 정수형으로 파싱하기 때문에 아래 로직들의 결과는 모두 123이다.
console.log(Number.parseInt('123'));
console.log(Number.parseInt('123.456')); // .이나
console.log(Number.parseInt('123abc'));  // 문자열을 만나면 파싱이 끝난다.

// parseFloat은 실수를 파싱한다.
console.log(Number.parseFloat('123'));
console.log(Number.parseFloat('123.456'));
console.log(Number.parseFloat('123abc'));       // 문자열이나
console.log(Number.parseFloat('123.456.789'));  // 두번째 .을 만날경우 파싱이 끝난다.

// 이런식으로 숫자가 아닌 값을 파싱하면
const v = Number.parseInt('abc');
console.log(v); // NaN으로 파싱이된다.(Not a Number)

// isNaN 함수로 NaN인지 확인할 수 있다.
console.log('v', Number.isNaN(v));
console.log('123', Number.isNaN(123));

// 많은 프로그래밍 언어에서 0으로 나눌경우 에러가 발생하지만,
// 자바스크립트에서는 에러가 발생하지 않고 Infinity로 반환된다.
// 자바스크립트는 Infinity로 무한대 값을 표현할 수 있다.
const v = 1 / 0;
console.log(v);

// Infinity 변수는 전역에 선언되어 있다.
console.log('Infinity', v === Infinity);
console.log('Number.isFinite', Number.isFinite(v)); // isFinite 함수로 Infinity 여부를 검사할 수도 있다.

// 자바스크립트 number는 정수, 실수를 가리지 않는대신 64 bit 부동소수점 방식으로 표현된다.
// 사용하기 편리하다는 장점이 있지만 메모리 최적화에는 불리하다는 단점이 있다.(무조건 64비트만 사용)
// 메모리 최적화를 위해선 ArrayBuffer를 사용해야 한다.
// 자바스크립트 number => 64 bit 부동소수점(floating point)
//    부호(sign) 1 bit, 지수부(exponent) 11 bits, 가수부(fraction) 52 bits
//    (-1)^부호 * 가수부 * 2^지수부
// 53 bit precision
//    https://en.wikipedia.org/wiki/Double-precision_floating-point_format

// -(2^53 - 1) ~ (2^53 - 1)
// 9007199254740991, 약 16자리
console.log(Math.pow(2, 53) - 1);
console.log(Number.MIN_SAFE_INTEGER); // -(2^53 - 1)
console.log(Number.MAX_SAFE_INTEGER); // (2^53 - 1)
// 위 로직들 결과의 절댓값은 같다

// 이런 식으로 최대 값도 표현가능하다.
// 이렇게 큰 수를 가지고 연산을 한다면 안전성을 보장할 수 없지만
// 위 범위 내의 숫자로 연산을 한다면 안전하다고 생각할 수 있다.
// 물론 덧셈으로 MAX_VALUE값을 넘어가버리면 안전하지 못하다.
console.log(Number.MAX_VALUE);

// 아래 코드의 MAX_VALUE를 넘어가는 값을 연산에 쓰게 되면 안전성을 보장하지 못한다.
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)  + 1); // 결과값은 false이다.
console.log(9007199254740995 - 10);     // 결과: 9007199254740986 - 정확하지 않다.
console.log(9007199254740995n - 10n);   // 이런식으로 끝에 n을 붙여 bigInt로 사용해야 한다.

// 아래와 같이 안전한 값인지 확인후 연산하는 것이 좋다.
const a = 9007199254740995;
const b = 10;
const result = a - b;
console.log(
    Number.isSafeInteger(a),    // false
    Number.isSafeInteger(b),    // true
    Number.isSafeInteger(result) // true
);
console.log('9007199254740995 - 10 =', result);

const a = 9007199254740991;
const b = 10;
const result = a - b;
console.log(
    Number.isSafeInteger(a),
    Number.isSafeInteger(b),
    Number.isSafeInteger(result)
);
// 위 세 숫자 모두 안전한 값이기 때문에 정확한 연산결과가 나온다.
console.log('9007199254740991 - 10 =', result);

// 아래 로직은 당연히 true가 나와야 할 것 같지만
// 결과값은 false이다.
// 이는 number가 부동소수점 방식을 사용하기 때문이다.
// 부동소수점에서는 precision이 정해져 있기 때문에 정확도에 한계가 있다.
// 자바스크립트만의 문제는 아니다.
console.log(0.1 + 0.2 === 0.3);
console.log(0.1 + 0.2); // 0.30000000000000004

// 아래와 같이 EPSILON이라는 값을 사용하여
// 비슷한 값인지 검사할 수 있다.
// 53 bit precision을 고려하여 이보다 작은 값이면
// 무시할만하다 할 수 있다.
console.log(Number.EPSILON);
function isSimilar(x, y) {
    return Math.abs(x - y) < Number.EPSILON;
}
console.log(isSimilar(0.1 + 0.2, 0.3));

// 이런 식으로 수학관련된 여러 함수를 Math 객체를 통해 사용할 수 있다.
console.log(Math.random());         // 랜덤한 숫자 반환
console.log(Math.max(30, 10, 55));  // 전달받은 값들의 최대값 반환
console.log(Math.pow(5, 3));        // 첫번째 파라미터의 승수를 두번째 파라미터만큼 적용한다.

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log(getRandomInt(0, 10));
console.log(getRandomInt(0, 10));
console.log(getRandomInt(0, 10));