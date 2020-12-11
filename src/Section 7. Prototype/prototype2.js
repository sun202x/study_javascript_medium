// 이런 식으로 new 키워드를 사용해서 객체를 만들 때
// 사용하는 함수를 생성자 함수라고 한다.
// 첫번 째 문자는 대문자로 작성하는 것이 좋다.
function Person(name) {
    // new 키워드를 사용하여 작성하면 자바스크립트 엔진은
    // 아래와 같이 this에 빈 객체를 할당한다.
    // this = {};
    this.name = name;

    // 그리고 함수가 종료되기 직전에 this를 반환해준다.
    // return this;
}

// person 변수에는 반환된 this가 할당된다.
const person = new Person('mike');
// 따라서 아래 log에 'mike'가 나오는 것을 확인할 수 있다.
console.log(person.name);

// 자바스크립트의 기본 타입들은 아래와 같이
// 모두 생성자 함수를 가지고 있다.
// 그러나 생성자 함수를 통해 각각의 값들을
// 생성할 필요는 없다. 리터럴 문법을 쓰면된다.
const obj = new Object({ a: 123 });
const arr = new Array(10, 20, 30);
const num = new Number(123);
const str = new String('abc');

console.log({ obj, arr, num, str });

// 모든 함수는 prototype 속성을 갖고 있다.
function Person(name) {
    this.name = name;
}
// 아래와 같이 new 키워드를 통해 생성된 객체의 prototype은
// 그 생성자 함수의 prototype 속성을 가리킨다.
// 함수의 [[prototype]]과 prototype 속성은 다르다.
// [[prototype]]은 모든 객체가 가지고 있는 것이다.
// 함수의 prototype은 함수에만 있는 특별한 속성이다.
// new 키워드를 통해 생성된 객체는 자기 자신을 만든
// 생성자 함수의 [[prototype]]을 가리킨다.
const person = new Person('mike');

console.log(Person.prototype);
console.log(Object.getPrototypeOf(person) === Person.prototype);

// [[prototype]]이 무엇인지는 아래 질문에서 확인할 수 있다.
// https://stackoverflow.com/questions/17174786/what-is-the-significance-of-the-double-brackets-for-the-prototype-property-i

function Person(name) {
    this.name = name;
}

const person = new Person('mike');

console.log(Object.getPrototypeOf(Person) !== Person.prototype);

// 생성된 객체의 prototype은 그 객체를 생성한 생성자 함수의 prototype과 같다.
console.log(Object.getPrototypeOf(person) === Person.prototype);
// 생성자 함수의 prototype은 객체이기 때문에 그 prototype은 Object.prototype이다.
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype);
// Person 생성자 함수는 함수이기 때문에 그 prototype은 Function.prototype과 같다.
console.log(Object.getPrototypeOf(Person) === Function.prototype);

// 마찬가지로 Object 생성자 함수도 위와 동일하다.
console.log(Object.getPrototypeOf(Object) === Function.prototype);
// 또한 Function의 prototype도 객체이기 때문의 그 prototype은 Object.prototype과 같다.
console.log(Object.getPrototypeOf(Function.prototype) === Object.prototype);
// Object.prototype은 마찬가지로 객체이지만 그 prototype은 조금 특별하게도 null을 가리킨다.
// 따라서 prototype chain에서 가장 마지막을 가리킨다.
console.log(Object.getPrototypeOf(Object.prototype) === null);

// 기본타입을 리터럴 문법으로 생성해도
// prototype은 해당 생성자 함수의 prototype 객체를 가리킨다.
const obj = {};
const arr = [];
const num = 123.456;
const str = 'abc';
console.log(Object.getPrototypeOf(obj) === Object.prototype);
console.log(Object.getPrototypeOf(arr) === Array.prototype);
console.log(Object.getPrototypeOf(num) === Number.prototype);
console.log(Object.getPrototypeOf(str) === String.prototype);
// 사실 number와 string은 객체가 아니지만 아래와 같이 속성에 접근하는
// 문법을 사용하면 임시로 객체처럼 행동한다.
// 임시로 만들어진 객체의 prototype은 해당 생성자 함수의 prototype
// 속성을 참조한다.
console.log(num.toFixed === Number.prototype.toFixed);
console.log(num.toFixed());

// 아래와 같이 함수의 prototype 객체를 수정할 수도 있다.
function Person(name) {
    this.name = name;
}
const person1 = new Person('mike');

const newPrototype = {
    value: [],
    push(value) {
        this.values.push(value);
    },
    getValues() {
        return this.values;
    }
};
// 이렇게 설정하면
Person.prototype = newPrototype;
const person2 = new Person('jane');
// 예전에 만들어뒀던 객체는 이전 prototype을 참조할 것이고,
console.log(Object.getPrototypeOf(person1) !== newPrototype);
// 새로 생성된 객체는 수정된 prototype을 가리킨다.
console.log(Object.getPrototypeOf(person2) === newPrototype);

person2.push(1);
person2.push(2);
console.log(person2.getValues());

// 아래 생성자 함수를 이용해서 객체를 만들 때마다
// 내부에 있는 두 함수가 매번 생성된다.
// 그렇기 때문에 메모리 측면에서 비효율적이다.
function Person(name) {
    this.name = name;
    this._salary = 0;
    this.setSalary = function (salary) {
        this._salary = Math.max(0, Math.min(1000, salary));
    };
    this.getSalary = function () {
        return this._salary;
    }
}
const person1 = new Person('mike');
person1.setSalary(2000);
console.log(person1.getSalary());

const person2 = new Person('jane');
console.log(person1.getSalary !== person2.getSalary);

// 그럴 때는 아래와 같이 prototype 객체를 이용해
// 함수를 정의하는 것이 좋다.
function Person(name) {
    this.name = name;
    this._salary = 0;
}
Person.prototype = {
    setSalary (salary) {
        this._salary = Math.max(0, Math.min(1000, salary));
    },
    getSalary () {
        return this._salary;
    }
}
const person1 = new Person('mike');
person1.setSalary(2000);
console.log(person1.getSalary());

const person2 = new Person('jane');
// 동일한 함수인 것을 확인할 수 있다.
console.log(person1.getSalary === person2.getSalary);


// 함수의 prototype에는 constructor라는 속성이 있다.
// constructor는 그 함수를 가리킨다.
function Person(name) {
    this.name = name;
}

console.log(Person.prototype.constructor === Person);
// 그렇다면 Person의 constructor는 무엇일까?
// 우리가 이전에 어떤 값을 입력한 적이 없기 때문에
// Person에는 constructor가 없다.
// 그렇기 때문에 prototype에서 그 값을 찾는다.
// 여기서의 prototype은 Person.__proto__를 의미한다.
// Person은 함수이기 때문에 Function 생성자 함수를 가리킨다.
console.log(Person.constructor === ?);
// console.log(Person.constructor === Function);

// 생성자 함수를 모르는 상황에서
// constructor 객체를 사용하여 같은 객체를
// 생성할 수 있다.
function Person(name) {
    this.sayHello = function () {
        console.log('hello');
    };
}
function Animal() {
    this.sayHello = function () {
        console.log('hm...');
    };
}
function makeInstanceOf(obj) {
    // 어떤 함수로 만들어진 obj인지 모르나
    // constructor를 통해 해당 함수로 객체를 생성할 수 있다.
    return new obj.constructor();
}
const person = new Person();
const animal = new Animal();
const newInst = makeInstanceOf(person);
newInst.sayHello();