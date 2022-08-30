import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false, //
  error: null, //
};

// const token = localStorage.getItem("token");

export const __PostMainRoom = createAsyncThunk(
  "postmainroom/postMainroom",
  async (payload, api) => {
    try {
      const data = await axios.post(
        process.env.REACT_APP_SURVER + `/api/room`, payload,
        {
          headers: {
            authorization: process.env.REACT_APP_TOKENNAME + " "+process.env.REACT_APP_TOKEN,
          }
        }
      );
      console.log(data)
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

const postMainRoomSilce = createSlice({
  name: "postmainroom",
  initialState,
  reducers: {},
  extraReducers: {
    [__PostMainRoom.pending]: (state) => {
      state.isLoading = true; //
    },
    [__PostMainRoom.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__PostMainRoom.rejected]: (state, action) => {
    },
  },
});

export const { } = postMainRoomSilce.actions;
export default postMainRoomSilce.reducer;
