import { GrHomeOption } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegHeart, FaUserFriends } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";

import s from "./style.module.css";
import PreviewMessage from "../../organisms/PreviewMessage/PreviewMessage";
import NotificationDot from "../NotificationDot/NotificationDot";
import { NotificationContext } from "../../../context/NotificationContext";

const Menu = ({ toggleIsPostFormVisible }) => {
  const {
    hasMessageNotification,
    hasFriendNotification,
    hasActivityNotification,
  } = useContext(NotificationContext);

  const user = useSelector((state) => state.userSlice.user);
  const role = user.role;

  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(
    location.pathname.split("/")[1] || "home"
  );

  const [showPreviewMessage, setShowPreviewMessage] = useState(false);

  const iconVariants = {
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.9 },
  };

  const activeVariants = {
    active: { backgroundColor: "rgba(0, 0, 0, 0.1)" },
    inactive: { backgroundColor: "transparent" },
  };

  return (
    <div className={s.container}>
      {role === "ROLE_ADMIN" && (
        <motion.div
          className={`${active === "admin" ? s.active : ""}`}
          onClick={() => {
            setActive("admin");
            navigate("/admin");
          }}
          variants={activeVariants}
          animate={active === "admin" ? "active" : "inactive"}
          whileHover="hover"
          whileTap="tap"
        >
          <motion.div variants={iconVariants}>
            <RiAdminFill />
          </motion.div>
        </motion.div>
      )}

      <motion.div
        className={`${active === "home" ? s.active : ""}`}
        onClick={() => {
          setActive("home");
          navigate("/");
        }}
        variants={activeVariants}
        animate={active === "home" ? "active" : "inactive"}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div variants={iconVariants}>
          <GrHomeOption />
        </motion.div>
      </motion.div>
      <motion.div
        className={`${s.message} ${active === "message" ? s.active : ""}`}
        style={{ position: "relative" }}
        onMouseEnter={() => setShowPreviewMessage(true)}
        onMouseLeave={() => setShowPreviewMessage(false)}
        onClick={() => {
          setActive("message");
          //navigate("/message");
        }}
        variants={activeVariants}
        animate={active === "message" ? "active" : "inactive"}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div variants={iconVariants}>
          <FiMessageSquare />
          {hasMessageNotification && <NotificationDot />}
          {showPreviewMessage && <PreviewMessage />}
        </motion.div>
      </motion.div>

      <motion.div
        className={s.post}
        onClick={() => toggleIsPostFormVisible()}
        whileHover={{ scale: 1.3, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: -15 }}
      >
        <FaPlus />
      </motion.div>

      <motion.div
        className={`${active === "activity" ? s.active : ""}`}
        style={{ position: "relative" }}
        onClick={() => {
          setActive("activity");
          navigate("/activity");
        }}
        variants={activeVariants}
        animate={active === "activity" ? "active" : "inactive"}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div variants={iconVariants}>
          <FaRegHeart />
          {hasActivityNotification && <NotificationDot />}
        </motion.div>
      </motion.div>

      <motion.div
        className={`${active === "friend" ? s.active : ""}`}
        style={{ position: "relative" }}
        onClick={() => {
          setActive("friend");
          navigate("/friend");
        }}
        variants={activeVariants}
        animate={active === "friend" ? "active" : "inactive"}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div variants={iconVariants}>
          <FaUserFriends />
          {hasFriendNotification && <NotificationDot />}
        </motion.div>
      </motion.div>

      <motion.div
        className={`${active === "user" ? s.active : ""}`}
        onClick={() => {
          setActive("user");
          navigate("/my-account");
        }}
        variants={activeVariants}
        animate={active === "user" ? "active" : "inactive"}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div variants={iconVariants}>
          <FaRegUser />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Menu;
