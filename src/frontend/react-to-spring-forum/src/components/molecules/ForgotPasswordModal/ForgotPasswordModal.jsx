import { useState, useEffect } from "react";
import s from "./style.module.css";
import { RiCloseLargeFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { UserAPI } from "../../../api/UserAPI";
import { useSelector } from "react-redux";
import validateEmail from "../../../validates/validateEmail";
import validatePassword from "../../../validates/validatePassword";
import ErrorAlert from "../../atoms/ErrorAlert/ErrorAlert";

const ForgotPasswordModal = ({ toggleIsForgotPasswordModalOpen }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [sendCodeError, setSendCodeError] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");

  const user = useSelector((state) => state.userSlice.user);

  const handleSendCode = async () => {
    try {
      setSendCodeError("");

      if (!email) {
        setSendCodeError("Please enter your email address");
        return;
      }

      if (!validateEmail(email)) {
        setSendCodeError("Please enter a valid email address");
        return;
      }

      const response = await UserAPI.sendVerificationCode(email);
      setIsCodeSent(true);
      setTimer(60);
    } catch (error) {
      setSendCodeError(
        error.response?.data?.message || 
        "Failed to send verification code. Please try again."
      );
    }
  };

  const handleChangePassword = async () => {
    try {
      setChangePasswordError("");

      if (!newPassword || !verificationCode) {
        setChangePasswordError("Please fill in all fields");
        return;
      }

      if (!validatePassword(newPassword)) {
        setChangePasswordError("Password must contain at least 1 uppercase, 1 special character, and 1 number.");
        return;
      }

      const response = await UserAPI.forgotPassword({newPassword, verificationCode});
      
      toggleIsForgotPasswordModalOpen();
    } catch (error) {
      setChangePasswordError(
        error.response?.data?.message || 
        "Failed to change password. Please check your input and try again."
      );
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <motion.div
      className={s.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={s.container}
        initial={{ scale: 0.8, y: "-50%", opacity: 0 }}
        animate={{ scale: 1, y: "0%", opacity: 1 }}
        exit={{ scale: 0.8, y: "-50%", opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <h2 className={s.title}>Forgot Password</h2>

        <AnimatePresence>
          {sendCodeError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <ErrorAlert message={sendCodeError} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {changePasswordError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <ErrorAlert message={changePasswordError} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={s.input_group}>
          <label htmlFor="email" className={s.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={s.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent}
          />
        </div>
        {!isCodeSent && (
          <motion.button
            className={s.send_code_button}
            whileHover={!timer && { scale: 1.1 }}
            whileTap={!timer && { scale: 0.95 }}
            onClick={handleSendCode}
            disabled={timer > 0}
          >
            Send Code
          </motion.button>
        )}
        {isCodeSent && (
          <>
            <div className={s.input_group}>
              <label htmlFor="newPassword" className={s.label}>
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className={s.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={s.input_group}>
              <label htmlFor="verificationCode" className={s.label}>
                Verification Code
              </label>
              <input
                type="text"
                id="verificationCode"
                className={s.input}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <motion.button
              className={s.send_code_button}
              whileHover={!timer && { scale: 1.1 }}
              whileTap={!timer && { scale: 0.95 }}
              onClick={handleSendCode}
              disabled={timer > 0}
            >
              {timer > 0 ? `Resend Code (${timer}s)` : "Resend Code"}
            </motion.button>
            <motion.button
              className={s.change_password_button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleChangePassword}
            >
              Change Password
            </motion.button>
          </>
        )}
        <motion.button
          className={s.close_popup}
          whileHover={{ rotate: 90 }}
          onClick={() => toggleIsForgotPasswordModalOpen()}
        >
          <RiCloseLargeFill />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordModal;