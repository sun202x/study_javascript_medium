// promise를 사용할 때 then 메서드로 연결하면
// 순차적으로 처리가 된다.
// 그러나 이것은 비동기 처리가 병렬적으로
// 처리되지 않는다는 단점이 있다.
// 1초 후 값을 반환하는 함수1
requestData1()
    .then(data => {
        console.log(data);
        // 1초 후 값을 반환하는 함수1
        return requestData2();
    })
    .then(data => {
        console.log(data);
    });
// 위 함수는 2초가 지나서야 모든 결과를 반환받을 수 있다.
// 만약 위 두 함수의 의존성이 없다면 병렬로 처리하는 것이 더 효율적일 것이다.

// 위 코드를 병렬로 처리하도록 수정했다.
// 이제 아래 두 함수는 거의 동시에 비동기 처리를 할 것이고
// 각각 함수의 처리 여부를 신경쓰지 않을 것이다.
requestData1().then(data => console.log(data));
requestData2().then(data => console.log(data));

// 이런 식으로 병렬로 처리하고 싶은 경우 Promise.all을 사용할 수 있다.
// 매개변수에 배열을 넘겨주는데 이 배열에 처리하고 싶은 promise들을 넘겨주면 된다.
// Promise.all은 promise 객체를 반환해주기 때문에 then 메서드를 사용할 수 있다.
// Promise.all이 반환하는 promise 객체는 입력된 모든 Promise가 fulfilled 상태가 되어야
// 마찬가지로 fulfilled 상태가 된다. 만약 하나라도 rejected를 반환할 경우
// Promise.all이 반환하는 promise의 상태는 rejected가 된다.
Promise.all([requestData1(), requestData2()]).then(([data1, data2]) => {
    console.log(data1, data2);
})

// Promise.race는 입력받은 여러 promise들 중에서
// 가장 빨리 settled(fulfilled or rejected) 상태가 된
// promise를 반환한다.
Promise.race([
    requestData(),
    // requestData 함수가 3초 이내에 값을 반환하지 않으면 아래 promise가 반환된다.
    new Promise((_, reject) => setTimeout(reject, 3000))
])
    .then(data => console.log('fulfilled', data))
    .catch(error => console.log('rejected'));

// promise 객체가 pending 상태이면 상태가 변경되지만,
// settled(fulfilled or rejected) 상태이면 상태가 변경된다고 했다.
// 상태 뿐만 아니라 데이터도 마찬가지로 변경되지 않는다.
// 아래 코드에는 이와 같은 특징을 사용하여
// 데이터를 캐싱하고 있다.
let cachedPromise;
function getData() {
    // 처음만 requestData 함수가 실행되고 이후부턴
    // 반환된 데이터를 가진 cachedPromise가 반환된다.
    cachedPromise = cachedPromise || requestData();
    return cachedPromise;
}
getData().then(v => console.log(v));
getData().then(v => console.log(v));
// 위 코드는 호출실패에 관련된 코드는 없지만
// promise를 사용하여 캐싱을 할 수 있다는 것을 보여준다.

// ## promise를 쓸 때 주의할 점
// 아래와 같이 then 메서드 내부에
// return 키워드를 깜빡하는 경우가 있으니 주의해야 한다.
// 아래 코드의 마지막 data는 undefined이다.
Promise.resolve(10)
    .then(data => {
        console.log(data);
        Promise.resolve(20);
    })
    .then(data => {
        console.log(data);
    });

// then 메서드는 기존 객체를 수정하지 않고
// 새로운 promise 객체를 반환한다.
// 이를 인지하지 못하고 작성하면 다음과 같은 실수를 할 수 있다.
function requestData() {
    const p = Promise.resolve(10);

    // 30을 반환하려 했으나
    p.then(data => {
        return data + 20;
    });

    // 데이터가 10인 promise가 반환된다.
    return p;
}
requestData().then(v => {
    console.log(v);
})

// promise를 중첩해서 사용하면
// 콜백 패턴처럼 복잡해지므로 사용을 권하진 않는다.
// promise를 사용하다보면 무심코 아래처럼 사용할 수 있으니
// 주의해야 한다.
requestData1()
    .then(result1 => {
        // then 메서드 안에 promise를 중첩해서 사용하면 가독성이 떨어진다.
        return requestData2(result1).then(result2 => {
            console.log({ result2 });
        });
    })
    // 이런 식으로 떨어뜨려 놓는 것이 좋다.
    // .then(result2 => {
    //     console.log({ result2 });
    // })
    .then(() => console.log('end'));

// ### promise 응용
// 아래 코드 두 번째 then에서는 데이터를 받으려고 한다.
// 그러나 첫 번째 then은 한 개의 데이터만 넘긴다.
// 아래와 같이 result1(첫번재 promise)을 참조하려면 어떻게 해야할까?
requestData1()
    .then(result1 => {
        return requestData2(result1);
    })
    .then((result1, result2) => {
        console.log({ result1, result2 });
    });

// 한 가지 방법은 아래와 같이 promise를 중첩하는 것이다.
requestData1()
    .then(result1 => {
        return requestData2(result1).then(result2 => {
            console.log({ result2 });
            // 이렇게 result2까지 받아놓고 배열형태로 넘긴다.
            return [result1, result2];
        });
    })
    .then(([result1, result2]) => {
        console.log({ result1, result2 });
    });
// promise를 중첩하지 않고 2개를 반환할 수 있을까?

// 아래와 같이 Promise.all을 사용하면
// promise를 중첩하지 않고도 다음과 같이 해결할 수 있다.
requestData1()
    .then(result1 => {
        // Promise.all 배열에 promise가 아닌 값을 넣으면
        // 그 값 그대로 가진 promsie 객체처럼 처리가 된다.
        return Promise.all([result1, requestData2(result2=1)]);
    })
    .then(([result1, result2]) => {
        // ...
    });

// promise를 비동기가 아닌 이렇게 동기 코드와 같이 사용할 때는
// 예외처리에 신경써야 한다.
function doSync() {
    throw new Error('some error');
}
function requestData() {
    // doSync 함수에서 예외가 발생할 경우
    // 예외처리하는 곳이 없어 문제가 될 수 있다.
    doSync();
    return fetch()
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

// 만약 doSync 함수가 반드시 fetch 함수 호출 전에
// 처리되어야 하는 것이 아니라면 아래 코드와 같이
// then 메서드 안 쪽으로 넣어주는 것이 좋다.
function requestData() {
    return fetch()
        .then(data => {
            // doSync에서 발생한 에러도
            doSync();
            console.log(data);
        })
        // 여기서 처리할 수 있다.
        .catch(error => console.log(error));
}

// 만약 fetch 전에 실행되어야 한다면 아래 코드처럼
// 먼저 fulfilled 상태인 promise 객체를 만들고
// doSync를 호출하여 처리할 수 있다.
function requestData() {
    return Promise.resolve()
        .then(doSync)
        .then(fetch)
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error));
}