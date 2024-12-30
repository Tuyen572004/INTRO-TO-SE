import { useSelector } from "react-redux";
import Logo from "../../atoms/Logo/Logo";
import Menu from "../../atoms/Menu/Menu";
import Setting from "../../atoms/Setting/Setting";
import s from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navigation = ({
  toggleIsPostFormVisible,
  toggleIsChangePasswordModalOpen,
  toggleIsChangeEmailModalOpen,
}) => {
  const user = useSelector((state) => state.userSlice.user);
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <Logo />
      {user && <Menu toggleIsPostFormVisible={toggleIsPostFormVisible} />}
      {user && (
        <Setting
          toggleIsChangePasswordModalOpen={toggleIsChangePasswordModalOpen}
          toggleIsChangeEmailModalOpen={toggleIsChangeEmailModalOpen}
        />
      )}
      {!user && (
        <motion.button
          className={s.login_button}
          type="button"
          onClick={() => navigate("/login")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Login
        </motion.button>
      )}
    </div>
  );
};

export default Navigation;
