import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../serverurl";
import Swal from "sweetalert2";

const initialState = {
    data: [],
    DupEmail: false, //이메일 중복확인 
    isLoading: false, 
    error: null,
    DupNickname: false,
};

//회원가입
export const __signup = createAsyncThunk(
    "signup", 
    async (payload, thunkAPI) => {
        try {
            const response = await axios.post(`${serverUrl}/api/user/signup`, payload)
            console.log(response);
            return Swal.fire("회원가입이 완료되었습니다!", "success");
            // localStorage.setItem("token", response);
           
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: "error",
                title: "이미 가입한 이메일입니다.",
            });
        };
        //alert("회원가입이 완료되었습니다!") //들어오자마자 회원가입 완료 얼럿 뜸
       
});

//이메일 중복확인
export const __checkEmail = createAsyncThunk(
    "signup/checkemail",
    async (payload, thunkAPI) => {
        console.log(payload) ///이메일 input값 
        try {
            const response = await axios.post("http://15.164.95.144/api/user/checkemail", payload)
           console.log(response)
            return true // true =>action.payload로 보내줌
        } catch (error) {
            console.log(error)
            return false // false =>action.payload로 보내줌
        }
        // console.log(response) //사용 가능한 이메일입니다
        // if (!response.data) alert("이미 가입된 이메일입니다")
        // return response.data; 
    }
);
//1. console로 response 찍어보기
//2. 내가 원하는 응답값 찾기 ex) response.data.success
//3. 그 응답값을 return 해주기 
//=>응답값을 extra reducer로 가기

//state 관리를 리듀서에서 해줌 (렌더링줄임)

//닉네임 중복확인
export const __checkNickname = createAsyncThunk(
    "signup/checknickname",
    async (payload, thunkAPI) => {
        console.log(payload)
        try {
            const response = await axios.post(`${serverUrl}/api/user/checknickname`, payload)
            console.log(response)
            //if (!response.data) alert("동일한 닉네임이 존재합니다.")
            return true; //action.payload로 감 1)
        } catch (err) {
            console.log(err)
            console.log(payload)
            return false
        }
        //중복확인 결과에 따라 alert 후 상태 저장
    }
);

//slice
export const signupSlice = createSlice({
    name: "signup", //store에 등록하는 이름
    initialState,
    reducers: {
        // //이메일 중복확인 상태 변경 (중복 확인 후 이메일 변경 시 실행)
        // changeCheckEmail: (state, action) => {
        //     state.checkEmail = false;
        // },
        // //닉네임 중복확인 상태 변경 (중복 확인 후 닉네임 변경 시 실행)
        // changeCheckNickName: (state) => {
        //     state.checkNickname = false;
        // },
    },

    extraReducers: (builder) => {
        builder
            //회원가입하기
            .addCase(__signup.fulfilled, (state, action) => {
                //회원가입 상태 저장
                state.success = action.payload;
            })

            //이메일 중복검사
            .addCase(__checkEmail.fulfilled, (state, action) => {
                console.log(action)
                state.DupEmail = action.payload; //initialstate의 checkemail값을 action.payload로 바꾼다
            })
            
            .addCase(__checkEmail.rejected, (state, action) => {
                console.log(action)
                state.DupEmail = action.payload; //action값 찍어보기(콘솔) //false
            })

            //닉네임 중복검사
            .addCase(__checkNickname.fulfilled, (state, action) => {
                console.log(action)
                //중복확인 상태 저장
                state.DupNickname = action.payload;
            })
            .addCase(__checkNickname.rejected, (state, action) => {
                console.log(action)
                state.DupNickname = action.payload;
            });

            //1. 변경해주고 싶은 state값 찾기 (state.success) => (초기값 지정 필수)
            //2. action 찍기 => action에서 내가 필요한 값 찾기 (payload)
            //3. 변경해주고 싶은 state값(=초기값)을 내가 찾은 action의 값으로 변경해주는 로직 짜기

    },
});

export const { signup } = signupSlice.actions;
export default signupSlice.reducer;