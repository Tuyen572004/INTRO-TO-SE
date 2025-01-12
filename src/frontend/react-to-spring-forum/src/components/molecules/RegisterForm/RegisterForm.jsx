import { motion } from "framer-motion";
import Input from "../../atoms/Input/Input";
import ButtonPrimary from "../../atoms/PrimaryButton/PrimaryButton";
import { useState, useEffect } from "react";
import { UserAPI } from "../../../api/UserAPI";
import s from "./style.module.css";
import validateEmail from "../../../validates/validateEmail";
import validateUsername from "../../../validates/validateUsername";
import validatePassword from "../../../validates/validatePassword";
import VerifyModal from "../../atoms/VerifyModal/VerifyModal";

const RegisterForm = ({ isNotLogIn, setIsNotLogIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (value, set) => {
    set(value);
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("First Name: ", firstName);
    console.log("Last Name: ", lastName);
    console.log("Address: ", address);
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);
    if (
      !firstName ||
      !lastName ||
      !address ||
      !username ||
      !email ||
      !password
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (!validateUsername(username)) {
      setErrorMessage(
        "Username must be at least 5 characters with no special characters."
      );
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must contain at least 1 uppercase, 1 special character, and 1 number."
      );
      return;
    }
    try {
      const response = await UserAPI.register({
        username,
        password,
        email,
        firstName,
        lastName,
        address,
      });
      console.log(response);
      if (response) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.code === 3001) {
        setErrorMessage("Username already exists.");
      } else if (error.response?.data?.code === 9999) {
        setErrorMessage("Email already exists.");
      } else if (error.response?.data?.code === 1002) {
        setErrorMessage("Cannot send mail.");
      } else if (error.response?.data?.code === 5003) {
      }
    }
  };

  return (
    <div
      className={`${s.container} ${isNotLogIn ? `${s.is_not_log_in}` : ""}`}
      id="register_form"
    >
      <form onSubmit={handleSubmit} className={s.container_form} action="">
        <h1>Register here</h1>
        <div className="d-flex gap-2">
          <Input
            placeholder="First Name"
            onTextChange={handleChange}
            setFunction={setFirstName}
          />
          <Input
            placeholder="Last Name"
            onTextChange={handleChange}
            setFunction={setLastName}
          />
        </div>

        <Input
          placeholder="Address"
          onTextChange={handleChange}
          setFunction={setAddress}
        />
        <Input
          placeholder="Username"
          onTextChange={handleChange}
          setFunction={setUsername}
        />
        <Input
          placeholder="Email"
          onTextChange={handleChange}
          setFunction={setEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          onTextChange={handleChange}
          setFunction={setPassword}
        />

        {errorMessage && <div className={s.error_message}>{errorMessage}</div>}

        <div style={{ marginTop: "20px" }}>
          <ButtonPrimary type="submit" title={"Register"}></ButtonPrimary>
        </div>
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

export default RegisterForm;
