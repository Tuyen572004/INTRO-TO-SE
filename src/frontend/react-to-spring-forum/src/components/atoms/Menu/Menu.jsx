import { GrHomeOption } from "react-icons/gr";
import { FaPlus } from "react-icons/fa6";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import s from "./style.module.css";
import { useState } from "react";
import PreviewMessage from "../../organisms/PreviewMessage/PreviewMessage";

const Menu = ({ toggleIsPostPopup }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
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
      <motion.div
        className={`${s.home} ${active === "home" ? s.active : ""}`}
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
        onMouseEnter={() => setShowPreviewMessage(true)}
        onMouseLeave={() => setShowPreviewMessage(false)}
        onClick={() => {
          setActive("message");
          navigate("/message");
        }}
        variants={activeVariants}
        animate={active === "message" ? "active" : "inactive"}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.div variants={iconVariants}>
          <FiMessageSquare />
          {showPreviewMessage && <PreviewMessage />}
        </motion.div>
      </motion.div>

      <motion.div
        className={s.post}
        onClick={() => toggleIsPostPopup()}
        whileHover={{ scale: 1.3, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: -15 }}
      >
        <FaPlus />
      </motion.div>

      <motion.div
        className={`${s.activity} ${active === "activity" ? s.active : ""}`}
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
        </motion.div>
      </motion.div>

      <motion.div
        className={`${s.user} ${active === "user" ? s.active : ""}`}
        onClick={() => {
          setActive("user");
          navigate("/user");
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
