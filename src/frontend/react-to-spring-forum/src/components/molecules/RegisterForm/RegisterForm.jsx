import s from "./style.module.css";
import Input from "../../atoms/Input/Input";
import ButtonPrimary from "../../atoms/PrimaryButton/PrimaryButton";
import { useState } from "react";
import { Link } from "react-router-dom";
const RegisterForm = ({ isNotLogIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    console.log("submited", username, email, password);
  };
  return (
    <div
      className={`${s.container} ${isNotLogIn ? `${s.is_not_log_in}` : ""}`}
      id="register_form"
    >
      <form onSubmit={submit} className={s.container_form} action="">
        <h1>Register here</h1>
        <Input placeholder="Username" onTextChange={setUsername} />
        <Input placeholder="Email" onTextChange={setEmail} />
        <Input
          type="password"
          placeholder="Password"
          onTextChange={setPaswword}
        />
        <div className={s.content}>
          <span>
            or <Link>log in</Link> your account
          </span>
        </div>
        <ButtonPrimary type="submit" title={"Register"}></ButtonPrimary>
      </form>
    </div>
  );
};

export default RegisterForm;
