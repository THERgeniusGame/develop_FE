import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "../components/assets/fonts/font.css"
import Sign from "../shared/image/Sign.png"
import { __EditPw } from "../redux/modules/EditPw";

const EditPw = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.editpw);
    useEffect(() => {
        dispatch(__EditPw("JW@naver.com"))
        console.log(data)
    }, [])

    return (
        <>
            <BackGroundImg>
                <Body>
                    <Box>
                        <p className="title">THER Genius 비밀번호변경</p>
                        <Form>
                            <Input>
                                <Email
                                    style={{ color: "black" }}
                                >
                                    <div>
                                        가입하신 E-Mail을 입력해주세요
                                    </div>
                                    <div className="email_container">
                                        <EmailInput className="email_input"

                                        />
                                        <Dupbtn
                                            type="button"
                                            onclick={() => { dispatch(__EditPw("JW@naver.com")) }}
                                        >
                                            인증메일 전송
                                        </Dupbtn>
                                    </div>
                                    <Message>
                                        인증
                                    </Message>
                                </Email>

                                <EmailConfirm
                                    style={{ color: "black" }}
                                >
                                    <div>
                                        이메일 주소로 발송된 보안 코드를 입력하세요.
                                    </div>
                                    <div className="emailConfirm_container">
                                        <EmailConfirmInput
                                            type="text"
                                            name="emailConfirm" //data를 뽑을때 key값이 됨 
                                        />
                                        <Dupbtn
                                            type="button"
                                        >
                                            인증하기
                                        </Dupbtn>
                                    </div>
                                    <Message>
                                        ㅇㅇ
                                    </Message>
                                </EmailConfirm>
                                <PassWord
                                    style={{ color: "black" }}
                                >
                                    변경하실 Password를 입력해주세요.
                                    <PassWordInput
                                        type="password"
                                        name="password"
                                    />
                                    <Message>
                                        22
                                    </Message>
                                </PassWord>

                                <PassWordConfirm
                                    style={{ color: "black" }}
                                >
                                    Password를 확인해주세요.
                                    <PassWordConfirmInput

                                    />
                                    <Message>
                                        33
                                    </Message>
                                </PassWordConfirm>
                            </Input>

                            <Btn>
                                <CreateAccountBtn
                                    type="submit"
                                    style={{ color: "black" }}
                                >
                                    돌아가기
                                </CreateAccountBtn>
                                <CreateAccountBtn
                                    type="submit"
                                    style={{ color: "black" }}
                                >
                                    완료
                                </CreateAccountBtn>
                            </Btn>
                        </Form>
                    </Box>
                </Body>
            </BackGroundImg>
        </>
    );
};
export default EditPw;

const BackGroundImg = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${Sign});
    background-position: left top;
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    z-index: 1;
`

const Body = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
`
const Box = styled.div`
  font-family:Helvetica;
  padding:30px 0px;
  height: auto;
  width: auto;
  margin-top: 100px;
  p {
    margin-bottom: 100px;
  }
`
const Form = styled.form`
    
`
const Message = styled.div`
    margin-top: -5px;
    font-size: smaller;
    margin-left: 90px;
    position: absolute;
    top: 70px;
    left: -85px;  
    color: red;  
`

const Input = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    p {
        margin-top: 5px;
        color: rgb(224, 4, 4);
        opacity: 0.9;
        margin-left: 90px;
    }
    .email_container {
        display: flex;
    }
    .nickname_container {
        display: flex;
    }
    .emailConfirm_container {
        display: flex;
    }
`
const Dupbtn = styled.button`
    display:block;
    width:85px;
    height: 45px;
    padding: 8px 15px;
    background:rgb(255, 255, 255);
    color: black;
    cursor: pointer;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`
const Email = styled.div`
    flex-direction: column;
    display: flex;
    margin-bottom: 40px;
    position: relative;
    
`
const EmailInput = styled.input`
    display:flex;
    width:560px;
    height: 10px;
    padding:15px;
    color: black;
    border-color: #A9A9A9;
    margin-right: 10px;
    border-radius: 7px;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`

const EmailConfirm = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;  
    margin-bottom: 40px;
`

const EmailConfirmInput = styled.input`
    display:flex;
    width:560px;
    height: 10px;
    padding:15px;
    color: black;
    margin-right: 10px;
    border-radius: 7px;
    font-size: small;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`
const PassWord = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    position: relative;
`
const PassWordInput = styled.input`
    display: block;
    width: 655px;
    height: 10px;
    padding:15px;
    color: black;
    position: relative;
    border-radius: 7px;
    font-size: small;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`
const PassWordConfirm = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    position: relative;    
    margin-bottom: 40px;
`
const PassWordConfirmInput = styled.input`
    display:block;
    width:655px;
    height: 10px;
    padding:15px;
    color: black;
    position: relative;
    margin-bottom: 20px;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`

const Btn = styled.div`
    display: flex;
`

const CreateAccountBtn = styled.button`
    background-color: #fff;
    border-color: #A9A9A9;
    padding:10px;
    font-size:15px;
    width:132px;
    height: 45px;
    margin:20px auto;
    display:block;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    cursor:pointer;
`