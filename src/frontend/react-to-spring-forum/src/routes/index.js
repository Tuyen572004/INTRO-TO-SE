import { createBrowserRouter } from "react-router-dom"
import LayoutDefault from "../components/templates/LayoutDefault";
import LoginRegister from "../components/pages/LoginRegister/LoginRegister";
import Dashboard from "../components/pages/Dashboard/Dashboard"
import User from "../components/pages/User/User";
import Activity from "../components/pages/Activity/Activity";
import Search from "../components/pages/Search/Search";

export const router = createBrowserRouter([
	{
		path: "login",
		index: true,
		element: <LoginRegister />
	}
	,
	{
		path: "/",
		element: <LayoutDefault />,
		children: [
			{
				path: "/",
				element: <Dashboard />
			},
			{
				path: "user",
				element: <User />
			},
			{
				path: "activity",
				element: <Activity />
			},
			{
				path: "search",
				element: <Search />
			}
		]
	},
	{
		path: "*",
		element: <h1>404 NOT FOUND</h1>
	}
]);