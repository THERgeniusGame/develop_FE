import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { __signup, __checkNickname, __emailCheckConfirm } from "../../redux/modules/signupSlice";
import "../assets/fonts/font.css"
import Img from "../../shared/image/SignUp.png";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [emailNum, setEmailNum] = useState(false);

    const checkNickname = useSelector((state) => state.signup.DupNickname)
    const emailCheckConfirm = useSelector((state) => state.signup.EmailDupConfirm) 
    const checkNum = useSelector((state) => state.signup.CheckNum)
    const confirmEmail = useSelector((state) => state.signup.ConfirmEmail)

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        isDirty,
        getValues,
        setError,
    } = useForm({ criteriaMode: "all", mode: "onChange" });

    // 이메일 중복확인 & 인증 메일 전송
    const onDupConfirmEmail = () => {
        const email = getValues("email")
            if (email !== "" && errors.email === undefined) {
                dispatch(__emailCheckConfirm({email}));
                if (emailCheckConfirm === "Loding") {
                    setError(
                        "email",
                        { message: "중복검사 중 입니다..." },
                        { shouldFocus: true }
                        );
                    }  
             } 
    };

    //email 중복확인 성공했을 때 메시지 띄워주기
    useEffect(() => {
        if (emailCheckConfirm === true) {
            setError("email", { message: "사용 가능한 이메일입니다." });
        }
        if (emailCheckConfirm === "Loading") {
            setError("email", { message: "확인 중 입니다.." });
        }
        if (checkNum === false) {
            setError(
                "email",
                { message: "중복된 이메일입니다." }, 
                { shouldFocus: true }
            );
        } 
    }, [emailCheckConfirm, checkNum]
    );

    //닉네임 중복확인 
    const onDupNick = () => {
        const nickname = getValues("nickname")
        if (nickname !== "" && errors.nickname === undefined) {
        dispatch(__checkNickname({nickname}))
            if (checkNickname === false) {
                setError(
                    "nickname",
                    { message: "중복된 닉네임입니다."},
                    { shouldFocus: true }
                );
            } else {
                setError(
                    "nickname",
                    { message: "중복확인을 해주세요 (특수문자 제외, 2~10자)" },
                    { shouldFocus: true }
                );
            }
        }
    }

    useEffect(() => {
        if (checkNickname === true) {
            setError("nickname", { message: "사용 가능한 닉네임입니다."});
        }
    }, [checkNickname]);


    
    //이메일 인증번호 확인
    const onNumConfirm = () => {
        const NumConfirm = getValues("emailConfirm") 
        if (
            checkNum == NumConfirm
        )
            {setError(
                "emailConfirm",
                { message: "이메일 인증번호가 일치합니다." },
            )
            setEmailNum(true) }
        else {
            setError(
                "emailConfirm",
                { message: "이메일 인증번호가 일치하지 않습니다." },
                { shouldFocus: true }
            );
        }
    }

    const onSubmit = async (data) => {
        //e.preventDefault()
        await new Promise((r) => setTimeout(r, 300));
        if (
            emailNum === false
        ) {
            setError(
                "emailConfirm",
                { message: "이메일 인증번호를 입력해주세요." },
                { shouldFocus: true }
            );
        } else {
            dispatch(__signup(data));
            navigate('/login')
        }
    };

    const onClickDel = () => {
        navigate('/login')
    }

    return(
        <>
        <BackGroundImg>
        <Body>
            <Box>
                <p className="title">THER Genius 회원가입</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Input>
                        <Email
                            style={{ color: "black", fontSize: "17px"}}
                        >
                            <div>
                                사용하실 E-Mail을 입력해주세요.
                            </div>
                            <div className="email_container">
                                <div>
                                    <EmailInput className="email_input"
                                        type="email"
                                        name="email" 
                                        aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
                                        style= {{ fontSize: "16px" }}
                                        {...register("email", { 
                                            required: "이메일을 입력해주세요",
                                            pattern:{
                                                value:
                                                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i, //a~z, 0~9, @필수, .뒤에 2,3글자 더 필요
                                                message:"올바른 이메일 형식이 아닙니다"
                                            }
                                        })}
                                    />
                                </div>
                                <NewDupbtn
                                     style={{ fontSize: "15px" }}
                                     onClick={onDupConfirmEmail}
                                     type="button"
                                >
                                    인증메일 전송
                                </NewDupbtn>
                            </div>
                            <Message>
                                {errors.email && (<p style={{ fontSize: "15px" }}>{errors.email.message}</p>)}
                            </Message>
                        </Email>

                        <EmailConfirm
                            style={{ color: "black", fontSize: "17px"}}
                        >
                            <div>
                                이메일 주소로 발송된 보안 코드를 입력하세요.
                            </div>
                            <div className="emailConfirm_container">
                                <EmailConfirmInput
                                    type="text"
                                    name="emailConfirm" 
                                    aria-invalid={!isDirty ? undefined : errors.emailConfirm ? "true" : "false"}
                                    style= {{ fontSize: "16px" }}
                                    {...register("emailConfirm", {   
                                        required: "인증번호를 입력해주세요",
                                    })} 
                                />
                                <Dupbtn 
                                    onClick={onNumConfirm}
                                    type="button"
                                    style={{ fontSize: "15px"}}
                                >
                                    인증하기
                                </Dupbtn>
                            </div>
                            <Message>
                                {errors.emailConfirm && (<p style={{ fontSize: "15px", color:errors.emailConfirm.message === "이메일 인증번호가 일치합니다." ? "blue" : 'red' }}>{errors.emailConfirm.message}</p>)}
                            </Message>
                        </EmailConfirm>

                        <NickName
                           style={{ color: "black", fontSize: "17px"}}
                        >
                            <div>
                                사용하실 닉네임을 입력해주세요.
                            </div>
                            <div className="nickname_container">
                                <NickNameInput
                                    type="text"
                                    name="nickname"
                                    aria-invalid={!isDirty ? undefined : errors.nickname ? "true" : "false"}
                                    style= {{ fontSize: "16px" }}
                                    {...register("nickname", {
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
                                                    /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
                                                message: "특수문자 제외, 2~10자로 작성해주세요"
                                            }
                                    }
                                    )}
                                />
                                <Dupbtn 
                                    onClick={()=>{onDupNick()}}
                                    type="button"
                                    style={{ fontSize: "15px"}}
                                >
                                    중복확인
                                </Dupbtn>
                            </div>
                            <Message>
                                {errors.nickname && <p style={{ fontSize: "15px" }}>{errors.nickname.message}</p>}
                            </Message>
                        </NickName>
                        
                        <PassWord
                            style={{ color: "black", fontSize: "17px"}}
                        >
                            사용하실 Password를 입력해주세요.
                            <PassWordInput
                                type="password"
                                name="password"
                                aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
                                style= {{ fontSize: "16px" }}
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
                                {errors.password && <p style={{ fontSize: "15px" }}>{errors.password.message}</p>}
                            </Message>
                        </PassWord>

                        <PassWordConfirm
                           style={{ color: "black", fontSize: "17px"}}
                        >
                                Password를 확인해주세요.
                            <PassWordConfirmInput
                                type="password"
                                aria-invalid={!isDirty ? undefined : errors.confirmPw ? "true" : "false"}
                                style= {{ fontSize: "16px" }}
                                {...register("confirmPw", {
                                    required: "비밀번호가 일치하지 않습니다",
                                    pattern: {
                                        value:
                                        /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                                        message: "비밀번호가 일치하지 않습니다"
                                    }
                                })}
                            />
                            <Message>
                                {errors.confirmPw && <p style={{ fontSize: "15px" }}>{errors.confirmPw.message}</p>}
                            </Message>
                        </PassWordConfirm>
                    </Input>

                    <Btn>
                        <CreateAccountBtn
                            type="submit" disabled={isSubmitting}
                            style={{ color: "black", fontSize: "15px"}}
                        >
                            완료
                        </CreateAccountBtn>
                        <CancelBtn
                            type="button" disabled={isSubmitting} onClick={onClickDel}
                            style={{ color: "black", fontSize: "15px"}}
                        >
                            취소
                        </CancelBtn>
                    </Btn>
                </Form>
            </Box>
        </Body>
        </BackGroundImg>
        </>
    );
};
export default SignUpForm;

