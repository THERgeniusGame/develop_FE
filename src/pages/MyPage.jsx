import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import ProfileBackGround from "../shared/image/profilebackground.jpg"

import { __getMyPage, __getMyRank } from "../redux/modules/myPageSlice";

const MyPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allRank = useSelector((state) => state.getMyPage.allRank)
    const myRank = useSelector((state) => state.getMyPage.myRank)

    const mynickname = myRank?.nickname;

    //페이지네이션 - 랭킹페이지
    const [page, setPage] = useState(1); //현재 페이지

    const handlePageChange = (page) => {
        setPage(page);
    };

    const rankEndRef = useRef(null);
    const scrollToBottom = () => {
      rankEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
      dispatch(__getMyPage());
      scrollToBottom();
    }, [])

    useEffect(() => {
      dispatch(__getMyRank());
      scrollToBottom();
    }, [])
    
    return(
        <>
        <ProfileImg>
          <MypageContainer>
            <div className="header">
                <div className="name_btn">
                    <UserName>
                        {myRank?.nickname} 님
                    </UserName>
                    <GoBack
                      onClick={()=>navigate('/')}
                    >
                        돌아가기
                    </GoBack>
                </div>
                <Score>
                  <div className="myscore">
                    나의 전적
                  </div>
                  <div className="myscorenum">
                    {myRank?.total}전 {myRank?.win}승 {myRank?.lose}패
                  </div>
                </Score>
                <MyRanking>
                  <div className="myscore">
                    나의 랭킹
                  </div>
                  <div className="myscorenum">
                    {myRank?.rank}위
                  </div>
                </MyRanking>
            </div>
            <div className="body">
                <Rank>
                  <div className="ranktxt">
                     🏆 랭킹 🏆
                  </div>
                  <Body>
                    <div className="rankmap">
                    <Bar>
                      <div className="rankPt1">순위</div>
                      <div className="nicknamePt1">닉네임</div>
                      <div className="winPt1">전적</div>
                    </Bar>
                      {allRank?.map((rank) => (
                      <RankList style={{border:mynickname === rank.nickname ? "3px solid #e6468b" : ''}} key={rank.rank}>
                        <div className="rankPt2">{rank?.rank}</div>

                        <div className="nicknamePt2">{rank.nickname}님</div>
                        {mynickname === rank.nickname ? <div style={{marginBottom:"360px"}} ref={rankEndRef} /> : null}
                        <div className="winPt2">{rank.total}전 {rank.win}승 {rank.lose}패</div>
                      </RankList>
                      ))}
                    </div>
                  </Body>
                </Rank>
            </div>
          </MypageContainer>
        </ProfileImg>
        </>
    )
};
export default MyPage; 

const ProfileImg = styled.div`
    background-image: url(${ProfileBackGround});
    background-position: left top;
    background-size: cover;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    z-index: 1;
    margin: 0px;
`
const MypageContainer = styled.div`
  text-align: center;
  justify-content: space-between;
  .name_btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
const RankList = styled.div`
  display: flex;
  flex-direction: row;
  width: 1040px;
  height: 46px;
  background-color: rgba(169, 169, 169, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin: 5px 0;
  border: 0;
  font-size: 70%;
  align-items: center;
  margin-bottom: 15px;
  margin-left: 200px;
  margin-right: 200px;
  justify-content: center;
  .rankPt2 {
    width: 100px;
    justify-content: flex-end;
  }
  .nicknamePt2 {
    width: 440px;
  }
  .winPt2 {
    width: 200px;
  }
`
const UserName = styled.div`
  font-size: 300%;
  margin-top: 50px;
  margin-bottom: 45px;
  margin-left: 100px;
`
const GoBack = styled.button`
  background-color: #fff;
  border-color: #A9A9A9;
  margin: 10px;
  margin-right: 100px;
  font-size: 15px;
  width: 132px;
  height: 45px;
  border: 1px solid rgba(169, 169, 169, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  cursor:pointer;
  :hover {
  background-color: #BAB7B7;
  cursor: pointer;
 }
`
const Score = styled.div`
    display: flex;
    font-size: 180%;
    margin-bottom: 40px;
    margin-left:100px;
   .myscore {
    color: #707070;
     margin-right: 20px;
   } 
   .myscorenum {
    color: #000000;
  }
`
const MyRanking = styled.div`
  margin-bottom: 30px;
  display: flex;
  font-size: 180%;
  margin-left: 100px;
  .myscore {
     color: #707070;
     margin-right: 20px;
   } 
  .myscorenum {
    color: #000000;
  }
`
const Rank = styled.div`
  font-size: 200%;
  align-items: center;
  margin-left: 100px;
  height: 480px;
  .ranktxt {
    margin-bottom: 40px;
  }
  .rankmap{
    justify-content: center;
    flex-direction: row;
  }
`
const Body = styled.div`
  justify-content: center;
  text-align: center;
  overflow-y: scroll;
  height: 380px;
  //margin-bottom: 300px;
  margin-top: -20px;
`
const Bar = styled.div`
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: row;
  width: 1040px;
  height: 46px;
  background-color: rgba(169, 169, 169, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  margin: 5px 0;
  border: 0;
  font-size: 70%;
  align-items: center;
  margin-bottom: 15px;
  margin-left: 200px;
  margin-right: 200px;
  justify-content: center;
  .rankPt1 {
    width: 100px;
    justify-content: flex-end;
  }
  .nicknamePt1 {
    width: 440px;
  }
  .winPt1 {
    width: 200px;
  }
`
const PaginationContainer = styled.div`
  margin-top: 100px;
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }

  ul.pagination li:first-child{
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:last-child{
    border-radius: 0 5px 5px 0;
  }
  
  ul.pagination li a {
    text-decoration: none;
    color: #000000;
    font-size: 1rem;
  }
  
  ul.pagination li.active a {
    color: white;
  }

  ul.pagination li.active {
    background-color: #000000;
  }
  
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #000000;
  }
  
  .page-selection {
    width: 48px;
    height: 30px;
    color: #000000;
  }
`

