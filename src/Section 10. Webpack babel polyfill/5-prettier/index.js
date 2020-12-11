// prettier는 코드 포맷터이다.
// 최소한의 설정만 지원하고 prettier가 자동으로
// 정해진 코드 스타일로 변환을 해준다.
// 보통 코딩 스타일은 정답이 없고
// 개인의 취향에 따라 결정되는 경우가 많기 때문에
// 여러 사람들이 같이 작업할 경우
// 코딩 스타일로 불필요한 논쟁을 하기 보다는
// prettier에서 정해주는 방식으로 통일하는게 좋다.
// prettier를 설치하기전에 먼저 package.json을 생성한다.
// 아래와 같이 입력해 prettier를 설치해준다.
// npm install prettier
// 그리고 vscode를 사용한다면 prettier extension을
// 설치하는 것을 추천한다.
// 파일을 저장할 때마다 prettier가 실행되도록 설정해 보자.
// vscode settings에서 검색창에 formatOnSave를 검색 후
// Editor: Format On Save 항목을 체크한다.
// 그리고 default formatter로 다시 검색 후
// Editor: Default Formatter의 값을 esbenp/prettier-vscode 로 설정해준다.
// 이제 파일이 저장될 때마다 prettier가 적용될텐데
// 아래 코드를 입력후 저장해 보자.
const person = {name: 'mike', age:23, friends:[{name:"jone",age:23}]}

function f1(name,age){
    console.log(name + ' is ')
    if(age>10)
    {
        console.log( "young")
    }
    else{
        console.log("old" )
    }
}
// prettier가 적용된 것을 확인할 수 있다.
// 개발자는 더이상 포맷팅에 신경쓰지 않아도 되기 때문에
// 생산성에 많은 도움이 된다.
