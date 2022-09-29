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
        console.log(payload) //payload에 값이 안들어오면 dispatch 확인하기
        try {
            //const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/login", payload); //바꾸기
            const res = await axios.post("http://localhost3000/api/user/login", payload)
            //토큰 localStorage에 저장하기
            localStorage.setItem("token", res.data)
            //(window.location.href="http://localhost:3000/")
            (window.location.href=process.env.REACT_APP_SURVER)
           //(window.location.href="http://52.78.158.219/")
            console.log(res)
            return res.data
            
            // Swal.fire({
            //     icon: "success",
            //     title: "로그인 되었습니다!",
            //   })

        } catch (err) {
            console.log(err)
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
            console.log(action)
            state.isPost = action
            state.isLogin = true;
        })
        .addCase(__login.rejected, (state, action) => {
            console.log(action)
            state.isLogin = false;
        })
        .addCase(__login.pending, (state, action) => {
            state.isLogin = false;
        })
    },
});


export const { login } = loginSlice.actions;
export default loginSlice.reducer;