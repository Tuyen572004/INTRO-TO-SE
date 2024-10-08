import { createBrowserRouter } from "react-router-dom"
import LayoutDefault from "../layouts/LayoutDefault";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

export const router = createBrowserRouter([
	{
		path: "login",
		index: true,
		element: <Login />
	}
	,
	{
		path: "/",
		element: <LayoutDefault />,
		children: [
			{
				index: true,
				element: <Dashboard />
			}
		]
	}
]);