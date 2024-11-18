import LoginForm from "../../molecules/LoginForm/LoginForm";
import RegisterForm from "../../molecules/RegisterForm/RegisterForm";
import Overlay from "../../molecules/Overlay/Overlay";
import s from "./style.module.css";
import { useState } from "react";
const LoginRegisterForm = () => {
  const [isNotLogIn, setIsNotLogIn] = useState(false);

  return (
    <div className={s.container}>
      <RegisterForm isNotLogIn={isNotLogIn} />
      <LoginForm isNotLogIn={isNotLogIn} />
      <Overlay isNotLogIn={isNotLogIn} toggle={setIsNotLogIn} />
    </div>
  );
};

export default LoginRegisterForm;
