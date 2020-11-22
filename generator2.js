// 1. iterator, iterable, generator를 사용하여 함수형 프로그래밍에 쓰이는 함수들 구현하기
// 아래 세 함수는 generator 객체 덕분에 새로운 배열 객체를 생성하지 않는다.
// 그렇기 때문에 메모리를 좀 더 효율적으로 사용할 수 있다. (일반적인 array의 map, filter, take 함수들은 새 배열 객체를 반환한다)
const arr = [1,2,3,4];
const mapped = arr.map(v => v + 1);
console.log("mapped is arr? ", arr === mapped);

function* map(iter, mapper) {
    for (const v of iter) {
        yield mapper(v);
    }
}

function* filter(iter, test) {
    for (const v of iter) {
        if (test(v)) {
            yield v;
        }
    }
}

function* take(n, iter) {
    for (const v of iter) {
        yield v;
        if (--n <= 0) return;
    }
}

// const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const result = take(
//     3,
//     map(
//         filter(values, n => n % 2 === 0),
//         n => n * 10
//     )
// );
// 아래 로직이 실행되기 전까지 generator는 실행되지 않는다.
// 이렇게 값이 필요한 순간에만 실행되는 것을 지연평가(lazy evaluation)라고 한다.
// console.log([...result]);

// 2. generator를 사용하여 값을 무한대로 표현하기
function* naturalNumbers() {
    let v = 1;
    while (true) {
        yield v++;
    }
}

const values = naturalNumbers();
const result = take(
    3,
    map(
        filter(values, n => n % 2 === 0),
        n => n * 10
    )
);
console.log([...result]);

// 3. generator 함수에서 다른 generator 함수 호출하기
function* g1() {
    yield 2;
    yield 3;
}
function* g2() {
    yield 1;
    yield* g1();
    // yield* 옆은 iterable이면 무엇이든 올 수 있다.
    // yield* [2, 3];
    yield 4;
}
console.log(...g2());

// 4. 외부로부터 데이터 받아오기
function* f1() {
    const data1 = yield;
    console.log(data1);
    const data2 = yield;
    console.log(data2);
}
const gen = f1();
gen.next();
gen.next(10);
gen.next(20);

// 5. generator를 사용하여 협업 멀티태스킹(cooperative multitasking)하기
// 여러 개의 태스크를 실행할 때 하나의 태스크가 종료되기 전에 멈추고
// 다른 태스크가 실행되는 것을 멀티태스킹이라고 한다.
// generator는 실행을 멈추고 재개할 수 있기 대문에 멀티태스킹이 가능하다.
// 협업이라는 단어가 붙는 이유는 generator가 멈추는 시점을 자발적으로 선택하기 때문이다.(yield keyword를 사용)
// 반대로 실행을 멈추는 시점을 자발적으로 선택하지 못하면 선점형(preemptive) 멀티태스킹이라고 부른다.
// 일반적으로 OS는 선점형 멀티태스킹을 사용한다.
function* minsu() {
    const myMsgList = [
        '안녕 나는 민수야',
        '만나서 반가워',
        '내일 영화 볼래?',
        '시간 안 되니?',
        '내일모레는 어때?'
    ];
    for (const msg of myMsgList) {
        console.log('수지:', yield msg);
    }
}

function suji() {
    const myMsgList = ['', '안녕 나는 수지야', '그래 반가워', '...'];
    const gen = minsu();
    for (const msg of myMsgList) {
        console.log('민수:', gen.next(msg).value);
    }
}

suji();

// 6. generator 함수에서 발생한 예외처리
function* genFunc() {
    // 이런식으로 generator 함수에서 예외를 발생시키면,
    throw new Error("some error");
}

function func() {
    const gen = genFunc();
    try {
        // next 함수를 호출하는 쪽에 영항을 끼친다.
        gen.next();
    } catch (e) {
        console.log('in catch');
    }
}

func();
