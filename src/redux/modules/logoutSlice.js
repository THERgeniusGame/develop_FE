import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { api } from "../../shared/api";

const initialState = {
    isLoding: false,
    isLogout: false,
};

//로그아웃
export const __logout = createAsyncThunk(
    "logout",
    async (payload, thunkAPI) => {
        console.log(payload)
        try {
            const res = await api.post("/", payload); //수정
            console.log(res);

            localStorage.removeItem("token", res) // 수정
            Swal.fire({
                icon: "success",
                title: "정상적으로 로그아웃 되었습니다",
            });
            return res
        } catch (err) {
            console.log(err)
        }
    }

)

//slice
export const logoutSlice = createSlice({
    name: "logout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

        //로그아웃
        .addCase(__logout.fulfilled, (state, action) => {
            state.isLogout = true;
        })
        .addCase(__logout.rejected, (state, action) => {
            state.isLogout = false;
        })
    },
});

export const { logout } = logoutSlice.actions;
export default logoutSlice.reducer;