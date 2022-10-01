import React, { useState } from "react";
import styled from "styled-components";
import Main from "../shared/image/Main.png";
import { useNavigate } from "react-router-dom";
import MypageModal from "./MypageModal";

import Swal from 'sweetalert2'

const Header = () => {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false);

  const token = localStorage.getItem("token");

  if (token === null || token === undefined) {
    Swal.fire({ title: '로그인이 필요합니다.', timer: 2000 });
    navigate("/login")
  }

  return (
    <>
      <HeaderBox>
        <div className="logo" style={{marginTop:"11px"}}>
          <Logo
            onClick={() => { navigate("/") }} />
        </div>
        <div className="mypage">
          <Profile
            onClick={(e) => {
              e.preventDefault()
              setModal(!modal)
            }}
          >
            지니어스 ▼
          </Profile>
        </div>

        {modal == true ?
          <MypageModal
            setModal={setModal}
          />
          : null
        }

      </HeaderBox>
    </>
  );
};

export default Header;

const Modal = styled.div`
  
`
const HeaderBox = styled.div`
  height: 56px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  z-index: 4;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .logo {
    margin-left: 250px;
  }
  .mypage {
    margin-right: 250px;
  }
`

const Logo = styled.div`
  width: 114.69px;
  height: 23.25px;
  background-position: center;
  background-size: cover;
  background-image: url(${Main});
  cursor: pointer;
`
const Profile = styled.div`
  margin: 3px auto auto auto;
  cursor: pointer;
  width: 100px;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  :hover {
  background-color: #BAB7B7;
  cursor: pointer;
 }
`
