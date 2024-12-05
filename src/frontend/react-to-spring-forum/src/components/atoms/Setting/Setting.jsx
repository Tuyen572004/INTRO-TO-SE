import { MdLogout } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { motion } from "framer-motion";
import s from "./style.module.css";
import { AuthenticationAPI } from "../../../api/AuthenticateAPI";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    AuthenticationAPI.logout({ token: localStorage.getItem("accessToken") });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    navigate("/login");
  };
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
        onClick={handleLogout}
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
