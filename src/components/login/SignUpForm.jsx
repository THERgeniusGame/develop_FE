import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { __signup, __checkEmail, __checkNickname, __confirmEmail } from "../../redux/modules/signupSlice";
import "../assets/fonts/font.css"
import Sign from "../../shared/image/Sign.png"

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [emailNum, setEmailNum] = useState(false);

    const checkEmail = useSelector((state) => state.signup.DupEmail)
    const checkNickname = useSelector((state) => state.signup.DupNickname)
    const confirmEmail = useSelector((state) => state.signup.ConfirmEmail)
   
    const signup = useSelector((state) => state.signup.data)
    console.log(signup);

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        isDirty,
        getValues,
        setError,
    } = useForm({ criteriaMode: "all", mode: "onChange" });

    //이메일 중복확인
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
                    { message: "중복확인을 해주세요" },
                    { shouldFocus: true }
                );
            }
    };

    //email 중복확인 성공했을 때 메시지 띄워주기
    useEffect(() => {
        if (checkEmail === true) {
            setError("email", { message: "사용 가능한 이메일입니다" });
        }
    }, [checkEmail]
    );

    //닉네임 중복확인 
    const onDupNick = () => {
        const nickname = getValues("nickname")
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
                    { message: "중복확인을 해주세요 (특수문자 제외, 2~10자)" },
                    { shouldFocus: true }
                );
            }
        }
    }

    useEffect(() => {
        if (checkNickname === true) {
            setError("nickname", { message: "사용 가능한 닉네임입니다"});
        }
    }, [checkNickname]);

    //이메일 인증 
    const onEmailConfirm = () => {
        const emailConfirm = getValues("email")
        console.log(emailConfirm)
        dispatch(__confirmEmail({email:emailConfirm}))
    }

    //인증번호 확인
    const onNumConfirm = () => {
        const NumConfirm = getValues("emailConfirm") 
        console.log(NumConfirm)
        if (
            confirmEmail == NumConfirm
        )
            {setError(
                "emailConfirm",
                { message: "이메일 인증번호가 일치합니다" },
            )
            setEmailNum(true) }
        else {
            setError(
                "emailConfirm",
                { message: "이메일 인증번호가 일치하지 않습니다" },
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
                { message: "이메일 인증번호를 입력해주세요" },
                { shouldFocus: true }
            );
        } else {
            dispatch(__signup(data));
            navigate('/login')
        }
    };

    return(
        <>
        <BackGroundImg>
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
                                <EmailInput className="email_input"
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
                                <Dupbtn 
                                    onClick={onEmailConfirm}
                                    type="button"
                                >
                                    인증메일 전송
                                </Dupbtn>
                            </div>
                            <Message>
                                {errors.email && (<p style={{ fontSize: "14px" }}>{errors.email.message}</p>)}
                                {errors.email && (<p style={{ color: "blue", marginTop: "-7px", fontSize : "14px"}}>{errors.email.message2}</p>)}
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
                                    aria-invalid={!isDirty ? undefined : errors.emailConfirm ? "true" : "false"}
                                    {...register("emailConfirm", {      //email: ""
                                        required: "인증번호를 입력해주세요",
                                    })} 
                                />
                                <Dupbtn 
                                    onClick={onNumConfirm}
                                    type="button"
                                >
                                    인증하기
                                </Dupbtn>
                            </div>
                            <Message>
                                {errors.emailConfirm && (<p style={{ fontSize: "14px" }}>{errors.emailConfirm.message}</p>)}
                                {errors.emailConfirm && (<p style={{ color: "blue", marginTop: "-7px", fontSize: "14px" }}>{errors.emailConfirm.message2}</p>)}
                            </Message>
                        </EmailConfirm>

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
                                                    /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
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
                                {errors.nickname && <p style={{ fontSize: "14px" }}>{errors.nickname.message}</p>}
                                {errors.nickname && (<p style={{ color: "blue", marginTop: "-7px", fontSize: "14px" }}>{errors.nickname.message3}</p>)}
                            </Message>
                        </NickName>
                        
                        <PassWord
                        style={{ color: "black" }}
                        >
                            사용하실 Password를 입력해주세요.
                            <PassWordInput
                                type="password"
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
                                            /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                                        message: "영문/숫자 포함 8~16자로 입력해주세요"
                                    },
                                })}
                            />
                            <Message>
                                {errors.password && <p style={{ fontSize: "14px" }}>{errors.password.message}</p>}
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
                                {errors.confirmPw && <p style={{ fontSize: "14px" }}>{errors.confirmPw.message}</p>}
                            </Message>
                        </PassWordConfirm>
                    </Input>

                    <Btn>
                        <CreateAccountBtn
                            type="submit" disabled={isSubmitting}
                            style={{ color: "black"}}
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
export default SignUpForm;

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
  background:#fff; 
`
const Box = styled.div`
  font-family:Helvetica;
  color:#fff;
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
    margin-top: -12px;
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
    .emailConfirm_container {
        display: flex;
    }
`
const Dupbtn = styled.button`
    display:block;
    width:85px;
    height: 45px;
    padding:15px;
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
    width:511px;
    height: 10px;
    padding:15px;
    background:#fff;
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
    width:511px;
    height: 10px;
    padding:15px;
    background:#fff;
    color: black;
    margin-right: 10px;
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
`
const NickNameInput = styled.input`
    display:block;
    width:511px;
    height: 10px;
    padding:15px;
    margin-right: 10px;
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
    height: 10px;
    padding:15px;
    background:#fff;
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
    background:#fff;
    color: black;
    position: relative;
    margin-bottom: 20px;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`

const Btn = styled.div`
    
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