import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faKey,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const ProgressBarSvg = () => {
  const [progress, setProgress] = useState<number>(0);

  const icons = [
    {
      icon: faHandshake,
      text: "Agent Will Represent Best Interest of the Buyer.",
    },
    { icon: faKey, text: "Agent will owe the buyer fiduciary duties. " },
    {
      icon: faLayerGroup,
      text: "Agent is responsible for providing all material facts so the buyer can make an informed and educated decision.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev + 1) % icons.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90%] flex justify-center items-center transition-all ease-in-out duration-300">
      {/* house cards */}

      {icons.map((iconObj, index) => (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Added initial values for opacity and scale
          animate={{ opacity: 1, scale: 1 }} // Added animate values for opacity and scale
          transition={{ duration: 0.5, ease: "easeInOut" }}
          key={index}
          className={`w-36 h-36 absolute z-50 bottom-32 rounded-full bg-mint flex justify-center items-center  ${
            index === progress
              ? "shadow-pine/50 shadow-custom transition-all duration-300 ease-in-out"
              : ""
          } ${
            index === 0
              ? "top-0"
              : index === icons.length - 1
              ? "left-12"
              : "right-12"
          }`}
        >
          <FontAwesomeIcon icon={iconObj.icon} className="w-16 h-16" />
        </motion.div>
      ))}
      {/* Progression Bar */}
      <div className="w-[90%] h-[90%]  flex justify-center items-center">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Added initial values for opacity and scale
          animate={{ opacity: 1, scale: 1 }} // Added animate values for opacity and scale
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`w-[${
            (progress + 1) * 33
          }%] w-[75%] h-[75%] rounded-full relative border-pine bg-forest/75 border-8 box-shadow-inset flex justify-center items-center transition-all duration-1000 ease-out `}
        >
          <svg
            width="110%"
            height="110%"
            viewBox="0 0 1089 1089"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute transform -rotate-90"
          >
            <circle
              cx="544.5"
              cy="544.5"
              r="444.5"
              stroke="#FFFFFF"
              stroke-width="100"
              className="progress-circle animate-progressAnimation"
            />
          </svg>

          <motion.span
            className="font-regular text-lg text-center text-white w-2/3 "
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {icons[progress]?.text}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};
export default ProgressBarSvg;
