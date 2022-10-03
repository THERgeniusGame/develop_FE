import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    error: null,
    lockNum: null,
    result: [],
    roomNum: null,
    unlockNum: null,
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
                console.log(response.data.roomsInfo)
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
            state.result = action.payload.result;
            state.lockNum = action.payload.lockNum;
            state.unlockNum = action.payload.unlockNum;
            state.roomNum = action.payload.roomNum;
            console.log(action.payload.result)
        },
        [__GetMainRoom.rejected]: (state, action) => {
        },
    },
});

export const { } = getMainRoomSlice.actions;
export default getMainRoomSlice.reducer;

