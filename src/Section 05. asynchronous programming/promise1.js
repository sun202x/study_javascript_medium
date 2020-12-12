// 자바스크립트에서 비동기 처리하는 방식을 알아보자.
// 자바스크립트에서는 비동기 처리 방식으로 크게 두가지로 나눌 수 있는데
// Promise와 콜백 패턴 방식이다.
// Promise 이전에는 콜백 패턴이 많이 쓰였다.
// 아래 로직에서 작성한 함수가 콜백 패턴 방식으로
// 비동기 처리 한다.
// 
function requestData(callback) {
    setTimeout(() => {
        // 비동기 처리가 끝나면 입력받은 콜백 함수를 호출한다.
        callback({ name: 'abc', age: 23 });
    }, 1000);
}

function onSuccess(data) {
    console.log(data);
}
console.log('call requestData');
requestData(onSuccess);

// 콜백 패턴은 콜백이 조금만 중첩돼도
// 코드가 상당히 복잡해지는 단점이 있다.
// 아래 코드를 보면 간단한 동작을 하는데도
// 상당히 복잡해 보인다.
function requestData1(callback) {
    // ...
    callback(data);
}
function requestData2(callback) {
    // ...
    callback(data);
}
function onSuccess1(data) {
    console.log(data);
    requestData2(onSuccess2);
}
function onSuccess2(data) {
    console.log(data);
    // ...
}
requestData1(onSuccess1);

// 위 코드를 Promise로 작성한 예이다.
// Promise는 비동기 상태를 값으로 다룰 수 있는
// 객체이다.
// Promise를 사용하면 비동기 코드를
// 동기 프로그래밍 방식으로 코드를 작성할 수 있다.
// 아래 로직에서는 먼저 비동기 함수를 호출하고,
requestData1()
    .then(data => {
        // 끝나면 데이터를 받아 필요한 처리를 한다.
        console.log(data);
        // 그리고 두번째 함수를 호출한다.
        return requestData2();
    })
    .then(data => {
        // 두 번째 비동기 처리가 끝나면
        // 데이터를 받아 필요한 처리를 한다.
        console.log(data);
        // ...
    });

// Promise 객체는 다음 세가지 방식으로 생성할 수 있다.
// 대표적으로는 new 키워드를 사용하여 생성하는 것이고,
// 아래와 같이 함수를 사용하여 생성할 수도 있다.
// new 키워드로 생성시 함수를 파라미터로 넘기고 있는데,
// 이 함수의 파라미터로 넘어오는 것들(resolve, reject)이
// 비동기 처리가 끝난 후 실행될 함수들이다.
// 이 함수들을 통해 비동기 처리가 끝났다는 것을 알려줄 수 있다.
const p1 = new Promise((resolve, reject) => {});
const p2 = Promise.reject('error message');
const p3 = Promise.resolve(param);

// Promise 객체는 세 가지 상태를 가질 수 있다.
`대기 중(pending) - 비동기 처리가 끝나지 않았을 때`
`성공(fulfiled) - 비동기 처리가 성공 했을 때`
`실패(rejected) - 비동기 처리가 실패 했을 때`

// fulfilled 또는 rejected 상태를 settled 상태라고 부르기도 한다.
// promise는 settled 상태가 되면 더 이상 다른 상태로 변경되지 않는다.
// pending 상태일 때만 다른 상태로 변할 수 있다.

// new 키워드를 사용했을 때는 처음에 pending 상태가 된다.
// 그리고 resolve, reject 함수가 호출되기 전까지 상태가 변경되지 않는다.
// resolve를 호출하면 fulfilled 상태가 된다.
// 그리고 reject를 호출하면 rejected 상태가 된다.
const p1 = new Promise((resolve, reject) => {});
// Promise 메서드를 통해 객체를 생성할 경우
// 각 메서드에 맞는 상태인 promise 객체가 생성된다.
// promise 객체는 상태 말고도 데이터를 가질 수 있는데,
// Promise 메서드에 전달하는 파라미터들이 promise의 데이터라고 할 수 있다.
const p2 = Promise.reject('error message');
const p3 = Promise.resolve(param);
// 물론 new 키워드를 통해 생성한 후 resolve, reject 함수에 넘겨주는 파라미터들도 데이터들이다.

// promise 객체는 then 메서드를 가지고 있다.
// then 메서드는 비동기 처리가 끝난 다음에 처리할 일을 정의할 수 있다.
// 아래코드에는 onResolve와 onReject 함수가 있는데
// fulfilled 상태가 되면 onResolve 함수가 호출이 되고,
// rejected 상태가 되면 onReject 함수가 호출이 된다.
requestData().then(onResolve, onReject);
// 따라서 아래처럼 fulfilled 상태인 객체의 then 메서드를 호출하면
// 첫 번째 함수가 실행이 되고,
Promise.resolve(123).then(data => console.log(data));
// rejected 상태인 객체의 then 메서드를 호출하면 두번째 함수가 실행이 된다.
Promise.reject('error').then(null, data => console.log(data));

// then 메서드는 이렇게 체인 형식으로 쓸 수 있다.
// 이것은 항상 then 메서드가 promsie를 반환하기 때문이다.
// promise를 반환하는 함수1
requestData1()
    .then(data => {
        console.log(data);
        // promise를 반환하는 함수2
        // promise를 반환할 경우 그대로 then 메서드의 반환 값이 된다.
        return requestData2();
    })
    .then(data => {
        // data: requestData2의 반환 값
        console.log(data);
        // 만약 반환하는 값이 promise가 아닌 경우 그 값을 가지는 promise로 반환한다.
        // 상태는 fulfilled
        return data + 1;
    })
    .then(data => {
        console.log(data);
        // 아래와 같이 예외를 발생시키면 역시나 그 값을 가지는 promise가 반환된다.
        // 상태는 rejected
        throw new Error('some error');
    })
    .then(null, error => {
        console.log('error!!!');
        // 여기서는 아무 값도 반환하지 않지만 undefined를 가진 promise가 반환된다.
        // 상태는 fulfilled
    })
    .then(data => {
        // data: undefined
        console.log(data);
    })

// 아래처럼 promise의 상태가 rejected 임에도
// 두 번째 함수를 작성하지 않았을 때는
// then 메서드에서 그대로 promise 객체를 반환한다.
Promise.reject('err')
    // Promise.reject('err')를 그대로 반환
    .then(() => console.log('then 1'))
    // Promise.reject('err')를 그대로 반환2
    .then(() => console.log('then 2'))
    .then(
        () => console.log('then 3'),
        // 여기가 호출이 된다.
        // 아무 값도 반환하지 않으므로 undefined를 가진 promise 반환
        () => console.log('then 4')
    )
    .then(
        // 이번엔 여기가 호출된다.
        () => console.log('then 5'),
        () => console.log('then 6')
    )
// then 메서드의 특징은 위와같이 연결된 순서대로 호출된다는 점이다.
// 이 특징은 promise를 가지고 비동기 처리를 동기적으로 처리할 수 있게 해준다.

// promise 객체에는 catch라는 메서드가 있는데
// 이 메서드는 rejected 상태의 promise 객체를 처리하기 위해 사용된다.
// then 메서드에 두번째 함수를 입력하는 것과 동일하다.
// 그러나 예외 처리를 할 때는 then 메서드보단 catch 메서드를 사용하는 것이
// 가독성에 더 좋다.
Promise.reject(1).then(null, error => {
    console.log(error);
});
Promise.reject(1).catch(null, error => {
    console.log(error);
});

// 아래 코드에서는 첫 번째 함수(resolve)에서
// 예외를 발생시키고 있지만,
// 같이 작성한 두 번째 함수는 호출되지 않는다.
Promise.reject(1).then(
    () => {
        throw new Error('some error');
    },
    error => {
        console.log(error);
    }
);
// 예외를 처리하고 싶다면 다음 then에서 처리해야 한다.
// .then(null, error => {
//     console.log(error);
// });

// 위 코드는 아래와 같이 작성하는 것이 좋다.
// 이렇게 처리할 경우 위에서 발생한 error를
// catch 메서드에서 처리할 수 있게 된다. 가독성이 더 좋다.
Promise.resolve()
    .then(() => {
        throw new Error('some error');
    })
    .catch(error => {
        console.log(error);
    });

// then과 마찬가지로 catch도 promise 객체를 반환한다.
// 따라서 아래 코드처럼 catch 이후에도 then 메서드를 사용할 수 있다.
Promise.reject(10)
    .then(data => {
        // 여기는 생략
        console.log('then1:', data);
        return 20;
    })
    .catch(data => {
        // 여기부터 처리
        console.log('catch:', data);
        return 30;
    })
    .then(data => {
        // 여기도 처리
        console.log('then2:', data);
    });

// promise 객체에는 finally라는 메서드도 있다.
// finally는 fulfilled, rejected 상태 모두 처리할 수 있다.
// 따라서 finally가 호출 되는 시점은 then에 resolve, reject
// 함수 모두 입력한 것과 같다고 볼 수 있다.(resolve, reject 모두 처리할 수 있기 때문인듯)
// 시점은 같지만 then과 똑같이 동작하지는 않는다.
// 한 가지 차이점은 finally에는 데이터가 넘어오지 않는다.
// 그리고 finally는 이전 promise 객체 그대로 반환한다.
// 따라서 finally 메서드에서 반환하는 값은 의미가 없다.
Promise.resolve(10)
    .then(data => {
        console.log('onThen', data);
        // 값이 11인 promise 객체 반환
        // 상태는 fulfilled
        return data + 1;
    })
    .catch(data => {
        // 여기는 건너뛰고,
        console.log('onCatch');
        return 100;
    })
    .finally(() => {
        // 여기가 실행 후 넘겨받은 promise 객체 그대로 반환
        console.log('onFinally');
    })
    .then(data => {
        console.log('onThen', data);
        return data + 1;
    });

// 서버 통신으로 데이터를 받아오는 경우를 생각해 보자.
// fetch 함수를 호출해 서버와 통신을 할 것이고
// 문제가 발생한다면 catch 메서드에서 처리를 할 것이다.
// 에러 여부와는 상관없이 finally는 처리가 될 것이다.
// 또한 finally는 받은 promise 객체를 그대로 반환하기 때문에
// 대부분의 경우 fulfilled 상태를 가진 promise 객체가 반환될 것이다.
function requestData() {
    return fetch()
        .catch(error => {
            // ...
        })
        .finally(() => {
            sendLogToServer('requestData finished');
        });
}
// 따라서 아래와 같이 처리할 수 있다.
requestData().then(data => console.log(data));