import React, { useState } from "react";
import s from "./style.module.css";
import { motion } from "framer-motion";

function PreviewMessageItem({ chat }) {
  const [showPreviewMessage, setShowPreviewMessage] = useState(false);

  return (
    <motion.div
      className={s.chat}
      onMouseEnter={() => setShowPreviewMessage(true)}
      onMouseLeave={() => setShowPreviewMessage(false)}
    >
      <motion.div
        className={s.avatar}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <img src={chat.avatar} alt="avatar" />
      </motion.div>
      <motion.div
        className={s.message}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: showPreviewMessage ? 1 : 0,
          y: showPreviewMessage ? 0 : 10,
        }}
        transition={{ duration: 0.3 }}
      >
        {chat.message}
      </motion.div>
    </motion.div>
  );
}

export default PreviewMessageItem;
