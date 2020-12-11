// 자바스크립트에서는 이렇게 함수 안에 this를 사용할 수 있다.
function Counter() {
    this.value = 0; // this의 value라는 속성에다 0을 할당한다.
    this.add = amount => { // 그리고 add 라는 화살표 함수를 생성했다.
        this.value += amount; // 화살표 함수 안에서도 this를 사용했다.
    };
}
// new 키워드를 통해 해당 함수의 인스턴스를 생성한다.
// 이런식으로 new 키워드를 통해 인스턴스를 생성하면,
// 그 안에서 쓰인 this는 이 counter 객체를 가리키게 된다.
const counter = new Counter();
// 따라서 생성된 counter 객체에서 value와 add를 사용할 수 있다.
console.log(counter.value);
counter.add(5);
console.log(counter.value);
const add = counter.add;
add(5);
console.log(counter.value);


function Counter2() {
    this.value = 0;
    // 여기에서는 화살표 함수를 쓰지 않았다.
    this.add = function (amount) {
        this.value += amount;
        // console.log(this === global);
    };
}
const counter2 = new Counter2();
console.log(counter2.value);
counter2.add(5);
console.log(counter2.value);
// 위 로직까지는 이전 함수 실행 결과와 동일하다.

// 그러나 아래와 같이 add 메서드를 변수로 할당하고
// 그것을 호출해서 결과를 확인해보자.
const add2 = counter2.add;
add2(5); // 기존 값인 5에서 5를 더하므로 10이 되어야 할 것 같지만,
console.log(counter2.value); // 실행을 해보면 5가 찍힌다.

// 위와 같은 오류가 발생하는 이유는 add2 함수가 호출 될때
// this가 가리키는게 counter2 변수가 아니기 때문이다.
// 일반 함수의 this는 이 함수를 호출한 주체를 가리킨다.
// 따라서 add2 함수의 this는 전역 객체가 되어 버린다.

// 화살표 함수를 사용하면 생성될 당시의 this를 가리키기 때문에
// 같은 코드라도 오류가 발생하지 않게 된다.
function Counter() {
    this.value = 0;
    this.add = amount => {
        this.value += amount;
    };
}
const counter = new Counter();
console.log(counter.value);
counter.add(5);
console.log(counter.value);
const add = counter.add;
add(5);
console.log(counter.value);

// 이것은 클래스의 경우에도 마찬가지로 적용된다.
class Counter3 {
    value = 0;
    // 이런 식으로 일반함수로 정의했을 때는 this가 동적으로 결정되지만
    add(amount) {
        this.value += amount;
    }
    // 화살표 함수로 정의할 경우에 this는 항상 Counter3 클래스의 객체를 가리킬 것이다.
    add = (amount) => {
        this.value += amount;
    }
}

// 이렇게 객체로 감싸서 처리하는 경우에는
// 일반함수를 사용하면 동일하게 동작한다.
const counter3 = {
    value: 0,
    // add: function (amount) {
    //     this.value += amount;
    // }
    // 그러나 화살표 함수를 사용하면 생성될 때 아직 감싸고 있는 일반 함수가
    // 없기 때문에 항상 전역 객체를 가리키게 된다.
    add: (amount) => {
        this.value += amount;
    }
};
console.log(counter3.value);
counter3.add(5);
console.log(counter3.value);
const add3 = counter3.add;
add3(5);
console.log(counter3.value);