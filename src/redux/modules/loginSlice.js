import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverurl";
//import { api } from "../../shared/api";
import Swal from "sweetalert2";

const initialState = {
    isLoading: false, //
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
            const res = await axios.post(`${serverUrl}/api/user/login`, payload);
            console.log(res); //res.data = 토큰 값?
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

// // 재 접속시 토큰 유효기간 확인
// export const __checkToken = createAsyncThunk(
//     "checkToken",
//     async (payload, thunkAPI) => {
//         const response = await axios.get("/");
//         //상태값 true / false
//         return response.data;
//     }
// );

//slice
export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        // //로그아웃 시 상태값 초기화
        // logOutUSer: (state, payload) => {
        //     state.user = { nickName: "", result: false };
        // },
    },

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
            
        // //토큰 확인하기
        // .addCase(__checkToken.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.user = action.payload;
        // })
        // .addCase(__checkToken.rejected, (state, action) => {
        //     state.isLoading = false;
        // })
        // .addCase(__checkToken.pending, (state, action) => {
        //     state.isLoading = true;
        // });


        // [__signup.pending]: (state) => {
        //     state.isLoading = true; //
        // },
        // [__signup.fulfilled]: (state, action) => {
        //     console.log(action)
        //     state.data = action.payload;
            
        // },
        // [__signup.rejected]: (state, action) => {
        // },
    },
});


export const { login } = loginSlice.actions;
export default loginSlice.reducer;