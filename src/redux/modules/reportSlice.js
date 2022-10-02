import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    error: null,
    isLogin: false,
    getReport: [],
    getReportList: [],
    getAnswer: [],
};

const token = localStorage.getItem("token");


// GET 신고목록 리스트 ( 신고 메인페이지 )
export const __getReportList = createAsyncThunk(
    "GET_REPORT_LIST",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.get(process.env.REACT_APP_ENDPOINT + `/report?page=${payload}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return res.data.reportList
        } catch (err) {
            return err
        }
    });

// GET 신고상세 per page ( 신고 상세페이지 )
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
            return res.data
        } catch (err) {
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
            return res.data
        } catch (err) {
            return err
        }
    });


// POST 신고하기 ( 신고페이지 메인페이지)
export const __postReport = createAsyncThunk(
    "POST_REPORT",
    async (payload, thunkAPI) => {
        try {
            const res = await axios.post(process.env.REACT_APP_ENDPOINT + "/report", payload,
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


// 신고 수정 ( 신고 상세페이지 )
export const __EditReport = createAsyncThunk(
    "report/editReport",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.put(process.env.REACT_APP_ENDPOINT + `/report/${payload.reportId}`, { reportId: payload.reportId, reportTitle: payload.reportTitle, reportContent: payload.reportContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((res) => {
            })
        } catch (err) {
            return err
        }
    });

// 신고 삭제 ( 신고 상세페이지 )
export const __deleteReport = createAsyncThunk(
    "report/deleteReport",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.delete(process.env.REACT_APP_ENDPOINT + `/report/${payload}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((res) => {
            })
        } catch (err) {
            return err
        }
    });

// 신고 댓글 수정 ( 신고 상세페이지 )
export const __EditReportContent = createAsyncThunk(
    "report/editReportContent",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.put(process.env.REACT_APP_ENDPOINT + `/report/${payload.reportId}/comment`, { commentContent:payload.commentContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            ).then((res) => {
            })
        } catch (err) {
            return err
        }
    });


// 신고 댓글 작성 ( 신고 상세페이지 )
export const __PostReportContent = createAsyncThunk(
    "report/postReportContent",
    async (payload, thunkAPI) => {
        try {
            const data = await axios.post(process.env.REACT_APP_ENDPOINT + `/report/${payload.reportId}/comment`, { commentContent:payload.commentContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (err) {
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
                state.getReportList = action.payload
            })
            .addCase(__getReportList.rejected, (state, action) => {
            })
            .addCase(__getReportList.pending, (state, action) => {

            })

            // GET 신고 상세페이지 content
            .addCase(__getReport.fulfilled, (state, action) => {
                state.getReport = action.payload
            })
            .addCase(__getReport.rejected, (state, action) => {

            })

            // GET 신고 상세페이지 answer
            .addCase(__getAnswer.fulfilled, (state, action) => {
                state.getAnswer = action.payload
            })
            .addCase(__getAnswer.rejected, (state, action) => {
            })

            // POST 신고목록 ( 신고페이지 )
            .addCase(__postReport.fulfilled, (state, action) => {
                state = action
            })
            .addCase(__postReport.rejected, (state, action) => {

            })
            // 리포트 수정
            .addCase(__EditReport.fulfilled, (state, action) => {
            })
            .addCase(__EditReport.rejected, (state, action) => {

            })
            // 리포트 삭제
            .addCase(__deleteReport.fulfilled, (state, action) => {
            })
            .addCase(__deleteReport.rejected, (state, action) => {

            })
            // 리포트 댓글 삭제
            .addCase(__EditReportContent.fulfilled, (state, action) => {
            })
            .addCase(__EditReportContent.rejected, (state, action) => {

            })
            // 리포트 댓글 작성
            .addCase(__PostReportContent.fulfilled, (state, action) => {
            })
            .addCase(__PostReportContent.rejected, (state, action) => {

            })
    },
});


export const { report } = reportSlice.actions;
export default reportSlice.reducer;