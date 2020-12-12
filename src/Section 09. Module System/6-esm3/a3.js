// import 함수는 promise를 반환하기 때문에
// 아래와 같이 async await를 사용할 수도 있다.
async function main() {
    if (Math.random() < 0.5) {
        const { b1 } = await import('./b.js');
        console.log(b1);
    } else {
        const { c1 } = await import('./c.js');
        console.log(c1);
    }
}