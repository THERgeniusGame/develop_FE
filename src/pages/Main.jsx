import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "../components/Pagenation"
import { __GetMainRoom } from "../redux/modules/GetMainRoom"
import { __PostMainRoom } from "../redux/modules/PostMainRoom"
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loadingimg from "../shared/image/Loading.png";
import Mainimg from "../shared/image/Mainimg.png";

import Swal from 'sweetalert2'

import { FaSearch } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { BiLockAlt } from 'react-icons/bi';
import { BiLockOpenAlt } from 'react-icons/bi';

function Main() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.getmainroom.data.roomsInfo);
  const Loading = useSelector((state) => state.getmainroom.isLoading);
  const [resp, setResp] = useState([])
  const [lock, setLock] = useState("ALL");

  //페이지네이션
  const [total, setTotal] = useState(0);
  const [limit] = useState(6);
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

  const pwSubmit = (e) => {
    e.preventDefault();
    if (roompw === checkpw) {
      navigate(`/room/${roomId}`)
    } else {
      Swal.fire({ title: '비밀번호가 다릅니다.', timer: 1500 })
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
      Swal.fire({ title: '방 이름을 입력해주세요.', timer: 1500 })
    } else if (roomLock === true && roomPw === '') {
      Swal.fire({ title: '비밀번호를 입력해주세요.', timer: 1500 })
    }
    else {
      dispatch(__PostMainRoom({ roomTitle, roomCategory, roomLock, roomPw }));
    }
  }

  useEffect(() => {
    dispatch(__GetMainRoom());
    if (rooms?.length === undefined) {
      setTotal(0);
    } else {
      setTotal(rooms?.length);
    }
    setResp(rooms);
  }, [rooms?.length]);

  return (
    Loading === true ?
      <div style={{ "width": "1440px", "height": "1024px", backgroundImage: 'url(' + Mainimg + ')', backgroundPosition: "center", backgroundSize: "cover", fontSize: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "1034px", margin: "auto" }}>
          <ChoosLock style={{ marginTop: "150px" }}>
            {lock === "ALL" ? <button onClick={(e) => { setResp(rooms); setLock("ALL") }}>전체방</button> : <div style={{ display: "flex" }} onClick={(e) => { setResp(rooms); setLock("ALL") }}><span style={{ display: "flex", margin: "auto" }}>전체방</span></div>}
            {lock === "unLock" ? <button onClick={(e) => { setResp(rooms.filter((res) => (res.roomLock === false))); setLock("unLock") }}>공개방</button> : <div style={{ display: "flex" }} onClick={(e) => { setResp(rooms.filter((res) => (res.roomLock === false))); setLock("unLock") }}><span style={{ display: "flex", margin: "auto" }}>공개방</span></div>}
            {lock === "Lock" ? <button onClick={(e) => { setResp(rooms.filter((res) => (res.roomLock === true))); setLock("Lock") }}>비공개방</button> : <div style={{ display: "flex" }} onClick={(e) => { setResp(rooms.filter((res) => (res.roomLock === true))); setLock("Lock") }}><span style={{ display: "flex", margin: "auto" }}>비공개방</span></div>}
          </ChoosLock>
          <Roomsearch style={{ marginTop: "150px" }} onSubmit={(e) => {
            e.preventDefault();
            if (roomsearch === '') {
              Swal.fire({ title: '검색어를 입력해주세요.', timer: 1500 })
            } else {
              setResp(rooms.filter((res) => (res.roomTitle.includes(roomsearch) || res.nickname.includes(roomsearch))));
            }
          }
          }>
            <div><input placeholder="검색어를 입력하세요." onChange={(e) => { setRoomsearch(e.target.value) }} ></input><SearchBtn><FaSearch style={{ paddingRight: "20px", fontSize: "18", padding: "10px" }} /></SearchBtn>
            </div>
          </Roomsearch>
        </div>
        <MainBody>
          {currentCountings?.length === 0 ? <>입장가능한 방이 없습니다.</> : currentCountings?.map((room) => (
            <RoomSelect key={room.roomId}>
              <div>{room.nickname}님의 방</div>
              <div>{room.roomTitle}</div>
              {room.currentUsers !== 2 ?
                <div>{room.roomLock === true ?
                  <>
                    <button onClick={() => { setPwModal(true); setRoompw(room.roomPw); setRoomId(room.roomId); }}>입장하기</button>
                  </>
                  :
                  <>
                    <button onClick={() => { navigate(`room/${room.roomId}`) }}>입장하기</button>
                  </>
                }
                </div>
                :
                <>
                  <button>게임중</button>
                </>
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
        <MakeRoom onClick={() => { setMakeRoomModal(true) }}><div style={{ display: "flex" }}>방만들기<IoMdAdd style={{ marginLeft: "30px", fontSize: "22px" }} /></div></MakeRoom>

        {/* 룸 비밀번호 입력 모달 */}
        {
          pwModal === true ? (<>
            <PwModal onSubmit={(e) => pwSubmit(e)} type="button" onClick={() => {
              setPwModal(!pwModal)
            }}>
              <PwModalBody onClick={(event) => { event.stopPropagation() }} >
                <div>비밀번호를 입력해주세요</div>
                <input onChange={(e) => { setCheckpw(e.target.value) }} ></input>
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
                <p style={{ display: "flex", margin: "auto auto 56px auto" }}>게임방 만들기</p>
                <div style={{ display: "flex", margin: "0px auto 3px 112px" }}>게임방 이름<span style={{ marginLeft: "552px" }}>방 공개여부</span>{roomLock === false ? <BiLockOpenAlt style={{ marginLeft: "16px" }} onClick={(e) => { setRoomLock(!roomLock); setRoomPw(''); }} /> : <BiLockAlt style={{ marginLeft: "16px" }} onClick={(e) => { setRoomLock(!roomLock); setRoomPw(''); }} />}</div>
                <input style={{ display: "flex", margin: "0px auto 40px auto" }} onChange={(e) => { setRoomTitle(e.target.value) }}></input>
                <div>{roomLock === true ?
                  <>
                    <div style={{ display: "flex", margin: "auto auto 3px 112px" }}>비밀번호 입력창</div>
                    <input style={{ display: "flex", margin: "auto auto 50px auto" }} onChange={(e) => { setRoomPw(e.target.value) }}></input>
                  </> : ''}
                </div>
                <div style={{ "fontSize": "20px", "color": "gray", "display": "flex", margin: "0px auto auto auto" }}>
                  <span style={{ marginRight: "34px" }}>
                    <button>방 만들기</button>
                  </span>
                  <span>
                    <button type="button" onClick={() => { setMakeRoomModal(!makeroomModal); setRoomLock(false); }}>돌아가기</button>
                  </span>
                </div>
              </MakeRoomModalBody>
            </MakeRoomModal>
          </>) : ''
        }
      </div> :
      <div style={{ width: "1440px", height: "1024px", display: "flex", backgroundImage: 'url(' + Mainimg + ')', backgroundPosition: "center", backgroundSize: "cover" }}>
        <div style={{ width: "250px", height: "350px", backgroundImage: 'url(' + Loadingimg + ')', backgroundPosition: "center", backgroundSize: "cover", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }} />
      </div>
  );
}

export default Main;

let MainBody = styled.div`
 width: 1040px;
 height: 451px;
 margin: 20px auto auto auto;
 display: flex;

 flex-wrap: wrap;
 font-size:18px;
 
 button {
  font-size:18px;
 }
`

let RoomSelect = styled.div`
  box-sizing: border-box;
  width: 512px;
  height: 137px;
  left: 200px;
  top: 225px;
  background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
  border: 1px solid rgba(169, 169, 169, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  margin: auto;
 
 button {
  box-sizing: border-box;
  width: 162px;
  height: 45px;
  left: 376px;
  top: 348px;
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

let MakeRoom = styled.div`
  display:flex;
  margin: auto;
  box-sizing: border-box;
  width: 162px;
  height: 45px;
  left: 639px;
  top: 855px;
  background: #F4F4F4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
 :hover {
  background-color: #BAB7B7;
  cursor: pointer;
 }

 div {
  text-align: center;
  font-size: 18px;
  display: flex;
  margin: auto;
 }
`

let ChoosLock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  button {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    margin: 10px;
    width: 100px;
    height: 45px;
    left: calc(50% - 100px/2 - 230px);
    top: calc(50% - 45px/2 - 349.5px);
    background: black;
    color: white;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    :hover {
    cursor: pointer;
  }
  }
  div {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    margin: 10px;
    width: 100px;
    height: 45px;
    left: calc(50% - 100px/2 - 230px);
    top: calc(50% - 45px/2 - 349.5px);
    background: #FFFFFF;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    :hover {
    background-color: #000000;
    color: white;
    cursor: pointer;
  }
  }
`

let Roomsearch = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  
  div {
    display: flex;
    width: 445px;
    height: 45px;
    left: 792px;
    top: 140px;
    background: #F4F4F4;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
  
  input {
    width: 400px;
    padding: 20px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    background: none;
    border: none;
  }

  button {
    background: none;
    border: none;
    :hover {
    cursor: pointer;
  }
  }
`

const PwModal = styled.form`
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
  width: 864px;
  height: 233px;
  left: 293px;
  top: 355px;
  background: linear-gradient(259.36deg, #FBFBFB 2.14%, #F5F5F5 34.66%, #ECECEC 67.72%, #E3E3E3 103.54%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  display:flex;
  flex-direction: column;
  margin: auto;
    div {
      display:flex;
      margin: 50px auto auto auto;
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
    }
    input {
      display:flex;
      margin: auto auto 50px auto;
      width: 505px;
      height: 45px;
      left: 472px;
      top: 483px;
      background: #F4F4F4;
      border: 1px solid rgba(169, 169, 169, 0.25);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
    }
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
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    width: 998px;
    height: 449px;
    left: 220px;
    top: 287px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display:flex;
    flex-direction: column;
    margin: auto;
    input {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      width: 775px;
      height: 45px;
      left: 332px;
      top: 415px;
      background: #F4F4F4;
      border: 1px solid rgba(169, 169, 169, 0.25);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
    }

    button {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      width: 335px;
      height: 45px;
      left: 368px;
      top: 628px;
      background: #F4F4F4;
      border: 1px solid rgba(169, 169, 169, 0.25);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      :hover {
      background-color: #BAB7B7;
      cursor: pointer;
            }
    }

    p{ 
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
    }
`;

const SearchBtn = styled.button`
  border-radius: 10px;
   :hover {
  background-color: #BAB7B7;
  cursor: pointer;
 }
`