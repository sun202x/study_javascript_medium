// 동일한 코드이지만 이번에는 ESM을 사용하여 작성해 보았다.
// import 키워드로 함수를 가져온다.
// Node.js에서 ESM을 사용하려면 package.json이라는 파일이 있어야 하고,
// 그 안에 내용을 입력해 주어야 한다.
import { sayHello } from './b.js';

console.log('a.js');

sayHello('mike');