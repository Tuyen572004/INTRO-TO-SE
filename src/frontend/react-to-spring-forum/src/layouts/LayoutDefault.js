import { Outlet } from "react-router-dom";

const LayoutDefault = () => {
	return <div>
		<h1>LayoutDefault</h1>
		<Outlet />
	</div>
};

export default LayoutDefault;