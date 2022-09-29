import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    isLoading: false,
    error: null,
};

const token = localStorage.getItem("token");
export const __GetMainRoom = createAsyncThunk(
    "getmainroom/getMainroom",
    async (payload, api) => {
        try {
            const response = await axios.get(
                process.env.REACT_APP_ENDPOINT + `/room?page=${payload}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
                )
            return api.fulfillWithValue(response.data.roomsInfo);
        } catch (e) {
            return api.rejectWithValue(e);
        }
    }
);

const getMainRoomSlice = createSlice({
    name: "getmainroom",
    initialState,
    reducers: {},
    extraReducers: {
        [__GetMainRoom.pending]: (state) => {
            state.isLoading = true; //
        },
        [__GetMainRoom.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [__GetMainRoom.rejected]: (state, action) => {
        },
    },
});

export const { } = getMainRoomSlice.actions;
export default getMainRoomSlice.reducer;

