"use client";

import React, { useState } from "react";
import Image from "next/image";
import Pool from "public/Houston-home.jpeg";

type expandId = 1 | 2 | null;

const Info = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      <div className="h-full w-full xl:w-1/2 bg-gradient-to-b from-white/20 via-mint to-white ">
        <div className="w-full h-full  flex flex-col justify-center items-center  text-black">
          <div className="w-full">
            <h1
              className="uppercase font-cinzel flex items-center font-regular p-4 mt-4 text-4xl md:text-6xl  text-black  tracking-wider"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            >
              Our Purpose{" "}
              <div className="xl:w-36 md:w-3/4 ml-4 h-0 border-2 border-white"></div>
            </h1>
            <h3
              className="p-4 text-2xl font-cinzel font-medium tracking-widest text-black/75"
              style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
            >
              It's the little things
            </h3>
            <p className="text-xs md:text-sm w-full text-black/60 font-medium font-montserrat tracking-wide text-left p-4 leading-4">
              For every project, we start with the fundamentals. Reliability,
              quality and a relentless vision for success. From the ground up,
              every detail and every outcome is in trusted hands.
              <br></br>
              <br></br>
              We envisage and build quality projects for longevity and strategic
              success.
            </p>
          </div>
          {/* Mobile Responsive */}
          <div className="h-1/2 w-[95%] rounded-lg md:mt-4 shadow-xl flex justify-center items-center overflow-hidden relative xl:hidden">
            <Image src={Pool} alt="pool-image" className="w-[100%] h-[100%]" />
            <button className="absolute bg-forest/75 text-white  font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-montserrat bottom-4 left-2 p-4 rounded-full  ">
              View Properties
            </button>
          </div>
        </div>
      </div>

      <div className="xl:w-1/2 w-full h-full hidden xl:flex bg-gradient-to-b from-white/20 via-mint to-white justify-center items-center">
        <div className="md:h-5/6 md:w-5/6 flex rounded-lg flex-col  justify-center items-center overflow-hidden relative">
          <Image
            src={Pool}
            alt="pool-image"
            className="rounded-lg w-[100%] h-[100%] object-cover bg-center"
          />
          <button className="absolute bg-forest/75 w-1/3 h-20 tracking-wide text-white font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-montserrat bottom-4 right-2 p-4 rounded-full border border-white ">
            View Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
