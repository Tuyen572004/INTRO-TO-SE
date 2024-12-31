import { Outlet } from "react-router-dom";
import NavigationBar from "../molecules/NavigationBar/NavigationBar";
import Newsfeed from "../organisms/Newsfeed/Newfeeds";
import MessageButton from "../atoms/MessageButton/MessageButton";
import Header from "../atoms/Header/Header";
import PostForm from "../molecules/PostForm/PostForm";
import { useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MessageWindow from "../organisms/MessageWindow/MessageWindow";
import ChangePasswordModal from "../molecules/ChangePasswordModal/ChangePasswordModal";
import ChangeEmailModal from "../molecules/ChangeEmailModal/ChangeEmailModal";
import { useSelector } from "react-redux";
import { connectWebSocket } from "../../config/webSocket";
import { NotificationContext } from "../../context/NotificationContext";

const LayoutDefault = () => {
	const user = useSelector((state) => state.userSlice.user);
	const handleNotification = useContext(NotificationContext);
	console.log("handleNotification", handleNotification);
	let client = null
	if (user) {
		client = connectWebSocket(user.userId, handleNotification);
	}

	const [isPostFormVisible, setIsPostFormVisible] = useState(false);
	const [isMessageWindowOpen, setIsMessageWindowOpen] = useState(false);
	const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
	const [isChangeEmailModalOpen, setIsChangeEmailModalOpen] = useState(false);

	const toggleIsPostFormVisible = () => {
		setIsPostFormVisible(!isPostFormVisible);
	};

	const toggleIsMessageWindowOpen = () => {
		setIsMessageWindowOpen(!isMessageWindowOpen);
	};

	const toggleIsChangePasswordModalOpen = () => {
		setIsChangePasswordModalOpen(!isChangePasswordModalOpen);
	};

	const toggleIsChangeEmailModalOpen = () => {
		setIsChangeEmailModalOpen(!isChangeEmailModalOpen);
	};
	return (
		<div className="d-flex justify-content-between">
			<div className="col-1">
				<NavigationBar socketClient={client} toggleIsPostFormVisible={toggleIsPostFormVisible} toggleIsChangePasswordModalOpen={toggleIsChangePasswordModalOpen} toggleIsChangeEmailModalOpen={toggleIsChangeEmailModalOpen} />
			</div>
			<div className="col-10 d-flex justify-content-center flex-column">
				<div className="d-flex justify-content-center">
					<Header />
				</div>
				<div className="d-flex justify-content-center gap-3">
					<Newsfeed>
						<Outlet />
					</Newsfeed>
					{isMessageWindowOpen && <MessageWindow />}
				</div>

			</div>

			<div className="col-1">
				<MessageButton toggleIsMessageWindowOpen={toggleIsMessageWindowOpen} />
			</div>
			<AnimatePresence>
				{isPostFormVisible && <PostForm show={isPostFormVisible} toggleIsPostFormVisible={toggleIsPostFormVisible} />}
			</AnimatePresence>
			<AnimatePresence>
				{isChangePasswordModalOpen && <ChangePasswordModal toggleIsChangePasswordModalOpen={toggleIsChangePasswordModalOpen} />}
			</AnimatePresence>
			<AnimatePresence>
				{isChangeEmailModalOpen && <ChangeEmailModal toggleIsChangeEmailModalOpen={toggleIsChangeEmailModalOpen} />}
			</AnimatePresence>
		</div>
	);
};

export default LayoutDefault;
