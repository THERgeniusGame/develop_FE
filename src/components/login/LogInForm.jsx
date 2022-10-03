import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { __login, __kakaoCheck, __kakaoLogin } from "../../redux/modules/loginSlice";
import Cards from "../../shared/image/Cards.png"
import LoginScreen from "../../../src/shared/image/LoginScreen.png"
import kakaoLogin from "../../../src/shared/image/kakaoLogin.png"
import Swal from 'sweetalert2'

const { Kakao } = window;

const LogInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [nickname, setNickname] = useState("");

    const success = useSelector((state) => state.login.isLogin)
    const login = useSelector((state) => state.login)

    const modalState = useSelector((state) => state?.login.modal)
    const [modal, setModal] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
        isDirty,
    } = useForm({ criteriaMode: "all", mode: "onChange" });

    const onSubmit = (data) => {
        dispatch(__login(data)).then(
            navigate("/")
        ).catch(
            navigate("/login")
        )
    };

    function kakaoLogin() {
        Kakao.Auth.login({
            success: function (response) {
                Kakao.API.request({
                    url: '/v2/user/me',
                    success: function (response) {
                        const email = response.kakao_account.email;
                        const password = response.id;
                        dispatch(__kakaoCheck({ email, password }));
                    },
                    fail: function (error) {
                    },
                })
            },
            fail: function (error) {
            },
        })
    }

    function kakaoLoginTwo() {
        if (nickname !== "" && nickPass.test(nickname) === true) {
            Kakao.Auth.login({
                success: function (response) {
                    Kakao.API.request({
                        url: '/v2/user/me',
                        success: function (response) {
                            const password = response.id;
                            const email = response.kakao_account.email;
                            dispatch(__kakaoLogin({ email, nickname, password }));
                        },
                        fail: function (error) {
                        },
                    })
                },
                fail: function (error) {
                },
            })
        } else {
            Swal.fire({ title: '닉네임을 확인해주세요.', timer: 2000, confirmButtonColor: "black" });
        }
    }

    const nickPass = /^[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}$/

    const token = localStorage.getItem("token");
    useEffect(() => {
        if (token !== null && token !== undefined) {
            window.location.replace("/")
        }

        if (modalState === true) {
            setModal(true);
        }
    }, [modalState])
    
    return (
        <>
            <Body>
                <BackGroundImg>
                    <Box>
                        <div className="image">
                            <Image />
                        </div>
                        <p className="title" style={{ color: "black" }}>THER Genius Brain Card Game</p>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input_btn_container">
                                <Email
                                    style={{ color: "black", fontSize: "20px" }}
                                >
                                    <div>
                                        E-mail
                                    </div>
                                    <EmailInput
                                        type="text"
                                        name="email"
                                        aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
                                        style={{ fontSize: "17px" }}
                                        {...register("email", {
                                            required: "이메일을 입력해주세요",
                                            pattern: {
                                                value:
                                                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, //a~z, 0~9, @필수, .뒤에 2,3글자 더 필요
                                                message: "올바른 이메일 형식이 아닙니다"
                                            }
                                        })}
                                    />
                                    <Message>
                                        {errors.email && <p style={{ fontSize: "14px" }}>{errors.email.message}</p>}
                                    </Message>
                                </Email>

                                <PassWord
                                    style={{ color: "black", fontSize: "20px" }}
                                >
                                    Password
                                    <PassWordInput
                                        type="password"
                                        name="password"
                                        aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
                                        style={{ fontSize: "17px" }}
                                        {...register("password", {
                                            required: "비밀번호를 입력해주세요",
                                            minLength: {
                                                value: 8,
                                                message: "영문/숫자 포함 8~16자로 입력해주세요",
                                            },
                                            maxLength: {
                                                value: 16,
                                                message: "영문/숫자 포함 8~16자로 입력해주세요",
                                            },
                                            pattern: {
                                                value:
                                                    /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                                                message: "영문/숫자 포함 8~16자로 입력해주세요"
                                            },
                                        })}
                                    />
                                    <Message>
                                        {errors.password && <p style={{ fontSize: "14px" }}>{errors.password.message}</p>}
                                    </Message>
                                </PassWord>
                                <LoginBtn>
                                    입장하기
                                </LoginBtn>

                            </div>
                        </Form>
                        <MoveBtn>
                            <FindPWBtn
                                type="button"
                                onClick={() => {
                                    navigate("/EditPw");
                                }}
                            >
                                비밀번호 변경/찾기
                            </FindPWBtn>
                            <ToSignUpBtn
                                type="button"
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                회원가입
                            </ToSignUpBtn>
                        </MoveBtn>
                        <KakaoLoginBtn onClick={() => { kakaoLogin(); }} />
                    </Box>
                </BackGroundImg>
            </Body>
            {modal === true ?
                <div>
                    <KakaoNickModal onSubmit={(e) => { e.preventDefault(); kakaoLoginTwo(); }} type="button" onClick={() => {
                        setModal(!modal);
                    }}>
                        <KakaoNickModalbody onClick={(e) => { e.stopPropagation() }} >
                            <div>사용하실 닉네임을 입력해주세요.</div>
                            <input value={nickname} placeholder="특수문자 제외, 2~10자로 작성해주세요" onChange={(e) => { setNickname(e.target.value); }} ></input>
                            <div>
                                <Btns style={{ margin: "0 20px" }}>가입하기</Btns>
                                <Btns style={{ margin: "0 20px" }} type="button" onClick={() => { setModal(!modal); window.location.replace("/login") }}>취소하기</Btns>
                            </div>
                        </KakaoNickModalbody>
                    </KakaoNickModal>
                </div> : ''}
        </>
    );
};
export default LogInForm;

