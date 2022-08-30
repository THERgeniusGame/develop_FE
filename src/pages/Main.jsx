import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagenation"
import { __GetMainRoom } from "../redux/modules/GetMainRoom"
import { __PostMainRoom } from "../redux/modules/PostMainRoom"
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";

// import io from "socket.io-client";

function Main() {
 
  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.getmainroom.data?.data);
  
  const [resp, setResp] = useState([])

  //페이지네이션
  const [total, setTotal] = useState(0);
  const [limit] = useState(8);
  const [page, setPage] = useState(1);
  const indexOfLastPost = page * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentCountings = resp?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // 방 입장 
  const [roomsearch, setRoomsearch] = useState('')
  const [roompw, setRoompw] = useState('')
  const [checkpw, setCheckpw] = useState('')
  const [roomId, setRoomId] = useState(0)

  // 모달 상태
  const [pwModal, setPwModal] = useState(false);
  const [makeroomModal, setMakeRoomModal] = useState(false);

  const onclickHandle = () => {
    if (roompw === checkpw) {
      alert("성공")
    } else {
      alert("비밀번호가 틀립니다.")
    }
  }

  //방 생성
  const [roomTitle, setRoomTitle] = useState('')
  const [roomLock, setRoomLock] = useState(false)
  const [roomPw, setRoomPw] = useState('')
  const [roomCategory, setRoomCategory] = useState(1)

  const onsubmitHandle = (e) => {
    e.preventDefault();
    if (roomTitle === '') {
      alert("방 이름을 입력해주세요")
    } else if (roomLock === true && roomPw === ''){
      alert("비밀번호를 입력해주세요")
    } 
    else {
      dispatch(__PostMainRoom({ roomTitle, roomCategory, roomLock, roomPw  }));
    }
  }

  // const socket = io.connect(`/api/room/${roomId}`);
  useEffect(() => {
    dispatch(__GetMainRoom());
    if(rooms?.length === undefined) {
      setTotal(0)
    } else {
      setTotal(rooms?.length)
    }
    setResp(rooms)
  }, [rooms?.length]);

  return (
    <>
      <Roomsearch onSubmit={(e) => {
        e.preventDefault();
        if (roomsearch === '') {
          alert("검색어를 입력해주세요.")
        } else {
          setResp(rooms.filter((res) => (res.roomTitle.includes(roomsearch) || res.nickname.includes(roomsearch))));
        }
      }
      }>
        <input placeholder="방이름 또는 유저 닉네임을 입력해주세요." onChange={(e) => { setRoomsearch(e.target.value) }} />
        <button>검색하기</button>
      </Roomsearch>
      <ChoosRock>
        <button onClick={() => { setResp(rooms) }}>전체방</button>
        <button onClick={() => { setResp(rooms.filter((res) => (res.roomLock === true))) }}>공개방</button>
        <button onClick={() => { setResp(rooms.filter((res) => (res.roomLock === false))) }}>비공개방</button>
      </ChoosRock>
      <MainBody>
        {currentCountings?.length === 0 ? <>입장가능한 방이 없습니다.</> : currentCountings?.map((room) => (
          <RoomSelect key={room.roomId}>
            <div>{room.roomTitle}</div>
            <div>{room.nickname}님의 방</div>
            {room.currentUsers !== 2 ?
              <div>{room.roomLock === true ?
                <>
                  <button onClick={() => { setPwModal(true); setRoompw(room.roomPw); }}>입장하기</button>
                </>
                :
                <>
                  <button>입장하기</button>
                </>
              }
              </div>
              :
              ''
            }
            <div>현재인원: {room.currentUsers}
              <span>/{room.roomLock === true ?
                <>비공개</>
                :
                <>공개</>
              }
              </span>
            </div>
          </RoomSelect>
        ))}
      </MainBody>
      <Pagination
        total={total}
        limit={limit}
        page={page}
        setPage={setPage}
      />
      <MakeRoom onClick={() => { setMakeRoomModal(true) }}><div>게임만들기</div></MakeRoom>

      {/* 룸 비밀번호 입력 모달 */}
      {
        pwModal === true ? (<>
          <PwModal onClick={() => {
            setPwModal(!pwModal)
          }}>
            <PwModalBody onClick={(event) => { event.stopPropagation() }}  >
              <input onChange={(e) => { setCheckpw(e.target.value) }} placeholder="비밀번호 확인" style={{ "textAlign": "center", "height": "30px", "width": "300px" }}></input>
              <button onClick={onclickHandle} style={{ "cursor": "pointer", "margin": "10px", "width": "100px" }}>입장하기</button>
            </PwModalBody>
          </PwModal>
        </>) : ''
      }

      {/* 룸 생성 모달 */}
      {
        makeroomModal === true ? (<>
          <MakeRoomModal onSubmit={onsubmitHandle} onClick={() => {
            setMakeRoomModal(!makeroomModal);
            setRoomLock(false);
          }}>
            <MakeRoomModalBody onClick={(event) => { event.stopPropagation() }}  >
              <div><span>방 이름 : </span><input onChange={(e) => { setRoomTitle(e.target.value) }} placeholder="방 이름을 입력해주세요" style={{ "textAlign": "center", "height": "30px", "width": "250px", "marginBottom": "5px" }}></input></div>
              <div>{roomLock === true ? <>비밀번호 : <input onChange={(e) => { setRoomPw(e.target.value) }} placeholder="비밀번호를 입력해주세요" style={{ "textAlign": "center", "height": "30px", "width": "250px", "marginRight": "11px" }}></input></> : ''}</div>
              <div style={{ "fontSize": "10px" }}>비밀번호 만들기<input onClick={(e) => { setRoomLock(!roomLock); setRoomPw(''); }} type="checkbox"></input>
                <span><button style={{ "cursor": "pointer", "margin": "10px", "width": "100px" }}>방 생성하기</button></span></div>
            </MakeRoomModalBody>
          </MakeRoomModal>
        </>) : ''
      }
    </>
  );
}

export default Main;

let MainBody = styled.div`
 background-color: red;
 width: 1200px;
 height: 330px;
 margin: auto;
 display: flex;
 
 flex-wrap: wrap;
 flex-direction: low;
 justify-content: center;
 align-items: center;
`

let RoomSelect = styled.div`
 background-color: yellow;
 width: 250px;
 height: 100px;
 margin: auto;
 border: solid 3px black;
 border-radius: 10px;
 padding: 5px;
 button {
  :hover {
  background-color: yellow;
  cursor: pointer;
 }
 }
`

let MakeRoom = styled.div`
 background-color: blue;
 width: 250px;
 height: 100px;
 margin: auto;
 border: solid 3px black;
 border-radius: 10px;
 padding: 5px;
 display: flex;
 :hover {
  background-color: yellow;
  cursor: pointer;
 }
 div {
  text-align: center;
  font-size: 25px;
  display: flex;
  margin: auto;
 }
`

let ChoosRock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  button {
    :hover {
    background-color: yellow;
    cursor: pointer;
  }
  }
`

let Roomsearch = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  input {
    width: 300px;
    text-align: center;
    margin: 5px;
    padding: 5px
  }

  button {
    :hover {
    background-color: yellow;
    cursor: pointer;
  }
  }
`

const PwModal = styled.div`
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


const PwModalBody = styled.div`
    background-color: white;
    border-radius: 10px;
    width: 400px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const MakeRoomModal = styled.div`
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


const MakeRoomModalBody = styled.form`
    background-color: white;
    border-radius: 10px;
    width: 400px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;