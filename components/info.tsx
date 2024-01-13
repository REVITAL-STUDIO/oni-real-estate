"use client";

import React, { useState } from "react";
import Image from "next/image";
import Pool from "public/Houston-home.jpeg";

type expandId = 1 | 2 | null;

const Info = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="h-full w-full xl:w-1/2 bg-gradient-to-b from-white/20 via-mint to-white ">
        <div className="w-full h-full  flex flex-col justify-center items-center  text-black">
          <div>
            <h1
              className="uppercase font-cinzel flex items-center font-regular p-4 mt-4 text-4xl xl:text-5xl  text-black  tracking-wider"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            >
              Our Purpose{" "}
              <div className="w-36 ml-4 h-0 border-2 border-white"></div>
            </h1>
            <h3
              className="p-4 text-xl font-cinzel font-medium tracking-widest"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            >
              It's the little things
            </h3>
            <p className="text-xs w-full font-medium font-montserrat tracking-wide text-left p-4 leading-4">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam,"
            </p>
          </div>
          {/* Mobile Responsive */}
          <div className="h-1/2 w-[95%] rounded-lg shadow-xl flex justify-center items-center overflow-hidden relative">
            <Image src={Pool} alt="pool-image" className="w-[100%] h-[100%]" />
            <button className="absolute bg-gray-700/60 text-white font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-montserrat bottom-4 left-2 p-4 rounded-full border border-white ">
              View Properties
            </button>
          </div>
        </div>
      </div>

      <div className="xl:w-1/2 w-full h-full hidden bg-gradient-to-t xl:bg-mint from-white to-mint xl:flex  justify-center items-center">
        <div className="xl:h-5/6 xl:w-5/6 flex rounded-lg flex-col  justify-center items-center ">
          <Image src={Pool} alt="pool-image" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Info;
