import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import socketio from 'socket.io-client';
import { useParams, useNavigate } from "react-router-dom";

//이미지
import RoomBackground from "../shared/image/RoomIMG/RoomBackground.png";
import BackWhite from "../shared/image/RoomIMG/CardBackWhite.png";
import BackBlack from "../shared/image/RoomIMG/CardBackBlack.png";
import FrontWhite from "../shared/image/RoomIMG/CardFrontWhite.png";
import FrontBlack from "../shared/image/RoomIMG/CardFrontBlack.png";
import Crown from "../shared/image/RoomIMG/Crown.png"
import Coin from "../shared/image/RoomIMG/Coin.png"
import BigCoin from "../shared/image/RoomIMG/BigCoin.png"

const socket = socketio.connect(process.env.REACT_APP_SURVER); //백서버

function Room() {
    const navigate = useNavigate();

    const params = useParams();
    const roomId = +params.roomId;
    const room = roomId;

    const token = localStorage.getItem("token");

    //유저Id
    const [userId, setUserId] = useState('');

    //닉네임
    const [mynickname, setMyNickname] = useState('');
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
    const [round, setRound] = useState(0); // 라운드 
    const [turn, setTurn] = useState(true); // 턴 여부
    const [middleView, setMiddleView] = useState(true); // 중간부분 뷰 여부
    const [gameEnd, setGameEnd] = useState(false);
    const [batting, setBatting] = useState(0);
    const [card, setCard] = useState(0);
    const [cardPick, setCardPick] = useState(false);
    //게스트 진행정보
    const [guestCards, setGuestCards] = useState([]);
    const [guestBattingCards, setGuestBattingCards] = useState([]);
    const [guestCoin, setGuestCoin] = useState(50);
    const [guestResult, setGuestResult] = useState([]);
    const [guestWin, setGuestWin] = useState(0);
    //호스트 진행정보
    const [ownerCards, setOwnerCards] = useState([]);
    const [ownerBattingCards, setOwnerBattingCards] = useState([]);
    const [ownerCoin, setOwnerCoin] = useState(50);
    const [ownerResult, setOwnerResult] = useState([]);
    const [ownerWin, setOwnerWin] = useState(0);

    useEffect(scrollToBottom, [list]);

    useEffect(() => {

        socket.emit("login",
            {
                token,
                room
            }, () => {
            }
        );

        socket.on("login_room", login => {
            setUsers(login.userList); //유저 목록
            setOwnerNickname(login.owner); //방장 닉네임
            setGuestNIckname(login.userList.filter((user) => user.nickname !== ownerNickname)[0]?.nickname); //게스트 닉네임
            setOwnersoketId(login.userList.filter((user) => user.nickname === ownerNickname)[0]?.socketId); //방장 소켓 아이디
            setGuestsoketId(login.userList.filter((user) => user.nickname !== ownerNickname)[0]?.socketId); //게스트 소켓 아이디     
        });

        socket.on("login_user", login => {
            socket.emit("chat", { nickname: login.mynickname, msg: "님이 입장하셨습니다." });
            setUserId(login.userId);
            setMysocketId(login.socketId); //나의 소켓 아이디
            setMyNickname(login.nickname); //나의 닉네임
        });

        socket.on("chat", chat => {
            setList(prev => prev.concat({ text: chat.nickname + " " + chat.msg }));
        });

        socket.on("ready", ready => {
            setReady(ready.ready);
        });

        socket.on("gameStart", gameStart => {
            console.log(gameStart)
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 5초전..." })) }, 1000);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 4초전..." })) }, 2000);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 3초전..." })) }, 3000);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 2초전..." })) }, 4000);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 1초전..." })) }, 5000);
            setTimeout(() => { setGamestart(true) }, 6000);
            const guest = gameStart.guest;
            const owner = gameStart.owner;

            setBatting(gameStart.batting);
            setRound(gameStart.round);
            //게스트 set
            setGuestBattingCards(guest.battingCards);
            const newnum = [];
            while (guest.cards.length) {
                const movenum = guest.cards.splice(Math.floor(Math.random() * guest.cards.length), 1)[0]
                newnum.push(movenum)
            };
            const guestcards = newnum.filter(x => !guest.battingCards.includes(x));
            setGuestCards(guestcards);
            setGuestNIckname(guest.nickname);
            setGuestResult(guest.Result);
            setGuestsoketId(guest.socketId);
            setGuestWin(guest.win);
            setGuestCoin(guest.coin);

            //호스트 set
            setOwnerBattingCards(owner.battingCards);
            const newnum2 = [];
            while (owner.cards.length) {
                const movenum2 = owner.cards.splice(Math.floor(Math.random() * owner.cards.length), 1)[0]
                newnum2.push(movenum2)
            };
            const ownercards = newnum2.filter(x => !owner.battingCards.includes(x));
            setOwnerCards(ownercards);
            setOwnerNickname(owner.nickname);
            setOwnerResult(owner.Result);
            setOwnersoketId(owner.socketId);
            setOwnerWin(owner.win);
            setGuestCoin(owner.coin);
            if (gameStart.turn[0] === "owner") {
                if (mynickname === ownerNickname) {
                    setTurn(true);
                } else {
                    setTurn(false);
                }
            } else if (gameStart.turn[0] === "guest") {
                if (mynickname === ownerNickname) {
                    setTurn(false);
                } else {
                    setTurn(true);
                }
            }
        });

        socket.on("kick", kick => {
            alert("방장에 의해 추방되었습니다.")
            socket.emit("forceDisconnect")
            setReady(false);
            navigate("/")
        });

        socket.on("error", error => {
            console.log(error);
        });

        socket.on("turnEnd", turnEnd => {
            console.log(turnEnd);
        });

        socket.on("turnResult", turnResult => {
            console.log(turnResult);
        });

        socket.on("gameEnd", gameEnd => {
            console.log(gameEnd);
        });

    }, []);

    // socket.emit("turnEnd", {
    //     batting,
    //     turn,
    //     round,
    //     card,
    //     player: {
    //         userId,
    //         nickname:mynickname,
    //         socketId:mysocketId,
    //         cards: mynickname === ownerNickname ? ownerCards : guestCards,
    //         battingCards: mynickname === ownerNickname ? ownerBattingCards : guestBattingCards,
    //         coin: mynickname === ownerNickname ? ownerCoin : guestCoin,
    //         result: mynickname === ownerNickname ? ownerResult : guestResult,
    //         win : mynickname === ownerNickname ? ownerWin : guestWin
    //     }
    // });

    // socket.emit("gameEnd", {
    //     owner: {
    //         userId
    //     }
    // });
    // let timer = setTimeout(()=>{setList(prev => prev.concat({ text: chat.nickname + " " + chat.msg }))}, 2000);

    return (
        <>
            {gamestart === false ?
                //대기방
                <div style={{ width: "1440px", height: "1024px", backgroundImage: 'url(' + RoomBackground + ')', backgroundPosition: "center", backgroundSize: "auto", fontSize: "18px", margin: "0px auto" }}>
                    <div style={{ width: "1040px", height: "755px", margin: "0px auto", display: "flex", flexDirection: "column" }}>
                        <RoomBody style={{ paddingTop: "150px" }}>
                            {mynickname === ownerNickname ?
                                //호스트 구역
                                <div>
                                    <div style={{ fontSize: "24px", width: "975px", margin: "auto auto 80px auto" }}>{ownerNickname}님의 게임방
                                        <span style={{ float: "right" }}>
                                            <button style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold", color: "red" }} onClick={() => { socket.emit("kick", { socketId: guestsoketId }); }}>추방하기</button>
                                            <button onClick={() => { !ready ? alert("상대가 아직 준비하지 않았습니다.") : socket.emit("gameStart", { gameStart: true }); }} style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold" }}>게임시작</button>
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
                                        <div>{users.filter((user) => user.nickname !== ownerNickname)[0]?.nickname}</div>
                                        <div style={{ marginRight: "10px" }}>{ready ? "준비완료" : "준비중"}</div></> : ''}
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
                                        <div style={{ marginRight: "10px" }}>{ready ? "준비완료" : "준비중"}</div>
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
                    </div>
                </div> :
                //게임방
                mynickname === ownerNickname ?
                    <div style={{ width: "100%", height: "100%", minWidth: "1440px", minHeight: "1024px" }}>
                        <div style={{ width: "1040px", height: "1024px", display: "flex", margin: "auto", flexDirection: "column" }}>
                            {/* //호스트뷰 */}
                            <GameTop style={{ display: "flex", fontSize: "18px", justifyContent: "space-between", marginTop: "15px" }}>
                                <div style={{ display: "flex", margin: "auto auto auto 0px" }}>
                                    <div style={{ overflow: "hidden" }}>{ownerNickname}님</div>
                                    <div style={{ backgroundImage: 'url(' + Coin + ')', width: "30px", height: "30px", display: "flex", backgroundSize: "cover" }}></div>
                                    <div>
                                        획득 코인 개수
                                    </div>
                                </div>
                                <div style={{ display: "flex", margin: "auto" }}>
                                    <div>{guestNIckname}님</div>
                                    <div style={{ backgroundImage: 'url(' + Coin + ')', width: "30px", height: "30px", display: "flex", backgroundSize: "cover" }}></div>
                                    <div>
                                        획득 코인 개수
                                    </div>
                                </div>
                                <div>
                                    <button>항복하기</button>
                                    <button style={{ marginLeft: "55px" }}>나가기</button>
                                </div>
                            </GameTop>
                            {/* guest */}
                            <div style={{ height: "125px", width: "1040px", margin: "25px auto auto 2px", display: "flex", justifyContent: "flex-end" }}>
                                {guestCards?.map((guestcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", margin: "auto", backgroundImage: guestcard % 2 === 0 ? 'url(' + BackWhite + ')' : 'url(' + BackBlack + ')' }}>
                                    </Card>
                                )}
                            </div>
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 20px auto", display: "flex" }}>
                                {guestBattingCards?.map((guestbattingcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", margin: "auto", marginLeft: "7px", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + BackWhite + ')' : 'url(' + BackBlack + ')' }}>
                                    </Card>
                                )}
                            </div>
                            {/* 중간구역 */}
                            {/* <MidBase>
                                <div style={{ display: "flex", margin: "auto" }}><MidWinCircle></MidWinCircle></div>
                                <div style={{ fontSize: "36px", display: "flex", margin: "auto" }}>Round 1</div>
                                <div style={{ display: "flex", margin: "auto" }}><MidLoseCircle></MidLoseCircle></div>
                            </MidBase> */}
                            {/* <BattingMid>
                                <div style={{ fontSize: "36px", display: "flex", margin: "auto" }}>배팅을 시작해주세요.</div>
                                <div style={{ background: "#FFD700", width: "48px", height: "48px", borderRadius: "100%", display: "flex", margin: "auto" }}></div>
                                <div style={{display: "flex", margin: "auto", fontSize:"18px"}}>배팅은 최대 0개 까지 가능합니다.</div>
                                <div style={{display: "flex", margin: "auto", fontSize:"25px"}}><input></input><span style={{marginTop:"10px", marginLeft:"5px"}}>개 배팅하기</span></div>
                            </BattingMid> */}
                            {/* <CardPickMid>
                            <div style={{ fontSize: "36px", display: "flex", margin: "auto auto 40px auto" }}>카드를 선택해주세요.</div>
                                <div style={{ background: "#FFD700", width: "48px", height: "48px", borderRadius: "100%", display: "flex", margin: "0px auto auto auto" }}></div>
                            </CardPickMid> */}
                            {/* <TurnFalseMid>
                                <div style={{display:"flex", margin:"auto auto 50px auto", fontSize:"36px"}}>상대가 턴을 진행중입니다.</div>
                                <div style={{display:"flex", margin:"0px auto auto auto", fontSize:"30px", color:"red"}}><span style={{color:"black", marginRight:"10px"}}>남은시간</span> 20초</div>
                            </TurnFalseMid> */}
                            {/* <TurnResultMid>
                                <div style={{width:"475px", height:"95px", display:"flex", flexDirection:"column", margin:"auto"}}>
                                    <div style={{ color: "#3A3A3A", fontSize: "36px", display:"flex", margin:"auto auto auto 0px" }}>첫번째 라운드</div>
                                    <div style={{ color: "black", fontSize: "36px", margin:"auto 0px auto auto" }}>지니어스님 승리</div>
                                </div>
                                <div style={{ display: "flex", color: "black", fontSize: "36px", margin:"auto" }}>획득 코인<div style={{ backgroundImage: 'url(' + Coin + ')', width: "40px", height: "40px", backgroundSize: "cover", marginTop: "3px" }}></div>x<span>10</span></div>
                            </TurnResultMid> */}
                            {/* owner */}
                            <div style={{ height: "125px", width: "1040px", margin: "auto auto 10px auto", display: "flex" }}>
                                {ownerBattingCards?.map((ownerbattingcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", color: ownerbattingcard % 2 !== 0 ? "white" : "black", paddingLeft: "34px", margin: "auto", backgroundImage: ownerbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center" }}>
                                        {ownerbattingcard}
                                    </Card>
                                )}
                            </div>
                            <div style={{ height: "125px", width: "1040px", margin: "auto auto 0px auto", display: "flex" }}>
                                {ownerCards?.map((ownercard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", color: ownercard % 2 !== 0 ? "white" : "black", margin: "auto", paddingLeft: "34px", backgroundImage: ownercard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center" }}>
                                        {ownercard}
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    <div style={{ width: "100%", height: "100%", minWidth: "1440px", minHeight: "1024px" }}>
                        <div style={{ width: "1040px", height: "1024px", display: "flex", margin: "auto", flexDirection: "column" }}>
                            {/* //게스트뷰 */}
                            <GameTop style={{ display: "flex", fontSize: "18px", justifyContent: "space-between", marginTop: "15px" }}>
                                <div style={{ display: "flex", margin: "auto auto auto 0px" }}>
                                    <div style={{ overflow: "hidden" }}>{ownerNickname}님</div>
                                    <div style={{ backgroundImage: 'url(' + Coin + ')', width: "30px", height: "30px", display: "flex", backgroundSize: "cover" }}></div>
                                    <div>
                                        획득 코인 개수
                                    </div>
                                </div>
                                <div style={{ display: "flex", margin: "auto" }}>
                                    <div>{guestNIckname}님</div>
                                    <div style={{ backgroundImage: 'url(' + Coin + ')', width: "30px", height: "30px", display: "flex", backgroundSize: "cover" }}></div>
                                    <div>
                                        획득 코인 개수
                                    </div>
                                </div>
                                <div>
                                    <button>항복하기</button>
                                    <button style={{ marginLeft: "55px" }}>나가기</button>
                                </div>
                            </GameTop>
                            {/* guest */}
                            <div style={{ height: "125px", width: "1040px", margin: "25px auto auto 2px", display: "flex", justifyContent: "flex-end" }}>
                                {ownerCards?.map((guestcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", margin: "auto", backgroundImage: guestcard % 2 === 0 ? 'url(' + BackWhite + ')' : 'url(' + BackBlack + ')' }}>
                                    </Card>
                                )}
                            </div>
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 20px auto", display: "flex" }}>
                                {ownerBattingCards?.map((guestbattingcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", margin: "auto", marginLeft: "7px", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + BackWhite + ')' : 'url(' + BackBlack + ')' }}>
                                    </Card>
                                )}
                            </div>
                            {/* 중간구역 */}
                            {/* <MidBase>
                                <div style={{ display: "flex", margin: "auto" }}><MidWinCircle></MidWinCircle></div>
                                <div style={{ fontSize: "36px", display: "flex", margin: "auto" }}>Round 1</div>
                                <div style={{ display: "flex", margin: "auto" }}><MidLoseCircle></MidLoseCircle></div>
                            </MidBase> */}
                            {/* <BattingMid>
                                <div style={{ fontSize: "36px", display: "flex", margin: "auto" }}>배팅을 시작해주세요.</div>
                                <div style={{ background: "#FFD700", width: "48px", height: "48px", borderRadius: "100%", display: "flex", margin: "auto" }}></div>
                                <div style={{display: "flex", margin: "auto", fontSize:"18px"}}>배팅은 최대 0개 까지 가능합니다.</div>
                                <div style={{display: "flex", margin: "auto", fontSize:"25px"}}><input></input><span style={{marginTop:"10px", marginLeft:"5px"}}>개 배팅하기</span></div>
                            </BattingMid> */}
                            {/* <CardPickMid>
                            <div style={{ fontSize: "36px", display: "flex", margin: "auto auto 40px auto" }}>카드를 선택해주세요.</div>
                                <div style={{ background: "#FFD700", width: "48px", height: "48px", borderRadius: "100%", display: "flex", margin: "0px auto auto auto" }}></div>
                            </CardPickMid> */}
                            {/* <TurnFalseMid>
                                <div style={{display:"flex", margin:"auto auto 50px auto", fontSize:"36px"}}>상대가 턴을 진행중입니다.</div>
                                <div style={{display:"flex", margin:"0px auto auto auto", fontSize:"30px", color:"red"}}><span style={{color:"black", marginRight:"10px"}}>남은시간</span> 20초</div>
                            </TurnFalseMid> */}
                            {/* <TurnResultMid>
                                <div style={{width:"475px", height:"95px", display:"flex", flexDirection:"column", margin:"auto"}}>
                                    <div style={{ color: "#3A3A3A", fontSize: "36px", display:"flex", margin:"auto auto auto 0px" }}>첫번째 라운드</div>
                                    <div style={{ color: "black", fontSize: "36px", margin:"auto 0px auto auto" }}>지니어스님 승리</div>
                                </div>
                                <div style={{ display: "flex", color: "black", fontSize: "36px", margin:"auto" }}>획득 코인<div style={{ backgroundImage: 'url(' + Coin + ')', width: "40px", height: "40px", backgroundSize: "cover", marginTop: "3px" }}></div>x<span>10</span></div>
                            </TurnResultMid> */}
                            {/* owner */}
                            <div style={{ height: "125px", width: "1040px", margin: "auto auto 10px auto", display: "flex" }}>
                                {guestBattingCards?.map((ownerbattingcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", color: ownerbattingcard % 2 !== 0 ? "white" : "black", paddingLeft: "34px", margin: "auto", backgroundImage: ownerbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center" }}>
                                        {ownerbattingcard}
                                    </Card>
                                )}
                            </div>
                            <div style={{ height: "125px", width: "1040px", margin: "auto auto 0px auto", display: "flex" }}>
                                {guestCards?.map((ownercard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", color: ownercard % 2 !== 0 ? "white" : "black", margin: "auto", paddingLeft: "34px", backgroundImage: ownercard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center" }}>
                                        {ownercard}
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>}

            {/* win모달 */}
            {/* <WinModal>
                <div style={{ display: "flex" }}><div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "120px", height: "120px", display: "flex", backgroundSize: "cover", margin: "20px", backgroundPosition: "center" }}><span style={{ display: "flex", margin: "auto" }}>W</span></div><div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "120px", height: "120px", display: "flex", backgroundSize: "cover", margin: "20px" }}><span style={{ display: "flex", margin: "auto" }}>I</span></div><div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "120px", height: "120px", display: "flex", backgroundSize: "cover", margin: "20px" }}><span style={{ display: "flex", margin: "auto" }}>N</span></div></div>
                <div style={{display:"flex", justifyContent:"space-between", width:"430px", marginTop:"105px"}}><button>대기방으로</button><button>게임 결과</button></div>
            </WinModal> */}
            {/* lose모달 */}
            {/* <LoseModal>
                <div style={{ display: "flex" }}><div style={{ backgroundImage: 'url(' + FrontBlack + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", backgroundPosition: "center" }}><span style={{ display: "flex", margin: "auto" }}>L</span></div><div style={{ backgroundImage: 'url(' + FrontWhite + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", color:"black" }}><span style={{ display: "flex", margin: "auto" }}>O</span></div><div style={{ backgroundImage: 'url(' + FrontBlack + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px" }}><span style={{ display: "flex", margin: "auto" }}>S</span></div><div style={{ backgroundImage: 'url(' + FrontWhite + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", color:"black" }}><span style={{ display: "flex", margin: "auto" }}>E</span></div></div>
                <div style={{display:"flex", justifyContent:"space-between", width:"430px", marginTop:"105px"}}><button>대기방으로</button><button>게임 결과</button></div>
            </LoseModal> */}
            {/* 게임 결과 모달 */}
            {gameEnd === true ?
                <ResultModal>
                    <div style={{ fontSize: "36px", marginTop: "20px", marginBottom: "45px" }}>게임 결과</div>
                    <GameTop style={{ width: "1040px", display: "flex", fontSize: "24px", justifyContent: "space-between", marginTop: "15px", marginBottom: "45px" }}>
                        <div style={{ display: "flex", width: "520px" }}>
                            <div style={{ overflow: "hidden", margin: "auto", maxWidth: "420px" }}>{ownerNickname}님</div>
                            <div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "60px", height: "60px", display: "flex", backgroundSize: "cover" }}></div>
                            <div style={{ margin: "auto auto auto 0px" }}>
                                획득 코인 개수
                            </div>
                        </div>
                        <div style={{ display: "flex", width: "520px" }}>
                            <div style={{ overflow: "hidden", margin: "auto", maxWidth: "420px" }}>{guestNIckname}님</div>
                            <div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "60px", height: "60px", display: "flex", backgroundSize: "cover" }}></div>
                            <div style={{ margin: "auto auto auto 0px" }}>
                                획득 코인 개수
                            </div>
                        </div>
                    </GameTop>
                    {mynickname === ownerNickname ?
                        // 방장구역
                        <>
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 20px auto", display: "flex" }}>
                                {guestBattingCards?.map((guestbattingcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", margin: "auto", marginLeft: "6px", color: guestbattingcard % 2 !== 0 ? "white" : "black", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", paddingLeft: "34px" }}>
                                        {guestbattingcard}
                                    </Card>
                                )}
                            </div>
                            <MidBase>
                                <div style={{ display: "flex", margin: "auto" }}><MidWinCircle></MidWinCircle></div>
                                <div style={{ display: "flex", margin: "auto" }}><MidLoseCircle></MidLoseCircle></div>
                            </MidBase>
                            <div style={{ height: "125px", width: "1040px", margin: "0px auto 105px auto", display: "flex" }}>
                                {ownerBattingCards?.map((ownerbattingcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", color: ownerbattingcard % 2 !== 0 ? "white" : "black", paddingLeft: "34px", margin: "auto", backgroundImage: ownerbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center" }}>
                                        {ownerbattingcard}
                                    </Card>
                                )}
                            </div>
                        </> : <>
                            {/* //게스트구역 */}
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 20px auto", display: "flex" }}>
                                {ownerBattingCards?.map((ownerbattingcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", margin: "auto", marginLeft: "6px", color: ownerbattingcard % 2 !== 0 ? "white" : "black", backgroundImage: ownerbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", paddingLeft: "34px" }}>
                                        {ownerbattingcard}
                                    </Card>
                                )}
                            </div>
                            <MidBase>
                                <div style={{ display: "flex", margin: "auto" }}><MidWinCircle></MidWinCircle></div>
                                <div style={{ display: "flex", margin: "auto" }}><MidLoseCircle></MidLoseCircle></div>
                            </MidBase>
                            <div style={{ height: "125px", width: "1040px", margin: "0px auto 105px auto", display: "flex" }}>
                                {guestBattingCards?.map((guestbattingcard, index) =>
                                    <Card key={index} style={{ height: "140px", width: "95px", display: "flex", color: guestbattingcard % 2 !== 0 ? "white" : "black", paddingLeft: "34px", margin: "auto", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center" }}>
                                        {guestbattingcard}
                                    </Card>
                                )}
                            </div>
                        </>}
                    <button style={{ width: "210px", height: "45px", background: "#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "8px", border: "0", marginBottom: "30px" }}>대기실로 이동하기</button>
                </ResultModal> : ''}
        </>
    );
};

