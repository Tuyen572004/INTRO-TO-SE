import LoginForm from "../../molecules/LoginForm/LoginForm";
import RegisterForm from "../../molecules/RegisterForm/RegisterForm";
import Overlay from "../../molecules/Overlay/Overlay";
import s from "./style.module.css";
import { useState } from "react";
import ForgotPasswordModal from "../../molecules/ForgotPasswordModal/ForgotPasswordModal";
const LoginRegisterForm = () => {
  const [isNotLogIn, setIsNotLogIn] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);

  const toggleIsForgotPasswordModalOpen = () => {
    setIsForgotPasswordModalOpen(!isForgotPasswordModalOpen);
  };

  return (
    <div className={s.container}>
      <RegisterForm isNotLogIn={isNotLogIn} />
      <LoginForm
        isNotLogIn={isNotLogIn}
        toggleIsForgotPasswordModalOpen={toggleIsForgotPasswordModalOpen}
      />
      <Overlay isNotLogIn={isNotLogIn} toggle={setIsNotLogIn} />

      {isForgotPasswordModalOpen && (
        <ForgotPasswordModal
          toggleIsForgotPasswordModalOpen={toggleIsForgotPasswordModalOpen}
        />
      )}
    </div>
  );
};

export default LoginRegisterForm;