const BackGroundImg = styled.div`
    width: 100%;
    height: 1200px;
    background-image: url(${LoginScreen});
    background-position: left top;
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    z-index: 1;
`

const Image = styled.div`
    width: 230px;
    height: 282px;
    background-image: url(${Cards});
    align-items: center;
    justify-content: center;
    display: flex;
    background-repeat: no-repeat;
`

const Body = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Box = styled.div`
  font-family:Helvetica;
  color:#fff;
  height: auto;
  width: 500px;
  margin-top: -300px;
  
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 500px;
  }

  p{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: -80px;
    margin-bottom: 90px;
    font-size: 30px;
  }
  & h1 {
    text-align:center;
    margin:30px 0;
    font-size:30px;
  }

  .move_btn {
    justify-content: space-between;
  }
`
const MoveBtn = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 7px;
`

const Form = styled.form`
    p {
        margin-top: 5px;
        color: rgb(224, 4, 4);
        opacity: 0.9;
        margin-left: 90px;
    }
    .input_btn_container {
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;
    }
`
const Message = styled.div`
    margin-top: 24px;
    margin-left: -90px;
    font-size: 60px;
    position: absolute;
    top: 50px;
    left: 0;
`

const Email = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    position: relative;
    margin-bottom: 20px;
`
const EmailInput = styled.input`
    display:flex;
    width: 655px;
    height: 16px;
    padding:15px;
    background:#fff;
    color: black;
    margin-bottom: 20px;
    margin-right: 10px;
    margin-top: 5px;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    font-size: large;
`
const PassWordInput = styled.input`
    display:block;
    width: 655px;
    height: 16px;
    padding:15px;
    margin-bottom: 50px;
    margin-right: 10px;
    margin-top: 5px;
    background:#fff;
    color: black;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    .div {
        font-size: large;
    }
`
const PassWord = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    position: relative;
    margin-top: 5px;
`
const FindPWBtn = styled.div`
    color: #545454;
    font-size: 16px;
    display:block;
    cursor:pointer;
    border-radius: 0;
    margin-left: -90px;
    :hover{
        color : red;
    }
`
const ToSignUpBtn = styled.div`
    color: black;
    font-size: 16px;
    width:100px;
    display:block;
    cursor:pointer;
    border-radius: 0;
    margin-right: -128px;
    :hover{
        color: red;
    }
`

const LoginBtn = styled.button`
    width: 690px;
    height: 55px;
    background: black;
    color:#fff;
    font-size:15px;
    display:block;
    cursor:pointer;
    border-radius: 7px;
    margin-top: 40px;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    font-size: larger;
`

const KakaoLoginBtn = styled.button`
    width: 380px;
    height: 55px;
    font-size:15px;
    display:block;
    cursor:pointer;
    margin: 40px auto auto auto;
    background-image: url(${kakaoLogin});
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    border-radius: 8px;
`


const KakaoNickModal = styled.form`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;


const KakaoNickModalbody = styled.div`
  display: flex;
  font-size: 26px;
  width: 864px;
  height: 250px;
  padding: 30px;
  left: 293px;
  top: 355px;
  background: linear-gradient(259.36deg, #FBFBFB 2.14%, #F5F5F5 34.66%, #ECECEC 67.72%, #E3E3E3 103.54%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  display:flex;
  flex-direction: column;
  margin: auto;
    div {
      display: flex;
      margin: auto;
    }
    input {
      text-align: center;
      padding-left: 10px;
      font-size: 18px;
      display:flex;
      margin: 40px auto 20px auto;
      width: 505px;
      height: 45px;
      left: 472px;
      top: 483px;
      background: #F4F4F4;
      border: 1px solid rgba(169, 169, 169, 0.25);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
    }
`;

const Btns = styled.button`
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