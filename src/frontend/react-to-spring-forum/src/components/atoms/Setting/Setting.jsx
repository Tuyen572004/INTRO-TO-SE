import { MdLogout } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { motion } from "framer-motion";

import s from "./style.module.css";
const Setting = () => {
  const iconVariants = {
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.9 },
  };
  return (
    <div className={s.container}>
      <motion.div
        className={s.logout}
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <MdLogout />
      </motion.div>
      <motion.div
        className={s.options}
        variants={iconVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <IoMdOptions />
      </motion.div>
    </div>
  );
};

export default Setting;
