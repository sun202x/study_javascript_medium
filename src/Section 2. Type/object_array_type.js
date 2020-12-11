// 자바스크립트에서는 object를 아래와 같이 중괄호를 사용하여
// 생성할 수 있다.
const obj = {
    age: 21,
    name: 'mike'
};
// 다른 표현으로 new 키워드와 Object를 사용하여 생성할 수도 있다.
const obj2 = new Object({
    age: 21,
    name: 'mike'
});
// 아래와 같이 생성자를 통해 쓸만한 함수들을 제공받는다.
console.log(Object.keys(obj));      // 입력된 객체의 모든 key 반환
console.log(Object.values(obj));    // 입력된 객체의 모든 value 반환
console.log(Object.entries(obj));   // key, value를 튜플 형식으로 만들어서 반환

// for of문을 사용하여 key, value를 아래와 같이 받을 수도 있다.
for (const [key, value] of Object.entries(obj)) {
    console.log(key, value);
}

// 아래와 같이 객체에 속성을 추가, 수정, 삭제할 수 있다.
const obj = {
    age: 21,
    name: 'mike'
};
obj.city = 'seoul'; // city 속성 추가
obj.age = 30;       // age 속성 수정
console.log(obj);

delete obj.city;    // city 속성 제거
console.log(obj);

delete obj['name']; // name 속성 제거
console.log(obj);

// 자바스크립트에서 배열은 아래와 같이 표현할 수 있다.
const arr = [1, 2, 3];              // 대괄호를 사용하여 생성
const arr2 = new Array(1, 2, 3);    // 다른 방법으로 Array 생성자 사용
console.log(typeof arr === 'object'); // array의 타입은 object이다
console.log(Object.values(arr));

// array는 자체적으로 가지고 있는 유용한 함수들이 있다.
// 각 함숟르은 기존 배열들을 건드리지 않는다.
console.log(arr.map(item => item + 1));
console.log(arr.filter(item => item >= 2));
console.log(arr.reduce((acc, item) => acc + item, 0));

// 배열의 아이템으로 loop를 도는 방법으로 두가지가 있다.
const arr = [1, 2, 3];

// 1. forEach 메서드 사용
arr.forEach(item => console.log(item));
// 2. for 문 사용
for (const item of arr) {
    console.log(item);
}

// 또한 아래에 유용한 메서드들도 제공한다.
console.log(arr.some(item => item === 2));      // 요소중 하나라도 조건에 만족할 경우 true 반환
console.log(arr.every(item => item === 2));     // 모든 요소가 조건에 만족할 경우 true 반환
console.log(arr.includes(2));                   // 입력된 파라미터가 존재할 경우 true 반환
console.log(arr.find(item => item % 2 === 1));  // 조건에 해당되는 요소 반환
console.log(arr.findIndex(item => item % 2 === 1)); // 조건에 해당되는 요소의 index 반환

// 아래와 같이 배열의 요소를 추가, 수정, 삭제할 수 있다.
const arr = [1, 2, 3];

// 배열을 stack처럼 사용
arr.push(4); // 아이템 추가
console.log(arr.pop()); // 뒤에 있는 아이템 삭제
console.log(arr);

// spilce 메서드는 아이템 삭제와 동시에 추가할 수 있다.
arr.splice(1, 1); // 첫번째는 인덱스, 두번째는 개수이다.
console.log(arr);
arr.splice(1, 0, 10, 20, 30); // 세번째 이후로는 추가할 아이템을 나열한다.
console.log(arr);
arr.splice(1, 3, 40, 50);
console.log(arr);

// sort 메서드를 사용하여 정렬을 할 수 있다.
arr.sort(); // 기본동작으로 오름차순으로 정렬한다.
console.log(arr);
// 아래와 같이 조건에 따라 오름차순, 내림차순으로 정렬할 수도 있다.
// 음수를 반환하면 순서를 변경하지 않겠다는 뜻이고,
// 양수를 반환하면 순서를 변경하겠다는 뜻이다.
arr.sort((a, b) => (a % 10) - (b % 10));
console.log(arr);