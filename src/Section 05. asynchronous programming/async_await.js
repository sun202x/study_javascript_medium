// async await는 자바스크립트에서
// 비동기 프로그래밍을 동기 프로그래밍 방식으로
// 작성하는데 특화된 문법이다.
// async await를 사용하여 비동기 코드를 작성하면
// promise의 then 메서드보다 가독성이 좋아진다.
// 그렇다고 async await가 promise를 완전히 대체하는 것은 아니다.
// promise는 비동기 상태를 값으로 다루기 때문에
// async await보다 큰 개념이다.
// promise는 객체로 존재하지만 async, await는 
// 함수에 적용되는 개념이다.
// 아래 코드 처럼 function 키워드 왼쪽에 async 키워드를 달아주면
// 그 함수는 async await 함수가 되는 것이다.
// async await 함수가 반환하는 값은 항상 Promise 객체이다.
async function getData() {
    return 123;   
}
// 그래서 then 메서드를 사용할 수 있다.
getData().then(data => console.log(data));

// async await 함수에서 반환하는 값이
// Promise라면 그 상태와 데이터를 그대로 반환한다.
async function getData() {
    // 여기서는 fulfilled 상태인 promise를 반환한다.
    return Promise.resolve(123);
}
// 아래의 'fulfilled' 로그가 출력이 된다.
// rejected 상태를 반환한다면 'rejected' 로그가 출력될 것이다.
getData()
    .then(data => console.log('fulfilled', data))
    .catch(data => console.log('rejected', data));

// async await 함수 내부에는 await 키워드를
// 사용할 수 있다. await 키워드 오른쪽에
// Promise 객체를 입력하면 그 Promise가
// settled(fulfilled or rejected) 상태가 될 때까지 기다린다.
// 만약 Promise의 상태가 fulfilled가 되면
// 그 값을 왼쪽에 있는 변수에 저장한다.
// 이런 식으로 await 키워드를 사용하여
// 비동기 코드를 동기 프로그래밍 방식으로
// 코드를 작성할 수 있다.
function requestData(value) {
    // Promise 객체 반환
    return new Promise(resolve => 
        setTimeout(() => {
            console.log('requestData:', value);
            resolve(value);
        }, 1000),
    );
}
async function printData() {
    const data1 = await requestData(10); // settled가 될 때까지 대기1
    const data2 = await requestData(20); // settled가 될 때까지 대기2
    console.log(data1, data2);
}
printData();

// await 키워드 오른쪽의 Promise가
// rejected 상태가 되면 async await 함수는
// 그 Promise의 상태와 데이터를 그대로 반환한다.
async function getData() {
    console.log('getData 1');
    // rejected가 반환되고 아래 코드는 실행되지 않는다.
    await Promise.reject();
    console.log('getData 2');
    await Promise.resolve();
    console.log('getData 3');
}
getData()
    .then(() => console.log('fulfilled'))
    .catch(error => console.log('rejected'));

// await 키워드는 오직 async await 함수에서만
// 사용될 수 있다.
// 아래 코드처럼 일반 함수에서 사용하면 에러가 발생한다.
function getData() {
    const data = await requestData(10);
    console.log(data);
}

// async await와 Promise는 비동기 프로그래밍을
// 동기 프로그래밍 방식으로 작성할 수 있게 해준다.
// 아래 코드는 async await와 Promise를 비교하기 위해
// 동일한 동작을 하도록 구현했다.
function getDataPromise() {
    asyncFunc1()
        .then(data => {
            console.log(data);
            return asyncFunc2();
        })
        .then(data => {
            console.log(data);
        })
}
// async await는 then을 사용하지 않기 때문에 좀 더 간결하다.
async function getDataAsync() {
    const data1 = await asyncFunc1();
    console.log(data1);
    const data2 = await asyncFunc2();
    console.log(data2);
}

// 비동기 함수 간의 의존성이 높아질수록
// async await와 Promise의 가독성 차이는
// 더 선명하게 드러난다.
function getDataPromise() {
    return asyncFunc1()
        .then(data1 => Promise.all([data1, asyncFunc2(data1)]))
        .then(([data1, data2]) => {
            return asyncFunc3(data1, data2);
        });
}
// 아래 코드처럼 복잡한 의존성을 가져도
// 코드가 직관적으로 보인다는 장점이 있다.
async function getDataAsync() {
    const data1 = await asyncFunc1();
    const data2 = await asyncFunc2(data1);
    return asyncFunc3(data1, data2);   
}

// async await 함수에서 여러 비동기 함수를
// 병렬로 처리하는 방법을 알아보자.
// 아래 코드는 순차적으로 실행된다.
// 두 함수간의 의존성이 없다면 동시 실행하는 것이 빠를 것이다.
async function getData() {
    const data1 = await asyncFunc1();
    const data2 = await asyncFunc2();
    // ...
}

// Promise 객체는 생성과 동시에
// 비동기 코드가 실행이 된다.
// 따라서 Promise 객체를 먼저 생성하고
// await 코드를 나중에 입력하면
// 병렬로 실행되는 코드가 된다.
async function getData() {
    const p1 = asyncFunc1();
    const p2 = asyncFunc2();
    const data1 = await p1;
    const data2 = await p2;
    console.log({ data1, data2 });
}
getData();

// 앞에서 작성했던 코드는 아래와 같이
// Promise.all을 사용하면 조금 더 간단하게
// 표현할 수 있다.
// 아래 코드도 마찬가지로 두 개의 Promise 객체를
// 동시에 만들고 매개변수로 입력하기 때문에
// 병렬로 처리된다.
async function getData() {
    const [data1, data2] = await Promise.all([asyncFunc1(), asyncFunc2()]);
    // ...
}

// async await 함수 내부에서 발생한 예외는
// 아래 코드와 같이 try catch문으로 처리하는게 좋다.
// 아래 코드에서는 비동기 함수와 동기 함수가 모두 호출되고 있는데,
// 여기서는 두 함수에서 발생하는 모든 예외가 catch 문에서
// 처리가 된다.
// 만약 아래 함수가 async await 함수가 아니었다면
// doAsync에서 발생한 예외는 catch문에서 처리가 되지 않는다.
// 이는 doAsync 함수의 처리가 끝나는 시점을 알 수 없기 때문이다.
async function getData() {
    try {
        await doAsync();
        return doSync();
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
}

// 아래 함수에서는 Thenable이라는 것을
// 사용했는데, Thenable은 Promise 처럼 동작하는 객체이다.
// Promise가 ES6에 등장하기 이전부터 Promise를 대체하는
// 라이브러리를 사용해 왔는데 async await는 Promise가 아니더라도
// then 메서드를 가진 객체를 Promise 처럼 취급한다.
// 이런 식으로 ES6의 Promise가 아니더라도 then 메서드를
// 가진 객체를 Thenable이라고 부른다.
class ThenableExample {
    // then 메서드를 정의했다.
    then(resolve, reject) {
        setTimeout(() => resolve(123), 1000);
    }
}
async function asyncFunc() {
    // ThenableExample로 생성한 객체는 Thenable이다.
    const result = await new ThenableExample();
    console.log(result);
}
asyncFunc();
// 위 코드는 정상적으로 동작한다.