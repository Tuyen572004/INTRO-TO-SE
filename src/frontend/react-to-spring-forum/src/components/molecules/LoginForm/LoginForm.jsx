import s from "./style.module.css";
import Input from "../../atoms/Input/Input";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAPI } from "../../../api/UserAPI";
import PrimaryButton from "../../atoms/PrimaryButton/PrimaryButton";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";
import VerifyModal from "../../atoms/VerifyModal/VerifyModal";

const LoginForm = ({ isNotLogIn, toggleIsForgotPasswordModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      const response = await UserAPI.authenticate({
        username,
        password,
      });
      console.log(response);
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = jwtDecode(accessToken);
      console.log(decoded);

      setUsername("");
      setPassword("");
      setErrorMessage("");

      navigate(from, { replace: true });
      if (response.code === 1000) {
        navigate("/");
        const role = decoded.scope;
        const user = { ...decoded.user, role: role };
        dispatch(setUser(user));
      }
    } catch (error) {
      if (error.response?.data?.code === 5002) {
        setErrorMessage("Invalid username or password");
        setIsInvalid(true);
      } else if (error.response?.data?.code === 5007) {
        setIsModalOpen(true);
        setEmail(error.response.data.data);
        await UserAPI.sendVerificationLink(email);
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
          <div
            className={s.forgot_password}
            onClick={() => toggleIsForgotPasswordModalOpen()}
          >
            Forgot password?
          </div>
        </div>

        <PrimaryButton type="submit" title="Login" />
      </form>

      {isModalOpen && (
        <VerifyModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          email={email}
        />
      )}
    </div>
  );
};

export default LoginForm;
