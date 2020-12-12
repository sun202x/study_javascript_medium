// 아래와 같은 로직이 실행 될때 자바스크립트는
// global execution context을 생성하게 되는데
// 이때 함수도 변수로 취급 되므로 lexical environment에 등록이 된다.

// 이런식으로 함수가 생성될 때 부모 함수의 lexical environment를 기억한다.
// 그리고 함수가 호출될 때 부모 함수의 lexical environment를 체인으로 연결한다.
// 아래처럼 내부에서 함수가 만들어질 경우 함수가 종료되어도 lexical environment가 유지된다.
function makeAdd(v1) { // 전달 받은 매개변수도 lexical environment로 등록된다.

    // 아래 함수가 만들어질 당시의 부모 함수 lexical environment를 기억한다.
    return function (v2) {
        return v1 + v2;
    }
}

// 해당 변수는 const로 정의 됐기 때문에 undefined가 아닌 값이 없는 상태로 등록된다.
const add3 = makeAdd(3);
console.log(add3(10));
const add7 = makeAdd(7);
console.log(add7(10));

// 만약 아래처럼 변수에 할당되지 않았다면,
// 나중에 사용할 수 없기 때문에 lexical environment도 제거가 된다.
makeAdd(7);

