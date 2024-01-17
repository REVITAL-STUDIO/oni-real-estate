import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Local from "public/new-content.jpg";

const Expert = () => {
  return (
    <div className=" h-screen w-full xl:h-1300 bg-gradient-to-b from-white/20 via-mint/50 to-white">
      {/* Local Support */}
      <div className="h-full w-full  flex flex-col justify-center items-center xl:flex-row">
        {/* Flex-row */}
        <div className="w-full xl:w-1/2 h-3/4  xl:h-full hidden xl:flex xl:flex-col xl:justify-evenly items-center">
          <h2 className="md:w-full  w-3/4  font-cinzel p-4 text-2xl md:text-5xl font-regular uppercase tracking-wide text-black ">
            LOCAL EXPERTISE HOUSTON CONNECTED
          </h2>
          <div className="w-full h-1/2 relative p-4 bottom-24">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] contrast-125 saturate-50 rounded-lg shadow-xl"
            ></Image>
          </div>
        </div>
        {/* Local Expertise */}
        <div className="w-full h-1/4 xl:h-5/6  xl:w-1/2 flex items-center flex-col justify-center xl:justify-evenly  xl:items-end  relative">
          {/* Mobille Responsive */}
          <h2 className="md:w-full xl:hidden text-right font-cinzel p-4 text-2xl md:text-5xl font-regular uppercase tracking-wide text-black ">
            LOCAL EXPERTISE HOUSTON CONNECTED
          </h2>
          <p className="text-base md:text-lg xl:w-full  p-4 text-black/75 mt-2 font-montserrat leading-6 font-regular tracking-wide text-right relative xl:top-24">
            Empowering Your Real Estate Journey with Unmatched Local Insight and
            Houston Connectivity. Navigate the Market Confidently with Our
            Expertise.
          </p>
          <ul className="xl:w-full xl:h-1/2 hidden xl:flex xl:flex-col items-end p-4 justify-evenly font-cinzel text-2xl relative top-32">
            <div className="w-full border-t border-b border-black/50  flex justify-end items-center">
              <li className="  p-4 text-right text-2xl text-black tracking-wider font-light">
                Curated & Exclusive
              </li>
            </div>
            <div className="border-t border-b border-black/50 w-full flex justify-end items-center">
              <li className="  p-4 text-right text-2xl text-black tracking-wider font-light">
                Redefining Standards
              </li>
            </div>
            <div className=" border-t border-b border-black/50 w-full flex justify-end items-center">
              <li className="   p-4 text-right text-2xl text-black tracking-wider font-light">
                Uncompromising Efforts
              </li>
            </div>
          </ul>
          <button className="absolute xl:w-3/4 w-5/6 h-16 hidden xl:block text-black font-light tracking-wider text-sm  transition-all duration-300 ease-in-out font-montserrat -bottom-2 xl:bottom-0 bg-white xl:right-4 bg-opacity-20 backdrop-blur-5 border border-opacity-30 border-black/50 rounded-2xl shadow-sm p-4">
            For Owners
          </button>
        </div>

        {/* flex column */}
        <div className="w-full h-2/4 md:h-2/3 xl:hidden relative flex flex-col items-center justify-center">
          <div className="w-full md:h-5/6 h-3/4 rounded-lg p-4  mt-4 ">
            <Image
              src={Local}
              alt="local support"
              className="object-cover object-center h-[100%] w-[100%] rounded-lg shadow-xl"
            ></Image>
          </div>
          <button className="absolute xl:w-full w-5/6 h-16  xl:block text-black font-light tracking-wider text-sm  transition-all duration-300 ease-in-out font-montserrat -bottom-10 md:-bottom-5 xl:bottom-0 bg-white xl:right-4 bg-opacity-20 backdrop-blur-5 border border-opacity-30 border-black/50 rounded-2xl shadow-sm p-4">
            For Owners
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expert;
