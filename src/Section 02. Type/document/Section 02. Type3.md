# String 타입
자바스크립트에서는 아래와 같은 방식으로 문자열을 표현할 수 있다.
```javascript
const s1 = 'abc';
const s2 = "abcd";
const s3 = `abcd`;
```

문자열은 length라는 속성값을 가지며 이것으로 문자열의 길이를 알 수 있다.
```javascript
console.log(s1.length, s2.length, s3.length);
```

## 문자열 조합
아래와 같이 여러개의 변수를 사용하여 문자열을 조합할 수 있다. + 연산자를 사용한 방법과 템플릿 리터럴 문법을 사용한 방법이 있다.  
템플릿 리터럴 문법을 사용하면 ${}안에 변수를 넣어 사용할 수 있어 편리하다.
```javascript
const name = 'mike';
const age = 23;
// + 연산자
const text1 = 'name: ' + name + ', age: ' + age;
// 템플릿 리터럴
const text2 = `name: ${name}, age: ${age}`;
console.log(text1);
console.log(text2);
```

## 개행
따옴표안에서 줄바꿈 할 경우 \n를 사용한다. 그러나 template literal 안에서는 그냥 엔터를 입력하여 사용한다.
```javascript
// 따옴표
const text1 = '할 일 목록\n* 운동하기\n* 요리하기';
console.log(text1);

// 템플릿 리터럴
const text2 = `할 일 목록
* 운동하기
* 요리하기
`;
console.log(text2);
```

## 문자열 캐릭터 추출
문자열의 캐릭터를 추출할때는 아래와 같이한다. 자바스크립트의 string 타입은 불변(immutable)이기 때문에 변경은 불가하다.
```javascript
const s1 = 'abcd';
const c1 = s1[1]; // 인덱스로 추출
console.log(c1);

const s2 = 'abcd';
s2[1] = 'z'; // 수정할 수 없다.
console.log(s2);
```

## 문자열 변경
String의 replace 함수를 사용하여 문자열을 변경할 수 있다. replace 함수를 통해 반환된 값은 새로운 문자열이다.(기존과 다른 메모리 주소를 갖는다)  
모든 지정된 문자열을 변경하고 싶은 경우 정규식을 활용하거나 비교적 최근에 추가된 replaceAll 함수를 사용할 수도 있다.
```javascript
const input = 'This is my car. The car is mine';
const ouput  = input.replace('car', 'bike'); // 새로운 문자열을 생성한다.
console.log({ input, output });

// 정규식 활용
console.log(input.replace(/car/g, 'bike'));
// replaceAll
console.log(input.replaceAll('car', 'bike'));
```

## 문자열 검사
아래 함수들을 사용하여 특정위치에 문자열이 있는지 검사할 수 있다.
```javascript
const s1 = 'This is my car. The car is mine';
// 포함여부 검사
console.log(s1.includes('car'));
console.log(s1.includes('my car'));
console.log(s1.includes('my car', 10));

// 지정된 문자열로 시작되는지 검사
console.log(s1.startsWith('This is'));
console.log(s1.startsWith('is'));

// 지정된 문자열로 끝나는지 검사
console.log(s1.endWith('min'));
console.log(s1.endWith('is'));
```

## 문자열 추출
아래 함수들을 사용하여 문자열의 일부를 추출할 수 있다.
- substr
  - 첫번째 파라미터는 문자열의 위치, 두번째는 길이를 입력한다.
- slice
  - substr과 거의 비슷하지만 두번째 파라미터에 index를 입력한다.
- indexOf
  - 입력된 문자열의 위치를 반환한다.
- lastIndexOf
  - 입력된 문자열의 마지막 위치를 반환한다.
- match
  - 정규식을 사용하여 해당되는 문자열을 추출할 수 있다.
```javascript
const s1 = 'This is my car. The car is mine';

// substr
console.log(s1.substr(0, 4));
console.log(s1.substr(5, 2));
console.log(s1.substr(16));

// indexOf
let pos = s1.indexOf(' ');
console.log(s1.substr(0, pos));

// lastIndexOf
pos = s1.lastIndexOf(' ');
console.log(s1.substr(0, pos + 1));

// slice
console.log(s1.slice(5, 7));

// 정규식
const s1 = 'This is my car. The car is mine';
console.log(s1.match(/T[^\s-]*/g));
```

## 문자열 분할, 재구성
아래 함수들을 사용하여 문자열을 분할하고 다시 합칠수도 있다.  
- split
  - 입력된 문자열로 분할한다.  
- trim
  - 분할된 문자열의 공백을 제거한다.  
- join
  - 분할된 문자열을 가지고 join 함수에 입력된 문자로 합친다.  
- padStart, padEnd
  - 문자열을 일정 길이 이상으로 만들면서 빈 공간에 패딩 문자를 채울수 있다.
```javascript
const s1 = 'This is my car. The car is mine';

// split
console.log(s1.split(' '));

// trim
const arr = s1.split('.');
console.log(arr);
console.log(arr.map(item => item.trim()));

// join
console.log(s1.split(' ').join());
console.log(s1.split(' ').join('..'));

// padStart, padEnd
console.log('12'.padStart(5, '0')); // 앞 부분에 패딩이 들어간다.
console.log('123'.padStart(5, '0'));
console.log('123'.padStart(5, '*'));
console.log('123'.padEnd(5, '*'));  // 뒷 부분에 패딩이 들어간다.
```

## tagged template literals
아래 로직은 다소 독특해 보이는데 tagged template literals 문법이라고 한다.  
template literal을 사용하여 함수를 호출하는데, 아래와 같이 문자열과 표현식(변수 부분)으로 함수에서 받을 수 있다.
```javascript
function taggedFunc(strings, ...expressions) {
    console.log({ strings, expressions });
    return 123;
}

const v1 = 10;
const v2 = 20;
const result = taggedFunc`a-${v1}-b-${v2}`;

console.log({ result });

// strings의 아이템 개수는 expressons보다 항상 하나 더 많다.
taggedFunc`a-${v1}-b-${v2}-c`;
// 이런 식으로 expression으로 끝날 경우 빈 문자열이 strings로 들어간다.
taggedFunc`a-${v1}-b-${v2}`;
taggedFunc`${v1}-b-${v2}`;
```

tagged template literals 문법을 아래와 같이 활용할 수도 있다.  
아래와 같이 표현식만 강조하고 싶은 경우 highlight함수를 통해 <strong> 태그를 입력한다.
```javascript
function highlight(strings, ...expressions) {
    return strings.reduce(
        (acc, str, i) =>
            expressions.length === i
                ? `${acc}${str}`
                : `${acc}${str}<strong>${expressions[i]}</strong>`,
        '',
    );
}

const v1 = 10;
const v2 = 20;
const result = highlight`a ${v1} b ${v2}`;
console.log(result);

highlight(['a ', ' b ', ''], v1, v2);
```