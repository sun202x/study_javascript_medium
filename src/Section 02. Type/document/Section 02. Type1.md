# Section 2. Type
프로그래밍에서 연산을 할 때는 값의 타입이 중요하다. 아래와 같이 동일한 연산자를 사용해도 값의 타입에 따라 결과가 다르다. 
```javascript
console.log(10 + 5);     // 15
console.log('10' + '5'); // 105
```

## 데이터 타입
자바스크립트에는 아래와 같이 8가지 기본 타입이 있다.
- number
- bigint
- string
- boolean
- object
- symbol
- undefined
- null

```javascript
const v1 = 12;      // number
const v2 = 123456789123456789123456789n; // bigint
const v3 = 'ab';    // string
const v4 = true;    // boolean
console.log(typeof v1, typeof v2, typeof v3, typeof v4);

const v5 = {};              // object
const v6 = Symbol('abc');   // symbol
const v7 = undefined;       // undefined
const v8 = null;            // null
console.log(typeof v5, typeof v6, typeof v7, typeof v8);
```
null의 경우 타입이 object로 출력되는데 이는 초기 자바스크립트의 오류 때문이다. 후에 버그를 수정하려는 시도가 있었지만 하위호환성을 위해 그대로 유지하기로 했다.


아래와 같이 object로부터 파생된 타입도 있다.
```javascript
function f1() {}
console.log(typeof f1); // type is 'function'
```
class는 함수를 기반으로 만들어 졌으므로 타입이 function이다.
```javascript
class MyClass {}
console.log(typeof MyClass); // type is 'function'
```


아까 보았듯이 typeof 키워드로는 null 타입을 판별할 수 없는데 어떻게 해야할까? null을 구분하기 위해서는 아래와 같이 Object의 toString 함수를 사용해야 한다.
```javascript
console.log(Object.prototype.toString.call(null));
```
배열도 typeof로는 구분할 수 없지만, Object의 toString으로 구분할 수 있다.
```javascript
console.log(typeof []); // type is 'object'
console.log(Object.prototype.toString.call([])); // [object Array]
```
이렇듯 Object의 toString으로 더 세세한 타입도 구분할 수 있다.


symbol은 유일한 속성 이름을 만들 때 사용한다. 아래와 같이 symbol을 사용하여 값을 입력하면 이름 충돌 문제를 피할 수 있다.
```javascript
const idSymbol = Symbol('id');
const obj = { id: 123 };
obj[idSymbol] = 456;
console.log(obj);    // { id: 123, [Symbol(id)]: 456 }
```
자바스크립트에는 내장된 몇가지 symbol이 있는데, 대표적으로 iterator가 있다.
```javascript
const arr = [];
console.log(arr[Symbol.iterator]); // [Function: values]
```

## 데이터 타입변환
String, Number, BigInt, Boolean으로 타입변환 하는 방법을 알아보자. 타입을 변환하기 위해 아래와 같이 사용할 수 있다.
```javascript
const v1 = String(123);
const v2 = String(new Date());
console.log(typeof v1, v1);
console.log(typeof v2, v2);

const v3 = Number('123');
const v4 = BigInt('123');
console.log(typeof v3, v3);
console.log(typeof v4, v4);
```

아래 코드는 boolean 타입으로 변환하는 코드이다.
```javascript
const v1 = Boolean(123);
const v2 = Boolean(0);
console.log(typeof v1, v1);
console.log(typeof v2, v2);

const v3 = Boolean('abc');
const v4 = Boolean('');
console.log(typeof v3, v3);
console.log(typeof v4, v4);

const v11 = !!123;
const v12 = !!0;
const v13 = !!'abc';
const v14 = !!'';
console.log(typeof v11, v11);
console.log(typeof v12, v12);
console.log(typeof v13, v13);
console.log(typeof v14, v14);
```

new 키워드를 사용하면 object로 생성된다.
```javascript
console.log(typeof new Boolean(true));  // object
console.log(typeof new Number(1));      // object
console.log(typeof new String('abc'));  // object
```

속성값을 추가해서 사용할게 아니라면 new 키워드를 통해 생성할 필요가 없다.
```javascript
const s1 = new String('abc');
s1.id = 123; // 속성 추가
console.log('value:', s1.valueOf());
console.log('id:', s1.id);
```

## 데이터 값 비교
자바스크립트에서 값을 비교하는 방법은 아래와 같이 두가지가 있다. 등호를 3개 사용할 경우 두 값의 타입과 값이 모두 같은지 검사한다.
```javascript
console.log(123 === 123);       // true
console.log('123' === '123');   // true
console.log('123' === 123);     // false
console.log(0 === false);       // false
console.log(123 === true);      // false
```
등호 2개를 사용할 경우 두 값의 타입을 변환하면서 까지 비교한다. 그렇기 때문에 동작하는 로직이 다소 복잡해져 등호 3개를 쓰는 것이 좋다.
```javascript
console.log(123 == 123);        // true
console.log('123' == '123');    // true
console.log('123' == 123);      // true
console.log(0 == false);        // true
console.log(123 == true);       // false
```
마지막 라인의 경우 내부 로직때문에 비교가 제대로 되지 않는다. 가급적이면 내부 로직을 이해하기 보다는 등호 3개를 쓰는 것이 바람직하다.