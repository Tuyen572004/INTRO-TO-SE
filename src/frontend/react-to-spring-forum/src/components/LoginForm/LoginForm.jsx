import s from "./style.module.css";
import Input from "../Input/Input";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import { useState } from "react";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submit = (e) => {
    e.preventDefault();
    console.log("submited", username, password);
  };
  console.log(username, password);
  return (
    <>
      <form onSubmit={submit} className={s.container_form} action="">
        <Input placeholder="Username" onTextChange={setUsername} />
        <Input
          type="password"
          placeholder="Password"
          onTextChange={setPassword}
        />
        <div style={{ width: 100 + "%", marginLeft: 20 + "px" }}>
          <input type="checkbox"></input>
          <span> remember me</span>
        </div>

        <ButtonPrimary type="submit" title="Login" />
      </form>
    </>
  );
};

export default LoginForm;
