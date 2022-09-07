import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import socketio from 'socket.io-client';
import { useParams, useNavigate } from "react-router-dom";
import Roomimg from "../shared/image/Roomimg.png";

//이미지
import White from "../shared/image/CardWhite.png";
import Black from "../shared/image/CardBlack.png";
import Crown from "../shared/image/Crown.png"

const socket = socketio.connect(process.env.REACT_APP_SURVER); //백서버

function Room() {
    const navigate = useNavigate();

    const params = useParams();
    const roomId = +params.roomId;
    const room = roomId;

    const token = process.env.REACT_APP_TOKEN;

    const [userId, setUserId] = useState('');
    
    //닉네임
    const [mynickname, setNickname] = useState('');
    const [ownerNickname, setOwnerNickname] = useState('');
    const [guestNIckname, setGuestNIckname] = useState('');

    //소켓아이디
    const [mysocketId, setMysocketId] = useState('');
    const [guestsoketId, setGuestsoketId] = useState('');
    const [ownersoketId, setOwnersoketId] = useState('');

    //채팅
    const [chat, setChat] = useState(""); // 새로운 채팅
    const [list, setList] = useState([]); // 채팅 list
    const [users, setUsers] = useState([]); // 유저 list
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    //진행
    const [ready, setReady] = useState(false); // 새로운 채팅
    const [gamestart, setGamestart] = useState(false); // 게임시작 여부
    const [round, setRound] = useState(1); // 라운드 
    const [turn, setTurn] = useState(true); // 턴 여부
    const [middleView, setMiddleView] = useState(true); // 중간부분 뷰 여부
    const [test, setTest] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);

    useEffect(scrollToBottom, [list]);
    useEffect(() => {

        socket.emit("login",
            {
                token,
                room
            }, () => {
            }
        );

        socket.on("login", login => {
            setList(prev => prev.concat({ text: login.nickname + "님이 입장하셨습니다." })); //입장 알림
            setUsers(login.userList); //유저 목록

            setNickname(login.nickname); //나의 닉네임
            setOwnerNickname(login.owner); //방장 닉네임
            setGuestNIckname(login.userList.filter((user) => user.nickname !== ownerNickname)[0]?.nickname); //게스트 닉네임

            setMysocketId(login.socketId); //나의 소켓 아이디
            setOwnersoketId(login.userList.filter((user) => user.nickname === ownerNickname)[0]?.socketId); //방장 소켓 아이디
            setGuestsoketId(login.userList.filter((user) => user.nickname !== ownerNickname)[0]?.socketId); //게스트 소켓 아이디

            setUserId(login.userId);
        });

        socket.on("chat", chat => {
            setList(prev => prev.concat({ text: chat.nickname + " " + chat.msg }));
        });

        socket.on("ready", ready => {
            setReady(ready);
        });

        socket.on("gameInfo", gameInfo => {
            console.log(gameInfo)
            //     if(gameInfo.gameInfo.gamestart !== gamestart) {
            //     setGamestart(gameInfo.gameInfo.gamestart);
            // }
            //     setRound(gameInfo.gameInfo.round);
        });

        socket.on("disconnect", disconnect => {
            console.log(disconnect);
            // if (disconnect !== undefined) {
            //     navigate("/")
            // }
        });

        socket.on("error", error => {
            console.log(error.error.code);
        });

        //게임정보의 게임스타트가 true면 으로 수정하기
        if (test === true) {
            const timer1 = setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 5초전..." })) }, 1000);
            const timer2 = setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 4초전..." })) }, 2000);
            const timer3 = setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 3초전..." })) }, 3000);
            const timer4 = setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 2초전..." })) }, 4000);
            const timer5 = setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 1초전..." })) }, 5000);
            const timer6 = setTimeout(() => { setGamestart(true) }, 6000);
        }


        //게임정보의 게임종료가 트루면, 모달 true / 결과 닫기 누르면 gameEnd false, 게임스타트 false
    }, []);

    // socket.emit("turnEnd", {
    //     {
    //         nickname:mynickname,
    //         socketId:mysocketId,
    //         cards: [],
    //         battingCard,
    //         batting,
    //         turn:false,
    //         money,
    //         win: undifind,
    //         round,
    //     }
    // });
    // let timer = setTimeout(()=>{setList(prev => prev.concat({ text: chat.nickname + " " + chat.msg }))}, 2000);

    return (
        <>
            {gamestart === false ?
                //대기방
                <div style={{ "width": "1440px", "height": "1024px", backgroundImage: 'url(' + Roomimg + ')', backgroundPosition: "center", backgroundSize: "cover", fontSize: "18px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <RoomBody style={{ paddingTop: "150px" }}>
                        {mynickname === ownerNickname ?
                            //호스트 구역
                            <div>
                                <div style={{ fontSize: "24px", width: "975px", margin: "auto auto 80px auto" }}>{ownerNickname}님의 게임방
                                    <span style={{ float: "right" }}>
                                        <button onClick={() => { ready === false ? alert("상대가 아직 준비하지 않았습니다.") : socket.emit("gamestart", { gamestart }); }} style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold" }}>게임시작</button>
                                        <button style={{ fontSize: "18px", fontWeight: "bold" }} onClick={() => { navigate("/") }}>나가기</button>
                                    </span>
                                </div>
                                <UserList>
                                    <span style={{ display: "flex" }}>
                                        <div>{ownerNickname}</div>
                                        <div style={{ backgroundImage: 'url(' + Crown + ')', backgroundPosition: "center", backgroundSize: "cover", width: "25px", marginLeft: "10px", marginBottom: "6px" }}></div>
                                    </span>
                                    <div style={{ marginRight: "10px" }}>준비완료</div>
                                </UserList>
                                <UserList>{users.filter((user) => user.nickname !== ownerNickname)[0]?.nickname !== undefined ? <>
                                    <div>{users.filter((user) => user.nickname !== ownerNickname)[0]?.nickname}<Kick><span style={{ marginLeft: "10px", fontSize:"14px", color:"red" }} onClick={() => { socket.emit("kick", { socketId: guestsoketId }) }}>추방하기</span></Kick></div>
                                    <div style={{ marginRight: "10px" }}>준비완료</div></> : ''}
                                </UserList>
                            </div> :
                            //게스트 구역
                            <div>
                                <div style={{ fontSize: "24px", width: "975px", margin: "auto auto 80px auto" }}>{ownerNickname}님의 게임방
                                    <span style={{ float: "right" }}>
                                        <button onClick={() => { socket.emit("ready", { ready: !ready }); }} style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold" }}>준비하기</button>
                                        <button style={{ fontSize: "18px", fontWeight: "bold" }} onClick={() => { navigate("/") }}>나가기</button>
                                    </span>
                                </div>
                                <UserList>
                                    <span style={{ display: "flex" }}>
                                        <div>{ownerNickname}</div>
                                        <div style={{ backgroundImage: 'url(' + Crown + ')', backgroundPosition: "center", backgroundSize: "cover", width: "25px", marginLeft: "10px", marginBottom: "6px" }}></div>
                                    </span>
                                    <div style={{ float: "right", display: "flex", marginRight: "10px" }}>준비완료</div>
                                </UserList>
                                <UserList>
                                    <div>{mynickname}</div>
                                    <div style={{ marginRight: "10px" }}>{ready === true ? "준비완료" : "준비중"}</div>
                                </UserList>
                            </div>
                        }
                    </RoomBody>
                    <ChatBody>
                        <span style={{ fontWeight: "700", marginBottom: "4px", marginLeft: "20px", display: "flex", width: "990px" }}>채팅</span>
                        <ChatWrapCss>
                            {list.map((item, index) => (
                                <p key={index}>
                                    {item.text}
                                </p>
                            ))}
                            <div ref={messagesEndRef} />
                        </ChatWrapCss>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                socket.emit("chat", { mynickname, msg: chat });
                                setChat("");
                            }}
                        >
                            <ChatForm>
                                <input style={{ fontSize: "18px", paddingLeft: "10px" }} placeholder="메세지 입력하기" value={chat} onChange={e => setChat(e.target.value)} />
                                <button style={{ height: "30px", borderRadius: "10px", marginLeft: "3px", fontSize: "18px" }}>보내기</button>
                            </ChatForm>
                        </form>
                    </ChatBody >
                </div> :
                //게임방
                mynickname === ownerNickname ?
                    <div style={{ height: "1024px", width: "1440px" }}>
                        {/* //호스트뷰 */}
                        <div style={{ height: "125px", width: "1041px", backgroundColor: "#D9D9D9", margin: "auto", display: "flex", fontSize: "36px" }}>
                            <div style={{ marginLeft: "100px" }}>
                                <div>
                                    {guestNIckname}
                                </div>
                                <div>
                                    코인
                                </div>
                            </div>
                            <div style={{ textAlign: "center", margin: "auto" }}>
                                VS
                            </div>
                            <div style={{ marginRight: "100px", textAlign: "right" }}>
                                <div>
                                    {mynickname}
                                </div>
                                <div>
                                    코인
                                </div>
                            </div>
                        </div>
                        {/* guest */}
                        <div style={{ height: "125px", width: "941px", margin: "auto", marginTop: "40px", display: "flex", justifyContent: "flex-end" }}>
                            <Card style={{ height: "117.12px", width: "80px", display: "flex", margin: "auto", marginRight: "7px", backgroundImage: 'url(' + Black + ')' }}>

                            </Card>
                        </div>
                        <div style={{ height: "125px", width: "941px", margin: "10px auto 20px auto", display: "flex" }}>
                            <Card style={{ height: "117.12px", width: "80px", display: "flex", margin: "auto", marginLeft: "7px", backgroundImage: 'url(' + Black + ')' }}>

                            </Card>
                        </div>
                        {/* 중간구역 */}
                        {turn === true && middleView === true ?
                            // {/* 배팅 뷰 */}
                            <div style={{ height: "190px", width: "897px", backgroundColor: "#D9D9D9", margin: "auto", fontSize: "36px", display: "flex", justifyContent: "space-between", lineHeight: "180px" }}>
                                <div style={{ display: "flex" }}>
                                    <input style={{ height: "33px", width: "146px", padding: "5px", border: "0px", marginTop: "70px", marginLeft: "100px" }}></input>개 배팅
                                </div>
                                <div style={{ marginRight: "100px" }}>
                                    나가기
                                </div>
                            </div> : ''}
                        {turn === false && middleView === true ?
                            // {/* 기다릴 때 뷰 */}
                            <div style={{ height: "190px", width: "897px", backgroundColor: "#D9D9D9", margin: "auto", fontSize: "50px", display: "flex", justifyContent: "space-between", lineHeight: "180px", margin: "auto" }}>
                                <span style={{ display: "flex", margin: "auto" }}>상대가 배팅하는 중입니다</span>
                            </div> : ''}
                        {/* 결과 뷰 */}
                        {middleView === false ? <div style={{ height: "190px", width: "897px", backgroundColor: "#D9D9D9", margin: "auto", fontSize: "36px", display: "flex", justifyContent: "space-between", lineHeight: "180px" }}>
                            0라운드 승리 {mynickname}!!
                        </div> : ''}
                        {/* owner */}
                        <div style={{ height: "125px", width: "941px", margin: "20px auto 10px auto", display: "flex" }}>
                            <Card style={{ height: "117.12px", width: "80px", display: "flex", margin: "auto", marginLeft: "7px", backgroundImage: 'url(' + Black + ')' }}>

                            </Card>
                        </div>
                        <div style={{ height: "125px", width: "941px", margin: "auto auto 49px auto", display: "flex" }}>
                            <Card style={{ height: "117.12px", width: "80px", display: "flex", margin: "auto 7px auto auto", backgroundImage: 'url(' + Black + ')' }}>

                            </Card>
                        </div>
                        {/* 마지막구역 */}
                        <div style={{ height: "60px", width: "1041px", margin: "auto", fontSize: "36px", display: "flex", justifyContent: "space-between" }}>
                            <div>
                                {mynickname}
                            </div>
                            <div>
                                나가기
                            </div>
                        </div>
                    </div> :
                    <div style={{ height: "1024px", width: "1440px" }}>
                        {/* //게스트뷰 */}
                        <div style={{ height: "125px", width: "1041px", backgroundColor: "#D9D9D9", margin: "auto", display: "flex", fontSize: "36px" }}>
                            <div style={{ marginLeft: "100px" }}>
                                <div>
                                    {ownerNickname}
                                </div>
                                <div>
                                    코인
                                </div>
                            </div>
                            <div style={{ textAlign: "center", margin: "auto" }}>
                                VS
                            </div>
                            <div style={{ marginRight: "100px", textAlign: "right" }}>
                                <div>
                                    {mynickname}
                                </div>
                                <div>
                                    코인
                                </div>
                            </div>
                        </div>
                        {/* owner */}
                        <div style={{ height: "125px", width: "941px", margin: "auto", marginTop: "40px", display: "flex", justifyContent: "flex-end" }}>
                            <Card style={{ height: "117.12px", width: "80px", display: "flex", margin: "auto", marginRight: "7px", backgroundImage: 'url(' + Black + ')' }}>

                            </Card>
                        </div>
                        <div style={{ height: "125px", width: "941px", margin: "10px auto 20px auto", display: "flex" }}>
                            <Card style={{ height: "117.12px", width: "80px", display: "flex", margin: "auto", marginLeft: "7px", backgroundImage: 'url(' + Black + ')' }}>

                            </Card>
                        </div>
                        {/* 중간구역 */}
                        {turn === true && middleView === true ?
                            // {/* 배팅 뷰 */}
                            <div style={{ height: "190px", width: "897px", backgroundColor: "#D9D9D9", margin: "auto", fontSize: "36px", display: "flex", justifyContent: "space-between", lineHeight: "180px" }}>
                                <div style={{ display: "flex" }}>
                                    <input style={{ height: "33px", width: "146px", padding: "5px", border: "0px", marginTop: "70px", marginLeft: "100px" }}></input>개 배팅
                                </div>
                                <div style={{ marginRight: "100px" }}>
                                    나가기
                                </div>
                            </div> : ''}
                        {turn === false && middleView === true ?
                            // {/* 기다릴 때 뷰 */}
                            <div style={{ height: "190px", width: "897px", backgroundColor: "#D9D9D9", margin: "auto", fontSize: "50px", display: "flex", justifyContent: "space-between", lineHeight: "180px", margin: "auto" }}>
                                <span style={{ display: "flex", margin: "auto" }}>상대가 배팅하는 중입니다</span>
                            </div> : ''}
                        {/* 결과 뷰 */}
                        {middleView === false ? <div style={{ height: "190px", width: "897px", backgroundColor: "#D9D9D9", margin: "auto", fontSize: "36px", display: "flex", justifyContent: "space-between", lineHeight: "180px" }}>
                            0라운드 승리 {mynickname}!!
                        </div> : ''}
                        {/* guest */}
                        <div style={{ height: "125px", width: "941px", margin: "20px auto 10px auto", display: "flex" }}>
                            <Card style={{ height: "117.12px", width: "80px", display: "flex", margin: "auto", marginLeft: "7px", backgroundImage: 'url(' + Black + ')' }}>

                            </Card>
                        </div>
                        <div style={{ height: "125px", width: "941px", margin: "auto auto 49px auto", display: "flex" }}>
                            <Card style={{ height: "117.12px", width: "80px", display: "flex", margin: "auto 7px auto auto", backgroundImage: 'url(' + Black + ')' }}>

                            </Card>
                        </div>
                        {/* 마지막구역 */}
                        <div style={{ height: "60px", width: "1041px", margin: "auto", fontSize: "36px", display: "flex", justifyContent: "space-between" }}>
                            <div>
                                {mynickname}
                            </div>
                            <div>
                                나가기
                            </div>
                        </div>
                    </div>}


            {/* 결과창 모달 */}
            {
                gameEnd === true ? (<>
                    <EndModal>
                        <div style={{ width: "1000px", height: "600px", backgroundColor: "white", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ fontSize: "60px", marginBottom: "30px" }}>승자는 누구!</div>
                            <div style={{ fontSize: "36px" }}>상대 카드</div>
                            <div style={{ width: "941px", margin: "0px auto 10px auto", display: "flex" }}>
                                <div style={{ height: "117.12px", width: "80px", backgroundColor: "purple", display: "flex", margin: "auto", marginLeft: "7px" }}>

                                </div>
                            </div>
                            <div style={{ fontSize: "36px", marginTop: "50px" }}>나의 카드</div>
                            <div style={{ width: "941px", margin: "0px auto 10px auto", display: "flex" }}>
                                <div style={{ height: "117.12px", width: "80px", backgroundColor: "purple", display: "flex", margin: "auto", marginLeft: "7px" }}>

                                </div>
                            </div>
                            <button onClick={() => { setGameEnd(false); setGamestart(false); }} style={{ fontSize: "26px", marginTop: "10px" }}>
                                결과 닫기
                            </button>
                        </div>
                    </EndModal>
                </>) : ''
            }
        </>
    );
};

