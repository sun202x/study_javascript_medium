// 자바스크립트에서는 클래스 키워드를 통해
// 클래스를 정의할 수 있다. 
class Person {
    // constructor라는 이름으로 생성자를 정의할 수 있다.
    constructor(name) {
        // 생성자 안에서는 this를 사용하여 멤버변수를 정의할 수 있다.
        this.name = name;
    }
    // 아래와 같이 메서드를 정의할수 있으며
    // 메서드 안에서는 this로 멤버변수에 접근할 수 있다.
    sayHello() {
        console.log(`hello~ ${this.name}!`);
    }
}
// new 키워드로 클래스의 인스턴스를 생성할 수 있다.
// 이 때 넘겨준 매개변수는 생성자에 매개변수로 넘어온다.
const person = new Person('mike');
person.sayHello(); // 위에서 정의한 메서드를 사용할 수 있다.

// 사실 클래스는 함수와 프로토타입 기반으로 만들어져 있다.
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log(`hello~ ${this.name}!`);
    }
}

// 이렇게 타입을 검사해보면 function 이라고 나온다.
console.log(typeof Person);
// 클래스 내부에 정의한 메서드들은 prototype에 저장이 된다.
// 클래스의 prototype은 조회하지 못하게 되어 있어
// Object.keys로는 확인하지 못하고
console.log(Object.keys(Person.prototype));
// Object.getOwnPropertyNames를 통해서는 확인할 수 있다.
console.log(Object.getOwnPropertyNames(Person.prototype));
// 멤버 변수는 각 객체에 할당되기 때문에 생성된 인스턴스에서 확인할 수 있다.
const person = new Person('mike');
console.log(Object.keys(person));

// 클래스 자체는 constructor 함수이다.
console.log(Person.prototype.constructor === Person);
console.log(Person.prototype.sayHello);

// 클래스 내부에 아래와 같이 getter와 setter를 정의할 수 있다.
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (value.length < 4) {
            console.log('name is too short');
            return;
        }
        this._name = value;
    }
}

const person = new Person('mike');
// 아래와 같이 사용하면 getter가 호출된다.
console.log(person.name);
// 값을 할당하면 setter가 호출된다.
person.name = 'ab';
console.log(person.name);

// 아래와 같이 getter만 설정하면
// readonly처럼 사용할 수 있다.
class Person {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
}
const person = new Person('mike');
person.name = 'jane'; // 아래 값은 할당되지 않는다.
console.log(person.name);
console.log(Object.keys(person)); // name이라는 변수는 보이지 않게된다.

// 클래스에서는 extends 키워드를 통해 상속을 받을 수 있다.
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log(`hello~ ${this.name}!`);
    }
}

class Programmer extends Person {
    constructor(name, language) {
        // 부모의 constructor가 호출된다.
        // 자식의 생성자에서는 반드시 부모의 생성자를 호출해 주어야 한다.
        super(name);
        this.language = language;
    }
    // constructor는 반드시 작성할 필요없다.
    // 만약 작성하지 않으면 아래코드가 default로 실행된다.
    // constructor(...args) {
    //     super(...args);
    // }
}

const p1 = new Programmer('mike', 'javascript');
p1.sayHello();

// 클래스 상속은 프로토타입 기반으로 구현되어 있다.
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log(`hello~ ${this.name}!`);
    }
}

class Programmer extends Person {
    constructor(name, language) {
        super(name);
        this.language = language;
    }
}

// 상속받는 클래스의 prototype은 부모의 prototype chain으로 연결을 해서 가지고 있는다.
console.log(Object.getPrototypeOf(Programmer.prototype) === Person.prototype);
// 또한 클래스 자기 자신도 prototype chain으로 연결이 되어 있다.
// 이런 식으로 생성자 함수의 prototype chain은 static 멤버 변수와
// static 메서드에서 사용이 된다.
console.log(Object.getPrototypeOf(Programmer.prototype) === Person);

// 아래와 같이 자식 클래스에서 부모의 있는 메서드를 정의하는 것을
// 메서드 오버라이딩(overrinding)이라고 한다.
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log(`hello~ ${this.name}!`);
    }
    getRandom() {
        return Math.floor(Math.random() * 10);
    }
}

class Programmer extends Person {
    constructor(name, language) {
        super(name);
        this.language = language;
    }
    sayHello() {
        // 부모의 메서드를 호출하려면 super를 통해 접근하면 된다.
        super.sayHello();
        console.log(`I like ${this.language}.`);
        // 자신의 메서드를 호출할 때는 this로 호출하면 된다.
        console.log(`Your lucky number is ${this.getRandom()}`);
    }
    getRandom() {
        return 20 + Math.floor(Math.random() * 10);
    }
}

