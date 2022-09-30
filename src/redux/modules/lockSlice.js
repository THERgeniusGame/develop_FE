import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    isLoading: false, 
    error: null,
    lock: [],
    unLock: [],
};

const token = localStorage.getItem("token");

//공개방
export const __unLock = createAsyncThunk(
    "UNLOCK", 
    async (payload, thunkAPI) => {
        try {
            const res = await axios.get(process.env.REACT_APP_ENDPOINT + `/room/unlock?page=${payload}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            return res.data
        } catch (err) {
            return err;
        };
});

//비공개방
export const __lock = createAsyncThunk(
    "LOCK", 
    async (payload, thunkAPI) => {
        try {
            const res = await axios.get(process.env.REACT_APP_ENDPOINT + `/room/lock?page=${payload}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
           return res.data
        } catch (err) {
            return err;
        };
});

//slice
export const lockSlice = createSlice({
    name: "lock",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // 공개방
            .addCase(__unLock.fulfilled, (state, action) => {
                state.unLock = action.payload;
            })
            .addCase(__unLock.rejected, (state, action) => {
                state.unLock = action.payload;
            })
            
            // 비공개방
            .addCase(__lock.fulfilled, (state, action) => {
                state.lock= action.payload;
            })
            .addCase(__lock.rejected, (state, action) => {
                state.lock = action.payload;
            })
    },
});

export const { lock } = lockSlice.actions;
export default lockSlice.reducer;