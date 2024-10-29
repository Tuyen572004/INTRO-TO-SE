import LoginRegisterForm from "../../organisms/LoginRegisterForm/LoginRegisterForm";
import s from "./style.module.css";
const LoginRegister = () => {
  return (
    <div className={s.container}>
      <LoginRegisterForm />
    </div>
  );
};

export default LoginRegister;
