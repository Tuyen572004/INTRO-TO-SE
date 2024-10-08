import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import s from "./style.module.css";

const LoginRegisterForm = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.container_form}>
          <LoginForm />
          <RegisterForm />
        </div>
      </div>
    </>
  );
};

export default LoginRegisterForm;
