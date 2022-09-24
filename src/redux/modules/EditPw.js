import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false, //
  error: null, //
};

const token = localStorage.getItem("token");

export const __EditPw = createAsyncThunk(
  "editpw/editPw",
  async (payload, api) => {
    try {
      const data = await axios.post(
        process.env.REACT_APP_ENDPOINT + `/findPw`, {email:payload},
      )
      return data.data;
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

const editPwSilce = createSlice({
  name: "editpw",
  initialState,
  reducers: {},
  extraReducers: {
    [__EditPw.pending]: (state) => {
      state.isLoading = true; //
    },
    [__EditPw.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
    [__EditPw.rejected]: (state, action) => {
    },
  },
});

export const { } = editPwSilce.actions;
export default editPwSilce.reducer;
