import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    error: null,
    data: [],
    isPost: [],
    isLogin: false,
    modal: false
};

//로그인
export const __login = createAsyncThunk(
    "login",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/login", payload)
                .then((data) => {
                    localStorage.setItem("token", data.data);
                    window.location.replace("/");
                });
            return res.data
        } catch (err) {
            if (err.response.data === "Check-EmailorPw") {
                Swal.fire({ title: '이메일 또는 패스워드를 확인해주세요.', timer: 1500, confirmButtonColor: "black" });
            }
            return err
        }
    });


// 카카오 가입 체크
export const __kakaoCheck = createAsyncThunk(
    "login/kakaoCheck",
    async (payload, thunkAPI) => {
        try {
            //가입 o - 로그인
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/kakaouser", { email: payload.email }).then((data) => {
                if (data.data === "Exist-User") {
                    try {
                        //로그인 요청
                        const res = axios.post(process.env.REACT_APP_ENDPOINT + "/user/kakao", { kakao: true, email: payload.email, password: payload.password }).then((data) => {
                            localStorage.setItem("token", data.data);
                            window.location.replace("/");
                        });
                        return res.data
                    } catch (err) {
                        //로그인 실패
                        Swal.fire({ title: "로그인에 실패했습니다.", timer: 1500, confirmButtonColor: "black" })
                        return thunkAPI.rejectWithValue(err);
                    }
                } else if (data.data === "Email-signer") {
                    Swal.fire({ title: "이미 사용중인 이메일입니다.", timer: 1500, confirmButtonColor: "black" })
                }
            })
        } catch (err) {
            //가입 x - 이메일 중복 확인 & 모달
            if (err.response.data === "Email-signer") {
                Swal.fire({ title: "이미 사용중인 이메일입니다.", timer: 1500, confirmButtonColor: "black" })
            } else {
                return thunkAPI.rejectWithValue(err);
            }
        }
    });


// 카카오 회원가입
export const __kakaoLogin = createAsyncThunk(
    "login/kakaoLogin",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/kakao", { email: payload.email, nickname:payload.nickname ,password: payload.password }).then((data) => {
                localStorage.setItem("token", data.data);
                window.location.replace("/");
            });
            return res.data
        } catch (err) {
            if (err.response.data === "Email-signer") {
                Swal.fire({ title: "이미 사용중인 이메일입니다.", timer: 1500, confirmButtonColor: "black" })
            } else if (err.response.data === "Exist-Nickname") {
                Swal.fire({ title: "이미 사용중인 닉네임입니다.", timer: 1500, confirmButtonColor: "black" })
            }
            return thunkAPI.rejectWithValue(err);
        }
    });

//slice
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

            //로그인 
            .addCase(__login.fulfilled, (state, action) => {
                state.isPost = action
                state.isLogin = true;
            })
            .addCase(__login.rejected, (state, action) => {
                state.isLogin = false;
            })
            .addCase(__login.pending, (state, action) => {
                state.isLogin = false;
            })
            //카카오 가입 체큰
            .addCase(__kakaoCheck.fulfilled, (state, action) => {

            })
            .addCase(__kakaoCheck.rejected, (state, action) => {
                state.modal = true;
            })
            .addCase(__kakaoCheck.pending, (state, action) => {

            })
            //카카오 로그인 
            .addCase(__kakaoLogin.fulfilled, (state, action) => {

            })
            .addCase(__kakaoLogin.rejected, (state, action) => {

            })
            .addCase(__kakaoLogin.pending, (state, action) => {

            })
    },
});


export const { login } = loginSlice.actions;
export default loginSlice.reducer;