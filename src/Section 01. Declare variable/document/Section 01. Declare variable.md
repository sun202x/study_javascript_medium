# Section 1. 변수 선언
자바스크립트에서 변수 선언하는 방법을 알아보자.  
ES5 이전 까지는 변수를 var 키워드로만 정의 했었다. ES6가 나오고 나서부터는 const, let 키워드로도 변수 정의가 가능해졌다.

## var의 문제점
var 키워드를 통해 생성된 변수들은 아래와 같이 몇가지 문제점을 가진다.

### 1. 정의된 변수가 함수 scope를 가진다.
scope는 변수가 사용될 수 있는 영역을 말하며 변수가 정의된 위치에 의해서 결정된다. 이런 특징 때문에 아래와 같은 로직에서는 에러가 발생한다.
```javascript
function example() {
    var i = 1;
}

console.log(i); // ReferenceError 발생
```

var 키워드 없이 작성된 변수는 global scope에 선언된다. 아래 로직을 실행하면 다른 함수에서 할당한 i의 값을 확인할 수 있다. 이런 코드들은 에러가 발생하기 쉬우므로 use strict를 사용하여 제한하는 것이 좋다.
```javascript
// 아래와 같이 선언하면 명시적으로 ReferenceError가 발생한다.
'use strict';

function example1() {
    i = 1; // 전역에 선언된다.
}

function example2() {
    console.log(i);
}

example1();
example2();
```

또한 var는 함수 scope이기 때문에 for문에서 정의된 변수가 반복문이 끝난 이후에도 계속 남아있다.(**while, switch, if문도 동일**)
```javascript
for (var i = 0; i < 10; i++) {
    console.log(i);
}

console.log('last:', i); // for문에서 사용된 값이 여전히 남아있다.
```

위와 같은 오류를 만들지 않기 위해서 아래와 같이 즉시실행 함수를 사용하여 var 변수의 scope를 제한할 수 있다.
```javascript
(function () {
    for (var i = 0; i < 10; i++) {
        console.log(i); // var는 함수 scope 이기 때문에 여기서만 쓰인다.
    }
})();
console.log('last:', i); // ReferenceError
```
그러나 위와 같이 var 변수의 scope를 제한하기 위해 번거롭게 로직을 작성해야하고 가독성도 좋아지지 않는다.

### 2. hoisting
var로 정의될 경우 함수의 최상단으로 끌어올려지는데 이를 호이스팅(hoisting)이라고 한다. 그래서 아래와 같이 변수 정의전에 사용해도 에러가 발생하지 않는다.
```javascript
console.log(myVar); // 에러가 발생하지 않는다.
var myVar = 1;
```
위 로직은 아래와 같다.
```javascript
var myVar = undefined;  // 이런 식으로 undefined가 할당된다.
console.log(myVar);     // 그래서 undefined가 출력되는 것이다.
myVar = 1;
```
hoisting은 이러한 특징 때문에 변수가 선언되기도 전에 값을 할당할 수도 있다.
```javascript
console.log(myVar);
myVar = 2;
console.log(myVar);
var myVar = 1;
```
위 로직을 실행해보면 첫 번째 로그는 undefined, 두 번째 로그는 2가 출력되는 것을 확인할 수 있다.


이처럼 hoisting은 직관적이지 않고 보통의 언어에서 찾아보기 힘든 기능이다.

### 3. 변수 재정의
아래 코드와 같이 변수를 재정의 하여도 에러 없이 사용된다는 것은 직관적이지 않으며 버그로 이어질 가능성이 크다.
```javascript
var myVar = 1;
var myVar = 2;
```

### 4. 재할당 불가능한 변수 정의불가
재할당 불가능한 변수를 잘 활용할 경우 코드의 복잡도가 낮아지고 가독성이 높아진다는 장점이 있다. 그러나 var 키워드를 통해 변수를 생성할 경우 재할당 가능한 변수밖에 생성하지 못하기 때문에 이러한 장점을 누리지 못한다.
```javascript
var PI = 3.141592;
PI = 123; // 이런 식으로 재할당이 가능하기 때문에 상수값을 보장하지 못한다.
```

