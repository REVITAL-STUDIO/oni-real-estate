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
          className={`w-36 h-36 absolute text-forest ${
            index === progress ? "top-0" : "bottom-32"
          } ${
            index === 0
              ? "shadow-md shadow-white"
              : index === icons.length - 1
              ? "left-6"
              : "right-6"
          } rounded-full bg-white flex justify-center items-center shadow-xl`}
        >
          <FontAwesomeIcon icon={iconObj.icon} className="w-16 h-16" />
        </div>
      ))}
      {/* Progression Bar */}
      <div className="w-5/6 h-5/6  shadow-xl shadow-white rounded-full flex justify-center items-center">
        {/* Progress */}
        <div
          className={`w-[${
            (progress + 1) * 33
          }%] w-[85%] h-[85%] rounded-full border-mint bg-forest border-8 flex justify-center items-center transition-all duration-1000 ease-out animate-fillProgressBar`}
        >
          <span className="font-medium text-2xl text-center text-white w-3/4">
            {icons[progress]?.text}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProgressBarSvg;
