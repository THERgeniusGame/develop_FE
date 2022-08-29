import { configureStore } from "@reduxjs/toolkit";
import getmainroom from "../modules/GetMainRoom";
import postmainroom from "../modules/PostMainRoom";

const store = configureStore({
  reducer: { getmainroom, postmainroom },
});

export default store;