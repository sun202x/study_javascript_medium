// 이번에는 조금 복잡한 구조로 모듈을 구성했다.
// 아래와 같이 index.js 파일을 import하여 필요한 것들만 가져올 수 있다.
import haveDinnerTogether, {
    makeJavaProgram,
    makePythonProgram,
} from './person/index.js';

haveDinnerTogether();
makeJavaProgram();
makePythonProgram();