import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Background from "../shared/image/RoomIMG/RoomBackground.png";
import { useParams } from "react-router-dom";

import { __getAnswer, __getReport, __deleteReport, __EditReportContent, __PostReportContent } from "../redux/modules/reportSlice";

import Swal from 'sweetalert2'


const ReportContent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getReport = useSelector((state) => state?.report?.getReport);
    const getAnswer = useSelector((state) => state?.report?.getAnswer);

    const { reportId } = useParams();

    useEffect(() => {
        dispatch(__getReport(reportId)); //reportId가 slice로 넘어감
        dispatch(__getAnswer(reportId));
    }, [])

    const [editRequest, setEditRequest] = useState(false);
    const [editInput, setEditInput] = useState("");
    const [editContent, setEditContent] = useState(false);

    //댓글 수정 핸들
    const onsubmitHandle = () => {
        if (editInput === "") {
            Swal.fire({ title: '내용을 입력해주세요.', timer: 3000, confirmButtonColor: "black" });
        } else {
            setEditRequest(!editRequest);
            dispatch(__EditReportContent({ reportId, commentContent: editInput }));
            setEditInput("");
        }
    }

    const submitHandle = (e) => {
        dispatch(__PostReportContent({ commentContent: editInput, reportId }));
    }

    return (
        <>
            <Header />
            <BackgroundImg>
                <ReportContainer>
                    <div className="body">
                        <TitleInput
                            style={{ fontSize: 20 }}
                            name="title"
                        >
                            {getReport.reportTitle}
                        </TitleInput>
                        <BugBox>
                            버그
                            <ContentTextArea
                                style={{ fontSize: 20 }}
                                name="content"
                            >
                                {getReport.reportContent}
                            </ContentTextArea>
                        </BugBox>
                        <Btns>
                            {getReport.my ? <button style={{ display: "flex", margin: "auto" }} onClick={() => { dispatch(__deleteReport(reportId)); navigate(`/report`); }}>삭제하기</button> : ''}
                            {getReport.my ? <button style={{ display: "flex", margin: "auto" }} onClick={() => { navigate(`/editReport/${reportId}`); }}>수정하기</button> : ''}
                            <button style={{ display: "flex", margin: "auto" }} onClick={() => { navigate("/report") }}>돌아가기</button>
                        </Btns>
                        {getReport.admin === true ?
                            <Answer>
                                <AnswerTxt>
                                    답변
                                </AnswerTxt>
                                <AnswerResponse>
                                    {getAnswer === null ?
                                        <form onSubmit={(e) => { e.preventDefault(); submitHandle(e); }}>
                                            <input value={editInput} onChange={(e) => { setEditInput(e.target.value); }} style={{ width: "890px", margin: "7px 5px 5px 5px", paddingLeft: "10px", fontSize: "21px" }}></input>
                                            <Btn>답변하기</Btn>
                                        </form>
                                        :
                                        editContent === false ?
                                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                <div style={{ marginTop: "5px" }}>{getAnswer?.commentContent}</div>
                                                <Btn onClick={() => { setEditContent(true); }}>수정하기</Btn>
                                            </div> :
                                            <form onSubmit={(e)=> {onsubmitHandle();}} style={{ display: "flex", justifyContent: "space-between" }}>
                                                <input value={editInput} onChange={(e) => { setEditInput(e.target.value); }} style={{ width: "890px", margin: "7px 5px 5px 5px", paddingLeft: "10px", fontSize: "21px" }}></input>
                                                <Btn type="button" onClick={() => { setEditContent(false); }}>취소하기</Btn>
                                            </form>}
                                </AnswerResponse>
                            </Answer>
                            : getAnswer === null ? null :
                                <Answer>
                                    <AnswerTxt>
                                        답변
                                    </AnswerTxt>
                                    <AnswerResponse>
                                        <><div>{getAnswer?.commentContent}</div></>
                                    </AnswerResponse>
                                </Answer>
                        }
                    </div>
                </ReportContainer>
            </BackgroundImg>
        </>
    );
};

export default ReportContent;

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

const BugBox = styled.div`
    border-radius: 8px;
    border: 0;
    margin: 0 auto;
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
    margin-top: 45px;
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
    display: flex;
    justify-content: space-between;
`
const ReportContainer = styled.div`
    width: 100%;
    height: 100%;
    .body {
        font-size: 70%;
    }
`

const Btns = styled.div`
    display: flex;
    margin: 30px auto;
    width: 50%;

    button{
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 30px auto;   
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      width: 220px;
      height: 45px;
      background: #F4F4F4;
      border: 1px solid rgba(169, 169, 169, 0.25);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
        :hover {
        background-color: #BAB7B7;
        cursor: pointer;
              }
    }
`

const Btn = styled.button`
    margin: 5px;
    padding: 5px;
    :hover {
    background-color: #BAB7B7;
    cursor: pointer;
            }
`