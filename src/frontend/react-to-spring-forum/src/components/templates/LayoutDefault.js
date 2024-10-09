import { Outlet } from "react-router-dom";
import NavigationBar from "../molecules/NavigationBar/NavigationBar"
import Newsfeed from "../organisms/Newsfeed/Newfeeds"
import PostButton from "../atoms/PostButton/PostButton"
import Header from "../atoms/Header/Header";

const LayoutDefault = () => {
	return <div className="d-flex justify-content-between">
		<div className="col-1">		<NavigationBar />
		</div>
		<div className="col-6 d-flex justify-content-center flex-column" >
			<Header />
			<Newsfeed />
		</div>
		<div className="col-2">
			<PostButton />
		</div>
		<Outlet />
	</div>
};


export default LayoutDefault;