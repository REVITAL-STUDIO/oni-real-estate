import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faKey,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="relative w-full h-[90%] flex justify-center items-center">
      {/* house cards */}

      {icons.map((iconObj, index) => (
        <div
          key={index}
          className={`w-36 h-36 absolute z-50 text-forest ${
            index === progress ? "top-0" : "bottom-32"
          } ${
            index === 0
              ? "shadow-md shadow-white"
              : index === icons.length - 1
              ? "left-6"
              : "right-6"
          } rounded-full bg-mint flex justify-center items-center shadow-xl`}
        >
          <FontAwesomeIcon icon={iconObj.icon} className="w-16 h-16" />
        </div>
      ))}
      {/* Progression Bar */}
      <div className="w-[90%] h-[90%]  flex justify-center items-center">
        {/* Progress */}
        <div
          className={`w-[${
            (progress + 1) * 33
          }%] w-[75%] h-[75%] rounded-full relative border-pine bg-smoke border-8 box-shadow-inset flex justify-center items-center transition-all duration-1000 ease-out `}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1089 1089"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute transform -rotate-90"
          >
            <circle
              cx="544.5"
              cy="544.5"
              r="444.5"
              stroke="#3E4A37"
              stroke-width="100"
              className="progress-circle animate-progressAnimation"
            />
          </svg>

          <span className="font-medium text-2xl text-center text-forest w-3/4">
            {icons[progress]?.text}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProgressBarSvg;
