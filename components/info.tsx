import React from "react";
import Link from "next/link";

const Info = () => {
  return (
    <div className="h-screen w-full flex">
      <div className="h-full w-1/2">
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
        <div className="w-full h-1/6 flex justify-center bg-black text-white">
          <ul className="w-full flex items-center justify-center gap-x-16 h-auto">
            <li className="text-2xl font-regular text-white/50">MONTROSE</li>
            <li className="text-2xl font-regular text-white/50">KATY</li>
            <li className="text-2xl font-regular text-white/50">FORT BEND</li>
            <li className="text-2xl font-regular text-white/50">HEIGHTS</li>
          </ul>
        </div>
      </div>

      <div className="w-1/2 h-full bg-[url('/pool.png')] flex  justify-center items-center">
        <div className="h-5/6 w-5/6 flex flex-col justify-center gap-y-16 items-center">
          <div className="w-64 h-16 bg-opacity-10 hover:bg-opacity-30 transition ease-in duration-75 bg-white bg-blur rounded-lg shadow-lg border border-opacity-30 flex justify-center items-center">
            <span className="text-white font-medium">OUR VALUES</span>
          </div>
          <div className="w-64 h-16 bg-opacity-10 hover:bg-opacity-30 transition ease-in duration-75 bg-white bg-blur rounded-lg shadow-lg border border-opacity-30 flex justify-center items-center">
            <span className="text-white font-medium">OUR TEAM</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
