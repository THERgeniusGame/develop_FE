import { configureStore } from "@reduxjs/toolkit";
import getmainroom from "../modules/GetMainRoom";
import postmainroom from "../modules/PostMainRoom";
import signup from "../modules/signupSlice";
import login from "../modules/loginSlice";
import editpw from "../modules/EditPw"

const store = configureStore({
  reducer: { getmainroom, postmainroom, signup, login, editpw },
});

export default store;