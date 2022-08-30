import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../../serverurl";

const Auth = () => {
    const navigate = useNavigate

    const [userEmail, setUserEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [userPw, setUserPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");

    // // dp가 false면 사용 불가 (이미 사용중인 닉네임)
    // const [dpNicknameCheck, setDpNicknameCheck] = useState(false);
    // const [checkError, setCheckError] = useState(""); //띄울 메세지

    const loginCheck = () => {
      const token = window.localStorage.getItem("token");
      if (token !== null) {
        navigate("/");
      }
    };

    const [data, setData] = useState({
        email:"",
        nickname:"",
        PassWord:"",
        confirmPw:"",
    });

    const [userEmailError, setUserEmailError] = useState(false);
    const [userPwError, setUserPwError] = useState(false);
    const [confirmPwError, setConfirmPwError] = useState(false);
    const [nicknameError, setNickNameError] = useState(false);

    // const onChange = async (ev) => {
    //     const { target : { nickname, value }} = ev;
    //     setData(data => ({ ...data, [nickname]: value }))
    
    //     if (nickname == "nickname") {
    //         const nicknameCheck = await dbService
    //             .collection()
    //             .where("nickname", "==", value)
    //             .get();
    //         if (nicknameCheck.docs.length == 0 && value.length > 0) {
    //             setCheckError("사용가능한 닉네임");
    //             setDpNicknameCheck(true);
    //         }
    //         else {
    //             if (value.length != 0) setCheckError("이미 사용중인 닉네임입니다.");
    //             else setCheckError("");
    //             setDpNicknameCheck(false); // 사용 불가
                
    //         }
    //     }
    // }

    const onChangeUserEmail = (e) => {
        const userEmailRegex = 
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //a~z, 0~9, @필수, .뒤에 2,3글자 더 필요
        if (!e.target.value || userEmailRegex.test(e.target.value))
            setUserEmailError(false); //불통과
        else setUserEmailError(true); // 통과 
        setUserEmail(e.target.value);
        setData({ ...data, email: e.target.value }); //email only
        //console.log(e.target.value)
    };
    const onChangeUserNickname = (e) => {
        const NicknameRegex = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/; //특수문자 제외
        if (!e.target.value || NicknameRegex.test(e.target.value))
            setNickNameError(false);
        else setNickNameError(true);
            setNickname(e.target.value);
            setData({ ...data, nickname: e.target.value });
    };

    const onChangeUserPw = (e) => {
        const userPwRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/; //영문, 숫자 포함 8~16자
        if (!e.target.value || userPwRegex.test(e.target.value))
            setUserPwError(false); //불통과
        else setUserPwError(true);

        if (!confirmPw || e.target.value === confirmPw) // ???===???
            setConfirmPwError(false);
        else setConfirmPwError (true);
            setUserPw(e.target.value);
            setData({ ...data, password: e.target.value });
    };

    const onChangeConfirmPw = (e) => {
        //pw input 값과 동일하면 통과
        if (userPw === e.target.value) //console에는 input값이 나온다.
            setConfirmPwError(false); //불통과? 
        else setConfirmPwError(true);
            setConfirmPw(e.target.value);
    };


    const onSubmit = async (data) => {
      if (!userEmail) setUserEmailError(true);
      if (!userPw) setUserPwError(true);
      if (!confirmPw) setConfirmPwError(true);
      if (!nickname) setNickNameError(true);

      if (userEmailError) return;
      if (!userEmail || !nickname || !userPw || !confirmPw) {
          return alert("조건에 맞게 입력해주세요");
      }
      if (nicknameError) {
          return;
      }
      if (userPwError) return;
      if (confirmPwError) {
          return;
      }
     axios
         .post(`${serverUrl}/signup`, data)
         .then((res) => { 
            localStorage.setItem("token", res.data.token);
            alert("회원가입이 완료되었습니다!")
            navigate("/login")
          }
         )
         .catch((error) => {
          console.log(error);
          alert("이미 가입한 이메일입니다")
        }) 
       
        // await axios.post("http://15.164.95.144/api/signup", data).then((res) => {
        //     console.log(res);
        //     if (res.data.result === true) {
        //         navigate("/login");
        //     }
        // });
        //     console.log()
    };

    useEffect(() => {
      loginCheck();
    }, []);

    return (
        <>
        <Body>
            <Box>
                <h1>Sign Up</h1>
                <Info>
                    <Email>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={userEmail}
                            onChange={onChangeUserEmail}
                        ></input>
                        {userEmailError && (
                            <div style={{ color : "red" }}>
                                이메일 형식으로 입력해주세요.
                            </div>
                        )}
                        {/* <button>중복확인</button> */}
                    </Email>
                    <NickName>
                        <input
                            type="text"
                            name="nickname"
                            placeholder="Nickname"
                            value={nickname}
                            onChange={onChangeUserNickname}
                            minLength={2}
                            maxLength={9}
                        >
                        </input>
                        {nicknameError && (
                            <div style={{ color: "red" }}>
                                특수문자 제외 2~10자를 입력해주세요.
                            </div>
                        )}
                        {/* <button>중복확인</button> */}
                    </NickName>
                    <PassWord>
                      <input 
                          type="text"
                          name="password"
                          placeholder="PassWord"
                          value={userPw}
                          onChange={onChangeUserPw}
                          maxLength={12}
                          minLength={4}
                      ></input>
                      {userPwError && (
                          <div style={{ color: "red"}}>
                              영문/숫자 포함 8~16자를 입력해주세요.
                              <br/>
                              (특수문자 불가)
                          </div>
                      )}
                    </PassWord>
                    <PassWordConfirm>
                      <input
                          type="text"
                          name="passwordconfirm"
                          placeholder="Confirm PassWord"
                          value={confirmPw}
                          onChange={onChangeConfirmPw}
                      >
                      </input>
                      {confirmPwError && (
                          <div style={{ color: "red" }}>
                              비밀번호가 일치하지 않습니다.
                          </div>
                      )}
                    </PassWordConfirm>
                </Info> 
                <Btn>
                    <CreateAccountBtn onClick={onSubmit}>
                        Create Account
                    </CreateAccountBtn>
                    <ToLoginBtn 
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                      Do you want to Log in?
                    </ToLoginBtn>
                </Btn>
            </Box>
        </Body>
        </>
    );
};

export default Auth;

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
  background:rgba(0,0,0,0.13);
  padding:30px 0px;
  height: auto;
  width: 500px;

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
const PassWordConfirm = styled.div`
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
const NickName = styled.div`
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
    /* &:focus {
      outline: 1px solid rgb(79, 188, 238);
    } */
`
const Btn = styled.div`
    
`
const ToLoginBtn = styled.button`
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
    cursor:pointer;
`