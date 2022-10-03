import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getReportList } from "../redux/modules/reportSlice.js"
import Header from "../components/Header";
import Pagination from "react-js-pagination";

import ReportImg from "../shared/image/MainIMG/MainBackground.png";

const ReportList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allReport = useSelector((state) => state?.report?.getReport?.reportList)
  
  const reportNum = useSelector((state) => state?.report?.getReport?.total)


  const [page, setPage] = useState(1); //현재 페이지x

  //페이지네이션
  const handlePageChange = (page) => { setPage(page); };
  const [pageDisplay, setPageDisplay] = useState(1);

  useEffect(() => {
    dispatch(__getReportList(page))
    setPageDisplay(Math.ceil(reportNum / 9))
  }, [page, reportNum])
  return (
    <>
      <Header />
      <BackgroundImg>
        <ReportContainer>
          <ReportBtn
            onClick={() => { navigate('/report/user') }}
          >
            <div style={{ display: "flex" }}> 신고하기 </div>
          </ReportBtn>
          <Category>
            <div>번호</div>
            <div>신고제목</div>
            <div>작성자</div>
            <div>날짜</div>
          </Category>

          <div className="body">
            {allReport?.map((report) => (
              <ReportMap key={report?.reportId}
                onClick={() => { navigate(`/report/${report?.reportId}`) }}
              >
                <List>
                  <div className="idPt">{report?.reportId}</div>
                  <div className="titlePt">{report?.reportTitle}</div>
                  <div className="nicknamePt">{report?.nickname}님</div>
                  <div className="datePt">{report?.createdAt}</div>
                </List>
              </ReportMap>
            ))}
            <PaginationContainer>
              <Pagination
                activePage={page} // 현재 페이지
                itemsCountPerPage={9} //한 페이지 당 보여줄 리스트 룸의 개수
                totalItemsCount={reportNum} // 총 룸의 개수
                pageRangeDisplayed={pageDisplay} // pagenator 내에서 보여줄 페이지의 범위
                onChange={handlePageChange} // 페이지
              />
            </PaginationContainer>
          </div>
        </ReportContainer>
      </BackgroundImg>
    </>
  );
};

export default ReportList;

const ReportBtn = styled.div`
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
  text-align: center;
  justify-content: center;
  align-items: center;
 :hover {
  background-color: #BAB7B7;
  cursor: pointer;
 }
`

const BackgroundImg = styled.div`
    background-image: url(${ReportImg});
    background-position: left top;
    background-size: cover;
    width: 100%;
    height: 1000px;
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    z-index: 1;
    margin: 0px;
`

const Category = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    height: 45px;
    width: 850px;
    margin: 0 auto;
    margin-top: 80px;
    background: #F3F3F3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px 8px 0px 0px;
`
const ReportContainer = styled.div`
    width: 100%;
    height: 100%;
    text-align: center;
    justify-content: center;
`
const ReportMap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  width: 849px;
  margin: 0 auto;
  margin-top: 10px;
  background: #F3F3F3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px 8px 8px 8px;
  cursor: pointer;
`
const List = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 45px;
  width: 850px;
  margin: 0 auto;
   
  .idPt {
    width: 30px;
  }
  .titlePt {
    width:400px;
  }
  .nicknamePt {
    width: 220px;
  }
  .datePt {
    width: 300px;
  }
`

const PaginationContainer = styled.div`
  margin-top: 50px;

.pagination {
    display: flex;
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

