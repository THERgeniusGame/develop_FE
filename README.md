# Code Convention
- 서비스 url : lowercase - ex) /main/room
- 변수 및 함수명 : 카멜케이스 - ex) roomList
- 컴포넌트명 : 앞글자 대문자인 카멜케이스 - ex) LoginPage
- 파일명 : 카멜케이스 - ex) SignUp
- 폴더명 : 카멜케이스 - ex) SignUp
- 모듈명 : 카멜케이스 및 요청 위치와 요청 종류 가져오는 값 - ex) MainGetList

# Git Flow
#브랜치 구조
- main
    - dev
         - jongone
               /main
               , room
         - hakyung
               /login
               , signup
    - release

#각 브랜치의 역할
- main : 오류가 정말 없는 깔끔한 상태. dev브랜치를 고칠 수 없을 때, 사용할 백업 브랜치
- dev : 오류가 없는 깔끔한 상태
- release : 배포용 사용자 서비스 이용에 문제가 없는 상태
- 개인브랜치 : 개인작업

#commit message 규칙
1. create/update/add/fix 등으로 무슨 행동을 했는지 알린다
create - ex) create Login Page
update - ex) update Login Page
add - ex) add SignUp Page
fix - ex) fix Login Page
2. 파일의 기능과 파일의 이름을 적는다.
ex) Module/MainGetList
3. 추가적인 설명 기입
ex) css 추가 수정

# Library
- axios	서버통신
- redux-toolkit	상태관리, 미들웨어
- styled-components	css 관리
- json-server	백엔드 서버와의 연결 전 사용
- jwt	jwt 토큰 사용
- socket.io-client	실시간 반영
- react-hook-form	로그인/ 회원가입 (리렌더링 수 ↓)
- sweetalert2	alert css
- dotenv	환경변수
1. REACT_APP_SURVER
2. REACT_APP_TOKEN
3. REACT_APP_TOKKENNAME
