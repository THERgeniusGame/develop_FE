# ✨TherGeniusGame
더지니어스프로그램 흑과백 게임 모티브의 웹 심리게임!

![Loading](https://user-images.githubusercontent.com/105829258/192970517-027b9006-ca29-4e60-b8bd-8ddc80965654.png)

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

<details>
<summary>🗨️ 재미를 더해줄 랭킹 페이지</summary>
    
    - 그냥 한판 한판의 심리전 뿐만 아니라 랭킹으로 더욱 더 흥미를 느낄 수 있습니다.
    
    - 1등은 누가 될까요?!
</details>

<details>
<summary>🗨️ 유저와의 소통을 위한 신고페이지</summary>
    
    - 유저와의 소통으로 더 나은 경험을 드릴 수 있도록, 신고페이지를 구현 하였습니다.
    
    - 유저분들의 날카로운 질문과 요청으로 프로젝트를 발전 시킵니다!
</details>

## 📆 프로젝트 기간
- 2022/08/26 ~ 

# 🎀프로젝트 아키텍처
![프론트 아키텍처](https://user-images.githubusercontent.com/105829258/192965465-107c5763-b1e6-4c02-a01e-cc95e731fa37.png)

# 🪄Code Convention
- 서비스 url : lowercase - ex) /main/room
- 변수 및 함수명 : 카멜케이스 - ex) roomList
- 컴포넌트명 : 앞글자 대문자인 카멜케이스 - ex) LoginPage
- 파일명 : 앞글자 대문자인 카멜케이스 - ex) SignUp
- 폴더명 : 앞글자 대문자인 카멜케이스 - ex) SignUp
- 모듈명 : 앞글자 대문자인 카멜케이스 - ex) MainGetList

# 🤝Git Flow
### 브랜치 구조
- master
    - dev(작업 브랜치)
        - feature/login/kakoLogin
        - feature/login/editPassWord
        - feature/gameRoom
        - feature/pagenation
        - feature/mypage
    - release(배포 브랜치)

### 각 브랜치의 역할
(feature에서 기능 구현 후, dev에 머지해서 오류를 잡고, release에 머지 및 배포)
- master : 오류가 정말 없는 깔끔한 상태로, dev브랜치를 고칠 수 없을 때 사용할 백업 브랜치
- dev : release에 머지 및 배포 전 오류를 잡고 서로의 작업을 합쳐보는 브랜치 
- feature/이하 : 기능 작업 브랜치
- release : 배포용 사용자 서비스 이용에 문제가 없는 상태의 브랜치

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
### 헤더 플로우차트
![헤더](https://user-images.githubusercontent.com/105829258/193449047-b20e18ec-1708-498f-8e08-4f4bf4f871e7.png)
### 회원가입 페이지 플로우차트
![회원가입](https://user-images.githubusercontent.com/105829258/192963976-3424756a-1ca5-4736-bba5-4849a9c3e913.png)
### 로그인 페이지 플로우차트
![로그인 플로우차트](https://user-images.githubusercontent.com/105829258/193446102-05a8ec2f-1912-4bf7-b052-90e06f49694b.png)
### 메인 페이지 플로우차트
![메인](https://user-images.githubusercontent.com/105829258/192964156-94016a99-ed51-408e-b902-0dc7458f9967.png)
### 게임 대기실 페이지 플로우차트
![룸(대기실) 페이지](https://user-images.githubusercontent.com/105829258/192964446-e09e5e2d-294c-4c48-80ed-78eaab3ea00c.png)
### 인게임 페이지 플로우차트
![룸(게임) 페이지](https://user-images.githubusercontent.com/105829258/192964497-56278dc5-782a-43f3-af5b-7e5ef10a22d9.png)
### 랭킹 페이지 플로우차트
![랭킹 페이지 플로우차트](https://user-images.githubusercontent.com/105829258/193446109-edc92ede-ae50-4dbe-9806-18ad2c869cd4.png)
### 신고 페이지 플로우차트
![신고](https://user-images.githubusercontent.com/105829258/192964650-164c1eb1-1834-44df-85ad-1bb7f8f28006.png)
### 토큰 플로우차트
![Untitled](https://user-images.githubusercontent.com/105829258/192964730-ce75bff1-3a8b-4a63-8ef0-2daf8a8cc864.png)

## 👪 &nbsp; 팀원

|   이름    |         깃허브 주소         |                            역할 분담                            |
| :--------: | :--------------------------: | :-------------------------------------------------------------: |
| 채종원 👦  | https://github.com/Jone4865 | 메인페이지 - view, 게임 대기실페이지, 인게임페이지, 신고페이지 - 신고 및 댓글 업데이트 & 신고 삭제 기능, 비밀번호 변경 페이지, 소셜로그인 기능 |
| 이하경 👧  | https://github.com/hakyunglee | 로그인페이지, 회원가입페이지, 메인페이지 - 각종 페이지 네이션 & 검색 기능, 신고페이지 - 신고 및 댓글 작성 기능, 랭킹페이지 |
