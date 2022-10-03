import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Main from "../shared/image/Main.png";
import { useNavigate } from "react-router-dom";
import MypageModal from "./MypageModal";

import { useDispatch, useSelector } from "react-redux";

import { __getMyRank } from "../redux/modules/myPageSlice";

import Swal from 'sweetalert2'
import { useSelector } from "react-redux";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mynickname = useSelector((state)=>state?.getMyPage?.myRank?.nickname)
  const [modal, setModal] = useState(false);

  const token = localStorage.getItem("token");
  
  const nickname = useSelector((state) => state.getMyPage)
  console.log(nickname)

  if (token === null || token === undefined) {
    Swal.fire({ title: '로그인이 필요합니다.', timer: 2000, confirmButtonColor: "black" });
    navigate("/login")
  }

  useEffect(() => {
    dispatch(__getMyRank());
  }, []);

  return (
    <>
      <HeaderBox>
        <div className="logo" style={{ marginTop: "11px" }}>
          <Logo
            onClick={() => { navigate("/") }} />
        </div>
        <div className="mypage" style={{display:"flex", flexDirection:"row"}}>
          <BGM controls loop autoplay>
            {/* <source src="https://drive.google.com/uc?export=download&id=1k1pPMFdFnJSjJ85UZLiby9MqMtK2Y66p" type="audio/mpeg" />
            <source src="https://drive.google.com/uc?export=download&id=18pgZegsCPQzSu9_rYjqiBrQu1kM05fJC" type="audio/mpeg" /> */}
            <source src="https://drive.google.com/uc?export=download&id=134TZJDaFvGfuZ_vCx_jpnOzK92XShrmw" type="audio/mpeg" />
            {/* <source src="https://drive.google.com/uc?export=download&id=1HjqP_Qjh_okTKwfEWXdVwcXfWNz8rEc6" type="audio/mpeg" />
            <source src="https://drive.google.com/uc?export=download&id=1F7cWcGtazXlX9Tl099hoJzE_Ro4X0X7M" type="audio/mpeg" /> */}
          </BGM>
          <Profile
            onClick={(e) => {
              e.preventDefault()
              setModal(!modal)
            }}
          >
            {mynickname} ▼
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

const BGM = styled.audio`
 height: 47px;
 margin: 0 10px;
`