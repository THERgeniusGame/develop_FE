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
    console.log(login)

    const {
        register,
        formState: { errors },
        handleSubmit,
        isDirty,
    } = useForm({ criteriaMode: "all", mode: "onChange" });

    const onSubmit = (data) => {
        console.log(data)
        dispatch(__login(data)).then(
            navigate("/")
        ).catch (
            navigate("/login")
        )
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
                                style={{ color: "black" , fontSize: "20px"}}
                            >
                                <div>
                                    E-mail
                                </div>
                                <EmailInput
                                    type="text"
                                    name="email"
                                    aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
                                    style= {{ fontSize: "17px" }}
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
                                style={{ color: "black", fontSize:"20px" }}
                            >
                                Password
                                <PassWordInput
                                    type="password"
                                    name="password"
                                    aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
                                    style= {{ fontSize: "17px" }}
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
                                navigate("/signup");
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
                </Box>
            </BackGroundImg>
        </Body>
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
    /* width: 100%;
    height: 100%;
    background-image: url(${LoginScreen});
    background-position: left top;
    background-size: cover;
    align-items: center;
    justify-content: center;
    display: flex;
    position: relative;
    z-index: 1; */
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
const Btn = styled.div`
    
`
const FindPWBtn = styled.div`
    color: black;
    font-size: 20px;
    display:block;
    cursor:pointer;
    border-radius: 0;
    margin-left: -90px;
`
const ToSignUpBtn = styled.div`
    color: black;
    font-size: 20px;
    width:100px;
    //margin:20px auto;
    display:block;
    cursor:pointer;
    border-radius: 0;
    margin-right: -115px;
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
