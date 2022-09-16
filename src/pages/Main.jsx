import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Pagination from "../components/Pagenation"
import { __GetMainRoom } from "../redux/modules/GetMainRoom"
import { __PostMainRoom } from "../redux/modules/PostMainRoom"
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

import Loadingimg from "../shared/image/Loading.png";
import MainBackground from "../shared/image/MainIMG/MainBackground.png";
import LockImg from "../shared/image/MainIMG/LockImg.png";
import UnLockImg from "../shared/image/MainIMG/UnLockImg.png";

import Swal from 'sweetalert2'

import { FaSearch } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';

function Main() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const rooms = useSelector((state) => state.getmainroom.data.roomsInfo);
  const Loading = useSelector((state) => state.getmainroom.isLoading);
  const [resp, setResp] = useState([]);
  const [lock, setLock] = useState("ALL");

  //페이지네이션
  const [total, setTotal] = useState(0);
  const [limit] = useState(9);
  const [page, setPage] = useState(1);
  const indexOfLastPost = page * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentCountings = resp?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // 방 입장 
  const [roomsearch, setRoomsearch] = useState('');
  const [roompw, setRoompw] = useState('');
  const [checkpw, setCheckpw] = useState('');
  const [roomId, setRoomId] = useState(0);

  // 모달 상태
  const [pwModal, setPwModal] = useState(false);
  const [makeroomModal, setMakeRoomModal] = useState(false);

  const pwSubmit = (e) => {
    e.preventDefault();
    if (roompw === checkpw) {
      navigate(`/room/${roomId}`)
    } else {
      setCheckpw("");
      Swal.fire({ title: '비밀번호가 다릅니다.', timer: 1500 });
    }
  }

  //방 생성
  const [roomTitle, setRoomTitle] = useState('')
  const [roomLock, setRoomLock] = useState(false)
  const [roomPw, setRoomPw] = useState('')
  const [roomCategory] = useState(1) // 추후 카테고리 추가 가능 const [roomCategory, setRoomCategory] = useState(1)

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
   <>
   <Header />
    {Loading === true ?
      <div style={{ width: "1440px", height: "1024px", backgroundImage: 'url(' + MainBackground + ')', backgroundPosition: "center", backgroundSize: "auto", fontSize: "18px", margin: "0px auto" }}>
        <div style={{ width: "1040px", height: "755px", margin: "0px auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "1040px", margin: "0px auto" }}>
            <ChoosLock style={{ marginTop: "140px" }}>
              {lock === "ALL" ?
                <button onClick={(e) => { setResp(rooms); setLock("ALL") }}>전체방</button> :
                <div style={{ display: "flex" }} onClick={(e) => { setResp(rooms); setLock("ALL") }}>
                  <span style={{ display: "flex", margin: "auto" }}>전체방</span>
                </div>
              }
              {lock === "unLock" ?
                <button onClick={(e) => { setResp(rooms.filter((res) => (res.roomLock === false))); setLock("unLock") }}>공개방</button> :
                <div style={{ display: "flex" }} onClick={(e) => { setResp(rooms.filter((res) => (res.roomLock === false))); setLock("unLock") }}>
                  <span style={{ display: "flex", margin: "auto" }}>공개방</span>
                </div>
              }
              {lock === "Lock" ?
                <button onClick={(e) => { setResp(rooms.filter((res) => (res.roomLock === true))); setLock("Lock") }}>비공개방</button> :
                <div style={{ display: "flex" }} onClick={(e) => { setResp(rooms.filter((res) => (res.roomLock === true))); setLock("Lock") }}>
                  <span style={{ display: "flex", margin: "auto" }}>비공개방</span>
                </div>
              }
            </ChoosLock>
            <Roomsearch style={{ marginTop: "140px" }} onSubmit={(e) => {
              e.preventDefault();
              if (roomsearch === '') {
                Swal.fire({ title: '검색어를 입력해주세요.', timer: 1500 })
              } else {
                setRoomsearch("");
                setResp(rooms.filter((res) => (res.roomTitle.includes(roomsearch) || res.nickname.includes(roomsearch))));
              }
            }
            }>
              <div>
                <input value={roomsearch} placeholder="검색어를 입력하세요." onChange={(e) => { setRoomsearch(e.target.value) }} ></input>
                <SearchBtn style={{ marginLeft: "3px" }}>
                  <FaSearch style={{ paddingRight: "20px", fontSize: "18", padding: "10px" }} />
                </SearchBtn>
              </div>
            </Roomsearch>
          </div>
          <RoomList style={{ display: "flex", flexDirection: "row", paddingTop: "15px", padding: "10px", marginBottom: "5px" }}>
            <span style={{ marginRight: "145px" }}>번호</span>
            <span style={{ marginRight: "325px" }}>방 이름</span>
            <span style={{ marginRight: "195px" }}>방장</span>
            <span style={{ marginRight: "160px" }}>인원</span>
            <span>공개</span>
          </RoomList>
          <MainBody>
            {currentCountings?.length === 0 ?
              <>입장가능한 방이 없습니다.</> :
              currentCountings?.map((room) => (
                <RoomSelect key={room.roomId} onClick={(e) => {
                  setRoomId(room.roomId);
                  if (room.roomLock === true) {
                    setRoompw(room.roomPw);
                    setPwModal(true);
                  } else {
                    navigate(`room/${roomId}`)
                  }
                }}>
                  <div style={{ width: "173px", display: "flex" }}>{room.roomId}</div>
                  <div style={{ width: "380px", display: "flex", overflow: "hidden" }}>{room.roomTitle}</div>
                  <div style={{ width: "245px", display: "flex", overflow: "hidden" }}>{room.nickname}</div>
                  <div style={{ width: "190px", display: "flex" }}>{room.currentUsers}</div>
                  <div style={{ display: "flex", width: "20px", height: "20px", backgroundRepeat: "no-repeat", backgroundImage: room.lock === true ? 'url(' + LockImg + ')' : 'url(' + UnLockImg + ')' }}></div>
                </RoomSelect>
              ))}
          </MainBody>
          <Pagination
            total={total}
            limit={limit}
            page={page}
            setPage={setPage}
          />
          <MakeRoom onClick={() => { setMakeRoomModal(true) }}>
            <div style={{ display: "flex" }}>방만들기
              <IoMdAdd style={{ marginLeft: "30px", fontSize: "22px" }} />
            </div>
          </MakeRoom>

          {/* 룸 비밀번호 입력 모달 */}
          {
            pwModal === true ? (
              <>
                <PwModal onSubmit={(e) => pwSubmit(e)} type="button" onClick={() => {
                  setPwModal(!pwModal)
                }}>
                  <PwModalBody onClick={(event) => { event.stopPropagation() }} >
                    <div>비밀번호를 입력해주세요</div>
                    <input onChange={(e) => { setCheckpw(e.target.value) }} ></input>
                  </PwModalBody>
                </PwModal>
              </>
            ) : ''
          }

          {/* 룸 생성 모달 */}
          {
            makeroomModal === true ? (
              <>
                <MakeRoomModal onSubmit={onsubmitHandle} onClick={() => {
                  setMakeRoomModal(!makeroomModal);
                  setRoomLock(false);
                }}>
                  <MakeRoomModalBody onClick={(event) => { event.stopPropagation() }}  >
                    <p style={{ display: "flex", margin: "auto auto 56px auto" }}>게임방 만들기</p>
                    <div style={{ display: "flex", margin: "0px auto 3px 112px" }}>게임방 이름
                      <span style={{ marginLeft: "552px" }}>방 공개여부</span>
                      {roomLock === false ?
                        <LockBtn style={{ marginLeft: "16px" }} onClick={(e) => { setRoomLock(!roomLock); setRoomPw(''); }}></LockBtn> :
                        <UnLockBtn style={{ marginLeft: "16px" }} onClick={(e) => { setRoomLock(!roomLock); setRoomPw(''); }}></UnLockBtn>}
                    </div>
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
        </div>
      </div> :
      <div style={{ paddingLeft: "270px", paddingRight: "270px" }}>
        <div style={{ width: "1440px", height: "1024px", display: "flex", backgroundImage: 'url(' + MainBackground + ')', backgroundPosition: "center", backgroundSize: "cover" }}>
          <div style={{ width: "250px", height: "350px", backgroundImage: 'url(' + Loadingimg + ')', backgroundPosition: "center", backgroundSize: "cover", margin: "auto", display: "flex", justifyContent: "center", alignItems: "center" }} />
        </div>
      </div>}
      </>
  );
  
}

export default Main;

let MainBody = styled.div`
 width: 1040px;
 height: 450px;
 display: flex;
 flex-direction: column;
 font-size:18px;
 margin-bottom: 40px;
 button {
  font-size:18px;
 }
`

let RoomSelect = styled.button`
  display: flex;
  flex-direction: row;
  width: 1040px;
  height: 45px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin: 5px 0;
  padding-left:15px;
  padding-top: 12px;
  border: 0;
  :hover {
  background-color: #BAB7B7;
  cursor: pointer;
 }
`

let MakeRoom = styled.div`
  display:flex;
  margin: 50px auto auto auto;
  box-sizing: border-box;
  width: 162px;
  height: 45px;
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
  margin-bottom: 40px;
  button {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    margin-right: 20px;
    background: black;
    color: white;
    width: 100px;
    height: 45px;
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
      margin-right: 20px;
      width: 100px;
      height: 45px;
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
  margin-bottom: 40px;
  div {
    display: flex;
    width: 445px;
    height: 45px;
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
      font-size: 18px;
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

let MakeRoomModal = styled.div`
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


let MakeRoomModalBody = styled.form`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    width: 998px;
    height: 449px;
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

let SearchBtn = styled.button`
  border-radius: 10px;
   :hover {
    background-color: #BAB7B7;
    cursor: pointer;
 }
`

let LockBtn = styled.div`
  background-image: url(${UnLockImg});
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
  :hover {
    background-image: url(${LockImg});
    background-repeat: no-repeat;
  }
`

let UnLockBtn = styled.div`
  background-image: url(${LockImg});
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
  :hover {
    background-image: url(${UnLockImg});
    background-repeat: no-repeat;
  }
`

let RoomList = styled.div`
  width: 1020px;
  height: 25px;
  background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px 8px 0px 0px;
`