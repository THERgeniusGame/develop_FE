import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MypageModal = ({ setModal }) => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    Swal.fire({
      icon: "success",
      title: "로그아웃 되었습니다!",
      timer: 3000
    } ,);
    navigate('/login')
  }

  return (
    <>
      <ModalBackGround onClick={() => setModal(false)}></ModalBackGround>
      <Modal>
        <div>
          <div className="page"
            onClick={() => { navigate('/mypage') }}
          >마이페이지(랭킹)</div>
          <hr />
          <div
            className="report"
            style={{ margin: "10px 0" }}
            onClick={()=>{
              // navigate("/report");
              Swal.fire({ title: '준비중인 기능입니다.', timer: 2000 });
              setModal(!Modal);
              }}>신고하기</div>
          <div className="logout"
            onClick={logout}
          >로그아웃</div>
        </div>
      </Modal>
    </>
  )
}
export default MypageModal;

const ModalBackGround = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 22;
`
const Modal = styled.div`
  position: absolute;
  //display: none;
  z-index: 25;
  top: 70%;
  left: 77%;
  background: white;
  padding: 1rem;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  width: 180px;
  height: 97px;

  .page {
    cursor: pointer;
  }

  .logout {
    cursor: pointer;
  }

  .report{
    cursor: pointer;
  }
`