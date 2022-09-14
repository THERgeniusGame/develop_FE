import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    isLoading: false,
    error: null,
    data: [],
    isPost: [],
};

//로그인
export const __login = createAsyncThunk(
    "login", 
    async (payload, thunkAPI) => {
        console.log(payload) //payload에 값이 안들어오면 dispatch 확인하기
        try {
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/login", payload);
            //토큰 localStorage에 저장하기
            localStorage.setItem("token", res.data)
            console.log(res);
            //로그인 상태 값 true, false
            return res.data
        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "이메일, 비밀번호가 일치하지 않습니다",
            });
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
            state.isLoading = false;
            state.isPost = action
        })
        .addCase(__login.rejected, (state, action) => {
            console.log(action)
            state.isLoading = false;
        })
        .addCase(__login.pending, (state, action) => {
            state.isLoading = true;
        })
    },
});


export const { login } = loginSlice.actions;
export default loginSlice.reducer;