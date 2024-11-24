import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../components/templates/LayoutDefault";
import LoginRegister from "../components/pages/LoginRegister/LoginRegister";
import Dashboard from "../components/pages/Dashboard/Dashboard";
import User from "../components/pages/User/User";
import Activity from "../components/pages/Activity/Activity";
import Search from "../components/pages/Search/Search";
import VerificationSuccess from "../components/pages/Verification/VerificationSuccess";
import VerificationFailed from "../components/pages/Verification/VerificationFailed";
import Admin from "../components/pages/Admin/Admin";
import ViolatingPostList from "../components/pages/Admin/ViolatingPost/ViolatingPost";
import ViolatingUserList from "../components/pages/Admin/ViolatingUser/ViolatingUser";
import AdminDashboard from "../components/pages/Admin/AdminDashboard/AdminDashboard";
import Message from "../components/pages/Message/Message";

export const router = createBrowserRouter([
	{
		path: "login",
		element: <LoginRegister />,
	},
	{
		path: "verification-success",
		element: <VerificationSuccess />,
	},
	{
		path: "verification-failed",
		element: <VerificationFailed />,
	},
	{
		path: "message",
		element: <Message />
	},
	{
		path: "/",
		element: <LayoutDefault />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "user",
				element: <User />,
			},
			{
				path: "activity",
				element: <Activity />,
			},
			{
				path: "search",
				element: <Search />,
			},
			{
				path: "admin",
				element: <Admin />,
				children: [
					{
						path: "",
						element: <AdminDashboard />,
					},
					{
						path: "violating-users",
						element: <ViolatingUserList />,
					},
					{
						path: "violating-posts",
						element: <ViolatingPostList />,
					}
				]
			}
		],
	},
	{
		path: "*",
		element: <h1>404 NOT FOUND</h1>,
	},
]);