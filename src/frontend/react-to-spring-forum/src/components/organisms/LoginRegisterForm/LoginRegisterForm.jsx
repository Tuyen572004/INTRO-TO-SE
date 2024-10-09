import LoginForm from "../../molecules/LoginForm/LoginForm";
import RegisterForm from "../../molecules/RegisterForm/RegisterForm";
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
