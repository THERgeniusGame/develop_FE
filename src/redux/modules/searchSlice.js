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
        console.log(payload)
        const keyword = payload.keyword;
        console.log(keyword)
        try {
            const res = await axios.get(
                process.env.REACT_APP_ENDPOINT + `/room/search?keyword=${keyword}&page=${1}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            console.log(res.data.result)
            return res.data.result
        } catch (err) {
            console.log(err)
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
            console.log(action)
            state.data = action.payload
        })
        .addCase(__search.rejected, (state, action) => {
            console.log(action)
            console.log(state)
            state.data = action.payload;
        })
    },
});


export const { search } = searchSlice.actions;
export default searchSlice.reducer;