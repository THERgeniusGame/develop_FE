import React from "react";
import styled from "styled-components";
import Main from "../assets/image/Main.png"

const Header = () => {
  
  return (
   <>
    <HeaderBox>
      <Logo>
      </Logo>
      <Profile>
        지니어스
      </Profile>
    </HeaderBox>
    <hr />
   </>
  );
};

export default Header;

const HeaderBox = styled.div`
  //height: 50px;
  display: flex;
  width: 1000px;
  margin: 0px auto;
`;

const Logo = styled.div`
  width: 114.69px;
  height: 23.25px;
  background-position: center;
  background-size: cover;
  background-image: url(${Main});
`
const Profile = styled.div`
  margin-left: auto;
`




