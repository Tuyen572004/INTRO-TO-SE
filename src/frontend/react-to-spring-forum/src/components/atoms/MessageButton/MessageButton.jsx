import { LuMessagesSquare } from "react-icons/lu";
import s from "./style.module.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { NotificationContext } from "../../../context/NotificationContext";
import NotificationDot from "../NotificationDot/NotificationDot";

const MessageButton = ({ toggleIsMessageWindowOpen }) => {
  const user = useSelector((state) => state.userSlice.user);
  const { hasMessageNotification } = useContext(NotificationContext);
  return (
    <div>
      {user && (
        <motion.div
          className={s.message_button}
          onClick={() => toggleIsMessageWindowOpen()}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LuMessagesSquare />
          {hasMessageNotification && <NotificationDot />}
        </motion.div>
      )}
    </div>
  );
};

export default MessageButton;
