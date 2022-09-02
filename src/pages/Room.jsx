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
    const [nickname, setNickname] = useState('');
    const [masterNickname, setMasterNickname] = useState('방장');
    const [kicksocketId, setKicksocketId] = useState('');
    const [mysocketId, setMysocketId] = useState('');

    //채팅
    const [chat, setChat] = useState(""); // 새로운 채팅
    const [list, setList] = useState([]); // 채팅 list
    const [users, setUsers] = useState([]); // 유저 list
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    //진행
    const [ready, setReady] = useState(false); // 새로운 채팅

    useEffect(scrollToBottom, [list]);
    useEffect(() => {

        // socket.emit("login",
        //     {
        //         userId,
        //         nickname,
        //         room
        //     }, () => {
        //     }
        // );

        // socket.on("login", chat => {
        //     setList(prev => prev.concat({ text: chat }));
        // });

        // socket.on("chat", chat => {
        //     setList(prev => prev.concat({ text: chat.msg }));
        // });

        socket.emit("login",
            {
                token,
                room
            }, () => {
            }
        );

        socket.on("login", login => {
            console.log(login)
            setList(prev => prev.concat({ text: login.nickname+"님이 입장하셨습니다." }));
            setNickname(login.nickname);
            setMasterNickname(login.owner);
            setUserId(login.userId);
            setMysocketId(login.socketId);
            setUsers(login.userList);
        });

        socket.on("chat", chat => {
            setList(prev => prev.concat({ text: chat.nickname +" "+ chat.msg }));
        });

        // socket.on("ready", ready => {
        //     // setList(prev => prev.concat({ text: chat.msg }));
        //     console.log(ready);
        // });

        // socket.on("gameInfo", gameInfo => {
        //     // setList(prev => prev.concat({ text: chat.msg }));
        //     console.log(gameInfo);
        // });

        // socket.on("disconnect", disconnect => {
        //     // setList(prev => prev.concat({ text: chat.msg }));
        //     console.log(disconnect);
        // });

        // socket.on("error", error => {
        //     // setList(prev => prev.concat({ text: chat.msg }));
        //     console.log(error);
        // });

    }, []);

    // socket.emit("kick", { socketId:kicksocketId });
    // socket.emit("ready", { ready });
    // socket.emit("gamestart", { gamestart:true });
    // socket.emit("turnEnd", {
    //     turnEnd:{
    //             nickname,
    //             socketId:mysocketId,
    //             card:[],
    //             battingCard,
    //             batting,
    //             turn,
    //             money,
    //             win:undifind,
    //             round,
    //                     }
    //     });
    // socket.emit("gameEnd", { gameEnd:true });


    return (
        <div style={{ "backgroundColor": "black" }}>
            <RoomBody>
                {nickname === masterNickname ?
                    //방장 구역
                    <div>
                        <div>{masterNickname}님의 게임방
                            <span>
                                <button>게임시작</button>
                                <button onClick={() => { navigate("/") }}>나가기</button>
                            </span>
                        </div>
                        <div>{masterNickname}
                            <span>방장</span>
                            <span>준비완료</span>
                        </div>
                        <div>{users.filter((user) => user.nickname !== masterNickname)[0]?.nickname !== undefined ? users.filter((user) => user.nickname !== masterNickname)[0].nickname : ''}
                            <span>
                                <button>추방하기</button>
                            </span>
                            <span>{ready === true ? "준비완료" : "준비중"}</span>
                        </div>
                    </div> :
                    //게스트 구역
                    <div>
                        <div>{masterNickname}님의 게임방
                            <span>
                                <button>준비하기</button>
                                <button onClick={() => { navigate("/") }}>나가기</button>
                            </span>
                        </div>
                        <div>{masterNickname}
                            <span>/방장/</span>
                            <span>준비완료</span>
                        </div>
                        <div>{nickname}
                            <span>/나/</span>
                            <span>{ready === true ? "준비완료" : "준비중"}</span>
                        </div>
                    </div>
                }
            </RoomBody>
            <ChatBody>
                <span>{roomId}번 방입니다.</span>
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
                        socket.emit("chat", { nickname, msg: chat });
                        setChat("");

                        // e.preventDefault();
                        // socket.emit("chat", { msg: chat });
                        // setChat("");
                    }}
                >
                    <div>
                        <input placeholder="메세지를 입력해주세요." value={chat} onChange={e => setChat(e.target.value)} /><span>
                            <button>전송</button>
                        </span>
                    </div>
                </form>
            </ChatBody >
        </div>
    );
};

export default Room;

const ChatWrapCss = styled.div`
    overflow-y: scroll;
    border: "1px solid";
    padding: 3px;
    height: 200px;
    p {
        height:5px;
    }
`

const ChatBody = styled.div`
    width: 800px;
    height: 200px;
    background-color: red;
    margin: auto;
    display: flex;
    flex-direction: column;
    input {
        width: 749px;
        height: 20px;
    }
`

const RoomBody = styled.div`
    width: 800px;
    height: 350px;
    background-color: yellow;
    
    margin: auto;
`