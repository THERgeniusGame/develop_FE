import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Pagination from "react-js-pagination";
import Background from "../shared/image/RoomIMG/RoomBackground.png";
import { useParams } from "react-router-dom";

import { __getAnswer, __getReport, __postReport } from "../redux/modules/reportSlice";

import Swal from 'sweetalert2'


const ReportContent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getReport = useSelector((state) => state.report.getReport)
   console.log(getReport)

    const getContent = useSelector((state) => state)
    console.log(getContent)

    const getAnswer = useSelector((state) => state) //reportId 찾기
    //console.log(getAnswer)
    
    const { reportId } = useParams();
    //console.log(reportId)

    useEffect(() => {
        dispatch(__getReport(reportId), __getAnswer(reportId)) //reportId가 slice로 넘어감
    },[])
    
    // useEffect(() => {
    //     dispatch(__getAnswer(reportId)) //reportId가 slice로 넘어감
    // },[])

  return (
    <>
      <Header />
      <BackgroundImg>
          <ReportContainer>
            <div className="body">
                {/* {allReport?.map((content) => ( */}
                    {/* <ContentMap key={content.reportId}> */}
                        <TitleInput 
                            style={{ fontSize:20 }}
                            name="title"
                        >
                            {getReport.reportTitle}
                        </TitleInput>
                        <BugBox>
                            버그
                            <ContentTextArea
                                style={{ fontSize:20 }} 
                                name="content"
                            >
                                {getReport.reportContent}
                            </ContentTextArea>
                        </BugBox>
                    {/* </ContentMap> */}
                {/* ))} */}
                
                
                <Answer>
                    <AnswerTxt>
                        {}
                    </AnswerTxt>
                    <AnswerResponse>
                        저도 잘 모르겠네요
                    </AnswerResponse>
                </Answer>
                
                {/* <ReportMap>
                    {allReport?.map((rank) => (
                    <ReportList key={rank.rank}>
                      <div className="reportPt">{rank?.rank} 버그 신고합니다 </div>
                      <div className="nicknamePt">{rank.nickname}님 지니어스님</div>
                      <div className="datePt">{rank.winavg} 1월2일 </div>
                    </ReportList>
                    ))}
                </ReportMap> */}
                
            </div>
          </ReportContainer>
        </BackgroundImg>
    </>
  );
};

export default ReportContent;
const ContentMap = styled.div`
    
`

const TitleInput = styled.div`
    display: flex;
    flex-direction: row;
    width: 1060px;
    height: 46px;
    background-color: #F3F3F3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0;
    align-items: center;
    margin-bottom: 10px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 80px;
    padding-left: 20px;
`
const BackgroundImg = styled.div`
    background-image: url(${Background});
    background-position: left top;
    background-size: cover;
    width: 100%;
    height: 1000px;
    align-items: center;
    display: flex;
    position: relative;
    z-index: 1;
    font-size: 200%;
`
const ReportBtn = styled.div`
    
`

const BugBox = styled.div`
    //background-color: #F3F3F3;
    //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0;
    margin: 0 auto;
    //padding-left: 20px;
    padding: 20px; 
    
    background: #F4F4F4;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 1037px;
    height: 468px;

`

const ContentTextArea = styled.div`
    width: 985px;
    height: 361.4px;
    z-index: 3;
    padding: 20px 10px;
    background: linear-gradient(259.36deg, #F1F1F1 2.14%, #F3F3F3 28.04%, #ECECEC 57.25%, #ECECEC 81.49%, #E3E3E3 103.54%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin-top: 15px;
`
const Write = styled.button`
    margin-left: 920px;
    
`
const Answer = styled.div`
    display: flex;
    flex-direction: row;
    width: 1060px;
    height: 46px;
    background-color: #F3F3F3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    border: 0;
    align-items: center;
    margin-bottom: 10px;
    margin: 0 auto;
    margin-top: 100px;
    margin-bottom: 80px;
    padding-left: 20px;
    .answerTxt {
        color: rgba(0, 0, 0, 0.6)
        
    }
`
const AnswerTxt = styled.div`
    margin-right: 20px;
    color: rgba(0, 0, 0, 0.6)
`
const AnswerResponse = styled.div`
    
`
const ReportContainer = styled.div`
    width: 100%;
    height: 100%;
    //text-align: center;
    //justify-content: center;
    .body {
        font-size: 70%;
        /* justify-content: center;
        align-items: center; */
    }
`
const ReportMap = styled.div`
    display: flex;
    flex-direction: row;
    width: 849px;
    height: 46px;
    background-color: #F3F3F3;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin: 0px auto;
    border: 0;
    font-size: 70%;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 200px;
    margin-right: 200px;
    //gap: 120px;
    justify-content: center;
`
const ReportList = styled.div`
    
    .reportPt {

    }
    .nickname {

    }
    .datePt {

    }
`

// const Pagination = styled.div`
  
