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
- 2022/08/26 ~ 2022/10/07

## 👓 프로젝트 발표영상 
https://www.youtube.com/watch?v=ESSO1rTWOhY

# 🎀프로젝트 아키텍처
![아키텍처](https://user-images.githubusercontent.com/105829258/194686797-3ce0afe7-18e8-4ef0-80e6-34476e5d6a7c.png)

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

# 🤔기술스택 선정이유
- socket.io
    - 프로젝트의 시작은 1대1 카드 게임이었습니다. 게임을 선택하고 로직을 구상하며 당연하게 든 생각은 실시간으로 데이터가 움직여야 한다는 것이었습니다. 한 명의 행동이 다른 사람에게 전달되어 보여져야 했기 때문입니다. 그렇기 때문에 실시간 통신을 가능하게 해주는 socket을 적용하게 되었습니다.
- Redux-Toolkit
    - 처음에는 프로젝트의 규모가 크지 않기 때문에 "전역상태관리가 필요한가?"라는 대화를 하였습니다.
    하지만, 프로젝트의 확장성 및 많은 state를 사용하는 게임의 특성 때문에 일어날 수 있는 props drilling이나, 자식 props를 부모에게 전달 할 때 일어날 수 있는 오류를 방지하기 위해 전역상태관리 라이브러리를 도입하기로 했습니다. 그중에서 리액트 전역상태관리 라이브러리 중 대표적인 redux와 recoil을 놓고 고민하였는데, redux의 단방향 바인딩과 하나의 store에서 데이터를 관리하는게 데이터 흐림이 더 직관적으로 보여서 효율적으로 사용될 것이라 판단하였습니다. 뿐만 아니라 디버깅도 devtools가 잘되어있고, 사용 경험과 참고 자료 또한 많이 가지고 있는 리덕스를 사용하기로 했습니다. 또, 코드의 가독성을 높혀주어 데이터를 추적하는데 도움을 주는 redux-toolkit을 채택하였습니다.
- react-hook-form
    - state만을 사용해서 로그인/회원가입을 구현할 때, 불필요한 렌더링이 일어나 속도 저하가 발생하고 코드 가독성이 저하되기 때문에 그런 부분들을 방지할 수 있는 라이브러리를 도입하기로 했습니다. 해당 라이브러리가 리렌더링 수가 적은편이고, 로딩 속도가 빠르며 적은 코드로 좋은 퍼포먼스를 낼 수 있기 때문에 선택하였습니다.
- Styled-Components
    - 스타일링을 할 때에 코드의 재 사용성을 높혀주는 styled-components를 도입하기로 했습니다. 또한 해당 라이브러리는 component의 props를 전달받아 조건부 스타일링이 가능하고, 기존에 component에 스타일을 추가하는 확장 스타일링도 가능하기 때문에, 스타일링 코드의 전체적인 효율을 높혀 줄 것이라 판단하였습니다.

# 😱트러블슈팅
<details>
<summary>rebuilding에 따른 페이지네이션 오류 - 공통</summary>
    
    - 문제발생 : 메인화면에서 전체 포스팅 리스트를 받는 걸로 페이지네이션을 구현하였으나 앱의 성능을 위하여 데이터를 끊어서 주는 것으로 rebuilding, 이 경우 해당 페이지네이션은 작동하지 않음.
    
    - 문제점 : 전체 데이터의 갯수로 페이지를 나누고 데이터를 보여줬지만 오가는 데이터의 흐림이 완전히 다르기 때문에 정상적인 작동이 되지 않음.
    
    - 해결방법 : axios 요청을 페이지가 바뀔때 마다 쿼리문으로 요청하여, 해당 페이지 마다의 데이터를 가져와서 보여줌
</details>
<details>
<summary>채팅 주고받기 시 포커싱 문제 - 종원</summary>
    
    - 문제발생 : 채팅을 주고 받은 후 채팅이 위에서 아래로 나타나는데 자동으로 아래에 포커싱을 주지못하고 스크롤만 생김.
    
    - 문제점 : 처음에는 채팅창에 채팅 list가 변할 때 마다 스크롤 되게 하려했으나, 값이 없어서 오류가 났다.
    
    - 해결방법 : 때문에 처음부터 공간이 있어야하기 때문에, 채팅창 맨 아래에 가상의 div를 만들어서 해당 div에 ref를 부여하여 기본값을 null을 주었다. 그리고 채팅 리스트가 변할 때마다 스크롤 되게 하였다.
</details>
<details>
<summary>socket.io connect문제 - 종원</summary>
    
    - 문제발생 : socket에 connect를 할 때, 랜더링 될 때마다 socket의 id가 바뀌었다.
    
    - 문제점 : 소켓 커넥트 요청을 리액트 컴포넌트 안에 넣어둬서 컴포넌트가 랜더링 될 때마다 소켓 id가 바뀌었기 때문에 동일 인물의 요청이라고 인식되지 못했다.
    
    - 해결방법 : 랜더링의 영향을 받지 않게 하기 위해 import처럼 컴포넌트 밖에서 connect 요청을 함.
</details>
<details>
<summary>회원가입 조건에 따른 css 부여 - 하경</summary>
    
    - 문제발생 : input창의 각각의 조건을 만족했을 때 에러메세지가 초록색으로 바뀌도록 설정
    
    - 문제점 : axios 요청을 날리고 랜더링 되는 시점이 없기 때문에 프론트 만으로는 해결할 수 없다.
    
    - 해결방법 : 요건을 충족했을 때 나오는 메세지 (ex. ”사용가능한 이메일입니다”)를 조건으로 설정해 해당 값이 돌아올 때만 if문을 사용해 color를 변경시켜주었다. + 의존성 배열에 해당 문구가 올 때를 추가했다.
</details>
<details>
<summary>소켓 사용중 데이터 읽기 오류 - 종원</summary>
    
    - 문제발생 : 소켓 사용시 useEffect안에서는 A의 값만 읽히고, useEffect 밖에서는 B의 값만 읽히는 문제가 있었음.
    
    - 문제점 : if문을 useEffect 안에서 사용할 때 시간때문인지 원하는 값을 전체 가져오지는 못했음. + if문이 마치 브레이크 처럼 걸려서 다음 정보를 가져오지 못했음
    
    - 해결방법 : on 이벤트 였는데 해당 on 이벤트를 useEffec 안과 밖에 나눠 받아서 해결 함(같은 이벤트를 2번 받음)
</details>
<details>
<summary>신고페이지 랜더링 오류 - 공통</summary>
    
    - 문제발생 : 신고페이지를 가져온 후 신고디테일 페이지를 들어갔다가 뒤로가기를 누르면 화면이 나오지 않음
    
    - 문제점 : 신고페이지 전체리스트와, 신고페이지 디테일의 정보를 같은 state에 저장하였음. 때문에 뒤로가기시 정보가 꼬인듯 했음.
    
    - 해결방법 : 각각 다른 state (ex. roomlist, roomdetail)로 분리 하여 해결함.
</details>



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

# 🎮게임로직
https://www.notion.so/be4f0e09c6094dbf9dd337a214b0dbf3

## 👪 &nbsp; 팀원

|   이름    |         깃허브 주소         |                            역할 분담                            |
| :--------: | :--------------------------: | :-------------------------------------------------------------: |
| 채종원 👦  | https://github.com/Jone4865 | 메인페이지 - view, 게임 대기실페이지, 인게임페이지, 신고페이지 - 신고 및 댓글 업데이트 & 신고 삭제 기능, 비밀번호 변경 페이지, 소셜로그인 기능 |
| 이하경 👧  | https://github.com/hakyunglee | 로그인페이지, 회원가입페이지, 메인페이지 - 페이지네이션 & 검색 기능, 신고페이지 - 신고 및 댓글 작성 기능, 랭킹페이지 |