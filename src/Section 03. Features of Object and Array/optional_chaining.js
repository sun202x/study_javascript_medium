// 자바스크립트에서는 객체의 속성에 접근할 때 
// 아래와 같이 .으로 접근한다.
const person = null;
const name = person.name; // 이 때 객체가 존재하지 않는다면 error가 발생한다.

// error가 발생하지 않게 앞에 객체의 값을 검사할수도 있지만,
const person = null;
const name = person && person.name;
// optional chaining을 사용하면 이렇게 간단하게 검사를 할 수 있다.
const name2 = person?.name;

// 앞에서 작성한 코드는 아래와 같이 풀이될 수 있다.
const name = person?.name;
const name = person === name || person === undefined ? undefined : person.name;

// 이런식으로 함수를 사용할 때도 optional chaining을 사용할 수 있다.
const person = {
    getName: () => 'abc'
};
const name = perseon.getName?.();
console.log(name);

// 함수를 호출시에 optional chaining을 사용하는 것은
// 이렇게 함수를 매개변수로 받아서 그것을 호출할 때 유용하게 사용할 수 있다.
function loadData(onComplete) {
    console.log('loading...');
    onComplete?.();
}
loadData();

// optional chaining은 배열의 아이템에 접근할 때도 사용할 수 있다.
const person = { friends: null, mother: null };

const firstFriend = person.friends?.[0];

// 배열 뿐만 아니라 객체에서 동적으로 속성값 이름을 입력할 때도
// 사용할 수 있다.
const prop = 'name';
const name = person.mother?.[prop];

// optional chaining을 사용하면 아래와 같이 값을 검사하는 로직이 줄어든다.
const name =
    person &&
    person.friends &&
    person.friends[0] &&
    person.friends[0].mother &&
    person.friends[0].mother.name;

const name2 = person?.friends?.[0]?.mother?.name;

// optional chaining은 nullish coaliescing과 함께 사용하기 좋다.
const person = {};
const name = person?.friends?.[0]?.mother?.name ?? 'default name';