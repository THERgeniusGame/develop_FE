import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  Dup: [],
  data: [],
  isLoading: false, //
  error: null, //
};

const token = localStorage.getItem("token");

export const __SendDup = createAsyncThunk(
  "editpw/sendDup",
  async (payload, api) => {
    try {
      const data = await axios.post(
        process.env.REACT_APP_ENDPOINT + `/findPw`, {email:payload},
      )
      return data;
    } catch (e) {
      return api.rejectWithValue(e);
    }
  }
);

export const __EditPw = createAsyncThunk(
  "editpw/editPw",
  async (payload, api) => {
    const email = payload.email;
    const emailConfirm = payload.emailConFirm;
    const password = payload.password;
    const confirmPw = payload.confirmPw;
    
    try {
      const data = await axios.patch(
        process.env.REACT_APP_ENDPOINT + `/user/changePw`, {email, emailConfirm, password, confirmPw},
      )
      return data;
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
    [__SendDup.pending]: (state) => {
      state.isLoading = true; //
    },
    [__SendDup.fulfilled]: (state, action) => {
      state.Dup = action.payload;
    },
    [__SendDup.rejected]: (state, action) => {
    },
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