export default Room;

const RoomBody = styled.div`
    width: 1140px;
    height:689px;
    margin: auto;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    button {width: 140px;
        height: 45px;
        left: 908px;
        top: 104px;
        background: #F4F4F4;
        border: 1px solid rgba(169, 169, 169, 0.25);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        :hover {
        background-color: #BAB7B7;
        cursor: pointer;
            }
    }
`

const ChatBody = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-bottom:53px;
    padding: 10px;
    font-style: normal;
    width: 980px;
    height: 540px;
    left: 193px;
    top: 431px;
    background: #F4F4F4;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    input {
        background: none;
        border: none;
        width: 895px;
    }
`

const ChatWrapCss = styled.div`
    overflow-y: scroll;
    width: 960px;
    height: 400px;
    left: 219px;
    top: 464px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 10px;
    p {
        height:5px;
    }
`

const Kick = styled.span`
    span {
        border-radius:5px;
        :hover{
        cursor:pointer;
        background-color: #BAB7B7;
    }
    }
`

const EndModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Card = styled.div`
    background-size: cover;   
    background-position: center; 
`

const UserList = styled.div`
    width: 918px;
    height: 25px;
    left: 230px;
    top: 223px;
    background: #F4F4F4;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    font-size: 18px;
    padding: 10px 30px 10px 30px;
    display:flex;
    margin: auto auto 40px auto;
    justify-content: space-between;
`

const ChatForm = styled.div`
    margin-top: 10px;
    width: 980px;
    height: 45px;
    left: 219px;
    top: 906px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    input {
        height: 43px; 
    }
    button {
        height: 45px;
        font-weight:700; 
        background:none; 
        border:none;
        :hover {
            background-color: #BAB7B7;
            cursor: pointer;
        }
    }
`