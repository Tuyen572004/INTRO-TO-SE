import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function VerificationFailed() {
  const navigate = useNavigate();
  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  const containerVariants = {
    hidden: {
      x: 0,
      rotate: 0,
    },
    visible: {
      x: [0, -10, 10, -10, 10, 0],
      rotate: [0, -3, 3, -3, 3, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.7,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    },
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center text-align-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
          <h1>Verification Failed!</h1>
          <h5>
            Verification failed. Please try again or contact support if the
            problem persists.
          </h5>
          <div style={{ padding: "10px", margin: "40px 0px" }}>
            <motion.svg
              viewBox="0 0 100 100"
              style={{ width: "100px", height: "100px" }}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Background circle */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="#FF5252"
                variants={circleVariants}
              />
              {/* X mark */}
              <motion.path
                d="M30 30 L70 70"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                variants={lineVariants}
              />
              <motion.path
                d="M70 30 L30 70"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                variants={lineVariants}
              />
              {/* Pulse effect */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="#FF5252"
                strokeWidth="3"
                fill="none"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{
                  scale: 1.2,
                  opacity: 0,
                  transition: {
                    duration: 1,
                    repeat: 1,
                    delay: 0.2,
                  },
                }}
              />
            </motion.svg>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/login")}
            style={{
              width: "70%",
              padding: "10px",
              borderRadius: "20px",
              backgroundColor: "#FF5252",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Back to Login
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default VerificationFailed;
