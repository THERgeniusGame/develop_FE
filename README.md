# ✨TherGeniusGame
더지니어스프로그램 흑과백 게임 모티브의 웹 심리게임!
/사진 넣기/

### 🔧 주요 기능

<details>
<summary>🗨️ 공개/비공개 방 조회 및 검색을 통한 게임방 입장</summary>
    
    - 공개방을 만들어서 모르는 사람과 게임을 하거나, 비밀번호 방을 만들고 조회 또는 검색하여 친한사람과 게임을 할 수 있습니다!
</details>

<details>
<summary>🗨️ 대기실 및 채팅</summary>
    
    - 게임을 시작하기 전 대기실을 구현 하여 자유롭게 대화할 수 있는 채팅 룸을 구현했습니다!
</details>

<details>
<summary>🗨️ 재미없을 수 없는 심리게임!</summary>
    
    - 선 플레이어를 부여해주고, 번갈아가며 카드와 배팅 금액을 선택하여줍니다.
    
    - 나의 남은 타일, 상대의 남은 타일의 색, 상대가 배팅하는 금액등을 토대로 심리전이 일어납니다.

    - 총 10턴간 진행되는 숨막히는 심리게임!
</details>

## 📆 프로젝트 기간
- 2022/08/26 ~ 

# 🎀프로젝트 아키텍처
![Architecture](https://user-images.githubusercontent.com/105829258/188548418-9ba5cdaf-b1d1-4549-bd40-68568470714c.png)

# 🪄Code Convention
- 서비스 url : lowercase - ex) /main/room
- 변수 및 함수명 : 카멜케이스 - ex) roomList
- 컴포넌트명 : 앞글자 대문자인 카멜케이스 - ex) LoginPage
- 파일명 : 카멜케이스 - ex) SignUp
- 폴더명 : 카멜케이스 - ex) SignUp
- 모듈명 : 카멜케이스 및 요청 위치와 요청 종류 가져오는 값 - ex) MainGetList

# 🤝Git Flow
### 브랜치 구조
- main
    - dev
         - jongone
               /main
               , room
         - hakyung
               /login
               , signup
    - release

### 각 브랜치의 역할
- main : 오류가 정말 없는 깔끔한 상태. dev브랜치를 고칠 수 없을 때, 사용할 백업 브랜치
- dev : 오류가 없는 깔끔한 상태
- release : 배포용 사용자 서비스 이용에 문제가 없는 상태
- 개인브랜치 : 개인작업

### commit message 규칙
1. create/update/add/fix 등으로 무슨 행동을 했는지 알린다
create - ex) create Login Page
update - ex) update Login Page
add - ex) add SignUp Page
fix - ex) fix Login Page
2. 파일의 기능과 파일의 이름을 적는다.
ex) Module/MainGetList
3. 추가적인 설명 기입
ex) css 추가 수정

# 🔖프론트엔드 기술 스택

<center>
<br/>
<div style="display: inline;">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/redux_toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/socket.io-black?style=for-the-badge&logo=socket.io&logoColor=white"/>
<img src="https://img.shields.io/badge/axios-6236FF?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/Json-green?style=for-the-badge&logo=Json&logoColor=CC6699"/>
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/amazonAWS-F7DF1E?style=for-the-badge&logo=amazonAWS&logoColor=black">
<img src="https://img.shields.io/badge/ReactHookForm-b23838?style=for-the-badge&logo=ReactHookForm&logoColor=white"/>
<img src="https://img.shields.io/badge/dotenv-3b0707aa?style=for-the-badge&logo=dotenv&logoColor=CC6699"/>
</div>

<div style="display: inline;">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/sourcetree-blue?style=for-the-badge&logo=sourcetree&logoColor=white">
</div>
</center>
<br>

# 🛰️와이어 프레임
https://www.figma.com/file/0XBiaSNcr9NcTTKjBKfv1x/THERgeniusGame?node-id=0%3A1

# 🌌플로우차트
### 로그인, 회원가입 페이지 플로우차트
![실전프로젝트 로그인, 회원가입 플로우차트](https://user-images.githubusercontent.com/105829258/188279966-9a79c172-3aed-4349-9e74-686b543f86e5.png)
### 메인 페이지 플로우차트
![실전프로젝트 메인화면 플로우차트](https://user-images.githubusercontent.com/105829258/188279975-0dfb068c-d54c-4874-a6cf-2657b245d656.png)
### 룸 페이지 플로우차트
![실전프로젝트 게임룸 플로우차트](https://user-images.githubusercontent.com/105829258/188279979-86052684-3647-457e-a7e8-35c8a41d54a8.png)
### 마이페이지 플로우차트
![실전프로젝트 마이페이지 플로우차트](https://user-images.githubusercontent.com/105829258/188279983-f5bc8fe7-717c-4bed-8c41-81f2fc970f4d.png)
### 랭킹 페이지 플로우차트
![실전프로젝트 랭킹 플로우차트](https://user-images.githubusercontent.com/105829258/188279984-f8c7810f-db5f-414b-aaca-5ca0696e8142.png)


## 👪 &nbsp; 팀원

|   이름    |         깃허브 주소         |                            역할 분담                            |
| :-------: | :-------------------------: | :-------------------------------------------------------------: |
| 👦 채종원  | https://github.com/Jone4865 |                     메인 화면, 인게임 페이지                      |
| 👧 이하경 | https://github.com/hakyunglee | 로그인/회원가입 페이지 |
