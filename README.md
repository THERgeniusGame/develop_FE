# 로그인, 회원가입 페이지 플로우차트
![실전프로젝트 로그인, 회원가입 플로우차트](https://user-images.githubusercontent.com/105829258/188279966-9a79c172-3aed-4349-9e74-686b543f86e5.png)
# 메인 페이지 플로우차트
![실전프로젝트 메인화면 플로우차트](https://user-images.githubusercontent.com/105829258/188279975-0dfb068c-d54c-4874-a6cf-2657b245d656.png)
# 룸 페이지 플로우차트
![실전프로젝트 게임룸 플로우차트](https://user-images.githubusercontent.com/105829258/188279979-86052684-3647-457e-a7e8-35c8a41d54a8.png)
# 마이페이지 플로우차트
![실전프로젝트 마이페이지 플로우차트](https://user-images.githubusercontent.com/105829258/188279983-f5bc8fe7-717c-4bed-8c41-81f2fc970f4d.png)
# 랭킹 페이지 플로우차트
![실전프로젝트 랭킹 플로우차트](https://user-images.githubusercontent.com/105829258/188279984-f8c7810f-db5f-414b-aaca-5ca0696e8142.png)

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
FE
- axios	서버통신
- redux-toolkit	상태관리, 미들웨어
- styled-components	css 관리
- json-server	백엔드 서버와의 연결 전 사용
- jwt	jwt 토큰 사용
- socket.io-client	실시간 반영
- react-hook-form	로그인/ 회원가입 (리렌더링 수 ↓)
- sweetalert2	alert css
- dotenv	환경변수
BE
- cors	Request resource 제한
- dotenv	환경변수 설정
- sequelize	DB ORM
- bcrypt	패스워드 암호화
- joi	회원가입 정보 제한
- jsonwebtoken	로그인 토큰 발급
- nodemailer	회원 인증 및 비밀번호 찾기 메일링
- socket.io	실시간 통신
- ejs	html 파일
