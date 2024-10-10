import { Outlet } from "react-router-dom";
import NavigationBar from "../molecules/NavigationBar/NavigationBar"
import Newsfeed from "../organisms/Newsfeed/Newfeeds"
import PostButton from "../atoms/PostButton/PostButton"
import Header from "../atoms/Header/Header";
import NewPost from "../atoms/NewPost/NewPost";
import PostPopup from "../atoms/PostPopup/PostPopup";

const LayoutDefault = () => {
	return <div className="d-flex justify-content-between">
		<PostPopup />
		<div className="col-1">		<NavigationBar />
		</div>
		<div className="col-5 d-flex justify-content-center flex-column" >
			<Header />
			<Newsfeed>
				<NewPost />
			</Newsfeed>
		</div>
		<div className="col-1">
			<PostButton />
		</div>
		<Outlet />
	</div>
};


export default LayoutDefault;