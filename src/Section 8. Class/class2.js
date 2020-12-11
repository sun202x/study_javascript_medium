// 아래와 같이 클래스에는 static 키워드를 통해
// 정적 멤버변수나 정적 메서드를 정의할 수 있다.
class Person {
    static CURRENT_ID = 1;
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.id = Person.CURRENT_ID++;
    }
    static getYounger(p1, p2) {
        return p1,age <= p2.age ? p1 : p2;
    }
}
// static 키워드로 정의된 것들은 아래와 동일하다.
// 이렇게 생성자 함수에 직접 붙이는 것이다.
// 따라서 static으로 정의된 것들은 객체가 아니라 
// 클래스에 하나만 만들어진다.
Person.getYounger = function (p1, p2) {
    return p1,age <= p2.age ? p1 : p2;
};
Person.CURRENT_ID = 1;

const person1 = new Person('mike', 23);
const person2 = new Person('jane', 32);
const younger = Person.getYounger(person1, person2);
console.log(younger.name);
// 아래 결과 값은 3이 출력된다.
console.log(Person.CURRENT_ID);


// static 멤버 변수나 static 메서드도 상속이 된다.
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    static getYounger(p1, p2) {
        return p1,age <= p2.age ? p1 : p2;
    }
}
class Programmer extends Person {};

// 아래와 같이 접근이 가능한 것은 생성자 함수끼리
// prototype chain으로 묶여있기 때문이다.
console.log(Programmer.getYounger);
console.log(Object.getPrototypeOf(Programmer) === Person);


class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    // static 메서드
    static getYounger(p1, p2) {
        return p1,age <= p2.age ? p1 : p2;
    }
    // 클래스 필드
    printName = () => {
        console.log(this.name);
    };
}
// 클래스 상속
class Programmer extends Person {
    // 일반 메서드
    sayHello() {
        console.log(`hello~ I'm Programmer`);
    }
}

const p1 = new Programmer('mike', 23);
// class2.png

// 일반적으로 객체지향 언어에서는
// public(둘다 O), protected(객체 x, 자식 O), private(둘다 X)
// 세가지 방식으로 접근 범위를 설정할 수 있다.
// 기본적으로는 public이다.
class Person {
    // 만약 private으로 설정하고 싶다면 아래와 같이 정의하면 된다.
    #name = '';
    // protected는 일반적으로 지원하지 않고 아래와 같이 _를 붙이는 컨벤션을 지키는게 일반적이다.
    _age = 23;
    constructor(name) {
        this.#name = name;
    }
    // 메서드도 가능하나 아직 표준은 아니다(곧 가능)
    // #sayHello() {
    //     console.log(`hello~ ${this.#name}!`);
    // }
}

class Programmer extends Person {
    sayHello() {
        console.log(this.name);
        // 자식에서는 사용불가다.
        console.log(this['#name']);
    }
}

const person1 = new Programmer('mike');
person1.sayHello();
console.log(person1.name);
// 외부에서도 마찬가지다.
console.log(person1['#name']);

// 이렇게 자바스크립트 내장 클래스를 상속받아
// 새로운 클래스를 정의할수도 있다.
class PersonArray extends Array {
    filterYounger(age) {
        return this.filter(item => item.age <= age);
    }
}

const arr = new PersonArray(
    { name: 'mike', age: 20 },
    { name: 'jane', age: 30 },
    { name: 'jack', age: 40 }
)
// 이 때 한가지 주의해야 할점이 filterYounger를 사용하면
// Array의 객체가 아닌 PersonArray의 객체로 생성된다.
const arr2 = arr.filterYounger(35);
console.log(arr2);

// 따라서 filterYounger 함수를 호출할 수 있다.
const arr3 = arr.filterYounger(25);
console.log(arr3);

// instanceof를 사용하여 왼쪽 객체가 
// 오른쪽 클래스의 객체인지 검사할 수 있다.
class Person {}
function Person2() {}

const person1 = new Person();
const person2 = new Person2();
const arr = [];

console.log(person1 instanceof Person);
console.log(person2 instanceof Person2);
console.log(arr instanceof Array); // 리터럴 문법도 마찬가지다

// instanceof 부모 클래스도 검사해준다.
class Person {}
class Programmer extends Person {}

const person1 = new Programmer();

console.log(person1 instanceof Programmer);
console.log(person1 instanceof Person);
console.log(person1 instanceof Object);

// instanceof는 prototype 기반으로 검사한다.
console.log(person1.__proto__ === Programmer.prototype);
console.log(person1.__proto__.__proto__ === Person.prototype);
console.log(person1.__proto__.__proto__.__proto__ === Object.prototype);

// instanceof 오른쪽 클래스가 Symbol.hasInstance
// 프로퍼티를 가지고 있다면 그것을 사용한다.
class Person {
    constructor(personId) {
        this.personId = personId;
    }
    static [Symbol.hasInstance](obj) {
        return !!obj.personId;
    }
}

const person1 = new Person(1);
const person2 = {
    personId: 2,
};
const person3 = {};

console.log(person1 instanceof Person);
console.log(person2 instanceof Person);
console.log(person3 instanceof Person);

// 자바스크립트는 다중상속을 지원하지 않는다.
class Person {
    walk() {
        console.log('walk');
    }
}
class Korean {
    sayHello() {
        console.log('안녕하세요');
    }
}
// 아래 로직을 실행하면 에러가 발생한다.
class KoreanPerson extends Korean, Person {}

function getParents() {
    return class extends Korean {
        walk() {
            console.log('walk');
        }
    }
}
// extends 옆에는 표현식을 사용할 수도 있다.
class KoreanPerson extends getParents() {}

// 아래 코드는 정상 동작한다.
const k1 = new KoreanPerson();
k1.walk();
k1.sayHello();

// 다중 상속을 구현할 수도 있긴하다...
const aggregation = (baseClass, ...mixins) => {
    // http://stackoverflow.com/a/45332959/12896859
};

class Person {
    walk() {
        console.log('walk');
    }
}
class Korean {
    sayHello() {
        console.log('안녕하세요');
    }
}

class KoreanPerson extends aggregation(Korean, Person) {}

const k1 = new KoreanPerson();
k1.walk();
k1.sayHello();