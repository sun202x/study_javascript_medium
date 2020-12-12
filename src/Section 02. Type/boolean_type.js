const c1 = true;
const c2 = false;
// 자바스크립트에서 Logical and는 아래와 같이 && 기호를 사용한다.
if (c1 && c2) {
    console.log('c1 && c2');
}
// Logical or는 || 기호를 사용한다.
if (c1 || c2) {
    console.log('c1 || c2');
}
// 위 코드를 실행해 보면 두번째 로그만 찍히는 것을 확인할 수 있다.

// 아래처럼 숫자나 문자열로 논리연산을 할 수 있다.
const c1 = 123;
const c2 = 'abc';
if (c1 && c2) {
    console.log('c1 && c2');
}
if (c1 || c2) {
    console.log('c1 || c2');
}
// 숫자에선느 0이나 NaN이 false가 된다.
if (c1 && c2 && 0) {
    console.log('c1 && c2 && 0');
}
if (c1 && c2 && NaN) {
    console.log('c1 && c2 && NaN');
}
// 문자열은 빈문자열만 false이다.
if (c1 && c2 && '') {
    console.log(`c1 && c2 && ''`);
}

// 논리연산자의 결과값은 마지막으로 평가된 값이다.
const c1 = 123;
const c2 = 'abc';
const v1 = c1 && c2;        // result: abc
const v2 = c1 && c2 && 0;   // result: 0
const v3 = c1 && 0 && c2;   // result: 0
console.log({ v1, v2, v3 });

const v4 = c1 || c2;        // result: 123
const v5 = '' || c2;        // result: abc
console.log({ v4, v5 });

const v6 = !!(c1 && 0 && c2);   // false
const v7 = !!(c1 || c2);        // true
console.log({ v6, v7 });

// and 연산자는 앞의 있는 값이 true여야 
// 뒤에 있는 코드가 실행되기 때문에 아래와 같이
// if문 대용으로 사용할 수도 있다.
const c1 = 123;
const c2 = 0;
c1 && console.log('log1');
c2 && console.log('log2');

// or 연산자는 기본값을 입력하는 방법으로도 사용할 수 있다.
const price = 0;
const name = '';
const price2 = price || 1000;
const name2 = name || '이름을 입력해주세요';

// nullish coalescing이라는 문법을 사용하면
// 아래와 같이 기본값을 입력해줄 수 있다.
const person = {};

// 이렇게 ?? 키워드를 사용한다.
const name = person.name ?? 'unknown';

const name = 
    person.name === undefined || person.name === null ? 'unknown' : person.name;

// nullish coalescing은 or 연산자와 비슷해 보이지만,
// 빈 문자열이나 0에 대해서 기본값이 사용되지 않는다.
const product = { desc: '', price: 0 };
const descInput = product.desc ?? '상품 설명을 입력하세요'; // 기본값이 입력된다.
const priceInput = product.price ?? 1000; // 기본값이 입력되지 않는다.

// nulish coalescing은 논리연산자와 사용할 경우 괄호로 묶어줘야 한다.
const name = '';
const title = '';
// 아래와 같이 괄호로 묶지 않을 경우 에러가 발생한다.
const text = name || title ?? 'foo';
// const text = (name || title) ?? 'foo';

// nullish coalescing을 사용하여 함수를 호출할 경우
// 필요할 경우에만 함수가 호출된다.
const name = 'mike';
function getDefaultName() {
    console.log('called getDefaultName');
    return 'default name';
}
console.log(name ?? getDefaultName());
console.log(name || getDefaultName());