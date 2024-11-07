import s from "./style.module.css";
import Input from "../../atoms/Input/Input";
import ButtonPrimary from "../../atoms/PrimaryButton/PrimaryButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationAPI } from "../../../api/AuthenticateAPI";
const LoginForm = ({ isNotLogIn }) => {
  const navigator = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    const response = await AuthenticationAPI.authenticate({
      username: username,
      password: password,
    });

    console.log(response);
    if (response.code === "200") {
      navigator("/");
    } else {
      console.log("error");
    }
  };
  return (
    <div
      className={`${s.container} ${isNotLogIn ? `${s.is_not_log_in}` : ""}`}
      id="login_form"
    >
      <form onSubmit={submit} className={s.container_form} action="">
        <h1>Login here</h1>
        <Input placeholder="Username" onTextChange={setUsername} />
        <Input
          type="password"
          placeholder="Password"
          onTextChange={setPassword}
        />
        <div className={s.content}>
          <div className={s.checkbox}>
            <input type="checkbox"></input>
            <span>Remember me</span>
          </div>
          <div className={s.forgot_password}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <ButtonPrimary type="submit" title="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
