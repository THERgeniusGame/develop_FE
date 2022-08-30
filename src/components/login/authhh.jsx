import styled from "styled-components";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverUrl } from "../../serverurl";
import Swal from "sweetalert2";

const Auth = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const loginCheck = () => {
    const token = window.localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
  };

  const onSubmit = (data) => {
    axios
      .post(`${serverUrl}/signup`, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        alert("회원가입이 완료되었습니다!")
        // Swal.fire("회원가입이 완료되었습니다!", "success");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("이미 가입한 이메일입니다!")
        // Swal.fire({
        //   icon: "error",
        //   title: "이미 가입한 이메일입니다",
        // });
      });
  };

  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <SignUpContainer>
      <h2>Sign Up</h2>
      <SignUpFormContainer onSubmit={handleSubmit(onSubmit)}>
        <SignUpFormInput
          type="email"
          placeholder="E-mail"
          {...register("email", {
            required: true,
            pattern:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <p> 이메일을 입력해주세요 </p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p>올바른 이메일 형식이 아닙니다</p>
        )}

        <SignUpFormInput
          placeholder="NickName"
          {...register("nickname", {
            required: true,
            minLength: 2,
            maxLength: 10,
            pattern: /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
          })}
        />
        {errors.nickname && errors.nickname.type === "required" && (
          <p> 사용자명을 입력해주세요</p>
        )}
        {errors.nickname && errors.nickname.type === "maxLength" && (
          <p> 2~10자 입력 가능합니다.</p>
        )}
        {errors.nickname && errors.nickname.type === "pattern" && (
          <p> 특수문자 입력이 불가합니다 </p>
        )}

        <SignUpFormInput
          placeholder="PassWord"
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 16,
            pattern:
            /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <p> 비밀번호를 입력해주세요</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p> 8~16자를 입력해주세요 </p>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <p>
            {" "}
            영문, 숫자 포함하여 8~16자리 입력 가능합니다{" "}
          </p>
        )}


        <SignUpFormInput
          placeholder="Password Confirm"
          {...register("password confirm", {
            required: true,
            pattern:
                /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
          })}
        />
        {errors.cofirmpw && <p> 비밀번호가 일치하지 않습니다 </p>}

        <SignUpFormSubmit>Create Account</SignUpFormSubmit>
        <StSignUptoLogin onClick={() => navigate("/login")}>
          Do you want to Log in?
        </StSignUptoLogin>
      </SignUpFormContainer>
    </SignUpContainer>
  );
};
export default Auth;

const SignUpContainer = styled.div`
  width: 490px;
  height: 520px;
  background:rgba(0,0,0,0.13);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 25px;
  & h2 {
    color: white;
    text-align: center;
  }
`;

const SignUpFormContainer = styled.form`
  position: absolute;
  top: 120px;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;

  & p {
    color: #c75a5a;
    font-size: 12px;
    font-weight: 100;
  }
`;

const SignUpFormInput = styled.input`
  /* all: unset; */
  width: 400px;
  height: 35px;
  background:rgba(0,0,0,0.1);
  outline: none;
  border: none;
  color: rgb(108, 108, 108);
  padding: 5px;
  margin-top: auto;
  /* &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    box-shadow: 0 0 0px white inset !important;
    -webkit-text-fill-color: #adadad !important;
  } */
`;

const SignUpFormSubmit = styled.button`
  width: 410px;
  height: 40px;
  background: rgb(93, 65, 234);
  outline: none;
  border: none;
  color: white;
  padding: 5px;
  margin-top: 20px;
  cursor: pointer;
`;

const StSignUptoLogin = styled.button`
    //display:block;
    width:410px;
    margin-top: auto;
    padding:15px;
    background:#979697;
    color:#fff; border:0; 
    
    cursor: pointer;

  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;



