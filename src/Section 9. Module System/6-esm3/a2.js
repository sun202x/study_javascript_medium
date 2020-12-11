// 동적으로 import하려면 아래와 같이 dynamic import라는 것을
// 사용해야 한다. import를 함수처럼 사용할 수 있는데,
// 이렇게하면 비동기 처리를 하는 것이고 이 함수는 promise를 반환하게 된다.
if (Math.random() < 0.5) {
    import('./b.js').then(({ b1 }) => {
        console.log(b1);
    });
} else {
    import('./c.js').then(({ c1 }) => {
        console.log(c1);
    });
}