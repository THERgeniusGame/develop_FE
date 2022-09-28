import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    data: [],
    isLoading: false, 
    error: null,
    DupEmail: false,
    DupNickname: false,
    ConfirmEmail: false,
    EmailDupConfirm: false,
};

//이메일 중복확인 없애고 중복된이메일이면 경고 문구 띄우기 

//회원가입
export const __signup = createAsyncThunk(
    "signup", 
    async (payload, thunkAPI) => {
        try {
            //const response = await axios.post("http://localhost3000/api/user/signup", payload)
            const response = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/signup", payload)
            return Swal.fire("회원가입이 완료되었습니다!", "success");
           
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "이미 가입한 이메일입니다.",
            });
        };
});

// 이메일 인증 & 중복확인 통합
export const __emailCheckConfirm = createAsyncThunk(
    "EMAIL_CHECK_CONFIRM",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/mail", payload)
            return res.status
        } catch (err) {
            return err
        }
    }
)

//닉네임 중복확인
export const __checkNickname = createAsyncThunk(
    "signup/checknickname",
    async (payload, thunkAPI) => {
        try {
            //const response = await axios.post("http://localhost3000/api/user/checknickname", payload)
            const response = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/checknickname", payload)
            return true;
        } catch (err) {
            return false
        }
        //중복확인 결과에 따라 alert 후 상태 저장
    }
);


//slice
export const signupSlice = createSlice({
    name: "signup", //store에 등록하는 이름
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            //회원가입하기
            .addCase(__signup.fulfilled, (state, action) => {
                //회원가입 상태 저장
                state.success = action.payload;
            })
            
            //닉네임 중복검사
            .addCase(__checkNickname.fulfilled, (state, action) => {
                //중복확인 상태 저장
                state.DupNickname = action.payload;
            })
            .addCase(__checkNickname.rejected, (state, action) => {
                state.DupNickname = action.payload;
            })
            
            // 이메일 중복검사 & 인증메일 발송 통합
            .addCase(__emailCheckConfirm.fulfilled, (state, action) => {
                state.EmailDupConfirm = action.payload
            })
            .addCase(__emailCheckConfirm.rejected, (state, action) => {
                state.EmailDupConfirm = action.payload
            })
    },
});

export const { signup } = signupSlice.actions;
export default signupSlice.reducer;