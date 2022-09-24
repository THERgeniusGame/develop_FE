import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Room from "../pages/Room"
import EditPw from "../pages/EditPw";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/editpassword" element={<EditPw />} />
    </Routes>
  );
};

export default Router;