export default Room;

const RoomBody = styled.div`
    display:flex;
    padding: 10px;
    width: 1140px;
    height:689px;
    margin: auto;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    button {
        width: 140px;
        height: 45px;
        background: #F4F4F4;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        border: 0;
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

// --------

let GameTop = styled.div`
    button {
        font-size:18px;
        width: 121px;
        height: 45px;
        left: 943px;
        top: 15px;
        background: #FFFFFF;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        border: 0;
        :hover {
        background-color: #BAB7B7;
        cursor: pointer;
            }
    }
`

let BattingMid = styled.div`
    display:flex;
    flex-direction:column;
    width: 1040px;
    height: 300px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    input {
        font-size: 18px;
        padding: 0 10px;
        width: 162px;
        height: 45px;
        background: #F4F4F4;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
    }
`

let CardPickMid = styled.div`
    display:flex;
    flex-direction:column;
    width: 1040px;
    height: 300px;
    left: 200px;
    top: 405px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`

let TurnFalseMid = styled.div`
    display:flex;
    flex-direction:column;
    width: 1040px;
    height: 300px;
    left: 200px;
    top: 405px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`

let TurnResultMid = styled.div`
    display:flex;
    flex-direction:column;
    width: 1040px;
    height: 300px;
    left: 200px;
    top: 405px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`

let MidBase = styled.div`
    display:flex;
    flex-direction:column;
    width: 1040px;
    height: 300px;
