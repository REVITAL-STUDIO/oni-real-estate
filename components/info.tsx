"use client";

import React, { useState } from "react";
import Image from "next/image";
import Pool from "public/pool.png";

type expandId = 1 | 2 | null;

const Info = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="h-full w-full xl:w-1/2 bg-gradient-to-b from-white/20 via-mint to-white ">
        <div className="w-full h-full  flex flex-col justify-center items-center  text-black">
          <div>
            <h1
              className="uppercase font-cinzel flex items-center font-regular p-4 mt-4 text-4xl xl:text-5xl  text-black  tracking-wider"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.3)" }}
            >
              Our Purpose{" "}
              <div className="w-36 ml-4 h-0 border-2 border-white"></div>
            </h1>
            <h3
              className="p-4 text-lg font-cinzel font-medium tracking-wider"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            >
              It's the little things
            </h3>
            <p
              className="text-sm font-montserrat tracking-wide text-left p-4"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)" }}
            >
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea"
            </p>
          </div>
          {/* Mobile Responsive */}
          <div className="h-1/2 w-5/6 p-4 flex rounded-lg justify-center items-center ">
            <Image
              src={Pool}
              alt="pool-image"
              className="rounded-lg w-[100%] h-[100%]"
            />
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
