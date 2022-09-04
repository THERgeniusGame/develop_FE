import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import socketio from 'socket.io-client';
import { useParams, useNavigate } from "react-router-dom";

const socket = socketio.connect(process.env.REACT_APP_SURVER); //백서버

function Room() {
    const navigate = useNavigate();

    const params = useParams();
    const roomId = +params.roomId;
    const room = roomId;

    const token = process.env.REACT_APP_TOKEN;

    const [userId, setUserId] = useState('');
    //닉네임
    const [mynickname, setNickname] = useState('11');
    const [ownerNickname, setOwnerNickname] = useState('11');
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
    const [gamestart, setGamestart] = useState(true); // 게임시작 여부
    const [round, setRound] = useState(1); // 게임시작 여부

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

            // setNickname(login.nickname); //나의 닉네임
            // setOwnerNickname(login.owner); //방장 닉네임
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

        // socket.on("gameInfo", gameInfo => {
        //     if(gameInfo.gameInfo.gamestart !== gamestart) {
        //     setGamestart(gameInfo.gameInfo.gamestart);
        // }
        //     setRound(gameInfo.gameInfo.round);
        // });

        socket.on("disconnect", disconnect => {
            console.log(disconnect);
            if (disconnect !== undefined) {
                navigate("/")
            }
        });

        socket.on("error", error => {
            console.log(error.error.code);
        });

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

    return (
        <>
            {gamestart === false ?
                //대기방
                <div style={{ height: "924px", width: "1340px" }}>
                    <RoomBody>
                        {mynickname === ownerNickname ?
                            //방장 구역
                            <div>
                                <div>{ownerNickname}님의 게임방
                                    <span style={{ float: "right" }}>
                                        <button onClick={() => { ready === false ? alert("상대가 아직 준비하지 않았습니다.") : socket.emit("gamestart", { gamestart }); }} style={{ marginRight: "30px" }}>게임시작</button>
                                        <button onClick={() => { navigate("/") }}>나가기</button>
                                    </span>
                                </div>
                                <div style={{ marginTop: "150px", marginLeft: "100px", display: "flex", justifyContent: "space-around" }}>
                                    <span>{ownerNickname}</span>
                                    <span>방장</span>
                                    <span>준비완료</span>
                                </div>
                                <div style={{ marginTop: "150px", marginLeft: "100px", display: "flex", justifyContent: "space-around" }}>{users.filter((user) => user.nickname !== ownerNickname)[0]?.nickname !== undefined ? <>
                                    <span>{users.filter((user) => user.nickname !== ownerNickname)[0]?.nickname}</span>
                                    <span onClick={() => { socket.emit("kick", { socketId: guestsoketId }) }}>추방하기</span>
                                    <span>준비완료</span></> : ''}
                                </div>
                            </div> :
                            //게스트 구역
                            <div>
                                <div>{ownerNickname}님의 게임방
                                    <span style={{ float: "right" }}>
                                        <button onClick={() => { socket.emit("ready", { ready: !ready }); }} style={{ marginRight: "30px" }}>준비하기</button>
                                        <button onClick={() => { navigate("/") }}>나가기</button>
                                    </span>
                                </div>
                                <div style={{ marginTop: "150px", marginLeft: "100px", display: "flex", justifyContent: "space-around" }}>
                                    <span>{ownerNickname}</span>
                                    <span>/방장/</span>
                                    <span>준비완료</span>
                                </div>
                                <div style={{ marginTop: "150px", marginLeft: "100px", display: "flex", justifyContent: "space-around" }}>
                                    <span>{mynickname}</span>
                                    <span>/나/</span>
                                    <span>{ready === true ? "준비완료" : "준비중"}</span>
                                </div>
                            </div>
                        }
                    </RoomBody>
                    <ChatBody>
                        <span style={{ backgroundColor: "white" }}>{roomId}번 방입니다.</span>
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
                            <div>
                                <input placeholder="메세지를 입력해주세요." value={chat} onChange={e => setChat(e.target.value)} />
                            </div>
                        </form>
                    </ChatBody >
                </div> :
                //게임방
                mynickname === ownerNickname ?
                    <div style={{ height: "924px", width: "1340px", backgroundColor:"red" }}>
                        {/* //호스트뷰 */}
                    </div> :
                    <div style={{ height: "924px", width: "1340px", backgroundColor:"yellow" }}>
                        {/* //게스트뷰 */}
                    </div>}
        </>
    );
};

export default Room;

const RoomBody = styled.div`
    width: 1140px;
    height:689px;
    margin: auto;
    font-size: 36px;
    font-weight: 548;
    button {
        border: 0px;
        background-color: #D9D9D9;
        font-size: 36px;
        font-weight: 548;
        width: 320px;
        height: 80px;
    }
`

const ChatBody = styled.div`
    width: 1040px;
    height: 351px;
    background-color: #D9D9D9;
    margin: auto auto 0px auto;
    display: flex;
    flex-direction: column;
    font-size: 36px;
    font-weight: 548;
    input {
        font-weight: 548;
        font-size: 36px;
        width: 1017px;
        height: 60px;
        background-color: #8F1F1F;
        color: white;
        padding: 10px;
    }
`

const ChatWrapCss = styled.div`
    overflow-y: scroll;
    border: "1px solid";
    padding: 3px;
    height: 300px;
    p {
        height:5px;
    }
`
