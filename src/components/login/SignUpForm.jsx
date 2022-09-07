import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverUrl } from "../../serverurl";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { __signup, __checkEmail, __checkNickname } from "../../redux/modules/signupSlice";
import "../assets/fonts/font.css"

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkEmail = useSelector((state) => state.signup.DupEmail) //false
    console.log(checkEmail) //false(기본값)

    const checkNickname = useSelector((state) => state.signup.DupNickname)
    console.log(checkNickname)

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        isDirty,
        getValues,
        setError,
    } = useForm({ criteriaMode: "all", mode: "onChange" });

    const signup = useSelector((state) => state.signup.data) // []
    
    console.log(signup);

    const onDupEmail = () => {
        const email = getValues("email")
        console.log(email)
            if (email !== "" && errors.email === undefined) {
                dispatch(__checkEmail({email}));
                if (checkEmail === false) {
                    setError(
                        "email",
                        { message: "중복된 이메일입니다." },
                        { shouldFocus: true }
                    );
                }   
            } else {
                setError(
                    "email",
                    { message: "이메일을 확인하고 중복확인을 해주세요" },
                    { shouldFocus: true }
                );
            }
    };
        //email 중복확인 성공했을 때 메시지 띄워주기
    useEffect(() => {
        const email = getValues("email")
        console.log(checkEmail)
        if (checkEmail === true) {
            setError("email", { message: "사용 가능한 이메일입니다" });
        }
    }, [checkEmail]
    );

    useEffect(() => {
        const nickname = getValues("nickname")
        console.log(nickname)
        if (checkNickname === true) {
            setError("nickname", { message: "사용 가능한 닉네임입니다"});
        }
    }, [checkNickname]);

    const onDupNick = () => {
        const nickname = getValues("nickname")
        console.log(nickname)
        if (nickname !== "" && errors.nickname === undefined) {
        dispatch(__checkNickname({nickname}))
            if (checkEmail === false) {
                setError(
                    "nickname",
                    { message: "중복된 닉네임입니다."},
                    { shouldFocus: true }
                );
            } else {
                setError(
                    "nickname",
                    { message: "닉네임을 확인하고 중복확인을 해주세요" },
                    { shouldFocus: true }
                );
            }
        }
    }

    const onSubmit = async (data) => {
        //e.preventDefault()
        await new Promise((r) => setTimeout(r, 300));
        console.log(data) //input에 적은 값
        dispatch(__signup(data));
        navigate('/')
    };

    return(
        <Body>
            <Box>
                <p className="title">THER Genius 회원가입</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input>
                        <Email
                            style={{ color: "black" }}
                        >
                            <div>
                                사용하실 E-Mail을 입력해주세요
                            </div>
                            <div className="email_container">
                                <EmailInput
                                    type="email"
                                    name="email" //data를 뽑을때 key값이 됨 
                                    aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
                                    {...register("email", {      //email: ""
                                        required: "이메일을 입력해주세요",
                                        pattern:{
                                            value:
                                                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, //a~z, 0~9, @필수, .뒤에 2,3글자 더 필요
                                            message:"올바른 이메일 형식이 아닙니다"
                                        }
                                    })}
                                />
                                <Dupbtn 
                                    onClick={()=>{onDupEmail()}}
                                    type="button"
                                >
                                    중복확인
                                </Dupbtn>
                            </div>
                            <Message>
                                {errors.email && (<p>{errors.email.message}</p>)}
                                {errors.email && (<p style={{ color: "blue", marginTop: "-7px" }}>{errors.email.message2}</p>)}
                            </Message>
                        </Email>

                        <NickName
                            style={{ color: "black" }}
                        >
                            <div>
                                사용하실 닉네임을 입력해주세요.
                            </div>
                            <div className="nickname_container">
                                <NickNameInput
                                    type="text"
                                    name="nickname"
                                    aria-invalid={!isDirty ? undefined : errors.nickname ? "true" : "false"}
                                    {...register("nickname", {      //nickname:""
                                            required: "닉네임을 입력해주세요",
                                            minLength: {
                                                value: 2,
                                                message: "특수문자 제외, 2~10자로 작성해주세요",
                                            },
                                            maxLength: {
                                                value: 10,
                                                message:"특수문자 제외, 2~10자로 작성해주세요",
                                            },
                                            pattern: {
                                                value:
                                                    /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/, //특수문자 제외
                                                message: "특수문자 제외, 2~10자로 작성해주세요"
                                            }
                                    }
                                    )}
                                />
                                <Dupbtn 
                                    onClick={()=>{onDupNick()}}
                                    type="button">
                                    중복확인
                                </Dupbtn>
                            </div>
                            <Message>
                                {errors.nickname && <p>{errors.nickname.message}</p>}
                                {errors.nickname && (<p style={{ color: "blue", marginTop: "-7px" }}>{errors.nickname.message3}</p>)}
                            </Message>
                        </NickName>
                        
                        <PassWord
                        style={{ color: "black" }}
                        >
                            사용하실 Password를 입력해주세요.
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

                        <PassWordConfirm
                            style={{ color: "black" }}
                        >
                                Password를 확인해주세요.
                            <PassWordConfirmInput
                                aria-invalid={!isDirty ? undefined : errors.confirmPw ? "true" : "false"}
                                {...register("confirmPw", {
                                    required: "비밀번호가 일치하지 않습니다",
                                    pattern: {
                                        value:
                                        /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/, //영문, 숫자 포함 8~16자
                                        message: "비밀번호가 일치하지 않습니다"
                                    }
                                })}
                            />
                            <Message>
                                {errors.confirmPw && <p>{errors.confirmPw.message}</p>}
                            </Message>
                        </PassWordConfirm>
                    </Input>

                    <Btn>
                        <CreateAccountBtn
                            type="submit" disabled={isSubmitting}
                            // onClick={() => {
                            //    handleSubmit(onSubmit()) //form안에 onSubmit
                            // }}
                            style={{ color: "black"}}
                        >
                            완료
                        </CreateAccountBtn>
                        {/* <ToLoginBtn 
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                        Do you want to Log in?
                        </ToLoginBtn> */}
                    </Btn>
                </Form>
            </Box>
        </Body>
    );
};
export default SignUpForm;

