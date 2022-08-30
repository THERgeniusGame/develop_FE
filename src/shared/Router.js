import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
    </Routes>
  );
};

export default Router;