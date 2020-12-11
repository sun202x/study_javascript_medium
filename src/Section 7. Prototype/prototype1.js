// 자바스크립트에서 모든 오브젝트에는
// prototype이라는 숨겨진 속성이 있다.
// getPrototypeOf 함수로 prototype을 가지고 올 수 있다.
// prototype은 null 또는 object 타입이다.
// 많은 자바스크립트 엔진에서는 __proto__라는 이름으로
// prototype에 접근할 수 있다.
const person = {
    name: 'mike'
};
const prototype = Object.getPrototypeOf(person);
console.log(typeof prototype);
console.log(person.__proto__ === prototype);
// 자바스크립트 표준에서는 브라우저에서만 __proto__를
// 지원하는 것으로 나와 있지만, 사실상 거의 모든
// 자바스크립트 엔진에서 지원한다.
// 하지만 프로토 타입에 접근하는 안전하고 공식적인 방법은
// getPrototypeOf 함수를 사용하는 것이다.

// prototype을 변경할 때는 setPrototypeOf 를 사용할 수 있다.
const person = {
    name: 'mike'
};
const programmer = {
    language: 'javascript'
};

Object.setPrototypeOf(programmer, person);
// programmer.__proto__ = person; 이런식으로 __proto__에 할당하는 것과 같다.
console.log(Object.getPrototypeOf(programmer) === person);
console.log(programmer.name); // 이런식으로 자기자신에 없는 속성이면 prototype에서 속성을 찾는다.

// 아래와 같이 prototype을 여러 단계로 연결할 수도 있다.
const person = {
    name: 'mike'
};
const programmer = {
    language: 'javascript'
};
const frontendDev = {
    framework: 'react'
};

Object.setPrototypeOf(programmer, person); // programmer의 prototype을 person으로 연결
Object.setPrototypeOf(frontendDev, programmer); // frontendDev의 prototype을 programmer로 연결
console.log(frontendDev.name, frontendDev.language); // 값이 출력되는 것을 확인할 수 있다.
console.log(
    frontendDev.__proto__.__proto__.name,
    frontendDev.__proto__.language
);

// 아래와 같이 새로운 값을 추가할 경우
// prototype chain을 이용하는 것이 아니라,
// 자기 자신에게 속성을 추가해야 한다.
const person = {
    name: 'mike'
};
const programmer = {
    language: 'javascript'
};

Object.setPrototypeOf(programmer, person);
programmer.name = 'jane'; // 자기 자신의 속성값을 수정한다.
console.log(programmer.name); // result: 'jane'
console.log(person.name); // result: 'mike'

// prototype은 일반적인 객체이기 때문에
// 아래와 같이 함수를 정의해서 공통 로직을
// 추가할 수 있다.
const person = {
    name: 'mike',
    sayHello() {
        console.log('hello!');
    }
};
const programmer = {
    language: 'javascript'
};

Object.setPrototypeOf(programmer, person);
// programmer에는 sayHello가 없지만 prototype에 있기 때문에 호출할 수 있다.
programmer.sayHello();

// 아래와 같이 for in 문법을 사용하면
// prototype에 있는 속성까지 사용이 된다.
const person = {
    name: 'mike'
};
const programmer = {
    language: 'javascript'
};

Object.setPrototypeOf(programmer, person);
// 아래 코드를 실행해보면 prototype의 속성까지 모두 출력된다.
for (const prop in programmer) {
    console.log(prop);
}

// 자기 자신의 속성만 사용하고 싶다면 아래와 같이
// hasOwnProperty 메서드를 사용한다.
for (const prop in programmer) {
    if (programmer.hasOwnProperty(prop)) {
        console.log(prop);
    }
}

// 또 다른 방법은 Object.keys를 사용하는 것이다.
for (const prop of Object.keys(programmer)) {
    console.log(prop);
}