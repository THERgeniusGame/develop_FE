import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import ProfileBackGround from "../shared/image/profilebackground.jpg"

import Swal from 'sweetalert2'
import { __getMyPage, __getMyRank } from "../redux/modules/myPageSlice";

const MyPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const allRank = useSelector((state) => state.getMyPage.allRank)
    console.log(allRank)

    const myRank = useSelector((state) => state.getMyPage.myRank)
    console.log(myRank)

    //페이지네이션 - 랭킹페이지
    const [page, setPage] = useState(1); //현재 페이지

    const handlePageChange = (page) => {
        setPage(page);
    };

    useEffect(() => {
      dispatch(__getMyPage())
    }, [])

    useEffect(() => {
      dispatch(__getMyRank())
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
                     랭킹 
                  </div>
                  <div className="rankmap">
                    {allRank?.map((rank) => (
                    <RankList key={rank.rank}>
                      <div className="rankPt">{rank?.rank}</div>
                      <div className="nicknamePt">{rank.nickname}님</div>
                      <div className="winavgPt">{rank.winavg}</div>
                    </RankList>
                    ))}
                  </div>
                </Rank>
                <PaginationContainer>
                    <Pagination
                        activePage={page} // 현재 페이지
                        itemsCountPerPage={9} //한 페이지 당 보여줄 리스트 룸의 개수
                        totalItemsCount={300} // 총 룸의 개수
                        pageRangeDisplayed={5} // pagenator 내에서 보여줄 페이지의 범위
                        onChange={handlePageChange} // 페이지
                    /> 
                </PaginationContainer>
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
  .rankPt {
    width: 100px;
    justify-content: flex-end;
  }
  .nicknamePt {
    width: 440px;
  }
  .winavgPt {
    width: 100px;
  }
`
const UserName = styled.div`
  font-size: 300%;
  margin-top: 50px;
  margin-bottom: 45px;
`
const GoBack = styled.button`
  background-color: #fff;
  border-color: #A9A9A9;
  margin: 10px;
  font-size: 15px;
  width: 132px;
  height: 45px;
  border: 1px solid rgba(169, 169, 169, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  cursor:pointer;
`
const Score = styled.div`
    display: flex;
    font-size: 180%;
    margin-bottom: 40px;
   .myscore {
    color: #707070;
     margin-right: 20px;
   } 
   .myscorenum {
    color: #000000;
  }
`
const MyRanking = styled.div`
  margin-bottom: 100px;
  display: flex;
  font-size: 180%;
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

