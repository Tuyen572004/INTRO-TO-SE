import s from "./style.module.css";
import Input from "../../atoms/Input/Input";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { AuthenticationAPI } from "../../../api/AuthenticateAPI";
import PrimaryButton from "../../atoms/PrimaryButton/PrimaryButton";

const LoginForm = ({ isNotLogIn }) => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleUsernameChange = (value) => {
    setUsername(value);
    setErrorMessage("");
    setIsInvalid(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setErrorMessage("");
    setIsInvalid(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthenticationAPI.authenticate({
        username,
        password,
      });
      console.log(response);
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      setAuth({ username, password, accessToken, refreshToken });
      setUsername("");
      setPassword("");
      setErrorMessage("");

      navigate(from, { replace: true });
      if (response.code === 1000) {
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.code === 5002) {
        setErrorMessage("Invalid username or password");
        setIsInvalid(true);
      } else {
        console.log(error);
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div
      className={`${s.container} ${isNotLogIn ? `${s.is_not_log_in}` : ""}`}
      id="login_form"
    >
      <form onSubmit={handleSubmit} className={s.container_form} action="">
        <h1>Login here</h1>
        <Input
          placeholder="Username"
          onTextChange={handleUsernameChange}
          isInvalid={isInvalid}
        />
        <Input
          type="password"
          placeholder="Password"
          onTextChange={handlePasswordChange}
          isInvalid={isInvalid}
        />
        {errorMessage && <div className={s.error_message}>{errorMessage}</div>}
        <div className={s.content}>
          <div className={s.checkbox}>
            <input type="checkbox"></input>
            <span>Remember me</span>
          </div>
          <div className={s.forgot_password}>
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <PrimaryButton type="submit" title="Login" />
      </form>
    </div>
  );
};

export default LoginForm;
