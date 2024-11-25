import { Outlet } from "react-router-dom";
import NavigationBar from "../molecules/NavigationBar/NavigationBar";
import Newsfeed from "../organisms/Newsfeed/Newfeeds";
import MessageButton from "../atoms/MessageButton/MessageButton";
import Header from "../atoms/Header/Header";
import PostForm from "../molecules/PostForm/PostForm";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MessageWindow from "../organisms/MessageWindow/MessageWindow";
const LayoutDefault = () => {
	const [isPostPopup, setIsPostPopup] = useState(false);
	const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);

	const toggleIsPostPopup = () => {
		setIsPostPopup(!isPostPopup);
	};
	const toggleIsMessageWindowOpen = () => {
		setIsMessageWindowOpen(!isMessageWindowOpen);
	};

	return (
		<div className="d-flex justify-content-between">
			<div className="col-1">
				<NavigationBar toggleIsPostPopup={toggleIsPostPopup} />
			</div>
			<div className="col-10 d-flex justify-content-center flex-column">
				<div className="d-flex justify-content-center">
					<Header />
				</div>
				<div className="d-flex justify-content-center gap-3">
					<Newsfeed>
						<Outlet context={{ toggleIsPostPopup }} />
					</Newsfeed>
					{isMessageWindowOpen && <MessageWindow />}
				</div>

			</div>
			<div className="col-1">
				<MessageButton toggleIsMessageWindowOpen={toggleIsMessageWindowOpen} />
			</div>
			<AnimatePresence>
				{isPostPopup && <PostForm toggleIsPostPopup={toggleIsPostPopup} />}
			</AnimatePresence>
		</div>
	);
};

export default LayoutDefault;
