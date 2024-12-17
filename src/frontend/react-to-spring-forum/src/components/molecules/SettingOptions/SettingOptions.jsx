import s from "./style.module.css";
import { motion } from "framer-motion";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import { useState } from "react";

const SettingOptions = ({ toggleIsChangePasswordModalOpen }) => {
  return (
    <>
      <div className={s.container}>
        <motion.button
          className={s.change_password_button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleIsChangePasswordModalOpen(true)}
        >
          Change Password
        </motion.button>
      </div>
    </>
  );
};
export default SettingOptions;
