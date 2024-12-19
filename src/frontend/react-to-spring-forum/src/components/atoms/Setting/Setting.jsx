import { MdLogout } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { motion } from "framer-motion";
import s from "./style.module.css";
import { UserAPI } from "../../../api/UserAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../../store/userSlice";
import SettingOptions from "../../molecules/SettingOptions/SettingOptions";

const Setting = ({ toggleIsChangePasswordModalOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    UserAPI.logout({ token: localStorage.getItem("accessToken") });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(deleteUser());
    navigate("/login");
  };

  const [showSettingOption, setShowSettingOption] = useState(false);

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
        onMouseEnter={() => setShowSettingOption(true)}
        onMouseLeave={() => setShowSettingOption(false)}
      >
        <IoMdOptions />
        {showSettingOption && (
          <SettingOptions
            toggleIsChangePasswordModalOpen={toggleIsChangePasswordModalOpen}
          />
        )}
      </motion.div>
    </div>
  );
};

export default Setting;
