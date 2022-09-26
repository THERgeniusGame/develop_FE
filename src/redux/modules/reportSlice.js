import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
    error: null,
    isLogin: false,
    getReport: [],
};

const token = localStorage.getItem("token");


// GET 신고목록 리스트 ( 신고 메인페이지 )
export const __getReportList = createAsyncThunk(
    "GET_REPORT_LIST", 
    async (thunkAPI) => {
        try {
            const res = await axios.get(process.env.REACT_APP_ENDPOINT + "/report",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            //console.log(res.data.reportList)
            return res.data.reportList
        } catch (err) {
            //console.log(err)
            return err
        }
    });

// GET 신고목록 per page ( 신고 상세페이지 )
export const __getReport = createAsyncThunk(
    "GET_REPORT_PAGE",
    async (reportId, thunkAP) => {
        try {
            const res = await axios.get(process.env.REACT_APP_ENDPOINT + `/report/${reportId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            //console.log(res.data)
            return res.data
        } catch (err) {
            //console.log(err)
            return err
        }
    });

// GET 신고답변 per page ( 신고 상세페이지 )
export const __getAnswer = createAsyncThunk(
    "GET_REPORT_ANSWER", 
    async (reportId, thunkAPI) => {
        try {
            const res = await axios.get(process.env.REACT_APP_ENDPOINT + `/report/${reportId}/comment`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res)
            return res.data
        } catch (err) {
            console.log(err)
            return err
        }
    });


// POST 신고목록 ( 신고페이지 )
export const __postReport = createAsyncThunk(
    "POST_REPORT", 
    async (payload, thunkAPI) => {
        console.log(payload) //payload에 값이 안들어오면 dispatch 확인하기
        try {
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/report", payload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            console.log(res.data)
            return res.data
        } catch (err) {
            console.log(err)
            return err
        }
    });


//slice
export const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder

        // GET 신고목록 (신고 메인페이지)
        .addCase(__getReportList.fulfilled, (state, action) => {
            //console.log(action.payload)
            state.getReport = action.payload
        })
        .addCase(__getReportList.rejected, (state, action) => {
            //console.log(action)

        })
        .addCase(__getReportList.pending, (state, action) => {

        })

        // GET 신고 상세페이지 content
        .addCase(__getReport.fulfilled, (state, action) => {
            console.log(action)
            state.getReport = action.payload
        })
        .addCase(__getReport.rejected, (state, action) => {
            console.log(action)

        })

        // GET 신고 상세페이지 answer
        .addCase(__getAnswer.fulfilled, (state, action) => {
            console.log(action)
            state.getReport = action.payload
        })
        .addCase(__getAnswer.rejected, (state, action) => {
            console.log(action)
        })
        
        // POST 신고목록 ( 신고페이지 )
        .addCase(__postReport.fulfilled, (state, action) => {
            console.log(action)
            state = action
        })
        .addCase(__postReport.rejected, (state, action) => {
            console.log(action)

        })

        
    },
});


export const { report } = reportSlice.actions;
export default reportSlice.reducer;