const BackGroundImg = styled.div`
    width: 2000px;
    height: 1200px;
    background-image: url(${Img});
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
  background:#fff; 
`
const Box = styled.div`
  font-family:Helvetica;
  color:#fff;
  padding:30px 0px;
  height: auto;
  width: auto;
  p {
    margin-bottom: 100px;
    margin-top: -200px;
    font-size: 30px;
  }
`
const Form = styled.form`
    
`
const Message = styled.div`
    margin-top: -4px;
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
    width:120px;
    height: 45px;
    padding:15px;
    background:rgb(255, 255, 255);
    color: black;
    cursor: pointer;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    text-align: center;
`
const NewDupbtn = styled.button`
    display:block;
    width:120px;
    height: 45px;
    background:rgb(255, 255, 255);
    color: black;
    cursor: pointer;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    text-align: center;
`
const Email = styled.div`
    flex-direction: column;
    display: flex;
    margin-bottom: 40px;
    position: relative;
    .email_container {
        align-items: center;
    }
`
const EmailInput = styled.input`
    display:flex;
    width: 520px;
    height: 13px;
    padding:15px;
    background:#fff;
    color: black;
    border-color: #A9A9A9;
    margin-right: 10px;
    margin-top: 5px;
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
    .emailConfirm_container {
        align-items: center;
    }
`

const EmailConfirmInput = styled.input`
    display:flex;
    width: 520px;
    height: 13px;
    padding:15px;
    background:#fff;
    color: black;
    margin-right: 10px;
    margin-top: 5px;
    border-radius: 7px;
    font-size: small;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`
const NickName = styled.div`
    flex-direction: column;
    display: flex;
    position: relative;
    margin-bottom: 40px;
    .nickname_container {
        align-items: center;
    }
`
const NickNameInput = styled.input`
    display: block;
    width: 520px;
    height: 13px;
    padding:15px;
    margin-right: 10px;
    margin-top: 5px;
    background:#fff;
    color: black;
    border-radius: 7px;
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
    height: 13px;
    padding:15px;
    background:#fff;
    color: black;
    position: relative;
    border-radius: 7px;
    font-size: small;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin-top: 5px;
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
    height: 13px;
    padding:15px;
    background:#fff;
    color: black;
    position: relative;
    margin-bottom: 20px;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    margin-top: 5px;
`

const Btn = styled.div`
    display: flex;
    justify-content: center;
`
const CancelBtn = styled.button`
    background-color: #fff;
    border-color: #A9A9A9;
    font-size:15px;
    width: 132px;
    height: 45px;
    margin: 10px;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    cursor:pointer;
`
const CreateAccountBtn = styled.button`
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