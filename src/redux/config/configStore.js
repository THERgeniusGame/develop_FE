import { configureStore } from "@reduxjs/toolkit";
import getmainroom from "../modules/GetMainRoom";
import postmainroom from "../modules/PostMainRoom";
import signup from "../modules/signupSlice";
import login from "../modules/loginSlice";
import editpw from "../modules/EditPwSlice"
import getMyPage from "../modules/myPageSlice";
import report from "../modules/reportSlice";
import search from "../modules/searchSlice";
import lock from "../modules/lockSlice";

const store = configureStore({
  reducer: { getmainroom, postmainroom, signup, login, editpw, getMyPage, report, search, lock },
});

export default store;