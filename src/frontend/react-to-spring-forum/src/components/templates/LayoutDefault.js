import { Outlet } from "react-router-dom";
import NavigationBar from "../molecules/NavigationBar/NavigationBar";
import Newsfeed from "../organisms/Newsfeed/Newfeeds";
import PostButton from "../atoms/PostButton/PostButton";
import Header from "../atoms/Header/Header";
import PostForm from "../molecules/PostForm/PostForm";
import { useState } from "react";

const LayoutDefault = () => {
	const [isPostPopup, setIsPostPopup] = useState(false);

	const toggleIsPostPopup = () => {
		setIsPostPopup(!isPostPopup);
		console.log(isPostPopup);
	};

	return (
		<div className="d-flex justify-content-between">
			<div className="col-1">
				<NavigationBar toggleIsPostPopup={toggleIsPostPopup} />
			</div>
			<div className="col-5 d-flex justify-content-center flex-column">
				<Header />
				<Newsfeed>
					<Outlet context={{ toggleIsPostPopup }} />
				</Newsfeed>
			</div>
			<div className="col-1">
				<PostButton toggleIsPostPopup={toggleIsPostPopup} />
			</div>
			{isPostPopup && <PostForm toggleIsPostPopup={toggleIsPostPopup} />}
		</div>
	);
};

export default LayoutDefault;
