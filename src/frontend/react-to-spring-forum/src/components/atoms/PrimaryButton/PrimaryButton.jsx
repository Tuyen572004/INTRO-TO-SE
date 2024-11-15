import s from "./style.module.css";
import { motion } from "framer-motion";

const PrimaryButton = ({ type, title }) => {
  return (
    <motion.button
      type={type}
      className={s.primary_button}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {title}
    </motion.button>
  );
};

export default PrimaryButton;
