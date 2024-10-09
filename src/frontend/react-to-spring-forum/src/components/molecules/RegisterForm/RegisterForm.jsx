import s from "./style.module.css";
import Input from "../../atoms/Input/Input";
import ButtonPrimary from "../../atoms/ButtonPrimary/ButtonPrimary";
import { useState } from "react";
const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    console.log("submited", username, email, password);
  };
  return (
    <>
      <form onSubmit={submit} className={s.container_form} action="">
        <Input placeholder="Username" onTextChange={setUsername} />
        <Input placeholder="Email" onTextChange={setEmail} />
        <Input
          type="password"
          placeholder="Password"
          onTextChange={setPaswword}
        />
        <ButtonPrimary type="submit" title={"Register"}></ButtonPrimary>
      </form>
    </>
  );
};

export default RegisterForm;
