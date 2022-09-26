import { configureStore } from "@reduxjs/toolkit";
import getmainroom from "../modules/GetMainRoom";
import postmainroom from "../modules/PostMainRoom";
import signup from "../modules/signupSlice";
import login from "../modules/loginSlice";
import getMyPage from "../modules/myPageSlice";
import report from "../modules/reportSlice";
//useSelector용
const store = configureStore({
  reducer: { getmainroom, postmainroom, signup, login, getMyPage, report },
});

export default store;