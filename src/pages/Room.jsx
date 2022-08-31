import React, { useEffect, useState } from "react";
import styled from "styled-components";
import socketio from 'socket.io-client';
import { useParams } from "react-router-dom";

function Room() {
    const params = useParams();
    const roomId = +params.roomId;
    const room = roomId;
    const socket = socketio.connect(process.env.REACT_APP_SURVER); //백서버

    //토큰주고 get으로 받기
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('게스트');
    const [masterNickname, setMasterNickname] = useState('방장');

    //채팅
    const [chat, setChat] = useState(''); // 새로운 채팅
    const [list, setList] = useState([]); // 채팅 list
    const [users, setUsers] = useState(
        [
            {
                nickname: "방장",
            },
            {
                nickname: "게스트",
            },
        ]
    ); // 유저 list

    //진행
    const [ready, setReady] = useState(false); // 새로운 채팅

    useEffect(() => {
        socket.emit("login", userId, nickname, room, () => { });

        socket.on("login-msg", msg => {
            setList(prev => prev.concat({ text: msg }));
        });

        socket.on("users", users => {
            setList(users);
        });

        socket.on("message", msg => {
            setList(prev => prev.concat({ me: false, text: msg }));
        });

        socket.on("ready", result => {
            setReady(result);
        });

    }, [socket]);


    // 페이지에 도착하면 
    // get으로 토큰주고 userId, nickname, masternickname 받기
    // login ? join? emit하기(userId, nickname, room)
    // on으로 로그인 msg받기 - nickname님이 입장하셨습니다.
    // on으로 users 목록 받기
    // on으로 남이 주는 메세지 받기 
    // on으로 ready(준비여부): true or false 받기

    //메시지 보내기
    // socket.emit("message", userId, nickname, roomId, () => {
    //     setList(prev => prev.concat({ me: true, text: chat }));
    //     setChat("");
    // });

    // 게임진행
    // 준비여부(ready) emit하기 // 게스트만 emit 활성화
    // socket.emit("ready", ready, userId, nickname, room, () => {
    // setReady(!ready)
    // });

    // 추방하기() emit? // 호스트만 emit 활성화
    // socket.emit("kick", kickname, userId, nickname, room, () => {
    // });

    // 나가기(방장의 경우 방 없애기) emit
    // socket.emit("logout", userId, nickname, room, () => {
    // window.location.replace("/") => 될 수 있으면 네비게이트로
    // });

    // 게임시작은 페이지 이동? => 모달

    return (
        <div style={{ "backgroundColor": "black" }}>
            <RoomBody>
                {nickname === masterNickname ?
                    //방장 구역
                    <div>
                        <div>{masterNickname}님의 게임방
                            <span>
                                <button>게임시작</button>
                                <button>나가기</button>
                            </span>
                        </div>
                        <div>{masterNickname}
                            <span>방장</span>
                            <span>준비완료</span>
                        </div>
                        <div>{users.filter((user) => user.nickname !== masterNickname)[0].nickname !== undefined ? users.filter((user) => user.nickname !== masterNickname)[0].nickname : ''}
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
                                <button>나가기</button>
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
                        <p key={index} style={item.me ? {} : { textAlign: "right" }}>
                            {item.text}
                        </p>
                    ))}
                </ChatWrapCss>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        socket.emit("message", userId, nickname, roomId, () => {
                            setList(prev => prev.concat({ me: true, text: chat }));
                            setChat("");
                        });
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