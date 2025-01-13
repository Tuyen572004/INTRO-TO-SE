import Footer from "../../atoms/Footer/Footer";
import LoginRegisterForm from "../../organisms/LoginRegisterForm/LoginRegisterForm";
import s from "./style.module.css";
const LoginRegister = () => {
  return (
    <>
      <div className={s.container}>
        <LoginRegisterForm />
      </div>
      <Footer />
    </>
  );
};

export default LoginRegister;
