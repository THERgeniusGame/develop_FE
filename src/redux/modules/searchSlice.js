import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    error: null,
    data: [],
};

const token = localStorage.getItem("token");


export const __search = createAsyncThunk(
    "SEARCH", 
    async (payload, thunkAPI) => {
        const keyword = payload.input.keyword;
        const page = payload.page.page;
        try {
            const res = await axios.get(
                process.env.REACT_APP_ENDPOINT + `/room/search?keyword=${keyword}&page=${page}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                
            )
            console.log(res.data)
            return res.data
        } catch (err) {
            return err
        }
    });

//slice
export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
 
        .addCase(__search.fulfilled, (state, action) => {
            console.log(action.payload)
            state.data = action.payload
            console.log(action.payload.resultNum)
        })
        .addCase(__search.rejected, (state, action) => {
            state.data = action.payload;
        })


    },
});


export const { search } = searchSlice.actions;
export default searchSlice.reducer;