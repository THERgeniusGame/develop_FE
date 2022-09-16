import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Main from "../shared/image/Main.png";
import { useNavigate } from "react-router-dom";
import MypageModal from "./MypageModal";

const Header = () => {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false);

  // useEffect(()=>{
  //   const accessToken = localStorage.removeItem("token")
  //   console.log(accessToken)
  //   if (accessToken) {
  //       return navigate("/login")
  //   }
  // }, [])

  return (
   <>
    <HeaderBox>
      <div className="logo">
        <Logo
          onClick={() => {navigate("/")}} />
      </div>
      <div className="mypage">
        <Profile
          onClick={(e) => { 
            e.preventDefault()
            setModal(!modal) 
          }}
        >
          지니어스
        </Profile>
      </div>

      {modal == true ?
        <MypageModal />
        : null
      }
    </HeaderBox>

   </>
  );
};

export default Header;

const HeaderBox = styled.div`
  height: 56px;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px auto;
  position: relative;
  z-index: 4;
  //position: sticky;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  div {
    margin-top: 8px;
  }
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
  margin-left: auto;
  cursor: pointer;
`



