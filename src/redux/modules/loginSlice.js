import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    error: null,
    data: [],
    isPost: [],
    isLogin: false,
};

//로그인
export const __login = createAsyncThunk(
    "login",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/login", payload).then((data)=>{
                localStorage.setItem("token", data.data);
                window.location.replace("/");
            });

            return res.data
        } catch (err) {
            return err
        }
    });


// 카카오 로그인
export const __kakaoLogin = createAsyncThunk(
    "login/kakoLogin",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/kakao", {kakao:"true", email:payload.email, nickname:payload.nickname, password:payload.password}).then((data)=>{
                localStorage.setItem("token", data.data);
                window.location.replace("/");
            });
            return res.data
        } catch (err) {
            // Swal.fire({
            //     icon: "error",
            //     title: "이메일, 비밀번호가 일치하지 않습니다",
            // });
            return err
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
            //카카오 로그인 
            .addCase(__kakaoLogin.fulfilled, (state, action) => {
                state.isPost = action
                state.isLogin = true;
            })
            .addCase(__kakaoLogin.rejected, (state, action) => {
                state.isLogin = false;
            })
            .addCase(__kakaoLogin.pending, (state, action) => {
                state.isLogin = false;
            })
    },
});


export const { login } = loginSlice.actions;
export default loginSlice.reducer;