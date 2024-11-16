import { FaPlus } from "react-icons/fa6";
import s from "./style.module.css";
import { motion } from "framer-motion";
const PostButton = ({ toggleIsPostPopup }) => {
  return (
    <motion.div
      className={s.post_button}
      onClick={() => toggleIsPostPopup()}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaPlus />
    </motion.div>
  );
};

export default PostButton;