## const와 let
const와 let은 ES6부터 추가된 변수 정의 키워드이다. const와 let은 블록 scope를 가지며 함수 scope의 대부분 단점이 블록 scope에는 없다. 대부분의 언어가 블록 scope를 가지기 때문에 다른 언어를 사용했을 경우 더 익숙할 것이다.
```javascript
if (true) {
    const i = 0; // 이런 식으로 블록 안에서만 변수가 유효하다.
}
console.log(i); // ReferenceError
```
블록 scope를 가지기 때문에 아래처럼 중복으로 변수를 선언한다 해도 if 문 안에서는 별 개의 변수로 사용할 수 있다.
```javascript
let foo = 'bar1';
console.log(foo); // bar1
if (true) {
    const foo = 'bar2';
    console.log(foo); // bar2
}
console.log(foo); // bar1
```
물론 const와 let으로 정의된 변수도 호이스팅이 된다. 하지만 변수 정의전에 사용하려 하면 ReferenceError가 발생하게 된다. var 키워드와 다른 점은 var 키워드는 hoisting된 후 undefined가 할당되지만 const와 let은 아무 것도 할당되지 않는다.(메모리 주소가 할당되지 않는다는 말인듯함)
```javascript
console.log(foo); // ReferenceError
const foo = 1;
```
만약 const 변수가 hoisting되지 않았다면 console.log에는 1이라는 값이 출력됐겠지만, 아래 로직을 실행해보면 hoisting 되기 때문에 ReferenceError가 발생하는 것을 확인할 수 있다.
```javascript
const foo = 1;
{
    console.log(foo); // 아래 foo 변수가 hoisting 되어 아무 것도 할당되지 않았다.
    const foo = 2;    // 이 코드를 주석처리한다면 에러가 발생하지 않는다.
}
```
var 키워드를 사용하여 위 코드처럼 동작하는 코드를 작성하면 아래와 같을 것이다.
```javascript
var foo = 1;
(function () {
    console.log(foo); // undefined
    var foo = 2;
})();
```
const와 let과 다른 점은 undefined가 출력된다는 점이다.


const는 재할당이 불가능하지만 let은 재할당이 가능하다.
```javascript
const bar = 'a';
bar = 'b';      // TypeError: Assignment to constant variable.

var foo = 'a';
foo = 'b';

let value = 'a';
value = 'b';    // let은 재할당이 가능하다.
```
재할당이 불가능한 변수는 프로그램의 복잡도를 낮춰주기 때문에 되도록이면 재할당 불가능한 변수를 사용하는게 좋다.


재할당이 불가능한 변수를 사용할 때 주의해야할 점은 객체의 property 값은 변경이 가능하다. 이미 존재하는 property뿐만 아니라 새로운 속성값 추가도 가능하다. 내부 속성값도 변경불가능하게 하려면 immer와 같은 외부패키지를 활용하는 것이 좋다.
```javascript
const bar = { prop1: 'a' };
bar.prop1 = 'b'; // 이런 식으로 property는 변경가능
bar.prop2 = 123; // 새로운 property도 추가가능

console.log(bar);

const arr = [10, 20];
arr[0] = 100;    // 배열도 마찬가지
arr.push(300);   // 물론 push 사용하여 요소추가도 가능

console.log(arr);
```

단지 수정만 불가능하게 하고 싶으면 이와같은 자바스크립트 내장함수를 사용하면 된다.
```javascript
'use strict';

const bar = Object.freeze({ prop1: 'a' });
bar.prop1 = 'b'; // error가 발생한다.
console.log(bar);
```


자바스크립트에서 객체의 property의 변경, 추가, 제거를 막기위한 방법으로는 아래 Object 메서드들을 사용하는 방법이 있다.
- Object.preventExtensions
  - 새 property 추가를 막는다.
  - __proto__에도 마찬가지로 추가 불가다.
- Object.seal
  - 객체를 밀봉한다. 
  - property의 값은 변경가능하나, property의 추가/삭제는 불가능하다.
- Object.freeze
  - property의 추가/삭제/값 수정/재구성, prototype 변경 모두 불가능하다.


const로 정의된 경우 아래와 같이 재할당만 불가능하다.
```javascript
const bar = { prop1: 'a' };
bar = { prop2: 123 };
```