import s from "./style.module.css";
import { motion } from "framer-motion";
const GhostButton = ({ type, title, onClick }) => {
  return (
    <motion.button
      type={type}
      className={s.ghost_button}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {title}
    </motion.button>
  );
};

export default GhostButton;
