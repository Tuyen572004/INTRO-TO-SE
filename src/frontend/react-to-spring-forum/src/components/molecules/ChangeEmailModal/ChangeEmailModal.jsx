import {useState, useEffect} from "react";
import s from "./style.module.css";
import {RiCloseLargeFill} from "react-icons/ri";
import {motion, AnimatePresence} from "framer-motion";
import {UserAPI} from "../../../api/UserAPI";
import ErrorAlert from "../../atoms/ErrorAlert/ErrorAlert";
import Swal from "sweetalert2";

const ChangeEmailModal = ({toggleIsChangeEmailModalOpen}) => {
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [sendCodeError, setSendCodeError] = useState("");
    const [changeEmailError, setChangeEmailError] = useState("");

    const handleSendCode = async () => {
        try {
            setSendCodeError("");
            setChangeEmailError("");
            setVerificationCode("");

            if (!newEmail || !password) {
                setSendCodeError("Please fill in all fields");
                return;
            }

            const user = await UserAPI.getMyAccount();
            const response = await UserAPI.sendVerificationCode(user.data.email);
            setIsCodeSent(true);
            setTimer(60);
        } catch (error) {
            setSendCodeError(
                error.response?.data?.message ||
                "Failed to send verification code. Please try again."
            );
        }
    };

    const handleChangeEmail = async () => {
        debugger;
        try {
            setChangeEmailError("");

            if (!verificationCode) {
                setChangeEmailError("Please fill in all fields");
                return;
            }

            const response = await UserAPI.changeEmail({
                newEmail,
                password,
                verificationCode,
            });

            await Swal.fire({
                icon: "success",
                title: "Email changed!",
                showConfirmButton: false,
                timer: 1500,
            });

            toggleIsChangeEmailModalOpen();
        } catch (error) {
            console.error("Error changing email:", error);
            console.log("code: ", error.response.data.code);
            if (error.response?.data?.code == 9999) {
                setChangeEmailError(
                    "The email you entered is already in use. Please try another email."
                );
                return;
            }
            setChangeEmailError(
                error.response?.data?.message ||
                "Failed to change email. Please check your input and try again."
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
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
        >
            <motion.div
                className={s.container}
                initial={{scale: 0.8, y: "-50%", opacity: 0}}
                animate={{scale: 1, y: "0%", opacity: 1}}
                exit={{scale: 0.8, y: "-50%", opacity: 0}}
                transition={{duration: 0.4, ease: "easeInOut"}}
            >
                <h2 className={s.title}>Change Email</h2>

                <AnimatePresence>
                    {sendCodeError && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="mb-4"
                        >
                            <ErrorAlert message={sendCodeError}/>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {changeEmailError && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -10}}
                            className="mb-4"
                        >
                            <ErrorAlert message={changeEmailError}/>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={s.input_group}>
                    <label htmlFor="newEmail" className={s.label}>
                        New Email
                    </label>
                    <input
                        type="text"
                        id="newEmail"
                        className={s.input}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        disabled={isCodeSent}
                    />
                </div>
                <div className={s.input_group}>
                    <label htmlFor="password" className={s.label}>
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={s.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isCodeSent}
                    />
                </div>
                {!isCodeSent && (
                    <motion.button
                        className={s.send_code_button}
                        whileHover={!timer && {scale: 1.1}}
                        whileTap={!timer && {scale: 0.95}}
                        onClick={handleSendCode}
                        disabled={timer > 0}
                    >
                        Send Code
                    </motion.button>
                )}
                {isCodeSent && (
                    <>
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
                            whileHover={!timer && {scale: 1.1}}
                            whileTap={!timer && {scale: 0.95}}
                            onClick={handleSendCode}
                            disabled={timer > 0}
                        >
                            {timer > 0 ? `Resend Code (${timer}s)` : "Resend Code"}
                        </motion.button>
                        <motion.button
                            className={s.change_email_button}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.95}}
                            onClick={handleChangeEmail}
                        >
                            Change Email
                        </motion.button>
                    </>
                )}
                <motion.button
                    className={s.close_popup}
                    whileHover={{rotate: 90}}
                    onClick={() => toggleIsChangeEmailModalOpen()}
                >
                    <RiCloseLargeFill/>
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default ChangeEmailModal;
