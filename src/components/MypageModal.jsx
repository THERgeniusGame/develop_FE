import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MypageModal = () => {
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.removeItem("token")
      //localStorage.setItem("token", null);
    Swal.fire({
      icon: "success",
      title: "로그아웃 되었습니다!",
    })
    navigate('/login')
  }

    return(
        <>
            <Modal>
                <div>
                    <div className="page">마이페이지</div>
                    <hr/>
                    <div className="logout"
                      onClick={logout}
                    >로그아웃</div>
                </div>
            </Modal>
        </>
    )
}
export default MypageModal;

const Modal = styled.div`
   position: absolute;
  //display: none;
  //z-index: 5;
  top: 70%;
  left: 77%;
  background: white;
  padding: 1rem;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
  width: 180px;
  height: 65px;

  .page {
    cursor: pointer;
  }

  .logout {
    cursor: pointer;
  }
`