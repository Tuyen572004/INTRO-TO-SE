import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function VerificationSuccess() {
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
          <h1>Verification Successful!</h1>
          <h4>Thank you for verifying your account</h4>
          <h5>
            Your account has been successfully verified. Check your dashboard
            now.
          </h5>

          <div style={{ padding: "10px", margin: "40px 0px" }}>
            <motion.svg
              viewBox="0 0 100 100"
              style={{ width: "100px", height: "100px" }}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="#4CAF50"
                variants={circleVariants}
              />

              <motion.path
                d="M30 50 L45 65 L70 35"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={lineVariants}
              />

              {/* Pulse effect */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="#4CAF50"
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
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            Back to Login
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default VerificationSuccess;
