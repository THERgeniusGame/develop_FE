import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";

const SignIn = () => {
    const navigate = useNavigate();
    
    const [userinfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const [inputEmail, setInputEmail] = useState("");
    const [inputPw, setInputPw] = useState("");

    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
        console.log(inputEmail)
    };

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
        console.log(inputPw);
    };

    const onSubmitHandler = async (data) => {
        try {
            const response = await axios.post(
                "http://15.164.95.144/api/login",
                {
                    email: inputEmail,
                    password: inputPw,
                },
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    }
                }
            );
            const token = response.data.result.accessToken;
            localStorage.setItem("token",token);
            const payload = decodeToken(token);
            alert(`${payload.nickname}님 환영합니다.`)
        } catch (err) {
            console.log(err);
            alert("로그인에 실패하셨습니다!");
        };
    };

    return (
        <>
       <Body>
            <Box>
                <h1>Sign In</h1>
                <Info>
                    <Email>
                        <input
                            type="email"
                            name="input_email"
                            placeholder="Email"
                            value={inputEmail}
                            onChange={handleInputEmail}
                        ></input>
                    </Email>
                    <PassWord>
                        <input 
                            type="text"
                            name="input_password"
                            placeholder="PassWord"
                            value={inputPw}
                            onChange={handleInputPw}
                        ></input>
                    </PassWord>
                </Info> 
                <Btn>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitHandler(userinfo);
                    }}
                >
                    <CreateAccountBtn>
                        Login
                    </CreateAccountBtn>
                </form>
                    <ToSignUpBtn 
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >
                        Would you like to Sign Up?
                    </ToSignUpBtn>
                </Btn>
            </Box>
        </Body>
        </>
    )
}

export default SignIn;

const Body = styled.div`
    height: 600px;
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
    background:rgba(0,0,0,0.13);
    padding:30px 0px;
    height: auto;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  & h1 {
    text-align:center;
    margin:30px 0;
    font-size:30px;
  }
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
`;

const Email = styled.div`
& input {
    display:block;
    width:300px;
    margin:20px auto;
    padding:15px;
    background:rgba(0,0,0,0.1);
    color:#fff;
    border:0;
    margin-bottom: 2px;
}
`
const PassWord = styled.div`
   & input {
    display:block;
    width:300px;
    margin:20px auto;
    padding:15px;
    background:rgba(0,0,0,0.1);
    color:#fff;
    border:0;
    margin-bottom: 2px;
    }
    .div {
        font-size: small;
    }
` 
// const PassWordConfirm = styled.div`
//     & input {
//     display:block;
//     width:300px;
//     margin:20px auto;
//     padding:15px;
//     background:rgba(0,0,0,0.1);
//     color:#fff;
//     border:0;
//     margin-bottom: 2px;
//     }
// `
// const NickName = styled.div`
//     & input {
//     display:block;
//     width:300px;
//     margin:20px auto;
//     padding:15px;
//     background:rgba(0,0,0,0.1);
//     color:#fff;
//     border:0;
//     margin-bottom: 2px;
//     }
//     /* &:focus {
//       outline: 1px solid rgb(79, 188, 238);
//     } */
// `
const Btn = styled.div`
    
`
const ToSignUpBtn = styled.button`
    display:block;
    width:300px;
    margin:20px auto;
    padding:15px;
    background:#979697;
    color:#fff;
    border:0;
    cursor: pointer;
`

const CreateAccountBtn = styled.button`
    background: rgb(93, 65, 234);
    //#742ECC;
    border:0;
    color:#fff;
    padding:10px;
    font-size:15px;
    width:320px;
    margin:20px auto;
    display:block;
    margin-top: 40px;
    cursor:pointer;
`