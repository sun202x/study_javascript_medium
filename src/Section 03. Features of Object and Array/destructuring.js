// 비구조화 문법(destructuring)을 통해 
// 배열이나 객체의 속성값을 병수로 쉽게 꺼낼수 있다.
const arr = [1, 2];
const [a, b] = arr; // 비구조화 문법을 통해 변수로 값을 꺼낼수 있다.
console.log(a); // result: 1
console.log(b); // result: 2

// 이런 식으로 기존에 존재하는 변수에
// 원하는 값을 쉽게 할당할 수도 있다.
let a, b;
[a, b] = [1, 2];

// 비구조화 문법을 사용할 때 아래와 같이
// 기본값을 설정할 수 있다.
const arr = [1];
// 해당 속성값이 undefined일 때 기본값이 사용된다.
const [a = 10, b = 20] = arr;
console.log({ a, b });

// 비구조화 문법을 사용하여 두 변수의 값도 쉽게 교환할 수 있다.
let a = 1;
let b = 2;
// 보통 제 3의 변수가 필요하지만, 비구조화를 사용하면 2개만으로도 충분하다.
[a, b] = [b, a];
console.log({ a, b });

// 배열 비구조화에서 일부 속성값을 무시하고 싶다면,
const arr = [1, 2, 3];
// 이렇게 쓸 수 있다.
const [a, , c] = arr;
console.log({ a, c }); // result: { a: 1, c: 3 }

// 아래와 같이 배열의 특정 아이템을 제외하고
// 나머지 아이템들을 분리할 수도 있다.
const arr = [1, 2, 3];
const [first, ...rest1] = arr; // 첫 번째 요소를 제외하고 나머지 요소들은 rest1에 담긴다.
console.log(rest1);
const [a, b, c, ...rest2] = arr; // 빈 배열이 할당된다.
console.log(rest2);

// 객체의 비구조화는 아래와 같이 중괄호를 이용한다.
const obj = { age: 21, name: 'mike' };
const { age, name } = obj; // 해당하는 속성명을 입력한다.
console.log({ age, name });

// 객체 비구조화에서 순서 정보는 중요하지 않다.
const obj = { age: 21, name: 'mike' };
const { age, name } = obj; // 이런식으로 이름만 맞춰주면 된다.
const { name, age } = obj;
const { a, b } = obj; // 존재하지 않는 이름이라면 undefined가 할당된다.

// 아래와 같이 원래속성명과 다른 이름으로 변수를 생성할 수 있다.
const obj = { age: 21, name: 'mike' };
const { age: theAge, name } = obj;
console.log(theAge);
console.log(age); // 해당 코드는 에러가 발생한다.

// 객체의 비구조화에서도 아래와 같이 기본값을 설정할 수 있다.
const obj = { age: undefined, name: null, grade: 'A' };
const { age = 0, name = 'noName', grade = 'F' } = obj;
console.log({ age, name, grade });

// 이렇게 속성명 변경과 동시에 기본값을 설정할 수도 있다.
const obj = { age: undefined, name: 'mike' };
const { age: theAge = 0, name } = obj;

// 기본값으로 함수의 반환값을 넣을 수 있는데,
// 이런식으로 함수의 반환값을 넣을 경우 기본값이 사용될 때만
// 함수가 호출된다.
function getDefaultAge() {
    console.log('hello');
    return 0;
}
const obj = { age: 21, grade: 'A' };
const { age = getDefaultAge(), grade } = obj; // hello가 출력되지 않는다.
console.log(age);

// 객체의 비구조화에서도 ...키워드를 통해 값을 전개할 수 있다.
const obj = { age: 21, name: 'mike', grade: 'A' };
const { age, ...rest } = obj; // 나머지 두 개의 속성이 rest 변수에 할당된다.
console.log(rest);

// 배열의 아이템이 object일 경우 비구조화를 사용하여
// 편리하게 쓸 수 있다.
const people = [
    { age: 21, name: 'mike' },
    { age: 51, name: 'sara' }
];

for (const { age, name } of people) {
    // ...
}

// 아래와 같이 중첩된 객체에도 비구조화 문법을 사용할 수 있다.
const obj = { name: 'mike', mother: { name: 'sara' } };
const {
    name,
    mother: { name: motherName}
} = obj;
console.log({ name, motherName }); // result: { name: 'mike', motherName: 'sara' };
console.log(mother); // mother는 변수로 할당되지 않기 때문에 error가 발생한다.

// 비구조화 문법에서 기본값의 정의는 변수로 한정되지 않는다.
const [{ prop: x } = { prop: 123 }] = []; // 왼쪽 prop: x는 첫번째 아이템을 가리키기 때문에 기본값이 할당된다.
console.log(x); // result: 123
const [{ prop: x } = { prop: 123 }] = [{}]; // 아이템이 하나가 있기 때문에 기본값이 사용되지 않는다.
console.log(x); // result: undefined

// 객체 비구조화를 사용하여 계산된 속성명을 활용할 수 있다.
const index = 1;
const { [`key${index}`]: valueOfTheIndex } = { key1: 123 };
console.log(valueOfTheIndex); // result: 123

// 비구조화에서 속성명 변경시 단순히 변수만 사용할수 있는 것은 아니다.
// 아래와 같이 특정 객체나 배열의 속성이나 요소 값으로 설정할 수도 있다.
const obj = {};
const arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
console.log(obj);
console.log(arr);