import styled from "styled-components";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { __login } from "../../redux/modules/loginSlice";
import Cards from "../../shared/image/Cards.png"
import LoginScreen from "../../../src/shared/image/LoginScreen.png"

const LogInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const success = useSelector((state) => state.login.isLogin)
    console.log(success)
    
    const login = useSelector((state) => state.login)
    console.log(login);

    const {
        register,
        formState: { errors },
        handleSubmit,
        isDirty,
    } = useForm({ criteriaMode: "all", mode: "onChange" });

    const onSubmit = (data) => {
        console.log("1", success)
        dispatch(__login(data)).then(
            navigate("/")
        ).catch (
            navigate("/login")
        )
            // console.log("2")
            // if (
            //     success === true
            // ) {
            //     console.log("3")
            //     navigate("/") 
            // }
            // console.log("4")
    };

    return(
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
                                style={{ color: "black" }}
                            >
                                <div>
                                    E-mail
                                </div>
                                <EmailInput
                                    type="text"
                                    name="email"
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
                                    {errors.email && <p style={{ fontSize: "14px" }}>{errors.email.message}</p>}
                                </Message>
                            </Email>

                            <PassWord
                                style={{ color: "black" }}
                            >
                                Password
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

                            <LoginBtn>
                                입장하기
                            </LoginBtn>
                        </div>
                            <ToSignUpBtn 
                                type="button"
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                회원가입
                            </ToSignUpBtn>
                    </Form>
                </Box>
            </BackGroundImg>
        </Body>
    </>
    );
};
export default LogInForm;

const BackGroundImg = styled.div`
    width: 100%;
    height: 100%;
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
  }
  & h1 {
    text-align:center;
    margin:30px 0;
    font-size:30px;
  }
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
    margin-top: 8px;
    margin-left: -90px;
    font-size: smaller;
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
    height: 10px;
    padding:15px;
    background:#fff;
    color: black;
    margin-bottom: 20px;
    margin-right: 10px;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
`
const PassWordInput = styled.input`
    display:block;
    width: 655px;
    height: 10px;
    padding:15px;
    margin-bottom: 50px;
    margin-right: 10px;
    background:#fff;
    color: black;
    border: 1px solid rgba(169, 169, 169, 0.25);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    .div {
        font-size: small;
    }
`
const PassWord = styled.div`
    flex-direction: column;
    justify-content: center;
    display: flex;
    position: relative;
`
const Btn = styled.div`
    
`
const ToSignUpBtn = styled.div`
    color: black;
    padding:10px;
    font-size:15px;
    width:100px;
    margin:20px auto;
    display:block;
    cursor:pointer;
    border-radius: 0;
    margin-left: 500px;
    margin-top:-5px;
`

const LoginBtn = styled.button`
    width: 688px;
    height: 45px;
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
`
