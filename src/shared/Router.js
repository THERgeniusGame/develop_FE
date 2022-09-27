import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Room from "../pages/Room"
import MyPage from "../pages/MyPage";
import ReportList from "../pages/ReportList";
import UserReport from "../pages/WriteReport";
import ReportContent from "../pages/ReportContent";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/room/:roomId" element={<Room />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/report" element={<ReportList />} />
      <Route path="/report/user" element={<UserReport />} />
      <Route path="/report/:reportId" element={<ReportContent />} />
    </Routes>
  );
};

export default Router;