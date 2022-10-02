import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    error: null,
    isRendering: [],
    myRank: {},
    allRank: [],
    user: [],
};

const token = localStorage.getItem("token");

// 전체 랭킹 get
export const __getMyPage = createAsyncThunk(
    "GET_ALL_RANK",
    async (thunkAPI) => {
        try {
            const res = await axios.get(process.env.REACT_APP_ENDPOINT + "/rank/list",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data

        } catch (err) {
            return err
        }
    });

// 마이 랭킹 get
export const __getMyRank = createAsyncThunk(
    "GET_MY_RANK",
    async (thunkAPI) => {
        try {
            const res = await axios.get(process.env.REACT_APP_ENDPOINT + "/rank/my",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data
        } catch (err) {
            if (err.response.data === "jwt expired") {
                Swal.fire({ title: '로그인 시간이 만료되었습니다.', timer: 1500, confirmButtonColor: "black" });
                localStorage.removeItem("token");
                window.location.replace("/login");
            }
            return err
        }
    });


//slice
export const myPageSlice = createSlice({
    name: "getMyPage",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

        //전체 랭킹 조회
        .addCase(__getMyPage.fulfilled, (state, action) => {
            //state.allRank = [...action.payload];
            state.allRank = action.payload;
        })
        .addCase(__getMyPage.rejected, (state, action) => {
            state.allRank = action.payload;
        })
        .addCase(__getMyPage.pending, (state, action) => {
            //state.data = action.payload;
        })

        //마이 랭킹 조회
        .addCase(__getMyRank.fulfilled, (state, action) => {
            state.myRank = action.payload;
        })
        .addCase(__getMyRank.rejected, (state, action) => {
            state.myRank = action.payload;
        })
    },
});


export const { getMyPage } = myPageSlice.actions;
export default myPageSlice.reducer;