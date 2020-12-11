// 객체와 배열을 생성하고 수정할 때,
// 아래와 같이 단축 속성명(shorthand property names)을 사용하여
// 좀 더 간편하게 할 수 있다.
const name = 'mike';
const obj = {
    age: 21,
    name, // 변수 명이 그대로 property명으로 설정된다.
    getName() { // 이 코드와 같이 함수를 바로 입력할 수도 있다.
        return this.name;
    }
};

// 단축 속성명을 사용한 코드와 그렇지 않은 코드 1
function makePerson1(age, name) {
    return { age: age, name: name };
}

function makePerson2(age, name) {
    return { age, name };
}

// 또한 단축 속성명을 사용하면 아래와 같이
// 편리하게 로그를 남길 수 있다.
// 단축 속성명을 사용한 코드와 그렇지 않은 코드 2
const name = 'mike';
const age = 21;
console.log(name, age); // 어떤 변수인지 알 수 없다.
console.log('name =', name, ', age =', age); // 단축 속성명을 사용하지 않았을 때
console.log({ name, age }); // 단축 속성명을 사용했을 때

// 아래와 같이 계산된 속성명(computed property names)을 사용하면 
// 객체를 생성하고 속성값을 편리하게 추가할 수 있다.
// 계산된 속성명은 객체의 속성명을 동적으로 생성하기 위해 나온 문법이다.
function makeObject1(key, value) {
    const obj = {};
    obj[key] = value;
    return obj;
}

function makeObject2(key, value) {
    return { [key]: value };
}

// 아래와 같이 전개 연산자(spread operator)를 사용하면
// 객체와 배열의 속성값을 간편하게 가져올 수 있다.
Math.max(1, 3, 7, 9); // 전개 연산자를 사용하지 않을 경우 하나씩 풀어서 작성해야 하지만,
const numbers = [1, 3, 7, 9];
Math.max(...numbers); // 전개 연산자를 사용하면 ...키워드를 통해 간편하게 작성 가능하다.

// 이렇게 배열이나 객체를 복사할 때도 유용하다.
const arr1 = [1, 2, 3];
const obj1 = { age: 23, name: 'mike' };
const arr2 = [...arr1];
const obj2 = { ...obj1 };
// 아래와 같이 속성을 추가하거나 변경해도 기존 객체는 변경되지 않는다.
arr2.push(4);
obj2.age = 80;

// 전개연산자를 사용해도 순서가 유지된다.
[1, ...[2, 3], 4]; // [1, 2, 3, 4]
new Date(...[2018, 11, 24]); // 2018년 12월 24일

// 전개 연산자를 사용하여 두 객체를 쉽게 합칠 수도 있다.
const obj1 = { age: 21, name: 'mike' };
const obj2 = { hobby: 'soccer' };
const obj1 = { ...obj1, ...obj2 };
console.log(obj3);

// 객체 리터럴에서 중복된 속성명을 사용했을 경우
// 최종 결과는 마지막 속성명의 값이 된다.
const obj1 = { x: 1, x: 2, y: 'a' }; // x가 중복으로 입력됐다.
const obj2 = { ...obj1, y: 'b' };
console.log({ obj1, obj2 }); // obj1의 x 값은 마지막에 입력된 2가 설정된다.