const Body = styled.div`
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;   
  background:#fff; 
`
const Box = styled.div`
  font-family:Helvetica;
  color:#fff;
  padding:30px 0px;
  height: auto;
  width: 500px;

 
`
const Title = styled.div`
    /* font-family: "nanummyeongjo";
    font-style: normal;
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;

    text-align:center;
    margin:30px 0;
    //font-size:30px;
    margin-bottom: 50px;
    color: black         */
  
`
const Form = styled.form`
    
`
const Message = styled.div`
    margin-top: -6px;
    //margin-bottom: -20px;
    font-size: smaller;
    margin-left: -5px;
    position: absolute;
    top: 70px;
    left: -85px;
    
`

const Input = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    //color: rgb(118, 118, 118);
    //align-items: center;
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
`
const Dupbtn = styled.button`
    display:block;
    width:85px;
    height: 45px;
    border-radius: 5px;
    //margin:20px auto;
    padding:15px;
    background:rgb(255, 255, 255);
    color: black;
    border:0;
    cursor: pointer;
`
const Email = styled.div`
    flex-direction: column;
    //justify-content: center; //
    //align-items: center; 
    //text-align: center;
    display: flex;
    //padding-right:150px ;
    margin-bottom: 15px;
    position: relative;

`
const EmailInput = styled.input`
    display:flex;
    width:300px;
    height: 10px;
    //margin:20px auto;
    padding:15px;
    background:#fff;
    color: black;
    border-color: #A9A9A9;
    margin-bottom: 20px;
    margin-right: 10px;
    border-radius: 7px;
`
const PassWordConfirm = styled.div`
    //flex-direction: column;
    //justify-content: center;
    //align-items: center; 
    display: flex;
    flex-direction: column;
    //padding-right:150px ;
    margin-top: 15px;
    position: relative;    
`
const PassWordInput = styled.input`
    display: block;
    width: 400px;
    height: 10px;
    //margin:20px auto;
    padding:15px;
    background:#fff;
    color: black;
    border-color: #A9A9A9;
    position: relative;
    margin-bottom: 15px;
    border-radius: 7px;
    .div {
        font-size: small;
    }
`
const PassWord = styled.div`
    //flex-direction: column;
    //justify-content: center;
    //align-items: center; 
    display: flex;
    flex-direction: column;
    //padding-right:150px ;
    margin-top: 15px;
    position: relative;
`
const PassWordConfirmInput = styled.input`
    display:block;
    width:400px;
    height: 10px;
    //margin:20px auto;
    padding:15px;
    background:#fff;
    color: black;
    border-color: #A9A9A9;
    position: relative;
    margin-bottom: 15px;
    border-radius: 7px;
`
const NickNameInput = styled.input`
    display:block;
    width:300px;
    height: 10px;
    //margin:20px auto;
    padding:15px;
    margin-bottom: 20px;
    margin-right: 10px;
    background:#fff;
    color: black;
    border-color: #A9A9A9;
    border-radius: 7px;
`
const NickName = styled.div`
    flex-direction: column;
    //justify-content: center; //
    //align-items: center; 
    //text-align: center;
    display: flex;
    //padding-right: 150px;
    position: relative;
`
const Btn = styled.div`
    
`

const ToLoginBtn = styled.button`
    display:block;
    width:300px;
    margin:20px auto;
    padding:15px;
    background:#fff;
    color: black;
    border-color: #A9A9A9;
    cursor: pointer;
`

const CreateAccountBtn = styled.button`
    background-color: #fff;
    border-color: #A9A9A9;
    padding:10px;
    font-size:15px;
    width:100px;
    margin:20px auto;
    display:block;
    cursor:pointer;
`