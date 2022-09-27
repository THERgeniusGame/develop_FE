import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Background from "../shared/image/RoomIMG/RoomBackground.png";

import { __getReport, __postReport } from "../redux/modules/reportSlice";


const UserReport = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAllReport = useSelector((state) => state.report.getReport)
    console.log(getAllReport)

    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const [inputs, setInputs] = useState({
        reportTitle: "",
        reportContent: "",
    });
    console.log(inputs)
    

    const onSubmitHandler = () => {
        console.log()
        dispatch(__postReport(inputs)).then(
            navigate("/report")
        ).catch(
            console.log("신고 post에러")
        )
    }
    
  return (
    <>
      <Header />
      <BackgroundImg>
          <ReportContainer>
            <div className="body">
                <TitleInput 
                    style={{ fontSize:20 }} 
                    placeholder="제목"
                    onChange={onChange}
                    name="reportTitle"
                />
                <BugBox>
                    버그
                    <ContentTextArea
                        style={{ fontSize:20 }} 
                        placeholder="문제 상황을 작성해주세요"
                        name="reportContent"
                        onChange={onChange}
                    >
                    </ContentTextArea>
                    <Write
                        onClick={onSubmitHandler}
                    >
                        제출하기
                    </Write>
                </BugBox>
            </div>
          </ReportContainer>
        </BackgroundImg>
    </>
  );
};

export default UserReport;

const TitleInput = styled.input`
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

const ContentTextArea = styled.textarea`
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
const ReportContainer = styled.div`
    width: 100%;
    height: 100%;
    .body {
        font-size: 70%;
    }
`