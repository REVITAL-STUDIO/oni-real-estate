"use client";

import React, { useState } from "react";

type expandId = 1 | 2 | null;

const Info = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="h-screen w-full flex">
      <div className="h-full k w-1/2">
        <div className="w-full h-full bg-mint flex flex-col justify-center  text-black">
          <h1
            className="uppercase font-cinzel flex items-center font-regular p-4 text-5xl  text-black  tracking-wider"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
          >
            Oni Real Estate{" "}
            <div className="w-36 ml-4 h-0 border-2 border-white"></div>
          </h1>
          <h3
            className="p-4 text-2xl uppercase font-cinzel font-bold tracking-wider"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
          >
            Our Purpose
          </h3>

          <p
            className="text-md font-montserrat tracking-wide text-left p-4"
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
            <br></br>
            <br></br>
            <span className="font-light">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat."
            </span>
          </p>
        </div>
      </div>

      <div className="w-1/2 h-full bg-mint to-mint flex  justify-center items-center">
        <div className="h-5/6 w-5/6  bg-[url('/pool.png')] flex rounded-lg flex-col justify-center gap-y-16 items-center "></div>
      </div>
    </div>
  );
};

export default Info;
