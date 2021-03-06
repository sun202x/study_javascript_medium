// 아래와 같이 a 모듈을 import 해보면
// a.js 파일에서 b 모듈을 가져오고 c 모듈을 가져오게 된다.
// c.js 파일에서는 b 모듈을 가져오려고 하는데 이 때 이미 a.js 파일에서
// 가져왔기 때문에 b.js 파일은 실행되지 않는다.
// 이렇게 모듈은 처음에 한번만 실행된다. 이후 import로 가져오는 것들은
// 이미 가져온 것을 그대로 가져와 사용하게 된다.
import './a.js';