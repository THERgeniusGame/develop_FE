import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import socketio from 'socket.io-client';
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useInterval from "../components/useInterval.jsx";
import { v4 as uuidv4 } from 'uuid';


//이미지
import RoomBackground from "../shared/image/RoomIMG/RoomBackground.png";
import BackWhite from "../shared/image/RoomIMG/CardBackWhite.png";
import BackBlack from "../shared/image/RoomIMG/CardBackBlack.png";
import FrontWhite from "../shared/image/RoomIMG/CardFrontWhite.png";
import FrontBlack from "../shared/image/RoomIMG/CardFrontBlack.png";
import Crown from "../shared/image/RoomIMG/Crown.png"
import Coin from "../shared/image/RoomIMG/Coin.png"
import BigCoin from "../shared/image/RoomIMG/BigCoin.png"

import Swal from 'sweetalert2'

const socket = socketio.connect(process.env.REACT_APP_SURVER); //백서버

function Room() {
    const navigate = useNavigate();

    const params = useParams();
    const roomId = +params.roomId;
    const room = roomId;
    const token = localStorage.getItem("token");

    //유저Id
    const [myUserId, setMyUserId] = useState('');
    const [ownerUserId, setOwnerUserId] = useState('');
    const [guestUserId, setGuestUserId] = useState('');
    //닉네임
    const [mynickname, setMyNickname] = useState('');
    const [ownerNickname, setOwnerNickname] = useState('');
    const [guestNickname, setGuestNickname] = useState('');

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
    const [report, setReport] = useState(false);
    const [reportId, setReportId] = useState(0);
    const [reportChat, setReportChat] = useState('');

    //진행
    const [ready, setReady] = useState(false); // 새로운 채팅
    const [gamestart, setGamestart] = useState(false); // 게임시작 여부
    const [round, setRound] = useState(0); // 라운드 
    const [turn, setTurn] = useState(false); // 턴 여부
    const [middleView, setMiddleView] = useState(true); // 중간부분 뷰 여부
    const [gameEnd, setGameEnd] = useState(false);
    const [batting, setBatting] = useState(0);
    const [card, setCard] = useState(10);
    const [cardPick, setCardPick] = useState(false);
    const [Giveturn, setGiveturn] = useState([]);
    const [TurnWinner, setTurnWinner] = useState('');
    const [turnLoser, setTurnLoser] = useState('');
    const [limitCoin, setLimitCoin] = useState(10);
    const [gameWinner, setGameWinner] = useState('');
    const [winGame, setWinGame] = useState(false);
    const [loseGame, setLoseGame] = useState(false);
    const [drawGame, setDrawGame] = useState(false);
    const [resultModal, setresultModal] = useState(false);
    const [getCoin, setGetCoin] = useState(0);
    const [unableBTN, setUnableBTN] = useState(false);
    const [winnerList, setWinnerList] = useState([]); // 라운드 결과 list
    //게스트 진행정보
    const [guestCards, setGuestCards] = useState([]);
    const [guestBattingCards, setGuestBattingCards] = useState([]);
    const [guestCoin, setGuestCoin] = useState(100);
    const [guestResult, setGuestResult] = useState([]);
    const [guestWin, setGuestWin] = useState(0);
    //호스트 진행정보
    const [ownerCards, setOwnerCards] = useState([]);
    const [ownerBattingCards, setOwnerBattingCards] = useState([]);
    const [ownerCoin, setOwnerCoin] = useState(100);
    const [ownerResult, setOwnerResult] = useState([]);
    const [ownerWin, setOwnerWin] = useState(0);
    //타이머
    const [timer, setTimer] = useState(0);

    if (timer === 0 && gamestart === true) {
        // console.log(Giveturn)
        socket.emit("turnEnd", {
            userId: myUserId,
            batting: batting <= 0 ? +1 : +batting,
            turn: Giveturn,
            card: mynickname === ownerNickname ? ownerCards[0] : guestCards[0],
            player: {
                userId: myUserId,
                nickname: mynickname,
                cards: mynickname === ownerNickname ? ownerCards : guestCards,
                battingCards: mynickname === ownerNickname ? ownerBattingCards : guestBattingCards,
                coin: mynickname === ownerNickname ? +ownerCoin : +guestCoin,
                result: mynickname === ownerNickname ? ownerResult : guestResult,
                win: mynickname === ownerNickname ? ownerWin : guestWin
            }

        });
        Swal.fire({ title: "시간이 초과되었습니다!", timer: 1500 });
    }

    useInterval(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        }
    }, 1000);

    useEffect(() => scrollToBottom, [list]);
    useEffect(() => {

        socket.emit("login",
            {
                token,
                room
            }, () => {
            }
        );

        socket.on("login_room", login => {
            socket.emit("ready", { ready: false });
            setUsers(login.userList); //유저 목록
            setOwnerNickname(login.owner); //방장 닉네임
            setGuestNickname(login.userList.filter((user) => user.nickname !== login.owner)[0]?.nickname); //게스트 닉네임
            setOwnersoketId(login.userList.filter((user) => user.nickname === login.owner)[0]?.socketId); //방장 소켓 아이디
            setGuestsoketId(login.userList.filter((user) => user.nickname !== login.owner)[0]?.socketId); //게스트 소켓 아이디
            setGuestUserId(login.userList.filter((user) => user.nickname !== login.owner)[0]?.userId); //게스트 유저 아이디
            setOwnerUserId(login.userList[0]?.userId);
        });

        socket.on("login_user", login => {
            setReady(false);
            socket.emit("chat", { nickname: login.mynickname, msg: "님이 입장하셨습니다." });
            setMyUserId(login.userId);
            setMysocketId(login.socketId); //나의 소켓 아이디
            setMyNickname(login.nickname); //나의 닉네임
        });

        socket.on("gameStart_room", gameStart_room => {
            setTimer(35);
            setUnableBTN(true);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 5초전..." })) }, 1000);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 4초전..." })) }, 2000);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 3초전..." })) }, 3000);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 2초전..." })) }, 4000);
            setTimeout(() => { setList(prev => prev.concat({ text: "게임시작 1초전..." })) }, 5000);
            setTimeout(() => { setGamestart(true) }, 6000);
            const guest = gameStart_room.guest;
            const owner = gameStart_room.owner;

            setRound(gameStart_room.round);
            //게스트 set
            setGuestBattingCards(guest.battingCards);
            const newnum = [];
            while (guest.cards.length) {
                const movenum = guest.cards.splice(Math.floor(Math.random() * guest.cards.length), 1)[0]
                newnum.push(movenum)
            };
            const guestcards = newnum.filter(x => !guest.battingCards.includes(x));
            setGuestCards(guestcards);
            setGuestNickname(guest.nickname);
            setGuestResult(guest.result);
            setGuestsoketId(guest.socketId);
            setGuestWin(guest.win);
            setGuestUserId(guest.userId);

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
            setOwnerResult(owner.result);
            setOwnersoketId(owner.socketId);
            setOwnerWin(owner.win);
            setOwnerUserId(owner.userId);

            setMiddleView(false);
            setGiveturn(gameStart_room.turn);
        });

        socket.on("chat", chat => {
            setList(prev => prev.concat({ text: chat.msg, nickname: chat.nickname }));
        });

        socket.on("ready", ready => {
            setReady(ready.ready);
        });

        socket.on("setting", setting => {
            socket.emit("setting", setting)
        });

        socket.on("kick", kick => {
            Swal.fire({ title: '방장에 의해 추방되었습니다.', timer: 1500 });
            socket.emit("forceDisconnect");
            setReady(false);
            navigate("/")
        });

        socket.on("error", error => {
            console.log(error.error);
        });

        socket.on("turnEnd_room", turnEnd_room => {
            setBatting(0);
            setCard(10);
            if (turnEnd_room.batting !== 0) {
                setCardPick(true);
            }
            setGetCoin(+turnEnd_room.batting * 2)
            setBatting(turnEnd_room.batting);
            setRound(turnEnd_room.round);
            const owner = turnEnd_room.owner;
            const guest = turnEnd_room.guest;
            //호스트
            setOwnerBattingCards(owner.battingCards);
            setOwnerCards(owner.cards);
            setOwnerResult(owner.result);
            setOwnerWin(owner.win);

            setOwnerNickname(owner.nickname);
            setOwnersoketId(owner.socketId);
            setOwnerUserId(owner.userId);
            //게스트
            setGuestBattingCards(guest.battingCards);
            setGuestCards(guest.cards);
            setGuestResult(guest.result);
            setGuestWin(guest.win);

            setGuestNickname(guest.nickname);
            setGuestsoketId(guest.socketId);
            setGuestUserId(guest.userId);

            setGiveturn(turnEnd_room.turn);

        });

        socket.on("gameEnd", gameEnd => {
            setGameEnd(true);
            setGameWinner(gameEnd.winner);
        });

        socket.on("turnResult", turnResult => {
            setTimer(45);
            winnerList.push(turnResult.winner);
            setCard(10);
            setCardPick(false);
            setBatting(turnResult.batting);
            setRound(turnResult.round);
            setTurnWinner(turnResult.winner);
            setTurnLoser(turnResult.loser);
            const owner = turnResult.owner;
            const guest = turnResult.guest;
            //오너
            setOwnerBattingCards(owner.battingCards);
            setOwnerCards(owner.cards);
            setOwnerCoin(owner.coin);
            setOwnerResult(owner.result);
            setOwnerWin(owner.win);

            setOwnerNickname(owner.nickname);
            setOwnersoketId(owner.socketId);
            setOwnerUserId(owner.userId);

            //게스트
            setGuestBattingCards(guest.battingCards);
            setGuestCards(guest.cards);
            setGuestCoin(guest.coin);
            setGuestResult(guest.result);
            setGuestWin(guest.win);

            setGuestNickname(guest.nickname);
            setGuestsoketId(guest.socketId);
            setGuestUserId(guest.userId);

            setTimeout(() => { setTurnWinner(''); setMiddleView(true); }, 5000);
            setTimeout(() => { setTurnWinner(''); setMiddleView(false); }, 15000);
        });

    }, []);

    socket.on("gameStart_user", gameStart_user => {
        setMyUserId(gameStart_user.userId);
        setMyNickname(gameStart_user.nickname);
        setMysocketId(gameStart_user.socketId);
    })

    socket.on("login_user", login_user => {
        if (mynickname === ownerNickname) {
            setOwnerUserId(login_user.userId);
        }
    });

    socket.on("turnEnd_user", turnEnd_user => {

    });

    socket.on("gameStart_room", gameStart_room => {
        if (gameStart_room.turn[0] === "owner") {
            if (mynickname === ownerNickname) {
                setTurn(true);
            } else { setTurn(false); }
        }
    });

    socket.on("gameStart_room", gameStart_room => {
        if (gameStart_room.turn[0] === "guest") {
            if (mynickname === ownerNickname) {
                setTurn(false);
            } else { setTurn(true); }
        }
    })

    socket.on("turnEnd_room", turnEnd_room => {
        if (turnEnd_room.turn[0] === "owner") {
            if (mynickname === ownerNickname) {
                setTurn(true);
            } else { setTurn(false); }
        } else if (turnEnd_room.turn[0] === "guest") {
            if (mynickname === ownerNickname) {
                setTurn(false);
            } else { setTurn(true); }
        }
        setTimer(30);
    });

    socket.on("turnResult", turnResult => {
        setGiveturn(turnResult.turn);
        if (turnResult.turn[0] === "owner") {
            if (mynickname === ownerNickname) {
                setTurn(true);
            } else { setTurn(false) }
        } else if (turnResult.turn[0] === "guest") {
            if (mynickname === ownerNickname) {
                setTurn(false);
            } else { setTurn(true) }
        }

        if (turnResult.owner.coin > turnResult.guest.coin) {
            setLimitCoin(+turnResult.guest.coin / +turnResult.guest.cards?.length);
        } else {
            setLimitCoin(+turnResult.owner.coin / turnResult.owner.cards?.length);
        }

        if (turnResult.owner.cards?.length === 0 && turnResult.guest.cards?.length === 0) {
            socket.emit("gameEnd", {
                owner: {
                    userId: ownerUserId,
                    nickname: ownerNickname,
                    socketId: ownersoketId,
                    cards: ownerCards,
                    battingCards: ownerBattingCards,
                    coin: ownerCoin,
                    result: ownerResult,
                    win: ownerWin,
                },
                guest: {
                    userId: guestUserId,
                    nickname: guestNickname,
                    socketId: guestsoketId,
                    cards: guestCards,
                    battingCards: guestBattingCards,
                    coin: guestCoin,
                    result: guestResult,
                    win: guestWin,
                },
            });
        }
    });

    socket.on("gameEnd", gameEnd => {
        if (gameEnd.winner === mynickname) {
            setWinGame(true);
        } else if (gameEnd.loser === mynickname) {
            setLoseGame(true);
        }

        if (gameWinner === '') {
            setDrawGame(true);
        }
    });


    return (
        <>
            <Header />
            {gamestart === false ?
                //대기방
                <div style={{ width: "1440px", height: "1024px", backgroundImage: 'url(' + RoomBackground + ')', backgroundPosition: "center", backgroundSize: "auto", fontSize: "18px", margin: "0px auto" }}>
                    <div style={{ width: "1040px", height: "755px", margin: "0px auto", display: "flex", flexDirection: "column" }}>
                        <RoomBody style={{ paddingTop: "150px" }}>
                            {mynickname === ownerNickname ?
                                //호스트 구역
                                <div>
                                    <div style={{ fontSize: "24px", width: "975px", margin: "auto auto 80px auto" }}>{ownerNickname}님의 게임방
                                        {unableBTN === false ?
                                            <Able style={{ float: "right" }}>
                                                <button style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold", color: "red" }} onClick={() => { socket.emit("kick", { socketId: guestsoketId }); }}>추방하기</button>
                                                <button onClick={() => {
                                                    if (ready !== true) {
                                                        Swal.fire({ title: '상대가 아직 준비되지 않았습니다.', timer: 1500 })
                                                    } else {
                                                        socket.emit("gameStart", {
                                                            gameStart: true,
                                                            userId: ownerUserId
                                                        });
                                                        setUnableBTN(true);
                                                    }
                                                }} style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold" }}>게임시작</button>
                                                <button style={{ fontSize: "18px", fontWeight: "bold" }} onClick={() => { socket.emit("forceDisconnect"); navigate("/"); }}>나가기</button>
                                            </Able> :
                                            <Unable style={{ float: "right" }}>
                                                <button style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold" }}>추방하기</button>
                                                <button style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold" }}>게임시작</button>
                                                <button style={{ fontSize: "18px", fontWeight: "bold" }}>나가기</button>
                                            </Unable>
                                        }
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
                                        {unableBTN === false ?
                                            <Able style={{ float: "right" }}>
                                                <button onClick={() => { if (unableBTN === false) { socket.emit("ready", { ready: !ready }); } else { Swal.fire({ title: "이미 게임이 시작되었습니다!", timer: 1500 }); } }} style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold" }}>준비하기</button>
                                                <button style={{ fontSize: "18px", fontWeight: "bold" }} onClick={() => { socket.emit("forceDisconnect"); navigate("/"); }}>나가기</button>
                                            </Able> :
                                            <Unable style={{ float: "right" }}>
                                                <button style={{ marginRight: "30px", fontSize: "18px", fontWeight: "bold" }}>준비하기</button>
                                                <button style={{ fontSize: "18px", fontWeight: "bold" }}>나가기</button>
                                            </Unable>}
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
                                {list.map((item) =>
                                    item.nickname !== mynickname ?
                                        <Chat key={uuidv4()} onClick={() => { setReport(true); setReportId(item.nickname === ownerNickname ? guestUserId : ownerUserId); setReportChat(item.text); }}>
                                            {item.nickname + " " + item.text}
                                        </Chat> :
                                        <p key={uuidv4()}>
                                            {item.nickname + " " + item.text}
                                        </p>
                                )}
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
                                    <div style={{ backgroundImage: 'url(' + Crown + ')', backgroundPosition: "center", backgroundSize: "cover", width: "25px", marginRight: "3px", marginBottom: "6px" }}></div>
                                    <div style={{ overflow: "hidden", marginTop: '3px' }}>{ownerNickname}님</div>
                                    <div style={{ backgroundImage: 'url(' + Coin + ')', width: "30px", height: "30px", display: "flex", backgroundSize: "cover" }}></div>
                                    <div style={{ marginTop: '3px' }}>
                                        x{ownerCoin}
                                    </div>
                                </div>
                                <div style={{ display: "flex", margin: "auto" }}>
                                    <div style={{ overflow: "hidden", marginTop: '3px' }}>{guestNickname}님</div>
                                    <div style={{ backgroundImage: 'url(' + Coin + ')', width: "30px", height: "30px", display: "flex", backgroundSize: "cover" }}></div>
                                    <div style={{ marginTop: '3px' }}>
                                        x{guestCoin}
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        if (round < 3) {
                                            Swal.fire({ title: "항복은 3라운드 이후에 가능합니다!", timer: 1500 });
                                        } else {
                                            socket.emit("gameEnd", {
                                                name: ownerUserId,
                                                owner: {
                                                    userId: ownerUserId,
                                                    nickname: ownerNickname,
                                                    socketId: ownersoketId,
                                                    cards: ownerCards,
                                                    battingCards: ownerBattingCards,
                                                    coin: +ownerCoin,
                                                    result: ownerResult,
                                                    win: ownerWin,
                                                },
                                                guest: {
                                                    userId: guestUserId,
                                                    nickname: guestNickname,
                                                    socketId: guestsoketId,
                                                    cards: guestCards,
                                                    battingCards: guestBattingCards,
                                                    coin: +guestCoin,
                                                    result: guestResult,
                                                    win: guestWin,
                                                },
                                            });
                                        }
                                    }}>항복하기</button>
                                    <button style={{ marginLeft: "55px" }} onClick={() => {
                                        socket.emit("gameEnd", {
                                            name: ownerUserId,
                                            owner: {
                                                userId: ownerUserId,
                                                nickname: ownerNickname,
                                                socketId: ownersoketId,
                                                cards: ownerCards,
                                                battingCards: ownerBattingCards,
                                                coin: +ownerCoin,
                                                result: ownerResult,
                                                win: ownerWin,
                                            },
                                            guest: {
                                                userId: guestUserId,
                                                nickname: guestNickname,
                                                socketId: guestsoketId,
                                                cards: guestCards,
                                                battingCards: guestBattingCards,
                                                coin: +guestCoin,
                                                result: guestResult,
                                                win: guestWin,
                                            },
                                        });
                                        socket.emit("forceDisconnect");
                                        navigate("/");
                                    }}>나가기</button>
                                </div>
                            </GameTop>
                            {/* guest */}
                            <div style={{ height: "125px", width: "1040px", margin: "25px auto auto 2px", display: "flex" }}>
                                {guestCards?.map((guestcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", margin: "auto", backgroundImage: guestcard % 2 === 0 ? 'url(' + BackWhite + ')' : 'url(' + BackBlack + ')' }}>
                                    </Card>
                                )}
                            </div>
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 20px auto", display: "flex" }}>
                                {guestBattingCards?.map((guestbattingcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", margin: "auto 0px", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + BackWhite + ')' : 'url(' + BackBlack + ')' }}>
                                    </Card>
                                )}
                            </div>
                            {/* 중간구역 */}
                            {middleView === true && gameEnd === false ?
                                <MidBase>
                                    <div style={{ display: 'flex', margin: "auto 20px" }}>
                                        {winnerList.map((item) => (
                                            <div key={uuidv4()} style={{ marginRight: "50px" }} >{item === guestNickname ? <MidWinCircle></MidWinCircle> : <MidLoseCircle></MidLoseCircle>}</div>
                                        ))}
                                    </div>
                                    <div style={{ color: "#3A3A3A", fontSize: "36px", display: "flex", margin: "auto" }}>{round - 1} 라운드</div>
                                    <div style={{ display: 'flex', margin: "auto 20px" }}>
                                        {winnerList.map((item) => (
                                            <div key={uuidv4()} style={{ marginRight: "50px" }} >{item === ownerNickname ? <MidWinCircle></MidWinCircle> : <MidLoseCircle></MidLoseCircle>}</div>
                                        ))}
                                    </div>
                                </MidBase>
                                : ''}
                            {middleView === false && turn === true && cardPick === false && TurnWinner === '' && gameEnd === false ?
                                <BattingMid onSubmit={(e) => { e.preventDefault(); 0 !== +batting && +batting <= limitCoin ? setCardPick(true) : Swal.fire({ title: `배팅은 1개 부터 ${Math.floor(limitCoin)}개 까지 가능합니다!`, timer: 1500 }); }}>
                                    <div style={{ fontSize: "36px", display: "flex", margin: "auto" }}>배팅을 시작해주세요.</div>
                                    <div style={{ fontSize: "18px", color: "red", display: "flex", margin: "auto" }}>{timer > 0 ? <span>남은 턴 시간 {timer}초</span> : <span>시간 종료</span>}</div>
                                    {/* <div style={{ background: "#FFD700", width: "48px", height: "48px", borderRadius: "100%", display: "flex", margin: "auto" }}></div> */}
                                    <div style={{ display: "flex", margin: "auto", fontSize: "18px" }}>배팅은 최대 {Math.floor(limitCoin)}개 까지 가능합니다.</div>
                                    <div style={{ display: "flex", margin: "auto", fontSize: "25px" }}><input value={batting} type={"number"} onChange={e => setBatting(e.target.value)}></input><span style={{ marginTop: "10px" }}>개</span><button style={{ marginLeft: "10px", marginTop: "3px" }}>배팅하기</button></div>
                                </BattingMid> : ''}
                            {middleView === false && turn === true && cardPick === true && gameEnd === false ?
                                <CardPickMid>
                                    <div style={{ fontSize: "36px", display: "flex", margin: "auto auto 40px auto" }}>카드를 선택해주세요.</div>
                                    {/* <div style={{ background: "#FFD700", width: "48px", height: "48px", borderRadius: "100%", display: "flex", margin: "0px auto auto auto" }}></div> */}
                                    <div style={{ fontSize: "26px", display: "flex", margin: "auto" }}>선택한 카드 {card >= 10 ? <span style={{ marginLeft: "10px", fontSize: "30px", color: "red" }}>없음</span> : <span style={{ marginLeft: "10px", fontSize: "30px", color: "red" }}> {card}</span>}</div>
                                    <div style={{ fontSize: "18px", color: "red", display: "flex", margin: "auto" }}>{batting !== 0 ? <span style={{ color: "black", marginRight: '20px' }}>라운드 배팅금액 {batting}개</span> : ''}{timer > 0 ? <span>남은 턴 시간 {timer - 1}초</span> : <span>시간종료</span>}</div>
                                    <button onClick={() => {
                                        if (card !== 10) {
                                            socket.emit("turnEnd", {
                                                userId: myUserId,
                                                batting: +batting,
                                                turn: Giveturn,
                                                card,
                                                player: {
                                                    userId: ownerUserId,
                                                    nickname: mynickname,
                                                    // socketId: mysocketId,
                                                    cards: mynickname === ownerNickname ? ownerCards : guestCards,
                                                    battingCards: mynickname === ownerNickname ? ownerBattingCards : guestBattingCards,
                                                    coin: mynickname === ownerNickname ? +ownerCoin : +guestCoin,
                                                    result: mynickname === ownerNickname ? ownerResult : guestResult,
                                                    win: mynickname === ownerNickname ? ownerWin : guestWin
                                                }

                                            });
                                            setBatting(0);
                                        } else {
                                            Swal.fire({ title: "카드를 선택해주세요!", timer: 1500 });
                                        }
                                    }}>선택 완료</button>
                                </CardPickMid> : winGame === true || loseGame === true || drawGame === true ? <MidBase></MidBase> : ''}
                            {turn === false && middleView === false && TurnWinner === '' && gameEnd === false ?
                                <TurnFalseMid>
                                    <div style={{ display: "flex", margin: "auto auto 50px auto", fontSize: "36px" }}>상대가 턴을 진행중입니다.</div>
                                    <div style={{ display: "flex", margin: "0px auto auto auto", fontSize: "30px", color: "red" }}><span style={{ color: "black", marginRight: "10px" }}>남은 턴 시간</span> {timer > 0 ? <span>{timer}초</span> : <span>시간종료</span>}</div>
                                </TurnFalseMid> : ''}
                            {TurnWinner !== '' && gameEnd === false ?
                                <TurnResultMid>
                                    <div style={{ width: "475px", height: "95px", display: "flex", flexDirection: "column", margin: "auto" }}>
                                        <div style={{ color: "#3A3A3A", fontSize: "36px", display: "flex", margin: "auto auto auto 0px" }}>{round - 1} 라운드</div>
                                        <div style={{ color: "black", fontSize: "36px", margin: "auto 0px auto auto" }}>{TurnWinner === undefined ? <span style={{ color: 'red' }}>무승부!</span> : <span>{TurnWinner}님 승리</span>}</div>
                                    </div>
                                    {TurnWinner === undefined ? '' : <div style={{ display: "flex", color: "black", fontSize: "36px", margin: "auto" }}>획득 코인<div style={{ backgroundImage: 'url(' + Coin + ')', width: "40px", height: "40px", backgroundSize: "cover", marginTop: "3px" }}></div>x<span>{getCoin}</span></div>}
                                </TurnResultMid> : ''}
                            {/* owner */}
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 10px auto", display: "flex" }}>
                                {ownerBattingCards?.map((ownerbattingcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: ownerbattingcard % 2 !== 0 ? "white" : "black", margin: "auto 0", backgroundImage: ownerbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                        {ownerbattingcard}
                                    </Card>
                                )}
                            </div>
                            <div style={{ height: "125px", width: "1040px", margin: "auto auto 0px auto", display: "flex" }}>
                                {ownerCards?.map((ownercard) =>
                                    <>
                                        {turn === true && cardPick === true ?
                                            card === ownercard ?
                                                <MyPickCard onClick={(e) => { setCard(ownercard); }} key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: ownercard % 2 !== 0 ? "white" : "black", margin: "auto", backgroundImage: ownercard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                                    {ownercard}
                                                </MyPickCard> :
                                                <PickCard onClick={(e) => { setCard(ownercard); }} key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: ownercard % 2 !== 0 ? "white" : "black", margin: "auto", backgroundImage: ownercard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                                    {ownercard}
                                                </PickCard> :
                                            <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: ownercard % 2 !== 0 ? "white" : "black", margin: "auto", backgroundImage: ownercard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                                {ownercard}
                                            </Card>}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    :
                    <div style={{ width: "100%", height: "100%", minWidth: "1440px", minHeight: "1024px" }}>
                        <div style={{ width: "1040px", height: "1024px", display: "flex", margin: "auto", flexDirection: "column" }}>
                            {/* //게스트뷰 */}
                            <GameTop style={{ display: "flex", fontSize: "18px", justifyContent: "space-between", marginTop: "15px" }}>
                                <div style={{ backgroundImage: 'url(' + Crown + ')', backgroundPosition: "center", backgroundSize: "cover", width: "25px", marginRight: "3px", marginBottom: "6px" }}></div>
                                <div style={{ display: "flex", margin: "auto auto auto 0px" }}>
                                    <div style={{ overflow: "hidden", marginTop: '3px' }}>{ownerNickname}님</div>
                                    <div style={{ backgroundImage: 'url(' + Coin + ')', width: "30px", height: "30px", display: "flex", backgroundSize: "cover" }}></div>
                                    <div style={{ marginTop: '3px' }}>
                                        x{ownerCoin}
                                    </div>
                                </div>
                                <div style={{ display: "flex", margin: "auto" }}>
                                    <div style={{ overflow: "hidden", marginTop: '3px' }}>{guestNickname}님</div>
                                    <div style={{ backgroundImage: 'url(' + Coin + ')', width: "30px", height: "30px", display: "flex", backgroundSize: "cover" }}></div>
                                    <div style={{ marginTop: '3px' }}>
                                        x{guestCoin}
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => {
                                        if (round < 3) {
                                            Swal.fire({ title: "항복은 3라운드 이후에 가능합니다!", timer: 1500 });
                                        } else {
                                            socket.emit("gameEnd", {
                                                name: guestUserId,
                                                owner: {
                                                    userId: ownerUserId,
                                                    nickname: ownerNickname,
                                                    socketId: ownersoketId,
                                                    cards: ownerCards,
                                                    battingCards: ownerBattingCards,
                                                    coin: +ownerCoin,
                                                    result: ownerResult,
                                                    win: ownerWin,
                                                },
                                                guest: {
                                                    userId: guestUserId,
                                                    nickname: guestNickname,
                                                    socketId: guestsoketId,
                                                    cards: guestCards,
                                                    battingCards: guestBattingCards,
                                                    coin: +guestCoin,
                                                    result: guestResult,
                                                    win: guestWin,
                                                },
                                            });
                                        }
                                    }}>항복하기</button>
                                    <button style={{ marginLeft: "55px" }} onClick={() => {
                                        socket.emit("gameEnd", {
                                            name: guestUserId,
                                            owner: {
                                                userId: ownerUserId,
                                                nickname: ownerNickname,
                                                socketId: ownersoketId,
                                                cards: ownerCards,
                                                battingCards: ownerBattingCards,
                                                coin: +ownerCoin,
                                                result: ownerResult,
                                                win: ownerWin,
                                            },
                                            guest: {
                                                userId: guestUserId,
                                                nickname: guestNickname,
                                                socketId: guestsoketId,
                                                cards: guestCards,
                                                battingCards: guestBattingCards,
                                                coin: +guestCoin,
                                                result: guestResult,
                                                win: guestWin,
                                            },
                                        });
                                        socket.emit("forceDisconnect");
                                        navigate("/");
                                    }}>나가기</button>
                                </div>
                            </GameTop>
                            {/* owner */}
                            <div style={{ height: "125px", width: "1040px", margin: "25px auto auto 2px", display: "flex" }}>
                                {ownerCards?.map((guestcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", margin: "auto", backgroundImage: guestcard % 2 === 0 ? 'url(' + BackWhite + ')' : 'url(' + BackBlack + ')' }}>
                                    </Card>
                                )}
                            </div>
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 20px auto", display: "flex" }}>
                                {ownerBattingCards?.map((guestbattingcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", margin: "auto 0", marginLeft: "7px", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + BackWhite + ')' : 'url(' + BackBlack + ')' }}>
                                    </Card>
                                )}
                            </div>
                            {/* 중간구역 */}
                            {middleView === true && gameEnd === false ?
                                <MidBase>
                                    <div style={{ display: 'flex', margin: "auto 20px" }}>
                                        {winnerList.map((item) => (
                                            <div key={uuidv4()} style={{ marginRight: "50px" }} >{item === ownerNickname ? <MidWinCircle></MidWinCircle> : <MidLoseCircle></MidLoseCircle>}</div>
                                        ))}
                                    </div>
                                    <div style={{ color: "#3A3A3A", fontSize: "36px", display: "flex", margin: "auto" }}>{round - 1} 라운드</div>
                                    <div style={{ display: 'flex', margin: "auto 20px" }}>
                                        {winnerList.map((item) => (
                                            <div key={uuidv4()} style={{ marginRight: "50px" }} >{item === guestNickname ? <MidWinCircle></MidWinCircle> : <MidLoseCircle></MidLoseCircle>}</div>
                                        ))}
                                    </div>
                                </MidBase>
                                : ''}
                            {middleView === false && turn === true && cardPick === false && TurnWinner === '' && gameEnd === false ?
                                <BattingMid onSubmit={(e) => { e.preventDefault(); 0 !== +batting && +batting <= limitCoin ? setCardPick(true) : Swal.fire({ title: `배팅은 1개 부터 ${Math.floor(limitCoin)}개 까지 가능합니다!`, timer: 1500 }); }}>
                                    <div style={{ fontSize: "36px", display: "flex", margin: "auto" }}>배팅을 시작해주세요.</div>
                                    <div style={{ fontSize: "18px", color: "red", display: "flex", margin: "auto" }}>{timer > 0 ? <span>남은 턴 시간 {timer}초</span> : <span>시간종료</span>}</div>
                                    {/* <div style={{ background: "#FFD700", width: "48px", height: "48px", borderRadius: "100%", display: "flex", margin: "auto" }}></div> */}
                                    <div style={{ display: "flex", margin: "auto", fontSize: "18px" }}>배팅은 최대 {Math.floor(limitCoin)}개 까지 가능합니다.</div>
                                    <div style={{ display: "flex", margin: "auto", fontSize: "25px" }}><input value={batting} type={"number"} onChange={e => setBatting(e.target.value)}></input><span style={{ marginTop: "10px" }}>개</span><button style={{ marginLeft: "10px", marginTop: "3px" }}>배팅하기</button></div>
                                </BattingMid> : ''}
                            {middleView === false && turn === true && cardPick === true && gameEnd === false ?
                                <CardPickMid>
                                    <div style={{ fontSize: "36px", display: "flex", margin: "auto auto 40px auto" }}>카드를 선택해주세요.</div>
                                    {/* <div style={{ background: "#FFD700", width: "48px", height: "48px", borderRadius: "100%", display: "flex", margin: "0px auto auto auto" }}></div> */}
                                    <div style={{ fontSize: "26px", display: "flex", margin: "auto" }}>선택한 카드 {card >= 10 ? <span style={{ marginLeft: "10px", fontSize: "30px", color: "red" }}>없음</span> : <span style={{ marginLeft: "10px", fontSize: "30px", color: "red" }}> {card}</span>}</div>
                                    <div style={{ fontSize: "18px", color: "red", display: "flex", margin: "auto" }}>{batting !== 0 ? <span style={{ color: "black", marginRight: '20px' }}>라운드 배팅금액 {batting}개</span> : ''}{timer > 0 ? <span>남은 턴 시간 {timer - 1}초</span> : <span>시간종료</span>}</div>
                                    <button onClick={() => {
                                        if (card !== 10) {
                                            socket.emit("turnEnd", {
                                                userId: ownerUserId,
                                                batting: +batting,
                                                turn: Giveturn,
                                                card,
                                                player: {
                                                    userId: guestUserId,
                                                    nickname: mynickname,
                                                    // socketId: mysocketId,
                                                    cards: mynickname === ownerNickname ? ownerCards : guestCards,
                                                    battingCards: mynickname === ownerNickname ? ownerBattingCards : guestBattingCards,
                                                    coin: mynickname === ownerNickname ? +ownerCoin : +guestCoin,
                                                    result: mynickname === ownerNickname ? ownerResult : guestResult,
                                                    win: mynickname === ownerNickname ? ownerWin : guestWin
                                                }

                                            });
                                            setBatting(0);
                                        } else {
                                            Swal.fire({ title: "카드를 선택해주세요!", timer: 1500 });
                                        }
                                    }}>선택 완료</button>
                                </CardPickMid> : winGame === true || loseGame === true || drawGame === true ? <MidBase></MidBase> : ''}
                            {turn === false && middleView === false && TurnWinner === '' && gameEnd === false ?
                                <TurnFalseMid>
                                    <div style={{ display: "flex", margin: "auto auto 50px auto", fontSize: "36px" }}>상대가 턴을 진행중입니다.</div>
                                    <div style={{ display: "flex", margin: "0px auto auto auto", fontSize: "30px", color: "red" }}><span style={{ color: "black", marginRight: "10px" }}>남은 턴 시간</span> {timer > 0 ? <span>{timer}초</span> : <span>시간종료</span>}</div>
                                </TurnFalseMid> : ''}
                            {TurnWinner !== '' && gameEnd === false ?
                                <TurnResultMid>
                                    <div style={{ width: "475px", height: "95px", display: "flex", flexDirection: "column", margin: "auto" }}>
                                        <div style={{ color: "#3A3A3A", fontSize: "36px", display: "flex", margin: "auto auto auto 0px" }}>{round - 1} 라운드</div>
                                        <div style={{ color: "black", fontSize: "36px", margin: "auto 0px auto auto" }}>{TurnWinner === undefined ? <span style={{ color: "red" }}>무승부!</span> : <span>{TurnWinner}님 승리</span>}</div>
                                    </div>
                                    {TurnWinner === undefined ? '' : <div style={{ display: "flex", color: "black", fontSize: "36px", margin: "auto" }}>획득 코인<div style={{ backgroundImage: 'url(' + Coin + ')', width: "40px", height: "40px", backgroundSize: "cover", marginTop: "3px" }}></div>x<span>{getCoin}</span></div>}
                                </TurnResultMid> : ''}
                            {/* guest */}
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 10px auto", display: "flex" }}>
                                {guestBattingCards?.map((guestbattingcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: guestbattingcard % 2 !== 0 ? "white" : "black", margin: "auto 0", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                        {guestbattingcard}
                                    </Card>
                                )}
                            </div>
                            <div style={{ height: "125px", width: "1040px", margin: "auto auto 0px auto", display: "flex" }}>
                                {guestCards?.map((guestcard) =>
                                    <>
                                        {turn === true && cardPick === true ?
                                            card === guestcard ?
                                                <MyPickCard onClick={(e) => { setCard(guestcard); }} key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: guestcard % 2 !== 0 ? "white" : "black", margin: "auto", backgroundImage: guestcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                                    {guestcard}
                                                </MyPickCard> :
                                                <PickCard onClick={(e) => { setCard(guestcard); }} key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: guestcard % 2 !== 0 ? "white" : "black", margin: "auto", backgroundImage: guestcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                                    {guestcard}
                                                </PickCard> :
                                            <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: guestcard % 2 !== 0 ? "white" : "black", margin: "auto", backgroundImage: guestcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                                {guestcard}
                                            </Card>}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>}

            {/* win모달 */}
            {winGame === true && gameEnd === true && gameWinner !== '' ?
                <WinModal>
                    <div style={{ display: "flex" }}><div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "120px", height: "120px", display: "flex", backgroundSize: "cover", margin: "20px", backgroundPosition: "center" }}><span style={{ display: "flex", margin: "auto" }}>W</span></div><div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "120px", height: "120px", display: "flex", backgroundSize: "cover", margin: "20px" }}><span style={{ display: "flex", margin: "auto" }}>I</span></div><div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "120px", height: "120px", display: "flex", backgroundSize: "cover", margin: "20px" }}><span style={{ display: "flex", margin: "auto" }}>N</span></div></div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "430px", marginTop: "105px" }}><button onClick={() => { window.location.reload(`/room/${params.roomId}`); }}>대기방으로</button><button onClick={(e) => { setresultModal(true); }}>게임 결과</button></div>
                </WinModal> : ''
            }
            {/* lose모달 */}
            {loseGame === true && gameEnd === true && gameWinner !== '' ?
                <LoseModal>
                    <div style={{ display: "flex" }}><div style={{ backgroundImage: 'url(' + FrontBlack + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", backgroundPosition: "center" }}><span style={{ display: "flex", margin: "auto" }}>L</span></div><div style={{ backgroundImage: 'url(' + FrontWhite + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", color: "black" }}><span style={{ display: "flex", margin: "auto" }}>O</span></div><div style={{ backgroundImage: 'url(' + FrontBlack + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px" }}><span style={{ display: "flex", margin: "auto" }}>S</span></div><div style={{ backgroundImage: 'url(' + FrontWhite + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", color: "black" }}><span style={{ display: "flex", margin: "auto" }}>E</span></div></div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "430px", marginTop: "105px" }}><button onClick={() => { window.location.reload(`/room/${params.roomId}`); }}>대기방으로</button><button onClick={(e) => { setresultModal(true); }}>게임 결과</button></div>
                </LoseModal> : ''
            }
            {/* draw모달 */}
            {drawGame === true && gameEnd === true && gameWinner === '' ?
                <DrawModal>
                    <div style={{ display: "flex" }}><div style={{ backgroundImage: 'url(' + FrontBlack + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", backgroundPosition: "center" }}><span style={{ display: "flex", margin: "auto" }}>D</span></div><div style={{ backgroundImage: 'url(' + FrontWhite + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", color: "black" }}><span style={{ display: "flex", margin: "auto" }}>R</span></div><div style={{ backgroundImage: 'url(' + FrontBlack + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px" }}><span style={{ display: "flex", margin: "auto" }}>A</span></div><div style={{ backgroundImage: 'url(' + FrontWhite + ')', width: "95px", height: "140px", display: "flex", backgroundSize: "cover", margin: "15px", color: "black" }}><span style={{ display: "flex", margin: "auto" }}>W</span></div></div>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "430px", marginTop: "105px" }}><button onClick={() => { window.location.reload(`/room/${params.roomId}`); }}>대기방으로</button><button onClick={() => { setresultModal(true); }}>게임 결과</button></div>
                </DrawModal> : ''
            }
            {/* 게임 결과 모달 */}
            {resultModal === true ?
                <ResultModal>
                    <div style={{ fontSize: "36px", marginTop: "20px", marginBottom: "45px" }}>게임 결과 확인하기</div>
                    <GameTop style={{ width: "1040px", display: "flex", fontSize: "24px", justifyContent: "space-between", marginTop: "15px", marginBottom: "45px" }}>
                        <div style={{ backgroundImage: 'url(' + Crown + ')', backgroundPosition: "center", backgroundSize: "cover", width: "25px", height: "20px", display: "flex", margin: "auto auto auto 0px" }}></div>
                        <div style={{ display: "flex", width: "520px" }}>
                            <div style={{ overflow: "hidden", margin: "auto", maxWidth: "420px" }}>{ownerNickname}님</div>
                            <div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "60px", height: "60px", display: "flex", backgroundSize: "cover" }}></div>
                            <div style={{ margin: "auto auto auto 0px" }}>
                                x{ownerCoin}
                            </div>
                        </div>
                        <div style={{ display: "flex", width: "520px" }}>
                            <div style={{ overflow: "hidden", margin: "auto", maxWidth: "420px" }}>{guestNickname}님</div>
                            <div style={{ backgroundImage: 'url(' + BigCoin + ')', width: "60px", height: "60px", display: "flex", backgroundSize: "cover" }}></div>
                            <div style={{ margin: "auto auto auto 0px" }}>
                                x{guestCoin}
                            </div>
                        </div>
                    </GameTop>
                    {mynickname === ownerNickname ?
                        // 방장구역
                        <>
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 20px auto", display: "flex" }}>
                                {guestBattingCards?.map((guestbattingcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: guestbattingcard % 2 !== 0 ? "white" : "black", margin: "auto 0", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                        {guestbattingcard}
                                    </Card>
                                )}
                            </div>
                            <MidBase>
                                <div style={{ display: 'flex', margin: "auto 20px" }}>
                                    {winnerList.map((item) => (
                                        <div key={uuidv4()} style={{ marginRight: "50px" }} >{item === guestNickname ? <MidWinCircle></MidWinCircle> : <MidLoseCircle></MidLoseCircle>}</div>
                                    ))}
                                </div>
                                <div style={{ color: "#3A3A3A", fontSize: "36px", display: "flex", margin: "auto" }}>총 {round - 1} 라운드</div>
                                <div style={{ display: 'flex', margin: "auto 20px" }}>
                                    {winnerList.map((item) => (
                                        <div key={uuidv4()} style={{ marginRight: "50px" }} >{item === ownerNickname ? <MidWinCircle></MidWinCircle> : <MidLoseCircle></MidLoseCircle>}</div>
                                    ))}
                                </div>
                            </MidBase>
                            <div style={{ height: "125px", width: "1040px", margin: "0px auto 105px auto", display: "flex" }}>
                                {ownerBattingCards?.map((ownerbattingcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: ownerbattingcard % 2 !== 0 ? "white" : "black", margin: "auto 0", backgroundImage: ownerbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                        {ownerbattingcard}
                                    </Card>
                                )}
                            </div>
                        </> : <>
                            {/* //게스트구역 */}
                            <div style={{ height: "125px", width: "1040px", margin: "10px auto 20px auto", display: "flex" }}>
                                {ownerBattingCards?.map((ownerbattingcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: ownerbattingcard % 2 !== 0 ? "white" : "black", margin: "auto 0", backgroundImage: ownerbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                        {ownerbattingcard}
                                    </Card>
                                )}
                            </div>
                            <MidBase>
                                <div style={{ display: 'flex', margin: "auto 20px" }}>
                                    {winnerList.map((item) => (
                                        <div key={uuidv4()} style={{ marginRight: "50px" }} >{item === ownerNickname ? <MidWinCircle></MidWinCircle> : <MidLoseCircle></MidLoseCircle>}</div>
                                    ))}
                                </div>
                                <div style={{ color: "#3A3A3A", fontSize: "36px", display: "flex", margin: "auto" }}>총 {round - 1} 라운드</div>
                                <div style={{ display: 'flex', margin: "auto 20px" }}>
                                    {winnerList.map((item) => (
                                        <div key={uuidv4()} style={{ marginRight: "50px" }} >{item === guestNickname ? <MidWinCircle></MidWinCircle> : <MidLoseCircle></MidLoseCircle>}</div>
                                    ))}
                                </div>
                            </MidBase>
                            <div style={{ height: "125px", width: "1040px", margin: "0px auto 105px auto", display: "flex" }}>
                                {guestBattingCards?.map((guestbattingcard) =>
                                    <Card key={uuidv4()} style={{ height: "140px", width: "95px", display: "flex", color: guestbattingcard % 2 !== 0 ? "white" : "black", margin: "auto 0", backgroundImage: guestbattingcard % 2 === 0 ? 'url(' + FrontWhite + ')' : 'url(' + FrontBlack + ')', fontSize: "60px", alignItems: "center", justifyContent: "center" }}>
                                        {guestbattingcard}
                                    </Card>
                                )}
                            </div>
                        </>}
                    <button onClick={() => { window.location.reload(`/room/${params.roomId}`); }} style={{ width: "210px", height: "45px", background: "#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", borderRadius: "8px", border: "0", marginBottom: "30px" }}>대기실로 이동하기</button>
                </ResultModal> : ''}
            {/* //신고하기 모달 */}
            {report === true ?
                <ReportModal onClick={() => setReport(!report)}>
                    <button onClick={() => {
                        socket.emit("chatReport", {
                            userid: reportId,
                            chat: reportChat
                        });
                    }}>신고하기</button>
                </ReportModal> : ''}
        </>
    );
};

export default Room;

let RoomBody = styled.div`
    display:flex;
    padding: 10px;
    width: 1140px;
    height:689px;
    margin: auto;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
`

let Able = styled.span`
    float:right;
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

let Unable = styled.span`
    float:right;
    button {
        width: 140px;
        height: 45px;
        background-color: #BAB7B7;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        border: 0;
    }
`

let ChatBody = styled.div`
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

let ChatWrapCss = styled.div`
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

let Chat = styled.p`
    :hover {
        color:red;
        cursor: pointer;
            }
`

let Card = styled.div`
    background-size: cover;   
    background-position: center; 
`

let PickCard = styled.div`
    background-size: cover;   
    background-position: center; 
    &:hover {
    cursor: pointer;
    transform: translateY(-25px);
    }
`

let MyPickCard = styled.div`
    background-size: cover;   
    background-position: center; 
    background-color: gold;
    transform: translateY(-25px);
    border: 3px solid gold;
`

let UserList = styled.div`
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

let ChatForm = styled.div`
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

let BattingMid = styled.form`
    display:flex;
    flex-direction:column;
    width: 1040px;
    height: 300px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    input {
        text-align:center;
        font-size: 18px;
        padding: 0 10px;
        width: 162px;
        height: 45px;
        background: #F4F4F4;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
    }
    button {
        font-size:18px;
        width: 121px;
        height: 45px;
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
    button {
      margin: 0 auto auto auto;
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
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

let WinModal = styled.div`
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

let LoseModal = styled.div`
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

let DrawModal = styled.div`
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

let ResultModal = styled.div`
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

let ReportModal = styled.div`
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
