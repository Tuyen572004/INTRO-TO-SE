import LayoutDefault from "./components/templates/LayoutDefault";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import User from "./components/pages/User/User";
import Activity from "./components/pages/Activity/Activity";
import Search from "./components/pages/Search/Search";
import LoginRegister from "./components/pages/LoginRegister/LoginRegister";
import VerificationSuccess from "./components/pages/Verification/VerificationSuccess";
import VerificationFailed from "./components/pages/Verification/VerificationFailed";
import Message from "./components/pages/Message/Message";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./index.css"
import useTokenRefresher from './hooks/useTokenRefresher';

const AuthorizedRoutes = () => {
  const authorized = localStorage.getItem("accessToken")?.length > 0;

  if (authorized) return <Navigate to="/" replace={true} />;
  return <Outlet />;
}
const App = () => {
  useTokenRefresher();
  return (
    <Routes>
      <Route element={<AuthorizedRoutes />}>
        <Route path="login" element={<LoginRegister />} />
      </Route>
      <Route path="verification-success" element={<VerificationSuccess />} />
      <Route path="verification-failed" element={<VerificationFailed />} />
      <Route path="message" element={<Message />} />
      <Route path="/" element={<LayoutDefault />}>
        <Route index element={<Dashboard />} />
        <Route path="user" element={<User />} />
        <Route path="activity" element={<Activity />} />
        <Route path="search" element={<Search />} />
      </Route>
      <Route path="*" element={<h1>404 NOT FOUND</h1>} />
    </Routes>
  );
};


export default App;