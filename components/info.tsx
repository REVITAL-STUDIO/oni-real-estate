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
      <div className="h-full bg-black w-1/2">
        <div className="w-full h-5/6 bg-royal flex flex-col justify-center  text-white">
          <h3 className="p-2 text-lg font-regular tracking-wider">
            Our Purpose
          </h3>
          <h1 className="uppercase flex items-center p-4 text-5xl font-light tracking-wider">
            Oni Real Estate{" "}
            <div className="w-36 ml-4 h-0 border-2 border-white"></div>
          </h1>
          <p className="text-xs text-left p-4">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
            <br></br>
            <br></br>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
          </p>
        </div>
        <div className="w-full h-1/6  flex  bg-white ">
          <ul className="w-full flex items-center justify-center  h-auto">
            <li className="text-xs hover:bg-orange-500 hover:w-full transition-all ease-in duration-100 hover:text-white  flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Cinco Ranch
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Fort Bend
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Katy
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Heights
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Missouri City
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Montrose
            </li>{" "}
            <li className="text-xs hover:bg-orange-500 hover:w-full  transition-all ease-in duration-100 hover:text-white   flex justify-center items-center h-full  w-1/2 uppercase font-regular text-black">
              Pearland
            </li>{" "}
          </ul>
        </div>
      </div>

      <div className="w-1/2 h-full bg-black flex  justify-center items-center">
        <div className="h-5/6 w-5/6 rounded-3xl bg-[url('/pool.png')] flex flex-col justify-center gap-y-16 items-center animate-float"></div>
      </div>
    </div>
  );
};

export default Info;
