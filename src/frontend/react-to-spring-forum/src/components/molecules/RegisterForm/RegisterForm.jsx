import { motion } from "framer-motion";
import Modal from "react-modal";
import Input from "../../atoms/Input/Input";
import ButtonPrimary from "../../atoms/PrimaryButton/PrimaryButton";
import { useState, useEffect } from "react";
import { UserAPI } from "../../../api/UserAPI";
import s from "./style.module.css";
import validateEmail from "../../../validates/validateEmail";
import validateUsername from "../../../validates/validateUsername";
import validatePassword from "../../../validates/validatePassword";

Modal.setAppElement("#root");

const RegisterForm = ({ isNotLogIn, setIsNotLogIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (value, set) => {
    set(value);
    setErrorMessage("");
  };

  useEffect(() => {
    let timer;
    if (isTimerActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, countdown]);

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
      const response = await UserAPI.register({ username, password, email });

      console.log(response);
      if (response) {
        setModalIsOpen(true);
        setCountdown(300);
        setIsTimerActive(true);
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

  const handleResendEmail = async () => {
    try {
      setCountdown(300);
      setIsTimerActive(true);
    } catch (e) {
      console.log(e);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  const envelopeVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const arrowVariants = {
    animate: {
      y: [0, 15, 0],
      fill: ["#7AB2D3", "#C6E7FF", "#7AB2D3"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div
      className={`${s.container} ${isNotLogIn ? `${s.is_not_log_in}` : ""}`}
      id="register_form"
    >
      <form onSubmit={handleSubmit} className={s.container_form} action="">
        <h1>Register here</h1>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Verification Code Modal"
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1000 },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            padding: "30px",
            borderRadius: "20px",
            textAlign: "center",
            backgroundColor: "#f7f8fc",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            color: "#333",
          },
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <div style={{ fontSize: "2rem", color: "#333" }}>
            Verify your email address
          </div>
          <motion.div
            style={{
              width: "120px",
              height: "120px",
              margin: "20px auto",
              position: "relative",
            }}
            variants={envelopeVariants}
            animate="animate"
          >
            <svg
              viewBox="0 0 1024 1024"
              style={{
                width: "100%",
                height: "100%",
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M913.871918 369.867311c-6.433071-6.433071-14.863743-9.649095-23.289295-9.649095h-230.077272l51.34273-67.684964a24.706353 24.706353 0 0 0 2.444014-25.927848c-4.180524-8.429648-12.738157-13.706753-22.133329-13.706753h-72.31702V120.10482c0-13.641224-11.065129-24.706353-24.706353-24.706353H429.657094c-13.641224 0-24.706353 11.065129-24.706352 24.706353v132.793831h-73.605069a24.657206 24.657206 0 0 0-22.133329 13.706753 24.714544 24.714544 0 0 0 2.447086 25.927848l51.277201 67.684964H132.924888c-8.429648 0-16.856224 3.215-23.293391 9.649095-6.433071 6.433071-9.649095 14.863743-9.649095 23.292367v498.113043c0 8.426576 3.215 16.856224 9.649095 23.289296a32.849313 32.849313 0 0 0 23.293391 9.652167h757.656711c8.426576 0 16.856224-3.218072 23.289295-9.652167a32.840098 32.840098 0 0 0 9.652167-23.289296V393.159678a32.834978 32.834978 0 0 0-9.651143-23.292367z"
                fill="#27323A"
              />
              <motion.path
                d="M429.657094 302.310333c13.641224 0 24.706353-11.065129 24.706353-24.706353V144.810149H570.430064v132.793831c0 13.641224 11.0682 24.706353 24.706353 24.706353h47.291215c-36.351001 47.805206-105.258483 138.717008-130.672341 172.23799-25.414882-33.520982-94.387893-124.367255-130.67234-172.23799h48.574143z"
                fill="#27323A"
                animate="animate"
              />
              <motion.path
                d="M400.447694 409.630921l91.617259 120.69765c4.697586 6.1771 11.968196 9.780153 19.689315 9.780153s15.054186-3.604076 19.686243-9.780153l91.554802-120.69765H832.288736L510.209225 687.253332 190.76417 409.630921h209.683524z"
                fill="#FFFFFF"
              />
              <motion.path
                variants={arrowVariants}
                d="M149.396132 439.097317l170.047898 147.78556-170.047898 236.059833zM172.942422 874.802502L356.88854 619.439359l120.892189 105.067016c9.395172 8.23511 21.4248 12.738157 33.972515 12.738158 12.481162 0 24.577343-4.503048 33.906986-12.675701l120.958741-105.129473 183.943046 255.363143H172.942422zM874.11138 822.94271L704.063481 586.882877l170.047899-147.78556z"
              />
            </svg>
          </motion.div>
          <div style={{ fontSize: "0.7rem", marginBottom: "20px" }}>
            Please click on the link in the email we just sent you to confirm
            your email address.
          </div>

          <motion.button
            whileHover={{ scale: countdown === 0 ? 1.2 : 1 }}
            whileTap={{ scale: countdown === 0 ? 0.9 : 1 }}
            style={{
              width: "70%",
              padding: "10px",
              borderRadius: "20px",
              backgroundColor: countdown === 0 ? "black" : "#999",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: countdown === 0 ? "pointer" : "not-allowed",
              marginBottom: "10px",
              transition: "background-color 0.3s",
            }}
            onClick={handleResendEmail}
            disabled={countdown > 0}
          >
            {countdown > 0
              ? `Resend Email (${formatTime(countdown)})`
              : "Resend Email"}
          </motion.button>
        </motion.div>
      </Modal>
    </div>
  );
};

export default RegisterForm;