`

let MidWinCircle = styled.div`
    width:48px;
    height:48px;
    background: linear-gradient(135deg, #FADE48 13.75%, #FEDA17 38.67%, #FEF3BA 62.84%, #FFFAE0 86.25%);
    box-shadow: inset 2px 2px 6px rgba(146, 152, 113, 0.2);
    border-radius:100%;
`

let MidLoseCircle = styled.div`
    width:48px;
    height:48px;
    background: #CACACA;
    box-shadow: inset 2px 2px 6px rgba(146, 152, 113, 0.2);
    border-radius:100%;
`

const WinModal = styled.form`
    font-size:60px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.126);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction:column;
   
    button {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      width: 190px;
      height: 55px;
      background: #F4F4F4;
      border: 1px solid rgba(169, 169, 169, 0.25);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
        :hover {
        background-color: #BAB7B7;
        cursor: pointer;
              }
    }
`;

const LoseModal = styled.form`
    font-size:60px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.126);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction:column;
   
    button {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      width: 190px;
      height: 55px;
      background: #F4F4F4;
      border: 1px solid rgba(169, 169, 169, 0.25);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
        :hover {
        background-color: #BAB7B7;
        cursor: pointer;
              }
    }
`;

const ResultModal = styled.form`
    font-size:60px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
   
    /* button {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      width: 190px;
      height: 55px;
      background: #F4F4F4;
      border: 1px solid rgba(169, 169, 169, 0.25);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
        :hover {
        background-color: #BAB7B7;
        cursor: pointer;
              }
    } */
`;