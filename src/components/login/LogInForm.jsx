import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverUrl } from "../../serverurl";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { __login } from "../../redux/modules/loginSlice";
import Cards from "../../shared/image/Cards.png"

const LogInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const accessToken = localStorage.getItem("token")
        console.log(accessToken)
        if (accessToken) {
            return navigate("/")
        }
    }, [])

    const {
        register,
        formState: { errors },
        handleSubmit,
        isDirty,
    } = useForm({ criteriaMode: "all", mode: "onChange" });

    const login = useSelector((state) => state.login)

    console.log(login);

    const onSubmit = async (data) => {
        await new Promise((r) => setTimeout(r, 300));
        const accessToken = localStorage.getItem("token")
        console.log(data) //input에 입력한 값
        dispatch(__login(data))
        if (accessToken) {
            return navigate("/")
        }
    };
        

    return(
        <Body>
            <Box>
                <Image>
                </Image>
                <p style={{ color: "black" }}>THER Genius Brain Card Game</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input>
                        <Email
                            style={{ color: "black" }}
                        >
                            <div>
                                E-mail
                            </div>
                            <EmailInput
                                type="text"
                                name="email" //data를 뽑을때 key값이 됨
                                aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
                                {...register("email", {
                                    required: "이메일을 입력해주세요",
                                    pattern:{
                                        value:
                                            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, //a~z, 0~9, @필수, .뒤에 2,3글자 더 필요
                                        message:"올바른 이메일 형식이 아닙니다"
                                    }
                                })}
                            />
                            <Message>
                                {errors.email && <p>{errors.email.message}</p>}
                            </Message>
                        </Email>

                        <PassWord
                            style={{ color: "black" }}
                        >
                            Password
                            <PassWordInput
                                type="text"
                                name="password"
                                aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
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
                                        /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/, //영문, 숫자 포함 8~16자
                                        message: "영문/숫자 포함 8~16자로 입력해주세요"
                                    },
                                })}
                            />
                            <Message>
                                {errors.password && <p>{errors.password.message}</p>}
                            </Message>
                        </PassWord>
                    </Input>

                    <Btn>
                        <Login>
                            입장하기
                        </Login>
                        <ToSignUpBtn 
                            type="button"
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            회원가입
                        </ToSignUpBtn>
                    </Btn>
                </Form>
            </Box>
        </Body>
    );
};
export default LogInForm;

const Image = styled.div`
    width: 210px;
    height: 267.43px;
    background-position: center;
    background-size: cover;
    background-image: url(${Cards});

    align-items: center;
    flex-direction: column;
    justify-content: center;
    display: flex;
`

const Body = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;    
  //background-color: blue;
  //height:100%;
  //width:100%; 
`
const Box = styled.div`
  //position:absolute;
  /* height:100%;
  width:100%; */
  font-family:Helvetica;
  color:#fff;
  padding:30px 0px;
  height: auto;
  width: 500px;

  & h1 {
    text-align:center;
    margin:30px 0;
    font-size:30px;
    margin-bottom: 50px;
  }
`
const Form = styled.form`
    
`
const Message = styled.div`
    margin-top: -6px;
    margin-bottom: -20px;
    font-size: smaller;
    margin-left: -5px;
    position: absolute;
    top: 50px;
    left: 0;
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
`

const Email = styled.div`
    flex-direction: column;
    justify-content: center;
    //align-items: center; 
    display: flex;
    //padding-right:150px ;
    position: relative;
    
`
const EmailInput = styled.input`
    display:flex;
    width: 500px;
    height: 10px;
    padding:15px;
    background:#fff;
    color: black;
    border-color: #A9A9A9;
    margin-bottom: 20px;
    margin-right: 10px;
    border-radius: 7px;
`
const PassWordInput = styled.input`
    display:block;
    width: 500px;
    height: 10px;
    padding:15px;
    margin-bottom: 20px;
    margin-right: 10px;
    background:#fff;
    color: black;
    border-color: #A9A9A9;
    border-radius: 7px;
    .div {
        font-size: small;
    }
`
const PassWord = styled.div`
    flex-direction: column;
    justify-content: center;
    //align-items: center; 
    display: flex;
    //padding-right:150px ;
    position: relative;
`
const Btn = styled.div`
    
`
const ToSignUpBtn = styled.button`
    background-color: #fff;
    padding:10px;
    font-size:15px;
    width:100px;
    margin:20px auto;
    display:block;
    cursor:pointer;
    border-radius: 0;
`

const Login = styled.button`
    width: 535px;
    height: 45px;
    background: black;
    color:#fff;
    padding:10px;
    font-size:15px;
    margin:20px auto;
    display:block;
    cursor:pointer;
    border-radius: 7px;
    margin-top: 40px;
`
