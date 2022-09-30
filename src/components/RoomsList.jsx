import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LockImg from "../shared/image/MainIMG/LockImg.png";
import UnLockImg from "../shared/image/MainIMG/UnLockImg.png";

const RoomsList = ({room, setRoomId, setRoomPw, setPwModal}) => {

    const navigate = useNavigate();
    
    return (
        <>
        <RoomSelect key={room.roomId} 
            onClick={(e) => {
            setRoomId(room.roomId);
            if (room.currentUsers >= 2) {
            Swal.fire({ title: '인원이 꽉 찼습니다.', timer: 1500 })
            } else {
            if (room.roomLock === true) {
                setRoomPw(room.roomPw);
                setPwModal(true);
            } else {
                navigate(`room/${room.roomId}`)
            }
            }
            }}>
            <div style={{ width: "175px", display: "flex" }}>{room.roomId}</div>
            <div style={{ width: "360px", display: "flex", overflow: "hidden" }}>{room.roomTitle}</div>
            <div style={{ width: "245px", display: "flex", overflow: "hidden" }}>{room.nickname}</div>
            <div style={{ width: "190px", display: "flex" }}>{room.currentUsers}</div>
            <div style={{ display: "flex", width: "20px", height: "20px", backgroundRepeat: "no-repeat", backgroundImage: room.roomLock === true ? 'url(' + LockImg + ')' : 'url(' + UnLockImg + ')' }}></div>
        </RoomSelect>
        </>
    )
}
export default RoomsList;

const RoomSelect = styled.button`
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