import s from "./style.module.css";
import { motion } from "framer-motion";

const SettingOptions = ({ toggleIsChangePasswordModalOpen, toggleIsChangeEmailModalOpen }) => {
  return (
    <>
      <div className={s.container}>
        <motion.button
          className={s.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleIsChangePasswordModalOpen(true)}
        >
          Change Password
        </motion.button>

        <motion.button
          className={s.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleIsChangeEmailModalOpen(true)}
        >
          Change Email
        </motion.button>
      </div>
    </>
  );
};
export default SettingOptions;
