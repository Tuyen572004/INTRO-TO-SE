import { LuMessagesSquare } from "react-icons/lu";
import s from "./style.module.css";
import { motion } from "framer-motion";
const MessageButton = ({ toggleIsMessageWindowOpen }) => {
  return (
    <motion.div
      className={s.message_button}
      onClick={() => toggleIsMessageWindowOpen()}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <LuMessagesSquare />
    </motion.div>
  );
};

export default MessageButton;
