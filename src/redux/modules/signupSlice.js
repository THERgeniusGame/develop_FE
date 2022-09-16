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
};

//회원가입
export const __signup = createAsyncThunk(
    "signup", 
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/signup", payload)
            // console.log(response);
            return Swal.fire("회원가입이 완료되었습니다!", "success");
            // localStorage.setItem("token", response);
           
        } catch (err) {
            // console.log(err);
            Swal.fire({
                icon: "error",
                title: "이미 가입한 이메일입니다.",
            });
        };
});

//이메일 중복확인
export const __checkEmail = createAsyncThunk(
    "signup/checkemail",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(process.env.REACT_APP_ENDPOINT +"/user/checkemail", payload)
        //    console.log(response)
            return true
        } catch (error) {
            // console.log(error)
            return false
        }
    }
);


//이메일 인증
export const __confirmEmail = createAsyncThunk(
    "signup/confirmemail",
     async (payload, thunkAPI) => {
        try {
            // console.log(payload)
                const response = await axios.post(process.env.REACT_APP_ENDPOINT + "/mail/", payload)
                return response.data
        }
        catch (err) {
            // console.log(err)
            return err
        }
    }
)

//닉네임 중복확인
export const __checkNickname = createAsyncThunk(
    "signup/checknickname",
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(process.env.REACT_APP_ENDPOINT + "/user/checknickname", payload)
            // console.log(response) //
            return true;
        } catch (err) {
            // console.log(err)
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

            //이메일 중복검사
            .addCase(__checkEmail.fulfilled, (state, action) => {
                state.DupEmail = action.payload; //initialstate의 checkemail값을 action.payload로 바꾼다
            })
            
            .addCase(__checkEmail.rejected, (state, action) => {
                // console.log(action)
                state.DupEmail = action.payload; //action값 찍어보기(콘솔) //false
            })

            //닉네임 중복검사
            .addCase(__checkNickname.fulfilled, (state, action) => {
                // console.log(action)
                //중복확인 상태 저장
                state.DupNickname = action.payload;
            })
            .addCase(__checkNickname.rejected, (state, action) => {
                // console.log(action)
                state.DupNickname = action.payload;
            })

            //이메일 인증
            .addCase(__confirmEmail.fulfilled, (state, action) => {
                // console.log(action) 
                state.ConfirmEmail = action.payload
            })
            .addCase(__confirmEmail.rejected, (state, action) => {
                // console.log(action)
                state.ConfirmEmail = action.payload
            })
    },
});

export const { signup } = signupSlice.actions;
export default signupSlice.reducer;