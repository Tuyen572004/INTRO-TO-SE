import { createBrowserRouter } from "react-router-dom"
import LayoutDefault from "../components/templates/LayoutDefault";
import LoginRegister from "../components/organisms/LoginRegisterForm/LoginRegisterForm"
import Dashboard from "../components/pages/Dashboard/Dashboard"

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
				index: true,
				element: <Dashboard />
			}
		]
	}
]);