import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "public/local.png";

const Expert = () => {
  return (
    <div className=" h-screen w-full bg-gradient-to-b from-white via-mint to-white">
      {/* Local Support */}
      <div className="h-full w-full bg-white flex flex-col xl:flex-row">
        {/* Flex-row */}
        <div className="w-full xl:w-1/2 h-3/4 hidden xl:flex xl:justify-center xl:items-center">
          <div className="w-full h-full relative p-4">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] rounded-lg shadow-xl"
            ></Image>
            <button className="absolute bg-forest/60 w-1/3 h-20 tracking-wide text-white font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-montserrat bottom-8 right-6 p-4 rounded-full border border-white ">
              For Owners
            </button>
          </div>
        </div>
        {/* Local Expertise */}
        <div className="w-full h-1/4 xl:h-1/2 xl:w-1/2 flex flex-col bg-white justify-center items-end relative">
          <h2
            className="md:w-[85%] xl:w-full w-full text-right font-cinzel p-4 text-3xl md:text-5xl font-regular uppercase tracking-wide text-black "
            style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)" }}
          >
            LOCAL EXPERTISE <span className="font-bold">HOUSTON CONNECTED</span>
          </h2>
          <p className="text-xs md:text-sm  xl:w-full md:w-3/4 p-4 text-black/60 font-montserrat leading-4 font-medium tracking-wide text-right">
            Empowering Your Real Estate Journey with Unmatched Local Insight and
            Houston Connectivity. Navigate the Market Confidently with Our
            Expertise.
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="630"
            height="19"
            viewBox="0 0 630 19"
            fill="none"
            className=" w-[100%]"
          >
            <path
              d="M1.5 17.5C200.333 9.16666 604 -5.00001 628 4.99999"
              stroke="#97B586"
              stroke-width="6"
              stroke-linecap="round"
            />
          </svg>
        </div>

        {/* flex column */}
        <div className="w-full h-3/4 md:h-2/3 xl:hidden">
          <div className="w-full h-full rounded-lg p-4 relative">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] rounded-lg shadow-xl"
            ></Image>
            <button className="absolute bg-forest/60 text-white font-bold text-sm hover:bg-white hover:text-black transition-all duration-300 ease-in-out font-montserrat bottom-8 right-6 p-4 rounded-full border border-white ">
              For Owners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;
