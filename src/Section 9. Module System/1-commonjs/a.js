// 자바스크립트 모듈 시스템에서는 하나의 파일이 하나읨 모듈이다
// 모듈시스템을 사용하여 변수와 함수를 다른 모듈로 내보내거나 가져올 수 있다.
// 자바스크립트에는 모듈 시스템이 없었다가 2015년부터 지원되기 시작했다.
// 그것을 ESM(ECMAScript Modules)이라고 한다.
// Node.js에서는 처음에 CommonJS라는 모듈시스템을 사용했다.
// 최근에는 Node.js에서도 EMS을 사용할 수 있다.
// 아래 코드는 Common.js로 작성한 코드이다.
// b 모듈을 가져와서 b 모듈에서 내보낸 함수를 사용하고 있다.
const bModule = require('./b.js');

console.log('a.js');

bModule.sayHello('mike');