// 아래를 실행해 보면 부모의 sayHello메서드가 호출되고
// 자식의 getRandom 메서드가 실행된 것을 확인할 수 있다.
const p1 = new Programmer('mike', 'javascript');
p1.sayHello();

// 아래와 같이 등호를 사용하면 이 값은
// prototype이 아니라 객체에 할당이 된다.
// 해당 문법을 클래스 필드(class field)라고 부른다.
class Person {
    age = 23;
    constructor(name) {
        this.name = name;
    }
    printName = () => { // 이렇게 메서드에도 등호를 사용할 수 있다.
        console.log(this.name);
    };
}

console.log(Person.prototype.age, Person.prototype.printName);

// 아래 로그를 출력해보면 각각의 객체로 관리되는 것을 확인할 수 있다.
const person1 = new Person('mike');
const person2 = new Person('jane');
person1.age = 100;
console.log(person1.age, person2.age);

// 위와 같이 화살표 함수로 정의하면
// 아래처럼 그 메서드를 전달할 수도 있다.
setTimeout(person1.printName, 100)


// 부모 클래스에서 아래와 같이 클래스 필드로
// 정의하면 자식에서 super를 통해 호출할 수가 없다.
// super는 prototype 기반으로 동작하기 때문이다.
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        console.log(`hello~ ${this.name}!`);
    }
    getRandom = () => {
        return Math.floor(Math.random() * 10);
    }
}

class Programmer extends Person {
    constructor(name, language) {
        super(name);
        this.language = language;
    }
    sayHello() {
        super.sayHello();
        console.log(`I like ${this.language}.`);
        // 클래스 필드로 정의하면 prototype이 아닌 객체에 정의가 되기 때문에
        // 아래 코드는 에러가 발생하게 된다.
        console.log(`Your lucky number is ${super.getRandom()}`);
        // 아래와 같이 this에서 찾게 되면 부모의 getRandom 메서드가 실행이 되는데
        // 클래스 필드로 정의되면서 getRandom 메서드가 객체에 정의가 되어
        // 부모에서 정의한 getRandom 메서드가 실행되는 것이다.
        console.log(`Your lucky number is ${this.getRandom()}`);
    }
    // 이런 혼란스러운 상황을 피하기 위해 자식에서도 클래스 필드로 작성하면 된다.
    getRandom() {
        return 20 + Math.floor(Math.random() * 10);
    }
}

const person1 = new Programmer('mike', 'javascript');
person1.sayHello();

// 클래스의 prototype chain을 다시 보자.
class Person {
    sayHello() {
        console.log(`I'm Person`);
    }
}

class Programmer extends Person {
    sayHello() {
        super.sayHello();

        // 이와 같이 super를 통해 호출하는 것은 아래
        // prototype chain을 이용하여 호출한 것과 같다.
        this.__proto__.__proto__.sayHello.call(this);
        // 좀 더 정확히는 super를 사용하는 메서드는 자기 자신의 클래스를 기억하고 있다.
        // 아래와 같이 클래스를 기억하기 위해 사용하는 변수를 자바스크립트 표준에서는
        // HomeObject라고 부른다.
        // Programmer.__proto__.__proto__.sayHello.call(this);

        console.log(`I'm Programmer`);
    }
}

// 자식의 prototype은 부모의 prototype과 prototype chain으로 연결된다.
console.log(Programmer.prototype.__proto__ === Person.prototype);
// __proto__를 변경한다.
// 이런식으로 변경하면 super를 호출하는 코드쪽에 이상이 생긴다.
Object.setPrototypeOf(Programmer.prototype, {});

const person1 = new Programmer();
person1.sayHello();

// super를 사용하는 메서드는 자기 자신을 기억하기 때문에
// 메서드를 따로 추출해서 사용할 수도 있다.
// this와는 상관없기 때문에 잘 동작한다.
const f1 = person1.sayHello;
f1();


// 아래와 같이 클래스 내부에 클래스 필드로 작성하고
// this로 참조하면 부모쪽 값을 참조하게 된다.
class Person {
    name = 'mike';
    constructor() {
        console.log(this.name);
    }
}

class Programmer extends Person {
    name = 'jane';
}

const person1 = new Programmer();
console.log(person1.name);