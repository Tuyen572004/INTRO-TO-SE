import { LuMessagesSquare } from "react-icons/lu";
import s from "./style.module.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const MessageButton = ({ toggleIsMessageWindowOpen }) => {
  const user = useSelector((state) => state.userSlice.user);
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
        </motion.div>
      )}
    </div>
  );
};

export default MessageButton;
