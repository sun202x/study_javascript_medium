// global execution context가 생성이 되면서
// main이라는 함수와, obj라는 변수를 가진 lexical environment 생성
function main() {
    let v = 0; // main 함수가 실행되면서 v는 0으로 초기화

    // 이 함수는 정의된 변수가 없으므로
    // lexical environment는 비어있는 상태가 된다.
    function f1() {
        v++;
        console.log(v);
    }
    function f2() {
        v++;
        console.log(v);
    }
    return { f1, f2 };
}
// 아래 로직이 실행되면서
// main 함수의 execution context가 생성
const obj = main(); // obj는 main 함수가 반환한 객체로 할당
// f1 함수가 실행되면서 f1 함수의 execution context와 lexical environment 생성
obj.f1(); // f1 함수 종료후 execution context와 lexical environment 삭제
// 아래 함수들도 마찬가지 단계를 거친다.
obj.f2();
obj.f1();
obj.f2();

// 여기서 주목할 점은 하나의 함수의 lexical environment를
// 여러 함수가 공유한다는 점이다.
// 따라서 main 함수의 v 변수는 f1, f2 함수에 공유된다.
// 따라서 결과적으로 v의 값은 4가 된다.